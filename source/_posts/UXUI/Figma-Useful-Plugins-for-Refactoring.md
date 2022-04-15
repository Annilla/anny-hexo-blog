---
title: Figma Useful Plugins for Refactoring
categories:
  - UXUI
  - Figma
thumbnailImage: https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/hoz3ba7owjjzrg9dxrqi
thumbnailImagePosition: left
coverImage: https://miro.medium.com/max/1400/1*BfTmRqrzxB90_e9i1-cj2g.png
coverMeta: out
tags: [Figma, UX, UI]
date: 2022/04/15
updated: 2022/04/15
---

最近 Figma 功能換到團隊的訂閱制，終於可以使用 Library 的功能了！但之前還沒換過去之前，檔案內的 Components 都是在 Local 原檔案中，現在該是 Refactor 整理的時候了，把共用的 Components 改用 Library 的，並重新整理檔案。此篇紀錄其中碰到的問題並寫出使用了哪些 Plugin 來改善 Refactor 的效率。

<!--more-->

# 找出哪裡用了 Local Components

之前文章有介紹過 Locator 這個 Plugin，但若有大量 Components ，每個點右鍵等他跑的時間會拉很長，很沒有效率。後來找到一個更好的套件叫 [Instance Finder](https://www.figma.com/community/plugin/741895659787979282/Instance-Finder)，他只要跑一次之後，就會把整個檔案的內容記住，所以只要開著視窗，選取要找的 component ，點擊 find 按鈕就可以很快地列出來，而且他有上一個下一個的按鈕，可以快速的瀏覽各 component 位置，非常方便。

![Instance Finder](https://s3-alpha-sig.figma.com/plugins/741895659787979282/534/8ebee8c4-63f1-4b5b-9935-97ebb35df46c-cover?Expires=1650844800&Signature=LzzmLj0XhilqL7RPnqceLi75Hk4hJtfI7jH9sOSbPS1KPTIhqGt1RPArsOhFX45GrH5UcKd9sHXxAuuNga3Wc-H2~WTjaHB8jhCXxWuLEBTI6McuC4MJMFzUTR88KyWvrwkcwobmweNslTRMg5cbUfdytqzBCymD7I07bYMRpmpy-MRYSwOd4sWF7eHSvf9UOl5l9~30UIvauqH7p7sND4FOpPlNaTE2vdtlmvejSOmiTWUdSeRmqA-MBENtMbudomQz6wSXLqlFLlu1p02ylE0Ot4iATgIDs7v1VQ6T0~nAcT3t~NoZiHtQx8E5GhAY8icfAwdV6mOCs40Xvjxx0A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)

# 替換成 Library 的 Components

替換 Components 有兩種情境，一種是他本身就是 component 只要換成 Library 的，另一種是他還不是 component，只是普通的 Group 要怎麼做替換？以下分這兩種情境解釋替換方法。

## Local Components 替換 Library Components

因為本身已經是 Components，所以用上述的 Plugin - Instance Finder 找出後，點找出來的母項目即可全選相同的 instance ，並用 Figma 右側 Design 視窗替換 Library Components 即可。

![Figma 右側 Design 視窗替換 Library Components](https://help.figma.com/hc/article_attachments/360091725133/Instance_swap_30fps.gif)

## Group 替換 Library Components

另一種比較棘手的情況是要替換的標的物不是 component，只是一般的 Group。這個時候 Figma 右側 Design 視窗也不會跳出來給你選，那該怎麼辦呢？我找到了另一個超好用的 Plugin - [Team Library Component Browser](https://www.figma.com/community/plugin/813970431341620710/Team-Library-Component-Browser)，只要將此套件先去 Library 的檔案按 `Save or update this library data`，然後去你要執行的檔案把視窗叫出來，就可以選取要替換的 Library Component 直接按 Swap 做替換，其中裡面還有一些小設定可以調整，看是要保持原始大小之類的，就留給各位玩玩看囉～

![Team Library Component Browser](https://s3-alpha-sig.figma.com/plugins/813970431341620710/26936/896b8404-d633-477e-b791-17d5e451c7d6-cover?Expires=1650844800&Signature=gItyd~3boSUPCQ0KwD0CQNu08vM2tiDrCZsFqlRrjVNLl7FMirV9lgCNVTcYiRSbMXeDenD~3cBpGT2dkBwe8W0OkHlBTOBLa2bHDFDRLV9Be9AERLzELw6ajVtok2~morNFEtJSSIli0VKuqhsSN-bAZZbP-Klp-FgDGD9aMXZ7IzWP6Cz7GV933pdawj~~lUnH-mlmfuwXRrhL6ZRtBebrOto~jWVLL1qB3SGKb2xBj8cUtRmowSZoPIvt00MbdfcQsYvV1cmfHxZdZh56ynrnQ0gS0lSi9m4p-1uokitV00TC6sNVbSYvj~KQ0as6aF~TGBXrCHZ~zAjd3rXT5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)

# 快速編排大量的 Artboards

當專案長的越來越大後，大量的 Artboards 會變得不易維護，這時候就需要 Plugin 來快速一鍵編排了。Plugin - [Organize Layers](https://www.figma.com/community/plugin/786286754606650597/Organize-Layers) 使用上就非常便利。但使用前提是每個 Artboards 的名稱要依照層次的方式命名，ex: 類別/01/1-xxxx，第一層通常放分類，第二層依照頁面取流水號，第三層開頭放的是頁面第幾步驟，xxxx 放描述，如此命名有個好處是，當要做 prototype 的時候，list 會直接依照前面的命名方式排序，能快速選到要 navigate to 的頁面。名稱的命名好之後，開 Plugin 的視窗就能選擇要使用第幾階層來編排 Artboards，也可以設定 x, y 的間距，最後點選按鈕一鍵編排，之後只要新增的頁面也按照一樣的方式命名，按鈕一鍵就能幫你排的舒舒服服，好開心～

![Organize Layers](https://s3-alpha-sig.figma.com/plugins/786286754606650597/5647/352fce3d-b02d-47f5-960d-68458702ee42-cover?Expires=1650844800&Signature=OiDG34Lcmk4sNLqZ71LN0CmeUgbUBD6OCzGp1ZglRvtSqJu5V1zcPZV9OiDsnbEwqLI2633wvk8BoncCSUjdVnjiteqpRX4JWHlWTg0cLEpL3dZCDdMWZhudNCgcd69uA9roElA4LStn9gkLJgDdSgHGj0BMh8flp27qGOMd--jEOub4GFJfQIElGFsoNggSbwQodErSONS~7kYox1cWIEvZ-z9rTKHYIQhCbHJYGxoDzP1Ir7e4piMMAKJjGyLQFm5lmD7jooq66KVoGvXveu6poX5C96drB-LSLU1s7dFiLk1ey-Wi1EgK2qfyWQCkrNQP~SrZy7u0OS06CnkpRA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)

# Reference

* [Figma Plugin - Instance Finder](https://www.figma.com/community/plugin/741895659787979282/Instance-Finder)
* [Figma Plugin - Team Library Component Browser](https://www.figma.com/community/plugin/813970431341620710/Team-Library-Component-Browser)
* [Figma Plugin - Organize Layers](https://www.figma.com/community/plugin/786286754606650597/Organize-Layers)