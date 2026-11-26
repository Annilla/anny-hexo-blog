<script setup lang="ts">
import { projectCases } from "~/data/project-cases";

const latestPost = await queryCollection("content")
  .where("title", "=", "Excel Power Query Import Data and Combine Remark Column")
  .first();

if (!latestPost) {
  throw createError({ statusCode: 500, statusMessage: "找不到首頁文章內容" });
}

const articleRoutes = useRuntimeConfig().public.articleRoutes as Array<{ url: string; contentPath: string }>;
const featuredPostRoute = articleRoutes.find((articleRoute) => articleRoute.contentPath === latestPost.path);

if (!featuredPostRoute) {
  throw createError({ statusCode: 500, statusMessage: "首頁文章沒有對應的已發布網址" });
}

const featuredPostUrl = featuredPostRoute.url;
const skills = [
  { title: "UX Design", score: "90%", image: "/images/brand/skill-ux-design.svg" },
  { title: "Logo Design", score: "80%", image: "/images/brand/skill-logo-design.svg" },
  { title: "Web APP", score: "95%", image: "/images/brand/skill-web-app.svg" },
  { title: "SQL", score: "70%", image: "/images/brand/skill-sql.svg" },
];

useSeoMeta({
  title: "Anny Chang - F2E & UI Designer",
  description: "Anny Chang 的個人品牌網站，分享 UI 設計、RWD 網頁製作與 SPA 開發作品。",
});
</script>

<template>
  <main id="main-content" class="home-page">
    <div class="top-stage">
      <img
        class="top-stage-backdrop"
        src="/images/brand/hero-background.png"
        alt=""
        width="3277"
        height="4096"
        aria-hidden="true"
        fetchpriority="high"
      >
      <img
        class="top-stage-wash"
        src="/images/brand/hero-overlay.svg"
        alt=""
        width="1282"
        height="1601"
        aria-hidden="true"
      >
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="hero-eyebrow">Design thinking is everywhere</p>
            <h1 id="hero-title" class="hero-name">Anny Chang</h1>
            <p class="hero-role">F2E &amp; UI Designer</p>
            <p class="hero-description">
              設計 UI 介面、RWD 網頁製作、SPA 程式撰寫
            </p>
            <NuxtLink class="action-link action-link-primary" to="/projects/">
              My Work <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
          <figure class="hero-portrait">
            <img
              src="/images/brand/profile-photo.jpg"
              alt="Anny Chang 的個人肖像"
              width="1226"
              height="1226"
              fetchpriority="high"
            >
          </figure>
          <div class="hero-decorations" aria-hidden="true">
            <img class="decoration-orb decoration-orb-large" src="/images/brand/decoration-orb-large.svg" alt="" width="387" height="387">
            <img class="decoration-orb decoration-orb-profile" src="/images/brand/decoration-orb-profile.svg" alt="" width="295" height="295">
            <img class="decoration-orb decoration-orb-small" src="/images/brand/decoration-orb-small.svg" alt="" width="139" height="139">
            <img class="decoration-orb decoration-orb-medium" src="/images/brand/decoration-orb-medium.svg" alt="" width="86" height="86">
          </div>
          <p class="hero-quote">
            <img src="/images/brand/quote-marks.svg" alt="" width="92" height="74" aria-hidden="true">
            <span>Know my limits<br>but never stop<br>trying to exceed them.</span>
          </p>
          <a class="scroll-link" href="#blog" aria-label="前往最新文章">
            <img src="/images/brand/scroll-down.svg" alt="" width="104" height="104" aria-hidden="true">
          </a>
        </div>
      </section>

      <section id="blog" class="latest-posts" aria-labelledby="blog-title">
        <img
          class="latest-wave"
          src="/images/brand/hero-section-wave.svg"
          alt=""
          width="1281"
          height="1095"
          aria-hidden="true"
        >
        <div class="latest-inner">
          <header class="section-heading latest-heading">
            <img src="/images/brand/latest-post-bubble.svg" alt="" width="138" height="138" aria-hidden="true">
            <div>
              <p class="section-eyebrow">FROM THE BLOG</p>
              <h2 id="blog-title">Latest Posts</h2>
            </div>
          </header>
          <article class="featured-post">
            <img
              class="post-icon"
              src="/images/brand/post-excel.png"
              alt="Microsoft Excel"
              width="256"
              height="256"
            >
            <div class="post-copy">
              <p class="post-date">2025.08.04</p>
              <h3>{{ latestPost.title }}</h3>
              <p>
                最近工作中有同事問我，怎麼把 Excel 中欄位 Item 相同的 Remark 用逗號合併，Qty 做 Total。
              </p>
              <NuxtLink class="text-link" :to="featuredPostUrl">
                Read Article <span aria-hidden="true">↗</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section id="portfolio" class="portfolio-section" aria-labelledby="portfolio-title">
      <img
        class="portfolio-wave"
        src="/images/brand/portfolio-wave.svg"
        alt=""
        width="1281"
        height="854"
        aria-hidden="true"
      >
      <div class="portfolio-inner">
        <header class="section-heading portfolio-heading">
          <p class="section-eyebrow">SELECTED WORK</p>
          <h2 id="portfolio-title">Portfolio</h2>
        </header>
        <ul class="project-grid" aria-label="精選案例">
          <li v-for="(projectCase, index) in projectCases" :key="projectCase.slug">
            <NuxtLink class="project-card" :to="`/projects/${projectCase.slug}/`">
              <figure class="project-visual">
                <img
                  class="project-image"
                  :src="projectCase.image"
                  :alt="projectCase.imageAlt"
                  width="1920"
                  height="989"
                  loading="lazy"
                >
                <span class="project-label">
                  <img
                    :src="projectCase.labelImage"
                    alt=""
                    width="138"
                    height="138"
                    aria-hidden="true"
                  >
                  <span>{{ projectCase.title }}</span>
                </span>
              </figure>
              <span class="project-card-title">
                <span>0{{ index + 1 }}</span>
                {{ projectCase.title }}
                <span aria-hidden="true">↗</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink class="action-link action-link-primary" to="/projects/">
          My Work <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>

    <section class="skills-section" aria-labelledby="skills-title">
      <div class="skills-inner">
        <header class="section-heading skills-heading">
          <p class="section-eyebrow">WHAT I DO</p>
          <h2 id="skills-title">Skills</h2>
        </header>
        <ul class="skills-list">
          <li v-for="skill in skills" :key="skill.title" class="skill-item">
            <div class="skill-meter">
              <img :src="skill.image" alt="" width="150" height="150" aria-hidden="true">
              <span>{{ skill.score }}</span>
            </div>
            <h3>{{ skill.title }}</h3>
          </li>
        </ul>
        <NuxtLink class="action-link action-link-primary" to="/about/">
          About Me <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  overflow: hidden;
  background: var(--color-white);
}

