---
title: RPA for VSTO UI Testing
categories:
  - RPA
thumbnailImage: https://picx.zhimg.com/v2-8bc8d8efe02b13b406abfd9be1256e35_l.jpg?source=172ae18b
thumbnailImagePosition: left
coverImage: https://media.discordapp.net/attachments/1135775611948900472/1147077602658484234/162092721_xl.png?width=794&height=423
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

![Main 流程 - VSTO 開啟](https://i.imgur.com/XIFS4XL.png)

![附加至執行中的 Excel](https://i.imgur.com/zsPmO6b.png)

![設定使用中 Excel 工作表](https://i.imgur.com/lIWuJYA.png)

# 技巧二 輸入資料至表格

接下來要針對設定好的 sheet 做資料輸入和批次貼上的動作。

## 從 Excel 讀取批次貼上

Main 主要流程如下:

1. 從 Excel 工作表中取得第一個可用資料行/資料列: 會取得空白的行數 (FirstFreeColumn) 跟列數 (FirstFreeRow), 等下貼資料用.
2. 啟動 Excel: 選擇讀取的資料來源檔案並儲存到變數 ExcelFlashData.
3. 讀取自 Excel 工作表: 從 ExcelFlashData 讀取表格儲存資料到變數 FlashData. **注意! 這邊記得把進階點開, 選擇"第一行範圍包含欄名稱", 這樣他才知道第一列為表頭, 等下才不會貼到表頭, 只會貼內容的部分.**
4. 寫入 Excel 工作表: 將資料 FlashData 貼到欄 A 和 列 FirstFreeRow.
5. 關閉 Excel: 複製完將 ExcelFlashData 檔案關閉. 不關的話會一直留在畫面上.

![Main 流程 - 從 Excel 讀取批次貼上](https://i.imgur.com/3e9ksPv.png)

![從 Excel 工作表中取得第一個可用資料行/資料列](https://i.imgur.com/D7zoaqa.png)

![啟動 Excel](https://i.imgur.com/igja3zw.png)

![讀取自 Excel 工作表](https://i.imgur.com/msk8MoU.png)

![寫入 Excel 工作表](https://i.imgur.com/T3MEBmX.png)

![關閉 Excel](https://i.imgur.com/P1HHoeH.png)

## 輸入當天日期

也可以讀取電腦的當下時間寫入特定的某個欄位中.

Main 主要流程如下:

1. 取得目前日期與時間: 將目前日期時間除存在變數 CurrentDateTime.
2. 寫入 Excel 工作表: 可將 CurrentDateTime 拆分為年,月,日再重新組合成想要的格式貼到指定欄位中.

![Main 流程 - 輸入當天日期](https://i.imgur.com/r7xjkLv.png)

![取得目前日期與時間](https://i.imgur.com/rflsPke.png)

![寫入 Excel 工作表](https://i.imgur.com/8Yc5k5P.png)

# 技巧三 Ribbon 操作

Ribbon 主要就是靠 RPA 新增 UI 元素的方式, 再配合滑鼠鍵盤命令完成操作模擬.

## 下拉選單

Main 主要流程如下:

1. 按一下視窗中的 UI 元素: 要先新增下拉選單的 UI 元素, 然後請 RPA 去點此元素。
2. 傳送按鍵: **注意! 因為下拉選單是浮動選單, RPA 用內建的清單選擇會選不到, 所以這裡是用鍵盤傳送方向鍵(下->下->Enter)的方式來選擇要的下拉項目。**

![Main 流程 - 下拉選單](https://i.imgur.com/Fs3uzvZ.png)

![新增下拉選單的 UI 元素](https://i.imgur.com/jLAOxX8.png)

![按一下視窗中的 UI 元素](https://i.imgur.com/dKCqWRO.png)

![傳送按鍵](https://i.imgur.com/bEgonOp.png)

## 輸入框和按鈕

Main 主要流程如下:

1. 填入視窗中的文字欄位: 要先新增輸入框的 UI 元素, 然後請 RPA 去輸入要的文字訊息。
2. 按一下視窗中的 UI 元素: 要先新增按鈕的 UI 元素, 然後請 RPA 去點擊。

![Main 流程 - 輸入框和按鈕](https://i.imgur.com/fsYbhdU.png)

![新增輸入框的 UI 元素](https://i.imgur.com/O7ouE7q.png)

![填入視窗中的文字欄位](https://i.imgur.com/CzMozei.png)

![新增按鈕的 UI 元素](https://i.imgur.com/XQxAhgM.png)

![按一下視窗中的 UI 元素](https://i.imgur.com/Tkc0B84.png)