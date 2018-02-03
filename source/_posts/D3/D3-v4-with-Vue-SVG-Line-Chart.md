---
title: D3 v4 with Vue - SVG Line Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: bottom
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, SVG]
date: 2018/02/03
updated: 2018/02/03
---

`D3` 是一個 `js library` ，讓開發者在向量繪圖時，能快速算出圖表物件在繪圖區域的路徑座標、座標軸、動態顏色等許多好用的 `function`。

<!--more-->

本系列文章採用 `vue` 搭配 `D3` 是因為使用 `data` 驅動畫面的方式，會比直接操作 `DOM` 的效能更好。 `D3` 內建的繪製功能是類似於 `jquery` 的方式直接操作 `DOM` ，當資料變多時可能會拖垮效能出現延遲的畫面，網路上許多教程初期是用此方式，想看的話 `google` 一下就有囉～

此系列文章 `D3` 專注於使用他本身的計算函數和座標軸等優勢的功能，至於畫面更新等其他雜事就交給 `vue` 處理。當然，未來還有更多優化效能的方式，例如：SVG 換成 CANVAS 等，但都有其優缺點，等之後有空再來做比較。

***
## 準備 `SVG` 畫布

* HTML

```html
<svg class="chart" :viewBox="viewBox" preserveAspectRatio="xMidYMin slice">
  <!-- 左上角起始點 -->
  <g class="chartWrap" :transform="startPoint">
  ...
  </g>
</svg>
```

* CSS

```css
.chart {
  /* For IE Browser Auto Detact Width and Height (RWD)*/
  width: 100%;
  padding-bottom: 100%;
  height: 1px;
  overflow: visible;
  ...
}
```

* JS

```js
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [], // From randomData()
      chart: { // 畫布大小和預留的 padding
        width: 500,
        height: 500,
        paddingTop: 30,
        paddingRight: 30,
        paddingBottom: 100,
        paddingLeft: 60
      },
      hideTooltip: true // 控制 tooltip 顯示隱藏
    };
  },
  computed: {
    // 可視區域
    viewBox() {
      let viewW =
        this.chart.width + this.chart.paddingRight + this.chart.paddingLeft;
      let viewH =
        this.chart.height + this.chart.paddingTop + this.chart.paddingBottom;

      return `0 0 ${viewW} ${viewH}`;
    },
    // 畫圖起始點
    startPoint() {
      return `translate(${this.chart.paddingLeft}, ${this.chart.paddingTop})`;
    },
    ...
  }
}
```

***
## 準備隨機資料

* JS

```js
  methods: {
    randomData() {
      let min = 0; // 隨機產生數值的最小值
      let max = 500; // 隨機產生數值的最大值
      let random = [ // 資料結構
        {
          name: "鼓山區",
          value: [
            {
              month: "6月",
              number: "233"
            },
            {
              month: "7月",
              number: "412"
            },
            {
              month: "8月",
              number: "533"
            },
            {
              month: "9月",
              number: "267"
            },
            {
              month: "10月",
              number: "321"
            }
          ]
        },
        ...
      ];


      // 隨機產生資料
      for (let i = 0; i < 3; i++) {
        random[i].value.forEach((e) => {
          e.number = Math.floor(Math.random() * (max - min + 1)) + min;
        });
      }


      this.data = random;
      
      ...
      
    },
    ...
  }
```

***
## 插入座標軸

* HTML

```html
<!-- X軸座標 -->
<g :transform="`translate(0, ${chart.height})`" class="axis axisX" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
</g>
<!-- Y軸座標 -->
<g class="axis axisY" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
</g>
<!-- Y軸標籤 -->
<text class="axisYText" :x="axisYText[0]" :y="axisYText[1]" dy="1em" transform="rotate(-90)" text-anchor="middle">件數</text>
```

* CSS

```css
.chart {
  ...
  .chartWrap {
    .axis.axisY {
      .tick {
        line {
          stroke: #efefef;
          transform: translateX(1px);
        }
        &:nth-child(2) {
          line {
            stroke: black;
          }
        }
      }
    }
    .line {
      stroke-dasharray: 3000;
    }
  }
}
```

* JS

因程式碼過多，這邊只講用到的 D3 函數部分，文章最後會有完整程式碼連結。

```js
// X軸線性比例縮放
xScale() {
  return d3
    .scaleLinear() // 線性縮放函式
    .domain([0, this.data[0].value.length]) // 設定轉換後的定義域
    .range([0, this.chart.width]); // 設定轉換前的範圍
},
// X軸設定
xAxis() {
  return d3
    .axisBottom(this.xScale) // 下方座標軸函式
    .ticks(5) // 設定座標軸標註點個數 （6~10月，共 5 個標註點）
    .tickFormat((d, i) => { // 設定標註點呈現的文字陣列
      return this.xLabel[i];
    });
},
```

```js
// Y軸線性比例縮放
yScale() {
  let Ymin = 0;
  let Ymax; // 找出所有Y值的最大
  let newArray = [];

  // 找出所有Y值的最大數
  this.data.forEach(function(e, i) {
    e.value.forEach(function(ev) {
      newArray.push(ev.number);
    });
  });
  Ymax = d3.max(newArray); // D3找最大值函數


  return d3
    .scaleLinear() // 線性縮放函式
    .domain([Ymin, Ymax]) // 設定轉換後的定義域
    .range([this.chart.height, 0]); // 設定轉換前的範圍
},
// Y軸設定
yAxis() {
  return d3
    .axisLeft(this.yScale) // 左方座標軸函式
    .tickSizeInner(-this.chart.height); // 設定内侧刻度大小
},
```

> 内侧刻度 (tickSizeInner) 和外侧刻度 (tickSizeOuter) 不同，内侧刻度是一个个单独的line元素，而外侧刻度则实际上是坐标轴线path的一部分。

