---
title: Vue 3 Studies - Sharing State
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2021/12/10
updated: 2021/12/10
---

當我們在呼叫 API 後，通常會有很多後續的功能接續運作，例如：更換狀態、顯示錯誤訊息、使用 try catch blocks 等等。來看看這個搜尋範例是怎麼把程式碼抽取出來。

<!--more-->

# 搜尋範例

我們先來看這段程式碼。

/src/App.js

```html
<template>
  <div>
    Search for <input v-model="searchInput" />
    <div>
      <p>Loading: {{ loading }}</p>
      <p>Error: {{ error }}</p>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";

export default {
  setup() {
    const searchInput = ref("");
    const results = ref(null);
    const loading = ref(false);
    const error = ref(null);
    async function loadData(search) {
      loading.value = true;
      error.value = null;
      results.value = null;
      try {
        results.value = await eventApi.getEventCount(search.value);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }
    watch(searchInput, () => {
      if(searchInput.value !== "") {
        loadData(searchInput);
      } else {
        results.value = null;
      }
    });
    return { searchInput, results, loading, error };
  }
};
</script>
```

如果在瀏覽器看起來會是這樣。

![搜尋範例](https://lh3.googleusercontent.com/pw/AM-JKLXQs69TPoX7GprbmZBG6Y68BrYLrm3cb6egPdaqAiNEcOc37JZKkYsxrhLBv9d7V2jR1u-9IVjRYsLb2NChLCFZExtDrAw7YgKKWvQdz3s0-tPNlcZY0ym985SowsAYQ3974n1AwsdwdR_wAuhTrT-ewg=w1420-h995-no?authuser=0)

# 程式碼抽取

接下來我們試著把 api 這段抽取出來。

composables/use-promise.js

```js
import { ref } from "@vue/composition-api";

export default function usePromise(fn) {
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const createPromise = async (...args) => {
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(...args);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }
  return { results, loading, error, createPromise };
}
```

然後我們把抽取出來的程式碼，替代回原本的 App.js。

```html
<template>
  <div>
    Search for <input v-model="searchInput" />
    <div>
      <p>Loading: {{ getEvents.loading }}</p>
      <p>Error: {{ getEvents.error }}</p>
      <p>Number of events: {{ getEvents.results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";
import usePromise from "@/composables/use-promise";

export default {
  setup() {
    const searchInput = ref("");
    const getEvents = usePromise(search =>
      eventApi.getEventCount(search.value)
    );
    watch(searchInput, () => {
      if(searchInput.value !== "") {
        getEvents.createPromise(searchInput);
      } else {
        getEvents.results.value = null;
      }
    });
    return { searchInput, getEvents };
  }
};
</script>
```

這樣就完成程式碼的抽取替換囉～另外要注意的事，如果用 Vue 2 的話，html 的部分都要再多加 .value 才會抓到值，但如果是直接用 Vue 3 的話，上面程式碼就能直接正常運行。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)