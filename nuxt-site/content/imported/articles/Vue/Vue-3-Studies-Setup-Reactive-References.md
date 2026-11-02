---
title: Vue 3 Studies - Setup & Reactive References
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2020/07/20
updated: 2020/07/20
---

上一篇我們提到為什麼使用 composition API，這次要複習在何時使用並介紹 Setup & Reactive References 的使用方式。

<!--more-->

影片網址： https://www.vuemastery.com/courses/vue-3-essentials/setup-and-reactive-references

# 什麼時候要用 composition API？

影片中再次強調 composition API 只是多一種選擇的程式寫法，舊有的 Vue 2 寫法還是可以完完全全繼續使用。那我們什麼時候可以用 composition API 呢？

1. 當專案想要使用強型別寫法，將可以順利支援 typescript。
2. 當組件過於龐大，需要用功能來重新組織程式架構。
3. 部分功能的程式需要在不同組件中重複使用。

![什麼時候可以用 composition API](https://lh3.googleusercontent.com/pw/ACtC-3eCvFbdVnrb9iLGHa_ZjO--scQhmd4UfRh8xaImOpv_R_amOSXUVy0KvP8-dGZGfayGYuqILhRuaHk8EH30fnjbCDTXQ1sL149XDMQAtlBOiVxNG9-QAa4PM8P9g0eqsdluiHv5Z7G8c1_pS6OBYE3znQ=w1708-h1280-no?authuser=0)

# Setup & Reactive References

我們來看看一般 Vue 2 寫法如下，畫面會顯示 data return 的 capacity 3。
![Vue 2 寫法](https://lh3.googleusercontent.com/pw/ACtC-3fimuHNX70ZHmpdzIw8k22KdDWMKqipei1fu7xw-QKGugH2EyXBA0C7jn0VLOH6F8ypXOCIPtZqpGCTgA8U3mF-D51ktcgy2ti-yIkdrwKu7GnOM0g0xWhkcz4b_FvBuN9hj4pouUSClZBoJmVZ9eMwlQ=w1708-h1280-no?authuser=0)

那在 composition API 要怎麼寫呢？我們使用 setup function，他觸發時機會在 components, props, data, methods, computed properties, lifecycle methods 之前，且他是沒辦法用 this 抓到自己這個組件。
![composition API 寫法](https://lh3.googleusercontent.com/pw/ACtC-3eWI_eBp_mjrFvWmA6EvNEZ356XpFV38MvVOhXq2Ge-vC-vH3_RLR6pUPw6PFBDRpXbv1jZDK__yJxOjYhrsrYD94VaMi9REsdh6A6_ZaRZwRkPEOWMkvlviRo39MYdt5aV5uAa9qMvNPzGgx6fGmNQ0g=w1708-h1280-no?authuser=0)

Setup 可以放兩個參數，先介紹第一個參數用法。第一個參數是 props ，他一樣是 reactive 且 可以使用 watch 監聽改變事件如下圖。
![composition API 寫法](https://lh3.googleusercontent.com/pw/ACtC-3emWzVDwDPK7WrgHEszBhgr-UsIjKvFGVf6Itw2TAvGs0Y0hVtQyXXyZBzSKW19gvrIz5SW5a5C3NDSDNzYufFPn0wieD8RvNm3F4xpgT651nGz-PVnMat5MbiL-YI2uvSp_DBlzrPFqCZb_NKs2qkTYQ=w1708-h1280-no?authuser=0)

Setup 第二個參數是 context，剛剛說在 setup 裡面不能用 this 抓取自己這個組件，所以第二個參數 context 就是拿來取得自己這個組件的內容，就相當於以前的 this。
![composition API 寫法](https://lh3.googleusercontent.com/pw/ACtC-3eGf9nsqqhd9MQbfrR3ZM5kprpY6PNwbIWG6Na2_g_PQnmmWwCKFPYwmjNS5OF8mMu5ETKiC_Z60-W33BxyP5jQUn56WiSeZNb6j89lfevlliJgYn5Luc0BF4myz1ZTENDmENgeDOXAwWuwl-SgrJSHkw=w1708-h1280-no?authuser=0)

我們回頭來看看 setup 要怎麼寫。我們會令一個常數 capacity 是 ref(3)，這邊的 ref 是 reactive reference function。這邊將我們的原始值包在一個物件當中，相當於 Vue 2 我們將值包在data返回的物件中。這邊要注意的是：用 composition API 也可以造不跟此組件相關的 reactive 物件。這邊影片當中說這是個好處，但不確定好處是在哪裡？可能要等以後遇到對應的情境才會解釋。
![composition API 寫法](https://lh3.googleusercontent.com/pw/ACtC-3f_P3n5zpchz5UWRVigSz3nS4LGGw5BfF6YI83-9hPmYco3uUMDgd95x38xbPS5B4j56nIydDvWobfWDIfcj2uNs38WOecRLezuX-dHmxPJDCrEJdLGb_39-UDRRhwTOpmuI1B1cA7CXaRLLzw1lUMnBQ=w1708-h1280-no?authuser=0)

最後，我們將要關聯 template 的變數和函數 return 出來。雖然這寫法很冗長，但他讓我們的程式更容易維護。我們可以控制讓哪些變數或函式輸出，也可以追蹤屬性是從哪裡定義的。
![composition API 寫法](https://lh3.googleusercontent.com/pw/ACtC-3eaJSLKDDeZxuwoPihyTaK-VtIZDVAaXKqPuHWDteFjC1KAjk5UXMCRs-gWVHoHvcQt_WTAqKm1bfUWfETaBCJgURCj3PnJF5jcp1McrVf53Zhl3X0fICg7IwvqzNGNFSG_l-R9u7A-T7EWkgVCJPlSxg=w1708-h1280-no?authuser=0)

# Vue 2 也可以使用 composition API

如果我們想要在 Vue 2 使用 composition API，可以如下圖安裝進來。我覺得設計者設想的很周到，不過礙於目前專案開發者程度參差不齊，我應該也是等到Vue 3 出正式版且vuetify 有更新框架後，才會考慮開始用在工作上的專案。
![Vue 2 使用 composition API](https://lh3.googleusercontent.com/pw/ACtC-3evT6PLP96czPiySVh0t_XjIZPawE78kFDXMuxS3JEMM8TEemPNbdqdRxS8Y577J_tIJbE_J_cpKTtciGPnRaQt3UVH29Ue-RR6lrDFGO_l7d6gwa8O7hUUig358G6lmOClZTaRnH_4PPCCw7JA3Hm5Hg=w1708-h1280-no?authuser=0)

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)
* [Setup & Reactive References](https://www.vuemastery.com/courses/vue-3-essentials/setup-and-reactive-references)