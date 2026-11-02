---
title: Use Cypress with Cucumber for UI Testing
categories:
  - Testing
thumbnailImage: https://avatars2.githubusercontent.com/u/8908513?s=400&v=4
thumbnailImagePosition: left
coverImage: https://i.udemycdn.com/course/750x422/2470214_97a0_4.jpg
coverMeta: out
tags: [Cypress, Testing, Cucumber, JS]
date: 2020/01/04
updated: 2020/01/04
---

隨著時間越長，專案總會越寫越多功能，可是如果每次重構後都要人工測試，會花費很多不必要的時間。所以為了往後能安心的重構程式，我想要一個可以方便 debug 且使用簡易的 UI Testing Framework。參考了許多架構後，決定要使用 cypress + cucumber 來寫測試。

<!--more-->

[Cypress](https://www.cypress.io/) 的好處是對於開發者非常友善，開發時在 chrome 瀏覽器模擬，且有變更都會自動觸發 reload，大大減少每次重跑的繁瑣動作，且每個步驟的紀錄都會視覺化的呈現在左方，Debug 時還可隨時搭配 chrome dev tool，真的是開發者的救星呀～如果要搭配 CI 的話，他也有 headless 模式啟用 electron 來跑模擬，出來的 log 也是非常漂亮還會順便錄影！

[Cucumber](https://cucumber.io/) 的好處是他可以寫可讀性高的測試情境，讀寫上很直覺，搭配不同 tag 的功能，可以把測試情境分類的很清楚。

接著我們就來介紹怎麼結合 cypress 和 cucumber 吧～

# 安裝 cypress + cucumber

專案內安裝 cypress

```
npm install cypress --save-dev
```

在 `package.json` 加上啟動 cpress 指令並執行 `npm run cypress:open`。

```json
{
  "scripts": {
    "cypress:open": "cypress open"
  }
}
```

若啟動成功會自動建立測試情境，確定安裝完成後，可刪掉範例。

![npm run cypress:open](https://lh3.googleusercontent.com/OSU2uLttYHh0s8kaXnZocadud55Ocg3pyVv3_qE4xK7X6DoKsLxdu5_xbRUpiqGEAQlgFuqg2JoCYQBnUQ6GjDpyBz7th_1HzIeu9jR_GcWq5h1_jYaJuiqN7NESfbV8md-WAfZA1juon6IzsD173Y3-yoF2WLfnVrX_A8TPLrWajG67KGg4rBCDDzdE2hQmEb4ZH8JSKSgSOPwUbDsAyfqjzWDeV960edneVbOF4QubqRro6e4E19g5W3AxN1csRix71ltckQjgzu_gGE4lqxLN0khOgRCDwORgTmlhDipHi9Gk10l2hPuD-1w673agOUFqJdZf8zCdK3EIHxOsj2hJv7Za6iz3r7cjp3FqYTlKjBpoz3w_fWASXHCokwzq7h5hyzYS4aj58CWN4MSKd08zPpP-xKdK-f5fdkvh0vs0J6T2IrQYCaA9RSsaAMp6DHD9FwFe0wN1T2oj8rLuQ5fUMbyq0G8IzFUi8Hbyw06yD_lWMaFdGj-eoXug0tfAgAygE3L06DZalwhltkyIajN4h2iFu922dAEJQyEH2UvF_N8mjXShSrZdSmJ-WpJANLnzQqgjaO51x2Ub0zrd1nLuzuG8eSGyRHtEN17YGmhOEvcnX7O7pDEbrM4VeAKuvJ80-HUzF9Pe3lPtoI6tK1iN5wVQPzKTHvMyym576jk1sKUdv2zwo6nXUFVD_z_7WoVNP8E2OtZREC-aDlKy4LSbJP0P206fRR4VlBcmq8DZcdO1AA=w1720-h1196-no "npm run cypress:open")

關掉 cypress 視窗，接下來我們安裝 cucumber plugin

```
npm install --save-dev cypress-cucumber-preprocessor
```

在 `cypress/plugins/index.js` 設置 plugin

```js
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```

在 `cypress.json` 設置測試檔案位置

```json
{
  "testFiles": "**/*.feature"
}
```

在 `package.json` 設置 cucumber 的情境預設非 global，這樣可以區分是否要用 global 的情境。

```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
},
```

把原本 cypress/integration, cypress/fixtures 資料夾的檔案都刪除，就可以開始寫一個測試囉～

# 寫一個測試

新增 `cypress/integration/Google.feature`

```feature
# language: zh-TW
功能: Google
    * 前往 Google 首頁
    
    @Google
    場景: 前往 Google 首頁
        假設 前往 Google 網址
        那麼 看到標題包含 "Google"
```

@Google 這個 tag 是讓你能將測試做分類，這樣之後要跑測試的時候，可以指定執行特定類別。

新增 `cypress/integration/Google/google.js`

```js
import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'

Given('前往 Google 網址', () => {
  cy.visit(url)
})
```

若是放在自訂的資料夾內，則情境不會被共用，下面示範將看到標題這個結果放在 global 的情況。

新增 `cypress/integration/common/i_see_string_in_the_title.js`

```js
import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`看到標題包含 {string}`, (title) => {
  cy.title().should('include', title)
})
```

這樣我們就放好 global 的情境囉～其他情境若是要共用的話就可以不用再寫一次。

# 測試～跑起來吧！

因為剛剛有使用 tag 的功能，所以我們可以把 npm script 改成指定執行特定標籤，`package.json` 修改如下。

```json
"scripts": {
  "cypress:open": "cypress open -e TAGS=@Google"
},
```

再次執行 `npm run cypress:open`。跳出 cypress 視窗後，點選 Google.feature 開始測試，成功就會出現下面的畫面囉～

![npm run cypress:open](https://lh3.googleusercontent.com/3NKaZFg0tnUSbAdvXVq8YQ2y2nVZeUmNQ1oiCujS9rltLp-920w2uP4-bY38Wqg3aDooYB4BBR9wB_ndxabv-8y0r0Q_PTeKF38zHSa4BM5rNksa9X65HNTG_DtguFuB6W-wzSlno2A8l0c1aZFl-bgpmXoUCgKQmS1mAH-Ep5CpOZ7VMeebFambMqaoSBsYpWlhEzneck1Luk4oo-n1ilw1U4T8sAbZ61D00-gcPdNPD4pJNIoJjwsoQys38NbQGlGKFjoCOP4qZEn84VDuY_sRBQaUbV1LUKBzoJWs0QzgO2cn4WAVfQ9b6SiM50VivyHre9awThFdy8FPCteyIUW185Ssf0k8HtKPghH9blF4fL5iigVO97F_VYby50hlX21vAQUNCk8jtIAPp9NHqVKuWditNgKKlsUpVwRS-UVsBBvE9ChpIh3UrDlyb0otGggx2CgBzu3CASL5vxSElUtGuKdUddjD5HUojNUD2Ua_pZBHr1uEOumD6L5ypSlkx5GbhWjxTB9ROqTtsr6w7fOLH0KcjG0cfSnap9igjoJ-eVI0oKFgkJv1gqXz8hyQEgKW0_xWwBay0p1hVjG2zEVHrHByzgdIzWZ0fdWe1NVdcavOvHhfO7bnYv-EXrVFcfH_EZRqRV02oK3Q3Zl-wFh6v2oJ7HIwdiwh8nOBep4g3QI0jKrd30f3hmFOgQZlUieKrTjZQ9xh8ZM47RZbFs1elT9VLPAp0unTXixIl1w7VyYunA=w2206-h1378-no "npm run cypress:open")

今天的練習放在 [Github](https://github.com/Annilla/cycpress-cucumber-practice/tree/v1.0)，下回見～

# Reference

* [Cypress](https://www.cypress.io/)
* [Cucumber](https://cucumber.io/)
* [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)