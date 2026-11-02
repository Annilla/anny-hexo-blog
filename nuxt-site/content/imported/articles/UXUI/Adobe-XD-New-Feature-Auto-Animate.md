---
title: Adobe XD New Feature - Auto-Animate
categories:
  - UXUI
thumbnailImage: https://lh3.googleusercontent.com/15TevdlU0UA0DHjDXR8IFLjUteZ4XGxRObDpCwsIumenN6CLFYQFRcoJnS_6xYGMmbUFHxpqlXp25FcRXorD83F2vgEoldt2orwKDe1_QGMpNRhvu0KtXQ1KxuXUV7GTUSCOn4GXJMj8lCETJtDBXcyl6bi_snLs80aQJu-mSbdzJ-Bj3D_0DpmVrnfS_KyUD7I-RnQZ5FOzarAYJmXYpwjBXGZkGNc1CtiSJ1OAQPCXFsOIj0Wnw8Bpq8z0ysUDOZXt6ZWoC74yspZm10_zGEUyjm5axY0SDCxxwPcdJ_GIhoz90_L9wqRjz1NLVOBgPsDmQwWKzCd4o-M-VgjflYccFA45jcNEr5vV5Pce3JKqX9gJFIL-qVW9J5Y_qjMBZdOr7M3YWveJeo8daOKrF1CIGuInKckICK5-K4h52V_CpV_1jEPEDRfI5OGnX4AfFPnntVRmP3y8raD5ajnxgnFAj3bVmaC4XSDO9ZLJd-soMaaTqa-URYTv4WjGJZGpM-XP2MYrMVyQyafCzc90XKuxo3stdk7qL9-Hua-AQi5S5iVLacJz8LSTRqGcy8vXu_vIG8YHLOCAQAQO3pXJxcwu33BlttXskTLk-b8j2MvYr1OM25EW35MThuYOQNimlGLn7P7f5sphQiTt-aNT0mj-HrD_xE05=s250-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/Ht5ducjpGZIxCwrhATVndjvHuH_-Kz2Tl3a4r071v7j_GHdCDyo5D5myiDer5DZwdhCDWb0ZSgwdusqZsgc3q2GXPXv3I_CGwluVHNyiieve2YsRUy9_-xuJONWJJZ4Fd4gxZAqXh8J57Q811ITlBRHUuA6UJQeM_9cQ52vpmFWXIgM3NBlV0_QcBebviTM6XT3EHucC0Wv4LFpCYffHzM_Aftc_YTG7QVrG5wtBg0ebGhMggyMme6j1kRuxdOI_nvoFpTYxHr58P68R5rcSdXxVXZ0FeYpKaNkmkZ7rNhsL_z3iWI7CxjbSPJD5USGFSS88OdSfp34p9dysnyk8-FJN3COPgxcZh0krE_Yn_pUhAObBn5nWC6WdZzTFCcTHhY4GDsYlsO2OsizYSscRoqCfUaZ_byBLYop2mr4-I2NsOwVTHVMCa3XLZ-bKoEei_GDNuBeSOs6s03lLVgN0-BPnXhqQkRRVSTvg74D1cu65nlDdMEe__a_H8PJxRuxo7kIzuZS2gP7vjwiKkd2bYR705P6P8mWVJf0RTDED3uTtM3it9yvTOa77wiJJtr5Y0h75S5ZrcclHDu6t9WcyFB3yrLuPBNPuieuy10HMhHXBqZqQRX8tyPZaQwNiANFgBQQ1MYs_jXPXnrj5y5-GneVm30LkL5UE=w1024-h683-no
coverMeta: out
tags: [Adobe XD, UX, UI]
date: 2018/12/02
updated: 2018/12/02
---

Adobe XD 新功能 Auto-animate 在 2018 年 10 月釋放，雖然現在介紹好像有點晚了，但看了介紹就覺得超威的，想要好好整理一篇順便收集目前線上不錯的 Auto-animate reference。

<!--more-->

***
## `auto-animate` 是什麼？

