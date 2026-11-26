import migrationManifestData from "./data/migration-manifest.json";
import { transformBrandPageDate } from "./scripts/brand-page-date.mjs";
import { projectCases } from "./data/project-cases";

const generationDate = new Date();
const brandPageDateCacheKey = `brand-page-date-${generationDate.getFullYear()}`;
interface MigrationManifestEntry {
  kind: string;
  published: boolean;
  targetUrl: string | null;
  contentPath: string | null;
}

interface PublishedArticleRoute {
  url: string;
  contentPath: string;
}

const migrationManifest = migrationManifestData as { entries: MigrationManifestEntry[] };
const publishedArticleRoutes = migrationManifest.entries
  .filter((entry): entry is MigrationManifestEntry & { targetUrl: string; contentPath: string } =>
    entry.kind === "article"
    && entry.published === true
    && typeof entry.targetUrl === "string"
    && typeof entry.contentPath === "string")
  .map((entry) => ({
    url: entry.targetUrl,
    contentPath: `/${entry.contentPath.replace(/^content\//, "").replace(/\.md$/i, "").toLowerCase()}`,
  })) satisfies PublishedArticleRoute[];

export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  css: ["~/assets/css/site.css"],
  runtimeConfig: {
    public: {
      articleRoutes: publishedArticleRoutes,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;1,700&family=Noto+Serif+TC:wght@400;700&family=Satisfy&display=swap",
        },
      ],
    },
  },
  content: {
    renderer: {
      anchorLinks: {
        h2: false,
        h3: false,
      },
    },
    build: {
      markdown: {
        remarkPlugins: {
          // 讓 Content 快取隨年份更新，避免跨年重用舊的品牌頁日期。
          [brandPageDateCacheKey]: false,
        },
      },
    },
  },
  hooks: {
    "content:file:beforeParse": ({ file }) => {
      file.body = transformBrandPageDate(file.path, file.body, {
        now: generationDate,
      });
    },
  },
  nitro: {
    prerender: {
      routes: [
        "/blog/",
        "/projects/",
        "/about/",
        ...publishedArticleRoutes.map(({ url }) => url),
        ...projectCases.map(({ slug }) => `/projects/${slug}/`),
      ],
    },
  },
});
