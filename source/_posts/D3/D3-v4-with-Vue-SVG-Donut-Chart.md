---
title: D3 v4 with Vue - SVG Donut Chart
categories:
  - D3
thumbnailImage: https://lh3.googleusercontent.com/0ql8YPK9TWE2Iw2k5riCgtn6op1D95u8PM6OpYAiq1dZsrJ580p9Cmprzs4lMk8WAHeO81FEcsbR76fEphaIz67O6YylI2bxFQu3BHhcm3k0IP6whT76GyTmsR7HANYz1KeJVTTG2X4-KxV7zh_FsAhdZ8j-gz2BcWsaYonzgm2-bzEDNEvkCTiH9klL6RGWE9YhK_BfjR402BCev0Uq5nwNwEhHjqBeIpv-ePFTAux2RXkdXZ9iz67SKQ0h_q-w7vB9oPzPrg8FZUwK-WbM0uoKQI5IZP0BUXf9eyE8_fFa3YPO9u4V1Dhcf6YsMfCIvO6OpYvh5PeWKpDWm2q80MmUKrAp0G2nthLFwcC5JZlfWWiM-mPbZ04Oklp61oOOLA6bdBJCvMtmwCiycopM3bXsmCA06hK4hDyjRiT_foULVswowzSRc7KsL-p5ayX6Gg2mmdX45Ile4Tw7NjLk8-bVBHhC6gb6DnbDFitOQ6RVKSwXn6WK98i11j3PykdwonGTkc4_9Q9v-dOWSVSpdE1Ouy0wjCDFn0tYH7OPF1tRnht7JgbdrWw0p-AJ9O_jHy6K-BQN4I6n9HchsrRvZE9rITTXd8lv6hj5KG_2JQ0vWIpNqGrif6OH4pik7olcv3v45Z210q2ufPkmoPQIHTEeKQvRbEUN=w600-h200-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/-eOwVjzN6KMfzEVll-unJCaKBes1MALCdB9jxG6e8lvWovjeLtdbf2NQoH0DKAM9SS12sUeOnOlQ5Q8hTMAexo9N5jIS4P2S16RDrrY9WQziVA8E-0cPxcpldO6YgU2MKg64Tn2pXchVxryU_w1QjaYaUk4P17cRXHc4XfQEp4LViItsu2Ze2Uy5llcYhUtubWfmMpAC0FN54OWYb1sY-jgQ_ps2V8GXKPmrjCXFFX_zXLEHVuyZznY4vXYyLXOVkydprDNQojOcUyok6nG-4DAgA35W3v9BazdoiW1iNU97FJwr9mBvuvUAmS-2U0lPBa34-B-Lx-5736rwQXfqOY6gQIBeusZHjFgQR_3ByxJz5KuLLOVsA0uauyYxS2jIBMFFP_d6xve19P0dNAVP5tC7Zj8S0g43Rbl9S9h8eXyjaxUVeYAG1mZibk6GEkqrawGDOXWTITTjkRS2Buhl6YNcuSxezcm_IR4NZCcsgXE3VtEeYhGpIaoaS-cMemaqEKi8F7SYtKZQvH_SM6SYakk6J0aqik0gNRTyxA0nvDlVp2ohNsMdRWFqhRJ5RfgOVfGIFkohL2DnhgHRntAGKHqqnas1uKk8tS040VoxZuYvVp24N0N9OfwnYmmMQYHh_COOdYkItMsHzhAX53dpqgyGbeyq5zL3=w1024-h551-no
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

