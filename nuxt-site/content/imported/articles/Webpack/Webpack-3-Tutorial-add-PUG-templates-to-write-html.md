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

![執行 npm run dev 後畫面](https://lh3.googleusercontent.com/ILdQlP6Ekw_RZLu3Hlh-vBHo3eAQ7sOgrkzx3T8TkIUfXKZjIlIefXg3RJ8y7wjKMOXWJibvVcW6YHlbrH_Ghh9Qk-zQUW-UGFt4YknvAAiCdENz8LR4TmFj6mvPUHl61brc84jARXc8gx0X24_qflJCFDnkhCM0Bkz1YuWzfB4CB3gVYPSve92ODhPklozp6-ZMvtaZTYg34GV50TG77K_aytRjhvaW-qwV3Dmkylxh5inXr85q9-KYhniQxUI9CjY_nSX6AQayCp6bBb0lUK79a5jhiT_J4Tzj-oV9vRzizdFqsasgtI9uZmdZTCViPlnpT_tXbfQpcYOtHx5ZDn--tQLJBIMNCcQHxJdsp0QKx8zmztaNMEbotx8QMXvT6EIiQFyYeBdk4EovN-PRvlGF-LzZyQflr_WrPYtYrSbUsTEF6VryD-pdKQ9nMQ-wPDBa0iAN50uSUZM_J9xc3Jj1ohJ7mzjPEozlxDBtD3v3e1mIobjXG_zAIYE58gs-0A2-44X06UZc7jL1A84-J2HsS7IOPGvJ7tvK2EVy8C2xpYs3x7SSYQpuNwMrM7-SbsxMQVDyulq3rhdc1XuuQVEZ_atkkHIKh2Zm_7i_CS30axkjZSxbEYckQY6O4oLHtSHOnd5XWRHgh38lO4xLVOtZzgurUcfL=w1024-h612-no "dist/index.pug")

今天的範例 [Github](https://github.com/Annilla/webpack_practice/tree/v1.5.0) 在此，下次見～

## 參考資料

* [pug-loader](https://github.com/pugjs/pug-loader)
* [Pug](https://github.com/pugjs/pug)