---
title: D3 v4 with Vue - CANVAS Donut Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, CANVAS]
date: 2018/09/11
updated: 2018/09/11
---

此篇練習使用 `CANVAS` 來做甜甜圈圖。這篇是這個系列的最後一篇了，我們趕緊來看吧。

<!--more-->

***
## 甜甜圈圖動畫

```js
animationLine(elapsed) {
  let duration = 700;
  let t = Math.min(1, elapsed / duration); // compute how far through the animation we are (0 to 1)

  // Clear Canvas
  this.ctx.clearRect(0, 0, this.conWidth, this.conHeight);

  /*-------------------------
    甜甜圈
  -------------------------*/
  this.ctx.save();
  this.pie.forEach((e, i) => {
    // 開始繪製
    this.ctx.beginPath();
    this.ctx.arc(
      this.conWidth / 2,
      this.conHeight / 2,
      this.radius,
      e.startAngle,
      e.startAngle + (e.endAngle - e.startAngle) * t
    );
    // 邊框色
    this.ctx.lineWidth = this.chartOuterRadius - this.chartInnerRadius;
    this.ctx.strokeStyle = e.color;
    this.ctx.globalAlpha = t;
    this.ctx.stroke();
  });

  /*-------------------------
    甜甜圈文字
  -------------------------*/
  this.pie.forEach((e, i) => {
    let theta = e.startAngle + (e.endAngle - e.startAngle) / 2;
    let x = this.radius * Math.cos(theta);
    let y = this.radius * Math.sin(theta);

    // 開始繪製
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "16px sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(
      e.percentage,
      this.conWidth / 2 + x,
      this.conHeight / 2 + y
    );
  });
  this.ctx.restore();

  // if this animation is over
  if (t === 1) {
    // stop this timer since we are done animating.
    this.timer.stop();
  }
},
```

因為甜甜圈不需要 x 軸、 y 軸等靜態元素，標籤的部分用 HTML render 就好，所以只要把甜甜圈動畫長好就完成囉!線上 demo [在此](https://annilla.github.io/d3-practice-vue-canvas/dist/)，也可以在[Github](https://github.com/Annilla/d3-practice-vue-canvas/blob/master/src/components/DonutChart.vue)查看完整程式碼，此主題到這裡告一段亂～之後會有全新的篇章，謝謝收看 ：）