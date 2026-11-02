---
title: .NET 6 SPA with Vue-Cli Webpack Base - Start New Project
categories:
  - .NET
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET, dotnet, Vue, Webpack, SPA, VScode]
date: 2022/03/04
updated: 2022/03/04
---

.NET 出到 6 之後，原本官方的 SPA [套件被棄用](https://github.com/dotnet/aspnetcore/issues/12890)，新版改成使用 Vue-CLI + SPA Proxy。我們就從零開始建立新的 .NET6 + Vue-CLI (Webpack base) + Vuetify 專案吧～

<!--more-->

# 安裝 .NET 6 & Node.js

要先安裝 [.NET 6](https://dotnet.microsoft.com/en-us/download) & [Node.js](https://nodejs.org/en/)，並確認版本是否正確。

```
dotnet --version
```

此篇 dotnet 使用 6.0.200

```
node --version
```

此篇 node 使用 v16.4.0

# 起始 dotnet template

這次我們先起始一個 react 官方的模板，再從裡面修改檔案。

```
dotnet new react
```

會看到起始專案長這樣。

![dotnet new react](https://lh3.googleusercontent.com/pw/AM-JKLX2z5Nz_ErmoEcxAEgHX_rn68Ifr-8J1v_8NidUaMWUF3pUZviECReYXYcSG248yXZX4zB4STTJKtCSLZovNcX4hnBEqHazkJUI3fv8BOBlu_9U_mI-GYhO4xnVX7ZAqvpVQBV-PNjZsIFZT8Hcrt7c1g=w828-h868-no?authuser=0)

主要 SPA 放置的地方就在 ClientApp 裡面，所以我們只要用 Vue-CLI 建立新的 Vue 專案，把對應的資料夾和設定值替換掉即可。

# Vue-CLI 建立專案

先安裝 Vue-CLI，並確認版本。

```
npm install -g @vue/cli
```

```
vue --version
```

此篇 Vue-CLI 使用 v5.0.1

接著用 Vue-CLI 建立新專案，但因為 Vue-CLI 不允許使用字母大寫，所以我們把資料夾取名 `client-app`。

```
vue create client-app
```

接著選擇要的 preset，因為 Vuetify 還沒有用到 Vue 3 ，所以這邊就選擇 Vue 2 的選項。也可以依自己的喜好選 Manual 的方式組合。

接著進入 client-app 裡面，安裝 Vuetify。

```
cd client-app
```

```
vue add vuetify
```

Vuetify 的模板就先選擇 recommended 即可。

Vue 模板都安裝完後，可以先試跑看有沒有成功。

```
npm run serve
```

可以看到在 8080 port 有跑出建置好的 Vue + Vuetify 專案。

![Vue + Vuetify 專案](https://lh3.googleusercontent.com/pw/AM-JKLXx7Ju-EayPyEeh39b-fJieuM1K7S4ZAA20t5msauhI9baNCBCUXcgkuDXYOwVNIq-lCteGP4Coul2nMF2HEz14wIkrCxiszBHyPjexr8ovkpU6oq-JRjml797zAQu0n-vQxcS0PaRFNbNxIvWxg0W9zQ=w2206-h1378-no?authuser=0)

確認安裝成功，就可以把舊的 ClientApp 刪掉。

# 設定 config

接著我們把一些 proxy config 設定上去，讓 dotnet 可以和 Vue-CLI 銜接起來。

打開 csproj 檔案。把 `SpaRoot` 的部分改成新建的資料夾 `client-app\`，並注意這裡的 `SpaProxyServerUrl` port 是 `44405` 且 `SpaProxyLaunchCommand` 是 `npm start`。所以我們要把 Vue-CLI 的設定改成對應的 port 和npm 指令。

> 注意！若 SpaProxyServerUrl 若是 https 要改成 http。

> PS. 每次 dotnet 模板起始的 port 都不一樣，請以當次建立的 port 為準。

```xml
...
  <PropertyGroup>
    ...
    <SpaRoot>client-app\</SpaRoot>
    ...
    <SpaProxyServerUrl>http://localhost:44405</SpaProxyServerUrl>
    <SpaProxyLaunchCommand>npm start</SpaProxyLaunchCommand>
    <RootNamespace>dotnet_core_vue_cli</RootNamespace>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  ...
```

打開 package.json，把 "serve" 改成 "start" 。

```js
"scripts": {
  "start": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```

打開 vue.config.js，將 devServer port 換成 44405。

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 44405,
  },
  transpileDependencies: [
    'vuetify'
  ]
})
```

# Run~

開啟 csproj 檔案，vscode 會問你是否要建立 debug file，選擇 Yes，vscode 就會建立一個 .vscode 的資料夾。

![vscode debug files](https://lh3.googleusercontent.com/pw/AM-JKLW5gDiNQt5ournrdZGTd0Agbja7hRSJkN5lxzUZvyYdB0NHov4H36TB9-9hPGlvLuGdoDNhtpop1FKXeOEeb9PCMar2hpW23SFqnnWMnngsmvYaU5_c5H1SdhjoM4uxbsUQbnaS1aIuzTmobaYxfpCeqg=w2206-h1378-no?authuser=0)

接著去 Debug 按 Run 的按鈕，我們就大功告成囉～

![Run](https://lh3.googleusercontent.com/pw/AM-JKLVicP5nFFOEVCRg9q5YgzfD5ouyqWZhs191vd8zayFgn-fHTkqcRurbx8nd8LduRBA88Z5ndDsrGbkfEYGVyYOXYAmA-zCyrfXM6YxOHK2pw8ITPnN28Ko7Rza5pSxUWwh9TBWIFc0SFlIVzu6XKbsgGA=w2206-h1378-no?authuser=0)

![Done](https://lh3.googleusercontent.com/pw/AM-JKLXNAiYrBco8XyOW95fbUADTtz7GyAt0MwSky7U0Oncxo5MqCwNTxJLG9RnIZCgqieqMV_Ieuppnn3m89u1pQeEdrOJfPtZrL9PtoMUOfIPVsB0UHqJUMx5rbCLXEutn4rJwtZ3Z5jIjDZ0W2uy5KjJrSA=w2206-h1378-no?authuser=0)

今天的範例在 [github](https://github.com/Annilla/dotnet-core-vue-cli/tree/v6.0.2)，下回見～