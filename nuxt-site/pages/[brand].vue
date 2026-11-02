<script setup lang="ts">
const route = useRoute();
const brandContentPaths: Record<string, string> = {
  about: "/imported/about",
  projects: "/imported/projects",
};
const brand = String(route.params.brand);
const contentPath = brandContentPaths[brand];

if (!contentPath) {
  throw createError({ statusCode: 404, statusMessage: "找不到此頁面" });
}

const page = await queryCollection("content").path(contentPath).first();

if (!page) {
  throw createError({ statusCode: 404, statusMessage: "找不到此頁面" });
}

useSeoMeta({
  title: page.title,
});
</script>

<template>
  <main id="main-content" class="brand-page">
    <header class="brand-heading" :class="{ 'about-heading': brand === 'about' }">
      <img
        v-if="brand === 'about'"
        class="about-portrait"
        src="/images/portrait.png"
        alt="Anny Chang 的個人肖像"
        width="258"
        height="258"
        fetchpriority="high"
      >
      <h1>{{ page.title }}</h1>
    </header>
    <article class="brand-content">
      <ContentRenderer :value="page" />
    </article>
  </main>
</template>

<style scoped>
.brand-page {
  width: min(100% - 3rem, 68rem);
  flex: 1;
  margin: 0 auto;
  padding: 3rem 0 5rem;
}

.brand-heading {
  margin-bottom: 2rem;
}

.brand-heading h1 {
  margin: 0;
  font-size: clamp(2.25rem, 5vw, 3rem);
  line-height: 1.4;
}

.about-heading {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 5vw, 4rem);
}

.about-portrait {
  display: block;
  width: min(28vw, 13rem);
  min-width: 8rem;
  border: 0.5rem solid #add6d2;
  border-radius: 50%;
  background: #eaaaa4;
  aspect-ratio: 1;
  object-fit: cover;
}

.brand-content {
  font-size: 1.125rem;
  line-height: 2;
  overflow-wrap: anywhere;
}

.brand-content :deep(h1),
.brand-content :deep(h2),
.brand-content :deep(h3) {
  margin: 2.5rem 0 1rem;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.4;
}

.brand-content :deep(p) {
  margin: 1rem 0;
}

.brand-content :deep(a) {
  color: #00113e;
  text-decoration-color: #c98f8f;
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
}

.brand-content :deep(a:focus-visible) {
  border-radius: 0.125rem;
  outline: 3px solid #a95864;
  outline-offset: 3px;
}

.brand-content :deep(ul),
.brand-content :deep(ol) {
  padding-inline-start: 1.5rem;
}

.brand-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  line-height: 1.7;
}

.brand-content :deep(th),
.brand-content :deep(td) {
  padding: 0.65rem 0.75rem;
  border: 1px solid rgb(0 17 62 / 18%);
  text-align: start;
  vertical-align: top;
}

.brand-content :deep(th) {
  background: #add6d2;
}

@media (max-width: 45rem) {
  .brand-page {
    width: min(100% - 2rem, 35rem);
    padding: 2.5rem 0 3rem;
  }

  .about-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .brand-content {
    font-size: 1rem;
    line-height: 1.8;
  }

  .brand-content :deep(table) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
