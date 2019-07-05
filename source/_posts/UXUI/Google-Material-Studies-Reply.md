---
title: Google Material Studies - Reply
categories:
  - UXUI
  - Material Design
thumbnailImage: https://lh3.googleusercontent.com/NmeFZOUv61q1keVwsDGU-SYe54WbcTGUaBK4MUv2qpnOZUeBmoIQnctDY2i30Xg9Piub1aUE1hhv_YZkN6aeZ0OeEiFqYy4nQix_M2k6M5Zn1uy6_0BDfTzuD0YfrlezhMtIGlKoVprSIU8jy4204KOqm7k4QJL31RCgQZ6ruuJMX-Ad84Uoyr-4LqIjRdDKG63wsyVnef7GFtHTFFyAcwRfD0D0hqZfDL6X5xZ0IomCU1mnvbPi3kWvWJzFbhypokNRRLGiTRxemhwQmV1IltU_lmZ7S6pdwwsz8GaVW7T7WTXImkmvePksormq21WQJgFdgWndEQDMPoCtQZLarnSNMaHynca_Wi-33a1VAI78aI0jIIXKP7RYmh7JRVY9Mobf2qBFOGFkd64E7uBatZ5VZ8GHwqXWazRZ-I4pFF_medM8ecpPLRTar-KY01iKGMu3zYZ2Z9xMO_AI0x3ibI7XAR71_8hquDpzvUGffIOXqvX5r3H49xYpWMCpPpwfT7NYd3k1W24ncV6TLWE_9cj5pRsY1qCHeqdn2HfkRLBGY0czDFb5J47OwXn0vBzNOuYtWbLGauqZ-sUVSTeO15j2A9gMm3BR0ZmiFb7c1azsyO4n-_-0GCHvJckr4-iRRg7GocwbYjZZdsTlDGvf0bHXkAmhFhWY=s225-no
thumbnailImagePosition: left
coverImage: https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SQ4QjhRgR9OjvjBR80HVXxxMOSg9U7Zs%2Fcasestudies-reply-brandattributes.png
coverMeta: out
tags: [UX, UI, Material Design]
date: 2019/05/01
updated: 2019/05/01
---

上次介紹的 Rally 是關於統計分析型的系統，這次要來看的是偏向應用型的系統 Reply。

<!--more-->

# 案例背景

Reply 是一款幫助個人和群組溝通的 APP，其設計理念為提供清晰、易讀、直觀和易用的應用程式。

### 功能性導向之美 (Functional aesthetic)

Reply 的品牌精神強調溝通的重要性。因此，設計著重於功能品質，放置許多易用性元素。

Reply 的品牌時常伴隨著用戶的操作動作，例如從品牌的 logo 點擊展開導覽列。

> 心得：這種會讓使用者頻繁編輯操作的 APP 也常常出現在公司內部，例如報價單、簽核表單等等的應用程式，所以在許多使用者操作行為下，如何清楚的呈現資訊和導引使用者動作變得非常重要。

# 產品架構

Reply 使用類似於其他電子郵件應用程序的產品結構：包含新郵件和存檔郵件的收件箱，以及圍繞在組織和執行與這些郵件相關操作的 UI 。郵件可以加上星星標示、發送、刪除、標記為垃圾郵件，或以使用者自定義方式來整理郵件。

### 專注在使用者任務

由於使用者任務主要涉及內容生產和處理，因此螢幕空間專注於內容呈現而非其他 UI 元素。為確保內容和導航列都有足夠的空間，Reply 會針對桌機、平板、手機裝置使用不同的導航模式。

![Reply 導覽模式](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1XRLqbRWX43Sm4h1u8y04J4O7SKLY1ASs%2Fcasestudies-reply-family.png "Reply 導覽模式")

### 抽屜式導覽列

在桌機，Reply 使用標準的抽屜式導覽列。導覽列同時使用 icon 和文字。最上方包含設置、切換帳號和有搭配箭頭的 logo 拿來縮合導覽列。點擊搭配箭頭的 logo，將會縮合成軌道式導覽列。

![Reply 桌機導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1odXyicfqCiZ-NfE4Oi8iNP4wO-rmEZZ9%2Fcasestudies-reply-productarch.png "Reply 桌機導覽列")

### 底部 bar 導覽列

在手機，Reply 使用底部 bar 導覽列。點擊左下角的 Reply icon ，他會從底部展開顯示抽屜式導航列，其中包含設定、切換帳戶頭像等動作。再次點擊 Reply icon 時，導航會關閉，導航列會關閉並返回底部預設的 bar 狀態。

