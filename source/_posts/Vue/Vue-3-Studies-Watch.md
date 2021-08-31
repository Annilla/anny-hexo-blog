---
title: Vue 3 Studies - Watch
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2021/09/01
updated: 2021/09/01
---

如果 Watch 在 composition API 要怎麼使用呢？我們一起來看看。

<!--more-->

這裡有個搜尋框範例，輸入 `searchInput` 文字後，API 會回傳事件數量 `results`。

```html
<template>
  <div>
    Search for <input v-model="searchInput" />
    <div>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import eventApi from "@/api/event.js";

export default {
  setup() {
    const searchInput = ref("");
    const results = ref(0);

    results.value = eventApi.getEventCount(searchInput.value);

    return { searchInput, results };
  }
};
</script>
```

如果用上面的寫法，會發現不管輸入任何東西進去 searchInput，results 的值都沒變。這是因為 getEventCount 目前只會觸發在一開始 setup 的函式，只會執行一次，後續並不會被觸發。所以，如果我們把它改成放在 watch event 裡面，就會監聽 reactive 值的改變去抓新的值，如下。

```js
setup() {
  const searchInput = ref("");
  const results = ref(0);

  watchEffect(() => {
    results.value = eventApi.getEventCount(searchInput.value);
  });

  return { searchInput, results };
}
```

如此一來，只要 reactive 的值改變，就會觸發並重新 rendor 畫面。但如果要指定只要監聽 searchInput 的話，可以改寫如下。其中 newVal, oldVal 參數可以比較值的前後改變。

```js
watch(searchInput, (newVal, oldVal) => {
  ...
});
```

如果要 watch 指定多個 reactive，可以寫成陣列如下。

```js
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  ...
});
```

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)