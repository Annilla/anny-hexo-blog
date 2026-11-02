---
title: D3 v4 with Vue - CANVAS Line Chart
categories:
  - D3
thumbnailImage: https://lh3.googleusercontent.com/0ql8YPK9TWE2Iw2k5riCgtn6op1D95u8PM6OpYAiq1dZsrJ580p9Cmprzs4lMk8WAHeO81FEcsbR76fEphaIz67O6YylI2bxFQu3BHhcm3k0IP6whT76GyTmsR7HANYz1KeJVTTG2X4-KxV7zh_FsAhdZ8j-gz2BcWsaYonzgm2-bzEDNEvkCTiH9klL6RGWE9YhK_BfjR402BCev0Uq5nwNwEhHjqBeIpv-ePFTAux2RXkdXZ9iz67SKQ0h_q-w7vB9oPzPrg8FZUwK-WbM0uoKQI5IZP0BUXf9eyE8_fFa3YPO9u4V1Dhcf6YsMfCIvO6OpYvh5PeWKpDWm2q80MmUKrAp0G2nthLFwcC5JZlfWWiM-mPbZ04Oklp61oOOLA6bdBJCvMtmwCiycopM3bXsmCA06hK4hDyjRiT_foULVswowzSRc7KsL-p5ayX6Gg2mmdX45Ile4Tw7NjLk8-bVBHhC6gb6DnbDFitOQ6RVKSwXn6WK98i11j3PykdwonGTkc4_9Q9v-dOWSVSpdE1Ouy0wjCDFn0tYH7OPF1tRnht7JgbdrWw0p-AJ9O_jHy6K-BQN4I6n9HchsrRvZE9rITTXd8lv6hj5KG_2JQ0vWIpNqGrif6OH4pik7olcv3v45Z210q2ufPkmoPQIHTEeKQvRbEUN=w600-h200-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/-eOwVjzN6KMfzEVll-unJCaKBes1MALCdB9jxG6e8lvWovjeLtdbf2NQoH0DKAM9SS12sUeOnOlQ5Q8hTMAexo9N5jIS4P2S16RDrrY9WQziVA8E-0cPxcpldO6YgU2MKg64Tn2pXchVxryU_w1QjaYaUk4P17cRXHc4XfQEp4LViItsu2Ze2Uy5llcYhUtubWfmMpAC0FN54OWYb1sY-jgQ_ps2V8GXKPmrjCXFFX_zXLEHVuyZznY4vXYyLXOVkydprDNQojOcUyok6nG-4DAgA35W3v9BazdoiW1iNU97FJwr9mBvuvUAmS-2U0lPBa34-B-Lx-5736rwQXfqOY6gQIBeusZHjFgQR_3ByxJz5KuLLOVsA0uauyYxS2jIBMFFP_d6xve19P0dNAVP5tC7Zj8S0g43Rbl9S9h8eXyjaxUVeYAG1mZibk6GEkqrawGDOXWTITTjkRS2Buhl6YNcuSxezcm_IR4NZCcsgXE3VtEeYhGpIaoaS-cMemaqEKi8F7SYtKZQvH_SM6SYakk6J0aqik0gNRTyxA0nvDlVp2ohNsMdRWFqhRJ5RfgOVfGIFkohL2DnhgHRntAGKHqqnas1uKk8tS040VoxZuYvVp24N0N9OfwnYmmMQYHh_COOdYkItMsHzhAX53dpqgyGbeyq5zL3=w1024-h551-no
coverMeta: out
tags: [D3, Vue, CANVAS]
date: 2018/06/16
updated: 2018/06/16
---

前幾篇介紹完 `SVG` 的基本繪圖方式後，我們要來練習使用 `CANVAS` 來做一樣的折線圖，並在下一篇比較兩者的優缺點。

<!--more-->

***
## 準備隨機資料 & `CANVAS` 畫布

這邊的 `Canvas` 畫布因為需要動態計算寬高，所以會利用 `js` 動態插入 `html` 中。當視窗進行 `resize` 時，也是透過 `js` 清除畫布重新繪製。

* HTML

```html
<!-- chartContain 主要就是 js 做判別插入 canvas 的定位點 -->
<div class="chartContain">
  <!-- calPath 是將 D3 動態算出來的值做暫時存放的位置 -->
  <svg version="1.1" id="calPath"><path d=""></path></svg>
  <!-- tooltip 和往常一樣是做滑過顯示資訊的功能 -->
  <div :class="{ tooltip: true, hidden: hideTooltip}">
    <div class="name">左營區 / 10月</div>
    <div class="value">214 件</div>
  </div>
</div>
```

在 randomData 完後，插入動態計算的 `Canvas` 畫布。