![Reply 手機導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1OVQU4zWktolBn0pEaT9fu_5xCxGsXzm9%2Fcasestudies-reply-bottomsheet.png "Reply 手機導覽列")

### 軌道式導覽列

透過點擊 Reply logo，軌道式導覽列可以展開變成抽屜式導覽列。Logo 旁邊的箭頭表明 Reply logo 是可交互的。

軌道式導覽列非常適合在平板電腦上使用，因為它可以顯示大量的目的地，且佔用很小的空間。當軌道式導覽列被展開時會顯示使用者創建的資料夾，讓用戶讀取資料夾的標題文字。

當收合時，軌道式導覽列不顯示使用者創建的資料夾。因為這些自創的資料夾都使用同個 icon，他們無法用單一 icon 做區別。

![Reply 平板導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1tr41eJcVoKTnE7rq9vDBpaWUlVLdTlPa%2Fcasestudies-reply-railnav.png "Reply 平板導覽列")

> 心得：手機底部的導覽列是我沒嘗試過的設計，因為工作上比較常做 Web 的應用，所以通常會使用上方 bar。但這樣使用下方 bar ，可以讓內容集中在上方，對於大量內容的呈現是很好的選擇。

# 排版

Reply 使用 12 grid system。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1HuRM4KXNObz38eqqiQsqUusTWe_iua8E%2Fcasestudies-reply-grid-1a.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 視覺層級

Reply 使用顏色來區分不同的元件。例如，卡片容器是可見的，因為卡片具有白色表面顏色，而應用程式的背景是灰色的。

由於 Reply 有時候會顯示密集的內容，因此將陰影移除會降低視覺的複雜性。並將項目的間距拉小，從而為內容流出更多的空間。

![視覺層級](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1EmDZJ6SLz0CwwbxPiaYXqkTDbt2n_FKI%2Fcasestudies-reply-elevation.png "視覺層級")

> 心得：利用小間距和去除陰影來顯示密集的內容，這點我在工作上也常常用到，最近剛做產線人員掃條碼顯示 64 條資料要同時呈現在一個畫面上，光是設計就佔了很重要的角色，畢竟在寫程式之前可以先有個底，才不用花費大量時間在調整版面上。

# 顏色

Reply 的顏色主題使用一個主色調(深藍灰色)和一個輔助色(橘色)。

由於輔助色很少用到，因此 Reply 的 UI 通常是單色的，主要使用主色調的深淺變化。這種微妙的顏色主題可以輕鬆閱讀內容而不會分心，並且可以輕鬆看到頭像。

每當使用輔助色的時候，視覺上都會產生明顯的影響。

![顏色主題](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1XUGSUZeLYqhH--JBBHWLkRnJzVmX13oR%2Fcasestudies-reply-color.png "顏色主題")

> 心得：這種配色是我平常常用的方式，因為顏色少的話在配色方面比較不容易混亂，相較於上一篇介紹 [Rally](../../../../../2019/04/05/UXUI/Google-Material-Studies-Rally/) 的 6 色，Reply 就是保守派。

# 文字與圖示

Reply 使用 Work Sans 作為字體。不同比例的 Work Sans 提供了 Reply 內容所需的種類。透過使用六種不同的權重來呈現內容：Light，Regular，Medium，SemiBold和Bold。

![字體](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1WzYaZo4FsrHq8dgXw-hQ0OViJ56dRDNM%2Freplytypescale.png "字體")

Reply 的 icon 具有細微的風格，表達品牌也同時專注於 icon 識別與功能。

1. 所有圖示使用一樣的格線架構確保一致性。
2. 所有 Reply 圖示

![圖示](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1J1sfDmQOyuvwfqAID1GY5d9bO66G5wVm%2Fcasestudies-reply-icons-alt.png "圖示")

# 形狀

元件根據大小使用不同的形狀類型，將形狀做分類可以讓螢幕一次放多個元件，分類包含：

1. 小元件 (S)：延伸的 FAB (floating action button)。圓角 50%。
2. 中元件 (M)：卡片 (Cards)。圓角 0。
3. 大元件 (L)：底部清單 (Bottom sheets)。圓角 12dp 12dp 0 0。

![形狀分類](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1Zv545CazM0c_SvUuZqnUg6hE7Dv-S3m0%2Freply-shape.png "形狀分類")

