---
title: D3 v4 with Vue - SVG Horizontal Bar Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
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

![橫條圖完成](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2018-03-04_1029.png "橫條圖")