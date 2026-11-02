---
title: D3 v4 with Vue - SVG Vertical Bar Chart
categories:
  - D3
thumbnailImage: https://lh3.googleusercontent.com/0ql8YPK9TWE2Iw2k5riCgtn6op1D95u8PM6OpYAiq1dZsrJ580p9Cmprzs4lMk8WAHeO81FEcsbR76fEphaIz67O6YylI2bxFQu3BHhcm3k0IP6whT76GyTmsR7HANYz1KeJVTTG2X4-KxV7zh_FsAhdZ8j-gz2BcWsaYonzgm2-bzEDNEvkCTiH9klL6RGWE9YhK_BfjR402BCev0Uq5nwNwEhHjqBeIpv-ePFTAux2RXkdXZ9iz67SKQ0h_q-w7vB9oPzPrg8FZUwK-WbM0uoKQI5IZP0BUXf9eyE8_fFa3YPO9u4V1Dhcf6YsMfCIvO6OpYvh5PeWKpDWm2q80MmUKrAp0G2nthLFwcC5JZlfWWiM-mPbZ04Oklp61oOOLA6bdBJCvMtmwCiycopM3bXsmCA06hK4hDyjRiT_foULVswowzSRc7KsL-p5ayX6Gg2mmdX45Ile4Tw7NjLk8-bVBHhC6gb6DnbDFitOQ6RVKSwXn6WK98i11j3PykdwonGTkc4_9Q9v-dOWSVSpdE1Ouy0wjCDFn0tYH7OPF1tRnht7JgbdrWw0p-AJ9O_jHy6K-BQN4I6n9HchsrRvZE9rITTXd8lv6hj5KG_2JQ0vWIpNqGrif6OH4pik7olcv3v45Z210q2ufPkmoPQIHTEeKQvRbEUN=w600-h200-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/-eOwVjzN6KMfzEVll-unJCaKBes1MALCdB9jxG6e8lvWovjeLtdbf2NQoH0DKAM9SS12sUeOnOlQ5Q8hTMAexo9N5jIS4P2S16RDrrY9WQziVA8E-0cPxcpldO6YgU2MKg64Tn2pXchVxryU_w1QjaYaUk4P17cRXHc4XfQEp4LViItsu2Ze2Uy5llcYhUtubWfmMpAC0FN54OWYb1sY-jgQ_ps2V8GXKPmrjCXFFX_zXLEHVuyZznY4vXYyLXOVkydprDNQojOcUyok6nG-4DAgA35W3v9BazdoiW1iNU97FJwr9mBvuvUAmS-2U0lPBa34-B-Lx-5736rwQXfqOY6gQIBeusZHjFgQR_3ByxJz5KuLLOVsA0uauyYxS2jIBMFFP_d6xve19P0dNAVP5tC7Zj8S0g43Rbl9S9h8eXyjaxUVeYAG1mZibk6GEkqrawGDOXWTITTjkRS2Buhl6YNcuSxezcm_IR4NZCcsgXE3VtEeYhGpIaoaS-cMemaqEKi8F7SYtKZQvH_SM6SYakk6J0aqik0gNRTyxA0nvDlVp2ohNsMdRWFqhRJ5RfgOVfGIFkohL2DnhgHRntAGKHqqnas1uKk8tS040VoxZuYvVp24N0N9OfwnYmmMQYHh_COOdYkItMsHzhAX53dpqgyGbeyq5zL3=w1024-h551-no
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

![剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)](https://lh3.googleusercontent.com/jZblvHrlEVkWivyJRdqbnChcpzjIGTO0W51dGDMQTSJqtL6Fz3OgGclg79-eXpB9suVivseGe0NCGUcl3kA1n14BIBuUeS0KDzDq8LTTXVMBNiYtjm-KiY8-BnvmkaSxeF-qCUZIKL6atH_5Kh8utztXHtG-hhbq49oXesaVbGiHoc1bpwpA_YT3hcox7eqPiTt-oOTWmC_Uu3VSN8tZ1NKi0k6xpFqlJTrLxLc4PZ3SyDxHSDtscDZPMwAip5Ee7Dz3FnvETQxusKCu_7mnsosIVmY48P55F00UepRxv3gX_wGJ03dH7faNCLFeXShHVH54-Aw4iY8nLEX_p8qjPuhVgII9FO9BCR3Zrc7Y4AKRh6xnTPfNzGana3cm_Hfc01Imz_Dg_4dDnwimmzMOaDsF9wiMIhDlVc9O44RRu8L1T665QvIyANpYCnm8ujL6GAzZ39j6hXh1u-WKglTUpUBlgpO5GeOTSiG9XgKrA3pVL80fIq9kvgD61TZPmhSXId4Aj-m7tPkVMGJeDp-K_ukaoZW15RN-MIkQsRIxSurqhoGWkQ20lsKdKh4FvyAMbbG_Y1u68sPbdYvFZ5ka41-a5f7VtAu_alWZFw3XSLIBgXzoXfkHQtedzByyafq57wGhMLBb8qA__hutfVu4Omcvf3Zfbu9Q=w604-h694-no "剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)")

![扣掉長條圖中間的間隔，剩下的寬度分給所有長條](https://lh3.googleusercontent.com/TTY0912pddpHrNUxQY04UZm2rUYh9fucfjoaoxX33yjbSRf__xOZq-rIgZFjvJbR8Q4cIKD9kLZGyR10lt8uBG0_gUzDKmWF1Vmzy5ijYWybjCAkeo27OkiYiXDSyPdFJM89WcdajieDv0KyqaFj7swZ8mVpQNYSX76kvDN565oR6iIejII7hbHC4Oi69k6x897AdXx_uPWHrWmbshttNWoWtKkEoxHZQO37AR9HouaTD1vDGyh7EvfdP0zKL1lQOiLNqbmk2-CTdw3JrKysn84gVAa3ulKKVtg269fmV-vK3ITRyvh0Bp5kpgv_HfnUMenVp_HYdh0ldGimVi9FhmXJqjIY4emmKOH55Up5oaMMW2Z91C_dJA8mbex3Cev6AZXjU8aWsXmpGQIalHzjAzBXIUese1T3W6zMYrJeXNuxX_26ZfF_hKIMtuKMsHDtKRRsHwmgi1ZnBohh8vBArUJWpL210_i2feIToAWpm0doTzCNEiYMx6Lp75ySeejMjsunMzBPF_gPNKEDQPwwHovKxzgJbfQ22vvov4DNl-DVkJgqSPK-7tGPAcbttInT2VjU6BmHkV4EHsSZPQHRCQynilcLdrfKMGKyVVCx2jpChOrLZlSebOwESJ1q6mKV7CK4-EMbjm3whgVhuN1KjMwyyNEYC9pm=w604-h694-no "扣掉長條圖中間的間隔，剩下的寬度分給所有長條")

1. 剩下可放圖的地方 = 圖表寬度 - 左右的間距 (大約是x軸寬除上總刻數+1)

2. 扣掉長條圖中間的間隔

3. 剩下的寬度分給所有長條

***
## 直條x座標

![扣掉長條圖中間的間隔，剩下的寬度分給所有長條](https://lh3.googleusercontent.com/oPWMvbdY76bF-4K5gZKM6Lmees8dv6dDwCEz_hFvqcCK0vuGfcB2I_PafS41ajU3ehgU43swWfptKkqBFP1ap-WxQ8VeY0bWhypPglFygisUB8rtqBEJ6BhfPUgHw-dwQE23Z9QEMPH1geS5TsR4RrMHVmqQJBuKYhx0CPuvfOyuDoWoq2ynppBF7f0UMkaX6Qbko1nbw-T0RPHs9UgwxIUcvw4072hgGGVoXfwEFjXMFF3hHnepRt6Ap6aZh1pFPD6k9ZCOJKFvooaR0HiFE71nKfot2xwk3Q-aVEKjVAuwfDIu8EgPziuPDmZKkYnP1bFhXXvJIRw2pQCYFDnZSdL4eOwZ_JgOhRVc9aZwnrPkCN_CJDn0Ps4Uw6h5cvdlSITjjTyFPuQ_7oBrXAOnO0lVHzxqhb0SFrUbIEj_1AIdp5IkpoyuM3rKxiOlzBcS9I1DW9efIyDEUqF0KwBuMxwjoJaSyoxryGW0HWkFNaCCshb9PJZHWEvxI_63H-l7X1Uxn3Kv3StFS2VgzuvU0o4MfdYYEFH1STCK_6vZMv_xbCtXyWZM1Ag-ci2LqATgfQ9GyGD3Se1oxjmDrRBP8MOdfH_guJLmvCGEQYm7FK-YZZX1YsiGR_p1zM4X7KtS77Zd6hpXVJa31bzQISz7kUStKR01lCZG=w604-h694-no "扣掉長條圖中間的間隔，剩下的寬度分給所有長條")

1. 把群組直條往左推整體的一半

2. 依個別順序向右平移

全部畫好的樣子如下圖，可以去 [Github](https://github.com/Annilla/d3-practice-vue-svg/blob/master/src/components/BarVChart.vue) 查看完整程式碼喔！也可以在[這裡](https://annilla.github.io/d3-practice-vue-svg/dist/)查看直條圖的 Demo，我們下回見～

![直條圖完成](https://lh3.googleusercontent.com/B6TzzgsZw8pI0JAbb7_DHD3on1AKCSLQPs3N0uMIfiJQRNY1hvZ803AcoXCcFrYEfxHzDxCOau_DUmhILVyNumh_ZRWDd3332BsI787fiD3oO8UCBOI7qzwUjk0B_42izUfJJAKseu6mzDgkBePYY1e2_RiMysSHBc_hQ_rjupXuZyYeBjRY7HOd_VuyWMbjaYMzgDVbTy5Szs1cOC4obFVrc-E_-NynRtkTRQXrfoPF_sS6259qxcDMs6nvXeoFoVsIhwo56uCAw2K07ciS-Md-4m7WwV-kx-YMJMFAilrZ_aJXUPRwYdTA_8u9AmCynhASNzOpSUmfeiDPvYFsjdWD9FeR7UmRjRaRP0KrROeQRmLPx0B4hbfuy467v83Zkvp7ghEwyymFOTyB83kvXWzjLPij4k5xziN5dPKX7cQnuAOvpnumew3Dx7wrXDST9wx6qPOrisLUoeQjjEVnwl2L012UT0ow7fh21HBjSCglX33mipaAD5QJZz_iYf6Yff4HlRXvPSr3a_kkRAw_BLxm0J-5RI8Q-T9js8vIXn3At2u6Nk7MwKhede7Mkcq3W4MjCu7ZEZdMuMdBMskdNl4takHf5FFgUjPhid1EpXkASa9RWVpYicmaeuf4QvcBu3IfIl4b3zGMbB_j8M4_QwFBA4cz1gw_=w917-h1024-no "直條圖")