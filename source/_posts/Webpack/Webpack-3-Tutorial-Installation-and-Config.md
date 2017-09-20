---
title: Webpack 3 Tutorial - Installation and Config
categories:
  - Webpack
thumbnail: https://cdn-images-1.medium.com/max/1920/1*gdoQ1_5OID90wf1eLTFvWw.png
tags: [Webpack]
date: 2017/06/14
updated: 2017/06/30
---

![](https://cdn-images-1.medium.com/max/1920/1*gdoQ1_5OID90wf1eLTFvWw.png)

作者：Anny Chang

# 什麼是 Webpack ?

`Webpack` 是針對所有前端程式的管理整合工具。工程師編寫程式模組（`html`, `css`, `js`, `sass`, `pug`, `babel`, ... etc.），使用 `webpack` 打包輸出靜態資產（assets）,配合`Babel`, `ES6`使用，可以寫出乾淨可復用的代碼，做到更好的前端程式管理。這一篇先示範基礎安裝和設定基本描述檔。
<!--more-->

## 安裝環境

1. 安裝 [Node.js](https://nodejs.org/en/)

2. 開一個專案資料夾，建置 `npm` 專案

```npm
npm init
```
設定 package.json

```js
{
  "name": "Your Project Name",
  "version": "1.0.0",
  "description": "Webpack project.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "Your Name",
  "license": "ISC",
}
```

3. 安裝開發端套件 Webpack
安裝全域(global)

```npm
npm -g i webpack
```
> 只有第一次使用`webpack`需要安裝全域，裝過一次之後就可以不用再安裝global

專案開發端安裝套件

```npm
npm i -D webpack
```

## 組織專案架構

在專案建立 src 和 dist 資料夾。

* src: 工程師寫的程式放這裡。
* dist: `webpack` 自動打包出來的檔案會放這裡。
* src/app.js: 建立一支 `js` 檔案，等會要來測試 `webpack` 自動打包的功能用。

app.js 內可以隨意寫 console 來測試

```js
console.log('Hello World!');
```

## 設定描述檔

1. 在專案下新增`webpack.config.js`檔案。

```js
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './dist/app.bundle.js'
  },
}
```

* entry: 開始執行打包的入口
* output: 輸出結果設定
  - filename: 輸出結果的名稱

2. 修改`package.json`檔案 `scripts`

```js
{
  ...
  "scripts": {
    "dev": "webpack -d --watch",
    "prod": "webpack -p"
  },
  ...
}
```

* -d: 開發模式輸出，不會 minify js
* --watch: 監聽程式碼修改，支援即時輸出
* -p: 產品模式輸出，會 minify js

## 執行 webpack 打包測試

1. 執行`package.json`內`script`設定的 dev

```npm
npm run dev
```

- 結果：會在 `dist` 資料夾內產`app.bundle.js`，沒有 minify

2. 執行`package.json`內`script`設定的 prod

```npm
npm run prod
```

- 結果：會在 `dist` 資料夾內產`app.bundle.js`，有 minify

基本 webpack 練習完成囉～實際操作影片可觀賞 Ihatetomatoes 大大的 YOUTUBE 教學[Webpack 2 Tutorial - Installation and Config](https://www.youtube.com/watch?v=JdGnYNtuEtE&index=1&list=PLkEZWD8wbltnRp6nRR8kv97RbpcUdNawY)，感謝觀看 :)

> 更新：2017/06/30 Webpack 版本更新到 3 囉 ！所以直接測試 3，發現無痛接軌沒問題，實作在 [github](https://github.com/Annilla/webpack_practice/tree/v1.0.0)，之後就直接都用 3 版實作囉。

## 參考資料

* [Webpack 2 入門教程](https://llp0574.github.io/2016/11/29/getting-started-with-webpack2/)
* [Webpack 2 Tutorial - Installation and Config](https://www.youtube.com/watch?v=JdGnYNtuEtE&index=1&list=PLkEZWD8wbltnRp6nRR8kv97RbpcUdNawY)
