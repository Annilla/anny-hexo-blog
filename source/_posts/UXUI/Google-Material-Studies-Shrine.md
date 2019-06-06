---
title: Google Material Studies - Shrine
categories:
  - UXUI
  - Material Design
thumbnailImage: https://beta-static.photobucket.com/images/ae138/anny09117011/0/21bddd8b-c51b-4c3a-8101-d7c5a1859060-original.png?width=1920&height=1080&fit=bounds
thumbnailImagePosition: left
coverImage: https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1XfN9LumqsUoSt6nDckGhoja4ll8EAmZI%2Fcasestudies-shrine-brandattributes.png
coverMeta: out
tags: [UX, UI, Material Design]
date: 2019/06/07
updated: 2019/06/07
---

這次 Material Design 案例介紹零售業的 APP 設計，相信大家都不陌生，如何呈現大量商品給使用者也是一門學問。

<!--more-->

# 案例背景

Shrine APP 是一個線上市場，透過推播標籤 (promoted labels) 來表達生活方式和時尚產品的特色。Shrine 的品牌美學為現代、优雅、精致。Shrine 在展示各品牌和產品背后，有著一致的美學概念。

### 極簡美學

Shrine 的極簡主義將使用者體驗著重在產品内容和 APP 互動。作為展示各種產品和品牌核心的统一架構，Shrine 的品牌扮演着重要的角色。

### 視覺主題

Shrine 的視覺主題採用去角的剪裁設計，應用在各種組件和元素上。這些元素代表 Shrine logo 的形狀，且為 Shrine 品牌的延伸設計。

![Shrine 去角的剪裁設計](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1KZq-VRhEx9j2HydlT4ZW9H7tR-WoOZAe%2Fcasestudies-shrine-logo-alt.png "Shrine 去角的剪裁設計")

Shrine 的互動模型是由三個重疊的圖層組成。

1. 最下層為導航和品牌元素
2. 中間層為主要內容
3. 最上層為購物車

![Shrine 三個重疊的圖層](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1a-_JDAJTous0ko4miSjAgVwJPHQB2hHe%2Fcasestudies-shrine-elevationchart.png "Shrine 三個重疊的圖層")

> 心得：以前做過大量分類的內容網站，如何讓使用者快速找到他要的類別是一門學問。極簡風格的好處是將操作簡化，並專注於呈現產品給使用者。

# 產品架構

Shrine 應用程序的資訊架構是由目錄(catalog)結構組成。一個目錄包含各分類資訊，母類別可能包含子類別。Shrine 的母類別將大群組的物品分類，例如：鞋子、配飾、連衣裙，如此一來，使用者可以看到相關的內容。採用目錄結構讓使用者瀏覽有興趣的項目、互相比對不同的產品和查看特定的產品資訊。

### 導覽列

Shrine 在桌機、平板和手機上使用不同形式的導覽列。
手機將導覽列放在最後一個圖層，需要藉由回上頁的元件做返回的動作。
平板使用頁籤(tabs)的方式導覽。
桌機使用標準的導覽收納欄位。

![Shrine 導覽列](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1-qYMfjqAbsMb9O-lJNIsaHcKhO_p4O_s%2Fcasestudies-shrine-family.png "Shrine 導覽列")

### 項目指標

所有導覽列共用同一個選取狀態模式：當一個項目被選取，項目背後會有一個三角圖樣代表被選取的狀態。項目指標確保使用者知道他們目前所在的類別。

![Shrine 項目指標](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1l0DbKUHyQKvedhajBXcnaVN8UZbn7eSF%2Fcasestudies-shrine-nav.png "Shrine 項目指標")

### 購物車

購物車可以在螢幕右下角找到。當物品加入或從購物車移除，購物清單會動態更新並反映變化。
購物清單可以透過點擊 icon ，展開內容細目，或是帶使用者到購物畫面。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1dgcMYf6_2L_xYYriPRcoACs_woD5LIFm%2Fcasestudies-shrine-shoppingcart-1b.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

> 心得：項目指標用圖示的方式標示在分類文字背後，我覺得這個用法蠻大膽的，若是想要增加潮流感的話很適合。但若是在公司企業內部用的軟體可能需要考慮使用者的接受度。

# 排版和顏色

Shrine 使用 12 grid system。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1JSMNlunwZaOV3F0t0eSsBqn3EhwN4Idk%2Fcasestudies-shrine-grid-1a.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 水平格線

Shrine 的手機和平板排版採用水平滑動的格線。欄位、間距和邊距都是從左到右，並不是我們一般常用的上到下。

![Shrine 水平格線](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1bzYYXTPp9EKoZ_D98LDkdpmmekDIUAK1%2Fcasestudies-shrine-horizontalimagegrid.png "Shrine 水平格線")

### 顏色

Shrine 的顏色主題是單色系的，將主色調 Shrine Pink 使用不同亮暗做變化。底層使用 Shrine 的主色調 (Shrine Pink 100)，下方購物車使用次色調(Shrine Pink 50)。主要內容在白色背景並使用深色 Shrine Pink 900 作為文字和圖示的顏色。

![Shrine 色調](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1PqdLRDr8EpuHTdhT9f9HtIzxzGOjecJP%2Fcasestudies-shrine-color-1.png "Shrine 色調")

1. Shrine Pink 100 用在 “add to cart” 來凸顯按鈕。
2. 標籤(chips)外框使用 Shrine Pink 100，用深色的 900 來代表被選取的標籤。

![Shrine Pink](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1ocq8e1RNTZOmpP2MXjRF1rAB4hk9nw4a%2Fcasestudies-shrine-colorcomponents.png "Shrine Pink")

Shrine 使用圖像處理來表示狀態的變化(例如被選取的狀態)，或是背後的半透明遮罩。客制的圖像是一種加強 Shrine 品牌的方式。

![Shrine 被選取的狀態](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1Vzs31NWpv0YlZ2ejSZl6PEYqofYiNSFM%2Fcasestudies-shrine-color-imagerytreatment-duotone.png "Shrine 被選取的狀態")

![Shrine 半透明遮罩](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F176hAMN80PxLeqkcw4zypAG5RZJFEIlq3%2Fcasestudies-shrine-color-imagerytreatment-patternscrim.png "Shrine 半透明遮罩")

> 心得：使用水平格線設計我覺得是很大的挑戰，因為目前大宗的使用方向還是垂直為主。不推薦水平格線的設計，除非是遊戲、活動或各分類展示等特殊需求，否則可慮使用者需長期瀏覽的狀態下，水平左右滑動並不方便。

# 文字與圖示



Shrine’s type scale provides the typographic variety necessary for the app content. All items in the type scale use Rubik as the typeface, including Rubik Light, Regular, and Medium.

## 參考資料

* [Material Studies - Shrine](https://material.io/design/material-studies/shrine.html)