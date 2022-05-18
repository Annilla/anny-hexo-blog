---
title: VScode Extension - Azure Static Web Apps
categories:
  - VScode
thumbnailImage: https://code.visualstudio.com/assets/favicon.ico
thumbnailImagePosition: left
coverImage: https://nickjanetakis.com/assets/blog/cards/my-favorite-vscode-extensions-0a601796807e75dea485f00ded76da1ab2279c3d85364335b715c1918691650f.jpg
coverMeta: out
tags: [Git, VScode, Azure]
date: 2022/05/18
updated: 2022/05/18
---

最近因緣際會下本來想做個讀取 Google Sheet API 的 web app 放在 github page，但發現 github 有擋住部分功能，所以想說看能不能改放在 Azure 雲端上，搜尋之後發現這個神奇的 plugin，Azure Static Web Apps 可以在 vscode 做一些簡單的設定，就能把 github 上的前端 web app 自動透過 github Action，CICD 到 Azure Cloud 上，底層還是會在 Azure 建立一個 Azure Function。話不多說，直接來說明怎麼設定吧～

<!--more-->

# 準備好要發布的 github repo

這裡我先準備好要測試發布的 [Vue 3](https://github.com/Annilla/Azure-Static-Web-Apps-Test) 專案(用 Vue-cli 5 Create 出來的)。

# VScode 安裝 Extension

在 Extension Tab 安裝 [Azure Static Web Apps](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)。

安裝完後可點擊 Azure Icon Tab，會看到裡面有 Azure Static Web Apps 的 panel。第一次使用請先登入個人的 Azure 帳號。

![Azure Static Web Apps 的 panel](https://lh3.googleusercontent.com/pw/AM-JKLWAvS3dAHOv4-hgnTEqDQLTq4AynruunlJHD0h3HYOGEbXesj5BMZRwWsQS2_Z8PzRlqgx5TF0kiZVmNcepm1qXetaXbDgEslUcUOehK5MHlP71fksNl-M6HMw21cfKVtC8a-uyZ2vGmip7H72QXbqq0w=w2308-h1442-no?authuser=0)

# 新增 site

點擊 + Icon 新增 Azure Static Web App。

![新增 Azure Static Web App](https://docs.microsoft.com/en-us/azure/static-web-apps/media/getting-started/extension-create-button.png)

選取 Azure 訂閱戶。

![選取 Azure 訂閱戶](https://docs.microsoft.com/en-us/azure/static-web-apps/media/getting-started/extension-subscription.png)

輸入 static web app 名稱。

![輸入 static web app 名稱](https://lh3.googleusercontent.com/pw/AM-JKLXGDXQzcNvm0clQeIoOjM8pL8f8XkFYDvWnwGAZ9pmi6n4WT-2YHQcVTXvRmxHSN1HdmNY5YLk2RTFy9KuJBWqqBcx8MWK6GPQBT5lcOFu_VM-6k4_eFGVOu2cPnMg6yydzOKJHQW9UolFDP1d2I2Qyig=w1602-h302-no?authuser=0)

選取伺服器位置，我這邊選 East Asia。

![選取伺服器位置](https://lh3.googleusercontent.com/pw/AM-JKLWvk7wCs80cN0SBZuEo3ZaPzlI311LrYfE_k0oncgNhjOxPQ34afmn8WW7UEGiqTqOgiNKt0AWXxUakQIfw8iO0tkmUiMKkWizkKTiajTtu2WBT8sIT4C1bGio8FbfsAWZ6D8CJXLKWUVd4ScATscmdLw=w1600-h508-no?authuser=0)

選取專案的架構，這邊選 Vue.js。

![選取專案的架構](https://lh3.googleusercontent.com/pw/AM-JKLVg6Bvh64gcn1FRllsYl3pJn3RTMFCoRObItMPeWf9KFABDYZy7vlRAHLK04ktmx7tLbHSKbL01DLansHVhYeiT6ezNeGCjDCIiEhVyAb6jE11uWNZZB6rqhVb88cVjZDw0s6PxFfEnzd7F6OgcbGY06A=w1596-h820-no?authuser=0)

設定專案路徑，這邊是建在 /my-app 資料夾底下。

![設定專案路徑](https://lh3.googleusercontent.com/pw/AM-JKLXZfigJbpbdF-Cn7BrQ4O9rQPDXhBhASC87jncaqLR15PygdF8Ct-vxSz1nr4h92j2PVimJuiPqLzofwcDtXkBMgyLI-333vt2UbLyjW4FYiH71AzWTm3mnWeaux7bb-FoxKQ-JgsDVRxmQThVSOiQZPg=w1610-h356-no?authuser=0)

設定輸出資料夾，這邊預設就是 dist ，所以不用更改。

![設定輸出資料夾](https://lh3.googleusercontent.com/pw/AM-JKLU-UivhBdjy6CdasFx9XKFWPQg5N8u8buRAxhkhDSbNsZBScNjnnEhInz2Q3-ELIOjH88taxcSASqVLi8uwE1lK94WIWQ86oQqgW0tSUIS3lr5k2q0q_b1bsTxjvQMpIEv2I_B5hlhhx7vUqCuBtowwjQ=w1602-h410-no?authuser=0)

設定完成後，他會自動 commit yml 檔案到 github，之後只要有更新 git，就會觸發 [github Action](https://github.com/Annilla/Azure-Static-Web-Apps-Test/actions) CICD，並發布至 Azure Site。

接著只要對專案按右鍵選擇 Browse Site 就可以打開網站連結看到網站。

![Browse Site](https://docs.microsoft.com/en-us/azure/static-web-apps/media/getting-started/extension-browse-site.png)

好了，設定就是那麼簡單! 因為很少碰 CICD 的東西，這個套件簡化了很多繁瑣的步驟，可以讓我快速將靜態網站放上雲端，實在是非常方便～

# Reference

* [Quickstart: Building your first static site with Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=vanilla-javascript)