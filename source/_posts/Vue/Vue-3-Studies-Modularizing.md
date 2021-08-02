---
title: Vue 3 Studies - Modularizing
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2021/08/02
updated: 2021/08/02
---

使用 Composition API 有兩個主要的原因，一個原因是把 component 依據功能重新組織，另一個主要原因是這些程式碼可以跨不同 component 重複利用。我們來看一下範例。

<!--more-->

這裡有個範例如下。

```html
<template>
  ...
</template>
<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"])

    const spaceLeft = computed(() => {
      return capacity.value - attending.value.length;
    });

    function increaseCapacity() {
      capacity.value++;
    }

    return { capacity, attending, spaceLeft, increaseCapacity };
  }
};
</script>
```

如果把上述的功能包成一個 function ，會長下面這樣。

```html
<template>
  ...
</template>
<script>
import { ref, computed } from "vue";
export default {
  setup() {
    return useEventSpace(); // <--- Extracted a function
  }
};

function useEventSpace() {
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"])

    const spaceLeft = computed(() => {
      return capacity.value - attending.value.length;
    });

    function increaseCapacity() {
      capacity.value++;
    }

    return { capacity, attending, spaceLeft, increaseCapacity };
}
</script>
```

就是把 setup() 裡面的東西整個移出 export default，變成獨立的一個 useEventSpace function。

假設我們把 useEventSpace 移到外面獨立一隻 use/event-space.js，會長下面這樣。

```js
import { ref, computed } from "vue";

export default function useEventSpace() {
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"])

    const spaceLeft = computed(() => {
      return capacity.value - attending.value.length;
    });

    function increaseCapacity() {
      capacity.value++;
    }

    return { capacity, attending, spaceLeft, increaseCapacity };
};
```

再把這隻獨立的 js 引用到原來的 vue。

```html
<template>
  ...
</template>
<script>
import useEventSpace from "@/use/event-space";
export default {
  setup() {
    return useEventSpace();
  }
};
</script>
```

假設我們有另一個功能的 use/event-mapping.js 想加入到這隻 vue。

```html
<template>
  ...
</template>
<script>
import useEventSpace from "@/use/event-space";
import useEventMapping from "@/use/event-mapping";
export default {
  setup() {
    return { ...useEventSpace(), ...useEventMapping() };
  }
};
</script>
```

如此這般就能將這些功能共用到不同的 component，但是這樣看起來還是跟 mixin 差不多，不知道用了哪些變數在裡面，因為全部都被 function 包起來了。所以，最好是改成如下的方式，將這些變數都展開出來，雖然麻煩了些，但是這樣就知道有哪些變數名稱在使用。

```html
<template>
  ...
</template>
<script>
import useEventSpace from "@/use/event-space";
import useEventMapping from "@/use/event-mapping";
export default {
  setup() {
    const { capacity, attending, spaceLeft, increaseCapacity } = useEventSpace();
    const { map, embedId } = useEventMapping();

    return { capacity, attending, spaceLeft, increaseCapacity, map, embedId };
  }
};
</script>
```

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)