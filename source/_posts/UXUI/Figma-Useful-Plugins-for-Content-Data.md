---
title: Figma Useful Plugins for Content Data
categories:
  - UXUI
  - Figma
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://miro.medium.com/max/1400/1*BfTmRqrzxB90_e9i1-cj2g.png
coverMeta: out
tags: [Figma, UX, UI]
date: 2023/04/15
updated: 2023/04/15
---

通常繪製 prototype 的時候多少會需要一些假資料來模擬畫面。大部分使用假資料 User 都能接受, 畢竟實際上還是需要程式動態讀取出來的。但最近還是難逃要用實際資料模擬的需求, 我遇到的情境是類似大量 excel 動態計算欄位。因為 User 會想要討論每個欄位的計算公式, 初版用假資料出去, 結果就被打回來 QQ。只好認真的跟 User 要了實際資料, 但我敢說一定不會有人想要把值一格一格貼, 手絕對會斷掉！而且還下不了班！所以這篇就是紀錄我如何用 plugin 來解決貼實際值的問題。

<!--more-->

# Content Reel

![Content Reel](https://lh3.googleusercontent.com/pw/AJFCJaVUTlp1Mis0UVg0cbs00EviJX3iK_L0dTBt_lpPSYDbRMEkSIEthsuqXa0JykuKnfOPr_J6oPcecGiZ-b3TNbKpLi9fd38Vm10GF-yiGkHWfv5R29wmEUkAjD-yMd8UJBCQytFU_bJJMo_rw7KSASH0hg=w1862-h931-s-no?authuser=0)

[Content Reel](https://www.figma.com/community/plugin/731627216655469013/Content-Reel) 這個 plugin 裡面有很多好用的假資料資源可以快速套用。而且還可以用 Google 帳號登入後，儲存自己的資料庫。有個好用的技巧分享給大家：儲存一個叫做 Empty 的資源, 裡面只放一個空白字串。這樣如果設計時想要清空文字，只要圈選大量要清空文字的物件，點擊套用就可以一次全部清空內容，這招超好用！通常用 Content Reel 內建的資源或自己建立的資源可以解決 90% 的情境，但就如我文章開頭所說，如果要大量用實際數值模擬就不夠用了，所以下面介紹我最後使用的超級絕招。

# Google Sheets Sync

![Google Sheets Sync](https://lh3.googleusercontent.com/pw/AJFCJaWvyucLEMXVsmZhWGbUwrr9aIa_9AvZbi7p_UMYcGHnl_KzMgyTp-isTospBxKNGI-K9rV4QYOfB0U9DEvUdky-RAOh2C3qkhGoO8QWyL9VKyeR7PHTXkjZLfs_J4XgxH0ra6UC8UbjtnxWfJDq_Y9QqQ=w1750-h875-s-no?authuser=0)

[Google Sheets Sync](https://www.figma.com/community/plugin/735770583268406934/Google-Sheets-Sync) 這個 plugin 顧名思義就是讀取 Google Sheets 上的資料。我實際做的步驟如下：

1. 將資料複製到 Google Sheets, 欄位名稱取 Value。
2. Figma 物件的 text 圖層要取對應的欄位名稱 #Value。
3. 把 Google Sheets 分享連結開啟並複製連結。
4. 選取多個要替換值的 Figma 物件，開啟 plugin 將 Google Sheets 連結貼上, 點擊 Sync 按鈕就可以將值大量貼上。

> **注意！貼上的順序會依照 Figma 圖層順序，所以在大量貼上前，請確保物件的圖層順序正確。最保險的做法是複製第一個物件後，ctrl + D 重複做複製的動作，這樣圖層的順序就能確保是從上到下。**

如此一來就能模擬大量 excel 動態模擬資料的感覺，能準時下班真好ＸＤ

# Reference

* [Content Reel](https://www.figma.com/community/plugin/731627216655469013/Content-Reel)
* [Google Sheets Sync](https://www.figma.com/community/plugin/735770583268406934/Google-Sheets-Sync)