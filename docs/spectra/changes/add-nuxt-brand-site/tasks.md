## 1. 基準、使用者決策與隔離基礎

- [x] 1.1 建立「單向內容匯入與路由基準」的來源及資源清單，量測當下 Markdown 數量，以安全、不部署、不寫入外部搜尋服務的 Hexo 產生方式取得公開路由；以 sourcePath、published、legacyUrls、資源及排除理由逐筆核對基準，不執行含部署的根 build，保留原工作目錄改動。
- [x] 1.2 落實「使用者確認品牌視覺與內容」決策，依 design.md 使用核准的首頁、導覽、字體色彩、手機版、作品素材及 Portfolio／Resume 對應，英文草寫姓名採 Satisfy；以設計決策比對確認規格完整，未核定的素材或數值不得自行補定。
- [x] 1.3 [after: 1.1] 建立「獨立 Nuxt 子專案與純靜態預覽」及 Isolated local application，遵守「Nuxt 官方套件優先與非官方依賴核准」及 Official package preference and dependency approval；先查核套件歸屬，非官方直接依賴、CLI 與開發工具先說明必要性及替代方案並取得使用者核准，不預裝不必要的 Vuetify 或 Pinia。在 nuxt-site 使用相容 Nuxt、Nuxt Content、TypeScript、Node.js，提供 dev、typecheck、generate、preview:static 並忽略產物；以依賴核准紀錄、型別檢查、空白靜態頁直接請求及根套件／鎖定檔差異確認隔離，不加 workspace 或發布流程。

## 2. 分批遷移與頁面

變更記錄：原 2.3 中要求 Nuxt 保留 Portfolio／Resume 日期式舊網址的部分已依新版決策取消；內容遷移、圖片與文章網址驗收仍待執行。更新後的 2.3 驗證新路徑及舊路徑不生成；本記錄不代表遷移已完成。

- [x] 2.1 [after: 1.2, 1.3] 實作 Traceable one-way content migration 的集合與文章匯入，提供 content:import、content:check 及 migration-manifest.json，保持來源唯讀；以公開／非公開文章固定資料驗證來源雜湊、用途、目標、排除理由及重複匯入一致。
- [x] 2.2 [after: 2.1] 實作 Explicit migration failures and synchronization，檢出來源新增／修改／刪除、非法日期、不支援語法、目標衝突與人工修改衝突；以失敗資料驗證非零結束碼、具體錯誤路徑及不覆寫來源與人工內容。
- [x] 2.3 [after: 2.2] 實作 Published article URL and asset compatibility、New routes for migrated brand pages 與 Nuxt 品牌頁日期年份採用產生當年；將 Portfolio.md 與 Resume.md 分別輸出至 /projects/ 與 /about/，每次 Nuxt 產生時以當年取代新版品牌頁日期年份並保留來源月份、日期；以固定時鐘驗證產生值，確認來源雜湊及 Hexo 不變、兩個舊日期網址無頁面／別名／轉址，且已發布文章未來日期網址維持原路由；以缺圖、大小寫不符及重複目標資料驗證具體錯誤會阻擋驗收。
- [x] 2.4 [after: 2.3] 依核定視覺建立導覽、頁尾、首頁、作品列表與案例、關於我，完成 Confirmed brand pages 呈現；以桌面及手機預覽確認英文草寫姓名使用 Satisfy，並以鍵盤檢查入口可達、素材真實、無作品空狀態，不以佔位素材當完成。
- [x] 2.5 [after: 2.4] 建立文章列表、閱讀頁、已發布文章舊網址與新品牌頁入口，完成 Standalone static output；以一般靜態伺服器且無 SPA fallback 直接請求及重新整理文章、/projects/ 與 /about/，確認內容完整、兩個舊品牌頁日期網址及其他未知路徑回應 404，且不需 Nuxt 後端。

## 3. 文章導覽、訂閱與搜尋

- [ ] 3.1 [after: 2.5] 實作「靜態導覽與免費搜尋」中的 Static blog discovery and pagination，產生分類、標籤、彙整及每頁十篇的路由；以十一篇且含同日期文章的固定資料驗證日期降冪／網址升冪、無重複遺漏、頁碼直接開啟與空狀態。
- [ ] 3.2 [after: 3.1] 完成 Free static content search，先評估 Nuxt 官方內容能力；若不足，依 Official package preference and dependency approval 說明 Pagefind 等非官方候選的必要性與替代方案，取得明確核准後才安裝、執行或整合，先前提及不等於核准。驗證 Windows、Nuxt 與中文相容後，於 generate 後建立公開文章及作品索引；以核准紀錄、中文命中、無結果、載入中、索引載入與建置失敗驗證連結、明確狀態及非零結束碼，不相容先回報取得替代方案確認。
- [ ] 3.3 [after: 3.2] 實作 RSS and sitemap 與 canonical metadata，維持 /atom.xml；解析生成 XML，驗證正式網址連結、/projects/ 與 /about/ 為品牌頁 canonical、兩個舊日期網址不在 sitemap，且無草稿或重複相容 canonical，直接請求兩份靜態文件。

## 4. 本機驗收與部署界線

- [ ] 4.1 [after: 3.3] 完成 Local acceptance gate 的技術驗證，執行 typecheck、content:check、generate、preview:static，核對路由、內容、圖片、導覽與搜尋並加入深層頁面直接請求的自動化檢查；以不部署的產生確認 Hexo 仍可用，根套件及設定未改寫。
- [ ] 4.2 [after: 4.1] 完成「本機驗收與部署分離」及 Explicit production boundary，精準更新 README.md 的子專案指令與根 build 部署警示，記錄免費 Pages 切換須另確認帳號／儲存庫、權限、舊站備份與回復要求；以差異檢查確認無發布流程、憑證、遠端變更或移除 Hexo。
- [ ] 4.3 [after: 4.2] 交付本機靜態預覽，請使用者審閱桌面、手機、鍵盤、作品與文章並記錄 Local acceptance gate；未通過保留未完成，僅必要功能全通過且使用者接受剩餘非阻擋視覺細節後完成本機階段，仍不部署。

