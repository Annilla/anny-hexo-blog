---
title: Connect Redis with NodeJS
categories:
  - JS
thumbnailImage: https://microstream.one/blog/wp-content/uploads/2023/06/redis_logo-1.png
thumbnailImagePosition: left
coverImage: https://ps.w.org/redis-cache/assets/banner-1544x500.png?rev=2315420
coverMeta: out
tags: [JS, Redis]
date: 2023/10/02
updated: 2023/10/02
---

最近因工作需求, 需從 Redis Server 找大量的資料出來 Debug 程式邏輯. 但每次手動從 UI 介面點開 -> 複製 -> 貼到 VSCode -> 存檔, 非常繁瑣, 且一次都要抓快十個不等的檔案, 非常費時。所以為了能節省我寶貴的時間, 決定用 NodeJS 直接寫一隻來接 Redis 抓資料. 原本要花十分鐘弄得東西, 幾秒鐘就搞定~心理 OS 只有一個字~爽!!!

<!--more-->

# 安裝 node-redis 並連線

安裝

```cmd
npm install redis
```

啟用連線

```js
import { createClient } from 'redis';

const client = createClient({
    url: 'redis[s]://[[username][:password]@][host][:port][/db-number]' // 這邊替換成需要的 Redis Server
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    cosole.log(client.isReady); // false 尚未連線
    await client.connect(); // 啟用連線
    cosole.log(client.isReady); // true 連線成功
}

connectRedis();
```

# 抓資料並存取

```js
import fs from 'fs';
...

async function connectRedis() {
    await client.connect(); // 啟用連線
    const Data = await client.GET(`key`); // 取得資料, 這邊要換成實際資料用的 key 才抓的到
    fs.writeFileSync(`Data.json`, Data); // 儲存 json 資料到本機
}

connectRedis();
```

> **這邊小加碼一下~如果想要把檔案儲存到指定的資料夾名稱, 可以用下列指令新增資料夾, 再把檔案儲存到指定的資料夾名稱.**

```js
...

async function connectRedis() {
    await client.connect(); // 啟用連線

    const destination = 'C:\\XXX'; // 儲存檔案的目的地
    const folderName = 'folderName'; // 儲存檔案的資料夾名稱

    // Add Folder
    if (!fs.existsSync(`${destination}\\${folderName}`)) {
        fs.mkdirSync(`${destination}\\${folderName}`);
    }

    const Data = await client.GET(`key`); // 取得資料, 這邊要換成實際資料用的 key 才抓的到
    fs.writeFileSync(`${destination}\\${folderName}\\Data.json`, Data); // 儲存 json 資料到本機
}

connectRedis();
```

# Reference

* [node-redis](https://github.com/redis/node-redis)