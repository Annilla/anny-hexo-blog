---
title: React Redux Practice
categories:
  - Frontend
  - React
thumbnailImage: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png
thumbnailImagePosition: left
coverImage: https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png
coverMeta: out
tags: [JS, React, Redux]
date: 2019/07/03
updated: 2019/07/03
---

最近朋友問我關於 Redux 的問題，但我已經有兩年沒碰 React 了。所以藉此機會找了 youtube 上的[教程](https://youtu.be/OSSpVLpuVWA)，好好複習一次。

<!--more-->

## Redux

* Redux 透過單向數據流模型來管理狀態，幫助應用程式擴展規模

![單向數據流模型](https://lh3.googleusercontent.com/RCAqIMcoBNaVcnbKPXupA177bJvvluPn3GeaSEywgKbQ9tqDWh-cjeds7KbOJiCWStxVGOQLR23kbd0nRhY31T_f7BlJY3CfCXXhGGqYqTaQvZiZKwIpOkY2QBnDdNxY1rEkqvHJAuIrvfRYS5HU5PAiW-JK5baYknZXW-dn14aeptIf1OXblwufjzgNDRSP1gZqUzvG1yyKF88XxV8isg76MQ2yONKLHhrzDNu5Yx_OrcP1u95MtLR9F-mZf_ah65I-JmVYpbtfECihE7VNEn58n7vMp2CIym4JLvRTFspEzCAerEklTkI4aF7oWqcnO-2fK_IImagVK_JU5D2dqBvGA9ZB6XChXPMmbYDs-dinini_zUPgFvYFQK0ZvhW7-KIBsMIVFNNgFhhVZb3wc3mcwrwIvLlmWkqpGHevqclMLAuWlaj-1LeYndUMfE5MzcZ8CSzu7Vo3YO_MjEh8mxSzICgvz-gnIUs6ezMhTCxxSp8SXuta7SZbTcgqDDFzx1BovCKvVgxlvOOD0hNneBq3C0yPBhVAB5mcNInZhjfhWYshXmEJUPZDUiHFXRmMzeCLmoRzUU0DzE2oasezhmYktkb4aRq9XzSkE2d8b9DILg4wWP3skCXG6syozRvTQwnu6z9tZMi96CvFm6RmyKiRebM-Vro_=w922-h548-no "單向數據流模型")

* [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) 幫助開發者進行狀態的監控與偵錯

![Redux Devtools](https://user-images.githubusercontent.com/7957859/48663602-3aac4900-ea9b-11e8-921f-97059cbb599c.png "Redux Devtools")

## Redux Flow

Redux Flow 有個儲存所有狀態 (State) 的倉庫 (Store)，頁面會依據這些狀態 (State) 產生對應的介面 (UI)。當使用者對介面 (UI) 觸發動作 (Actions) 時，動作 (Actions) 會把使用者所做的事情 (payload) 傳輸給處理器 (Reducer) 做運算， 處理器 (Reducer) 處理完後變會把倉庫 (Store) 裡的狀態 (State) 更新，所以頁面就會再依據狀態 (State) 的改變產生對應的新介面 (UI)。

![Redux Flow](https://lh3.googleusercontent.com/4fNoEoelX9xGuY9ujaqlV5bkoRzFWVJ12urnnBAs17FYumoFnC31TKe4hTzfpNBzG0Rde55vjURuPCCh7JiRYcl66xMZdgiijutv6ld2sRCwNBevGcfHj5sSUmCBmU3YrVGsagAVIpmmqGiZlI4wIGniBspsMA1CtGFA7f2punGbnfQLE_NhcPU8u_3VAxc3wmJJ1hxhaf_wO_FViTMzHx43-Lk3dmT3H219W4AAUPoPFMwWiiPyzNBtRZVzIyhLb6bGGLZPojsdaf5COQNN4NqfXnwgU0dNFX44tdM-10gYftyOBzsXwiCXu0aoPCei0nRvCp_cRlCClGYC6n9rp-4aNZ8GcaelZqN5nIf0jUYqegcGDoXeruwiy8g0x8_tlX5gAayXencALfp6LjfRTrM9Yry4z_VfgQuws0Y1-zvNdERmcZcFi3xfIPAfWuSxgdn5LeTxsm3fJ9eSCWobTf8n8KLW9rEXiwkBMiIqy4k7gYF6AnLzb9jssIp_huq0gStGif0pQdC-zjk144oSFkqmh9WtQGMGwSXTMfSL0g0NWKk9MehbxzFhRVKA-UrsN961N6dJXvs91IDJk3kT2Pb4ba_rx9yRnTu1mbPEvKp0hB73vro_RC94REWLrlzgkG6i_N9ezftI2z7TciZqnyMlGvCbwLIA=w1340-h932-no "Redux Flow")

## 安裝

打下列指令安裝 React App。

```
npx create-react-app redux-tutorial
```

誒？為什麼是 npx 呢？那是什麼？
所以我去搜尋了[npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)如下。

> 除了調用項目內部模塊，npx 還能避免全局安裝的模塊。比如，create-react-app 這個模塊是全局安裝，npx 可以運行它，而且不進行全局安裝。上面代碼運行時，npx 將create-react-app下載到一個臨時目錄，使用以後再刪除。所以，以後再次執行上面的命令，會重新下載create-react-app。

意思就是他不會在你電腦安裝 create-react-app 這個項目呦～幫你產生好專案後，就會自動移除不佔空間。

接下來進入專案，安裝 Redux。

```
cd redux-tutorial
```

```
yarn add redux react-redux
```

將專案啟動檢查有沒有安裝成功。

```
yarn start
```

起成功的話會看到瀏覽器自動開啟頁面如下圖。頁面上會提示去修改 src/App.js 就會自動 reload 畫面。

![專案啟動頁面](https://lh3.googleusercontent.com/0eGc8PAV_LPbfRoLNBV1BkkTQD37TUEjNij_RlVgxSEuYZNY4DKF8uGzrLBHVf2AE4TBM8x9rWyyKuJVMinEABsb-JvpT9bkwb0NNTSKNjYcBbNBmdnZ6W_kg54n3dGO5Nn4z3ODEQeiLYYKsdOj5jwyrsb1o8hgfX6PiirzQaKCa-Nn7uyHM22VNhwKD8ycZsBYICwXla6-z_C-y7a8ycYR1zN7oa0TaMHidHVS74tcBOumyuO5ZZISjlDhYjajvV5ERdTi6ypNQbBq79zXlwjRmjq9UyATG39FOn5Dk3byoatX_sEfevfBxTxDTEgukeEz2anjaoIIzDzEwJJS0MLXZxkAGhtSAwBkU9LCGRh9IPc4IgShJuqA2B8-9qqSBznAukDaKrdbkjotC6gbbv2wsm_ogOhB68qf9fWHap_Jh_32gF-znppLcU-kP9cyGAF1hEBSDdeOngarYU6uSaIuuVlqJFjakf3CgBFdZVspwHQbdYGOmSyxPN_NU_nrZg7dgjYJeI_FkPzR8lY4qETFKPYyfWTCArWuzry2GwQ36VIrcc4lmp5SlhLnyW2WNZmaf-MMkVpjYMmzkNbRymIFamQzA2GO49BmecALKJXy4z_tSkYqsa8pDyRECxa1RGspkoog9YUvthBasLtLTForiwJN0iez=w2560-h1446-no "專案啟動頁面")

## 創建 Store

### createStore

教程在 index.js 先創建了簡易的 store。[Git#1](https://github.com/Annilla/react-redux-practice/tree/V1)

```js
...
import { createStore } from 'redux';

// reducer
function reducer(state, action) {
  // 當 action type 為 _changeState 時，將 state 更改為 action 帶過來的 payload 值
  if (action.type === '_changeState') {
    return action.payload.newState;
  }
  // 預設沒有動作時的值
  return 'state';
}

// 創建 sotre
const store = createStore(reducer);

// 印出初始的 state 值
console.log(store.getState());

// 設定動作屬性所帶的 payload 值
const action = {
  type: '_changeState',
  payload: {
    newState: 'New State'
  }
};

// 將動作帶入 reducer 中，進而更新 store 中的 state
store.dispatch(action);

// 印出經過動作後的 state 值
console.log(store.getState());

...

```

### combineReducers

當有兩個以上的 Reducers 時，在 index.js 做合併。 [Git#2](https://github.com/Annilla/react-redux-practice/tree/V2)

```js
...
import { createStore, combineReducers } from 'redux';

// 將 Reducer 分成專門處理產品和使用者資訊兩種
// 專門處理產品的 Reducer
function productsReducer(state = [], action) {
  return state;
}
// 專門處理使用者的 Reducer
function userReducer(state = '', {type, payload}) {
  switch (type) {
    case 'updateUser':
      return payload.user;
  }
  return state;
}
// 將兩種 Reducer 合起來放在 store 用
const allReducers = combineReducers({
  products: productsReducer,
  user: userReducer
});

const store = createStore(
  allReducers,
  // 放入起始值
  {
    products: [{ name: 'iPhone' }],
    user: 'Anny Chang'
  },
  // 開啟 devTool
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 定義動作
const updateUserAction = {
  type: 'updateUser',
  payload: {
    user: 'John'
  }
}

// 將動作帶入 reducer 中，進而更新 store 中的 state
store.dispatch(updateUserAction);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
...
```

## Reducers and Actions

將 Reducers 和 Actions 從 index.js 中抽離。[Git#3](https://github.com/Annilla/react-redux-practice/tree/V3)

### Actions

在 `src/acitons/` 新增 `user-actions.js` 和 `products-actions.js`。

user-actions.js

```js
// 將 type 名稱輸出供 Reducer 共用
export const UPDATE_USER = 'users:updateUser';

export function updateUser (newUser) {
  return {
    type: UPDATE_USER,
    payload: {
      user: newUser
    }
  }
}
```

### Reducers

在 `src/reducers/` 新增 `user-reducer.js` 和 `products-reducer.js`。

user-reducer.js

```js
// 從 Action 那裡取得動作名稱
import { UPDATE_USER } from '../actions/user-actions'

export default function userReducer(state = '', {type, payload}) {
  switch (type) {
    case UPDATE_USER:
      return payload.user;
    default:
      return state;
  }
}
```

### View

App.js

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { updateUser } from './actions/user-actions'

class App extends Component {
  constructor(props) {
    // Using super in classes
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#Using_super_in_classes
    // super() 將父類的構建項目傳到子項目
    super(props);
    // 將 onUpdateUser(event) 綁定 component 本身 = this
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  onUpdateUser(event) {
    // this = component 本身
    // 將輸入框的文字丟給 Redux Action
    this.props.onUpdateUser(event.target.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>Practice by Anny Chang</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h1>
            <input onChange={this.onUpdateUser}></input>
            <br/>
            {this.props.user}
          </h1>
        </header>
      </div>
    );
  }
}

// 將 Redux State 丟到此 component 的 prop
const mapStateToProps = state => ({
  products: state.products,
  user: state.user
});

// 將 Redux Action 丟到此 component 的 prop
const mapActionsToProps = {
  onUpdateUser: updateUser
};

export default connect(mapStateToProps, mapActionsToProps)(App);

```

## Redux-thunk

當我們在接取 API 非同步的請求時，就需要 Redux-thunk 這個 middleware，幫助 Promise 回傳過後可以在 dispatch 其他的 Action。[Git#4](https://github.com/Annilla/react-redux-practice/tree/V4)

安裝 redux-thunk。

```
yarn add redux-thunk
```

在 index.js 引用 thunk。

```js
...
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
...

// 使用 applyMiddleware 將 thunk 帶進去改變原生 dispatch 行為
// Thunk 是一個以 action 為本的包裹器
// 在 Redux 中藉由 Redux-Thunk 這個 Redux Middleware 讓我們可以在使用時不去區分 pure action creator 還是 thunk action creator
const allStoreEnhancers = compose (
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  allReducers,
  {
    products: [{ name: 'iPhone' }],
    user: 'Anny Chang'
  },
  allStoreEnhancers
);

...
```

### Actions

user-actions.js

```js
import axios from 'axios';

...
export const SHOW_ERROR = 'users:showError';

...

export function showError () {
  return {
    type: SHOW_ERROR,
    payload: {
      user: 'ERROR!!'
    }
  }
}

export function apiRequest() {
  return dispatch => {
    // 使用 axios 接取 API Promise
    // 這邊網址因為有 CORS，所以必定 ERROR
    axios({
      method: 'GET',
      url: 'http://google.com'
    }).then(response => {
      // 成功的話會 dispatch updateUser Action
      console.log('SUCCESS');
      dispatch(updateUser(response.newUser));
    }).catch(response => {
      // 失敗的話會 dispatch showError Action
      console.log('ERROR');
      dispatch(showError());
    })
  }
}
```

### Reducers

user-reducer.js

```js
import { UPDATE_USER, SHOW_ERROR } from '../actions/user-actions'

export default function userReducer(state = '', {type, payload}) {
  switch (type) {
    case UPDATE_USER:
      return payload.user;
    case SHOW_ERROR:
      return payload.user;
    default:
      return state;
  }
}
```

### View

App.js

```js
...
import { updateUser, apiRequest } from './actions/user-actions'

class App extends Component {
  constructor(props) {
    ...
  }

  // 在 component 出現的時候進行 API request
  componentDidMount () {
    this.props.onApiRequest();
  }

  ...

  render() {
    ...
  }
}

...

// 將 apiRequest 放到此 component 的 props
const mapActionsToProps = {
  onUpdateUser: updateUser,
  onApiRequest: apiRequest
};

export default connect(mapStateToProps, mapActionsToProps)(App);
```

## Reselect

使用者每次都會透過 action 去做 dispatch 進而改變 state 的值。那麼，問題來了，如果需要的計算量比較大，每次更新的重新計算就會造成性能的問題。為了避免不必要的計算，Reselect 就是來解決此問題。[Git#5](https://github.com/Annilla/react-redux-practice/tree/V5)

> 如果有用過 Vue 的話，就類似 computed 的功能。

Selectors 的特點為：

* Selectors 可以用來計算延伸的資料，允許 Redux 去儲存最低限度的 state。也就是說，state 只儲存原始的基本資料，中間延伸的計算透過 Selector 呈現即可。

* Selectors 很有效率。一個 selector 只會在與他相關的變數有改變的時候才會重新計算。

* Selectors 可以多個組合。可被其他的 selectors 當作變數來運用。

這邊解釋就不用影片中的範例，因為我覺得官方提供的 example 解釋更為貼切。

```js
import { createSelector } from 'reselect'

// 把 shop 裡面的 items 抓出來
const shopItemsSelector = state => state.shop.items
// 把 shop 裡面的 taxPercent 抓出來
const taxPercentSelector = state => state.shop.taxPercent

// 把 items 的 value 做總和
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

// 用 subtotal 和 taxPercent 計算總稅額
const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

// 用 subtotal 和 tax 計算加稅後的總金額
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

## Smart VS Dumb Component

你不可能把每個子 component 都跟 Store 做聯繫，這樣很累且是過度使用。所以我們就會有一個專門和 Store 做聯繫的 Component，也就是 Smart Component。他接到資料後會往下傳給只吃 prop 的 Dumb Component。如此一來我們就能保持只有少數 Smart Component 控制 Store，而底下的 Dumb Component 因為只吃 prop 傳進來的值，所以也可安心的重複使用。

> Smart VS Dumb Component 的概念是通用的理論，並不是 React 獨有。所以同樣的概念也適用在 Vue 和 Angular 等框架上。

![Smart VS Dumb Component](https://huzidaha.github.io/static/assets/img/posts/25608378-BE07-4050-88B1-72025085875A.png "Smart VS Dumb Component")

## 參考資料

* [Redux Middleware大略架構](https://medium.com/@WendellLiu/redux-middleware%E5%A4%A7%E7%95%A5%E6%9E%B6%E6%A7%8B-ace7e646c929)
* [讓你的Action能作更多 — Redux-Thunk](https://medium.com/frochu/%E9%80%81%E8%AE%93%E4%BD%A0%E7%9A%84action%E8%83%BD%E4%BD%9C%E6%9B%B4%E5%A4%9A-redux-thunk-c07bc5488e48)
* [react-redux性能优化之reselect](https://www.jianshu.com/p/1fcef4c892ba)
* [Smart 组件 vs Dumb 组件](http://huziketang.mangojuice.top/books/react/lesson43)