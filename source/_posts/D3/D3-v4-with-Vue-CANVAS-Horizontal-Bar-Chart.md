---
title: D3 v4 with Vue - CANVAS Horizontal Bar Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, CANVAS]
date: 2018/07/07
updated: 2018/07/07
---

此篇練習使用 `CANVAS` 來做橫條圖。主要的隨機資料和準備 `Canvas` 畫布在折線圖那篇有解釋過，所以這邊就直接進入橫條圖動畫的部分。

<!--more-->

***
## 橫條圖動畫

```js
animationLine(elapsed) {
  let duration = 800;
  let t = Math.min(1, elapsed / duration); // compute how far through the animation we are (0 to 1)

  // Clear Canvas
  this.ctx.clearRect(0, 0, this.conWidth, this.conHeight);

  // 繪製不須動畫的元素
  this.drawStatic();

  /*-------------------------
  橫條
  -------------------------*/
  this.ctx.save();
  this.bars.forEach((e, i) => {
    // 開始繪製
    this.ctx.beginPath();
    this.ctx.rect(e.x, e.y, e.width * t, e.height);
    this.ctx.globalAlpha = t;
    this.ctx.fillStyle = e.color;
    this.ctx.fill();
  });

  /*-------------------------
  橫條文字
  -------------------------*/
  this.ctx.textBaseline = "middle";
  this.ctx.font = "16px sans-serif";
  this.bars.forEach((e, i) => {
  let x = e.width + this.chartLeft - 5; // 修正x太低數值的文字改在橫條外顯示

  // 修正x太低數值的文字改在橫條外顯示
  if (x < this.chartLeft + 50) {
    this.ctx.fillStyle = "#000";
    this.ctx.textAlign = "left";
    x = e.width + this.chartLeft + 5;
  } else {
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "right";
  }

    this.ctx.fillText(e.number, x, e.y + this.barWidth / 2);
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
  this.xTick = this.custom
    .append("g")
    .attr("class", "axis axisX")
    .call(this.xAxis)
    .selectAll("g.tick");
  // 繪製X軸點
  this.ctx.save();
  this.ctx.beginPath();
  // 中間內部灰線
  this.xTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let xTrans = node.attr("transform");
    let xPos = Number(xTrans.split(",")[0].split("(")[1]) + this.chartLeft;

    // 跳過 0 的軸點
    if (index === 0) return;

    // 繪製軸點
    this.ctx.moveTo(xPos, this.chartTop);
    this.ctx.lineTo(xPos, this.chartTop + this.chartHeight);
  });
  this.ctx.setLineDash([4, 6]);
  this.ctx.lineWidth = 2;
  this.ctx.strokeStyle = "#efefef"; // 線顏色
  this.ctx.stroke();
  this.ctx.restore();

  // 繪製X軸文字
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "top";
  this.xTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let xTrans = node.attr("transform");
    let xPos = Number(xTrans.split(",")[0].split("(")[1]) + this.chartLeft;

    this.ctx.fillText(
      node.property("innerText"),
      xPos,
      this.chartTop + this.chartHeight
    );
  });

  // 繪製X軸標籤
  this.ctx.save();
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "top";
  this.ctx.font = "16px sans-serif";
  this.ctx.fillText(
    "件數",
    this.conWidth / 2,
    this.chartTop + this.chartHeight + 30
  );
  this.ctx.restore();

  /*-------------------------
    Y軸
  -------------------------*/
  this.yTick = this.custom
    .append("g")
    .attr("class", "axis axisY")
    .call(this.yAxis)
    .selectAll("g.tick");
  // 繪製Y軸點
  this.ctx.beginPath();
  // 黑色刻點
  this.yTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let yTrans = node.attr("transform");
    let yPos = Number(yTrans.split(",")[1].split(")")[0]) + this.chartTop;

    // 跳過 0 的軸點
    if (index === 0) return;

    // 繪製軸點
    this.ctx.moveTo(this.chartLeft - tickSize, yPos);
    this.ctx.lineTo(this.chartLeft, yPos);
  });
  this.ctx.stroke();
  // 最下方的刻點
  this.ctx.beginPath();
  this.ctx.moveTo(
    this.chartLeft - tickSize,
    this.chartTop + this.chartHeight
  );
  this.ctx.lineTo(this.chartLeft, this.chartTop + this.chartHeight);
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
},
```

整個骨架如果熟悉的話，其實就是把動態部分跟靜態部分替換掉想要的圖形就完成囉，線上 demo [在此](https://annilla.github.io/d3-practice-vue-canvas/dist/)，也可以在[Github](https://github.com/Annilla/d3-practice-vue-canvas/blob/master/src/components/BarPChart.vue)查看完整程式碼，我們下回見～
