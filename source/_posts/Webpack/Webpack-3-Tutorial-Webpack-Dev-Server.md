---
title: Webpack 3 Tutorial - Webpack Dev Server
categories:
  - Webpack
thumbnailImage: https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667
thumbnailImagePosition: left
coverImage: https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692838webpack-dependency-tree.png
coverMeta: out
tags: [Webpack]
date: 2017/09/02
updated: 2017/09/02
---

此篇介紹如何加入並使用 `webpack-dev-server`，並展示 `Hot Reload` 功能。
<!--more-->

## 安裝 `webpack-dev-server`

```npm
npm i -D webpack-dev-server
```

## 設定 `webpack.config.js`

```js
module.exports = {
  ......
  devServer: {
    contentBase: path.join(__dirname, "dist"), // 從哪裡提供內容
    port: 9000 // http://localhost:9000
  },
  ......
};
```

## 設定 `package.json`

```js
{
  ......
  "scripts": {
    "dev": "webpack-dev-server --open",
    ......
  },
  ......
}
```

* --open: 自動開啟預設瀏覽器

執行 `npm` 指令
```npm
npm run dev
```

就會自動開啟瀏覽器看到預覽的畫面囉！

![執行 npm run dev](https://lh3.googleusercontent.com/HnOhEhOGSinuEBswiyrJIX8iZ1Czq0EWpKZTRk-BE3mIM50Jri0t-zxbikMgvR4QBDbdM2fNjOeDhhz_4r4VPKxg2XiWMvgI3SBXgmd-d3N_d614PmJT0sKQ5ceBzkbzIlDNgI7GnWwqyTu-H6ZS_4X1Uuz-waQu8e5P2RC29snSMCqLNX5u8GGBJ2JVfS7kTMTfdkAfDnqa09uGuBocmq3Map-Fw8BdArobD_UBU_2cXFb3jMUzPWh0Ze_WUe3PZTcP_8srjAbxV3qu1S_O6GWH5BXT3-tOD9khFUhfcEUo5POBzep225XQr7_kfPeXGDC0dKftE821ZMkerSh994xOMi8pFkkX9BZBnO1zLZQOyJcVjIavFFSGbIBlFO-PQkYT4dA5pOuj9_PVAmmO3UXsbZEcozoqiNuI95lUdAsJ6zw_uJg7khL8iUUkXOo61jHqsOw7l9McIG5O5Vrwq-945YYTYlwSfGmdSzB7ruOMWC9_geJveziVfxV167JqBiONuAAFPgTF9D-1BF3_efshXRPOs35A9HG4GcllYarb-uRbCBF1GMNlQ8I-xPala9qsomjEqcbk5iLAiQ9ZAVYx57B32XqooBBUUX16EucFLvatq2XoZn-7hxep2ucS6DOsjJBMSa5Ys3wq_ioGy5B0pWxPL9Jt=w1024-h681-no "dist/index.html")

疑？內容的文字怎麼好像被切掉了。我們趕緊來試試看修改 `css` 的部分，順便看看  `Hot Reload` 的威力吧～

> 關於實時加載（Live Reload）和熱加載（Hot Reload）的區別在於:實時加載應用更新時需要刷新當前頁面，可以看到明顯的全局刷新效果;而熱加載基本上看不出刷新的效果，類似於局部刷新。

## 測試 `Hot Reload`

修改 `src/app.scss`，把字體變形的樣式註解掉

```css
body {
    background-color: yellowgreen;
    h1 {
        color: green;
        // transform: scale(1.5);
    }
}
```

結果 `webpack-dev-server` 就幫我們即時打包並刷新瀏覽器頁面，所以我們就可以專心的寫code，畫面就會即時的自動更新囉，是不是超方便的啊？

![Hot Reload](https://lh3.googleusercontent.com/dd1uIE9abHa17DxC19VyS2ejCk-ZLVe5y3PCnUu2HubhUCPvkwyjcUBPm70yP-eqtpsS6n7vJyeH4MjVviE4mCXJ6lwUVDeUUJ6w4pTKBQEWwtLEqa8Seojv2FPPHs70DJxZsZF9_8g2sURtQdUxFBG7H1zy6yd-fLbPB4LUi6Gw2Un9HZ0yrLx6s-8wgp8539AOi8gtlNJDZaoEpRkeEMbmTX4LWe67rKKCVGHFplKxl_u_zYWIVQU94yS1nwgSGgcNK5ZX2sVFUZ2bXc04D2GcC3JREt9WlmvdjGe4Fgs7-ohZgDyi2MJTw16HEhvEa3Yl-n0osdmvF_2cRv8oDbOPqwNL9TFgEdkmv3o9omQhmMg7rBT4_LkRC9vm0i8L-Cisr9eu7Js69IQUUqCkiMz1ZQWw_YIEVk20NbaIKZQRJZAAOnq1_h0N7vR5vnOMgaTWJ5KaucE1sieklCmkci0lLjIutitLXhtGNWYm0R0BKPlgiu8dAPlbfnNB95ReX4QI7bsMHm6tuPSVLkPpWddqMcChszAV6x_9KSieqz8CGlaOhuoAb2yRgR8ZW3oP9PfNT4rPBSx3eiuNalPFBX4xyBNGvMqfUJjioJRTc7F9pGsI-qBeJocby_CFAjY-OnKze75-NRfprp-iZL7dbE3X6o-FelJX=w1024-h681-no "dist/index.html")

今天的範例程式檔[github](https://github.com/Annilla/webpack_practice/tree/v1.3.0)，感謝收看。

## 參考資料

* [Use Webpack Dev Server](https://webpack.js.org/guides/development/#using-webpack-dev-server)

* [Webpack Dev Server Configuration](https://webpack.js.org/configuration/dev-server/)

* [React Native 热加载（Hot Reload）原理简介](http://www.jianshu.com/p/1fa6e9c0799f)