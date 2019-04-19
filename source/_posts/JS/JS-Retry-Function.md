---
title: JS Retry Function
categories:
  - JS
thumbnailImage: https://cdn-images-1.medium.com/max/1600/1*HP8l7LMMt7Sh5UoO1T-yLQ.png
thumbnailImagePosition: left
coverImage: https://cdn-images-1.medium.com/max/1200/1*H-25KB7EbSHjv70HXrdl6w.png
coverMeta: out
tags: [JS]
date: 2019/05/01
updated: 2019/05/01
---

工作上，參考一位前輩寫的 Retry function 的原理記錄，實做經過 N 秒後重複做一件事情的小程式。

<!--more-->

這裡從取得 AD 帳號來舉例。費話不多說，先上 code。

```
async getADRetry(){
    /*--------------------------
        AD account Retry 機制
        1. 成功取得 AD 回傳值
        2. 無法取得 AD 開始 Retry
        3. Retry 延遲秒數從 nextDelay 開始，每多一次就加 1 秒
        4. Retry 次數最多 retryNumber 次
        5. Retry 成功則回傳值，全部失敗則回傳 ''(空字串)
    --------------------------*/
    let NtAccount = '';
    let nextDelay = 0;
    let retryNumber = 5;

    for(let i = 0; i < retryNumber; i++) {

        // 延遲 nextDelay 秒後
        await delayTime(nextDelay);
        // 取得 user
        NtAccount = getUserName();

        if (NtAccount === '') {
            // 無法取得 AD
            // nextDelay 下一次加 1 秒
            nextDelay = nextDelay + 1000;
            // Continue Retry
            console.log(`No AD. Retry [${i + 1}]: for ${nextDelay}ms...`);
        } else {
            // 成功取得 AD 跳出迴圈
            console.log(`Get AD.`);
            break;
        }

    }

    return NtAccount;
},
```

其中 delayTime 函數用 promise 即可實做，只要傳入毫秒 ms 就能得到延遲的動作。

```
// Delay 延遲秒數
export function delayTime (interval) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};
```