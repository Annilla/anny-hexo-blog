---
title: D3 v4 with Vue - SVG Donut Chart
ccategories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, SVG]
date: 2018/05/01
updated: 2018/05/01
---

這次要來練習用 `D3` 搭配 `Vue` 做 `SVG` 甜甜圈圖囉～如果要做中間不要洞的圓餅圖，把內圈半徑改成 0 即可。

<!--more-->

一開始想說動畫的部分希望由 `CSS` `transition` 來主導 `stroke-dasharray` 進行動畫，但後來發現沒有實際的圖形範圍做 `Tooltip` 的功能（因為 `CSS` 做的圓圈每個都一樣，只是透過 `stroke-dasharray` 長度不同造成甜甜圈的假象）。所以後來透過 `D3` 計算每個區塊的 `<path>` 才得以完成 `Tooltip` 的功能。因為以上種種的考量後，下面就拆分成兩個部分來解釋，一個部分是執行動畫的 `<circle>` 部分，另一個則是製作 `Tooltip` 功能的 `<path>` 部分。

***
## 執行動畫的 `<circle>`

![執行動畫的 <circle>](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/Donut-01-circle.png "<circle>")

* HTML

```html
<!-- 執行動畫的圓圈 -->
<circle class="circle"
  v-for="(c, key) in donut"
  ref="circles"
  :key="`${key}${c.percentage}${c.offset}`"
  :r="radius"
  :cx="chart.outerRadius"
  :cy="chart.outerRadius"
  :stroke-width="chart.outerRadius - chart.innerRadius"
  :stroke-dashoffset="c.offset"
  :stroke="c.color"
  fill= "transparent"/>
```

* CSS

```css
.donutChart {
  /* 說明 */
  .detail {
    color: gray;
  }
  /* 統計圖 */
  .chartContain {
    ....
    .chartWrap {
      ...
      .chart {
        ...
        /* 因為 <circle> 0 度從右邊開始，但我們想要從上方開始，所以加了往上旋轉 90 度變形 */
        transform: rotate(-90deg);
        .circle {
          transition: 1s; /* 漸變動畫進行的秒數 */
        }
      }
    }
  }
}
```

* JS

```js
export default {
  computed: {
    // 圓周長
    circum() {
      // circumference = 2 * pi * radius
      return 2 * Math.PI * this.radius;
    },
    // 顏色函數
    color() {
      return d3.scaleOrdinal(d3.schemeCategory20c);
    },
    // 所有資料值總合
    totalSum() {
      let sum = 0;

      if (this.data.length) {
        this.data.forEach((e, i) => {
          sum = sum + e.value;
        });
      }

      return sum;
    },
    // <circle> 屬性
    donut() {
      let newArray = [];
      let afterPer = 0; // 把前面的 percentage 累加 (0.xxx)

      // 產生 <circle> 屬性陣列
      if (this.data.length) {
        this.data.forEach((e, i) => {
          // 新增陣列
          newArray.push({
            // 拿來計算跑動畫的線條長度 （在 randomData 後半）
            percentage: e.value / this.totalSum * 100,
            // 位移長度 = 圓周長 * (1 - 前面累加的長度比例)
            offset: this.circum * (1 - afterPer),
            color: this.color(i) // 填色
          });

          // 把前面的 percentage 累加 (0.xxx)
          afterPer = afterPer + e.value / this.totalSum;
        });
      }

      return newArray;
    },
  },
  ...
  methods: {
    randomData() {
      ...

      // 用 js 跑展開動畫
      this.$nextTick().then(() => {
        // DOM updated
        this.donut.forEach((el, index) => {
          let totalTime = 100; // 設定切換 css 狀態的時間間隔
          let stroke = this.dasharray(el.percentage); // 計算 stroke-dasharray

          // 起始位置
          this.$refs.circles[index].style.cssText = `stroke-dasharray: 0 ${this.circum}; opacity: 0`;

          // 設定 Interval
          setTimeout(() => {
            // 結束位置
            this.$refs.circles[index].style.cssText = `stroke-dasharray: ${stroke.dash} ${stroke.gap}; opacity: 1`;
          }, totalTime);
        });
      });
    },
    // 計算 stroke-dasharray 的 dash & gap
    dasharray(percentage) {
      let dash = this.circum / 100 * percentage; // percentage %
      let gap = this.circum / 100 * (100 - percentage);

      return { dash: dash, gap: gap };
    },
  }
}
```

***
## 製作 `Tooltip` 功能的 `<path>`

![製作 Tooltip 功能的 <path>](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/Donut-02-tooltippath.png "<path>")

這邊你可能會發現很奇怪的事情，就是為什麼上面已經算過百分比了，但這邊還要再算一次？如果仔細看的話，你應該會發現這邊的百分比是用在甜甜圈上方顯示的文字。想一想，如果統計圖出現小數點後十六位數的百分比，是不是超奇怪！！！所以這邊文字其實是透過 `D3` 格式換算成我們較易閱讀的百分比，並不是真實的比例。

* HTML

```html
<!-- 滑鼠滑過的區塊 -->
<g
  class="arc"
  v-for="(p, key) in pie"
  :key="`${key}${p.d}`"
  :transform="`translate(${chart.outerRadius},${chart.outerRadius}) rotate(90)`"
  v-on:mouseover="showTooltip(key, $event)" v-on:mouseout="hiddenTooltip">
  <path
    fill="transparent"
    :d="p.d">
  </path>
  <!-- 文字位置需要由 path 的座標透過 D3 計算，才能把文字放在各自的區塊中間。 -->
  <text
    :transform="`translate(${p.centroid})`"
    text-anchor="middle"
    fill="white">{{ p.percentage }}
  </text>
</g>
```

* JS

```js
pie() {
  let newArray = [];
  let format = d3.format(".0%"); // D3 格式化單位（百分比）
  let pie = d3
    .pie() // 使用 pie 函數
    .sort(null) // 不做重新排序
    .value(function(d) {
      return d.value;
    })(this.data); // 為了等下要使用 arc 角度，先造好 pie 物件

  // 產生 <path> & <text> 屬性陣列
  if (this.data.length) {
    this.data.forEach((e, i) => {
      // 準備好 arc 路徑
      let arc = d3
        .arc() // 使用 arc 函數
        .innerRadius(this.chart.innerRadius) // 甜甜圈內半徑
        .outerRadius(this.chart.outerRadius); // 甜甜圈外半徑

      // 新增陣列
      newArray.push({
        // 計算 path 路徑，使用剛剛造好的 arc 函數
        d: arc({
          // 透過上方建立的 pie 函數，得知 arc 的起始角度
          startAngle: pie[i].startAngle, 
          // 透過上方建立的 pie 函數，得知 arc 的結束角度
          endAngle: pie[i].endAngle
        }),
        // 使用 arc.centroid 函數取得 <text> 相對於 <path> 位移至正中間 x, y
        centroid: arc.centroid(pie[i]),
        // 將顯示的文字轉成易閱讀的格式
        percentage: format(e.value / this.totalSum)
      });
    });
  }

  return newArray;
}
```

全部畫好的樣子如下圖，可以去 [Github](https://github.com/Annilla/d3-practice-vue-svg/blob/master/src/components/DonutChart.vue) 查看完整程式碼喔！也可以在[這裡](https://annilla.github.io/d3-practice-vue-svg/dist/)查看直條圖的 Demo，我們下回見～

![甜甜圈圖完成](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2018-05-01_1701.png "甜甜圈圖")