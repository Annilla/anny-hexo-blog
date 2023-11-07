---
title: Excel to Json by ChatGPT using Python
categories:
  - Python
thumbnailImage: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png
thumbnailImagePosition: left
coverImage: https://logonoid.com/images/python-logo.png
coverMeta: out
tags: [Python, ChatGPT, Anaconda]
date: 2022/11/07
updated: 2022/11/07
---

工作上有時會需要用到 Excel 轉 Json 的時候, 但線上工具還要先轉成 csv 非常麻煩, 想說能不能問問看 ChatGPT, 結果測試結果不錯, 他直接幫我用 Python 語言寫了程式碼, 稍微細問微調一下就能用了! 下面來說一下我是怎麼問的。

<!--more-->

# 詢問 ChatGPT

問 ChatGPT: "我有一份 excel 表格, 想要輸出成 json, 要怎麼做?"

結果會吐出用 Python 的程式碼如下圖。

![我有一份 excel 表格, 想要輸出成 json, 要怎麼做?](https://media.discordapp.net/attachments/1135775611948900472/1171267006415261806/image.png?ex=655c0e67&is=65499967&hm=78d61f197714bc1c66156146c6152095d48087bec9442ab412933e38802075a5&=&width=540&height=597)

但我想要把檔案改成電腦中的路徑, 所以我又繼續問 ChatGPT: "將檔案換成路徑位置 C:\Users\annychang\Desktop\test.xlsx", 結果他很聰明地幫我改好了程式碼如下圖。

![將檔案換成路徑位置 C:\Users\annychang\Desktop\test.xlsx](https://media.discordapp.net/attachments/1135775611948900472/1171268001727778867/image.png?ex=655c0f54&is=65499a54&hm=ef647a84a1e84df6c6ad1fbf667c3c09246cb72a9f78b5b532ca7058f9b92ebd&=&width=579&height=597)

# 下載 Anaconda 貼 Python 程式碼

有了程式碼之後就來試試看下載 Python 來執行。這邊建議下載 [Anaconda](https://www.anaconda.com/download) 框架, 因為好處是不用自己搞電腦環境, 因為公司電腦有眾多安全性防護, 所以可能套件下載就會被卡關了XD Anaconda 下載執行後會起一個虛擬環境, 裡面會裝好 Python 和大家常用的相關套件, 版本還能自由切換, 真是棒極了!! 不然在公司內網搞環境常常搞到吐血的說XDD

下載完成後點開 Anaconda.Navigator, 他會把大家常用的編輯器都列出來, 我有用過 Jupyter Notebook 和 VSCode. 感覺還是 VSCode 用起來比較熟悉. 所以我這邊就用 VSCode 展示. 注意!! Anaconda 因為是虛擬環境, 所以 VSCode 點開會是專門 Anaconda 另外安裝的設定值. 並不會執行自己電腦裡灌的 VSCode.

![Anaconda.Navigator](https://media.discordapp.net/attachments/1135775611948900472/1171270736002957372/image.png?ex=655c11e0&is=65499ce0&hm=4501d4e41e832ad8be26bcd3e358294a5e33a615cc7e4e4bf8ca63b37a00f999&=&width=1102&height=597)

# 執行測試

接下來我們把 ChatGPT 給的程式碼貼上去並執行看看, 結果就成功囉~好開心 :)

![執行測試](https://media.discordapp.net/attachments/1135775611948900472/1171272951685984296/image.png?ex=655c13f0&is=65499ef0&hm=bec51ad41196cfea587e85f50d2862daf255a77670411c02b54d25db198ed894&=&width=1102&height=597)