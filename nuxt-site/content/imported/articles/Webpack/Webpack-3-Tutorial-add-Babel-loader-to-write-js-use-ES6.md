---
title: Webpack 3 Tutorial - add Babel loader to write js use ES6
categories:
  - Webpack
thumbnailImage: https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667
thumbnailImagePosition: left
coverImage: https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692838webpack-dependency-tree.png
coverMeta: out
tags: [Webpack]
date: 2017/10/01
updated: 2017/10/01
---

此篇介紹如何加入並使用 `babel-loader`，並使用 `ES6` 語法測試撰寫 `js`。
<!--more-->

## 安裝 `babel-loader`

```npm
npm i -D babel-loader babel-core babel-preset-env
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
        test: /\.js$/,
        exclude: /(node_modules)/, // 打包時排除 node_modules 資料夾
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'] // 使用 babel-preset-env
          }
        }
      }
    ]
  },
  ......
}
```

> 注意：此範例把 `Babel` 設定直接寫在 `webpack.config.js`，若 `options` 設定較複雜的話，可另外寫在 `.babelrc` 檔案中，參考[Babel官網](https://babeljs.io/docs/setup/#installation)。

## 測試 `ES6` 語法

新增檔案 `./src/js/es6.js`，撰寫程式如下：
  
```js
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}
```

將剛剛寫的程式 `import` 到 `app.js`。

```js
......

import Point from './js/es6'

// Test for ES6
// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(`Test ES6 Distance: ${Point.distance(p1, p2)}`);
```

執行 `npm run dev`，就可以看到 `console` 出現計算後的兩點長度囉。

![執行 npm run dev 後畫面](https://lh3.googleusercontent.com/5S_HyO4HXOk9lkTzktk7Nbv93MPlzlh-NwBtwVLHeRStleqxkbU32GXOlJMb6S-jyRLu22Sficg3jtn2PhmUbA_1BxVKqMhLWXHs8mZDRS-dxA9haBSgCzGi4I1xAODh8qeWbPpCgJCSXIEki7h18ADIx_cotpCTD6vqUt8q8xPQoKqCYqufERPzQXwZVYO-GXwUmb7edUGFUi-iCUi9dwqdwPyOpQMmy42bVioArD7DV536i66AOfgYFo1LWQFh3EOVYa3eufssJJaZ_C-e31Xsv2vOrxYiZXCngeL9ZiFm6TOYbyDBIWn6DsFNEmQFHILVoiSCYnURTbZEAAL_5OyVG5dSsc7FpV26p_F9yUPofNay_JbZzDRMuQ870u2c7eBwy5Im9nRLC4ItKnEssvS2ylDWt5NPA3NZV5EFsx9LTR4DFGdQbLj1GIh5fmLdWQXv0AsU-AB2tuaB1mgxzRmkVWUDiPff2OXl2CXHsF2UeJTFtrxKPX9fHblEiO30NXZYjDhcsw_v1JGx9TtGF4QmPCkC3H5aeXyUvpUBnAVXpMmXhrH9FkXZIhaIXl7mdaiEEQR_7nwkhnVzZdSVL0EJq7TfUlQHz5HeRTjEjYfaU0mf7CNgt_KM3o0ReospKxGdl2Ml1hPfTv56QFuyNAl1NKfZiRvw=w1024-h589-no "dist/index.html")

更多 `babel-preset-env` 的配置選項可參考[官網](http://babeljs.io/docs/plugins/preset-env/#top)，有空也可以來試試 ES7 的 `async`, `await` 喔，我們下次見！

範例 [Github](https://github.com/Annilla/webpack_practice/tree/v1.4.0)

## 參考資料

* [Babel-loader](https://webpack.js.org/loaders/babel-loader/)
* [Babel](https://babeljs.io/)
* [ES6 Classes](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)
* [babel-preset-env](http://babeljs.io/docs/plugins/preset-env/#top)
