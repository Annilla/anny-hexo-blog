---
title: 'Webpack 3 Tutorial - Style, CSS, Sass and Postcss loaders'
categories:
  - Webpack
thumbnailImage: https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667
thumbnailImagePosition: left
coverImage: https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692838webpack-dependency-tree.png
coverMeta: out
tags: [Webpack]
date: 2017/08/01
updated: 2017/08/01
---

此篇介紹如何將 `CSS` 、 `SASS` 引入 `Webpack` 專案中，並使用 `postcss` 的 `autoprefixer` 自動將 `CSS` 加入相對的瀏覽器前綴。
<!--more-->

## 安裝 `css-loader` `style-loader`

```npm
npm i -D css-loader
```

```npm
npm i -D style-loader
```

## 設定 `webpack.config.js`

```js
module.exports = {
  ......
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  ......
};
```

## 測試 `CSS`

1. 在 `src` 資料夾創建一隻 `app.css`

```css
body {
  background-color: yellowgreen;
}
```

2. 將 `app.css` 引入 `app.js` 中

在 `app.js` 加入

```js
require('./app.css');
```

3. 執行 `webpack` 打包

```npm
npm run prod
```

執行完打開 `dist` 資料夾 `index.html` 就可以看到我們更改的草綠色背景囉！

![網頁更改成草綠色背景囉](https://lh3.googleusercontent.com/Yud96AyoVHTNk3AoQLHcsrj3QGZe6u-IV-qlmk49isZQDtDdwi9R5SrU2Yp8nx839a45eZLrD5UxXIfoGtPAKJFJHf6yChSVv2NjV0CX5Jf-6Cob9_R4Ym28v9Y7Y96ihj1hWTC8MY0U7p03o_juLIhQEOWaOpYbVkfYLPSEAIqMrj6keOv2rml5PYdFjoq5vokc_xLkCis3o3Oz8RHdYqueX9N3KMVNGjJTbE9a0SwJg94H6Lzg803ARceJKTzuUiGKmH-0_ibiflMAxKKuOBOhGraH3VtiMNv9RYtzaudsdTrAfMVmpXtM1_HPiK8ZMoYCQlW_x2ewHuhWbE1tGNBeNlHbCcqPsLb8ZZRGEWdE9BHmnMakyKZax_EwSYUUYudPPRXd9BQTGtToM8elBoIMD07HuHZ1pr_UxKFlabSjmUXZIF-BcdpptH8CuU9C-lgD41pO1eF__8mVie_tVyMVP0lq0fpBtT0JxwMElHaUhXLDRUns-261ZANHPD4DU2jOMmRf8JV4hXdgGDITv9LvQps-WNqTEPXr6E9DIwr7kpD_yxsJ9eCcfCmM52QbkhClMU9Kds1Ps4t5QWQ-E49LMs8hNBLG_y6zTGHT01-ssMgsj7Aqvf9OTju8y7159z6S6Ld3x2X-BH2rjqItCsgU79hUIMG0=w1024-h616-no "dist/index.html")

到這裡我們完成引入 `CSS` 的動作，接下來要來試試引入 `SASS`。

## 安裝 `sass-loader`

```npm
npm i sass-loader node-sass webpack -D
```

## 修改 `webpack.config.js`

```js
module.exports = {
  ......
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  ......
};
```

## 測試 `SASS`

1. 在 `src` 資料夾將 `app.css` 修改成 `app.scss`

```css
body {
  background-color: yellowgreen;
  h1 {
    color: green;
  }
}
```

2. 在 `src` 資料夾修改 `index.html`

```html
<body>
  <h1> Test SASS Loader</h1>
</body>
```

3. 將 `app.scss` 引入 `app.js` 中

```js
require('./app.scss');
```

4. 執行 `webpack` 打包

```npm
npm run prod
```

執行完打開 `dist` 資料夾 `index.html` 就可以看到我們更改的標題顏色囉！

![網頁更改標題顏色](https://lh3.googleusercontent.com/esJm0PM-vvgr8BgLGh2mbvPKhQ2pFMMqhi74QE_2aUnd13kOesjp17hImNoFQ-JTjAHRg2oxKYsbHqKRKPeXl0g8qqfZzE5YHyKvH7hUb7TUvqN_6BSrH5tbuinT8OzcQoCAit6kwSjgjbgiEs7lxLi5ERDTt4G1X0UhtDANV5UjNhDupDYtgDxEa9SLn-wJIgHaVQ9gFJ0zpEPzxx050LgEmR2KU_fTcPV2stWSpBOcP33j_cUZ1RGVyXRpwOyjrviTsr5-zzfZbJBVBsgdyzL9S6tlzD-gPOtuebIGQJ1bzaMYgU11mTylzE9QkUF1Tisffxya1zb9OIv__DPesB33FIwWVrtq5ql1rr-7q7e2AUdTbBxFqQhlzzb1YmSht4lRUOV_g2p6LYzRp5bqNb37clADys_NOxhmar3PjutbShblwfoeGzkBt_qd46JXn_6XlfcbIHVGeyjZAhaTJVoeVt-5xkVMKuAu6qgnP7AAWh1eMSgCjoWwFqHtSB3iTnoZMHqD6zr3ZGqVR2GzWh3Rv0--2t8VbuMUaAAuPzjR98uy6DS9KZiKHOCknhtOUnU-cIKP9PVZh9m1q8Y89G97FvV_LTgdycx_h4GmL09yc2ntJSGLWD7n73jGt3SzTZaf8AVo0T-bKBHBztjCjANZoKw5tf9g=w1024-h616-no "dist/index.html")

`SASS` 引入完成！！大家有發現網頁上的 `css` 怎麼都是跑到 `head` 裡面啦？接下來要教怎麼輸出成一隻 `css` 用 `link` 的方式引入到頁面上。

## 安裝 `ExtractTextWebpackPlugin`

```npm
npm i -D extract-text-webpack-plugin
```

## 修改 `webpack.config.js`

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
......
module.exports = {
  ......
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    ......
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    })
  ]
};
```

* 執行 `webpack` 打包

```npm
npm run prod
```

執行完打開 `dist` 資料夾 `index.html` 就可以看到 `app.css` 在 `head` 裡面囉！

每次因為不同瀏覽器寫前綴語是不是超麻煩的啊？接下來要來引入 `postcss` 的 `autoprefixer` ，透過設定 browserlist 讓 Webpack 自動做完這些事情呦。

## 安裝 `postcss-loader`

```npm
npm i -D  postcss-loader
```

## 新增 `postcss.config.js`

```js
module.exports = {
  plugins: {
    'autoprefixer': {}
  }
}
```

## 在 `package.json` 設定 `browserslist`

```js
{
  ......
  "browserslist": [
    "Explorer 11",
    "> 1%",
    "last 2 versions",
    "not ie <= 10"
  ]
}
```

## 修改 `webpack.config.js`

```js
module.exports = {
  ......
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  }
  ......
};
```

## 測試 `postcss`

1. 修改 `app.scss` 檔案

```css
body {
    background-color: yellowgreen;
    h1 {
        color: green;
        transform: scale(1.5);
    }
}
```

2. 執行 `Webpack` 打包

```npm
npm run prod
```

打開 `dist/app.css` 就可以看到下面自動加入前綴語的 `css` 囉～

```css
body{background-color:#9acd32}body h1{color:green;-webkit-transform:scale(1.5);-ms-transform:scale(1.5);transform:scale(1.5)}
```

今天的實作檔案整理在此[github](https://github.com/Annilla/webpack_practice/tree/v1.2.0)，謝謝收看。

## 參考資料

* [Webpack css-loader](https://webpack.js.org/loaders/css-loader/#components/sidebar/sidebar.jsx)
* [Webpack style-loader](https://webpack.js.org/loaders/style-loader/#components/sidebar/sidebar.jsx)
* [Webpack sass-loader](https://webpack.js.org/loaders/sass-loader/#components/sidebar/sidebar.jsx)
* [Webpack ExtractTextWebpackPlugin](https://webpack.js.org/plugins/extract-text-webpack-plugin/#components/sidebar/sidebar.jsx)
* [Webpack postcss-loader](https://webpack.js.org/loaders/postcss-loader/#components/sidebar/sidebar.jsx)
* [Browserslist](https://github.com/ai/browserslist)
