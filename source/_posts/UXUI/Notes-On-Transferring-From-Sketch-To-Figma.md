---
title: Notes on transferring from Sketch to Figma
categories:
  - UXUI
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://www.lohaslife.cc/wp-content/uploads/2020/10/figma.png
coverMeta: out
tags: [Sketch, Figma, UX, UI]
date: 2021/01/01
updated: 2021/01/01
---

還沒接觸到 Figma 前，我的工作流是用 Sketch (設計) + Abstract (版控) + AdobeXD (原型)，三者各取所長提供使用者最適合的設計方案。但其實很多時間會花在操作三種不同軟體的工上，但 Figma 解決了我長期的困擾，一個軟體就可以做到原本的事情，且還不用下載任何軟體，只要有瀏覽器就可以線上設計，還支援線上多人協作，優點多多。此篇紀錄將設計檔案從 Sketch 轉移到 Figma 需要注意的小細節。

<!--more-->

第一次轉移總是會痛的，需要每個 artboard 去檢查是否有跟原來設計的畫面一樣，還要重新拉 prototype 動態線，通常至少需要花一整天才能完成轉移一個專案設計檔，且這是在還沒有將 Design System Library component 替換掉的時間。若要替換 Library component 需要在付費制下才可以使用，所以本篇先以免費版所要注意的地方著墨，System Library 等之後再另外寫一篇整理。

# 同一組 Prototype 路線要在同個 Page

之前 Sketch 我會依據功能將 artboard 分類在不同 Page，但在 Figma 若要做 Prototype 動態連線的話，只能全部在同一個 Page。不同 Page 在 Figma 只會當作是另一組 Prototype 路線。所以要怎麼把全部 artboard 整理在同一個 Page，我的做法是將同一區塊的 artboard 放在一起並用超級大的字體寫那一塊原本的 Page（功能）名稱，這樣遠遠的看也知道那一區是在做什麼的。

![Prototype 要在同一個 Page](https://lh3.googleusercontent.com/pw/ACtC-3fXQJ_l_y5auAA3Xe1NuMYvlHthoPQvW1Ijk1G4xTgGRZT1me4XXGavIcNA5VSY5mhDW8c7_3ndvi3Ptu0-Ahjfl9NlJ4W0h3HxvYSRKotT9C2R8XxsGJBKziedeHto-GmtY2BCsnBYBUeamXSGmMGRGg=w2542-h1378-no?authuser=0)

# 群組物件被強制修剪

當 Sketch 設計檔轉到 Figma 後，群組的物件會被自動轉換成 Figma 屬性的 group 或 Frame，且會有多一個勾選框顯示在右邊屬性欄，讓設計者勾選是否要修剪影像的 checked box。通常發生在有陰影和文字物件上，導致陰影或文字被強制切掉。這個時候只要取消勾選 "Clip Content"，就能如原本設計一樣了，只是這需要耐心檢查還蠻花時間的。

![Clip Content](https://lh3.googleusercontent.com/pw/ACtC-3els8K-mYfiBwswCJfPY9fMfUhwrqTTRcq9HZLqFeRvm0Gd_I13EfCpuTHZB_epIsCL8brFtA4a1-SXN_P2nYeHOVc8P593WKvyiGtDsaKJoqBQiwUt-whxhmv7_P0DLq_GhzDdENu8ykJlxD4yN1Xtxw=w490-h622-no?authuser=0)

# Circle Progress Bar 畫法不同

若你的設計元素有 Circle Progress Bar 要注意在 Figma 的設計方式會不同，以往在 Sketch 通常是調整線框 line dash 的筆畫樣式，但在 Figma 可以直接用實體 fill 的圓形去修改樣式，所以 Sketch 舊方式的 Circle Progress Bar 匯入就會壞掉，需要再重新做設計上的修正。

![Circle Progress Bar](https://downloads.intercomcdn.com/i/o/82641775/21030eb185c81c44338bc2ee/Arc+Closed+Ring.gif)

# 出現重複 Symbol 的 bug

有時候 Sketch 檔案匯入 Figma 後，會出現兩個一樣的 Symbol 的 bug? 目前不確定為什麼會這樣，可能跟檔案版本有關？ 我解決的辦法是用 [Figma Plugin - Locator](https://www.figma.com/community/plugin/741935812012883481/Locator) 先去確定哪個 Symbol 是有確實用到的，如果兩個 Symbol 用到的地方都一模一樣，就勇敢的把其中一個刪除吧！另外，也可以用 [Figma Plugin - Component Replacer](https://www.figma.com/community/plugin/748545064462894895/Component-Replacer) 把不是 symbol 的 component 補上，就是順便檢查一下，讓設計更完整。

![Figma Plugin - Locator](https://www.figma.com/community/plugin/741935812012883481/thumbnail)

![Figma Plugin - Component Replace](https://www.figma.com/community/plugin/748545064462894895/thumbnail)

# Design System

Figma 有個很不錯的功能是可以將 Design System 共享給各專案使用，但免費版僅限於分享 Color Style 的部分， component 則不給發布，所以這部分要注意的事項，待之後升級到訂閱版，我在把要注意的細節另外寫一篇～

![Design System](https://images.ctfassets.net/1khq4uysbvty/4XYc5Z5siLdaAgidhT2ym/0f916d11a615efaa0776f5fc33b2446f/DS_03.gif?&w=785)


# Reference

* [Figma Plugin - Locator](https://www.figma.com/community/plugin/741935812012883481/Locator)
* [Figma Plugin - Component Replacer](https://www.figma.com/community/plugin/748545064462894895/Component-Replacer)