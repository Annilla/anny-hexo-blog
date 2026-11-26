<script setup lang="ts">
interface ArticleRoute {
  url: string;
  contentPath: string;
}

const articleRoutes = useRuntimeConfig().public.articleRoutes as ArticleRoute[];
const urlByContentPath = new Map(
  articleRoutes.map((articleRoute) => [articleRoute.contentPath, articleRoute.url]),
);
const contentEntries = await queryCollection("content")
  .where("path", "LIKE", "/imported/articles/%")
  .select("path", "title", "meta")
  .all();

const articles = contentEntries
  .flatMap((entry) => {
    const url = urlByContentPath.get(entry.path);
    const date = String(entry.meta?.date ?? "");

    if (!url || !entry.title || !date) return [];

    return [{ url, title: entry.title, date }];
  })
  .sort((left, right) => right.date.localeCompare(left.date) || left.url.localeCompare(right.url));

useSeoMeta({
  title: "Blog - Anny Chang",
  description: "Anny Chang 的文章與技術筆記。",
});
</script>

<template>
  <main id="main-content" class="blog-page">
    <header class="blog-heading">
      <p class="section-eyebrow">FROM THE BLOG</p>
      <h1>Blog</h1>
      <p>{{ articles.length }} 篇文章</p>
    </header>
    <p v-if="articles.length === 0" class="blog-empty">
      目前沒有已發布文章。
    </p>
    <ol v-else class="article-list" aria-label="文章列表">
      <li v-for="article in articles" :key="article.url">
        <time :datetime="article.date.replaceAll('/', '-')">
          {{ article.date.replaceAll('/', '.') }}
        </time>
        <h2>
          <NuxtLink :to="article.url">{{ article.title }}</NuxtLink>
        </h2>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.blog-page {
  width: min(100% - 3rem, 58rem);
  flex: 1;
  margin: 0 auto;
  padding: 9rem 0 5rem;
}

.blog-heading {
  margin-bottom: 2rem;
}

.blog-heading .section-eyebrow {
  margin: 0 0 0.25rem;
}

.blog-heading h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3rem;
  font-style: italic;
  line-height: 1.25;
}

.blog-heading > p:last-child {
  margin: 0.5rem 0 0;
  color: var(--color-rose);
}

.article-list {
  margin: 0;
  padding: 0;
  border-top: 1px solid rgb(0 17 62 / 18%);
  list-style: none;
}

.article-list li {
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  align-items: baseline;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgb(0 17 62 / 18%);
}

.article-list time {
  color: var(--color-rose);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
}

.article-list h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.4;
}

.article-list a {
  color: var(--color-ink);
  text-decoration-color: var(--color-pink-dark);
  text-underline-offset: 0.2em;
}

.blog-empty {
  padding: 1.5rem 0;
  border-top: 1px solid rgb(0 17 62 / 18%);
}

@media (max-width: 45rem) {
  .blog-page {
    width: calc(100% - 2rem);
    padding: 7rem 0 3rem;
  }

  .blog-heading h1 {
    font-size: 2rem;
  }

  .article-list li {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    padding: 1rem 0;
  }

  .article-list h2 {
    font-size: 1rem;
  }
}
</style>