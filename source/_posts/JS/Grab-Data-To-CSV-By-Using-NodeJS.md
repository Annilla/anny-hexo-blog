---
title: Grab Data to CSV by using NodeJS
categories:
  - JS
humbnailImage: https://cdn-images-1.medium.com/max/1600/1*HP8l7LMMt7Sh5UoO1T-yLQ.png
thumbnailImagePosition: left
coverImage: https://cdn-images-1.medium.com/max/1200/1*H-25KB7EbSHjv70HXrdl6w.png
coverMeta: out
tags: [JS]
date: 2019/07/04
updated: 2019/07/04
---

工作中遇到一個情境是，打 API 可以要到當下的資訊，但 User 想要幾分鐘之內的紀錄，如果要做報表的話，就要非常手動的用 postman 打 API N 次，然後再將儲存下來的 json 轉成 csv，最後再將 n 個 csv 合成一份檔案。實際若是每分鐘打一次 API，假設只抓十分鐘，就是存十次 json 檔案，再將十個 json 檔案轉成十個 csv ，最後再手動合成一個 csv 檔案，光是手動的時間絕對超過三十分鐘。為此，我決定要寫一隻程式讓上面的所有動作自動化。

<!--more-->

環境使用 NodeJS。

# 安裝套件

共安裝 3 個套件

* axios: 戳 API 用
* moment: 處理時間
* json2csv: 將 data 轉成 csv 格式

```
yarn add axios moment json2csv
```

# 程式解說

這裡只需要寫一隻 getData.js 就搞定 。

```js
const axios = require('axios');
const moment = require('moment');
const { Parser } = require('json2csv');
const fs = require('fs');

let head = []; // 存取 head 資料
...
let timer = null; // 定時抓取資料的計時器
let duration = 60000; // 多久抓一次資料
let token = ''; // 存取 API token
let apiURL = 'put API URL';
let appID = 'put API ID';
let appSecret = 'put API Code';
let startTime = moment().format(); // 紀錄開始時間
let grabMiniute = 3; // 設定要抓取的分鐘數
let endTime = moment(startTime).add(grabMiniute, 'minutes'); // 計算結束的時間

// 取得 API token 
async function getToken() {
  let res = await axios({
    methos: 'GET',
    url: `${apiURL}/api/auth?appId=${appID}&appSecret=${appSecret}`
  });
  token = res.data.data;
}

// 將戳 API 包裝成一個程式，若 token 過期會重戳 API
async function requestAPI(apiMethod, apiURL, retryFunc) {
  try {
    return await axios({
      method: apiMethod,
      url: apiURL,
      headers: {
        AccessToken: token,
        System: appID
      }
    });
  } catch(error) {
    if (error.message.indexOf('401') > -1) {
      // get token
      await getToken();
      retryFunc();
    }
  }
}

// 戳 head API 取資料
async function getHead() {
  let res = await requestAPI('GET', `${apiURL}/api/Head`, getHead);
  if (res) { head = head.concat(res.data); }
  console.log('head', head.length);
}

...

// 一次取得多種資料
async function getAllData() {
  // get token
  await getToken();

  console.log(`----- ${grabMiniute} minutes left -----`);

  // grab data
  getHead();
  getFeeder();
  getNozzle();

  grabMiniute = grabMiniute - 1;
}

// 寫檔案
function writeFile(data, fileName) {
  fs.writeFile(fileName, data, 'utf8', function (err) {
    if (err) {
        console.log(`An error occured while writing ${fileName}.`);
        return console.log(err);
    }

    console.log(`${fileName} has been saved.`);
  });
}

// 轉格式並儲存檔案
function saveFile() {
  try {
    // 將 json 轉 csv
    const parser = new Parser();
    const csvHead = parser.parse(head);
    const csvFeeder = parser.parse(feeder);
    const csvNozzle = parser.parse(nozzle);

    // 寫檔案
    console.log(`----- SAVE FILES -----`);
    writeFile(csvHead, 'Head.csv');
    writeFile(csvFeeder, 'Feeder.csv');
    writeFile(csvNozzle, 'Nozzle.csv');
  } catch (err) {
    console.error('saveFile ERROR: ', err);
  }
}

/* ---------------
  Start from here
  ---------------*/
// 一開始先執行
getAllData();

// 啟動計時器
timer = setInterval(() => {
  let now = moment().format();
  if(moment(now).isBefore(endTime)) {
    // 如果還沒到結束時間，就繼續取資料
    getAllData();
  } else {
    // 如果時間到就停止計時器
    clearInterval(timer);
    // 將資料儲存成檔案
    saveFile();
  }
}, duration);
```

# 跑起來吧～

```
node getData.js
```

![跑起來吧](https://lh3.googleusercontent.com/j9w9EiGilWwL1E7atc2_7zYqgVhaihr6BfYRaV5yI_7Zqsm35HHQq-PJB16FVphVx-NG13pmNYy6lSX9OCHF_awYWCscNoCuHxWl8S9dVYtbK6cIFPZVlOk2nlHuPWYZ75c4TrgpM3lOYW3SAwF0QGa38s58WuDPHyxBdZDK-JLJgR7IY-ovFu6YZ2I37ciPf93Mvc24Bg9tJJSj7zdYtfwirxPeFXIVL0guofpoTEBAR29_4BsLnEAtsY6pK5KEXNYcjhwjZ7GuUjNfueF2Qe0abLvsorMFWE1JY5ems-ZOVm0Bw-BmXVqkGNknDNd5aIoILBJ5fAyRLmbV7hVCQpzS79jPBdWDicXsTu8c7qQbGqyU1hyB56MJajIEVViQCoEKMDHnuCWuD67a09wBI8zOQoRIYJmkFf1EPZ93bgVt-KPrgOeQIgaEEIerHPmp56OslVqyOsVi_N4iZ5xROgSit4I4wzfQgZYYbdkLkX4H0fV1VX2zpufoKrx0cz6ZMzTxczYtQErozIMQ5nYZDD1I3xAwN9Gxkr79V2gWHZgICAZ_o1N-MHcM-Sdk690fheubq0PwpekkxP_FIxrJCRaLRYYByMybeyt6z6Y1U713nSO05whp-jMXVNkf459UBi-n8I2Zu8LUktni-ZnJ8GacoOoZM6xV=w1173-h812-no "跑起來吧")

> 後記：其實 User 一直不停的找我手動抓資料，等我有時間寫好這隻程式的時候，User 已經核對完成了 ＯＲＺ。不過，我覺得這是一個很有趣的項目。