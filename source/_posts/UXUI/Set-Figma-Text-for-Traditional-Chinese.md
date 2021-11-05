---
title: Set Figma Text for Traditional Chinese
categories:
  - UXUI
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://miro.medium.com/max/1400/1*BfTmRqrzxB90_e9i1-cj2g.png
coverMeta: out
tags: [Figma, UX, UI]
date: 2021/04/18
updated: 2021/04/18
---

當複製貼上大量中文字在 Figma 時，你可能會發現貼上的文章段落怎麼會一個洞一個洞的呢？此篇就是要說明怎麼解決 Figma 中文缺字的問題啦～

<!--more-->

我之前從 Sketch 轉到 Figma 的時候因為大部分系統都是英文字，只有說明的部分有放中文，所以是很後面仔細看的時候才發現有缺字問題。所以我就像往常一樣找 Google 大神求助，發現官方說明分成兩大類，第一類是使用自己電腦的字體，第二類是使用網路現有字體。因為我的工作主要都是設計網頁系統，對字體沒有特別的設計需求，所以使用第二類就能解決問題了。下面兩類都會說明，依據設計師需求選擇最合適的就可以囉～

# 使用本地電腦的字體

官方說明文件：[Access local fonts on your computer](https://help.figma.com/hc/en-us/articles/360039956894)

如果是下載桌機版的應用程式，內建是可以直接用本地電腦的字體。如果是瀏覽器上編輯，就要下載 Font Helper，就可以在瀏覽器看到本地電腦的字體。但不管是桌機版還是瀏覽器，只要是使用本地電腦字體，都只有該電腦有那個字體才看得到。所以假設其他設計師開啟同個文檔，但他的電腦內沒有特定的字體，則他還是看不到正確的文字顯示。

# 使用網路現有字體

官方說明文件：[Add text in Chinese, Japanese, and Korean](https://help.figma.com/hc/en-us/articles/360040449673-Add-text-in-Chinese-Japanese-and-Korean)

如果使用網路現有字體，就能在免安裝任何字體的情況下，確認每個人都能看到一樣的文字～官方的解法就是使用 [Google Web Fonts](https://fonts.google.com/)，在 Language 的部分選擇文字語言 Chinese(Traditional)，如下圖就可以看見有 Noto 的字體，在根據需求選擇是否要使用襯線字體即可。

![Chinese(Traditional)](https://lh3.googleusercontent.com/pw/ACtC-3fNMqYSUxj8jpvTduD1k5OaPCLURzIYqDNpYvVAeFE9-r9aFsRAxVNbHT-EeVLixkSrh4uvzZT7P-VFt78mZH9dGnNq8CJKhx9o7n6wyU6rFk0Ro22mWTKRGZ_IlkNjcPBIC2y1nBFPOLugsAEjYiumQA=w2550-h1378-no?authuser=0)

我最後選擇使用 Noto Sans TC 來解決中文缺字問題。

# Reference

* [Access local fonts on your computer](https://help.figma.com/hc/en-us/articles/360039956894)
* [Add text in Chinese, Japanese, and Korean](https://help.figma.com/hc/en-us/articles/360040449673-Add-text-in-Chinese-Japanese-and-Korean)