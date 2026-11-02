---
title: Vue 3 Studies - Lifecycle Hooks
categories:
  - Vue
thumbnailImage: https://vuejs.org/images/logo.png
thumbnailImagePosition: left
coverImage: https://cythilya.github.io/assets/vue/2017-05-21-vue-logo.png
coverMeta: out
tags: [Vue]
date: 2020/08/16
updated: 2020/08/16
---

因為上一篇課程後連續四個影片都要付費觀看，所以我們這篇先跳著寫 lifecycle 的部分，等之後有其他免費的學習資源再來補上。

<!--more-->

影片網址： https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks

# Vue 2 對應 Vue 3 lifecycle composition api 用法

我們先看官網有一個對照清單如下：

- beforeCreate -> use setup()         
- created -> use setup()         
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- activated -> onActivated
- deactivated -> onDeactivated
- errorCaptured -> onErrorCaptured

左邊是原本 Vue 2 的用法，右邊是在 Vue 3 composition api 的用法。基本上就是把原來的名稱前面加上 on 就可以使用。

![Lifecycle composition API](https://lh3.googleusercontent.com/pw/ACtC-3ft9l-k-1pd4JkQjVlC-bnM-m3pvsRu7NZ0zTlj4Vcw9s3St3gU-rTDnMzJOEoinytoqOzgS-r99OJejTmGLGfj8fANMBuMevPJ0dnTOVemWGXTU2V40mW7eJ5aoUaG7q16SgIODZXBPO5prboaNxALgw=w1708-h1280-no?authuser=0)

那為什麼前面兩個 beforeCreate, created 被劃掉了呢？因為這兩個要執行的事件其實直接寫在 setup 裡面是一樣的意思。下面有流程圖解釋 beforeCreate 相當於在 setup 之前，created 相當於在 setup 之後，那麼就直接照順序寫在 setup 裡面就可以了，所以 composition api 才不需要 beforeCreate, created。

![beforeCreate, created](https://lh3.googleusercontent.com/pw/ACtC-3eTC6jk4WewmO7mihl3WZU2YvgRyQcdzwFrfcpK9cBS4f4_NnaJtXoxxowNYNHyIN9cezCFQVf1diwlPZXhqrxKuVtP24RM8hse2TtQzsKTTrRgYiCEmKHYSZnvSBy_ZveiM4GA3EAcdWwLZMtTW5IQKw=w1708-h1280-no?authuser=0)

另外有兩個 lifecycle 在 Vue 3 更換了名稱，分別是 beforeDestroy, destroyed 換成 onBeforeUnmount, onUnmounted。影片老師有特別詢問 Evan You 為什麼要更名，作者的回答是為了讓命名更符合實際情形。因為 Vue 的動作就是不斷將組件做 mount, unmount。

![onBeforeUnmount, onUnmounted](https://lh3.googleusercontent.com/pw/ACtC-3caWXrHlW3AfJ-4C-zzXCPwETmJSvwfUc9MHMh06CZwOyLl_P8mctmQfbfE0ai5a3UW3jkNr9txlfFy05pIzJ637flTsTu66zHLrtoQmv0lsdyYig-VnkDrXMfKjbkKktf0qhGuSr7On_3dCEPKD6ddoA=w1708-h1280-no?authuser=0)

# Vue 3 composition api 新增的 lifecycle

Vue 3 composition api 另外新增了兩個可以幫助開發者 debug 的 lifecycle。

* onRenderTracked: 當此組件第一次 render 後的每次 render 都會追蹤。可以觀察有哪些動作造成此組件 render。

* onRenderTrigger: 當此組件重新 render 會觸發。可以觀察是哪些動作促使此組件重新 rendor。

![Vue 3 composition api 新增的 lifecycle](https://lh3.googleusercontent.com/pw/ACtC-3ciF0tGZVnnmaQ1skBBPrgMVxAcbq1W23ml9VyhOdh3ft41WbJt_-ZGNJtmxZo-E2IC2nDy6a9zHk-cXIOQN6lYT0y_C_U3Sx_SByjo0hfbJaBv26r19Pspy7NCnr9zOXJtIfvNjnWqg8C_TFpDXXGIhQ=w1708-h1280-no?authuser=0)

為了實際了解這兩個新增的 lifecycle ，我們在 [github](https://github.com/Annilla/vue3-lifecycle-practice/tree/v1.0) 開個測試範例來試試。

因為 Vue 3 尚未 release，所以先安裝 next 版的 vue cli (@vue/cli@4.5.2)。

```cmd
npm install -g @vue/cli@next
```

安裝完後執行

```cmd
vue create <你的專案名稱>
```

選擇第二個選項 `Default (Vue 3 Preview)`。

![Default (Vue 3 Preview)](https://lh3.googleusercontent.com/pw/ACtC-3d50SqpyRc0dZK84rx39FszdpPDossKfclETJyVzexPZq-xRSPYdHw8OpM6Phpz8iQvpmRxAKMvucn-aeyK1_1PQMuhKBjjMJ7AUOrh-qJXI_iL3WZjAi1zxY1GPuolbvT7SG1LSz85K2H7wBv9xD8Nsg=w1860-h858-no?authuser=0)

預設專案會產生一個主要的 App.vue 裡面包含一個子組件 HellowWorld.vue，為了觀察新 lifecycle 的變化，我們將 App.vue, HellowWorld.vue 修改如下。

目標是在 App.vue 加一顆按鈕，當使用者點擊按鈕後，按鈕上顯示被點擊的次數會加一，並將HellowWorld 傳入的 msg 後面也加上被點擊的次數。藉此觀察 lifecycle 被觸發的情況。

App.vue

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button @click="addcount">Re-render App {{ count }} times</button>
    </div>
    <HelloWorld :msg="`Welcome to Your Vue.js App ${count}`"/>
  </div>
</template>

<script>
import { ref, onMounted, onRenderTracked, onRenderTriggered } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const count = ref(0);
    let addcount = () => {
      console.log('---------------------------------');
      console.log(`Click button ${count.value +1} times`);
      console.log('---------------------------------');
      count.value++;
    };

    console.log('---------------------------------');
    console.log(`Setup function start`);
    console.log('---------------------------------');

    onMounted(() => {
      console.log('App.vue mounted!')
    });
    onRenderTracked((e) => {
      console.log('App.vue onRenderTracked!', e)
    });
    onRenderTriggered((e) => {
      console.log('App.vue onRenderTriggered!', e)
    });

    return { count, addcount };
  }
}
</script>

<style>
...
</style>
```

HellowWorld.vue

```html
<template>
  ...
</template>

<script>
import { onMounted, onRenderTracked, onRenderTriggered } from 'vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    onMounted(() => {
      console.log('HelloWorld.vue mounted!')
    })
    onRenderTracked((e) => {
      console.log('HelloWorld.vue onRenderTracked!', e)
    })
    onRenderTriggered((e) => {
      console.log('HelloWorld.vue onRenderTriggered!', e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
...
</style>
```

當我們啟動應用後可以看到一開始的 console 如下。

lifecycle 觸發順序為：

1. Setup function start -> 執行 setup()
2. App.vue onRenderTracked! -> App 開始 Render
3. HelloWorld.vue onRenderTracked! -> HelloWorld 開始 Render
4. HelloWorld.vue mounted! -> HelloWorld DOM 生成完畢
5. App.vue mounted! -> App DOM 生成完畢

![一開始的 console](https://lh3.googleusercontent.com/pw/ACtC-3fXRAzTfUslKQ5JG0EWm2y76FOmGJy7nSc6XnPbRjHvf5ndbjLEST-Ca553MBwVpRny7XnnjYyPo26bIHJm9ZDqEfQTCxM4BIcuC91RAX_CBFoCsaGaPFw0TYtR_6IqO4xbpQuwuCZ-FnSrAYlyKEyrOw=w2558-h898-no?authuser=0)

當我們點擊按鈕後，lifecycle 觸發順序為：

6. Click button 1 times -> 點擊 button 觸發 addcount()
7. App.vue onRenderTriggered! -> App 被觸發 Re-render
8. App.vue onRenderTracked! -> App 開始 Re-render
9. HelloWorld.vue onRenderTracked! -> HelloWorld 開始 Re-render

![點擊按鈕後的 console](https://lh3.googleusercontent.com/pw/ACtC-3dyvAcNmo16uKAzmyTJCa4KyIv3fIzTODbvFB4JKKsystt86wIBxhm4PPut7IVV7M-vjvmSaYjZWjgzYPqORYMYB3WZJGrQXL6t9REVNKAsMHRAJcMXk37Qt3LM7LdkXjF8hnRZ656XrwvxQjhoz3S3KA=w2558-h898-no?authuser=0)

從上述的實驗可以觀察出父子組件是如何觸發 onRenderTracked, onRenderTriggered 的，未來使用上應該有助於開發者了解組件 render 的過程，實測下來感覺還蠻有趣的。

# 參考資料

* [Composition API RFC](https://composition-api.vuejs.org/)
* [Lifecycle Hooks](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks)