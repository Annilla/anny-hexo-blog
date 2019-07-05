---
title: D3 v4 with Vue - CANVAS Donut Chart
categories:
  - D3
thumbnailImage: https://lh3.googleusercontent.com/0ql8YPK9TWE2Iw2k5riCgtn6op1D95u8PM6OpYAiq1dZsrJ580p9Cmprzs4lMk8WAHeO81FEcsbR76fEphaIz67O6YylI2bxFQu3BHhcm3k0IP6whT76GyTmsR7HANYz1KeJVTTG2X4-KxV7zh_FsAhdZ8j-gz2BcWsaYonzgm2-bzEDNEvkCTiH9klL6RGWE9YhK_BfjR402BCev0Uq5nwNwEhHjqBeIpv-ePFTAux2RXkdXZ9iz67SKQ0h_q-w7vB9oPzPrg8FZUwK-WbM0uoKQI5IZP0BUXf9eyE8_fFa3YPO9u4V1Dhcf6YsMfCIvO6OpYvh5PeWKpDWm2q80MmUKrAp0G2nthLFwcC5JZlfWWiM-mPbZ04Oklp61oOOLA6bdBJCvMtmwCiycopM3bXsmCA06hK4hDyjRiT_foULVswowzSRc7KsL-p5ayX6Gg2mmdX45Ile4Tw7NjLk8-bVBHhC6gb6DnbDFitOQ6RVKSwXn6WK98i11j3PykdwonGTkc4_9Q9v-dOWSVSpdE1Ouy0wjCDFn0tYH7OPF1tRnht7JgbdrWw0p-AJ9O_jHy6K-BQN4I6n9HchsrRvZE9rITTXd8lv6hj5KG_2JQ0vWIpNqGrif6OH4pik7olcv3v45Z210q2ufPkmoPQIHTEeKQvRbEUN=w600-h200-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/-eOwVjzN6KMfzEVll-unJCaKBes1MALCdB9jxG6e8lvWovjeLtdbf2NQoH0DKAM9SS12sUeOnOlQ5Q8hTMAexo9N5jIS4P2S16RDrrY9WQziVA8E-0cPxcpldO6YgU2MKg64Tn2pXchVxryU_w1QjaYaUk4P17cRXHc4XfQEp4LViItsu2Ze2Uy5llcYhUtubWfmMpAC0FN54OWYb1sY-jgQ_ps2V8GXKPmrjCXFFX_zXLEHVuyZznY4vXYyLXOVkydprDNQojOcUyok6nG-4DAgA35W3v9BazdoiW1iNU97FJwr9mBvuvUAmS-2U0lPBa34-B-Lx-5736rwQXfqOY6gQIBeusZHjFgQR_3ByxJz5KuLLOVsA0uauyYxS2jIBMFFP_d6xve19P0dNAVP5tC7Zj8S0g43Rbl9S9h8eXyjaxUVeYAG1mZibk6GEkqrawGDOXWTITTjkRS2Buhl6YNcuSxezcm_IR4NZCcsgXE3VtEeYhGpIaoaS-cMemaqEKi8F7SYtKZQvH_SM6SYakk6J0aqik0gNRTyxA0nvDlVp2ohNsMdRWFqhRJ5RfgOVfGIFkohL2DnhgHRntAGKHqqnas1uKk8tS040VoxZuYvVp24N0N9OfwnYmmMQYHh_COOdYkItMsHzhAX53dpqgyGbeyq5zL3=w1024-h551-no
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