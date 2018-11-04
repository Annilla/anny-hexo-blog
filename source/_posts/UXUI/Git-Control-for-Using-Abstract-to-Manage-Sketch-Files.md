---
title: Git Control for Using Abstract to Manage Sketch Files
categories:
  - UXUI
thumbnailImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/UXUI.png
thumbnailImagePosition: left
coverImage: http://i965.photobucket.com/albums/ae138/anny09117011/Blog/UXUI_1.png
coverMeta: out
tags: [Sketch, Abstract, UX, UI]
date: 2018/11/04
updated: 2018/11/04
---

這篇要來介紹 `Abstract` 的主要功能，和我平常會怎麼使用他來做版本控制。

<!--more-->

***
## Projects 所有專案

登入後的首頁就是顯示所有專案的頁面。專案分為 `ACTIVE` 和 `ARCHIVED`，這兩個分類主要是讓設計師團隊去區分哪些專案是還在進行的，哪些專案是已經結案的。專案只會越來越多，所以我覺得這個功能很好，可以在團隊合作時能很快的找到要設計的專案。我自己目前是一人設計，但目前管理的專案就有十幾個以上，往後專案數量只會遞增，所以我覺得這個功能對設計師來說是十分貼心。但要注意若要使用專案分類的話，是要自己去手動設定的喔，並不會自動知道你的專案已經結案了，所以這部分是手動設定也蠻合理的。

![Projects/ACTIVE](https://beta-static.photobucket.com/images/ae138/anny09117011/0/79600760-97d1-4505-b81e-7dd0d6cd4695-original.png?width=1920&height=1080&fit=bounds "Projects/ACTIVE")

![Projects/ARCHIVED](https://beta-static.photobucket.com/images/ae138/anny09117011/0/7599faba-bf4e-4736-af79-1dee3bbe27dd-original.png?width=1920&height=1080&fit=bounds "Projects/ARCHIVED")

> Tip: 預設專案的排序是照名稱，如果想要專案特別置頂的話，可以按專案卡片上的星星就會強制置頂囉～

要開新專案就按 `New Project` 新增，詳細操作可以參考官網的[說明](https://www.goabstract.com/how-it-works/)，這裡就不再贅述。

![New Project](https://beta-static.photobucket.com/images/ae138/anny09117011/0/79908a0c-dfe0-4d82-8602-d953432d2a8b-original.png?width=1920&height=1080&fit=bounds "New Project")

***
## Project Overview 專案概況

點擊進入單一專案後，會看到 `Overview` 頁面，這頁是把專案的概況整理成一張張的小卡，讓設計師能快速回憶過往設計並能儘快進入狀態。比較特別的是其中有一個小卡 `About`，類似小白板的感覺，主要功能是紀錄專案的描述和相關文件的參照，我覺得這個部分超棒的！！！因為要設計一個專案，絕對是有許許多多的需求，這些需求總有一個管理的地方，而 Abstract 運用了這張卡片讓流程可以順利的參照。但美中不足的是如果可以像 `Azure Devops` 有個 task board 聯繫 git，並在 merge 的時候有 close task 的功能，將會對設計師團隊有很大的助益。

![Project Overview](https://beta-static.photobucket.com/images/ae138/anny09117011/0/bdb60393-6e94-4cdd-84bd-e076e4fbe051-original.png?width=1920&height=1080&fit=bounds "Project Overview")

***
## Project Master 專案主分支

Master 就是此專案的主要 branch，分為 Overview/Commits/Files 三個小功能。正常來說 `Abstract` 不會讓設計師去 commit Master branch，所以如果在這裡去點擊 `EDIT IN SKETCH` 做任何變更是不會讓使用者 commit 上去的。在 Master branch 設計師只會有兩種選擇，要麻獨立開啟檔案不給你做 commit，要麻就是建議你開 branch 做完後再 merge 回來，這一點跟一般的 git 不太一樣，畢竟設計檔案也不會有用到 hotfix 的時候，所以這樣防呆也比較安全。

![Project Master Files](https://beta-static.photobucket.com/images/ae138/anny09117011/0/bf99cae2-8cb9-43df-8b0a-f3c9075237dd-original.png?width=1920&height=1080&fit=bounds "Project Master Files")

![Project Master Commits](https://beta-static.photobucket.com/images/ae138/anny09117011/0/0241e0aa-e8ef-4b4b-a733-f206d6d27e43-original.png?width=1920&height=1080&fit=bounds "Project Master Commits")

***
## Project Branches 專案分支

這個功能是 `Abstract` 的核心。上一段提到正常的版本控制流程如同 git 一般，應該要做 `NEW BRANCH` 的動作開新分隻，並在新分支做 `EDIT IN SKETCH`，儲存完後對分支進行 commit 的動作，確定都修改完成最後才會將數個 commit merge 到 Master branch。這樣做除了多人設計師可以合作外，如果像我一樣孤獨的設計師也有好處嗎？答案絕對是YES! 因為設計跟寫程式不一樣，同一個需求，常常需要多種設計方案來比較，但 BOSS 又是那種看不到畫面就感覺不到的人，所以這時候開 branch 就非常好用。不同 branch 代表不同的設計方案，這樣既不會干擾原設計，又可以將最後確定要做的 branch 做 merge，其他不需要的方案也可以留底做紀錄。超愛！！

![Project Branches](https://beta-static.photobucket.com/images/ae138/anny09117011/0/b5f848aa-f7c2-4264-acdd-3bfc20f6d294-original.png?width=1920&height=1080&fit=bounds "Project Branches")

> Tip: 對每張預覽圖點進去都可以做 COMMENT/COMPARE/INSPECT 的功能。 COMMENT 就是給不同設計師合作時的討論。 COMPARE 就是可以比對設計圖修改前後的不同處。 INSPECT 是新功能尚未開放，但我猜應該是讓設計師可跟工程師溝通的 spec，這部分我目前是先用 Sketch 的 plugin 輸出成互動的 HTML 解決，如果 Abstract 之後有開放此功能的話，將會是一大福音。

![Pages](https://beta-static.photobucket.com/images/ae138/anny09117011/0/fbc759f3-7c31-4f1b-a19b-c7f3370ed00c-original.png?width=1920&height=1080&fit=bounds "Pages")

***
## 2018 對應 Sketch Library 的功能

Sketch 的新功能 `Library`， Abstract 也有支援，而且使用起來相當順暢。當已經有一組設計元件/框架想要共用多個不同的專案時，我們可以開一個單獨的專案並將其 sketch 檔案 import 為 Library 做管理。在另一個要使用此 Library 的專案在 Files 的子頁面做 `Link Library` 的動作。這樣只要原本 Library 的元件有做修改，有使用到此共用元件的專案也會一併更新，如此一來就可以做到 Library 和一般專案分開管理，又可以做到互相關聯。這個新功能雖然是 Sketch 研發，但搭配上 Abstract 後更是如虎添翼，打 BOSS 嚇嚇叫！詳細實作可參考官網[說明](https://support.goabstract.com/hc/en-us/articles/360016370931-Build-a-Library)。

> Tip: `Import Sketch file as Library` 後檔案的 icon 會變成粉紫色鑽石（預設是橘黃色），這樣就表示有新增 Library 成功喔～

![Library](https://beta-static.photobucket.com/images/ae138/anny09117011/0/bca763f0-6d8e-4786-976d-2235d8fe625d-original.png?width=1920&height=1080&fit=bounds "Library")