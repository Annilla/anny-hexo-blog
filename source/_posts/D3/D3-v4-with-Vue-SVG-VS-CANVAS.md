---
title: D3 v4 with Vue - SVG VS CANVAS
categories:
  - D3
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/d3-vue-banner-blog.png
coverMeta: out
tags: [D3, Vue, SVG, CANVAS]
date: 2018/06/17
updated: 2018/06/17
---

本篇主要是針對 `SVG` 和 `CANVAS` 兩種繪圖方式作比較，並整理各自的優勢。

<!--more-->

***
## SVG & CANVAS 繪製原理

### SVG

> 用 D3 把算好的陣列，呈現在 SVG 的 DOM 上，讓 Vue 來做 rendor 的動作，最後使用 CSS transition 做動畫。

![SVG Rendor DOM](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/lineChartSVG.gif "SVG")

### CANVAS

>  Canvas 則是用 "命令" 的方式作圖，JS 就如同一隻虛擬的筆，下指令一筆一畫把圖畫出來。所以，畫出來的東西沒有實體 DOM。動畫也是靠 JS 命令，每段時間清除畫布，不斷地做重新繪製。

![JS Draw CANVAS](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/lineChartCANVAS.gif "CANVAS")

***
## CAN I USE?

### SVG

![CAN I USE SVG](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/Can%20I%20use%20SVG.jpg "SVG")

### CANVAS

![CAN I USE CANVAS](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/Can%20I%20use%20CANVAS.jpg "CANVAS")

***
## 程式碼長度

### SVG

![SVG 程式碼長度](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/SVG%20code%20length.jpg "SVG")

> SVG 399 行 (Whoa! Excellent ~)

### CANVAS

![CANVAS 程式碼長度](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/CANVAS%20code%20length.jpg "CANVAS")

> CANVAS 603 行 (Oh-no!! So Terrible ~)

***
## 執行效能

### SVG
![SVG 執行效能](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/SVG%20Perform.jpg "SVG")

> SVG 364 ms

### CANVAS

![CANVAS 執行效能](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/CANVAS%20Perform.jpg "CANVAS")

> CANVAS 177 ms

***
## 整體分析

![整體分析](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/canvasVSsvgTABLE.jpg "SVG VS CANVAS")

> 整體來說，像工業 4.0 這種大數據的資料使用 CANVAS 來繪製會是最恰當的（速度才不會卡卡）。相反的，如果是簡單的數據圖，使用 SVG 會比較容易開發和維護。

本篇就分析到此，下一篇會繼續解說 CANVAS 如何繪製其他種類（ex: 長條圖、圓餅圖...）的數據圖。
