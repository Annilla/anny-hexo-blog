---
title: UX/UI Workflow Tool in 2018
categories:
  - UXUI
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/UXUI.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/UXUI_1.png
coverMeta: out
tags: [Sketch, Abstract, Adobe XD, UX, UI]
date: 2018/09/13
updated: 2018/09/13
---

這篇要和大家分享平時設計 UX/UI 的時候我會用到的工具。以及在一堆爆炸的工作量中，要怎麼運用工具存活下來的故事 XD 。那我們就趕快開始吧。

<!--more-->

這邊主要先介紹平常會用到的 Tool “粗略簡介”，中間會附註其他類似的工具，最後說明我的設計工作流。比較技術性的使用方式要等後續再慢慢出一些專門的文章。

***
## Abstract

![Abstract](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/full-speed-ahead-img2.png "Abstract")

[Abstract](https://www.goabstract.com/) 是針對 Sketch 的版本控制工具。

> “One place to version, manage, and collaborate on your Sketch files.” 

就如同使用 git 一般，所有的修改異動都會以 commit 的方式在雲端。再也不用像以往使用 adobe 系列狂複製做檔案備份的動作，使用 Abstract 就可以隨時查看要的版本，設計師再也不用害怕老闆說：“還是第一個版本好”(ＱＱ～心在淌血)。如果多人修改也可以開不同的分支(branch)，最後將確認的版本 merge 到 Master 即可。這簡直是設計師的救星啊～太多專案真的記不清之前做了什麼事，人也是會老的啊～(誤)

> 其他類似的工具：[Plant](https://plantapp.io/), [Kactus](https://kactus.io/)，網路上也有蠻多比較文章，可參考[這篇](https://blog.prototypr.io/abstract-vs-kactus-vs-plant-a-guide-of-version-control-solutions-for-sketch-7da0a8ab5105)

***
## Sketch

![Sketch](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2018-09-13_1456.png "Sketch")

[Sketch](https://www.sketchapp.com/) 設計 UI 的工具，我想他的大名鼎鼎幾乎每位介面設計師都聽過吧。其實我第一次接觸他的契機是因為我需要 “加快” 我的產出速度，為什麼這樣說呢？是設計師的話一定用過 Adobe 的 Illustrator, Photoshop，假設要你設計一個簡單的聯絡人清單介面，用 Adobe 系列做是非常手工的一件事情。但透過 Sketch 大量的外部 plugin 支援，只要引用幾個簡單的 plugin ，就可以快速產出假的聯絡人名稱、假照片、固定的間距(padding)。除此之外，還可以透過 plugin 輸出 spec 給工程師參考，再也不用自己拼命測量、打色碼，告訴工程師要怎麼切版了。為了要在團隊裡同時支撐大量專案的設計，如何在同樣高品質下，提升速度才是能讓自己存活的關鍵。

> 其他類似的工具：[Adobe XD](https://www.adobe.com/tw/products/xd.html)

***
## Adobe XD

![Adobe XD](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/xd-riverflow1-720x620.jpg "Adobe XD")

誒～～等等，剛剛不是說你是用 Sketch，[Adobe XD](https://www.adobe.com/tw/products/xd.html) 是相似的工具，那你相似的工具怎麼一次就用了兩款了呢？你以為我這麼愛搞死自己啊～還不是因為兩者的出發利基點不同，各有優缺點，所以只好截長補短囉。用 Sketch 主要還是因為有版控的關係，畢竟是以存活為優先啊。而 XD 的優勢呢主要是在他的 prototype ，可以很直覺的拉一拉，就可以輸出 URL 提供 user 使用測試，不用寫程式也可以先收集反饋，不然等到寫好程式又被打槍設計就會進入輪迴地獄了。但近期 XD 和 Sketch 兩者的功能越來越相像， Sketch 新增了 prototype 功能(但還有些小 bug)，而 XD 也在著手開發 plugin 生態，這兩個目前還是不分軒輊。目前本人還是偏向可搭版控功能的 Sketch 為主，而 XD 為輔的狀態。

> 其他類似的工具：[inVision](https://www.invisionapp.com/)，inVision 除了可以線上做 prototype 之外，還主打模擬過場互動動畫，這款做動畫的威力可說是相當強大，有可能未來會強勢殺出。但目前主要是追求速度的提升，製作互動動畫的部分就沒多重琢磨，可能往後比較有空閒的時間再多加研究。

***
## 設計工作流

我的設計流程大約是這樣的：

1. 接到需求
2. 打開版控軟體 Abstract 創立新專案 (既有舊專案則同步檔案至最新)
3. 用 Abstract 開 new branch
4. 從 Abstract branch 打開 Sketch 設計 UI
5. 設計一段落，建立 commit 上 Abstract
6. 從 Sketch 檔案輸出靜態圖片
7. 使用 Adobe XD 建立 prototype
8. 輸出 prototype 網址給使用者測試
9. 得到使用者回饋後，再決定 Abstract 是否要 merge 此 branch 到 Master 或是繼續新增 commit。最差的可能是全部被打槍，只好從 Master 再另開 branch 來做。

上面的步驟依據使用者回饋多寡做多次的循環至 OK 為止。

以上是我到目前為止採用的 design workflow，提供給大家參考。之後會寫一系列關於 UX, UI 的工具使用技巧或介紹大咖的 design pattern 如何幫助我有效率的產出，敬請期待～