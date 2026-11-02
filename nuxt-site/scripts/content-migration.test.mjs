import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createManifestEntry,
  extractAssets,
  isValidDate,
  planWrites,
  pathExistsExactCase,
  runCheck,
  validateManifestState,
  validateSourceContent,
} from "./content-migration.mjs";
import { transformBrandPageDate } from "./brand-page-date.mjs";

test("品牌來源對應至確認的新路由並保留舊路由", () => {
  const content = Buffer.from("---\ntitle: Portfolio\n---\n內容");
  const entry = createManifestEntry({
    sourcePath: "source/_posts/Portfolio.md",
    content,
    record: { source: "_posts/Portfolio.md", path: "3017/12/01/Portfolio/", published: true },
  });

  assert.equal(entry.kind, "project");
  assert.equal(entry.sourceHash, createHash("sha256").update(content).digest("hex"));
  assert.equal(entry.targetUrl, "/projects/");
  assert.deepEqual(entry.legacyUrls, ["/3017/12/01/Portfolio/"]);
  assert.equal(entry.contentPath, "content/imported/projects/index.md");
  assert.equal(entry.published, true);
});

test("文章沿用 Hexo 實際路由和來源分類", () => {
  const entry = createManifestEntry({
    sourcePath: "source/_posts/Vue/Vue-3-Studies.md",
    content: Buffer.from("---\ntitle: Vue\n---\n內容"),
    record: { source: "_posts/Vue/Vue-3-Studies.md", path: "2025/03/01/Vue/Vue-3-Studies/", published: true },
  });

  assert.equal(entry.kind, "article");
  assert.equal(entry.targetUrl, "/2025/03/01/Vue/Vue-3-Studies/");
  assert.equal(entry.contentPath, "content/imported/articles/Vue/Vue-3-Studies.md");
});

test("未來文章網址保留 Hexo 年份而不套用品牌頁日期規則", () => {
  const entry = createManifestEntry({
    sourcePath: "source/_posts/future-article.md",
    content: Buffer.from("---\ntitle: Future\n---\n內容"),
    record: { source: "_posts/future-article.md", path: "3017/12/04/future-article/", published: true },
  });

  assert.equal(entry.targetUrl, "/3017/12/04/future-article/");
});

test("未公開文章保留來源雜湊但不產生 Nuxt 目標", () => {
  const entry = createManifestEntry({
    sourcePath: "source/_posts/draft.md",
    content: Buffer.from("---\ntitle: draft\n---\n"),
    record: { source: "_posts/draft.md", path: "2025/03/01/draft/", published: false },
  });

  assert.equal(entry.kind, "excluded");
  assert.equal(entry.published, false);
  assert.equal(entry.targetUrl, null);
  assert.equal(entry.contentPath, null);
  assert.match(entry.exclusionReason, /Hexo 未公開/);
});

test("Hexo 彙整來源明確排除並保留對應新路由", () => {
  const entry = createManifestEntry({
    sourcePath: "source/all-archives/index.md",
    content: Buffer.from("---\ntitle: archives\n---\n"),
    record: { source: "all-archives/index.md", path: "all-archives/index.html" },
  });

  assert.equal(entry.kind, "excluded");
  assert.equal(entry.targetUrl, "/archives/");
  assert.match(entry.exclusionReason, /Hexo 彙整頁範本/);
  assert.equal(entry.contentPath, null);
});

test("資源清單包含圖片來源且忽略程式碼範例中的假引用", () => {
  const assets = extractAssets(
    [
      "---",
      "thumbnailImage: https://example.com/cover.png",
      "---",
      "![圖](https://example.com/article.png)",
      "```html",
      '<img src="./assets/logo.png">',
      "```",
      '<img src="/images/local.webp">',
    ].join("\n"),
    "source/_posts/example.md",
  );

  assert.deepEqual(assets, [
    { url: "/images/local.webp", type: "local", sourcePath: "source/images/local.webp" },
    { url: "https://example.com/article.png", type: "external" },
    { url: "https://example.com/cover.png", type: "external" },
  ]);
});

test("保留 frontmatter 圖片 URL 中的逗號與編碼斜線", () => {
  const assets = extractAssets(
    [
      "---",
      "thumbnailImage: https://images.example.com/upload/c_limit,fl_lossy,h_9000,w_1200/986819/image.png",
      "coverImage: https://cdn.example.com/image%2Fcover.png",
      "---",
    ].join("\n"),
    "source/_posts/example.md",
  );

  assert.deepEqual(assets, [
    { url: "https://cdn.example.com/image%2Fcover.png", type: "external" },
    { url: "https://images.example.com/upload/c_limit,fl_lossy,h_9000,w_1200/986819/image.png", type: "external" },
  ]);
});

