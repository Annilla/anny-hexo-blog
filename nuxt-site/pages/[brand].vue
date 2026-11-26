<script setup lang="ts">
import { projectCases } from "~/data/project-cases";

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
  title: brand === "projects" ? "Portfolio - Anny Chang" : page.title,
});
</script>

<template>
  <main id="main-content" class="brand-page" :class="`brand-page-${brand}`">
    <header class="brand-heading" :class="{ 'about-heading': brand === 'about' }">
      <img
        v-if="brand === 'about'"
        class="about-portrait"
        src="/images/brand/profile-photo.jpg"
        alt="Anny Chang 的個人肖像"
        width="1226"
        height="1226"
        fetchpriority="high"
      >
      <div>
        <p class="section-eyebrow">{{ brand === "projects" ? "SELECTED WORK" : "ABOUT ME" }}</p>
        <h1>{{ brand === "projects" ? "Portfolio" : page.title }}</h1>
      </div>
    </header>
    <section v-if="brand === 'projects'" class="case-gallery" aria-label="精選案例">
      <p v-if="projectCases.length === 0" class="project-empty">
        目前尚無可公開展示的作品。
      </p>
      <NuxtLink
        v-for="(projectCase, index) in projectCases"
        :key="projectCase.slug"
        class="case-card"
        :to="`/projects/${projectCase.slug}/`"
      >
        <figure class="case-visual">
          <img
            class="case-image"
            :src="projectCase.image"
            :alt="projectCase.imageAlt"
            width="1920"
            height="989"
            loading="lazy"
          >
          <span class="case-label">
            <img :src="projectCase.labelImage" alt="" width="138" height="138" aria-hidden="true">
            <span>{{ projectCase.title }}</span>
          </span>
        </figure>
        <span class="case-title">
          <span>0{{ index + 1 }}</span>
          {{ projectCase.title }}
          <span aria-hidden="true">↗</span>
        </span>
      </NuxtLink>
    </section>
    <article class="brand-content">
      <ContentRenderer :value="page" />
    </article>
  </main>
</template>

<style scoped>
.brand-page {
  width: min(100% - 3rem, 72rem);
  flex: 1;
  margin: 0 auto;
  padding: 9rem 0 5rem;
}

.brand-heading {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.brand-heading h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3rem;
  font-style: italic;
  line-height: 1.4;
}

.section-eyebrow {
  margin: 0 0 0.25rem;
  color: var(--color-rose);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
}

.about-heading {
  gap: 2.5rem;
}

.about-portrait {
  display: block;
  width: 13rem;
  flex: 0 0 13rem;
  border: 0.5rem solid var(--color-mint);
  border-radius: 50%;
  background: var(--color-pink-light);
  aspect-ratio: 1;
  object-fit: cover;
}

.case-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.5rem;
  margin: 0 0 4rem;
}

.project-empty {
  grid-column: 1 / -1;
  padding: 2rem;
  border-left: 0.5rem solid var(--color-mint-dark);
  background: rgb(173 214 210 / 32%);
}

.case-card {
  display: block;
  min-width: 0;
  color: var(--color-ink);
  text-decoration: none;
}

.case-visual {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--color-white);
  aspect-ratio: 1.94;
}

.case-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 280ms ease;
}

.case-card:hover .case-image,
.case-card:focus-visible .case-image {
  transform: scale(1.025);
}

.case-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: grid;
  width: 6.25rem;
  aspect-ratio: 1;
  place-items: center;
  text-align: center;
}

.case-label img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: auto;
}

.case-label span {
  position: relative;
  max-width: 5.5rem;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-style: italic;
  font-weight: 700;
  line-height: 1.2;
}

.case-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 700;
}

.case-title span:first-child {
  color: var(--color-rose);
  font-size: 0.75rem;
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
  color: var(--color-ink);
  text-decoration-color: var(--color-pink-dark);
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
}

.brand-content :deep(a:focus-visible) {
  border-radius: 0.125rem;
  outline: 3px solid var(--color-rose);
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
  background: var(--color-mint);
}

@media (max-width: 45rem) {
  .brand-page {
    width: calc(100% - 2rem);
    padding: 7rem 0 3rem;
  }

  .brand-heading {
    align-items: flex-start;
    gap: 1.25rem;
  }

  .brand-heading h1 {
    font-size: 2rem;
  }

  .about-heading {
    flex-direction: column;
  }

  .about-portrait {
    width: 9rem;
    flex-basis: 9rem;
  }

  .case-gallery {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .case-label {
    top: 0.5rem;
    left: 0.5rem;
    width: 5rem;
  }

  .case-label span {
    max-width: 4rem;
    font-size: 0.6875rem;
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
