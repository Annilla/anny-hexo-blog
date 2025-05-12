---
title: Develop Plugin Using Vite & Svelte & TailwindCSS
categories:
  - Frontend
thumbnailImage: https://s3-us-west-2.amazonaws.com/ca3db/pbs.twimg.com/c4bff765d9dfb3d8c6163b1de3a8e1a78cf0f9399b5a79c35695a49813821c44.jpg
thumbnailImagePosition: left
coverImage: https://vitejs.dev/og-image-announcing-vite3.png
coverMeta: out
tags: [JS, Vite, Svelte, TailwindCSS]
date: 2023/05/30
updated: 2023/05/30
---

最近工作上需要寫一隻全新的 chatbot plugin, 因為這種 case 很吃 UI 的畫面, 所以除了 js 外一定會用到 html + css, 而且由兩個人以上共同維護。之後這個 plugin 將會接到各 website 上, 所以想要出來的成品能輕量化且高執行效率。我開始爬文比較各種 JS, CSS 框架，最終選擇 Vite & Svelte & TailwindCSS, 作為 plugin 的基底, 他們都有很完整的文件, 對於多人開發很方便。接下來針對這個組合一一做介紹。程式放在 [github](https://github.com/Annilla/Vite-Library-Test)。

<!--more-->

# Vite

若不考慮 IE 瀏覽器, Vite 在開發上比 Webpack 快上許多, 因為 Vite 會將程式直接加載到瀏覽器中跑, 這樣就不需要過多的映射過程, 速度也會快上許多.

先初始一個 vite 專案

```
npm create vite@latest
```

設定 vite.config.js, 預設可輸出 umd, es 兩種 js 格式

```js
...

export default defineConfig({
    ...
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/main.js'), // input js
            name: 'annyLib', // library name
            fileName: (format) => `annyLib.${format}.js` // output file name
        },
        ...
    },
});
```

設定 package.json

```json
{
  "name": "anny-lib",
  "private": true,
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/annyLib.umd.js",
  "module": "./dist/annyLib.es.js",
  "exports": {
    ".": {
      "import": "./dist/annyLib.es.js",
      "require": "./dist/annyLib.umd.js"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  ...
}

```

lib/main.js 為輸出 library 的地方

```js
...
import annyLib from './init';

export default annyLib;
```

lib/init.js 為起始 library 的地方, 從 constructor 傳入參數

```js
import { config } from './config.js';
...

export default class {
    constructor(setting) {
        config.setConfig(setting);
    }
    // initialize plugin
    init() {
        ...
    }
}
```

在 index.html 測試 js, 開發的時候用 module 引入直接使用, 輸出成 dist 的時候就用 window.xxx 呼叫.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script src="./dist/annyLib.umd.js"></script> -->
    <title>anny-lib</title>
</head>

<body>
    <!-- <script>
        new window.annyLib({system: 'Anny Lib'}).init();
    </script> -->
    <script type="module">

        import annyLib from './lib/main.js';

        new annyLib({system: 'Anny Lib'}).init();
    </script>
</body>

</html>
```

接下來將 Svelte 加上去.

# Svelte

選擇 Svelte 是因為他不像三大框架用 Virtual DOM, Svelte 是直接去改實體 DOM, 所以執行效率更快, 且用起來就像純 JS 一樣直覺, 學習曲線小, 最近更票選為前端最喜歡用的 framework, 所以非常想用用看!

安裝官方 vite 套件

```
npm install --save-dev @sveltejs/vite-plugin-svelte
```

修改 svelte.config.js

```js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
```

寫一個簡單的 Svelte componemt (lib/comp.svelte)

```html
<script>
	import { config } from './config.js';
    let configValue;
    configValue = config.setting;
</script>

<div class="annylib-w-24 annylib-bg-gray-200">System Name is {configValue.system}</div>
```

在 lib/init.js 引入

```JS
import { config } from './config.js';
import Comp from './comp.svelte';

export default class {
    constructor(setting) {
        config.setConfig(setting);
    }
    // initialize plugin
    init() {
        const idName = 'annyLib'
        const body = document.querySelector('body');
        const el = document.createElement('div');
        el.id = idName;
        body.appendChild(el);
        new Comp({
            target: document.getElementById(idName),
        })
    }
}
```

接下來加上 TailwindCSS

# TailwindCSS

TailwindCSS 他的特性就是有很多 utils 可以用, 可以完全不寫 style, 用他現成 class 的方式去客製樣式, 而且他可以用 prefix, 所以 class name 完全不會跟原本專案互相干擾, 可以做到無汙染又不會跑版的動作. 最棒的是他可以選擇只要輸出有用到的 utils, 所以檔案可以做到最輕量，真是棒極了XD

安裝 TailwindCSS

```
npm install -D tailwindcss postcss autoprefixer
```

設定 postcss.config.js

```js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```

設定 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./lib/**/*.{js,svelte}", // 設定會使用到 tailwind 的檔案
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: [ // 設定輸出有用到的 utils
        'backgroundColor',
        'width'
    ],
    prefix: 'annylib-' // 設定 class name 前贅詞
}
```

設定 lib/main.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

設定 vite 輸出的 css 名稱 (vite.config.js)

```js
...

export default defineConfig({
    ...
    build: {
        ...
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'annyLib.css';
                    return assetInfo.name;
                },
            },
        },
    },
});
```

> **這邊加碼應用!! 因為 tailwindcss preflight 沒辦法加前贅詞. 如果要在自己的 library 裡面用自己前贅詞的 preflight, 可以先去下載 tailwindcss preflight, 在前面全加上 `:where(.annylib-preflight)`, 然後在自己的根組件使用 .annylib-preflight 就可以達到一樣的 css reset 效果. 不過這個功能應該未來也會被加入 tailwindcss 才對 XD**

lib/main.css 加入 annylib-preflight.css

```css
@import './annylib-preflight.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

lib/comp.svelte 測試使用 class

```html
<div class="annylib-preflight annylib-w-24 annylib-bg-gray-200">System Name is {configValue.system}</div>
```

build 出來的 css, js 都非常小且就是只有專案有用到的東西才會被 output 優~超貼心 ❤

```cmd
vite v4.3.6 building for production...
✓ 6 modules transformed.
dist/annyLib.css    4.63 kB │ gzip: 1.17 kB
dist/annyLib.es.js  5.64 kB │ gzip: 2.25 kB
dist/annyLib.umd.js  4.24 kB │ gzip: 2.01 kB
✓ built in 1.63s
```

# Reference

* [Use Vite for JavaScript Libraries](https://andrewwalpole.com/blog/use-vite-for-javascript-libraries/)
* [Scoping Normalized Preflight CSS](https://dev.to/ajscommunications/scoping-normalized-preflight-css-c29)