<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">跳至主要內容</a>
    <header class="site-header">
      <NuxtLink class="site-wordmark" to="/" aria-label="Anny Chang 首頁">
        Anny Chang
      </NuxtLink>
      <nav class="site-navigation" aria-label="主要導覽">
        <NuxtLink to="/">首頁</NuxtLink>
        <NuxtLink to="/projects/">作品集</NuxtLink>
        <NuxtLink to="/about/">關於我</NuxtLink>
        <a href="https://annilla.github.io/" target="_blank" rel="noopener noreferrer">
          部落格
          <span class="visually-hidden">（在新分頁開啟）</span>
        </a>
      </nav>
    </header>

    <NuxtPage />

    <footer class="site-footer">
      <p>© {{ currentYear }} Anny Chang</p>
    </footer>
  </div>
</template>

<style scoped>
.site-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.skip-link {
  position: absolute;
  z-index: 2;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.75rem 1rem;
  transform: translateY(-160%);
  background: #00113e;
  color: #fff;
}

.skip-link:focus {
  transform: translateY(0);
}

.site-header {
  display: flex;
  width: min(100% - 3rem, 68rem);
  min-height: 5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 auto;
  border-bottom: 1px solid rgb(0 17 62 / 12%);
}

.site-wordmark {
  color: #a95864;
  background: linear-gradient(90deg, #a95864, #eaaaa4);
  background-clip: text;
  font-family: "Satisfy", cursive;
  font-size: 2rem;
  line-height: 1.2;
  text-decoration: none;
  -webkit-text-fill-color: transparent;
}

.site-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem 1.5rem;
}

.site-navigation a {
  color: #00113e;
  font-size: 1rem;
  text-decoration: none;
  text-underline-offset: 0.25em;
}

.site-navigation a:hover {
  text-decoration: underline;
}

.site-footer {
  margin-top: auto;
  padding: 1.5rem;
  background: #00113e;
  color: #fff;
  text-align: center;
}

.site-footer p {
  margin: 0;
  font-size: 0.875rem;
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
  .site-header {
    width: min(100% - 2rem, 35rem);
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
  }

  .site-navigation {
    justify-content: flex-start;
    gap: 0.5rem 1rem;
  }
}
</style>
