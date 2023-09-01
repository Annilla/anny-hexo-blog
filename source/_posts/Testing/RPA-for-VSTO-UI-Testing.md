---
title: RPA for VSTO UI Testing
categories:
  - RPA
thumbnailImage: https://picx.zhimg.com/v2-8bc8d8efe02b13b406abfd9be1256e35_l.jpg?source=172ae18b
thumbnailImagePosition: left
coverImage: https://www.metaage.com.tw/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhjWG81Y0c1MmFHdzBhV3cwYzJFd04yaGxNRGxtY1RFemJtMTNid1k2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUzJsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SWpFMk1qQTVNamN5TVY5NGJDNXFjR2NpT3lCbWFXeGxibUZ0WlNvOVZWUkdMVGduSnpFMk1qQTVNamN5TVY5NGJDNXFjR2NHT3daVU9oRmpiMjUwWlc1MFgzUjVjR1ZKSWc5cGJXRm5aUzlxY0dWbkJqc0dWRG9SYzJWeWRtbGpaVjl1WVcxbE9ncHNiMk5oYkE9PSIsImV4cCI6IjIwMjMtMDktMDFUMDI6NTQ6MTkuODIxWiIsInB1ciI6ImJsb2Jfa2V5In19--c3e74844a67fa84f32294216e9af1574d702f23e/162092721_xl.jpg
coverMeta: out
tags: [RPA, Testing]
date: 2023/09/01
updated: 2023/09/01
---

最近專案越來越多 Excel 的 VSTO 設計, 但做完後需要大量的手動測試, 每次測試都是看心情, 所以總是會有漏掉的部分. 但有些功能特別重要, 像是修改資料, 寄信等動作. 至少這對 User 來說做重要的功能要先統一測試規格, 加速動作, 減少人工測試的時間, 特別情況再用手動測試就好。這篇文章紀錄用 Microsoft RPA 做 VSTO 測試時, 流程動作設定的技巧。

<!--more-->

# 技巧一 VSTO 開啟

VSTO 通常開啟會需要一段比較長的時間, 因為包含連接 API, 準備資料, 產生 UI 等等. 而且每次開啟的時間都不一樣長, 所以不介意用 RPA 開. 這邊的做法是建議先開好 VSTO, 然後請 RPA 直接針對開好的 VSTO 做事情.

Main 主要流程如下:

1. 附加至執行中的 Excel: 設定開啟的 VSTO 檔案名稱. **注意! 這裡會產生變數 ExcelInstance 代表此 Excel 給下一步驟使用.**
2. 設定使用中 Excel 工作表: 用剛剛產生的 ExcelInstance 變數, 設定啟用工作表時搭配 "名字" 並輸入要執行的 sheet 名稱.

