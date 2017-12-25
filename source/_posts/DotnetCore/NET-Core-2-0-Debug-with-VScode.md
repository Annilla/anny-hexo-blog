---
title: .NET Core 2.0 Debug with VScode
categories:
  - .NET Core
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET Core, dotnet, Vue, Webpack, SPA, MVC, VScode]
date: 2017/12/25
updated: 2017/12/25
---

這次要教大家如何使用 `VScode` debug `.Net Core` 的專案喔～
<!--more-->

## 安裝套件 `C#`

前往擴充套件頁籤安裝 `C#` plugin。

![安裝擴充套件](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-12-25_1355.png "VScode")

安裝完成重新啟動後，`VScode` 會自動安裝符合目前作業系統的 `OmniSharp`。

![重啟後 OmniSharp 自動安裝](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-12-25_1356.png "VScode")

## 加入偵錯設定

打開 `Program.cs` ，`VScode` 會提示使用者進行資產建置及偵錯您的應用程式。選取 `Yes`。

![提示使用者進行資產建置及偵錯您的應用程式](https://docs.microsoft.com/zh-tw/dotnet/core/tutorials/media/with-visual-studio-code/missing-assets.png "VScode")

選取 `Yes` 之後，系統會自動產生 `.vscode` 的資料夾，放置工作任務設定檔。

![系統會自動產生 .vscode 的資料夾](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-12-25_1410.png "VScode")

## 測試偵錯

1. 確定環境選項是 `.Net Core Launch (Web)`。
2. 開啟 `HomeController.cs` 下中斷點。
3. 快捷鍵 `F5` 或點 `綠色箭號按鈕` 啟動偵錯。

![測試偵錯](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-12-25_1429.png "VScode")

當偵錯程式到達中斷點時，它會停止執行程式。可以看到即時的變數狀態。

![偵錯程式到達中斷點](http://i965.photobucket.com/albums/ae138/anny09117011/Blog/2017-12-25_1432.png "VScode")

選取頂端的綠色箭頭以繼續偵錯，或者選取頂端的紅色正方形以停止偵錯。

如此一來，`.Net Core` 專案就能完全使用 `VScode` 來開發和偵錯囉，不用怕電腦卡卡，也能夠快速唰唰的專心寫程式囉～

今天的範例在 [github](https://github.com/Annilla/dotnet-core-vue-cli/tree/v1.1.0)，下回見～

## 參考資料

* [C# 與 Visual Studio Code 使用者入門 - 偵錯](https://docs.microsoft.com/zh-tw/dotnet/core/tutorials/with-visual-studio-code#debug)
