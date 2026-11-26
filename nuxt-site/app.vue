<script setup lang="ts">
const route = useRoute();
const menuOpen = ref(false);
const currentYear = new Date().getFullYear();

watch(() => route.path, () => {
  menuOpen.value = false;
});
</script>

<template>
  <div id="top" class="site-shell">
    <a class="skip-link" href="#main-content">跳至主要內容</a>
    <header class="site-header">
      <NuxtLink class="site-wordmark" to="/" aria-label="Anny Chang 首頁">
        <img
          src="/images/brand/brand-logo.svg"
          alt=""
          width="80"
          height="80"
        >
      </NuxtLink>
      <nav
        id="site-navigation"
        class="site-navigation"
        :class="{ 'is-open': menuOpen }"
        aria-label="主要導覽"
      >
        <NuxtLink to="/" :aria-current="route.path === '/' ? 'page' : undefined">
          Home
        </NuxtLink>
        <NuxtLink
          to="/about/"
          :aria-current="route.path === '/about' ? 'page' : undefined"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/projects/"
          :aria-current="route.path.startsWith('/projects') ? 'page' : undefined"
        >
          Portfolio
        </NuxtLink>
        <NuxtLink to="/#blog">Blog</NuxtLink>
      </nav>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-navigation"
        aria-label="切換導覽選單"
        @click="menuOpen = !menuOpen"
      >
        <img src="/images/brand/menu.svg" alt="" width="50" height="28">
      </button>
    </header>

    <NuxtPage />

    <footer class="site-footer">
      <img
        class="footer-wave"
        src="/images/brand/footer-wave.svg"
        alt=""
        width="1279"
        height="276"
        aria-hidden="true"
      >
      <div class="footer-content">
        <nav class="social-links" aria-label="社群連結">
          <a
            href="https://github.com/Annilla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub（在新分頁開啟）"
          >
            <img src="/images/brand/github.svg" alt="" width="50" height="50">
          </a>
          <a
            href="https://www.behance.net/annilla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance（在新分頁開啟）"
          >
            <img src="/images/brand/behance.svg" alt="" width="50" height="50">
          </a>
        </nav>
        <a class="back-to-top" href="#top" aria-label="回到頁首">
          <img src="/images/brand/back-to-top.svg" alt="" width="54" height="74">
          <span>TOP</span>
        </a>
        <p>© {{ currentYear }} Anny Chang. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
    .site-shell {
      display: flex;
      position: relative;
      min-height: 100vh;
      flex-direction: column;
    }

    .skip-link {
      position: absolute;
      z-index: 30;
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.75rem 1rem;
      transform: translateY(-160%);
      background: var(--color-ink);
      color: var(--color-white);
    }

    .skip-link:focus {
      transform: translateY(0);
    }

    .site-header {
      display: flex;
      position: absolute;
      z-index: 20;
      top: 0;
      left: 50%;
      width: min(100% - 3rem, 72rem);
      min-height: 5rem;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      transform: translateX(-50%);
    }

    .site-wordmark {
      display: block;
      width: 5rem;
      flex: 0 0 5rem;
      text-decoration: none;
    }

    .site-wordmark img {
      display: block;
      width: 100%;
      height: auto;
    }

    .site-navigation {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0.5rem 1.75rem;
    }

    .site-navigation a {
      color: var(--color-ink);
      font-family: var(--font-display);
      font-size: 1.125rem;
      font-style: italic;
      font-weight: 700;
      text-decoration: none;
      text-underline-offset: 0.25em;
    }

    .site-navigation a:hover,
    .site-navigation a[aria-current="page"] {
      text-decoration: underline;
    }

    .menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border: 0;
      background: transparent;
      cursor: pointer;
    }

    .menu-toggle img {
      display: block;
      width: 2rem;
      height: auto;
    }

    .site-footer {
      position: relative;
      isolation: isolate;
      margin-top: auto;
      overflow: hidden;
      padding: 5rem 1.5rem 1.5rem;
      background: var(--color-pink-light);
      color: var(--color-ink);
      text-align: center;
    }

    .footer-wave {
      position: absolute;
      z-index: -1;
      top: -8rem;
      left: 0;
      width: 100%;
      height: auto;
      pointer-events: none;
    }

    .footer-content {
      position: relative;
      display: grid;
      width: min(100%, 72rem);
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 1rem;
      margin: 0 auto;
    }

    .social-links {
      display: flex;
      align-items: center;
      justify-self: center;
      gap: 1rem;
    }

    .social-links a {
      display: inline-flex;
      width: 3.125rem;
      height: 3.125rem;
      align-items: center;
      justify-content: center;
    }

    .social-links img {
      display: block;
      width: 100%;
      height: auto;
    }

    .back-to-top {
      display: flex;
      grid-column: 3;
      grid-row: 1;
      flex-direction: column;
      align-items: center;
      justify-self: end;
      gap: 0.25rem;
      color: var(--color-ink);
      font-size: 0.75rem;
      text-decoration: none;
    }

    .back-to-top img {
      display: block;
      width: 2.5rem;
      height: auto;
    }

    .footer-content p {
      grid-column: 1 / -1;
      margin: 0;
      font-size: 0.75rem;
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
        width: calc(100% - 2rem);
        min-height: 4.5rem;
      }

      .site-wordmark {
        width: 3.25rem;
        flex-basis: 3.25rem;
      }

      .menu-toggle {
        display: inline-flex;
      }

      .site-navigation {
        display: none;
        position: absolute;
        top: calc(100% - 0.25rem);
        right: 0;
        min-width: 12rem;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 0.5rem 1rem;
        background: var(--color-white);
        box-shadow: 0 0.75rem 2rem rgb(0 17 62 / 16%);
      }

      .site-navigation.is-open {
        display: flex;
      }

      .site-navigation a {
        padding: 0.75rem 0;
      }

      .site-footer {
        padding: 3.5rem 1rem 1.25rem;
      }

      .footer-wave {
        top: -4rem;
      }

      .footer-content {
        grid-template-columns: 1fr auto;
      }

      .social-links {
        justify-self: start;
        gap: 0.75rem;
      }

      .social-links a {
        width: 2.5rem;
        height: 2.5rem;
      }

      .back-to-top {
        grid-column: 2;
      }
    }
    </style>
