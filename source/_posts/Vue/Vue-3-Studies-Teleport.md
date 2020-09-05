---
title: Vue 3 Studies - Teleport
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2020/09/05
updated: 2020/09/05
---

新功能 teleport 讓我們可以很輕鬆的將 HTML render 在 app 以外的地方，且不影響商業邏輯的整理，趕緊來看看吧！

<!--more-->

影片網址： https://www.vuemastery.com/courses/vue-3-essentials/teleport

當我們想要組件的東西 render HTML 在頁面不同地方該怎麼辦？

![要組件的東西 render HTML 在頁面不同地方該怎麼辦](https://lh3.googleusercontent.com/pw/ACtC-3fpkgtPhFxUWsnrtC1-2Wm18O6xBbtprQGM1uUZ-46b9F2C5DgiJ95_xz1T9QtLC1zEs_SGUdzqsh55YOIjpW6D3Bp9OR5WuZmbSQMkFh-iY_PggFpB3-az3YQ0dj7kNeHiZ7sHnta5V1uzoNPvHzrHqA=w1708-h1280-no?authuser=0)

有時 Fixed 或 absolute 的元件因為 z-index 的緣故，需要放在結尾 </body> 的前面。在 Vue 2 如果要把程式移到 #app 的外面是很困難的。

![要組件的東西 render HTML 在頁面不同地方該怎麼辦](https://lh3.googleusercontent.com/pw/ACtC-3e8n-bWxudlY_Bnee9-_YQcuGIz5XPxwsQ6DCqpPVtj18JIYQYSq5gSc6Ega_M9bMgAJp1qiGt3ZC67KHWhbpbEKFt8ZYejrqxBqsuYloisI8tHveYDvY0uxxTR2Q_V45iYunfRuJ5Q9B15TfgHaJuMSQ=w1708-h1280-no?authuser=0)

Vue 3 提供了 teleport 元件來解決這個問題。以前叫做 portal ，但為了不跟未來的HTML tag 重名，所以改名為 teleport。teleport 讓我們可以把程式寫在子組件，並用 to 的方式指定要 render HTML 的位置，如下圖。

![teleport](https://lh3.googleusercontent.com/pw/ACtC-3fQL1qJvG8zqkf9D_cBD_FCDWvhgLEka5m4EIILmWKrERGqr2aBCJcYCtY-sjVokVCIc6sASRmefWFWsm03bR40bzBYl2AsVWfxV3ezW9nTnTi_4K0T5EYvy1c058r9d80rpuHUmtNYZVRI0NmRO_RWlQ=w1708-h1280-no?authuser=0)

To 的屬性除了剛剛使用的 css Id 方式，也可以用 class或 meta attribute 的方式指定要render 的位置。如果要動態賦予值也可以直接 :to 接變數即可。

![teleport to option](https://lh3.googleusercontent.com/pw/ACtC-3eP5oZQ8-nfvhtWjwmxyyqctP7Hl79mDZAfQmI6S0aUle_PQYDqTnvziIhYr_ZGcTyHGZvdxJPtIMfgF7jIB6_xzL74vjEEVDZdtwnE_beRgJ9FCqclcFzLCyJ0bfa8Mx9RMMai8ZclPZRT5gM5ZqnTVw=w1708-h1280-no?authuser=0)

另外，我們可以設定 disabled 屬性，讓組件在 disabled true 的時候把HTML render 回原來組件 app 中。

![teleport disabled](https://lh3.googleusercontent.com/pw/ACtC-3dY9NBXMuvnCpFgRMcEcJuRA3Y7iBlull-kzaoX4E6SuhQJlbtvO74rccEln8zfDT3bU1CmOdpya1byr9Mg-VEUJhP7CRXa-Vm7LVfTs6yJsOuaCOfaHZWrJRmJ4VfA6M4z2FpvQyxviMMYp3Myb29akw=w1708-h1280-no?authuser=0)

![teleport disabled](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fteleport2.gif?alt=media&token=04d9934b-bead-49d8-b146-79a2e168e851)

![teleport disabled](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fteleport3.gif?alt=media&token=08fd1a88-377c-4397-a6df-8ba561476d25)

Teleport 還有一個好處是他會保留原組件的狀態。假設我們在 teleport 裡面放一隻影片播放，當 toggle disabled 屬性的時候，影片會持續播放不會斷掉。

![teleport disabled state](https://lh3.googleusercontent.com/pw/ACtC-3foF18BHGYLWfy1lU9o3Re5ZY0bB81I3vazlvzpsz_pn-x6pkrv9QVxjkAn-vFv7LLMiWHue5l67aVDQszigZVdka8OTZC-eKLmO8JAdr2IJ7mfLU6aOxMOZXVmXwlznWvIcy-QWI0NfCjioGh1e0_TSA=w1708-h1280-no?authuser=0)

![teleport disabled state](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fteleport4.gif?alt=media&token=d85592f8-4194-4ef8-aec7-f9b5408156dd)


那如果我們想在 disabled true 的時候不要顯示組件要怎麼做呢？其實就很直覺的搭配 v-if 就可以完成這個效果，即便是用兩組 teleport 也可以輕鬆做到。

![teleport disabled v-if](https://lh3.googleusercontent.com/pw/ACtC-3dCId188L9jHX3OIMDrpgiRBICfTC1w6BNTfYS4Kq4FdGAQcPRAdp-hRftsYkPEcp2ExQB4DxnuwICdifahLdsn66wF3hi7JiZo6mVExf61cUE38PAN2EpxOEEgKirJPoBERHckylXqpOfob5jDTKeQjg=w1708-h1280-no?authuser=0)

![teleport disabled v-if](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fteleport5.gif?alt=media&token=0cef8637-db2c-417d-b2b4-c383ec51c84d)

兩組 teleport 可以很神奇的做到誰先觸發就誰先 render 到指定的 HTML 位置，非常的順暢。

![use two teleport](https://lh3.googleusercontent.com/pw/ACtC-3eEGRXj9uQ-iapGxqPEk13hWSRi1DW23D2_sAA3Ibs6sYOMuisWPxwoZE9farf2_7cXeQ0o_ft5UD9J5D34IrOGkslyR4datkr3xXrfdv5wbgfGjaH6yPwV7TpyS_hoiQu6OcT6EW1oiNJ-QpdUtMWxTA=w1708-h1280-no?authuser=0)

![use two teleport](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2Fteleport6.gif?alt=media&token=e45bd9f9-0116-4b69-8857-3e60210f4de0)

個人覺得 teleport 的功能蠻強大的，可以將商業邏輯整理在組件中又不影響顯示的畫面，讓程式更有條理，是非常強大的功能。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)
* [Teleport](https://www.vuemastery.com/courses/vue-3-essentials/teleport)