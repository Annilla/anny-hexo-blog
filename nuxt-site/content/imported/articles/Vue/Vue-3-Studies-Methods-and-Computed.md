---
title: Vue 3 Studies - Methods and Computed
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2021/05/05
updated: 2021/05/05
---

今年四月信箱發現 Vue Mastery 又開放幾天全部課程免費的消息，所以趕快把之前沒看到的 Vue 3 Composition API 給補看起來！！

<!--more-->

# Methods

假設我們已經有一個 capacity 是 Reative Reference。現在要加 Methods 讓他每按一次加1。

```html
<template>
  <div>Capacity: {{ capacity }}</div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);
    return { capacity };
  }
};
</script>
```

原本 Vue 2 的寫法是

```js
methods: {
  increase_capacity() {
    this.capacity++;
  }
}
```

那在 Vue 3 只要把他想像成一般的 Function 再 return 出來即可。

```html
<template>
  <div>
    <p>Capacity: {{ capacity }}</p>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);

    function increaseCapacity() {
      capacity.value++;
    }

    return { capacity, increaseCapacity };
  }
};
</script>
```

> 注意！capacity 是 Reactive Reference，是一個物件封裝他，所以對物件做增加的動作是不管用的。我們需要針對裡面的 `value` 增加才行。所以這邊是對 `capacity.value` 做增加的動作。

![Methods example demo](https://lh3.googleusercontent.com/pw/ACtC-3eePBLmrt4IQp_TvDl8fYubwomjax1mEfvpNZpsUpQeSCzzTCXBkmf8olbQvtticR4nebg9JC8ABlYjKKg5iP9B7_YzI194PYdnkYe8g46tKdN9z180mMPO6rsQHcG6oSdGMygjAx40xwbWJxef1jvlRA=w480-h392-no?authuser=0)

# Computed

我們繼續用上面的例子加上一組人名陣列清單，並用 computed 計算剩下的容量有多少。

```html
<template>
  <div>
    <p>Capacity: {{ capacity }}</p>
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
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"])

    function increaseCapacity() {
      capacity.value++;
    }

    return { capacity, attending, increaseCapacity };
  }
};
</script>
```

如果是 Vue 2 的寫法是

```js
computed: {
  spaceLeft() {
    return this.capacity - this.attending.length;
  }
}
```

在 Vue 3 則是呼叫 computed 函數即可。

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

![Computed example demo](https://lh3.googleusercontent.com/pw/ACtC-3fFxWw8z3ITa_PuT-Wum9tlxRQlau5cizLX3TpRRG6cw8ZQvxKS3kveaXRSz9q9qiSZfVwbH6lWDYQkoaflalWHj0qYXX2EluvLJ50gog-WF77pzVVQWX9Zat1UmT6HVLXv489U6fEqa0fHDU6crN3Q8A=w602-h716-no?authuser=0)

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)