```js
mounted() {
  // 隨機產生資料
  this.randomData();
},
methods: {
  randomData() { // 隨機產生資料
    let min = 0;
    let max = 500;
    let random = [...];

    // 隨機產生資料
    for (let i = 0; i < 3; i++) {
      random[i].value.forEach(e => {
        e.number = Math.floor(Math.random() * (max - min + 1)) + min;
      });
    }

    this.data = random;

    // Init Canvas
    this.initCanvas();

    // Window Resize
    window.addEventListener("resize", this.initCanvas);
  },
  initCanvas() { // 插入動態計算的 Canvas 區塊
    let chartContain = document.querySelector(".chartContain");
    let canvas = document.getElementById("canvas");

    // Clear Canvas Element
    if (canvas !== null) {
      canvas.parentNode.removeChild(canvas);
    }

    // Get Container Width
    this.conWidth = chartContain.offsetWidth;

    // For D3 Draw Canvas
    this.canvas = d3
      .select(".chartContain")
      .append("canvas")
      .attr("id", "canvas")
      .attr("class", "chart")
      .attr("width", this.conWidth)
      .attr("height", this.conHeight);

    this.ctx = this.canvas.node().getContext("2d");

    // Set the parent of all other elements
    this.customBase = document.createElement("custom");
    this.custom = d3.select(this.customBase);

    // Draw Canvas
    this.drawCanvas();
  },
}
```

```css
.lineChart {
  /* 說明 */
  .detail {
    color: gray;
  }
  .chartContain { /* 放置主要畫布的容器 */
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    #calPath {
      display: none; /* 隱藏暫時計算的 path 元件 */
    }
    .tooltip {
      ...
    }
  }
}
```

***
## 繪製折線圖

因為這邊要仿造 `SVG` 進行動畫，所以會用 `d3.timer` 的方式，隨著計時器每次清掉畫布再進行重新繪製的動作，所以整體畫面全靠 `js` 繪製，而不是 `html` 或 `css`。

`mousemove` 的部分是當滑鼠滑過特定的點時，需要判別是否有經過繪製的折點，顯示相對的 `tooltip` 資訊。

```js
drawCanvas() {
  let canvas = document.querySelector("#canvas");

  /*-------------------------
    動畫
  -------------------------*/
  this.timer = d3.timer(elapsed => {
    this.animationLine(elapsed);
  });

  // Canvas On Mouseover
  canvas.addEventListener("mousemove", e => {
    this.showTooltip(e);
  });
},
```

***
## 折線圖動畫

> 注意！這邊不使用 `requestAnimationFrame()` 的原因是不同瀏覽器要加相對應的前綴詞，且 `mobile` 支持度低，可參考線上 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Window.requestAnimationFrame) 說明。

```js
animationLine(elapsed) {
  let duration = 500;
  let t = Math.min(1, elapsed / duration); // compute how far through the animation we are (0 to 1)

  // Clear Canvas
  this.ctx.clearRect(0, 0, this.conWidth, this.conHeight);

  // 繪製不須動畫的元素
  this.drawStatic();

  /*-------------------------
    折線
  -------------------------*/
  this.ctx.save();
  this.lines.forEach((e, i) => {
    let path = document.querySelector("#calPath path");
    let totalLength; // Path Length

    path.setAttribute("d", e.d); // 這邊將 D3 算好的折點佔存在 #calPath path 上
    totalLength = path.getTotalLength();

    this.ctx.setLineDash([totalLength]);
    this.ctx.lineDashOffset = totalLength * (1 - t);
    this.ctx.beginPath(); // 開始繪製
    this.lineCanvas(this.dataArray[i]);
    this.ctx.strokeStyle = e.color; // 線顏色
    this.ctx.stroke(); // 繪製線
  });

  /*-------------------------
    折點
  -------------------------*/
  this.dots.forEach((e, i) => {
    // 開始繪製
    this.ctx.beginPath();
    // 繪製點
    this.ctx.arc(e.cx, e.cy, e.r * t, 0, 2 * Math.PI);
    // 填色
    this.ctx.fillStyle = e.color;
    this.ctx.fill();
    // 邊框色
    this.ctx.strokeStyle = "#fff";
    this.ctx.stroke();
    // 結束繪製
    this.ctx.closePath();
  });
  this.ctx.restore();

  // if this animation is over
  if (t === 1) {
    // stop this timer since we are done animating.
    this.timer.stop();
  }
},
```

> 繪製的前後順序會影響繪製出來的圖層疊加效果，越後面繪製出來的元素會蓋在舊的元素上方。所以不需動畫的元素(ex: X軸、Y軸、標籤...)才特別拉出來寫成一個 function 放在繪製動畫之前。

