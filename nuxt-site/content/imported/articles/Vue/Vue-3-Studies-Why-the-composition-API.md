---
title: Vue 3 Studies - Why the composition API
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2020/06/27
updated: 2020/06/27
---

Vue 3 雖然還沒出正式版，但蠻多人對新的 composition API 有所好評。剛好官網有完整的影片介紹，所以想趁這個機會開始學習。

<!--more-->

影片網址： https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/

接下來會針對目前 Vue 2 的限制解釋並提出 Vue 3 的解決方式。

影片中提出當我們的專案越來越大/醜時，三個 Vue 2 的限制：
1. Readability as components grow：當組件越來越複雜時，程式變得越不容易閱讀。
2. Code reuse patterns have drawbacks：程式片段重複使用的方式有缺點。
3. Limited typescript support：typescript 支援上有限制。

# 比較大的組件會變得越來越難閱讀和維護

影片當中以搜尋組件(search.vue)為例。當我們搜尋組件想要寫兩個功能：一個功能是搜尋關鍵字結果(Search)；另一個功能是對搜尋結果做排序(Sorting)。在 Vue 2 的作法，我們可能把同一個 Search/Sorting 的功能將邏輯散佈在各個程式區塊，有可能在 components, props, data, computed, methods, lifecycle methods等。當其他開發者想要閱讀時沒辦法一眼看到功能的所有邏輯，而是需要掃描散佈在各片段的程式碼才能了解特定功能的邏輯。所以 Vue 3 要解決的是如何把同一功能的邏輯統一放在一個地方，讓閱讀上更容易。

