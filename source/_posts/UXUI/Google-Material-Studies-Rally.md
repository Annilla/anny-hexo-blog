---
title: Google Material Studies - Rally
categories:
  - UXUI
  - Material Design
thumbnailImage: https://beta-static.photobucket.com/images/ae138/anny09117011/0/21bddd8b-c51b-4c3a-8101-d7c5a1859060-original.png?width=1920&height=1080&fit=bounds
thumbnailImagePosition: left
coverImage: https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1MvqIqiMU-07zdfL5gFNeKeg1DrzFHOtj%2Fcasestudies-rally-main.png
coverMeta: out
tags: [UX, UI, Material Design]
date: 2019/04/05
updated: 2019/04/05
---

Material Guildline 應該很多設計師都閱讀過 N 遍了，但要設計時如何在框架下做到客制這件事應該還是很疑惑。官網上提出了幾個業界的實例分享，這點讓我很有興趣，所以接下來我會一一對這些案例做介紹。因為我上班做的案子比較多是系統類的設計，所以我第一個想介紹比較類似的是 Rally 這個案例。下面內容會一邊介紹，一邊穿插自己在職場上的一些心得或想法。

<!--more-->

# 案例背景

Rally 是一個管理財務的 APP，它會追蹤使用者的花費習慣並產生預測和適當的警示通知。Rally 是設計來呈現大量且密集的資訊，讓使用者可管理和研究資料模式。

### 數據性導向之美 (Data-driven aesthetic)

UI 採用暗灰色提高質感，並用亮色系凸顯資料。在資料與背景顏色高對比之下，讓使用者更容易閱讀 APP 內的圖表。

![Rally UI](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F16CNi69TWdOluvYdoeNwd5QK4P5nkE48-%2Fcasestudies-rally-brandattributes.png "Rally UI")

UI 設計專注在查看、研究和了解資料。圖表呈現在儀表板上，讓使用者查看花費摘要和單一交易的細節。此 UI 設計透過排版、顏色和形狀的凸顯，讓畫面是密集且直覺的。

> 心得：蠻喜歡這樣的暗色背景搭亮色的配色，但因目前公司的一般使用者還是比較習慣白色背景的配色模式，所以暗色背景的搭配在考慮時間和緊急度下，我自己是只敢用在自己小組內部用的專案上，比較沒有時間上的壓力。

# 產品架構

Rally 架構是層級式的，讓使用者透過不同分類查看他們的財務。

內容根據個人財務區分不同的 sections，像是帳戶、預算、帳單。首頁著重在讓使用者前往這些 sections 的導向。

### 導覽列

因為 Rally 專注在呈現和描述不同面向的財務資訊，所以如何讓使用者能輕易的在這些sections 移動是很重要的。Rally 有一個固定位置的導覽列讓使用者能方便的切換 sections。在桌機和平板，Rally 使用的是直列式的導覽列。在手機，則是用橫向標籤的方式。這項的導航模式很理想，雖然它們總是在屏幕上，但佔用的空間非常小。

![Rally 導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1PIJeS6GJLIExYX9mWOmb7UzWB0-Nl5VB%2Fcasestudies-family-rally.png "Rally 導覽列")

在直列式的導覽列中，每個目的地會用一個獨特的 icon 呈現。當 section 被點選的時候，icon 就會變亮且標題會出現在 icon 下方。

![直列式的導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1-qsgxAELdMrSDPRKV-l-N_2dW5fYeljj%2Fcasestudies-rally-rail.png "直列式的導覽列")

在橫向標籤導覽中，當 section 被點選的時候，icon 就會變亮且標題會出現在 icon 右方，其他 icon 將會適當的移動位置。

![橫向標籤導覽](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1dHfpA4R1RVHn5zRSxInMllujv_C7pxv7%2Fcasestudies-rally-tabs.png "橫向標籤導覽")

> 心得：這邊如果導覽項目數目很少，這樣設計ok。但要注意往後的擴充性，若是 section 的數目增加是否要增加 sub section，手機上方 tab 的空間是否會不夠呈現，這些都是可能會碰到的問題。