.top-stage {
  position: relative;
  isolation: isolate;
}

.top-stage-backdrop,
.top-stage-wash {
  position: absolute;
  inset: 0 0 auto;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
  pointer-events: none;
}

.top-stage-wash {
  z-index: -1;
  height: auto;
  object-fit: initial;
}

.hero {
  position: relative;
  min-height: 43rem;
  padding: 9rem 0 7rem;
}

.hero-inner {
  position: relative;
  display: grid;
  width: min(100% - 3rem, 72rem);
  min-height: 27rem;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.9fr);
  align-items: center;
  gap: 3rem;
  margin: 0 auto;
}

.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 37rem;
  animation: rise-in 650ms ease-out both;
}

.hero-eyebrow,
.section-eyebrow {
  margin: 0 0 0.75rem;
  color: var(--color-rose);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
}

.hero-name {
  margin: 0;
  color: var(--color-rose);
  background: linear-gradient(90deg, #a95864, var(--color-pink-light));
  background-clip: text;
  font-family: "Satisfy", cursive;
  font-size: 7rem;
  font-weight: 400;
  line-height: 1.05;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
}

.hero-role {
  margin: 0.5rem 0 0;
  font-family: var(--font-display);
  font-size: 2rem;
  font-style: italic;
  font-weight: 700;
  line-height: 1.35;
}

.hero-description {
  max-width: 25rem;
  margin: 0.75rem 0 0;
  font-size: 1.125rem;
  line-height: 2;
}

.action-link {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0.65rem 1.5rem;
  border: 0;
  border-radius: 1.875rem;
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
  transition: filter 160ms ease, transform 160ms ease;
}

.action-link:hover {
  filter: brightness(0.96);
  transform: translateY(-2px);
}

.action-link-primary {
  background: var(--color-ink);
}

.hero-portrait {
  position: relative;
  z-index: 1;
  width: min(100%, 22rem);
  justify-self: center;
  margin: 0;
  overflow: hidden;
  border: 0.75rem solid var(--color-mint);
  border-radius: 50%;
  background: var(--color-pink-light);
  aspect-ratio: 1;
  animation: rise-in 800ms 120ms ease-out both;
}

.hero-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-decorations {
  position: absolute;
  z-index: 0;
  inset: 0;
  pointer-events: none;
}

.decoration-orb {
  position: absolute;
  display: block;
  height: auto;
}

.decoration-orb-large {
  top: -8rem;
  left: -8rem;
  width: 24.1875rem;
}

.decoration-orb-profile {
  right: -2rem;
  bottom: -3rem;
  width: 18.4375rem;
}

.decoration-orb-small {
  top: 8rem;
  left: 20%;
  width: 8.6875rem;
}

.decoration-orb-medium {
  top: 6rem;
  right: 28%;
  width: 5.375rem;
}

.hero-quote {
  position: absolute;
  z-index: 3;
  right: 1rem;
  bottom: -2.5rem;
  display: flex;
  max-width: 26rem;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 2rem;
  font-style: italic;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
}

.hero-quote img {
  width: 3.75rem;
  height: auto;
  flex: 0 0 3.75rem;
  margin-top: 0.25rem;
}

.scroll-link {
  position: absolute;
  z-index: 4;
  bottom: -3.25rem;
  left: 50%;
  display: inline-flex;
  width: 4rem;
  height: 4rem;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
}

.scroll-link img {
  display: block;
  width: 3.25rem;
  height: auto;
}

.latest-posts {
  position: relative;
  z-index: 1;
  min-height: 39rem;
  padding: 6rem 0 5rem;
}

.latest-wave {
  position: absolute;
  z-index: -1;
  top: -5rem;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.latest-inner,
.portfolio-inner,
.skills-inner {
  width: min(100% - 3rem, 72rem);
  margin: 0 auto;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.section-heading h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3rem;
  font-style: italic;
  line-height: 1.15;
}

.latest-heading > img {
  display: block;
  width: 7rem;
  height: auto;
}

.latest-heading h2 {
  color: var(--color-ink);
}

.latest-heading .section-eyebrow {
  margin-bottom: 0.25rem;
}

.featured-post {
  display: grid;
  max-width: 58rem;
  grid-template-columns: 14rem minmax(0, 1fr);
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1.5rem 0;
}

.post-icon {
  display: block;
  width: 100%;
  height: auto;
}

.post-copy h3 {
  max-width: 36rem;
  margin: 0.25rem 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-style: italic;
  line-height: 1.3;
}

.post-copy p {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  line-height: 1.9;
}

.post-copy .post-date {
  color: var(--color-rose);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-weight: 700;
  text-underline-offset: 0.25em;
}

.portfolio-section {
  position: relative;
  isolation: isolate;
  min-height: 54rem;
  padding: 7rem 0 5rem;
  background: var(--color-mint);
}

.portfolio-wave {
  position: absolute;
  z-index: -1;
  inset: 0 0 auto;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.portfolio-heading {
  display: block;
  margin-bottom: 2rem;
  text-align: center;
}

.portfolio-heading .section-eyebrow {
  margin: 0;
  color: var(--color-white);
}

.portfolio-heading h2 {
  color: var(--color-white);
  font-size: 6rem;
  font-weight: 400;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-grid li {
  min-width: 0;
}

.project-card {
  display: block;
  color: var(--color-ink);
  text-decoration: none;
}

.project-visual {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--color-white);
  aspect-ratio: 1.94;
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 280ms ease;
}

.project-card:hover .project-image,
.project-card:focus-visible .project-image {
  transform: scale(1.025);
}

.project-label {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: grid;
  width: 6.25rem;
  aspect-ratio: 1;
  place-items: center;
  text-align: center;
}

.project-label img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: auto;
}

.project-label span {
  position: relative;
  max-width: 5.5rem;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-style: italic;
  font-weight: 700;
  line-height: 1.2;
}

.project-card-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.75rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  font-weight: 700;
}

.project-card-title span:first-child {
  color: var(--color-rose);
  font-size: 0.75rem;
}

.portfolio-inner > .action-link {
  display: flex;
  width: fit-content;
  margin: 2rem auto 0;
}

.skills-section {
  position: relative;
  padding: 3.5rem 0 4rem;
  background: rgb(0 17 62 / 30%);
  color: var(--color-white);
  text-align: center;
}

.skills-heading {
  display: block;
}

.skills-heading .section-eyebrow {
  color: var(--color-white);
}

.skills-heading h2 {
  color: var(--color-white);
  font-size: 2.5rem;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  justify-items: center;
  gap: 1.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.skill-item {
  width: 100%;
  text-align: center;
}

.skill-meter {
  position: relative;
  width: 9.375rem;
  margin: 0 auto;
  aspect-ratio: 1;
}

.skill-meter img {
  display: block;
  width: 100%;
  height: auto;
}

.skill-meter span {
  position: absolute;
  top: 50%;
  left: 50%;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  transform: translate(-50%, -50%);
}

.skill-item h3 {
  margin: 0.5rem 0 0;
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
}

.skills-inner > .action-link {
  margin-top: 2rem;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 45rem) {
  .hero {
    min-height: auto;
    padding: 7rem 0 5.5rem;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: 1.75rem;
    text-align: center;
  }

  .hero-portrait {
    grid-row: 1;
    width: min(100%, 16rem);
    border-width: 0.5rem;
  }

  .hero-copy {
    grid-row: 2;
    justify-self: center;
  }

  .hero-name {
    font-size: 4.5rem;
    white-space: normal;
  }

  .hero-role {
    font-size: 1.5rem;
  }

  .hero-description {
    margin-inline: auto;
    font-size: 1rem;
  }

  .action-link {
    min-height: 2.75rem;
  }

  .hero-decorations {
    overflow: hidden;
  }

  .decoration-orb-large {
    top: -5rem;
    left: -10rem;
    width: 18rem;
  }

  .decoration-orb-profile {
    right: -6rem;
    bottom: 1rem;
    width: 12rem;
  }

  .decoration-orb-small {
    top: 6rem;
    left: 5%;
    width: 5.5rem;
  }

  .decoration-orb-medium {
    top: 3rem;
    right: 12%;
    width: 3.5rem;
  }

  .hero-quote {
    position: relative;
    right: auto;
    bottom: auto;
    grid-row: 3;
    justify-self: center;
    max-width: 22rem;
    font-size: 1.5rem;
    text-align: center;
  }

  .hero-quote img {
    width: 2.5rem;
    flex-basis: 2.5rem;
  }

  .scroll-link {
    bottom: -4.5rem;
  }

  .latest-posts {
    min-height: auto;
    padding: 4.5rem 0 3rem;
  }

  .latest-wave {
    top: -2rem;
    width: 180%;
    max-width: none;
    transform: translateX(-22%);
  }

  .latest-inner,
  .portfolio-inner,
  .skills-inner {
    width: calc(100% - 2rem);
  }

  .section-heading h2 {
    font-size: 2.25rem;
  }

  .latest-heading > img {
    width: 5.5rem;
  }

  .featured-post {
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem 0;
  }

  .post-copy h3 {
    font-size: 1.25rem;
  }

  .post-copy p {
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .portfolio-section {
    min-height: auto;
    padding: 4rem 0 3rem;
  }

  .portfolio-wave {
    width: 180%;
    max-width: none;
    transform: translateX(-22%);
  }

  .portfolio-heading h2 {
    font-size: 3.5rem;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 0.75rem;
  }

  .project-label {
    top: 0.25rem;
    left: 0.25rem;
    width: 4rem;
  }

  .project-label span {
    max-width: 3.5rem;
    font-size: 0.5625rem;
  }

  .project-card-title {
    gap: 0.35rem;
    font-size: 0.75rem;
  }

  .skills-section {
    padding: 3rem 0;
  }

  .skills-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 0.75rem;
  }

  .skill-meter {
    width: min(100%, 8rem);
  }

  .skill-item h3 {
    font-size: 0.875rem;
  }
}

@media (max-width: 24rem) {
  .hero-name {
    font-size: 3.75rem;
  }

  .featured-post {
    grid-template-columns: 1fr;
  }

  .post-icon {
    width: 5rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-portrait,
  .project-image {
    animation: none;
    transition: none;
  }
}
</style>