test("日期驗證拒絕不存在的日曆日期", () => {
  assert.equal(isValidDate("3017/12/01"), true);
  assert.equal(isValidDate("2024/2/29"), true);
  assert.equal(isValidDate("2024/2/30"), false);
  assert.equal(isValidDate("not-a-date"), false);
});

test("品牌頁日期依產生時鐘更新年份且不修改來源內容", () => {
  const siteDirectory = path.join(os.tmpdir(), "nuxt-site");
  const cases = [
    ["projects", "Portfolio", "12/01"],
    ["about", "Resume", "12/03"],
  ];
  for (const [page, title, sourceDate] of cases) {
    const filePath = path.join(siteDirectory, "content", "imported", page, "index.md");
    const original = `---\ntitle: ${title}\ndate: 3017/${sourceDate}\n---\n內容`;
    const originalHash = createHash("sha256").update(original).digest("hex");
    const transformed = transformBrandPageDate(filePath, original, {
      siteDirectory,
      now: new Date(2026, 10, 2),
    });

    assert.match(transformed, new RegExp(`date: 2026/${sourceDate}`));
    assert.equal(createHash("sha256").update(original).digest("hex"), originalHash);
    assert.equal(original.includes(`date: 3017/${sourceDate}`), true);
  }

  const article = "---\ntitle: Future article\ndate: 3017/12/04\n---\n內容";
  assert.equal(transformBrandPageDate(
    path.join(siteDirectory, "content", "imported", "articles", "future.md"),
    article,
    { siteDirectory, now: new Date(2026, 10, 2) },
  ), article);
});

test("檢出未轉換的 Hexo 標籤但忽略程式碼區塊與摘要標記", () => {
  const content = Buffer.from([
    "---",
    "title: Test",
    "date: 2024/02/29",
    "---",
    "<!--more-->",
    "```text",
    "{% raw %}",
    "```",
    "{% unknown_tag value %}",
  ].join("\n"));
  const errors = validateSourceContent({
    sourcePath: "source/_posts/test.md",
    content,
    kind: "article",
    hexoDate: new Date("2024-02-29T00:00:00.000Z"),
  });

  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /Hexo 標籤語法/);
});

test("同步檢查列出新增、修改、刪除來源及目的檔衝突", () => {
  const entry = {
    sourcePath: "source/_posts/one.md",
    sourceHash: "source-hash",
    kind: "article",
    legacyUrls: ["/one/"],
    targetUrl: "/one/",
    contentPath: "content/imported/articles/one.md",
    contentHash: "target-hash",
    assets: [{ url: "./missing.png", type: "local", sourcePath: "source/_posts/one/missing.png" }],
    published: true,
    exclusionReason: null,
  };
  const removedEntry = { ...entry, sourcePath: "source/_posts/removed.md", targetUrl: "/removed/" };
  const errors = validateManifestState({
    entries: [entry, removedEntry],
    currentSources: new Set(["source/_posts/one.md", "source/_posts/new.md"]),
    sourceHashes: new Map([["source/_posts/one.md", "changed-hash"]]),
    targetHashes: new Map([[entry.contentPath, "manual-edit-hash"]]),
    assetPaths: new Set(),
  });
  const messages = errors.map((error) => error.message);

  assert.ok(messages.some((message) => message.includes("尚未盤點")));
  assert.ok(messages.some((message) => message.includes("已變更")));
  assert.ok(messages.some((message) => message.includes("已刪除")));
  assert.ok(messages.some((message) => message.includes("人工修改")));
  assert.ok(messages.some((message) => message.includes("找不到本機圖片資源")));
});

test("同步檢查阻擋重複目標路由與目的檔", () => {
  const first = {
    sourcePath: "source/_posts/first.md",
    sourceHash: "first-source",
    kind: "article",
    targetUrl: "/same/",
    contentPath: "content/imported/articles/same.md",
    contentHash: "first-target",
    assets: [],
    published: true,
  };
  const second = {
    ...first,
    sourcePath: "source/_posts/second.md",
    sourceHash: "second-source",
    contentPath: "content/imported/articles/SAME.md",
    contentHash: "second-target",
  };
  const errors = validateManifestState({
    entries: [first, second],
    currentSources: new Set([first.sourcePath, second.sourcePath]),
    sourceHashes: new Map([[first.sourcePath, first.sourceHash], [second.sourcePath, second.sourceHash]]),
    targetHashes: new Map([[first.contentPath, first.contentHash], [second.contentPath, second.contentHash]]),
    assetPaths: new Set(),
  });
  const messages = errors.map((error) => error.message);

  assert.ok(messages.some((message) => message.includes("目標路由重複：/same/")));
  assert.ok(messages.some((message) => message.includes("匯入目的檔重複（忽略大小寫）")));
});

