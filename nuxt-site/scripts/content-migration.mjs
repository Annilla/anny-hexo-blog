import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { access, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(siteRoot, "..");
const sourceRoot = path.join(repositoryRoot, "source");
const manifestPath = path.join(siteRoot, "data", "migration-manifest.json");
const rootRequire = createRequire(path.join(repositoryRoot, "package.json"));
const ignoredMarkdownPages = new Map([
  ["source/all-archives/index.md", { legacyPath: "all-archives/index.html", targetUrl: "/archives/", reason: "此檔是 Hexo 彙整頁範本；Nuxt 會由文章資料重建彙整內容。" }],
  ["source/all-categories/index.md", { legacyPath: "all-categories/index.html", targetUrl: "/categories/", reason: "此檔是 Hexo 分類頁範本；Nuxt 會由文章資料重建分類內容。" }],
  ["source/all-tags/index.md", { legacyPath: "all-tags/index.html", targetUrl: "/tags/", reason: "此檔是 Hexo 標籤頁範本；Nuxt 會由文章資料重建標籤內容。" }],
]);

const brandPages = new Map([
  ["source/_posts/Portfolio.md", { kind: "project", contentPath: "projects/index.md", targetUrl: "/projects/" }],
  ["source/_posts/Resume.md", { kind: "about", contentPath: "about/index.md", targetUrl: "/about/" }],
]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeHexoPath(value) {
  if (!value) return null;

  let route = `/${String(value).replaceAll("\\", "/").replace(/^\/+/, "")}`;
  route = route.replace(/(?:index)?\.html?$/i, "");
  if (!route.endsWith("/")) route += "/";
  return route;
}

function cleanAssetUrl(value) {
  return value.trim().replace(/^<|>$/g, "").replace(/[),;]+$/g, "");
}

function isExternalAsset(value) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
}

