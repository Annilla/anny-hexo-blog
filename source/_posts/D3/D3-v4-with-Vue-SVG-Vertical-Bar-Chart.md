---
title: D3 v4 with Vue - SVG Vertical Bar Chart
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, SVG]
date: 2018/04/06
updated: 2018/04/06
---

這次要來練習用 `D3` 搭配 `Vue` 做多組動態的 `SVG` 直條圖囉～
<!--more-->

前面幾篇有講過的原理這裡就不再次解釋，我們直接從繪製直條開始說起。

***
## 繪製直條

* HTML

這邊直條圖外面包了兩次 `transition-group` 是因為第一次進來頁面的時候，並不會呈現動畫，所以為了 Fixed 這個 Bug 所以外面又包了一次 `transition-group`。

```html
<!-- 直條 -->
<!-- 為了初始有動畫，所以包了兩次 transition-group -->
<transition-group tag="g" name="growBar">
  <transition-group tag="g" name="growBar" class="bar" v-for="(group, key) in bar" :key="`${key}${group.rect.height}${group.rect.x}`">
      <rect
      v-for="(r, k) in group.rect"
      :key="`${k}${r.height}${r.x}`"
      :fill="group.color"
      :x="r.x"
      :y="r.y"
      :width="r.width"
      :height="r.height"
      v-on:mouseover="showTooltip(key, k, $event)"
      v-on:mouseout="hiddenTooltip"
      ></rect>
  </transition-group>
</transition-group>
```

* CSS

```css
/* 動畫 */
.growBar-enter-active { /* 進入動畫：進行中 */
  /* 動畫時間： 伸縮變形1秒, 透明度1秒 */
  transition: transform 0.7s, opacity 1s;
}
.growBar-enter { /* 進入動畫：開始 */
  /* 因為直條的起始點 x, y 位於矩形的左上角，
  若用 js 的方式是要同時變動 y 座標和高度，
  但因為我們使用 css transition 的方式，
  所以只能微調縮放和位移的比例，做到近乎相似的效果。
  垂直縮放從0.55開始，垂直位移從-12%開始 */
  transform: scaleY(0.55) translateY(-12%);
  opacity: 0; /* 淡入從透明度0開始 */
}
......
/* 統計圖 */
.chartContain {
  ....
  .chart {
    ....
    .chartWrap {
      ....
      /* 因為起始點預設是左上角，所以要改成縮放中心為中間底部開始。
         包了兩次 transition-group 所以群組.bar也要設定縮放中心。 */
      .bar {
        transform-origin: 50% 100%;
        rect {
          transform-origin: 50% 100%;
        }
      }
    }
  }
}
```

* JS

直條寬度(barWidth)和個別 x 座標這兩個比較難懂的地方，在後面會用圖解的方式說明。

```js
// 顏色函數
color() {
  return d3.scaleOrdinal(d3.schemeCategory20c);
},
barWidth() {
  /* --------------------
  1. 剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)
      this.chart.width / (this.valueLength + 1) * this.valueLength
  2. 扣掉長條圖中間的間隔
      - (this.chart.gap * this.data.length)
  3. 剩下的寬度分給所有長條
      / (this.valueLength * this.data.length)
  -------------------- */
  return (
    (this.chart.width / (this.valueLength + 1) * this.valueLength -
      this.chart.gap * this.data.length) /
    (this.valueLength * this.data.length)
  );
},
// 直條座標、顏色
bar() {
  let rectArray = [];

  // 產生直條的陣列
  if (this.valueLength) {
    this.data.forEach((group, index) => {
      let rectGroup = [];

      group.value.forEach((e, i) => {
        rectGroup.push({
          /* --------------------
          1. 把群組直條往左推整體的一半
              - this.barWidth * this.data.length / 2
          2. 依個別順序向右平移
              + this.barWidth * index
          -------------------- */
          x:
            this.xScale(i + 1) -
            this.barWidth * this.data.length / 2 +
            this.barWidth * index, // 設定x座標
          y: this.yScale(e.number), // 設定y座標
          width: this.barWidth, // 設定寬度
          height: this.chart.height - this.yScale(e.number) // 設定高度
        });
      });

      rectArray.push({
        rect: rectGroup,
        color: this.color(index) // 設定顏色
      });
    });
  }

  return rectArray;
},
```

***
## 直條寬度(barWidth)

![剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/A01.png "剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)")

![扣掉長條圖中間的間隔，剩下的寬度分給所有長條](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/A02.png "扣掉長條圖中間的間隔，剩下的寬度分給所有長條")

1. 剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)

2. 扣掉長條圖中間的間隔

3. 剩下的寬度分給所有長條

***
## 直條x座標

![扣掉長條圖中間的間隔，剩下的寬度分給所有長條](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/B01x.png "扣掉長條圖中間的間隔，剩下的寬度分給所有長條")

1. 把群組直條往左推整體的一半

2. 依個別順序向右平移

全部畫好的樣子如下圖，可以去 [Github](https://github.com/Annilla/d3-practice-vue-svg/blob/master/src/components/BarVChart.vue) 查看完整程式碼喔！也可以在[這裡](https://annilla.github.io/d3-practice-vue-svg/dist/)查看直條圖的 Demo，我們下回見～

![直條圖完成](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2018-04-06_1105.png "直條圖")