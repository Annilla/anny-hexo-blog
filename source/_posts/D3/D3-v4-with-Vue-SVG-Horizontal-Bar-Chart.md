---
title: D3 v4 with Vue - SVG Horizontal Bar Chart
categories:
  - D3
thumbnailImage: https://lh3.googleusercontent.com/0ql8YPK9TWE2Iw2k5riCgtn6op1D95u8PM6OpYAiq1dZsrJ580p9Cmprzs4lMk8WAHeO81FEcsbR76fEphaIz67O6YylI2bxFQu3BHhcm3k0IP6whT76GyTmsR7HANYz1KeJVTTG2X4-KxV7zh_FsAhdZ8j-gz2BcWsaYonzgm2-bzEDNEvkCTiH9klL6RGWE9YhK_BfjR402BCev0Uq5nwNwEhHjqBeIpv-ePFTAux2RXkdXZ9iz67SKQ0h_q-w7vB9oPzPrg8FZUwK-WbM0uoKQI5IZP0BUXf9eyE8_fFa3YPO9u4V1Dhcf6YsMfCIvO6OpYvh5PeWKpDWm2q80MmUKrAp0G2nthLFwcC5JZlfWWiM-mPbZ04Oklp61oOOLA6bdBJCvMtmwCiycopM3bXsmCA06hK4hDyjRiT_foULVswowzSRc7KsL-p5ayX6Gg2mmdX45Ile4Tw7NjLk8-bVBHhC6gb6DnbDFitOQ6RVKSwXn6WK98i11j3PykdwonGTkc4_9Q9v-dOWSVSpdE1Ouy0wjCDFn0tYH7OPF1tRnht7JgbdrWw0p-AJ9O_jHy6K-BQN4I6n9HchsrRvZE9rITTXd8lv6hj5KG_2JQ0vWIpNqGrif6OH4pik7olcv3v45Z210q2ufPkmoPQIHTEeKQvRbEUN=w600-h200-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/-eOwVjzN6KMfzEVll-unJCaKBes1MALCdB9jxG6e8lvWovjeLtdbf2NQoH0DKAM9SS12sUeOnOlQ5Q8hTMAexo9N5jIS4P2S16RDrrY9WQziVA8E-0cPxcpldO6YgU2MKg64Tn2pXchVxryU_w1QjaYaUk4P17cRXHc4XfQEp4LViItsu2Ze2Uy5llcYhUtubWfmMpAC0FN54OWYb1sY-jgQ_ps2V8GXKPmrjCXFFX_zXLEHVuyZznY4vXYyLXOVkydprDNQojOcUyok6nG-4DAgA35W3v9BazdoiW1iNU97FJwr9mBvuvUAmS-2U0lPBa34-B-Lx-5736rwQXfqOY6gQIBeusZHjFgQR_3ByxJz5KuLLOVsA0uauyYxS2jIBMFFP_d6xve19P0dNAVP5tC7Zj8S0g43Rbl9S9h8eXyjaxUVeYAG1mZibk6GEkqrawGDOXWTITTjkRS2Buhl6YNcuSxezcm_IR4NZCcsgXE3VtEeYhGpIaoaS-cMemaqEKi8F7SYtKZQvH_SM6SYakk6J0aqik0gNRTyxA0nvDlVp2ohNsMdRWFqhRJ5RfgOVfGIFkohL2DnhgHRntAGKHqqnas1uKk8tS040VoxZuYvVp24N0N9OfwnYmmMQYHh_COOdYkItMsHzhAX53dpqgyGbeyq5zL3=w1024-h551-no
coverMeta: out
tags: [D3, Vue, SVG]
date: 2018/03/04
updated: 2018/03/04
---

今天要來練習用 `D3` 搭配 `Vue` 做簡易的 `SVG` 橫條圖囉～

<!--more-->

上一篇有描述過:

* 準備 `SVG` 畫布

* 準備隨機資料

* 加上提示資料的 tooltip

這幾個部分大同小異，所以這裡就不再次解釋，我們直接從處理座標軸開始說起。

***
## 插入座標軸

* HTML

```html
<!-- X軸座標 -->
<g :transform="`translate(0, ${chart.height})`" class="axis axisX" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle"></g>
<!-- Y軸座標 -->
<g class="axis axisY" fill="none" font-size="10" font-family="sans-serif" text-anchor="end"></g>
<!-- Y軸標籤 -->
<text class="axisYText" :x="axisYText[0]" :y="axisYText[1]" dy="1em" text-anchor="middle">件數</text>
```

* CSS

```css
.chart {
  ......
  .chartWrap {
    .axis.axisX {
      .domain {
        display: none;
      }
      .tick {
        line {
          stroke: #efefef;
          stroke-width: 2;
          stroke-dasharray: 1, 6;
          stroke-linecap: round;
        }
      }
    }
  }
}
```

* JS

因程式碼過多，這邊只講用到的 D3 函數部分，文章最後會有完整程式碼連結。

```js
// X軸線性比例縮放
xScale() {
  let Xmin = 0;
  let Xmax; // 找出所有X值的最大
  let newArray = [];

  // 找出所有X值的最大數
  this.data.value.forEach(function(e) {
    newArray.push(e.number);
  });
  Xmax = d3.max(newArray);

  return d3
    .scaleLinear() // 線性縮放函式
    .domain([Xmin, Xmax]) // 設定轉換後的定義域
    .range([0, this.chart.width]); // 設定轉換前的範圍
},
// X軸設定
xAxis() {
  return d3
    .axisBottom(this.xScale) // 下方座標軸函式
    .tickSizeInner(-this.chart.width); // 設定内侧刻度大小
},
```

