---
title: Vue 3 Studies - Suspense
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2022/01/14
updated: 2022/01/14
---

Suspense 這個元件是 Vue 參考 React 那邊所得到的靈感。當我們打開頁面時，通常會有多個非同步的 API 呼叫，出現 Loading 中，等到資料都到齊，才會看到完整的頁面。以往都是用 v-if 來判別 data 是否都到齊，在 Vue 3 中就能用 Suspense 元件來做這件事情，且多個非同步的 API 也能自動判別，非常省時省力。

<!--more-->

# Suspense 範例

我們先來看這段程式碼。

```html
<template>
  <Suspense>
    <template #default>
      <!-- Put components here, one or more of which makes an asychronous call -->
    </template>
    <template #fallback>
      <!-- What to display when loading -->
    </template>
  </Suspense>
</template>
```

Suspense 元件內，用 template block 區分要顯示的內容， default 為主要內容，在這裡串接 API， fallback 則是顯示 Loading 的畫面。我們放一個簡單的範例如下。

```html
<template>
  <Suspense>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
  import Event from "@/components/Event.vue";
  export default {
    components: { Event },
  };
</script>
```

Event.vue 大約長下面這樣。

```html
<template>
  ...
</template>
<script>
  import useEventSpace from "@/composables/use-event-space";
  export default {
    async setup() {
      const { capacity, attending, spaceLeft, increaseCapacity } = await useEventSpace();
      return { capacity, attending, spaceLeft, increaseCapacity };
    },
  };
</script>
```

注意！這邊 setup 有用 async，因為 useEventSpace 裡面有接 API 。如此一來 Suspense 就能知道若 API 還沒回傳 data 的時候，換先顯示 Loading 的字樣。若想放多個非同步的 API 也能自動判別，非常方便。

# 當 error 發生要怎麼處理？

如果 API 出現 error 要怎麼處理？我們可以再加一層簡單的 v-if 防呆，並使用新的 lifecycle hook 監聽錯誤的訊息，適當的傳出來，程式碼大約長下面這個樣子，這樣前端的使用者就不會接到 console 的錯誤。

```html
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
  import Event from "@/components/Event.vue";
  import { ref, onErrorCaptured } from "vue";
  export default {
    components: { Event },
    setup() {
      const error = ref(null);
      onErrorCaptured((e) => {
        error.value = e;
        return true;
      });
      return { error };
    },
  };
</script>
```

# 延伸應用：Skeleton Loading Screens

像外面常看的 UX 應用 Skeleton Loading，就可以跟 Suspense 結合，放在 fallback 的地方，非常適合。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)