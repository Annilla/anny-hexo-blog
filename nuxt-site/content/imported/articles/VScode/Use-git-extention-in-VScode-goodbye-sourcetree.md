---
title: 'Use git extention in VScode, goodbye sourcetree'
categories:
  - VScode
thumbnailImage: https://code.visualstudio.com/assets/favicon.ico
thumbnailImagePosition: left
coverImage: https://nickjanetakis.com/assets/blog/cards/my-favorite-vscode-extensions-0a601796807e75dea485f00ded76da1ab2279c3d85364335b715c1918691650f.jpg
coverMeta: out
tags: [Git, VScode]
date: 2019/11/23
updated: 2019/11/23
---

因為 sourcetree 在公司內網些時候會一直跳出輸入 AD 帳密的視窗，前陣子因為換了密碼，結果舊密碼被記住，結果每用一次 sourcetree 就會被鎖一次帳號，真是冤望啊！後來索性就決定刪掉 sourcetree ，想說如果全部都在 vscode 一次解決就完美了～所以就開始我的 vscode extention 探索之旅。

<!--more-->

首先，得先理出哪些 sourcetree 的功能是我常用的，並找到相對應的 vscode extention 。想要的功能如下：

1. 資料夾整理專案功能：因為不可能記住 repo 名稱對應的專案，所以若能像 sourcetree 有分資料夾的功能，就能快速找到專案對應的 repo。

2. Git Stash 功能：能暫存程式碼片段在本機。隨時可調用。

3. Git Graph 功能: 能看清楚每個 branch 的 commit 圖形化介面。

接著，我們就來看是哪些 vscode extention 吧~

# Project Manager

[Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) 能用它做資料夾整理專案的功能，而且他在 vscode 還可以做 open in new window 的動作，整合開啟程式片段的功能感覺超方便！

![Project Manager](https://github.com/alefragnani/vscode-project-manager/raw/master/images/vscode-project-manager-side-bar.gif)

# Git Stash

[Git Stash](https://marketplace.visualstudio.com/items?itemName=arturock.gitstash) 能用它做 git stash 的相關動作，而且他整合在 vscode 的 git 頁籤中，不會像 gitLens 跑到另一個頁籤，我覺得整合的很好，操作又簡潔。

![Git Stash](https://raw.githubusercontent.com/arturock/vscode-gitstash/master/resources/docs/screencast.gif)


# Git Graph

[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) 能用它看到 git 圖形，也可以透過滑鼠右鍵做 branch 切換、加 tag、cherry pick 等動作，最重要的是他也整合在 git 頁籤中，所以就可以把 git 功能就統一在 vscode 原始 git 頁籤中，整個融合在 vscode 介面中，再也不用另外開 sourcetree 了！

![Git Graph](https://github.com/mhutchie/vscode-git-graph/raw/master/resources/demo.gif)

透過以上三個 vscode extention ，就能永遠跟 sourcetree 說 goodbye 了～
