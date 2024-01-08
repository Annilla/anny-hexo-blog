---
title: Google Calendar To Discord Webhook
categories:
  - JS
thumbnailImage: https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source
thumbnailImagePosition: left
coverImage: https://media.nownews.com/nn_media/thumbnail/2023/09/1695994487590-d3650fef35e74f04bf6010d0078f8fcd-1200x675.webp?unShow=false
coverMeta: out
tags: [JS, Discord, Google Script]
date: 2024/1/8
updated: 2024/1/8
---

最近因友人需要一個 Discord 的 alert 提醒, 所以研究了一下怎麼單方面將 Google 日曆的內容推送到 Discord 的 channel 中且不要花到錢. 參考了此 repo [Google-Calendar-API-to-Discord-Webhook](https://github.com/DjMuffinTops/Google-Calendar-API-to-Discord-Webhook), 並改寫設定讓 alert 一天只發送一次, 大幅減少 google api 的呼叫次數, 這樣就可以繼續用免費帳號使用功能. 設置步驟如下.

<!--more-->

# 設置 google script

先去 [Google Cloud Apps Script](https://script.google.com) 建立一個專案, 並把 script 貼上如下.

![Google Cloud Apps Script](https://media.discordapp.net/attachments/1135775611948900472/1193819554758000700/image.png?ex=65ae1a19&is=659ba519&hm=60e69ec50820a59e7017ed50c3abfb09a2e86a6b8d09bce6d567ab49ddfa6509&=&format=webp&quality=lossless&width=832&height=415)

```js
// This Google Apps Script Will Send a POST to a Discord Webhook creating embed messages of any events starting within the next minute of execution.
// Any events that have already started will not appear.
// This script should be triggered every minute using Google Triggers.
const CHANNEL_POST_URL = "這邊放 Discord 的 channel url";
const CALENDAR_ID = "這邊放 google 日曆的 ID";
const NO_VALUE_FOUND = "N/A";
const minsInAdvance = 60; // Set the number of minutes in advance you'd like events to be posted to discord. Must be 1 or greater 這邊因為會改成一天只有7~8點這個時段發送一次, 所以要設定 script 觸發時間後的 60 分鐘有掃到的日曆事件都要丟出來. google 日曆那邊的事件就是設定 8 點. 就能一天發一次.


// Import Luxon
eval(UrlFetchApp.fetch('https://cdn.jsdelivr.net/npm/luxon@2.0.2/build/global/luxon.min.js').getContentText());
let DateTime = luxon.DateTime;
const DTnow = DateTime.now().startOf('minute'); // Will consider 'now' as the beginning the minute to deal with second offsets issues with trigger over time.

function postEventsToChannel() {
  // .list parameters. See https://developers.google.com/calendar/api/v3/reference/events/list?hl=en
  let optionalArgs = {
    timeMin: DTnow.toISO(),
    timeMax: DTnow.plus({minutes: minsInAdvance}).toISO(), // Will only show events starting in the next x minutes
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
  let response = Calendar.Events.list(CALENDAR_ID, optionalArgs);
  let events = response.items;
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      let event = events[i];
      let ISOStartDate = event.start.dateTime || event.start.date;
      let ISOEndDate = event.end.dateTime || event.end.date;

      // The Calendar API's .list function will continously return events whose endDate has not been reached yet (timeMin is based on the event's end time)
      // Since this script is meant to run every minute, we have to skip these events ourselves
      // if (DateTime.fromISO(ISOStartDate) < DTnow.plus({minutes: minsInAdvance - 1})) {
      //   Logger.log(`Event ${event.summary} [${event.id}] has already started. Skipping`);
      //   continue;
      // }

      // Build the POST request
      let OptionsPayload = {
        "content": "‌<@&1094230208527208539>‌", // 內容會 tag 某個群組的標籤, 這樣群組內的人才能確定跳出通知, 不會因為個人設定而消失
        "embeds": [{
          "author": {
              "name": `${event.summary}`,
              "icon_url": "https://cdn.discordapp.com/attachments/696400605908041794/888874282950750238/1200px-Google_Calendar_icon_28202029.png"
          },
          "timestamp": DTnow.toISO(),
          "description":`[Google Event Link](${event.htmlLink})`,
          "color": 1425196,
          "fields":[]
        }]
      };

      let FieldsStartTime = {
        "name":"Start Time",
        "value": ISOToDiscordUnix(ISOStartDate) ?? NO_VALUE_FOUND,
        "inline":false
      };
      let FieldsEndTime = {
        "name":"End Time",
        "value":ISOToDiscordUnix(ISOEndDate) ?? NO_VALUE_FOUND,
        "inline":false
      };
      let FieldsLocation = {
        "name":"Location",
        "value":event.location ?? NO_VALUE_FOUND,
        "inline":false
      };
      let FieldsDescription = {
        "name":"Description",
        "value":event.description ?? NO_VALUE_FOUND,
        "inline":false
      };

      if(ISOStartDate) {
        OptionsPayload.embeds[0].fields.push(FieldsStartTime);
      }

      if(ISOEndDate) {
        OptionsPayload.embeds[0].fields.push(FieldsEndTime);
      }

      if(event.location) {
        OptionsPayload.embeds[0].fields.push(FieldsLocation);
      }

      if(event.description) {
        OptionsPayload.embeds[0].fields.push(FieldsDescription);
      }

      let options = {
          "method": "post",
          "headers": {
              "Content-Type": "application/json",
          },
          "payload": JSON.stringify(OptionsPayload)
      };

      Logger.log(options, null, 2);
      UrlFetchApp.fetch(CHANNEL_POST_URL, options);
    }
  } else {
    Logger.log(`No events starting within ${minsInAdvance} minute(s) found.`);
  }
}

/**
 * Converts an ISO string into a discord formatted timestamp
 */
function ISOToDiscordUnix(isoString) {
  return `<t:${Math.floor(DateTime.fromISO(isoString).toSeconds())}:F>`
}
```

# 設定觸發條件

再去 UI 設定觸發條件如下圖.

* 執行的 function: postEventsToChannel
* 部屬作業: 雲端
* 活動來源: 時間驅動
* 條件類型: 日計時器
* 時段: 上午 7 點到 8 點

> PS. 記得 google 日曆活動固定都設定在 8 點, 這樣每天就會在早上七點多一次跳出設定的活動. 每天只會觸發一次, 如果要換時段的話日曆活動也要一起換, 依此類推.

![設定觸發條件](https://media.discordapp.net/attachments/1135775611948900472/1193820455056977940/image.png?ex=65ae1af0&is=659ba5f0&hm=cf3fba8e01e78e3a3e03479b65c7ce02fe1193ed47dbcb10b05af50582d13eb4&=&format=webp&quality=lossless&width=832&height=415)

# Discord 完成

Google script 啟動後, Discord channel 就會跳出如下圖的 alert 囉!

![Discord 完成](https://media.discordapp.net/attachments/1135775611948900472/1193822236579213412/image.png?ex=65ae1c99&is=659ba799&hm=5b255cffab57813776c56165859c4f2a5cf9e73da81699c18bb0203b3fbf962b&=&format=webp&quality=lossless)

也可以在 google 的執行項目看到每次執行的 log 紀錄.

![google 的執行項目](https://media.discordapp.net/attachments/1135775611948900472/1193822881562509402/image.png?ex=65ae1d33&is=659ba833&hm=79818e5d25df672ce72f59fdfeab9278d7cb0a634796603d2c80db4d9d565bba&=&format=webp&quality=lossless&width=832&height=415)

# Reference

* [Google-Calendar-API-to-Discord-Webhook](https://github.com/DjMuffinTops/Google-Calendar-API-to-Discord-Webhook)