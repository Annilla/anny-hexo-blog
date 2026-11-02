---
title: Google Material Design - Sliders
categories:
  - UXUI
  - Material Design
thumbnailImage: https://lh3.googleusercontent.com/NmeFZOUv61q1keVwsDGU-SYe54WbcTGUaBK4MUv2qpnOZUeBmoIQnctDY2i30Xg9Piub1aUE1hhv_YZkN6aeZ0OeEiFqYy4nQix_M2k6M5Zn1uy6_0BDfTzuD0YfrlezhMtIGlKoVprSIU8jy4204KOqm7k4QJL31RCgQZ6ruuJMX-Ad84Uoyr-4LqIjRdDKG63wsyVnef7GFtHTFFyAcwRfD0D0hqZfDL6X5xZ0IomCU1mnvbPi3kWvWJzFbhypokNRRLGiTRxemhwQmV1IltU_lmZ7S6pdwwsz8GaVW7T7WTXImkmvePksormq21WQJgFdgWndEQDMPoCtQZLarnSNMaHynca_Wi-33a1VAI78aI0jIIXKP7RYmh7JRVY9Mobf2qBFOGFkd64E7uBatZ5VZ8GHwqXWazRZ-I4pFF_medM8ecpPLRTar-KY01iKGMu3zYZ2Z9xMO_AI0x3ibI7XAR71_8hquDpzvUGffIOXqvX5r3H49xYpWMCpPpwfT7NYd3k1W24ncV6TLWE_9cj5pRsY1qCHeqdn2HfkRLBGY0czDFb5J47OwXn0vBzNOuYtWbLGauqZ-sUVSTeO15j2A9gMm3BR0ZmiFb7c1azsyO4n-_-0GCHvJckr4-iRRg7GocwbYjZZdsTlDGvf0bHXkAmhFhWY=s225-no
thumbnailImagePosition: left
coverImage: https://lh3.googleusercontent.com/upVaaE4cnUBQCPV5vEgNqmjtPb8CsDQzfP-UV3hXZEFzjyAFJnUIltPUDeo5Z5XJXkgz87SzpFOZX_YpbsUyyJAkKQi7zApg60uHqA=w1064-v0
coverMeta: out
tags: [UX, UI, Material Design]
date: 2020/11/07
updated: 2020/11/07
---

近期收到 Material Design 對 component 的更新訊息，趁此機會重新審視組件的使用方式。這次主要來看 Sliders。

<!--more-->

# 使用方式

Sliders 組件讓使用者在範圍內的值做選取。可用在調整音量,亮度或調整圖片濾鏡等場景。 Sliders 可以在兩端點使用 icon 來表示數值或相對的關係。使用者可以透過和 icon 互動改變 Slider 的值，像是調整音量。

## 即時效果

使用 Sliders 改變值是立即性的，讓使用者調整 slider 達到選取值的目的。Sliders 不應該在使用者回饋上有任何的延遲。

## 當前狀態

Sliders 會直接反應當前值的狀態。

如下圖，上方是連續的 slider。下方式離散的 slider。
![上方是連續的 slider。下方式分散的 slider。](https://lh3.googleusercontent.com/HyBNA4jg-7mZ_wvptdv2BFs2COwO21hYtonNR3SzbfeO6pFyvfiqxHXKpbuBq6tkI2TKeqWgtE4_Cps3P1PVDcX7HAQJXze6KDEHlA=w1064-v0)

# Sliders 值

## 可編輯的數值

![可編輯的數值](https://lh3.googleusercontent.com/CqyD0Td-8cE2mN0BnVZHhbz3NjLULgvGEQkc2i2cnc2wQ0aLyAiClOW8EcekqcgAO-PB2sBg3X4yxwg-3SY37N3LVLKgyceEDHdaDw=w1064-v0)

可調整的 Slider 值讓使用者能精確的選取需要的數字。

透過選取點選 Slider 按鈕拖曳改變值，或是使用輸入框直接輸入需要的值。使用者輸入後， Slider 按鈕要立即改變位置與使用者輸入的值相同。請注意輸入框不包含在 Slider 組件內，而是開發者需要自行開發的功能。研究發現輸入框有助於使用者選取需要的值。

## 值的順序

對於從左到右顯示的語言（例如英語），範圍的最小值顯示在左側，最大值顯示在右側。
對於從右到左的語言（例如阿拉伯語），應該顛倒值的位置，將最大值放在左邊，將最小值放在右邊。

# Sliders 種類

## 連續 Sliders

連續 Sliders 讓使用者在主觀範圍內選擇。不需要將值標示出來。

![連續 Sliders](https://lh3.googleusercontent.com/EHxl03Dqn-evX03HVg5lEDFagSPySmmkiCyGqFawQSVlPByfvLUwJVl5YMSF5MszxMtofLEainftW77JtMafBPqyVa8X3cmtPXS2=w1064-v0)

## 離散 Sliders

離散 Sliders 可通過按鈕來調整為特定值。可以用刻度的方式讓按鈕吸附對應的值。

![離散 Sliders](https://lh3.googleusercontent.com/BxmR3b_1Oa-yyXsyb_wDaX_SkLxv1W1wtRmw9IyvS8T1WYTC_gtECiYIX64p0YS6CFv55qyA57zzjxDbZjt0vo8aCS79CFN-_b7-lw=w1064-v0)

# 主題客製化

可依據主題客製化所需的 Slider 如下圖。

![Sliders 客製化](https://lh3.googleusercontent.com/cT5ehcw23NHD15r64eCvvUWYFCYQn5m04BK9ITt6sCZZE4bsHC2xNXgsxoxyqwNL1emATR9eTNM3QUGUCyZOhVLFTQBONiYweBMce1Q=w1064-v0)

目前專案中還沒有適合使用 Slider 的時機點，若往後有機會可以嘗試加入此組件。

# 參考資料

* [Material Design - Sliders](https://material.io/components/sliders)