![形狀元件](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1J8hIuMxjeCb-xIkot0krL8abdBIIIqfw%2Freply-shape-b.png "形狀元件")

# 元件

### 浮動動作按鈕 (Floating action button)

在手機上， Reply 在底部嵌入自定義的 FAB (Floating action button)。

![手機自定義的 FAB](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1GhRm29BQNQHyLVPO0q_JdgYN4G82YjUS%2Fcasestudies-reply-nestedfab.png "手機自定義的 FAB")

在桌機上， Reply 使用自定義的 FAB 延伸，和抽屜式導覽做搭配。

![桌機自定義的 FAB](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1wNWnttN_BLCzr5bi2w-8VDEbCTV8sh66%2Fcasestudies-reply-extendedfab.png "桌機自定義的 FAB")

### 底部 bar, 底部清單

在手機，Reply 使用客制的底部 bar 和動作按鈕。

1. 預設的底部 bar
2. Reply 的底部 bar 使用客制的 icon, 顏色和形狀。Reply logo 做為選單功能 icon 被包含在元件中。客制形狀的底部 bar 包含浮動動作按鈕。

![底部 bar](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1jTk6oF1ib0k1wIhXnjTLn0kgEZxNznl5%2Fcasestudies-reply-bottombar-compare.png "底部 bar")

在手機，底部 bar 是切換導覽和進行動作的主要方式。
當使用者選取多個進行動作時，底部 bar 會變成內文動作 bar。

![內文動作 bar](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1a-17T_B8F7nlrJc9pJ6opEdFG-cuccmZ%2Fcasestudies-reply-contextualactionbar.png "內文動作 bar")

當使用者滑動頁面的時候，底部 bar 會從螢幕消失，只剩下 FAB 按鈕。

![滑動頁面剩下 FAB](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1I1RcG9mNZYJgCPZu9u_wsYBaiHxNIJ8Q%2Fcasestudies-reply-floatingfab.png "滑動頁面剩下 FAB")

### 卡片

Reply 將郵件呈現在客制的方角卡片上。每張卡片的間距非常小，因為顏色代表每張卡片的邊界(沒有使用任何陰影)。小間距讓更多內容可以呈現在螢幕上。

當卡片往右邊滑時，會出現對郵件標示星號的動作按鈕。

![卡片往右滑](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1FJEijR5c1uTkUcHsUUU0GHLuupehX39-%2Fcasestudies-reply-cards-1.png "卡片往右滑")

當卡片往左邊滑時，會出現對郵件刪除的動作按鈕。

![卡片往左滑](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1WZlOkz0ZWCN4BhIWrvM7H4NsvlNxt5OI%2Fcasestudies-reply-cards-2.png "卡片往左滑")

### 小標籤 (Chips)

Reply 的小標籤 (Chips) 使用客制的文字、顏色和圖像大小。在視覺上和品牌相吻合。

![小標籤](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1bQe04HeiZ4CLLKEVXGs_B-yYd4mc_Ztx%2Fcasestudies-reply-chips-alt.png "小標籤")

> 心得：此專案對許多 material components 做客製化的樣式修改，礙於工作要同時做設計和開發的時間限制下，我比較沒有對這方面下過功夫，或許下次我可以從微調一些元件樣式來增加對品牌的塑造。

# 交互動作

Reply logo 的動畫其描繪靈感來自捲曲紙張路徑。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1CmJcj6oa4Qwo_i8KkNaruAtMOCNnnpfw%2F01-launch.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

Reply 使用較短的動畫時間來加強動作效率。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1MfIr9GSQ4iAfUNoAtKIUKX0lP6Kxt8kC%2F02-reply-navtransitions.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

插圖動畫在用戶使用的關鍵點出現，例如完成收件夾中每個項目的存檔後，觸發了一個慶祝動畫。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SapnI_EXJwjkvMb87hWWakpTMLIKoxiQ%2F03-reply-inboxzero.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

當使用者將頁面往下拉重新整理時， Reply 的 logo 動畫會出現在上方。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F120IhHIDr-BHTPrTmFnXpEHfsOJEdVsg8%2F04-reply-pulltorefresh.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

> 心得：logo 動畫二次使用在 Refresh 頁面上，我覺得這點非常不錯，除了讓畫面生動起來也可以節省設計時間。

總結：Reply 讓我學到更多對 material component 做更細微設計的靈感，希望之後有機會多做一點有趣的元件設計提升品牌形象。

## 參考資料

* [Material Studies - Reply](https://material.io/design/material-studies/reply.html)