<script setup lang="ts">
interface ArticleRoute {
  url: string;
  contentPath: string;
}

const route = useRoute();
const articleRoutes = useRuntimeConfig().public.articleRoutes as ArticleRoute[];
const requestedUrl = route.path.endsWith("/") ? route.path : `${route.path}/`;
const articleRoute = articleRoutes.find((item) => item.url === requestedUrl);

if (!articleRoute) {
  throw createError({ statusCode: 404, statusMessage: "找不到此頁面" });
}

const article = await queryCollection("content").path(articleRoute.contentPath).first();

if (!article) {
  throw createError({ statusCode: 404, statusMessage: "找不到此文章" });
}

const articleMeta = (article.meta ?? {}) as Record<string, unknown>;
const articleDate = String(articleMeta.date ?? "");
const categories = Array.isArray(articleMeta.categories)
  ? articleMeta.categories.map(String)
  : [];

useSeoMeta({
  title: `${article.title} - Anny Chang`,
  description: article.description ?? "Anny Chang 的文章與技術筆記。",
});
</script>

<template>
  <main id="main-content" class="article-page">
    <nav class="article-breadcrumb" aria-label="麵包屑">
      <NuxtLink to="/blog/">Blog</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ article.title }}</span>
    </nav>
    <article class="article-document">
      <header class="article-header">
        <time v-if="articleDate" :datetime="articleDate.replaceAll('/', '-')">
          {{ articleDate.replaceAll('/', '.') }}
        </time>
        <h1>{{ article.title }}</h1>
        <ul v-if="categories.length" class="article-categories" aria-label="文章分類">
          <li v-for="category in categories" :key="category">{{ category }}</li>
        </ul>
      </header>
      <div class="article-body">
        <ContentRenderer :value="article" />
      </div>
    </article>
  </main>
</template>

<style scoped>
.article-page {
  width: min(100% - 3rem, 58rem);
  flex: 1;
  margin: 0 auto;
  padding: 9rem 0 5rem;
}

.article-breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: var(--color-rose);
  font-family: var(--font-display);
  font-weight: 700;
}

.article-breadcrumb a {
  color: var(--color-ink);
  text-underline-offset: 0.2em;
}

.article-breadcrumb > span:last-child {
  overflow: hidden;
  color: var(--color-ink);
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(0 17 62 / 18%);
}

.article-header time {
  color: var(--color-rose);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
}

.article-header h1 {
  margin: 0.5rem 0 0;
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-style: italic;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.article-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 1rem 0 0;
  padding: 0;
  color: var(--color-rose);
  list-style: none;
}

.article-body {
  padding-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  margin: 2.5rem 0 1rem;
  font-family: var(--font-display);
  line-height: 1.4;
}

.article-body :deep(p) {
  margin: 1rem 0;
}

.article-body :deep(a) {
  color: var(--color-ink);
  text-decoration-color: var(--color-pink-dark);
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
}

.article-body :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1.5rem auto;
}

.article-body :deep(pre) {
  overflow-x: auto;
  padding: 1rem;
  background: rgb(0 17 62 / 6%);
  line-height: 1.6;
}

.article-body :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 0.5rem 0.75rem;
  border: 1px solid rgb(0 17 62 / 18%);
  text-align: start;
}

@media (max-width: 45rem) {
  .article-page {
    width: calc(100% - 2rem);
    padding: 7rem 0 3rem;
  }

  .article-header h1 {
    font-size: 1.75rem;
  }
}
</style>