function resolveLocalAsset(sourcePath, url) {
  const assetPath = decodeURIComponent(url.split(/[?#]/, 1)[0]).replaceAll("\\", "/");
  const sourceRelative = sourcePath.replace(/^source\//, "");
  const isPost = sourceRelative.startsWith("_posts/");
  const sourceDirectory = isPost
    ? path.posix.join("source", "_posts", path.posix.dirname(sourceRelative), path.posix.basename(sourceRelative, path.posix.extname(sourceRelative)))
    : path.posix.dirname(sourcePath);
  const candidate = assetPath.startsWith("/")
    ? path.posix.join("source", assetPath.replace(/^\/+/, ""))
    : path.posix.normalize(path.posix.join(sourceDirectory, assetPath));

  if (candidate === "source" || candidate.startsWith("../") || !candidate.startsWith("source/")) {
    return null;
  }

  return candidate;
}

function frontmatterField(markdown, name) {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) return null;

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const value = frontmatter.match(new RegExp(`^${escapedName}\\s*:\\s*(.*?)\\s*$`, "m"))?.[1];
  if (value === undefined) return null;
  return value.replace(/^(['"])(.*)\1$/, "$2").trim();
}

export function isValidDate(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const normalized = value.trim();
  const parts = normalized.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:[ T].*)?$/);
  if (parts) {
    const year = Number(parts[1]);
    const month = Number(parts[2]);
    const day = Number(parts[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
      return false;
    }
  }

  return Number.isFinite(Date.parse(normalized));
}

function stripCodeBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let fenceCharacter = null;
  let fenceLength = 0;

  for (const line of lines) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const character = fence[1][0];
      if (fenceCharacter === null) {
        fenceCharacter = character;
        fenceLength = fence[1].length;
      } else if (character === fenceCharacter && fence[1].length >= fenceLength) {
        fenceCharacter = null;
        fenceLength = 0;
      }
      continue;
    }

    if (fenceCharacter === null && !/^(?: {4}|\t)/.test(line)) output.push(line);
  }

  return output.join("\n")
    .replace(/(`+)[\s\S]*?\1/g, "")
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre\s*>/gi, "");
}

function frontmatterAssetValues(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return [];

  const lines = match[1].split(/\r?\n/);
  const values = [];
  let collecting = false;

  for (const line of lines) {
    const field = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (field) {
      collecting = /^(?:cover|coverImage|image|images|gallery|photo|photos|thumbnailImage)$/i.test(field[1]);
      if (collecting && field[2]) values.push(field[2]);
    } else if (collecting && /^\s*-\s+/.test(line)) {
      values.push(line.replace(/^\s*-\s+/, ""));
    } else if (!/^\s/.test(line)) {
      collecting = false;
    }
  }

  return values.flatMap((value) => {
    const external = [...value.matchAll(/(?:https?:\/\/|\/\/)[^\s"'<>[\]]+/gi)].map((item) => item[0]);
    if (external.length) return external;
    return [...value.matchAll(/(?:\.{0,2}\/|\/|[A-Za-z0-9._-]+\/)[^\s"'<>[\],]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^\s"'<>[\],]*)?/gi)].map((item) => item[0]);
  });
}

export function extractAssets(markdown, sourcePath) {
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
  const visibleBody = stripCodeBlocks(body);
  const urls = [...frontmatterAssetValues(markdown)];

  for (const match of visibleBody.matchAll(/!\[[^\]]*]\(\s*(?:<([^>\n]+)>|([^\s)\n]+))/g)) {
    urls.push(match[1] ?? match[2]);
  }
  for (const match of visibleBody.matchAll(/<(?:img|source|video|audio)\b[^>]*?\b(?:src|poster)\s*=\s*(["'])(.*?)\1/gi)) {
    urls.push(match[2]);
  }
  for (const match of visibleBody.matchAll(/\{%\s*asset_img\s+([^\s%]+)[^%]*%\}/gi)) {
    urls.push(match[1]);
  }

  const assets = new Map();
  for (const rawUrl of urls) {
    const url = cleanAssetUrl(rawUrl);
    if (!url || url.startsWith("#") || url.startsWith("data:")) continue;
    const asset = isExternalAsset(url)
      ? { url, type: "external" }
      : { url, type: "local", sourcePath: resolveLocalAsset(sourcePath, url) };
    assets.set(`${asset.type}:${asset.url}`, asset);
  }

  return [...assets.values()].sort((left, right) => compareText(left.url, right.url));
}

export function validateSourceContent({ sourcePath, content, kind, hexoDate }) {
  const errors = [];
  const markdown = content.toString("utf8");

  if (["article", "project", "about"].includes(kind)) {
    const sourceDate = frontmatterField(markdown, "date");
    const routeDateIsValid = hexoDate === undefined
      || (hexoDate instanceof Date
        ? Number.isFinite(hexoDate.getTime())
        : isValidDate(String(hexoDate)));
    if (!isValidDate(sourceDate) || !routeDateIsValid) {
      errors.push({ sourcePath, message: `日期無效或缺少必要的 date 中繼資料：${sourceDate ?? "(missing)"}` });
    }
  }

  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
  const visibleBody = stripCodeBlocks(body).replace(/<!--\s*more\s*-->/gi, "");
  const unsupportedTag = visibleBody.match(/\{%[\s\S]*?%\}|\{%[\s\S]*$/);
  if (unsupportedTag) {
    errors.push({ sourcePath, message: `包含尚未轉換的 Hexo 標籤語法：${unsupportedTag[0].slice(0, 80)}` });
  }

  return errors;
}

export function createManifestEntry({ sourcePath, content, record }) {
  const sourceHash = sha256(content);
  const legacyUrl = normalizeHexoPath(record?.path ?? ignoredMarkdownPages.get(sourcePath)?.legacyPath);
  const brand = brandPages.get(sourcePath);

  if (record?.published === false) {
    return {
      sourcePath,
      sourceHash,
      kind: "excluded",
      legacyUrls: [],
      targetUrl: null,
      contentPath: null,
      contentHash: null,
      assets: extractAssets(content.toString("utf8"), sourcePath),
      published: false,
      exclusionReason: "Hexo 未公開此來源；保留盤點記錄但不匯入內容。",
    };
  }

  if (brand) {
    return {
      sourcePath,
      sourceHash,
      kind: brand.kind,
      legacyUrls: legacyUrl ? [legacyUrl] : [],
      targetUrl: brand.targetUrl,
      contentPath: `content/imported/${brand.contentPath}`,
      contentHash: sourceHash,
      assets: extractAssets(content.toString("utf8"), sourcePath),
      published: record?.published !== false,
      exclusionReason: null,
    };
  }

  const ignoredPage = ignoredMarkdownPages.get(sourcePath);
  if (ignoredPage) {
    return {
      sourcePath,
      sourceHash,
      kind: "excluded",
      legacyUrls: legacyUrl ? [legacyUrl] : [],
      targetUrl: ignoredPage.targetUrl,
      contentPath: null,
      contentHash: null,
      assets: extractAssets(content.toString("utf8"), sourcePath),
      published: record?.published !== false,
      exclusionReason: ignoredPage.reason,
    };
  }

  if (record?.source?.startsWith("_posts/")) {
    const relativePostPath = record.source.slice("_posts/".length);
    return {
      sourcePath,
      sourceHash,
      kind: "article",
      legacyUrls: legacyUrl ? [legacyUrl] : [],
      targetUrl: legacyUrl,
      contentPath: `content/imported/articles/${relativePostPath}`,
      contentHash: sourceHash,
      assets: extractAssets(content.toString("utf8"), sourcePath),
      published: record.published !== false,
      exclusionReason: null,
    };
  }

  return {
    sourcePath,
    sourceHash,
    kind: "excluded",
    legacyUrls: legacyUrl ? [legacyUrl] : [],
    targetUrl: legacyUrl,
    contentPath: null,
    contentHash: null,
    assets: extractAssets(content.toString("utf8"), sourcePath),
    published: record?.published === true,
    exclusionReason: record
      ? "此來源不是已確認的文章或品牌頁；需確認 Nuxt 對應內容後再遷移。"
      : "Hexo 未將此 Markdown 識別為文章或頁面；需確認其發佈狀態與處理方式。",
  };
}

async function listMarkdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listMarkdownFiles(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) files.push(fullPath);
  }
  return files.sort((left, right) => compareText(toPosix(left), toPosix(right)));
}

export async function pathExistsExactCase(root, relativePath) {
  const normalizedPath = relativePath.replaceAll("\\", "/");
  const absolutePath = path.resolve(root, ...normalizedPath.split("/"));
  const relative = path.relative(root, absolutePath);
  if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return false;

  let current = root;
  for (const segment of relative.split(path.sep)) {
    let names;
    try {
      names = await readdir(current);
    } catch (error) {
      if (error.code === "ENOENT") return false;
      throw error;
    }
    if (!names.includes(segment)) return false;
    current = path.join(current, segment);
  }

  try {
    await access(current);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export function validateManifestState({ entries, currentSources, sourceHashes, targetHashes, assetPaths }) {
  const errors = [];
  const entryBySource = new Map();
  const routes = new Map();
  const targetFiles = new Map();

  for (const entry of entries) {
    if (entryBySource.has(entry.sourcePath)) {
      errors.push({ sourcePath: entry.sourcePath, message: "來源在 migration-manifest.json 中重複。" });
    } else {
      entryBySource.set(entry.sourcePath, entry);
    }
  }

  for (const sourcePath of currentSources) {
    const entry = entryBySource.get(sourcePath);
    if (!entry) {
      errors.push({ sourcePath, message: "來源尚未盤點，請執行 npm run content:import。" });
      continue;
    }
    if (sourceHashes.get(sourcePath) !== entry.sourceHash) {
      errors.push({ sourcePath, message: "來源內容已變更，請執行 npm run content:import 並檢查差異。" });
    }
  }

  for (const entry of entries) {
    if (!currentSources.has(entry.sourcePath)) {
      errors.push({ sourcePath: entry.sourcePath, message: "來源已刪除；請人工確認目的內容，不會自動刪除匯入檔。" });
      continue;
    }
    if (entry.published && !entry.targetUrl) {
      errors.push({ sourcePath: entry.sourcePath, message: "公開來源缺少目標路由。" });
    }
    if (entry.kind === "excluded" && !entry.exclusionReason) {
      errors.push({ sourcePath: entry.sourcePath, message: "排除來源缺少原因。" });
    }
    if (entry.published && entry.targetUrl) {
      if (routes.has(entry.targetUrl)) {
        errors.push({ sourcePath: entry.sourcePath, message: `目標路由重複：${entry.targetUrl}（${routes.get(entry.targetUrl)}）` });
      } else {
        routes.set(entry.targetUrl, entry.sourcePath);
      }
    }

    if (entry.contentPath) {
      const fileKey = entry.contentPath.toLowerCase();
      if (targetFiles.has(fileKey)) {
        errors.push({ sourcePath: entry.sourcePath, message: `匯入目的檔重複（忽略大小寫）：${entry.contentPath}（${targetFiles.get(fileKey)}）` });
      } else {
        targetFiles.set(fileKey, entry.sourcePath);
      }

      const targetHash = targetHashes.get(entry.contentPath);
      if (!targetHash) {
        errors.push({ sourcePath: entry.sourcePath, message: `找不到匯入目的內容：${entry.contentPath}` });
      } else if (targetHash !== entry.contentHash) {
        errors.push({ sourcePath: entry.sourcePath, message: `目的內容與匯入記錄不一致，可能有人工修改：${entry.contentPath}` });
      }
    }

    for (const asset of entry.assets ?? []) {
      if (asset.type !== "local") continue;
      if (!asset.sourcePath) {
        errors.push({ sourcePath: entry.sourcePath, message: `本機圖片路徑超出 source 目錄：${asset.url}` });
      } else if (!assetPaths.has(asset.sourcePath)) {
        errors.push({ sourcePath: entry.sourcePath, message: `找不到本機圖片資源或路徑大小寫不符：${asset.sourcePath}` });
      }
    }
  }

  return errors;
}

async function loadHexoRecords() {
  let Hexo;
  try {
    Hexo = rootRequire("hexo");
  } catch (error) {
    throw new Error("找不到根目錄已安裝的 Hexo；請先在儲存庫根目錄執行 npm install。", { cause: error });
  }

  const cacheDirectory = await mkdtemp(path.join(os.tmpdir(), "spectra-hexo-migration-"));
  const hexo = new Hexo(repositoryRoot, { silent: true, output: cacheDirectory });
  try {
    await hexo.init();
    const publicDirectory = `${path.join(cacheDirectory, "public")}${path.sep}`;
    hexo.public_dir = publicDirectory;
    hexo.config.public_dir = publicDirectory;
    await hexo.call("generate");
    const posts = await hexo.model("Post").find({});

    return new Map(
      posts.map((record) => [
        `source/${toPosix(record.source)}`,
        {
          source: toPosix(record.source),
          path: record.path,
          published: record.published,
          layout: record.layout,
          date: record.date,
        },
      ]),
    );
  } finally {
    await hexo.exit();
    await rm(cacheDirectory, { recursive: true, force: true });
  }
}

async function readManifest(filePath = manifestPath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeIfChanged(filePath, contents) {
  let current;
  try {
    current = await readFile(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  if (current?.equals(contents)) return;
  await mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(tempPath, contents);
  await rename(tempPath, filePath);
}

function makeErrorList(entries) {
  return entries.map((entry) => `${entry.sourcePath}: ${entry.message}`);
}

async function buildEntries() {
  const records = await loadHexoRecords();
  const files = await listMarkdownFiles(sourceRoot);
  const entries = [];

  for (const file of files) {
    const sourcePath = toPosix(path.relative(repositoryRoot, file));
    const content = await readFile(file);
    const entry = createManifestEntry({
      sourcePath,
      content,
      record: records.get(sourcePath),
    });
    entries.push(entry);
  }

  const targetRoutes = new Map();
  const targetFiles = new Map();
  const errors = [];
  for (const entry of entries) {
    const record = records.get(entry.sourcePath);
    const content = await readFile(path.join(repositoryRoot, entry.sourcePath));
    errors.push(...validateSourceContent({
      sourcePath: entry.sourcePath,
      content,
      kind: entry.kind,
      hexoDate: record?.date,
    }));

    if (!entry.published) continue;
    if (!entry.targetUrl) {
      errors.push({ sourcePath: entry.sourcePath, message: "公開來源缺少 Nuxt 目標路由。" });
    } else if (targetRoutes.has(entry.targetUrl)) {
      errors.push({ sourcePath: entry.sourcePath, message: `目標路由重複：${entry.targetUrl}（${targetRoutes.get(entry.targetUrl)}）` });
    } else {
      targetRoutes.set(entry.targetUrl, entry.sourcePath);
    }
    if (entry.contentPath) {
      if (targetFiles.has(entry.contentPath)) {
        errors.push({ sourcePath: entry.sourcePath, message: `匯入目的檔重複：${entry.contentPath}（${targetFiles.get(entry.contentPath)}）` });
      } else {
        targetFiles.set(entry.contentPath, entry.sourcePath);
      }
    }
    if (entry.kind === "excluded" && !entry.exclusionReason) {
      errors.push({ sourcePath: entry.sourcePath, message: "排除來源缺少原因。" });
    }
    for (const asset of entry.assets) {
      if (asset.type === "local" && !asset.sourcePath) {
        errors.push({ sourcePath: entry.sourcePath, message: `本機圖片路徑超出 source 目錄：${asset.url}` });
      }
    }
  }

  for (const entry of entries) {
    for (const asset of entry.assets) {
      if (asset.type !== "local" || !asset.sourcePath) continue;
      if (!await pathExistsExactCase(repositoryRoot, asset.sourcePath)) {
        errors.push({ sourcePath: entry.sourcePath, message: `找不到本機圖片資源或路徑大小寫不符：${asset.sourcePath}` });
      }
    }
  }

  if (errors.length) throw new Error(makeErrorList(errors).join("\n"));
  return entries;
}

export async function planWrites(entries, previousManifest, { siteDirectory = siteRoot, sourceDirectory = repositoryRoot } = {}) {
  const previousEntries = new Map((previousManifest?.entries ?? []).map((entry) => [entry.sourcePath, entry]));
  const sourcePaths = new Set(entries.map((entry) => entry.sourcePath));
  const errors = [];
  const writes = [];

  for (const oldEntry of previousEntries.values()) {
    if (!sourcePaths.has(oldEntry.sourcePath)) {
      errors.push({ sourcePath: oldEntry.sourcePath, message: "來源已刪除；請先人工確認目的內容，不會自動刪除匯入檔。" });
    }
  }

  for (const entry of entries) {
    if (!entry.contentPath) continue;
    const targetPath = path.join(siteDirectory, entry.contentPath);
    let existing;
    try {
      existing = await readFile(targetPath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    const oldEntry = previousEntries.get(entry.sourcePath);
    if (existing && (!oldEntry || sha256(existing) !== oldEntry.contentHash)) {
      errors.push({ sourcePath: entry.sourcePath, message: `目的內容與先前匯入版本不同，為避免覆寫人工修改而停止：${entry.contentPath}` });
      continue;
    }

    const sourceBytes = await readFile(path.join(sourceDirectory, entry.sourcePath));
    const sourceHash = sha256(sourceBytes);
    entry.contentHash = sourceHash;
    if (!existing || !existing.equals(sourceBytes)) {
      writes.push({ targetPath, contents: sourceBytes });
    }
  }

  if (errors.length) throw new Error(makeErrorList(errors).join("\n"));
  return writes;
}

async function runImport() {
  const previousManifest = await readManifest();
  const entries = await buildEntries();
  const writes = await planWrites(entries, previousManifest);
  for (const write of writes) await writeIfChanged(write.targetPath, write.contents);

  const manifest = { version: 1, entries };
  await writeIfChanged(manifestPath, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  console.log(`已盤點 ${entries.length} 份 Markdown，匯入 ${entries.filter((entry) => entry.contentPath).length} 份內容；Hexo 來源保持唯讀。`);
}

export async function runCheck({
  sourceDirectory = repositoryRoot,
  siteDirectory = siteRoot,
  manifestFile = manifestPath,
  logInfo = console.log,
  logError = console.error,
} = {}) {
  const manifest = await readManifest(manifestFile);
  if (!manifest || !Array.isArray(manifest.entries)) {
    throw new Error("找不到有效的 data/migration-manifest.json；請先執行 npm run content:import。");
  }

  const sourceRootDirectory = path.join(sourceDirectory, "source");
  const sourceFiles = await listMarkdownFiles(sourceRootDirectory);
  const currentSources = new Set(sourceFiles.map((file) => toPosix(path.relative(sourceDirectory, file))));
  const sourceHashes = new Map();
  const targetHashes = new Map();
  const assetPaths = new Set();
  const entriesBySource = new Map(manifest.entries.map((entry) => [entry.sourcePath, entry]));
  const validationErrors = [];

  for (const sourcePath of currentSources) {
    const content = await readFile(path.join(sourceDirectory, sourcePath));
    sourceHashes.set(sourcePath, sha256(content));
    const entry = entriesBySource.get(sourcePath);
    if (entry) {
      validationErrors.push(...validateSourceContent({
        sourcePath,
        content,
        kind: entry.kind,
      }));
    }
  }
  for (const entry of manifest.entries) {
    if (entry.contentPath && await pathExistsExactCase(siteDirectory, entry.contentPath)) {
      const content = await readFile(path.join(siteDirectory, entry.contentPath));
      targetHashes.set(entry.contentPath, sha256(content));
    }
    for (const asset of entry.assets ?? []) {
      if (asset.type === "local" && asset.sourcePath && await pathExistsExactCase(sourceDirectory, asset.sourcePath)) {
        assetPaths.add(asset.sourcePath);
      }
    }
  }

  const errors = [
    ...validationErrors,
    ...validateManifestState({ entries: manifest.entries, currentSources, sourceHashes, targetHashes, assetPaths }),
  ];

  if (errors.length) {
    logError(makeErrorList(errors).join("\n"));
    process.exitCode = 1;
    return;
  }

  logInfo(`內容盤點通過：${manifest.entries.length} 份 Markdown、${manifest.entries.reduce((count, entry) => count + entry.assets.length, 0)} 項資源。`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const command = process.argv[2];
  if (command === "import") {
    await runImport();
  } else if (command === "check") {
    await runCheck();
  } else {
    console.error("用法：node scripts/content-migration.mjs <import|check>");
    process.exitCode = 2;
  }
}