```js
// Y軸線性比例縮放
yScale() {
  return d3
    .scaleLinear() // 線性縮放函式
    .domain([0, this.data.value.length + 1]) // 設定轉換後的定義域
    .range([this.chart.height, 0]); // 設定轉換前的範圍
},
// Y軸設定
yAxis() {
  // 計算座標軸標註點個數，小於三個月要多加一個標註點 （ex: 6~10月，共 5 個標註點）
  let tickNum =
    this.valueLength < 3 ? this.valueLength + 1 : this.valueLength;

  return d3
    .axisLeft(this.yScale) // 左方座標軸函式
    .ticks(tickNum) // 設定座標軸標註點個數
    .tickFormat((d, i) => { // 設定標註點呈現的文字陣列
      return this.yLabel[i];
    });
},
```

在每次隨機資料後，動態插入座標軸。

```js
randomData() {
  ......
  //清除坐標軸
  document.querySelector(".chart .axisX").innerHTML = "";
  document.querySelector(".chart .axisY").innerHTML = "";

  // 插入X軸座標
  d3.select(".chart .axisX").call(this.xAxis);
  // 插入Y軸座標
  d3.select(".chart .axisY").call(this.yAxis);
},
```

***
## 繪製橫條

* HTML

```html
<!-- 橫條 -->
<transition-group tag="g" name="growBarp">
  <rect class="bar" v-for="(rect, key) in bar" :key="`${key}${rect.width}${rect.y}`" :fill="rect.color" :x="rect.x" :y="rect.y" :width="rect.width" :height="rect.height" v-on:mouseover="showTooltip(key, $event)" v-on:mouseout="hiddenTooltip"></rect>
</transition-group>
```

* CSS

```css
/* 動畫 */
.growBarp-enter-active { /* 進入動畫：進行中 */
  transition: all 1s; /* 動畫時間： 1秒 */
}
.growBarp-enter { /* 進入動畫：開始 */
  transform: scaleX(0); /* 水平縮放從0開始 */
  opacity: 0; /* 淡入從透明度0開始 */
}
```

* JS

```js
// 顏色函數
color() {
  // 使用 D3 內建 10種顏色輪迴的函式
  return d3.scaleOrdinal(d3.schemeCategory10);
},
// 橫條寬度、間隔設定
barWidth() {
  // 間隔
  let gap = 20;

  // 計算橫條的寬度
  return this.chart.height / (this.valueLength + 1) - gap;
},
// 橫條座標、顏色
bar() {
  let rectArray = [];

  // 產生橫條的陣列
  if (this.data.value) {
    this.data.value.forEach((e, i) => {
      rectArray.push({
        color: this.color(0), // 設定顏色
        x: 0, // 設定x座標
        y: this.yScale(i + 1) - this.barWidth / 2, // 設定y座標
        width: this.xScale(e.number), // 設定寬度
        height: this.barWidth // 設定高度
      });
    });
  }

  return rectArray;
},
// 橫條文字座標、內容
barText() {
  let textArray = [];

  // 產生橫條文字的陣列
  if (this.data.value) {
    this.data.value.forEach((e, i) => {
      textArray.push({
        x: this.xScale(e.number) - 20, // 設定x座標
        y: this.yScale(i + 1) + 5, // 設定y座標
        number: e.number // 設定顯示的值
      });
    });
  }

  return textArray;
}
```

全部畫好的樣子如下圖，可以去 [Github](https://github.com/Annilla/d3-practice-vue-svg/blob/master/src/components/BarPChart.vue) 查看完整程式碼喔！也可以在[這裡](https://annilla.github.io/d3-practice-vue-svg/dist/)查看橫條圖的 Demo，我們下回見～

![橫條圖完成](https://lh3.googleusercontent.com/UKjKyxBO-9dZHOpAj_zv75uJiYbW2rclJzVfNf9H4pqSaBjORKXVtpnXTn_c023LtDb54pUS-ggsy_aa73DpxRLm7pSCfpHAbGqjswpoc7DZz4vX5_5a2TCpGvQMZCAAuvGw-k4bw4zy0qIuC-1pccneHc2y6dS8zrL3oNZega1lV4RP1zj_C4G5tIoU3TKKeFh-KdNZO5W36ZLahvjumi066FUJX04CbLc5i5TW6pADmptSPfcQ4xgrH4CeM76pTW8WwQytXOWscAt-OJPuEHcMx7gdQJGvCpCI1OUNLViG4PoVNT3aDvzYX51sw0rR8V3mX0QZTtkQQCmLFfK71iX7xJgHKb_CAOCbq1EdiC4jpp4js_iny-ssB8YQafwzLoZQIQk81Fia7OUzoTUxQ02QkNHwjItDFek050IVMBKClKwPLx1o7anAND860jT6A5lZmwG9QVjkfNO4TMcKbGyTjaEDEXgnZIy51qYTj2tTDxN2J1na7cgvjG8U1X-7vPr0rAWa-qXS2kDJIQdStT6Byh058BeIqMQpjtXeGZXLgxlDo4A8qSL6GfVxioJpvBvKsQApY5d_O1i0O_CMMEb5IIUTXL5OYerBURrTozs4V6ypZUc3aQTiV1O_MTtFFqOlM3PAufGC2QNwZghUolODR6rk2Ae6=w921-h1024-no "橫條圖")