# 排版

Rally 使用 12 grid system。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1lAQUZTvSoen3matP1gpDJqVpKnZpARy6%2Fcasestudies-rally-grid-1a.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 視覺層級

Rally 使用色彩或紗幕來區分視覺上的層級。

舉例：當使用者滑動下方資料的時候，為確保統計圖固定在上方，使用不同的色彩來區分視覺層級。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1dq6I1nDovqvUydVHH5jTeI9VA6ftfz7H%2Frally-flow1-170808-casestudies-rally-elevation-1a.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

舉例：當有 popup 出現時，背景使用紗幕霧化背景。

![霧化背景](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1eBiwYfz1_8oSLrlWN_9uNjA_TGVqRBS2%2Fcasestudies-rally-elevation-scrim.png "霧化背景")

> 心得：用色彩和霧化效果來做層級區分我覺得還蠻實用且能提升質感。但在霧化背景的方式，需要考量到開發者是否能配合。若還有捨棄不了 IE 瀏覽器的公司，則會因為裝置的限制而必須要有第二方案來替代霧化的方式，比如說改用暗色且透明度低的樣式。

# 顏色

有時候需要顯示多個圖表在一個螢幕上，且每個圖表包含多個 sections。為了能足夠表達狀態， Rally 的配色採用 1 個主色調加上 5 個配色。這個設計讓系統呈現可讀性高且獨特的信息圖表。

當三個圖表出現在同一個螢幕上，每個圖表使用其中的兩個顏色。

1. Primary Green and Dark Green.
2. Orange and Yellow.
3. Purple and Blue.

![配色](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1TnwFyAe31SQDfL21qM9hZ1dcGQVRyB23%2Fcasestudies-rally-color-75percentzoom.png "配色")

### 顏色主題

除了 6 色以外， Rally 還有一個針對這 6 個顏色延伸 10 色版的調色盤。如下圖。

* 圓圈形狀代表在此 APP 中有用到的色版
* "P" 代表主色調
* 其他沒有文字的圓圈則是配色

![顏色主題](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F17gZmwIGdzlDr-Hl2jTu2SSgc_ATBGaPt%2Fcasestudies-rally-color-palettes.png "顏色主題")

> 心得：我還沒用過那麼多的配色設計過，因為顏色越多，需要考量的點會更複雜，可能需要找時間嘗試看看。

# 文字與圖示

Rally 用兩種字體：Eczar 和 Roboto Condensed。

1. Roboto Condensed：介面預設字體，適合密集的佈局。
2. Eczar：只用在首要標題和純數字清單，適合呈現數據。

![字體](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1t7i8LPPdmRkpdLV4u-p0oHvlhRTRbEb3%2Fcasestudies-rally-type.png "字體")

Rally 使用客製化的 icon 來呈現不同的 sections。

1. 所有圖示使用一樣的格線架構確保一致性。
2. 所有 Rally 圖示

![圖示](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1zqz0w6AEK_D9Kxb8ntWTb8lXJHkGjakk%2Fcasestudies-rally-icons.png "圖示")

> 心得：在數據表達的部分使用另一種字體這是一個不錯的點子，可以凸顯出數據的呈現，會想要嘗試看看。圖示的部分，在統一格線架構下設計很合理，但在一般專案時間不足的狀況下，通常我會直接使用 Material Icons ，省去設計圖示這塊。

# 形狀

元件根據大小使用不同的形狀類型，將形狀做分類可以讓螢幕一次放多個元件，分類包含：

1. 小元件 (S)：文字輸入區塊(Filled text fields)。
2. 中元件 (M)：卡片(Cards)。
3. 大元件 (L)：數據表格(Data Tables)。

元件都是 0 圓角。

![形狀分類](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1RpTrPB3UprQBcFfZh6ZnI4xNtUEyThIQ%2Frally-shape.png "形狀分類")

