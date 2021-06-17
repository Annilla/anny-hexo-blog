---
title: Notes on Transferring from Vuetify V1 to V2
categories:
  - JS
thumbnailImage: https://styles.redditmedia.com/t5_3nu8v/styles/communityIcon_zuqnf4r5ml111.png?width=256&s=cb1e7da96a8a20995de2e1a934d07b6a0a94958e
thumbnailImagePosition: left
coverImage: https://i.morioh.com/2019/11/01/47e709b4198f.jpg
coverMeta: out
tags: [JS]
date: 2021/02/07
updated: 2021/06/11ß
---

此篇記錄 Vuetify 從 v1 升級到 v2 所要注意的事情。

<!--more-->

# Color Theme

V2 color theme 改分成 light 和 dark 兩種模式。為方便管理，做法是另外開一隻 vuetify.js 然後再引入 main.js 做使用。

/js/vuetify.js

```js
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '...',
                secondary: '...',
                accent: '...',
                error: '...',
                info: '...',
                success: '...',
                warning: '...'
            },
            dark: {
                primary: '...',
                secondary: '...',
                accent: '...',
                error: '...',
                info: '...',
                success: '...',
                warning: '...'
            }
        },
    },
});
```

main.js

```js
...
import vuetify from './js/vuetify'

new Vue({
    el: '#app',
    vuetify,
    router,
    store,
    render: h => h(App)
});
```

# v-content to v-main

`v-content` 名稱在 V2 變成 `v-main`。

# Grid

原本使用 `v-layout`, `v-flex` 做排版，V2 改為使用 `v-row`, `v-col`，原組件功能保留，若不更動也可以。

# v-toolbar to v-app-bar

新版 V2 有另外開新組件 `v-app-bar` 讓開發者可替換掉 `v-toolbar`。兩者相比之下，`v-app-bar` 有更多新功能可使用，可參閱 [StackOverflow](https://stackoverflow.com/questions/58068147/what-is-difference-between-v-app-bar-and-v-toolbar-in-vuetify)。

* `v-app-bar` 可下 app 屬性，代表整個應用程式的最上層功能。
* 選單 icon `v-toolbar-side-icon` 名稱改為 `v-app-bar-nav-icon`。

# v-navigation

屬性 `mobile-break-point` 更名為 `mobile-breakpoint` 。

# v-list

只要是 `v-list-tile` 名稱在 V2 變成 `v-list-item`。比較常用到的地方是 Navigation 和 Menu 組件。

* `v-list-tile-sub-title`更名為`v-list-item-subtitle`。
* `v-list-item` 的屬性 `avator` 已被移除。

# v-tooltip

原本可在 `v-tooltip` 下 `slot="activator"`，改為一定要另外在內部開一個 `template` 下 slot 語法才行。可參閱 [Tooltips](https://vuetifyjs.com/en/components/tooltips/)。

# v-menu

原本可在 `v-menu` 下 `slot="activator"`，改為一定要另外在內部開一個 `template` 下 slot 語法才行。可參閱 [Menus](https://vuetifyjs.com/en/components/menus/)。另外，取消了 lazy 和 full-width 屬性。

> PS. `v-menu` 需要下 `min-width` 在 IE 瀏覽器才不會破版。

# v-snackbar

原本 `v-snackbar` 不需要下 v-slot，改為一定要另外在內部開一個 `template` 下 slot 語法才行。可參閱 [Snackbars](https://vuetifyjs.com/en/components/snackbars/)。

# v-btn 預設樣式改變

flat 屬性改為 text。

# text-xs-(align) to text-(align)

`text-xs-center` 名稱在 V2 變成 `text-center`，以此類推。

# v-chip

原本監聽 close  的 `@input` 屬性改成 `@click:close`。

# v-data-table

`v-data-table` 改的地方蠻多的，描述如下。

* `hide-actions` 改為 `hide-default-footer`
* `pagination.sync` 改為 `page.sync`
* `select-all` 改為 `show-select`
* 需要下 `items-per-page` 設置每頁資料筆數
* 每格資料改為使用 template v-slot 的方式做覆蓋，例如對資料使用 filter。參閱 [Item](https://vuetifyjs.com/en/components/data-tables/#item)。