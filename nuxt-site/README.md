# Nuxt 品牌網站

這是與根目錄 Hexo 分開的本機 Nuxt 子專案；此專案不包含部署或發布流程。

需要 Node.js `^20.19.0` 或 `>=22.12.0`。目前 Nuxt 3.21.11 與本機 Node.js 22.17.1 相容。

```powershell
npm install
npm run dev
npm run typecheck
npm run generate
npm run preview:static
```

`preview:static` 僅提供 `.output/public` 中已產生的檔案，不使用 Nuxt 後端或 SPA fallback；執行前請先完成 `npm run generate`。

Nuxt 與 Nuxt Content 由 Nuxt 團隊維護；TypeScript 是規格要求的直接依賴。使用者另已核准 `vue-tsc`（檢查 Vue 元件型別）與 `better-sqlite3`（Nuxt Content 本機資料庫）；未加入社群 Nuxt 模組、Vuetify、Pinia 或獨立預覽工具。
