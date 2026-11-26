<script setup lang="ts">
import { projectCases } from "~/data/project-cases";

const route = useRoute();
const projectCase = projectCases.find((item) => item.slug === String(route.params.slug));

if (!projectCase) {
  throw createError({ statusCode: 404, statusMessage: "找不到此案例" });
}

useSeoMeta({
  title: `${projectCase.title} - Anny Chang`,
});
</script>

<template>
  <main id="main-content" class="project-case-page">
    <NuxtLink class="case-back" to="/projects/">
      <span aria-hidden="true">←</span> Portfolio
    </NuxtLink>
    <header class="case-heading">
      <p class="case-eyebrow">SELECTED WORK</p>
      <h1>{{ projectCase.title }}</h1>
    </header>
    <figure class="case-image-frame">
      <img
        :src="projectCase.image"
        :alt="projectCase.imageAlt"
        width="1920"
        height="989"
        fetchpriority="high"
      >
    </figure>
  </main>
</template>

<style scoped>
.project-case-page {
  width: min(100% - 3rem, 72rem);
  flex: 1;
  margin: 0 auto;
  padding: 9rem 0 5rem;
}

.case-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-weight: 700;
  text-decoration: none;
  text-underline-offset: 0.25em;
}

.case-back:hover {
  text-decoration: underline;
}

.case-back span {
  font-size: 1.25rem;
}

.case-heading {
  margin: 2rem 0;
}

.case-eyebrow {
  margin: 0 0 0.25rem;
  color: var(--color-rose);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
}

.case-heading h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3rem;
  font-style: italic;
  line-height: 1.25;
}

.case-image-frame {
  margin: 0;
  overflow: hidden;
  background: var(--color-mint);
  aspect-ratio: 1920 / 989;
}

.case-image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 45rem) {
  .project-case-page {
    width: calc(100% - 2rem);
    padding: 7rem 0 3rem;
  }

  .case-heading h1 {
    font-size: 2rem;
  }
}
</style>