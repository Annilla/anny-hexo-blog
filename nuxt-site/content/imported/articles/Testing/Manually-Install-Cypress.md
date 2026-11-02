---
title: Manually Install Cypress
categories:
  - Testing
thumbnailImage: https://avatars2.githubusercontent.com/u/8908513?s=400&v=4
thumbnailImagePosition: left
coverImage: https://i.udemycdn.com/course/750x422/2470214_97a0_4.jpg
coverMeta: out
tags: [Cypress, Testing, JS]
date: 2021/10/04
updated: 2021/10/04
---

最近發現公司內網不明原因會擋住 npm install cypress，但安裝其他的套件就不會發生，所以只好搜尋看要怎麼手動安裝 cypress。

<!--more-->

# 手動安裝 cypress

## 1. 下載 zip 檔案

ex: https://download.cypress.io/desktop/6.8.0，不同 version 的話就替換最後面數字版本。

## 2. 找到電腦的 cypress cache 資料夾

[官方文件](https://docs.cypress.io/guides/getting-started/installing-cypress#Binary-cache)有說明預設的 windows 路徑為 `/AppData/Local/Cypress/Cache`，以我公司電腦為例，Path 是 `C:\Users\annychang\AppData\Local\Cypress\Cache`

## 3. 將下載的 zip 檔案解壓縮到 cache 資料夾，完成!

將解壓縮的檔案放在對應的版本資料夾中，如此一來執行 npm install 的時候會優先從 global 這邊找到，就不會再進行安裝，可以直接執行。

![將解壓縮的檔案放在對應的版本資料夾](https://lh3.googleusercontent.com/pw/AM-JKLUO36gFVv7dYTCNWwJWUbg6Nw_R4c15EFJxMAf2dVKFftH2Clx2QAiPjj59AsKDosLpUtryGTmDysYKMpTTR0e8svqPiaBH7J25ikCtxDEkHKrk10KrftiQECg9bAaN5lvDgJMdvawPza_Cbn1-qPc2tA=w734-h418-no?authuser=0)



# Reference

* [Cypress Direct-download](https://docs.cypress.io/guides/getting-started/installing-cypress#Direct-download)
* [Cypress Cache](https://docs.cypress.io/guides/getting-started/installing-cypress#Binary-cache)
