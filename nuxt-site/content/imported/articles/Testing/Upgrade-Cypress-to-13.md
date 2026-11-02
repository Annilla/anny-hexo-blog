---
title: Upgrade Cypress to 13
categories:
  - Testing
thumbnailImage: https://avatars2.githubusercontent.com/u/8908513?s=400&v=4
thumbnailImagePosition: left
coverImage: https://i.udemycdn.com/course/750x422/2470214_97a0_4.jpg
coverMeta: out
tags: [Cypress, Testing, JS]
date: 2024/08/27
updated: 2024/08/27
---

Cypress 升級到 13 以後有資料夾重大結構的 Break Change, 不過官方都很貼心的使用介面幫你一次升級, 只要無腦的按按鈕就可以, 紀錄一下步驟如下。

<!--more-->

# 更改 Cypress 套件版號

先把 Cypress 套件版號升級到最新!

package.json

```js
{
  ...
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    "cypress": "^13.13.3",
    "cypress-cucumber-preprocessor": "^4.3.1",
    "cypress-file-upload": "^5.0.8",
  },
}

```

```cmd
npm install
```

# 啟動 Cypress 開始 Migrate

```cmd
cypress open
```

## Step1. 按 Rename 按鈕把 `Integration` 資料夾改名為 `e2e`

![Step1](https://i.imgur.com/N46c91S.png)

## Stpe2. 按 Rename 按鈕把 `cypress/support/index.js` 改名 `cypress/support/e2e.js`

![Step2](https://i.imgur.com/5P0xoR5.png)

## Step3. 按 Migrate 按鈕把 `cypress.json` 改名 `cypress.config.js`

![Step3](https://i.imgur.com/ADuQJOb.png)

## Step4. 關掉 Cypress, 修改 package.json

package.json 加上 `"step_definitions": "cypress/e2e/"` 這樣 cucumber 才吃的到寫的 step_definitions.

```js
{
  ...
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true,
    "step_definitions": "cypress/e2e/"
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    "cypress": "^13.13.3",
    "cypress-cucumber-preprocessor": "^4.3.1",
    "cypress-file-upload": "^5.0.8",
  },
}

```

## Step5. 重啟 Cypress 完成!

點 E2E Testing, 迎接新版 Cypress 介面!!

![](https://i.imgur.com/FAOilUB.png)