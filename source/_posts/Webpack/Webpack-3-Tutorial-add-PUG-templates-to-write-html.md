---
title: Webpack 3 Tutorial - add PUG templates to write html
categories:
  - Webpack
thumbnailImage: https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667
thumbnailImagePosition: left
coverImage: https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692838webpack-dependency-tree.png
coverMeta: out
tags: [Webpack]
date: 2017/11/01
updated: 2017/11/01
---

此篇介紹如何加入並使用 `pug-loader`，並使用 `PUG` 語法測試撰寫 `html`。
<!--more-->

## 安裝 `pug-loader`

```npm
npm i -D pug pug-loader
```

## 設定 `webpack.config.js`

```js
......

module.exports = {
  ......
  module: {
    rules: [
      ......
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  ......
}
```

## 撰寫 `index.pug`

接著我們嘗試把 `index.html` 改檔名為 `index.pug`，並把內容換成以下 `Pug` 範例。

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

接著記得把 `webpack.config.js` plugin 中的 `HtmlWebpackPlugin` 設定換成現在新的 `Pug` 檔案。

```js
module.exports = {
  ......
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    ......
  ]
}
```

執行 `npm run dev`，就可以看到 `Pug` 執行出來的畫面囉。

![執行 npm run dev 後畫面](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-10-28_1131.png "dist/index.pug")

今天的範例 [Github](https://github.com/Annilla/webpack_practice/tree/v1.5.0) 在此，下次見～

## 參考資料

* [pug-loader](https://github.com/pugjs/pug-loader)
* [Pug](https://github.com/pugjs/pug)