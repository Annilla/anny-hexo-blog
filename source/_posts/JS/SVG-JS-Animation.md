---
title: SVG JS Animation
categories:
  - JS
thumbnailImage: https://cdn-images-1.medium.com/max/1600/1*HP8l7LMMt7Sh5UoO1T-yLQ.png
thumbnailImagePosition: left
coverImage: https://cdn-images-1.medium.com/max/1200/1*H-25KB7EbSHjv70HXrdl6w.png
coverMeta: out
tags: [JS]
date: 2022/02/14
updated: 2022/02/14
---

SVG 通常會搭配 CSS Animation 做動畫，效能很不錯。但問題來了，如果設計師給一張很複雜的 SVG Banner 圖，需要只動裡面其中幾個物件，那使用 JS 會比較方便，就不用每張切圖對 x,y 位置，且 JS 能撰寫比較多使用者互動。這次就來測試使用 [SVG.js](https://github.com/svgdotjs/svg.js) 做動畫。

<!--more-->

查看動畫結果點[這裡](https://annilla.github.io/svg-animate-js-test/svg-playground/dist/index.html)。

# 步驟一：找一張大的 SVG Banner 圖片

從 https://www.vecteezy.com/ 找一張可以測試的圖片。

把下載的檔案用 Illustrator 開啟，將想要做動畫的群組取名，如此一來以拉輸出後的 svg 檔案會自動在 html tag 加上 id 的屬性。

![用以拉將想要做動畫的群組取名](https://lh3.googleusercontent.com/pw/AM-JKLXnWoVOa7uTtIkkGUJfUAHbcmf3PUmTTE1yKqdaWG0-r6Pd9rAEr-DYqYOqsnFLbjgHIpNo0kvKTRKNYE9pGC5XAjj1oWOZLDiTKj5yLAjxUqjzFmGI1Oyuo-kiTCItxnC1sxCIU_Wpc6iPY-dse5ZhzA=w2206-h1378-no?authuser=0)

# 步驟二：開始做動畫

安裝套件。

```
npm install @svgdotjs/svg.js
```

引入套件使用。

```js
import { SVG } from "@svgdotjs/svg.js";
```

以氣球和氣球旁邊的愛心為例。會先用 SVG selector 把物件選取起來，在針對個別物件做 animate 的串連。若 animate 只有一次的話，可以用 loop 函數做重複即可，不需要另外寫 function。

先用愛心一次 animate 來說明。

```js
const BalloonLove = SVG("#svgjs #BalloonLove"); // 選取物件
BalloonLove.opacity(0.5); // 先讓愛心透明度 50%
BalloonLove.animate(1000, 0, 'now').translate(-10, -30).opacity(1).loop(true, true); // animate 動畫(duration, delay, 什麼時候開始), translate 移動位置, opacity 透明度 100%, loop 重複
```

若 animate 分多段的話，以氣球為例需要寫一個函數重複執行。

```js
const Balloon = SVG("#svgjs #Balloon"); // 選取物件
// Balloon
function BalloonLoop() {
  Balloon.animate(1000)
    .ease("<>")
    .translate(-30, 10)
    .animate(1000)
    .ease("<>")
    .translate(70, 10)
    .animate(1000)
    .ease("<>")
    .translate(-40, -20)
    .after(BalloonLoop); // 在動畫之後重新執行函數
}
BalloonLoop(); // 觸發函數執行
```

# 步驟三：和使用者做互動

這邊做了一個小互動是當 Happy Valentine's Day 動畫結束後，會感應使用者的滑鼠位置，做文字群組的相對位置移動。



所有原始碼在[Github](https://github.com/Annilla/svg-animate-js-test)，下次見～