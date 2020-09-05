---
title: Vue 3 Studies - Fundamentals of Reactivity
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2020/09/06
updated: 2020/09/06
---

因為官方的資源部分要付費，所以去 YouTube 找了一些可延伸學習的內容來看看。這次找到關於 Reactivity 更深入一點的用法。

<!--more-->

影片網址： https://youtu.be/BFav9Z4lEXE

# Reactive vs Ref

Reactive: 當要把 object 做 react 就要用 reactive。
Ref: 當要把一個固定值(string, number, Boolean)做 react 就要用 ref。

![Reactive vs Ref](https://lh3.googleusercontent.com/pw/ACtC-3f9TGipvzquxjvxI4luLhEiwEQOHFINsSU0JBVe6lmsQ_tj6c9htZHUpytUQNIRO-bTeqi5n063fjPfUZkjSYzbdozr8h4lq5xyzujQP0wnjKSaAwxzyBifPbP40gaTwWhKvQ-oFa0GNmzGpNwrAzwUFw=w1708-h1280-no?authuser=0)

![Reactive vs Ref](https://lh3.googleusercontent.com/pw/ACtC-3dGNEEZbcywl457ZwacIOrmOjXGiTTszssScBXncRXAQMgISrmEMIsAi99z-dbcOtoBxIS4DYMfgp8xa4rklkteHbhgEr8uZ_fcRbvEDlc3o9MPqYOTTWVJOtJ8r8WVblWNCwOxGULP3yD22jMklfISoA=w1708-h1280-no?authuser=0)

# toRef vs toRefs

使用 toRef 函數可以把 reactive obj 內的屬性轉成單一 ref 值，如下圖。

![toRef](https://lh3.googleusercontent.com/pw/ACtC-3fa7SA3W5EooXb7fyuHRhu-q3R0rs4YRIbQKfvujfw31hi_DYy53YlBtGVLLGaU1BzP06tol8bYgdDlQgjixZ5phUTG3F0rpwCA6UVw1Pzy7kzxLn1UsOSgqboJr3UTN8aJdzFHTFDvoAsIYcvD0lsLlQ=w1708-h1280-no?authuser=0s)

若使用 toRefs 函數可以拿來對 props 或 object 做全部屬性各自轉成單一 ref 值。

![toRefs](https://lh3.googleusercontent.com/pw/ACtC-3ePW0Ue26Rz0s066lV_xvoe5bDY0coYqtFgvABsB6DTFmJW4mABNRaqHDJjbWKJmRoyLBZpEdeX-sYxtVNzDEv3w6HCfHTB0bO4ML5HiL6FIqfjjNPOmY_Sav7WbHLJDwihsN1D7KtiPZ0exmA4FRhNGA=w1708-h1280-no?authuser=0)

# customRef

Vue 3 可以客製化自己的 ref 函數。透過 customRef 方式如下圖。

![customRef](https://lh3.googleusercontent.com/pw/ACtC-3fGZfKqFoItRF56u3f5y835b_QbUczl4qWyS_BuQ2R9RY6itEOdwR_aRpylzx7b8XX-7bVYtQUP2OIizKTDiiFgY6kyguiPU7_QNoiUvXSzpbknpOxA32vKhOVYHDLWXp87LFpSatCdr2q30X_Lst-1FA=w1708-h1280-no?authuser=0)

影片中透過 email 格式判別的範例來說明 customRef的用法。當email 格式不含 @ 顯示 null，反之顯示正確的 email值。

![customRef](https://lh3.googleusercontent.com/pw/ACtC-3dxClU0KBmATmDQoSDedboOvyBh7APXsyAHkO7bcG5SExT0MbXemVjRXZM6o5JQs7xEydtISGtxj4y9oX-9v5fzb2opBvB6Dzar_m9Uv6_gJvl-9Ctp4SFzbJELzrAsr1MLsemoPfLtK0qZbfjIoyiKdA=w1708-h1280-no?authuser=0)

customRef 未來應該還能做更多的應用，例如時區格式轉換等等，應該會更為簡化程式邏輯，非常期待往後能在專案使用。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)
* [Fundamentals of Reactivity](https://youtu.be/BFav9Z4lEXE)