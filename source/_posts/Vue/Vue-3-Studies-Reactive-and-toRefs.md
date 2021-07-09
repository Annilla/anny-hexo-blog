---
title: Vue 3 Studies - Reactive and toRefs
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2021/07/09
updated: 2021/07/09
---

繼續看 Composition API 的 Reactive and toRefs。

<!--more-->

# Reactive

我們看上次的 ref 範例。

```html
<template>
  <div>
    <p>Space Left: {{ spaceLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const capacity = ref(4);
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

我們可以用 Reactive 把全部的 ref 統整成一個物件 event。
下面的程式跟上面運行結果是一樣的。

```html
<template>
  <div>
    <p>Space Left: {{ event.spaceLeft }} out of {{ event.capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in event.attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spaceLeft: computed(() => {
        return event.capacity - event.attending.length;
      });
    });

    function increaseCapacity() {
      event.capacity++;
    }

    return { event, increaseCapacity };
  }
};
</script>
```

HTML 裡面每次都要使用 event.xxx 感覺很煩，在這裡我們就可以用 toRefs ，再把他拆開成個別物件。

```html
<template>
  <div>
    <p>Space Left: {{ spaceLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>
<script>
import { reactive, computed, toRefs } from "vue";
export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spaceLeft: computed(() => {
        return event.capacity - event.attending.length;
      });
    });

    function increaseCapacity() {
      event.capacity++;
    }

    return { toRefs(event), increaseCapacity };
  }
};
</script>
```

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)