![形狀元件](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1HuOHmVEu0rKr8Bfes708nHM9osOWiHIm%2Frally-shape-b.png "形狀元件")

# 元件

### 卡片和清單

在 overview 頁面使用卡片去呈現多個財務摘要，像是 Accounts 和 Bills。

![卡片](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1gDGHc1gTW-FsOvmmXjZ6i5UF_U9CS0Ga%2Fcasestudies-rally-cards-1.png "卡片")

當點選 Accounts，摘要資訊卡片會展開顯示更多細節在清單中。

![清單](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F128elUbInT1Me7Ra3gJGsndRDRq6JbAcn%2Fcasestudies-rally-list.png "清單")

### 橫幅、提示bar和對話框

* 橫幅(Banners)：比較不那麼重要的訊息選擇用橫幅的方式呈現，通常會搭配圖示。
* 提示 bar 和對話框(Snackbars and dialogs)：重要的訊息則是用提示 bar 和對話框呈現，並不會包含圖示。

在平板上的橫幅呈現在導覽列旁。

![橫幅 - 平板](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1X3ShTSv1KbUgazHtrp7wzXApy36TH1na%2Fcasestudies-rally-alerts-tablet.png "橫幅 - 平板")

在手機上的橫幅呈現在最上方。

![橫幅 - 手機](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1qcuHjBEJaoYI-_Vel0SlCTr4MXrlO3Ta%2Fcasestudies-rally-alerts-mobile.png "橫幅 - 手機")

在桌機上的橫幅則是自己一個直欄位專門呈現。

![橫幅 - 桌機](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1aEZcxrXD6L__739kup3Zzi5x73UFoIiz%2Fcasestudies-rally-alerts-desktop.png "橫幅 - 桌機")

重要訊息出現提示 bar 或對話框。

![對話框](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1UGbGapFacfgXBv5ijUiAjwNBKmw2v9yh%2Fcasestudies-rally-dialogs-mobile.png "對話框")

![提示 bar](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1ccB2eglPzvAai1YC4QgkxgYlFErDtJFs%2Fcasestudies-rally-snackbar.png "提示 bar")

> 心得：沒有將這三個元件一起混用的經驗，頂多用其中的兩個而已，所以他這樣從訊息的重要性來區分用哪種元件的方式很值得參考。

# 交互動作

Rally 在登入頁面顯示動畫 logo 增加 APP 的印象。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SdTGjLEmVjxVQfQHUxjrbWEO9GEnbHab%2F01-rally-launch.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

當用戶點開一個帳戶時，畫面會使用從內到外漸變展開的子頁面。點選返回後，則會從外到內漸變縮合回上一頁。加強使用者對深度的感知。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SjV2Eky-4d80UhOL4dm9k-EhG-r8IDm2%2F02-rally-parentchild.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

點選頁籤則是使用左右滑動的漸變動畫。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SkeVD6imJA_MwjipNR-DbNh1xw4au9yy%2F02-rally-tabs.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

當引入新頁面元素時會使用上方的進度條作為導引。使用時間差的轉圈動畫來凸顯圓餅圖。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SmqucW2ugbXboWf8SSjVngVtm63_VLxf%2F03-rally-sequencing.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

對話框使用彈跳的方式，以傳達訊息的急迫感。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SrDQ1yFyIyFYWewhvEIIBZ9Mm0S-6G2z%2F04-rally-overshoot.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

> 心得：對於父子頁面漸變展開的動畫提升深度感知這點很認同，但在實作上還沒有真正的實行過，可以思考或和其他程式開發者討論實際在 web 或 app 撰寫時的執行難度。

總結：讀完這篇研究後，對於 Material Design 在系統設計上的應用來說，我覺得是很實用的，畢竟要做系統通常都是要大量顯示資訊，如何有條理讓使用者理解顯示資訊變得很重要。這篇在配色和交互動作的部分是很值得參考的案例。

## 參考資料

* [Material Studies - Rally](https://material.io/design/material-studies/rally.html)