![執行動畫的 <circle>](https://lh3.googleusercontent.com/y3ciNP2itQDbjSzjgXxlukSy-kfrNSRuyhAcs6afRYhZoU3jMXL7jB098ANZEWAV8eSsovPlqPCgjuwx5dbtff_ItDj6vvTBiPPmTQRyThIX-XHeeXwgoWCFeGji1KA9DJRyY2_lRjoV0elfwsKcyVn1VaIICoGD5uFBiH2K5vbJvuTPnOLXcgE4Ng6rQZ8d6NNEHWYtPa0UqaGtMpbBXzVGFQmA7U48vwIJdQJwzuyYy0Pj6dmfa7IVDUCSOp84EXTO0tZsoBufOpjUF9miUGNwoQS43xwKtPfl0ur6cA4hTpbn9FlCU4rDym8Jaa9mkBarS8T1Y8hH09udOeiv9dIaKJrniqoXnf4G3wTB79sKLVmDiKv6vQIB504mby_sbn1c3aQVoQlyJfahu59J2IRVFlZ1_jVpkSi9SCu9kf-O_gyMdCQcID79yYuLKsq3nG5X-UwlbX5SDKvPif8YW-r0MtdxZVuMX95Ot4FB0nh5M0l3pSd2NhllyL_Xsa4U9MwgKQB6vPCajdSYNsM6NtTgfUKJfUFANreODCXT9uYwCLd50nkUhOcf9QA0k3gORRJxbDozlchw4y8nuc3EA3G36KVFLM50NYjLnHmw19i05cEnduWlg3d--Ku4Hx6n_NQwPEFjsJVZpX2IU5VZdXU4PBRKgBWS=w600-h576-no "<circle>")

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

![製作 Tooltip 功能的 <path>](https://lh3.googleusercontent.com/PYNMBI1NGyZvd-VuUfGSGcZR5B4HlbvrPPyBFGPPRV93iTPzhYyQoGipBmZw7xLAuHGvYALgqaunKM3AygQOJQvN-vf7JqiJqyu3pGsrqHOizHIAb37MK7__M8Z7bGsBYqgfhKsmmFr6hnHcYD2V8KUAD8LesMx6bPBvxvw1HdFeAHFIm3zeOtnzdYLeo9CoPE0Cjk-V_SylGwg8vNmp11OBESjJbGfshslHV0ih3FHkB5F7DmGbzY_7usoUDnVOgXdzFAIFMlWrJnR-k_Y_HYeOgfZkk5__OqhokFbvBsAYmuHhIWLNIin3Zs96XgVgF0DAKDLdpJfpVthZTdSdAXYmE9izJnaNf5AbeXKgtspy8ARAoXx4h3soWWg8IorSidCfULUEtUOtNWQ8ZBJ-fGqSzCXYFB4Yr12RI4YDaoB1e51JATaQGDmIu8hwbaUoUecZe0Ryo04VjUZ1bGmRzXMmsoRvNcb2rkPF3n-t1csEU48dxSzZgcgRm7gCWprA2qRbIt-5c_LthwXteMkFsYQj3XRxmZTvl9AOom7Ypme0juX6tcjHEj1ogkSopwGhxr-NZvHNU5qax5vKIcpBF5wLpdAS7INTkNsr_Dxyo3-rTk8tFriT8b2mTY9vLCWOrNm2_seIi8ZM74qPVq-jc9HqE8AfvS8V=w600-h576-no "<path>")

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

![甜甜圈圖完成](https://lh3.googleusercontent.com/b5xMuJcWbNk6hgHI5RT0FbGiIN6_XK8pJsXqSmiK-6kXykrTkgYLC4rOtrpZt1fcw3OjOtjgwvNHBkewBHST6Z1WoCrRPo6AD4oekyvYh24S1JS2ja2QGSMFyfhIOSD_eY9AZTvfprwIqDBPs3_E-sFsUpr1YcidoinaoGbhCRT9yJom_ztql5N6isa5lznQ_xLWkbg_8-3QS9_J21qVgBAly90yKebDGLrXmJFNyJG75wZP_vDIyINy2H2fYTg49-spVM76MavB-9ESNxSKFTRbAGaE3xcBR7wmAICq8SzP__ucHYOehi2sWGNsFbc4Vn3jf23QT2JXI6N9aLgmiwrDaRAkYDqGgpYPSJZPzW0gZZysf5nEHLluS8B2q_B5Ewrmz54HWF-ZVpSYoXYbC2G4ynMaOT7g83ils5zDDfZMitBqE9zb7l8esPvxsKa-ODi4qoThsmlj5UfUjWsNT8XuxCb83VwCjPbVF5fZdNJcuC5SAaFqN1IjdKRAwMpgq3ukvg6ITv4TjPSDGE8MXnNQzG2kff-bSnzWUxWaVVA79aRyw4dmEuy74tMV8nTMVZRmQ7o8sRJEzp11f0Qvz91Lqn0HRvEzt6uigBkrfLqno0m0alzaIJj8nBhy2CUEP7BR_VsHtZ1s_GWD927Jbpl2n6o-lilU=w1024-h983-no "甜甜圈圖")