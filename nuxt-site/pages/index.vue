<script setup lang="ts">
useSeoMeta({
  title: "Anny Chang - F2E & UI Designer",
  description: "Anny Chang 的個人品牌網站，分享 UI 設計、RWD 網頁製作與 SPA 開發作品。",
});
</script>

<template>
  <main id="main-content" class="home-page">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="hero-eyebrow">Design thinking is EVERYWHERE</p>
        <h1 id="hero-title">
          <span class="hero-name">Anny Chang</span>
          <span class="hero-role">F2E &amp; UI Designer</span>
        </h1>
        <p class="hero-description">
          設計 UI 介面、RWD 網頁製作、SPA 程式撰寫
        </p>
        <div class="hero-actions">
          <NuxtLink class="action-link action-link-primary" to="/projects/">
            作品集
          </NuxtLink>
          <NuxtLink class="action-link action-link-secondary" to="/about/">
            關於我
          </NuxtLink>
        </div>
      </div>
      <figure class="hero-portrait">
        <img
          src="/images/portrait.png"
          alt="Anny Chang 的個人肖像"
          width="258"
          height="258"
          fetchpriority="high"
        >
      </figure>
    </section>

    <section id="blog" class="blog-preview" aria-labelledby="blog-title">
      <div>
        <p class="section-eyebrow">BLOG</p>
        <h2 id="blog-title">部落格</h2>
        <p>文章目前由既有部落格提供。</p>
      </div>
      <a
        class="action-link action-link-primary"
        href="https://annilla.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        前往部落格
        <span class="visually-hidden">（在新分頁開啟）</span>
      </a>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  width: min(100% - 3rem, 68rem);
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16.125rem;
  align-items: center;
  gap: clamp(2rem, 7vw, 6rem);
  min-height: min(42rem, calc(100svh - 5rem));
  padding: 4rem 0;
}

.hero-copy {
  max-width: 39rem;
}

.hero-eyebrow,
.section-eyebrow {
  margin: 0 0 1rem;
  color: #a95864;
  font-family: "Lora", Georgia, serif;
  font-style: italic;
  font-weight: 700;
}

.hero h1 {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.hero-name {
  color: #a95864;
  background: linear-gradient(90deg, #a95864, #eaaaa4);
  background-clip: text;
  font-family: "Satisfy", cursive;
  font-size: clamp(4rem, 9vw, 6.5rem);
  font-weight: 400;
  line-height: 1.15;
  -webkit-text-fill-color: transparent;
}

.hero-role {
  font-family: "Lora", Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.3;
}

.hero-description {
  max-width: 25rem;
  margin: 1.5rem 0 0;
  font-size: 1.25rem;
  line-height: 2;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.action-link {
  display: inline-flex;
  min-height: 3.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  color: #00113e;
  font-family: "Lora", Georgia, serif;
  font-size: 1.25rem;
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
  background: #90b2af;
}

.action-link-secondary {
  border-color: #c98f8f;
  background: #fff;
}

.hero-portrait {
  width: 100%;
  margin: 0;
  overflow: hidden;
  border: 0.75rem solid #add6d2;
  border-radius: 50%;
  background: #eaaaa4;
  aspect-ratio: 1;
}

.hero-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 0 5rem;
  padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
  border-radius: 0.5rem;
  background: #add6d2;
}

.blog-preview h2 {
  margin: 0;
  font-size: 2rem;
}

.blog-preview p:not(.section-eyebrow) {
  margin: 0.5rem 0 0;
}

.blog-preview .section-eyebrow {
  margin-bottom: 0.25rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 45rem) {
  .home-page {
    width: min(100% - 2rem, 35rem);
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    min-height: auto;
    padding: 3rem 0;
  }

  .hero-portrait {
    grid-row: 1;
    width: min(60vw, 15rem);
    justify-self: center;
    border-width: 0.5rem;
  }

  .hero-name {
    font-size: clamp(3.75rem, 16vw, 5rem);
  }

  .hero-role {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .action-link {
    min-height: 3.25rem;
    font-size: 1.125rem;
  }

  .blog-preview {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
}
</style>
