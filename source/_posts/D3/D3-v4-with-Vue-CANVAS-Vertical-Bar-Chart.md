---
title: D3 v4 with Vue - CANVAS Vertical Bar Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, CANVAS]
date: 2018/08/05
updated: 2018/08/05
---

作者：Anny Chang

此篇練習使用 `CANVAS` 來做直條圖。因為和橫條圖的結構很相像，所以這邊就直接進入直條圖動畫的部分。

<!--more-->

***
## 直條圖動畫

```js
animationLine(elapsed) {
  let duration = 800;
  let t = Math.min(1, elapsed / duration); // compute how far through the animation we are (0 to 1)

  // Clear Canvas
  this.ctx.clearRect(0, 0, this.conWidth, this.conHeight);

  // 繪製不須動畫的元素
  this.drawStatic();

  /*-------------------------
    直條
  -------------------------*/
  this.ctx.save();
  this.bars.forEach((e, i) => {
  	// 開始繪製
		this.ctx.beginPath();
  	this.ctx.rect(e.x, e.y + e.height * (1 - t), e.width, e.height * t);
    this.ctx.globalAlpha = t;
    this.ctx.fillStyle = e.color;
    this.ctx.fill();
  });

  /*-------------------------
    直條文字
  -------------------------*/
  this.ctx.font = "12px sans-serif";
  this.ctx.textBaseline = "bottom";
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "gray";
  this.bars.forEach((e, i) => {
    // 開始繪製
    this.ctx.fillText(e.number, e.x + this.barWidth / 2, e.y);
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
drawStatic() {
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
  this.ctx.beginPath();
  // 黑色刻點
  this.xTick.each((el, index, arr) => {
    let node = d3.select(arr[index]);
    let xTrans = node.attr("transform");
    let xPos = Number(xTrans.split(",")[0].split("(")[1]) + this.chartLeft;

    // 跳過 0 的軸點
    if (index === 0) return;

    // 繪製軸點
    this.ctx.moveTo(xPos, this.chartTop + this.chartHeight);
    this.ctx.lineTo(xPos, this.chartTop + this.chartHeight + tickSize);
  });
  this.ctx.stroke();

  // 繪製X軸線
  this.ctx.beginPath();
  this.ctx.moveTo(this.chartLeft, this.chartTop + this.chartHeight);
  this.ctx.lineTo(
    this.chartLeft + this.chartHeight,
    this.chartTop + this.chartWidth
  );
  this.ctx.stroke();

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
  this.yTick = this.custom
    .append("g")
    .attr("class", "axis axisY")
    .call(this.yAxis)
    .selectAll("g.tick");
  // 繪製Y軸點
  this.ctx.save();
  this.ctx.beginPath();
  // 內部灰色刻線
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
  this.ctx.strokeStyle = "#efefef"; // 線顏色
  this.ctx.stroke();
  this.ctx.restore();

  // 最上方的刻點
  this.ctx.beginPath();
  this.ctx.moveTo(this.chartLeft - tickSize, this.chartTop);
  this.ctx.lineTo(this.chartLeft, this.chartTop);
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

線上 demo [在此](https://annilla.github.io/d3-practice-vue-canvas/dist/)，也可以在[Github](https://github.com/Annilla/d3-practice-vue-canvas/blob/master/src/components/BarVChart.vue)查看完整程式碼，下次我們要講最後一個甜甜圈圖了，之後我們將會有新的主題～敬請期待 ：）
