---
title: Google Material Studies - Shrine
categories:
  - UXUI
  - Material Design
thumbnailImage: https://lh3.googleusercontent.com/NmeFZOUv61q1keVwsDGU-SYe54WbcTGUaBK4MUv2qpnOZUeBmoIQnctDY2i30Xg9Piub1aUE1hhv_YZkN6aeZ0OeEiFqYy4nQix_M2k6M5Zn1uy6_0BDfTzuD0YfrlezhMtIGlKoVprSIU8jy4204KOqm7k4QJL31RCgQZ6ruuJMX-Ad84Uoyr-4LqIjRdDKG63wsyVnef7GFtHTFFyAcwRfD0D0hqZfDL6X5xZ0IomCU1mnvbPi3kWvWJzFbhypokNRRLGiTRxemhwQmV1IltU_lmZ7S6pdwwsz8GaVW7T7WTXImkmvePksormq21WQJgFdgWndEQDMPoCtQZLarnSNMaHynca_Wi-33a1VAI78aI0jIIXKP7RYmh7JRVY9Mobf2qBFOGFkd64E7uBatZ5VZ8GHwqXWazRZ-I4pFF_medM8ecpPLRTar-KY01iKGMu3zYZ2Z9xMO_AI0x3ibI7XAR71_8hquDpzvUGffIOXqvX5r3H49xYpWMCpPpwfT7NYd3k1W24ncV6TLWE_9cj5pRsY1qCHeqdn2HfkRLBGY0czDFb5J47OwXn0vBzNOuYtWbLGauqZ-sUVSTeO15j2A9gMm3BR0ZmiFb7c1azsyO4n-_-0GCHvJckr4-iRRg7GocwbYjZZdsTlDGvf0bHXkAmhFhWY=s225-no
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

Shrine 的文字比例提供各種內容所需。所有比例皆使用 Rubik 作為字體，包含 Rubik Light、Regular和Medium。

![Shrine 字體 Rubik](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1VcsKVTP1QNKoPl52cNCHauFM0_526cdN%2Fshrinetypescale.png "Shrine 字體 Rubik")

Rubik 是非襯線字體，有著略為的圓角和多種的粗細可選擇。Rubik 是非常適合 Shrine 的字體，因為他是一種清晰、時尚、現代的字體，且他的圓角帶給人溫暖、友善和有趣的感覺。

![Shrine Rubik](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1rec2nbnEXesSPYTicV_qbE6D9jmCuO5h%2Fcasestudies-shrine-type-1.png "Shrine Rubik")

Shrine 使用 Material Design 預設的 icon 系統。這些 icon 在小尺寸的時候也能保持清晰和俐落。

![Shrine icon](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F15IUNXILSXZmMGcH2q8W_vbS8YlO91vzt%2Fcasestudies-shrine-icons-alt.png "Shrine icon")

> 心得：文字選用不同於 Roboto 的圓角字體，營造柔和感是不錯的選擇。

# 形狀和元件

元件的形狀根據他們的大小來分類。形狀分類讓你可一次性設定多個元件尺寸。形狀分類包含：

1. 小元件 (Small components):浮動動作按鈕。角落各切 4dp 斜角。
2. 中元件 (Medium components):選單。角落各切 8dp 斜角。
3. 大元件 (Large components):內容區塊。左上角切 24dp 斜角。

![Shrine 元件](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1f_u-uvDtYKjS0LEIevjDCbb1ALeH2Lks%2Fshrine-shape-b.png "Shrine 元件")

### 按鈕

1. 文字按鈕：按鈕沒有邊框和陰影。

![Shrine 文字按鈕](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1ZfoWLGKLkJhKTvX0Bfjc19jk_4teiBRF%2Fcasestudies-shrine-textbutton.png "Shrine 文字按鈕")

2. 主要按鈕：使用主色調 Shrine Pink 100，無陰影，圓角和細長形狀。

![Shrine 主要按鈕](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1dkaLfu-vECfRflUXOQDvYwFVHPmvIo_4%2Fcasestudies-shrine-buttonemphasis.png "Shrine 主要按鈕")