***
## 不需動畫的元素

```js
drawStatic() { // 繪製不須動畫的元素
  let tickSize = 6; // 軸點大小

  /*-------------------------
    X軸
  -------------------------*/
  // 繪製X軸點
  this.ctx.beginPath();
  this.data[0].value.forEach((d, i) => {
    this.ctx.moveTo(
      this.xScale(i + 1) + this.chartLeft,
      this.chartTop + this.chartHeight
    );
    this.ctx.lineTo(
      this.xScale(i + 1) + this.chartLeft,
      this.chartTop + this.chartHeight + tickSize
    );
  });
  this.ctx.stroke();

  // 繪製X軸線
  this.ctx.beginPath();
  this.ctx.moveTo(this.chartLeft, this.chartTop + this.chartHeight);
  this.ctx.lineTo(
    this.chartLeft + this.chartWidth,
    this.chartTop + this.chartHeight
  );
  this.ctx.stroke();

  // 繪製X軸文字
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "top";
  this.data[0].value.forEach((d, i) => {
    this.ctx.fillText(
      d.month,
      this.xScale(i + 1) + this.chartLeft,
      this.chartTop + this.chartHeight + tickSize
    );
  });

  // 繪製X軸標籤
  this.data.forEach((el, index) => {
    // 圓點
    // 開始繪製
    this.ctx.save();
    this.ctx.beginPath();
    // 繪製點
    this.ctx.arc(
      this.chartLeft + index * 100,
      this.chartTop + this.chartHeight + 50,
      5,
      0,
      2 * Math.PI
    );
    // 填色
    this.ctx.fillStyle = this.color(index);
    this.ctx.fill();
    // 結束繪製
    this.ctx.closePath();

    // 文字
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "16px sans-serif";
    this.ctx.fillStyle = "#000";
    this.ctx.fillText(
      el.name,
      this.chartLeft + index * 100 + 10,
      this.chartTop + this.chartHeight + 50
    );
    this.ctx.restore();
  });

  /*-------------------------
    Y軸
  -------------------------*/
  // Y軸節點
  this.yTick = this.custom
    .append("g")
    .attr("class", "axis axisY")
    .call(this.yAxis)
    .selectAll("g.tick");
  
  // 繪製Y軸點
  this.ctx.beginPath();
  // 中間內部灰線
  this.yTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let yTrans = node.attr("transform");
    let yPos = Number(yTrans.split(",")[1].split(")")[0]) + this.chartTop;

    // 跳過 0 的軸點
    if (index === 0) return;

    // 繪製軸點
    this.ctx.moveTo(this.chartLeft, yPos);
    this.ctx.lineTo(this.chartLeft + this.chartWidth, yPos);
  });
  this.ctx.strokeStyle = "#e6e6e6"; // 線顏色
  this.ctx.stroke();
  // 最上方的刻點
  this.ctx.beginPath();
  this.ctx.moveTo(this.chartLeft - tickSize, this.chartTop);
  this.ctx.lineTo(this.chartLeft, this.chartTop);
  this.ctx.strokeStyle = "#000"; // 線顏色
  this.ctx.stroke();

  // 繪製Y軸線
  this.ctx.beginPath();
  this.ctx.moveTo(this.chartLeft, this.chartTop);
  this.ctx.lineTo(this.chartLeft, this.chartTop + this.chartHeight);
  this.ctx.stroke();

  // 繪製Y軸文字
  this.ctx.textAlign = "right";
  this.ctx.textBaseline = "middle";
  this.yTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let yTrans = node.attr("transform");
    let yPos = Number(yTrans.split(",")[1].split(")")[0]) + this.chartTop;

    this.ctx.fillText(
      node.property("innerText"),
      this.chartLeft - tickSize,
      yPos
    );
  });

  // 繪製Y軸標籤
  // start by saving the current context (current orientation, origin)
  this.ctx.save();
  this.ctx.translate(0, 0);
  this.ctx.rotate(-Math.PI / 2);
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "top";
  this.ctx.font = "16px sans-serif";
  this.ctx.fillText("件數", -(this.chartTop + this.chartHeight / 2), 0);
  this.ctx.restore(); // now restore the canvas flipping it back to its original orientation
},
```

其他部分跟 `SVG` 的做法很類似，主要觀念就是要把 `html`, `css` rendor 的部分全部移交給 `js` 做，線上 demo [在此](https://annilla.github.io/d3-practice-vue-canvas/dist/)，也可以在 [Github](https://github.com/Annilla/d3-practice-vue-canvas/blob/master/src/components/LineChart.vue)查看完整程式碼，下一篇我們就要來分析 SVG 和 Canvas 的差異和各自的優勢。
