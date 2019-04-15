---
title: Google Material Studies - Reply
categories:
  - UXUI
  - Material Design
thumbnailImage: https://beta-static.photobucket.com/images/ae138/anny09117011/0/21bddd8b-c51b-4c3a-8101-d7c5a1859060-original.png?width=1920&height=1080&fit=bounds
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

# 排版

Reply 使用 12 grid system。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1HuRM4KXNObz38eqqiQsqUusTWe_iua8E%2Fcasestudies-reply-grid-1a.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 視覺層級

Reply 使用顏色來區分不同的元件。例如，卡片容器是可見的，因為卡片具有白色表面顏色，而應用程式的背景是灰色的。

由於 Reply 有時候會顯示密集的內容，因此不要使用陰影會降低視覺的複雜性。他還允許項目之間有較小的間距，從而為內容流出更多的空間。

![視覺層級](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1EmDZJ6SLz0CwwbxPiaYXqkTDbt2n_FKI%2Fcasestudies-reply-elevation.png "視覺層級")

# 顏色

Reply 的顏色主題使用一個主色調(深藍灰色)和一個輔助色(橘色)。

由於輔助色很少用到，因此 Reply 的 UI 通常是單色的，主要使用主色調的深淺變化。這種微妙的顏色主題可以輕鬆閱讀內容而不會分心，並且可以輕鬆看到頭像。

每當使用輔助色的時候，視覺上都會產生明顯的影響。

![顏色主題](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1XUGSUZeLYqhH--JBBHWLkRnJzVmX13oR%2Fcasestudies-reply-color.png "顏色主題")

# 文字與圖示

Reply 使用 Work Sans 作為字體。不同比例的 Work Sans 提供了 Reply 內容所需的種類。透過使用六種不同的權重來呈現內容：Light，Regular，Medium，SemiBold和Bold。

![字體](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1WzYaZo4FsrHq8dgXw-hQ0OViJ56dRDNM%2Freplytypescale.png "字體")

Reply 的 icon 具有細微的風格，表達品牌也同時專注於 icon 識別與功能。

1. 所有圖示使用一樣的格線架構確保一致性。
2. 所有 Reply 圖示

![圖示](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1J1sfDmQOyuvwfqAID1GY5d9bO66G5wVm%2Fcasestudies-reply-icons-alt.png "圖示")

# 形狀

元件根據大小使用不同的形狀類型，將形狀做分類可以讓螢幕一次放多個元件，分類包含：

1. 小元件 (S)：延伸的FAB(floating action button)。圓角 50%。
2. 中元件 (M)：。
3. 大元件 (L)：。


## 參考資料

* [Material Studies - Reply](https://material.io/design/material-studies/reply.html)