Vue 2 將功能邏輯散佈在多個程式碼片段
![Vue 2 將功能邏輯散佈在多個程式碼片段](https://lh3.googleusercontent.com/pw/ACtC-3d96-4SjMB_p4-hWeSPOVnlfgcOsXoIk9PYGTL6S0mDMzbuTx3VdH5294bQdrYbITjYCyuXrsTpWXjng2H_aPb83y1kHzovuzE7dEXjhMyYB3ZZHSEJfQBgLfo_YSvaDoBQ7f2B0SP-8vZJgZYko4RihA=w2208-h1242-no?authuser=0)

Vue 3 的解決方式就是推出 composition API ，將兩種功能的程式碼片段先集中成兩個區塊，放在 setup 函式中，且他完全是選擇性的。第一次看到可能會想說：這樣是否表示我們會產生一個超巨大的程式碼在 setup 函式中嗎？答案是，不。我們接下來看看他是如何解釋的。
![composition API setup](https://lh3.googleusercontent.com/pw/ACtC-3c1z4-Cy7mQ1itIsSDBCv2ydlMKfl0Uq-6ITtVczzASfVgXJ57CA66HdLv5kVdhx0RUjbRjd7Sd4UY9WLnMCu7DJa4ezAZo_QViPKXCht75yC_mzGDUS1CO3c6z193-pudoaXPEvR6eeTx5yxP60yszFg=w2208-h1242-no?authuser=0)

我們可以把兩個功能先寫出來各自的函式，並在setup 函式 return 出來。（這裡為了方便解釋寫在同一頁，實際上會另外寫出來 js 檔案，要用的時候再引入）
![composition API setup](https://lh3.googleusercontent.com/pw/ACtC-3fXgoNhS2-gvKQhmE2H80cBJmEXXfzqcm_vru2fzbhqAfcocu5NGjXvHNj0c9GRoR0wZvwXeCNLEV_o09u6Ziwpuv_PYNGOYWjHoC0w-yFH1fixvTO22LG6HLKj4ms4rppxbuC4h2upzsn0z-5FsjZgAA=w2208-h1242-no?authuser=0)

現在，程式碼片段變得更符合邏輯閱讀，但這不代表組合函式會取代組件父子關係，我們還是會先將組件父子關係區分出來，各組件的功能再以組合函式來表示。
![composition API setup](https://lh3.googleusercontent.com/pw/ACtC-3eWW8YTjK_GIX91w9UCF8IRSX8PMQMkUKzPjMIU99ckLFRpZBjGh_jsTK4OsmUp2cDOpmVaiRHhsLq9UQOO32SyyhZ63zpMjSbqkWOiWT3Wrsilnx0BnxwbnieulwLw558MESaXY8P3fZEh2jbl8orP0A=w2208-h1242-no?authuser=0)

# 找不到完美的方式能在不同組件中重複使用相同邏輯

影片中提到在 Vue 2 有三種方式可以在不同組件中重複使用相同邏輯。

1. Mixin：第一種是分別拉出來 Search/Sorting 各自的mixin，並在搜尋組件中引用 mixins 加入。
	- 優點：
		- Organized by feature：優點是可以依據功能組織各自邏輯。
	- 缺點：
		- Conflict prone：因為有各自的data等屬性，容易發生衝突。
		- Unclear relationship：不清楚兩者 mixin 關係是否會互相影響。
		- Not easy reuseble：不容易重複使用。
    ![Mixin](https://lh3.googleusercontent.com/pw/ACtC-3cuCe0z_fEa50pIodm4hYC8od1Bs0objS-283HeyY-RdgKwAi8wJ6oYMynQBizr66oyqMXsUlQXkmGTttljZusYWrwuQ0IBi1PXJIwL0vY7wIJfrYLsMZJBsubn9bd9kTymExoN00egnmSqzIk-mBxuEQ=w1708-h1280-no?authuser=0)

2. Mixin Factories: 第二種方式是使用客製版本的mixin傳入對應的config。
	- 優點
		- Easily reusable：容易重複使用。
		- Clearer relationships：將兩者關係釐清楚。
	- 缺點
		- Weak namespace：命名方式不嚴謹。
		- Implicit property additions：內部添加隱藏的屬性。
		- No Instance access at runtime：Vue 運行時並不會動態生成。
    ![Mixin Factories](https://lh3.googleusercontent.com/pw/ACtC-3dJvx5OUIZEZiJR-VBBCJjDWWDlF3EfYoqT6Hruat6fvOSd8Ibv-KsrUrk2lR0sgf9ZO9CoWJ97GXELgWelH-GaTQA9VTV9Kwebx-IZnvQbSgZL4wrotK66ahn8esXsS3U3MbMWFK2drXSyN_uBBuf0LA=w1708-h1280-no?authuser=0)

3. Scope slots：第三種是將 Search/Sorting 分成兩個 Vue 組件，並用 slot 的方式做巢狀使用。
	- 優點
		- 解決 mixin 的問題
	- 缺點
		- Increases indentation：增加縮排。
		- Lots of configuration ：更多的設定值。
		- Less flexible ：彈性變小。
		- Less performance ：性能變差。
    ![Scope slots](https://lh3.googleusercontent.com/pw/ACtC-3djhWxIL2elD1Nlz60lvLyec2aDpm13uSxYz3Lx7JnYYj3lYyPinDfLDesY7WwXQkW3GzT93XID13mEJCoXSK98H4KVtCVhItKl5C9zMSYhhamHQAGlUeTJZyIoTcxGsK007IzPyh3pfD26VdIEsnEmVA=w2208-h1242-no?authuser=0)

這三種都有他的缺點，所以影片提到 composition API 使用上可以解決上述問題。就是將 Search/Sorting 兩個 composition function 各自分出 js 將邏輯寫出來。在 Vue 組件設定變數將其各自做引用函式並設定所需要的參數。
- 優點
	- 程式碼精簡
	- 和平常的 js 使用差不多
	- 使用上非常有彈性
	- 友善的使用方式
- 缺點
	- 要熟悉新的程式使用寫法
  ![composition API](https://lh3.googleusercontent.com/pw/ACtC-3dPPnmhsRLsSHI33vrnqj_QB8CScnf9jLwa0iM5iJfRJVhM0IW5Hs4ommjgXhu5larti1rTtA46wmwxMk2rmoQ-9kjp2CRwx5UA-s9KpjOzmH1kEQkgWXPT8YzlzJfD1_YmBF1TuQJV4wVnZiVPfspgig=w2208-h1242-no?authuser=0)

整體來說，composition API 都是大大提升組件的邏輯組織寫法，讓開發者能更快進入狀況，用更輕鬆精簡的方式達到開發目的，我個人是非常看好且開心的，畢竟一個工程師要面對的專案實在太多，要省時省力才有效率。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)
* [Why the Composition API](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/)