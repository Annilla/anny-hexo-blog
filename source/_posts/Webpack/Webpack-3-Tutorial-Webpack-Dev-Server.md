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

![執行 npm run dev](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-09-02_0927.png "dist/index.html")

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

![Hot Reload](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-09-02_0928.png "dist/index.html")

今天的範例程式檔[github](https://github.com/Annilla/webpack_practice/tree/v1.3.0)，感謝收看。

## 參考資料

* [Use Webpack Dev Server](https://webpack.js.org/guides/development/#using-webpack-dev-server)

* [Webpack Dev Server Configuration](https://webpack.js.org/configuration/dev-server/)

* [React Native 热加载（Hot Reload）原理简介](http://www.jianshu.com/p/1fa6e9c0799f)