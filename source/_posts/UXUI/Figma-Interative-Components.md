---
title: Figma Interative Components
categories:
  - UXUI
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://www.lohaslife.cc/wp-content/uploads/2020/10/figma.png
coverMeta: out
tags: [Figma, UX, UI]
date: 2021/11/02
updated: 2021/11/02
---

最近 10 月份 Figma 團隊出的 Interative Components Youtube 教學影片，讓我對這個新功能感到很興奮。簡單來說，就是 Checkbox, Radio, Switch... 等元件，可以製作獨立的動畫，讓 user 透過互動看到切換狀態的過程。話不多說，立刻就來試試看。

<!--more-->

# Checkbox & Switch

1. 先把要做動畫的元件一起選取起來，會發現右邊 Design 面板出現 `Variants` 的按鈕，點擊 `Combine as variants`
![Checkbox](https://lh3.googleusercontent.com/pw/AM-JKLUYkzoSOnLFpn6ATIlBoqS-_u3ym2Guf-jv4yG6ZIrCdgzR5DyviN79bdDsDvOjsnd3AQ9veceIzZGLUYgBI8VFxvC0w9voimHvR-8z1PMHYHe4xLaNBKbY0OvSOwlEl8kU9VPTZd13DWKgV722lu4zAg=w1920-h937-no?authuser=0)

2. 接著在 Prototype 面板設定動畫如下圖所示(Onclick/Change to/Instant)，即可完成
![Checkbox](https://lh3.googleusercontent.com/pw/AM-JKLVKR9z6Vn4KyeGFzBGwrYkimvKGMKcuexDz7QnNpiL54lqcS8XLpF65YmO2-f1rqo8M6WpueD7qXy95ZgBYG-RI5cIncMQtjuJ4qiq4qLZw3r3nQJZGCGIQSK7Awbbs_TDQByeotTiWiv5a_jcH-n0MnQ=w1920-h935-no?authuser=0)

Switch 的做法差不多，只是 Animation 選擇 Smart animate (Onclick/Change to/Smart animate)
![Switch](https://lh3.googleusercontent.com/pw/AM-JKLVGQdknSE70a2Zjfr6J091KiFjWDWxXXFDQbi5cntP6rzQ9u1gFTPxikC85qHJdaBJ4ce7lCJHBOASzPthPMKHluWtLWnE9V-zoa-xvuqk6V-SjGgNhBByczLxlegxLCzoD5d3YRpBDmi9barNT_CrLHw=w1920-h937-no?authuser=0)

完成後，就可以執行 prototype，對元件做點選的動作，可以看到互動的效果優~
<iframe src='https://capture.dropbox.com/oMIXKTN9A4opyRqs' frameborder='no' scrolling='no' marginwidth='0' marginheight='0' WIDTH='740' HEIGHT='416' allow='autoplay' allowfullscreen></iframe>

# Progress Bar & Progress Circle

另外，進度條或進度圈圈也可以做自動的動畫。

可以參考下圖做進度條。
![Progress Bar](https://lh3.googleusercontent.com/pw/AM-JKLX3LsnOhXLrfoPvbk2q2e5ZiTuvr6MBIEbdSwNaypcDUnv12FLOi-0ZM-e7UDBoTVazbUjAZonW3DPuC0EsTs0q9qlCN64jZwiteeCsYwEoJ_OeS2l_OIjxVvm4V7ANt_G1mgfv8P-jWncBAg2poIw7uQ=w1920-h934-no?authuser=0)
![Progress Bar](https://lh3.googleusercontent.com/pw/AM-JKLVRb9PCdHqbjiNhSVioW5m0_R2gkwjUaWh-PyXwj22KQuzyFCDKnZghyswKo6b5csrOWDzqP52p9ne_maWVYolKe7kvCTG5_64jQMBUEHGujdu87VzwuSoY5IwZArIchIz5WrEmP9uaYKhZ2PyhPZ7_1g=w1918-h937-no?authuser=0)

進度圈圈的部分比較複雜，我是參考 Figma Community 的人分享作法 [Progress Bar Animations](https://www.figma.com/community/file/826647128105027386)。

最後附上 progress 完成的樣子，動畫看起來很順暢呢~
<iframe src='https://capture.dropbox.com/58G1NI28rLLtZ3Vw' frameborder='no' scrolling='no' marginwidth='0' marginheight='0' WIDTH='740' HEIGHT='416' allow='autoplay' allowfullscreen></iframe>

# Reference

* [Figma tutorial: Interactive components](https://www.youtube.com/watch?v=ReNbXhaL3Xk)
* [Create interactive components with variants](https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants)
* [Progress Bar Animations](https://www.figma.com/community/file/826647128105027386)