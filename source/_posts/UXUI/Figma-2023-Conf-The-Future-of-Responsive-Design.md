---
title: Figma 2023 Conf - The Future of Responsive Design
categories:
  - UXUI
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://miro.medium.com/max/1400/1*BfTmRqrzxB90_e9i1-cj2g.png
coverMeta: out
tags: [UX, UI]
date: 2023/08/01
updated: 2023/08/01
---

[Figma Conf 2023](https://config.figma.com/) 內容真的很棒很豐富～除了設計以外, 還有前端工程, 專案管理等多面向的內容。這次選了 Google 前端工程師分享未來 RWD 的新功能，聽了覺得很興奮～想來分享一下ＸＤ

<!--more-->

# dvh

你曾經有感受手機瀏覽器因滑動產生外框縮放, 導致 web 畫面出現奇怪的空白嗎? 新的單位 dvh 是誕生來解決此問題的. 當手機一開始進到頁面還沒往下滑的時候, 畫面大小是 svh (smallest viewport height). 當使用者往下滑頁面後, 手機瀏覽器會自動將上下 bar 縮起來, 這時候畫面大小是 lvh (largest viewport height). 但我們如果用了 dvh (dynamic viewport height), 就不怕瀏覽器外框縮放導致計算誤差, 100dvh 永遠都是使用者可視範圍,真棒!

![dvh](https://media.discordapp.net/attachments/1135775611948900472/1135776457277308948/2023-08-01_11-22-38.png?width=757&height=423)

# oklch

顏色有新的動態數學計算顏色函數 oklch, 讓顯示出來的顏色更鮮豔. 如下圖, 左方為一般漸層從粉紅色到藍色, 可以明顯看到中間顏色灰灰髒髒的. 右方使用一樣的漸層端點, 但中間顏色卻是明亮飽和的. 以前都是用人工的方式去加中間的色票來達到一樣的效果, 但現在可以使用新的 oklch 計算方式, 只需要輸入兩端點顏色, 中間就會計算出漂亮飽和的漸進顏色, 非常方便!

![oklch](https://media.discordapp.net/attachments/1135775611948900472/1135780003099987998/2023-08-01_11-43-44.png?width=751&height=423)

# container query

這個項目是令我最興奮的了~以前都是用 media query, 用整個螢幕寬度來決定 element 的顯示變化. 但其實這樣切得很死~不夠彈性. 新的 container query 來了!! 用 container query 可以讓子元素自己感知外框的大小變化, 自己決定要變成什麼樣子~這樣就可以只設計一個 element, 然後放到不同的地方, 像是放在 aside 就會自動縮小樣式, 放在 main 就可以放大顯示更多資訊, 同一個元素就能解決~不用分開做. 能做到原子元素重複利用, 真是令人興奮!!

![container query](https://media.discordapp.net/attachments/1135775611948900472/1135782806157525042/2023-08-01_11-54-35.png?width=765&height=423)

# text-wrap pretty

另一個有趣的事情是文字通常很長被分段都不盡理想, 這裡有一個新概念是在 text-wrap 放 pretty, 讓他自動斷行且看起來是平衡漂亮的. 這個看起來也很威~不過還在實驗階段~希望各大瀏覽器都能支持!!XD

![text-wrap pretty](https://media.discordapp.net/attachments/1135775611948900472/1135785515354959993/2023-08-01_12-04-55.png?width=754&height=423)

當然內容不只這幾樣啦~還有很多比較細節的小地方都很有趣~有興趣的人可以去看正片 [The future of responsive design](https://config.figma.com/video-on-demand/6329932796112)~下次見啦~

# Reference

* [The future of responsive design](https://config.figma.com/video-on-demand/6329932796112)