### 標籤 Chips

Shrine 在產品細節頁面使用可選擇的標籤。這些客制標籤有著圓角的邊線和按鈕做區別。

![Shrine 標籤](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1D0EwzNkf19srLxcQ8jLzRgYddPbDYaRB%2Fcasestudies-shrine-chips.png "Shrine 標籤")

### 頁籤

Shrine 在桌機和平板使用頁籤當作導覽列。他們使用客制顏色、文字和狀態。

![Shrine 頁籤](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1BkLfpj3qECEoZ41gclPvw1w6NaQNM6jm%2Fcasestudies-shrine-tabs.png "Shrine 頁籤")

### 導覽列和背景區塊

Shrine 使用客制的導覽抽屜在手機上。他可以透過點擊左上角的返回元件來展開導覽。
Shrine 的導覽抽屜使用客製化的文字、顏色和狀態。置中的文字是另一個客制的特點。
Shrine 的返回元件使用客制的顏色和形狀。背後圖層使用 app 的主色調，前圖層的左上角有一個客制的斜切角。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1o4ts_Rfz0X97TaapdQ-9YON6O3WzE3WZ%2Fcasestudies-shrine-backdrop-1b.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 圖像列表

Shrine 使用編排過的圖像列表來展示內容。編排過的圖像列表穿插使用不同大小（相同比例）的區塊創造有韻律的排版，且非常適合水平瀏覽內容。

編排過的圖像列表對於內容來說非常理想，因為他提升了每個商品的重點和新穎性，讓使用者不會過快的掃描內容。

![Shrine 圖像列表](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1bzYYXTPp9EKoZ_D98LDkdpmmekDIUAK1%2Fcasestudies-shrine-horizontalimagegrid.png "Shrine 圖像列表")

### 購物清單

Shrine 使用可展開的底部清單讓使用者可以簡單的到達購物車。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F10tATQMRwpM8VtaVZKbVnBv3uzaXVDEMT%2Fcasestudies-shrine-shoppingcart-1b.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

> 心得：對於圖像列表的水平滾動方式我不是很贊同，因為大多數使用者只會對前幾樣商品用比較慢的速度查看，到後面都會變成掃描式的，故意編排成眼睛不易掃瞄商品的方式，只會讓使用者變得不想用，因為他沒辦法快速的查看大量商品做比較。

# 互動

Shrine 的互動設計使用增強的淡入、較長的延遲時間來漸進式營造優雅和愉悅的環境。

### 起始畫面

Shrine 的產品 icon 動畫透過幾何的形狀變化來表達 logo。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1z58j-BuFmvDzpsnkpzPnpBENPAmy-RWb%2F01-launch.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### icon 動畫

動畫 icon 增加樂趣且引領使用者操作。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1fghiYco9yt2kaHxdvpvvG5H1Rfys8xyi%2F02-icons.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 漸變得導覽列

Shrine 的導覽漸變動畫強調淡出和長時間下達到放鬆和優雅的氣氛。時間延遲用於引起對重要元件的注意，例如購物車和結帳按鈕。在背後圖層使用交錯的淡入淡出來產生關連的效果。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1a5xbi_QBcDBvNwKFyY10vXqAE4oJlSAb%2F03-navigationtransitions.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

### 示範

當第一次增加商品到購物車時，一個示範的動畫將展示商品已放置在購物車中。

<video src="https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1SlTir4qcIH6gcKn2ZwVzAF5dA20rFtHF%2F04-tutorial.mp4" autoplay loop style="max-width: 100%; display: block; margin-left: auto; margin-right: auto;">your browser does not support the video tag</video>

> 心得：對於會動的 icon 和示範商品放入購物車這兩個設計很有興趣，若有機會的話會想要嘗試放在專案中嘗試。

總結：Shrine 這個案例除了上述提到的水平滾動設計我不是很贊同外，其他的部分都很值得學習借鏡。是個很不錯的案例，那我們下次見囉～

## 參考資料

* [Material Studies - Shrine](https://material.io/design/material-studies/shrine.html)