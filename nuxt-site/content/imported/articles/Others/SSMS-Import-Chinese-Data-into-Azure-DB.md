---
title: SSMS Import Chinese Data into Azure DB
categories:
  - AzureDB
thumbnailImage: https://www.tec-innova.mx/wp-content/uploads/2021/12/Imagen1.png
thumbnailImagePosition: left
coverImage: https://sysadminas.eu/assets/images/post1/azure-sql.jpg
coverMeta: out
tags: [AzureDB, SSMS]
date: 2022/07/19
updated: 2022/07/19
---

介紹如何用 SSMS 匯入 Azure DB。

<!--more-->

# 設定 Azure portal 防火牆

> **PS 如果在匯入期間跳防火牆錯誤，可去 Azure portal 設定比較快**

Step1. 進入 DB > 概觀 > 設定伺服器防火牆

![設定伺服器防火牆](https://lh3.googleusercontent.com/pw/AM-JKLWV14uASdjwXGFbGebTiTx-RLsi6Zt78hTZTCBqiM0Rg5IIhW2AA_njRdslkBsup7IoTKC1LvsC_CiAa3D7OLyCHA2UJS-lJptc6hEl7f9duH9pleZzYkqQxpc_e4Bpwxvt7tNXiEbWAaEGrxUbO4tmew=w914-h151-no?authuser=0)

Step2. 新增防火牆規則 > 儲存

![新增防火牆規則](https://lh3.googleusercontent.com/pw/AM-JKLUerDZASgbuUeAFALbg968tCctMz604afKbVW0hBxSRtmW8baCMYdn8FhtLoskfl9D1my-rcjH_J1Mgp928WwWDjj8tM--lbdeoas45G1YZ_Ew2_YR3xs0nmH4W1sz8s1fDtIyrkT2SAAdAsFFh2FldaA=w718-h394-no?authuser=0)

# 準備檔案

> **需要先轉成 CSV 檔案。注意! 必填欄位要預先補好。**

# SSMS 匯入步驟

Step1. 登入DB (會跳第一次二段驗證) > 對資料庫案右鍵 > 叫出匯入精靈。**(如果防火牆消失，請回 Azure portal 設定。)**

![叫出匯入精靈](https://lh3.googleusercontent.com/pw/AM-JKLVTxckw3mB6JXx3QiMjCIxoxXhd4d2d1pPWObyCiLza84YJDT5caM5W2SRsDiu0T4bJsDGgl2LwhjsTlXzjoCmRr-6Yui2pcSBV4L0dyf4nmnTni4QTkmY99BTokSGd7JIkCDE7brUfUmc1XTMV-uMfVA=w718-h568-no?authuser=0)

Step2. 設定來源資料

> **因為資料有中文，所以字碼頁選擇 65001, 文字限定詞輸入 " (為了跳脫逗號)**

![設定來源資料](https://lh3.googleusercontent.com/pw/AM-JKLUKtzIV7aucTCzSPtpvsCMTI3b-SBxdGgDSLVzFpjZLVrPS3LRfKyCT_dHzGNe4MKPVek3TvF2_dtK9jd9CPxj8nKBkCPFO2iP2iF2Ew__xoJFuDOHlTcWLxC6aoxIVhOOG3R9RTQRBrKdHCJN0XIkXrw=w629-h555-no?authuser=0)

> **全部 DataType 選 Unicode 字串，若有欄位長度超過 50 ，則需要手動將欄位 key 上加長的數值。**

![全部 DataType 選 Unicode 字串](https://lh3.googleusercontent.com/pw/AM-JKLXbSjFhxDi2TDMutzGNrYMbEw9op1g5kFpTgmTixbpQrOmOxNFp4AL1bZ2MrjOITB95QqLShmzuGigPTYR__jv4eVB8yFKt-GUI8WBUvgQCPvgpUbK5FSdcrCDU-NclP1eh7fmUsNpE732wdJa5v3S0Cw=w628-h553-no?authuser=0)

![手動將欄位 key 上加長的數值](https://lh3.googleusercontent.com/pw/AM-JKLUBgjM4k-izh7u-DsrJYMIOldeU07F7iJtam7ZWU0ZqclCdTCnjW0Rqons0gzXZWsycLQUFPRHlD6tO-UWH-xvxpdU8ScFGIAogBJAx-y15I02_FmCrMhrlhwS6JomLOYPem_kXeGuPO9sSyGnffwSk_g=w627-h555-no?authuser=0)

Step3. 設定目的地資料庫，這邊會再跳第二次二段驗證。**(如果防火牆消失，請回 Azure portal 設定。)**

![設定目的地資料庫](https://lh3.googleusercontent.com/pw/AM-JKLW0RDriQCY79ONiFjNQuMHiBb_HEo5ecWgUrKHFpgAjZOZMRjns95s1X2uCehCFumB9yZm7nm043h0NyHTsT0eKM2CAyLY0cllG_b_KFVLvAb6ZJmRrqlr09IMhMk5DrKHI201xDAgkR2z6oFzRHhscMA=w747-h728-no?authuser=0)

Step4. 設定目的地表格 & mapping。

![設定目的地表格 & mapping](https://lh3.googleusercontent.com/pw/AM-JKLVycSafTjcNlZX7nsTQDvGd2THAA1tBvLIC-s0L-5M_PlX5teFNrfPMfDirqFbYfkx8UqMfldwPzVVsTbezNWnNMoSEs8NS3-g_nFT4awF06foGJxpBT8QDlm6s_N-Po5BMC74jXmi9qyYTgEUtw_ED7Q=w958-h738-no?authuser=0)

Step5. 一直 Next 到最後 Finish 執行。**(如果防火牆消失，請回 Azure portal 設定。)**