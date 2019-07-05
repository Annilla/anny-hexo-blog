---
title: Webpack 3 Tutorial - HTML Webpack Plugin
categories:
  - Webpack
thumbnailImage: https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667
thumbnailImagePosition: left
coverImage: https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692838webpack-dependency-tree.png
coverMeta: out
tags: [Webpack]
date: 2017/06/30
updated: 2017/06/30
---

此篇介紹使用 `HTML Webpack Plugin`，他可以自動生成 `html` 並將 `app.bundle.js` 自動加在 `html` 結尾處。
<!--more-->

## 安裝 `HTML Webpack Plugin`

```npm
npm i -D html-webpack-plugin
```

## 設定 `webpack.config.js`

```js
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin
var path = require('path');

module.exports = {
entry: './src/app.js',
output: {

  path: path.resolve(__dirname, 'dist'),
  // the target directory for all output files
  // must be an absolute path (use the Node.js path module)

  filename: 'app.bundle.js'
  // the filename template for entry chunks

},

plugins: [new HtmlWebpackPlugin()] // 使用 html-webpack-plugin

}
```

## 自動生成 `html`

執行

```npm
npm run dev
```

或

```npm
npm run prod
```

就可以看到 `dist` 內生成 `index.html` 囉～

![dist 內生成 index.html](https://lh3.googleusercontent.com/xNq0I-e-92Umpmt2g-040igJwmjMz2eJVLlR1Jd_XkQxLexKuwZvU_nEblxQqB0p7QYT0h2itGoxPKcceHmgBv5GKuq_nBkMq3l6NKkmT0VqEHOMW4GPQYaiT4zqpcLN087QDlaBPawib0kGZjeBLg27UKsunJXDnQy1eDki7ZnZF9v0di0HjzyDfk7u2WKJxjOqXiSr3VpQ_cdjzvdJKMq6P98zrElSPtLqPXbnHghl7knD7l3iAWF_F_m6By0cry24yO06sMowOQgB-4HsWXs0c8R5DP5jsuBh-iSBpsWRZzrlxOSUhzgfY1ZTXlrP9aU1pnh0suleU4RZBmJSp87i_1VXRmrGoNOsuDDB83HXshrWQ-sWoBdxYRouKh3FjmH0j3ybSAdkBWD5-OYp2d6zqT1f0uXzO2VwnalgNlCe3c_BQAqxSh58SWh2NoMsOIm2o2LMJY5-sNsdxgLW6yWBC04s7uveApgKJHxtY3skp_dkbc2xKCoWcDM4Qfy_s9dvTxMfIL6J7RwJrHePbnV4dxBFKhZzaNf44kQS6-v1piVWw1IrL143BZ_qp5HbhgFXgkkWuie5ufplKW9d-Q0SU6MQDGo_QYvX4DzPEoahbmVgl7rjISCm0OpSlkos6LYURLBUG0evIgmvYfXvFbBBk3NaMNsm=w1024-h698-no "dist/index.html")

## 撰寫 html templates

如果想要客製化自己的 `html` 模板要怎麼辦呢？
我個人是喜歡用 `pug` 來寫，
不過 `HTML Webpack Plugin` 有內建模板使用方式，
所以就先示範內建的使用方式囉～

1. 修改 `webpack.config.js`

```js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template', // 客製化的 html 標題
      template: './src/index.html' // 模板的位置
    })
  ]
  ...
}
```

2. 建立 `html` 模板

在 `src` 資料夾新增 `index.html`，
`<%= htmlWebpackPlugin.options.title %>` 到時候會被 `webpack.config.js` 內設定的標題取代掉喔。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

3. 自動產生客製化 `html`

執行

```npm
npm run dev
```

或

```npm
npm run prod
```

就可以看到 `dist` 內新生成的 `index.html` 囉～

![dist 內新客製化 index.html](https://lh3.googleusercontent.com/dN0CFoLrFDBJPh0Qo8ODyyrMX1X8jxp13wcSshPdGKN1KWm9B43d1Qd0j89dH9lui0dYlbGb-iXdN4i5X8aF8ZqzQQ5gZ1YH5u8HZjnYh-4vndY0780cXO1iTQ-fa9550Lx3HhZXevd6Bl_ALGJtG3yRG_sRaGN88hYeQp_EIDGvdfX9v5LAtjl-D5FFclMvtkiJUeN48j3wtHuxbjnGIHvfOmQU_jeuHu_pUG6XzhvXuPZfaYqxCs0d3Xm6MQnS2SiraFGIyjAwVSUdWQhSlMQ3UcmukP4jC0ejasLPyy15AudhXv6TPykskMl_UDUsFKJs1sy2PRKrXvjbNWVRy4tt0qHkONgnBpghrQk8K6ydBhmidFUKUD3sGYchmtf01ae97I_x4046FXCHHnZltkl1whLohF1XXoPI2jkfKeaD0PgHDylMrkIdnmWBh_mWwX5lc3NE9aNmDDy3WNqOvcCyfId1QOH4A_gYMdDmG0LaubRcvTVDll5pjpBnULXGzYb7zcZNLzV1TIQq4-ccuk3MMtXNLC3TfvShup2SlHSmuHTrcnQlMzEuD3bo-x1VPwPphD_fm_TrSQzImnyRUIX3u8SXs3zEdAeAJtty8XI1KC-QKlh9p3LopZj_9bByi77FnGtXRTZaU1TSomjhBG_g1e1DOtxd=w1024-h698-no "dist/index.html")

今天的實作檔案在[github](https://github.com/Annilla/webpack_practice/tree/v1.1.0) 。等前面幾篇基礎的介紹完，之後會介紹 `pug` 怎麼跟 `HTML Webpack Plugin` 做結合，敬請期待。

## 參考資料

* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
* [Webpack HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
