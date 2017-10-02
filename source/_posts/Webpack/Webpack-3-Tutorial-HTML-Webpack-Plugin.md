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

![dist 內生成 index.html](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-06-30_1615.png "dist/index.html")

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

![dist 內新客製化 index.html](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-06-30_1655.png "dist/index.html")

今天的實作檔案在[github](https://github.com/Annilla/webpack_practice/tree/v1.1.0) 。等前面幾篇基礎的介紹完，之後會介紹 `pug` 怎麼跟 `HTML Webpack Plugin` 做結合，敬請期待。

## 參考資料

* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
* [Webpack HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
