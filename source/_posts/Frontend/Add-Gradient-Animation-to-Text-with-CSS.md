---
title: Add Gradient Animation to Text with CSS
categories:
  - Frontend
thumbnailImage: https://images.seeklogo.com/logo-png/29/2/css-3-logo-png_seeklogo-297888.png
thumbnailImagePosition: left
coverImage: https://1000logos.net/wp-content/uploads/2020/09/CSS-Logo-2011.png
coverMeta: out
tags: [CSS]
date: 2025/05/12
updated: 2025/05/12
---

最近工作上需要設計將文字當作圖樣的 Logo, 起因為了減少後續維護成本，不打算針對每個部門製作專屬圖片。取而代之，會在介面中直接使用部門名稱，並搭配漸層動畫，讓每個部門既能有自己的識別感，又不需要額外製圖，省時省力又有彈性。 Demo 放在 [Codepen](https://codepen.io/annilla/pen/jEOjRQE)。

<!--more-->

# CSS

話不多說, 直接上 Code. HTML 直接灌一個 gradient-text class, 其他想要的地方都能貼上套用相同 class 超方便!

```html
<header>
  <h1 class="gradient-text">WORKSPACE</h1>
</header>
```

```css
/* 影格變數 gradientAnimate 將漸層顏色背景位置從左上到右下位移, 製造動畫變色視覺感 */
@keyframes gradientAnimate {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.gradient-text {
  /* Fallback: Set a background color. */
  background-color: #FA3323;

  /* Create the gradient. */
  background-image: linear-gradient(90deg,
    #FA3323 20%,
    #6100FF 40%,
    #FA3323 60%,
    #6100FF 80%);

  /* Set the background size and repeat properties. */
  background-size: 200% auto;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  /* 將動畫設定 3 秒無限重複, 讓文字有炫彩動畫效果 */
  animation: gradientAnimate 3s ease-in-out infinite alternate;
}


/* Style the rest of the page. */
...

```

# Reference

* [How to add a gradient overlay to text with CSS](https://fossheim.io/writing/posts/css-text-gradient/)
* [My Codepen](https://codepen.io/annilla/pen/jEOjRQE)