![Main 流程 - VSTO 開啟](https://media.discordapp.net/attachments/1135775611948900472/1147011739859288155/image.png)

![附加至執行中的 Excel](https://media.discordapp.net/attachments/1135775611948900472/1147012024975507596/image.png)

![設定使用中 Excel 工作表](https://media.discordapp.net/attachments/1135775611948900472/1147012324729819166/image.png)

# 技巧二 輸入資料至表格

接下來要針對設定好的 sheet 做資料輸入和批次貼上的動作。

## 從 Excel 讀取批次貼上

Main 主要流程如下:

1. 從 Excel 工作表中取得第一個可用資料行/資料列: 會取得空白的行數 (FirstFreeColumn) 跟列數 (FirstFreeRow), 等下貼資料用.
2. 啟動 Excel: 選擇讀取的資料來源檔案並儲存到變數 ExcelFlashData.
3. 讀取自 Excel 工作表: 從 ExcelFlashData 讀取表格儲存資料到變數 FlashData. **注意! 這邊記得把進階點開, 選擇"第一行範圍包含欄名稱", 這樣他才知道第一列為表頭, 等下才不會貼到表頭, 只會貼內容的部分.**
4. 寫入 Excel 工作表: 將資料 FlashData 貼到欄 A 和 列 FirstFreeRow.
5. 關閉 Excel: 複製完將 ExcelFlashData 檔案關閉. 不關的話會一直留在畫面上.

![Main 流程 - 從 Excel 讀取批次貼上](https://media.discordapp.net/attachments/1135775611948900472/1147054666849468487/image.png)

![從 Excel 工作表中取得第一個可用資料行/資料列](https://media.discordapp.net/attachments/1135775611948900472/1147057076149964840/image.png)

![啟動 Excel](https://media.discordapp.net/attachments/1135775611948900472/1147057429788504094/image.png?width=483&height=423)

![讀取自 Excel 工作表](https://media.discordapp.net/attachments/1135775611948900472/1147057753844629614/image.png?width=597&height=423)

![寫入 Excel 工作表](https://media.discordapp.net/attachments/1135775611948900472/1147057998620012615/image.png?width=517&height=423)

![關閉 Excel](https://media.discordapp.net/attachments/1135775611948900472/1147058212470788136/image.png)

## 輸入當天日期

也可以讀取電腦的當下時間寫入特定的某個欄位中.

Main 主要流程如下:

1. 取得目前日期與時間: 將目前日期時間除存在變數 CurrentDateTime.
2. 寫入 Excel 工作表: 可將 CurrentDateTime 拆分為年,月,日再重新組合成想要的格式貼到指定欄位中.

![Main 流程 - 輸入當天日期](https://media.discordapp.net/attachments/1135775611948900472/1147059155652333698/image.png)

![取得目前日期與時間](https://media.discordapp.net/attachments/1135775611948900472/1147060074372661318/image.png)

![寫入 Excel 工作表](https://media.discordapp.net/attachments/1135775611948900472/1147060328362954752/image.png?width=509&height=423)

# 技巧三 Ribbon 操作

Ribbon 主要就是靠 RPA 新增 UI 元素的方式, 再配合滑鼠鍵盤命令完成操作模擬.

## 下拉選單

Main 主要流程如下:

1. 按一下視窗中的 UI 元素: 要先新增下拉選單的 UI 元素, 然後請 RPA 去點此元素。
2. 傳送按鍵: **注意! 因為下拉選單是浮動選單, RPA 用內建的清單選擇會選不到, 所以這裡是用鍵盤傳送方向鍵(下->下->Enter)的方式來選擇要的下拉項目。**

![Main 流程 - 下拉選單](https://media.discordapp.net/attachments/1135775611948900472/1147061566374690816/image.png)

![新增下拉選單的 UI 元素](https://media.discordapp.net/attachments/1135775611948900472/1147063753892974602/image.png?width=417&height=423)

![按一下視窗中的 UI 元素](https://media.discordapp.net/attachments/1135775611948900472/1147063977449357402/image.png)

![傳送按鍵](https://media.discordapp.net/attachments/1135775611948900472/1147064169573654538/image.png?width=460&height=423)

## 輸入框和按鈕

Main 主要流程如下:

1. 填入視窗中的文字欄位: 要先新增輸入框的 UI 元素, 然後請 RPA 去輸入要的文字訊息。
2. 按一下視窗中的 UI 元素: 要先新增按鈕的 UI 元素, 然後請 RPA 去點擊。

![Main 流程 - 輸入框和按鈕](https://media.discordapp.net/attachments/1135775611948900472/1147066109779001364/image.png)

![新增輸入框的 UI 元素](https://media.discordapp.net/attachments/1135775611948900472/1147067256401043486/image.png?width=417&height=423)

![填入視窗中的文字欄位](https://media.discordapp.net/attachments/1135775611948900472/1147067575340113930/image.png?width=520&height=423)

![新增按鈕的 UI 元素](https://media.discordapp.net/attachments/1135775611948900472/1147067817154330704/image.png?width=420&height=423)

![按一下視窗中的 UI 元素](https://media.discordapp.net/attachments/1135775611948900472/1147068001946959882/image.png)