一般來說設計師要模擬互動的過程，通常是靠著複製並微調數個 `artboards` ，並透過使用者點擊切換這些 `artboards` 來呈現互動效果，但以往 `XD` 的功能只能做到點擊淡入下個 `artboard`，過程是直接的切換而沒有漸進式的變化。新功能 `auto-animate` 則是讓設計師使用 `XD` 在同個元件不同 `artboards` 做屬性的微調後，對該元件加上 `auto-animate` 後就會自動呈現 `transition` 的效果，且觸發條件除了舊的 `tap`（點擊） 外還新增了 `drag`（拖拉） 的觸發動作，這樣就可以模擬手機左右滑或上下滑的互動效果，聽起來超令人興奮的。至於元件可支援的 `auto-animate` 屬性例如：大小、位置、旋轉等等，可參考此[官網說明](https://helpx.adobe.com/xd/kb/supported-auto-animate-features-in-xd.html)。

> PS. XD prototype 的觸發動作除了 `Tap` 和 `Drag` 外還有 `Time` 和 `Voice`，這個等以後有機會研究再跟大家分享。

***
## 如何製作 `auto-animate`？

在解釋步驟前先來看一張官網 demo 左右拖拉互動的效果圖。

![模擬左右拖拉互動效果](https://helpx.adobe.com/content/dam/help/en/xd/help/create-prototypes-using-auto-animate/jcr_content/main-pars/image/Drag.gif "模擬左右拖拉互動效果")

製作流程：

1) 將第一個使用者看到的 `artboard` 設為首頁（成功設置完 `artboard` 左上角會有房子的藍色 logo 圖示）。

2) 將要展示的滑動過程依順序將 `artboard` 一個一個連結好。其中要設定的參數如下：
* Trigger: 設置 Drag 屬性
* Action: 設置 Auto-Animate
* Destination: 設置要連結的下個 artboard 
* Easing: 選擇 transition 過程要使用的變換函數 (同 CSS)

設定參數可參考下圖。
![auto-animate 設定參數](https://helpx.adobe.com/content/dam/help/en/xd/help/create-prototypes-using-auto-animate/jcr_content/main-pars/procedure_1208997114/proc_par/step_2/step_par/image/Setting-up-Drag.png "auto-animate 設定參數")

將將！是不是很 easy ~

***
## 線上 `auto-animate` 作品分享

免費的 XD 作品我通常都是來找[XDGuro](https://www.xdguru.com/3)，大家可以自行來挖寶，下面推薦一些我看到不錯的 `auto-animate` 作品。

### [Auto Animate – Free XD UI kit](https://www.xdguru.com/auto-animate-free-ui-kit-xd/)

![Auto Animate – Free XD UI kit](https://www.xdguru.com/wp-content/uploads/2018/11/Auto-Animate-Free-UI-kit-1014x487.jpg "Auto Animate – Free XD UI kit")

這是官方寫的 demo ，裡面列出了各種常用的動畫效果，例如：Loading Bar, Number Counter, Day/Night Switch, Drag Carrousel, Pull to Refresh, Swipe Away, Parallax... 你想得到的都做得出來。真的是太神奇了～有用 XD 的設計師必載的參考文件！！

### [Mobile XD scrolling interaction](https://www.xdguru.com/mobile-xd-scrolling-interaction/)

![Mobile XD scrolling interaction](https://www.xdguru.com/wp-content/uploads/2018/11/Mobile-XD-scrolling-interaction-1014x487.jpg "Mobile XD scrolling interaction")

這個作品也是我一看到就立馬收藏的好物！他模擬了最上方 User 資訊如何縮放漸變的過程，互動感覺非常流暢～喜歡！！

### [Ice Cream App animation](https://www.xdguru.com/ice-cream-app-animation-xd/)

![Ice Cream App animation](https://www.xdguru.com/wp-content/uploads/2018/10/Ice-Cream-App-animation-1014x487.jpg "Ice Cream App animation")

這個作品也用到了經典的點擊和拖拉效果，也值得收藏!
比較可惜的是左右滑動換冰淇淋的部分不知道為什麼有些卡卡的，還要再多研究一下XD

看完了這些讓我更加愛上 `XD`，最近發現他也開放 plugin 功能，但目前還沒看到什麼厲害的 plugin，另外版本控制這部分也是我期待的一點，希望他能盡快有這些功能～哈哈 （使用著 Sketch 卻望著 XD 的設計師心聲）


## 參考資料

* [Create prototypes using auto-animate](https://helpx.adobe.com/xd/help/create-prototypes-using-auto-animate.html)
* [Supported properties for auto-animate in XD artboard transitions](https://helpx.adobe.com/xd/kb/supported-auto-animate-features-in-xd.html)
* [Auto Animate – Free XD UI kit](https://www.xdguru.com/auto-animate-free-ui-kit-xd/)
* [Mobile XD scrolling interaction](https://www.xdguru.com/mobile-xd-scrolling-interaction/)
* [Ice Cream App animation](https://www.xdguru.com/ice-cream-app-animation-xd/)