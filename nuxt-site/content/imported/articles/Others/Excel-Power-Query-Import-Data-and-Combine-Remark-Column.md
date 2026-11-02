---
title: Excel Power Query Import Data and Combine Remark Column
categories:
  - Power Query
thumbnailImage: https://mobilemouse.com.au/wp-content/uploads/2021/05/Excel256_75.png
thumbnailImagePosition: left
coverImage: https://golayer.io/wp-content/uploads/How-To-Use-Excel-Power-Query-for-Beginners-1.png
coverMeta: out
tags: [PowerQuery, Excel]
date: 2025/08/04
updated: 2025/08/04
---

最近工作中有同事問我, 怎麼把 excel 中欄位 Item 相同的 Remark 用逗號做合併, Qty 做 Total。馬上丟去問 GPT, 雖然好用, 但沒有截圖真的是看得好難受, 尤其是這種很靠 UI 操作的問題, 介面找了好久終於成功了, 想說記錄下來才不會忘記XD

<!--more-->

# 匯入 excel 資料

假設我們的資料長的如下圖.

![](https://i.postimg.cc/wBTJ97S4/image.png)

接著我們匯入 excel 資料:

> **資料 > 取得資料 > 從檔案 > 從 Excel 活頁簿**

![](https://i.postimg.cc/bJSRjZnc/image.png)

然後選擇 `轉換資料`, 就會進入 Power Query 視窗.

![](https://i.postimg.cc/rwb02QNs/image.png)

# 使用 Power Query

* Step1 點選 `分組依據`

![](https://i.postimg.cc/ZRXyPj0X/image.png)

* Step2 選擇 `進階`, 並依序設定如下圖並按 `確定`:
  * 下拉選單: 以 `Item` 為主, 找出相同的 Item
  * `TotalQty`: 將 `Qty` 做加總
  * `Table`: 選擇 `所有資料列`, 把相同 Item 的資料整理成巢狀表格

![](https://i.postimg.cc/3J5vdLsv/image.png)

* Step3 `新增資料行` > `自訂資料行`

![](https://i.postimg.cc/d017zgyz/image.png)

* Step4 如下圖設定自訂資料行, 並按 `確定`:
  * 新資料行名稱: `Remark`
  * 自訂資料行公式: `= Text.Combine([Table][Remark], ",")`, 表示用剛剛相同 Item 內的巢狀 Table, 將 Remark 取出用逗號串起來

![](https://i.postimg.cc/zvn3CrsR/image.png)

* Step5 點 `關閉並載入`

![](https://i.postimg.cc/DwfmXRB8/image.png)

完成!! 這樣我們就得到相同 Item 的 Remark 用逗號做合併, Qty 做 Total 囉~結案XD

![](https://i.postimg.cc/VNnj7xPm/image.png)