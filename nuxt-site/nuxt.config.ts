import { transformBrandPageDate } from "./scripts/brand-page-date.mjs";

const generationDate = new Date();
const brandPageDateCacheKey = `brand-page-date-${generationDate.getFullYear()}`;

export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  css: ["~/assets/css/site.css"],
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
      routes: ["/projects/", "/about/"],
    },
  },
});
