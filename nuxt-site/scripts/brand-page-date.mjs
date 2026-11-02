import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultSiteDirectory = path.resolve(scriptDirectory, "..");
const brandPagePaths = new Set([
  "content/imported/projects/index.md",
  "content/imported/about/index.md",
]);
const dateFieldPattern = /^(\s*date\s*:\s*)(["']?)(\d{4})([/-])(\d{1,2})\4(\d{1,2})\2(\s*)$/m;

export function transformBrandPageDate(filePath, body, {
  siteDirectory = defaultSiteDirectory,
  now = new Date(),
} = {}) {
  const relativePath = path.relative(siteDirectory, filePath).split(path.sep).join("/");
  if (!brandPagePaths.has(relativePath)) return body;

  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
    throw new Error(`無法取得品牌頁產生日期：${filePath}`);
  }

  const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---(?=\r?\n|$)/);
  const dateField = frontmatter?.[1].match(dateFieldPattern);
  if (!frontmatter || !dateField) {
    throw new Error(`品牌頁缺少有效的 date 中繼資料：${filePath}`);
  }

  const year = Number(dateField[3]);
  const month = Number(dateField[5]);
  const day = Number(dateField[6]);
  const parsedDate = new Date(0);
  parsedDate.setUTCFullYear(year, month - 1, day);
  if (
    parsedDate.getUTCFullYear() !== year
    || parsedDate.getUTCMonth() !== month - 1
    || parsedDate.getUTCDate() !== day
  ) {
    throw new Error(`品牌頁 date 中繼資料不是有效日期：${filePath}`);
  }

  const currentYear = String(now.getFullYear());
  const updatedDate = `${dateField[1]}${dateField[2]}${currentYear}${dateField[4]}${dateField[5]}${dateField[4]}${dateField[6]}${dateField[2]}${dateField[7]}`;
  const updatedFrontmatter = frontmatter[1].replace(dateField[0], updatedDate);
  return body.replace(frontmatter[1], updatedFrontmatter);
}
