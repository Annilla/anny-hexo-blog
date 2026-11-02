## Why

將以文章為中心的 Hexo 網站翻新為個人品牌、作品集與部落格網站，採用使用者選定的 Nuxt。新版必須先在本機完整驗收，不能因開發或建置而取代現行 Hexo 正式網站。

## What Changes

- 在同一儲存庫新增獨立的 nuxt-site 子專案，採 Nuxt、TypeScript、Nuxt Content 與靜態輸出，不變更根目錄 Hexo 套件及鎖定檔。
- 優先採用 Nuxt 官方維護的套件與內建能力，不預先加入不必要的 Vuetify 或 Pinia；新增任何非官方直接依賴（含開發工具）前，須先說明必要性與官方替代方案並詢問使用者，取得明確同意才可安裝或整合。
- 新增首頁、作品列表與案例、關於我、文章列表與閱讀頁；視覺與正式內容先由使用者確認。
- 建立可重複的內容匯入與路由盤點，保留來源 Markdown、圖片及已發布文章網址；Portfolio.md 與 Resume.md 分別使用新版品牌頁網址 /projects/ 與 /about/，不在 Nuxt 保留其舊日期網址或建立轉址。Nuxt 每次產生新版時，這兩個品牌頁的日期年份自動採用產生當下的年份；原始來源及 Hexo 不變。
- 保留分類、標籤、彙整、分頁與 atom.xml RSS，加入 sitemap 及免費靜態搜尋。
- 「90% 可用」是成熟度描述而非測量值；必要功能全部通過，僅允許使用者接受的非阻擋視覺細節延後。
- 免費 GitHub Pages 切換為後續另行授權階段；本變更不建立發布流程、不變更 Pages、不部署、不刪除 Hexo。

## Capabilities

### New Capabilities

- `local-nuxt-brand-site`: 與 Hexo 隔離的品牌網站、本機靜態預覽及上線前核准界線。
- `static-blog-parity`: 已發布文章網址相容、品牌頁新網址、文章導覽、RSS、sitemap 及免費靜態搜尋。

### Modified Capabilities

無。現有 docs/spectra/specs 沒有需求規格，本次將並行新版行為建立為新規格。

## Impact

- 新增 nuxt-site 內的套件、設定、頁面、內容集合、遷移與驗證工具；必要時精準更新 .gitignore、README.md。Portfolio.md 與 Resume.md 的 Nuxt 版本在每次靜態產生時以當年作為日期年份；來源 Markdown 與現有 Hexo 行為維持不變，其他文章的日期網址不受影響。
- source、themes、_config.yml、package.json、package-lock.json 保持 Hexo 既有行為，不搬移、不改寫。
- 初始化前確認依賴版本、Node.js 需求與靜態搜尋相容性；不加入後端、付費服務或根目錄 workspace。
- 正式網站暫依現有設定為 https://annilla.github.io/；拼字、目標儲存庫、發布權限與回復方案留待獨立切換階段確認。