test("本機資源路徑檢查保留檔名大小寫", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "spectra-asset-case-"));
  try {
    await mkdir(path.join(root, "Assets"));
    await writeFile(path.join(root, "Assets", "image.png"), "asset");
    assert.equal(await pathExistsExactCase(root, "Assets/image.png"), true);
    assert.equal(await pathExistsExactCase(root, "assets/image.png"), false);
    assert.equal(await pathExistsExactCase(root, "../image.png"), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("匯入不會覆寫人工修改的目的內容", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "spectra-manual-edit-"));
  const repositoryRoot = path.join(root, "repository");
  const siteRoot = path.join(root, "site");
  const sourcePath = "source/_posts/example.md";
  const contentPath = "content/imported/articles/example.md";
  const previousBytes = Buffer.from("原始匯入");
  const manualBytes = Buffer.from("人工修改");
  const updatedBytes = Buffer.from("已更新來源");
  const sourceFile = path.join(repositoryRoot, sourcePath);
  const targetFile = path.join(siteRoot, contentPath);

  try {
    await mkdir(path.dirname(sourceFile), { recursive: true });
    await mkdir(path.dirname(targetFile), { recursive: true });
    await writeFile(sourceFile, updatedBytes);
    await writeFile(targetFile, manualBytes);
    const entry = {
      sourcePath,
      contentPath,
      contentHash: createHash("sha256").update(updatedBytes).digest("hex"),
    };
    const previousManifest = {
      entries: [{
        sourcePath,
        contentPath,
        contentHash: createHash("sha256").update(previousBytes).digest("hex"),
      }],
    };

    await assert.rejects(
      planWrites([entry], previousManifest, { siteDirectory: siteRoot, sourceDirectory: repositoryRoot }),
      /人工修改/,
    );
    assert.deepEqual(await readFile(targetFile), manualBytes);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("失敗內容檢查會回報具體來源路徑並設定非零結束碼", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "spectra-content-check-"));
  const repositoryRoot = path.join(root, "repository");
  const siteRoot = path.join(root, "site");
  const sourcePath = "source/_posts/example.md";
  const contentPath = "content/imported/articles/example.md";
  const sourceFile = path.join(repositoryRoot, sourcePath);
  const targetFile = path.join(siteRoot, contentPath);
  const manifestFile = path.join(siteRoot, "data", "migration-manifest.json");
  const currentSource = Buffer.from("---\ntitle: Example\ndate: 2024/02/30\n---\n內容");
  const previousSource = Buffer.from("---\ntitle: Example\ndate: 2024/02/29\n---\n內容");
  const target = Buffer.from("已匯入內容");
  const sourceHash = (value) => createHash("sha256").update(value).digest("hex");
  const output = [];
  const originalExitCode = process.exitCode;

  try {
    await mkdir(path.dirname(sourceFile), { recursive: true });
    await mkdir(path.dirname(targetFile), { recursive: true });
    await mkdir(path.join(repositoryRoot, "source", "images"), { recursive: true });
    await mkdir(path.dirname(manifestFile), { recursive: true });
    await writeFile(sourceFile, currentSource);
    await writeFile(targetFile, target);
    await writeFile(path.join(repositoryRoot, "source", "images", "Photo.png"), "image");
    await writeFile(manifestFile, JSON.stringify({
      entries: [{
        sourcePath,
        sourceHash: sourceHash(previousSource),
        kind: "article",
        published: true,
        targetUrl: "/example/",
        contentPath,
        contentHash: sourceHash(target),
        assets: [{
          url: "./missing.png", type: "local", sourcePath: "source/_posts/example/missing.png",
        }, {
          url: "/images/photo.png", type: "local", sourcePath: "source/images/photo.png",
        }],
      }],
    }));

    process.exitCode = undefined;
    await runCheck({
      sourceDirectory: repositoryRoot,
      siteDirectory: siteRoot,
      manifestFile,
      logError: (message) => output.push(message),
    });

    assert.equal(process.exitCode, 1);
    assert.match(output.join("\n"), /source\/_posts\/example\.md/);
    assert.match(output.join("\n"), /日期無效/);
    assert.match(output.join("\n"), /已變更/);
    assert.match(output.join("\n"), /source\/_posts\/example\/missing\.png/);
    assert.match(output.join("\n"), /source\/images\/photo\.png/);
    assert.deepEqual(await readFile(sourceFile), currentSource);
    assert.deepEqual(await readFile(targetFile), target);
  } finally {
    process.exitCode = originalExitCode;
    await rm(root, { recursive: true, force: true });
  }
});

test("Hexo 的 index.html 頁面路由正規化後以斜線結尾", () => {
  const entry = createManifestEntry({
    sourcePath: "source/all-tags/index.md",
    content: Buffer.from("---\ntitle: tags\n---\n"),
    record: { source: "all-tags/index.md", path: "all-tags/index.html" },
  });

  assert.deepEqual(entry.legacyUrls, ["/all-tags/"]);
});