在每次隨機資料後，動態插入座標軸。

```js
  methods: {
    randomData() {
      ...
      //清除上一次的坐標軸
      document.querySelector('.chart .axisX').innerHTML = '';
      document.querySelector('.chart .axisY').innerHTML = '';

      // 插入X軸座標
      d3
        .select(".chart .axisX")
        .call(this.xAxis);
      
      // 插入Y軸座標
      d3
        .select(".chart .axisY")
        .call(this.yAxis);
    },
    ...
  }
```

***
## 繪製折線

* HTML

注意： `transition-group` 標籤是拿來做折線 `CSS` 的動畫效果，這邊以效能考量皆採用 `CSS` 來做動畫，搭配 `vue` `transition` 動態加上 `class` ，並不建議用 `JS` 的方法去計算動畫。

```html
<!-- 折線 -->
<transition-group tag="g" name="growLine">
  <path class="line" v-for="(path, key) in line" :key="`${key}${path.d}`" fill="none" :stroke="path.color" :d="path.d"></path>
</transition-group>
```

* CSS

```css
/* 動畫 */
.growLine-enter-active { /* 進入動畫：進行中 */
  transition: all 2s;  /* 動畫時間： 2秒 */
  stroke-dashoffset: 0; /* 畫線效果 */
}
.growLine-enter { /* 進入動畫：開始 */
  stroke-dashoffset: 3000; /* 畫線效果 */
}
/* 統計圖 */
.chartContain {
  ...
  .chart {
    ...
    .chartWrap {
      ...
      .line {
        stroke-dasharray: 3000; /* 畫線效果 */
      }
    }
  }
```

* JS

```js
  computed: {
    ...
    // 動態顏色
    color() {
      // 使用 D3 內建 10種顏色輪迴的函式
      return d3.scaleOrdinal(d3.schemeCategory10);
    },
    // 折線座標、顏色
    line() {
      let line = d3
        .line() // 折線函式
        .x((d, i) => {
          // 利用尺度運算資料索引，傳回 x 的位置
          return this.xScale(i + 1);
        })
        .y(d => {
          // 利用尺度運算資料的值，傳回 y 的位置
          return this.yScale(d);
        });
      let pathArray = [];

      this.dataArray.forEach((e, i) => {
        pathArray.push({d: line(e), color: this.color(i)});
      });

      return pathArray;
    },
  }
```

***
## 繪製點

* HTML

注意： `showTooltip`, `hiddenTooltip` 是拿來做滑過物件顯示數據資料的 `tooltip` 功能，在下一段會提到，這邊先純粹解釋繪製折點的部分。

```html
<!-- 點 -->
<g class="dot" v-for="(group, key) in dot" :key="key">
  <transition-group tag="g" name="growDot">
    <circle v-for="(c, k) in group.circle" :key="`${k}${c.cx}${c.cy}`" :cx="c.cx" :cy="c.cy" r="5" :fill="group.color" stroke="white" v-on:mouseover="showTooltip(key, k, $event)" v-on:mouseout="hiddenTooltip"></circle>
  </transition-group>
</g>
```

* CSS

```css
/* 動畫 */
.growDot-enter-active { /* 進入動畫：進行中 */
  transition: all 1s;  /* 動畫時間： 1秒 */
}
.growDot-enter { /* 進入動畫：開始 */
  opacity: 0;  /* 淡入效果 */
  transform: scale(0);  /* 從 0 開始縮放 */
  transform-origin: 50%; /* 從中心點做縮放 */
}
```

* JS

```js
  computed: {
    // 折點座標、顏色
    dot() {
      let circleArray = [];

      this.dataArray.forEach((group, i) => {
        let circleGroup = [];

        // 設置點座標
        group.forEach((number, index) => {
          circleGroup.push({
            cx: this.xScale(index + 1),
            cy: this.yScale(number),
          });
        });

        // 同一群的點用相同顏色
        circleArray.push({
          circle: circleGroup,
          color: this.color(i)
        });
      });

      return circleArray;
    },
  }
```

***
## 加上提示資料點的 `tooltip`

* CSS

```css
...
  .tooltip {
    min-width: 100px;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 10px;
    border-radius: 6px;
    position: absolute;
    text-align: left;
    line-height: 1.5em;
    z-index: 1;
    &.hidden {
      visibility: hidden;
    }
  }
```

* JS

```js
  methods: {
    showTooltip(index1, index2, event) {
      let mouseX = event.clientX + 20;
      let mouseY = event.clientY;

      // 設置位置
      document.querySelector('.tooltip').setAttribute('style', `left: ${mouseX}px; top: ${mouseY}px;`);
      // 插入名稱
      document.querySelector('.tooltip .name').innerHTML = `${this.data[index1].name} / ${this.data[index1].value[index2].month}`;
      document.querySelector('.tooltip .value').innerHTML = `${this.data[index1].value[index2].number} 件`;

      // 顯示 tooltip
      this.hideTooltip = false;
    },
    hiddenTooltip() {
      this.hideTooltip = true;
    }
  }
```

全部畫好的樣子如下圖，可以去 [Github](https://github.com/Annilla/d3-practice-vue-svg/blob/master/src/components/LineChart.vue) 查看完整程式碼喔！也可以在[這裡](https://annilla.github.io/d3-practice-vue-svg/dist/)查看折線圖的 Demo，我們下回見～

![折線圖完成](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2018-02-03_1314.png "折線圖")

***
## 參考資料

* [D3 中文文件 - tickSizeInner](https://github.com/xswei/d3js_doc/blob/master/API_Reference/d3-axis/README.md#axis_tickSizeInner)

* [Vue Transition](https://vuejs.org/v2/guide/transitions.html#ad)