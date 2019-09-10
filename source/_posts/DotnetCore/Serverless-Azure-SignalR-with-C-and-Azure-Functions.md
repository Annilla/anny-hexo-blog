---
title: 'Serverless Azure SignalR with C# and Azure Functions'
categories:
  - .NET Core
thumbnailImage: data:image/png;base64,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
thumbnailImagePosition: left
coverImage: https://i.ytimg.com/vi/Dvv2hkXyHcg/maxresdefault.jpg
coverMeta: out
tags: [.NET Core, dotnet, SignalR, Serverless, Azure Functions, C#, VScode]
date: 2019/09/10
updated: 2019/09/10
---

第一次接觸使用 Azure SignalR，順便玩玩看雲端託管的服務，那我們就來開始吧～

<!--more-->

因為我習慣用 `Vscode` 開發，所以下面說明都是以 `Vscode` 為主。

## 安裝環境

* 安裝 [Azure Functions Core Tools (v2)](https://github.com/Azure/azure-functions-core-tools#installing)

* 安裝 [.NET Core SDK](https://dotnet.microsoft.com/download)

查看 Azure Functions Core Tools 版本

```
func --Version
```

查看 dotnet core 版本

```
dotnet --Version
```

## 登入 Azure 建立 Azuer SignalR

* [Azure 入口網站](https://portal.azure.com/)

新增 SignalR service 如下圖設定。

![SignalR 設定](https://docs.microsoft.com/zh-tw/azure/azure-signalr/media/signalr-quickstart-azure-functions-javascript/signalr-quickstart-create.png "SignalR 設定")

> 注意：這篇介紹的是無伺服器的方式，所以 Service Mode 要選擇 Serverless。一個 Azure SignalR 只能選擇一個 Service Mode，所以傳統的 Classic 方式和 Serverless 只能擇一，兩者不能共用同一個 Service。

## 設定 Azure Function

1) 開啟建立好的服務，複製主要連接字串。

![複製主要連接字串](https://lh3.googleusercontent.com/ebUg5MNe8j6YLI5O56lihd2NTFy9SHkFwW0WZdZnz25HzlKWkEpveUnMpfw9Og1Mkm2wPnqATYzpizjHtt6onCppsz7kRYnrXE-DRBapeoxUwNJLvjKR7O8nkZzNVu37tdUtRXIqFCluv42EXrrKaCQbWRKEfsSFsotts0AnmxXqpyEjB7gKkDUngv-Si0OX8UAy4nH2t5oc1uJumiSBkucK4djsxN_QQVLuBjXlFlzN1-lNt6x3j-KlraBvkCf7J9wLB7cp1_lOMldLoK6bG5ixiKebGTJly_gfZ9J4HN2JF0OCPP87eI4QsGlVPprfTGwgw6swCJaO4TiodAj0zzgPq8SX6qmCE7fS7-1gSDLK1hzTNedZ5EzcCTblltvhdsOuxgSJFc464UYaYcTfcwzZ3377cg9jzGa4ijNRdFRGHYQbvdssgoMuxA8_gRV3qmtsssBOQzKhRwFriUOcR2Mk2RnJEzCknPvIhDDq_aDuO0DJvUr18p4zLV3IK3gdawQtusInwbLdySAFB6VGiKoPK2xP6IJA1RYGUIWx3a7uEqX3KPpI0OjVY5lORd_rtCzv2m69xRSB_ygGXHYVt1_Mr_MsI-vVbpOzZtPob9L3BljtzaWXYBaDaFMeFGVKKhTHR_Gv9i12qfSZCi1j9pffRE8uAVRTmJVYozGlhqffUtNkUHxaDsO2=w1035-h483-no "複製主要連接字串")

2) 複製官網 [sample](https://github.com/Azure-Samples/signalr-service-quickstart-serverless-chat)

3) 進入 `src/chat/csharp`。 將 `local.settings.sample.json` 重新命名為 `local.settings.json`。 將連接字串貼到 `AzureSignalRConnectionString` 並設定如下。

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "AzureSignalRConnectionString": "Your connection string here"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "http://127.0.0.1:8080,http://localhost:8080,https://azure-samples.github.io",
    "CORSCredentials": true
  }
}
```

> 注意：Host 的部分是在 local 測試時，為了避免 CORS 的限制所設定。請務必將 local 要測試的網域加到 CORS 的值裡面。

4) 開啟 Functions.cs。 官方解釋如下：此函數應用程式中有兩個 HTTP 觸發的函式

* GetSignalRInfo - 使用 SignalRConnectionInfo 輸入繫結來產生並傳回有效的連線資訊。

* SendMessage - 在要求主體中接收聊天訊息，並使用 SignalR 輸出繫結來將訊息廣播給所有已連線的用戶端應用程式。

5) 啟動 local function 測試。

```
func start
```

![local function 啟動](https://lh3.googleusercontent.com/3504Bocz7haQ3JPmdJwqa2XwHdc_EhIQpmtPqtOftqxaQUK5qLHeVAaSz9JNWpEhD7ezP81kEeq6LB6Loa2aL5OIYYWVjjA4GwibWVIl_pbw_BAN9IyZfTBBvmE9Vz-NRljNw1h-6deKZJZLgWT57tKi5I1ml_PwuOFGL0fh1PHbrPq6VC8YyVchEb4l0OdFYdpFz2h14pJMmelh0jV8M7lqQrIY4aK-lN0ttAn01wQZWh7nnXO-aVhFxYVdI6_-SKoDsu2LnFscOqb5QohvLZkFF3FzgPzRqraWwE4F-KRgXrfk1JPrh0r1qB0yAtu0VZfdbwk1PSXlhnabxHVn6_F0Z6pfrcaASFIkQHzrIonsxwPQm40_W5_BJvRxWCxVHQJed5--C4226IoeDXHRu3jevGzWButrAGJq0s9bCDzrmDg_u9MNKP4klPgZDmmLVfOrqZXAIOhrXmiEOvUSPdUXnIyOOzo0mtU7sFyqmf3UnCk7afZQ3uR8gxGhTSEBsVSl743Csc2-Xp84PJ4xWsmwxfi5vxrPRv3NVO5LQ6v5GB_vx49YCqaxJjYv5tZ9Fd_Hq_2S4MhASR5fSGzD_TzReNfs7p0KM333949JNKUb-e2-nLCkwxdHS0Yk-AZKQ70M-bZTUVu3HElg9UrkfqpdMyu4LtzbiimLqIOGyekCOD3FqShQ8r9q=w2206-h1378-no "local function 啟動")

## Local Web 測試

1) 因為瀏覽器若打開 html 頁面會預設使用 https 處理。所以為了避免 CORS 限制。請安裝啟動本機的 http 伺服器。 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

![Live Server](https://lh3.googleusercontent.com/91mzygWcGmu3ljW09OLhtTAfv2Ugb589jczgciy3mOSuWbCUBjOAeN2BUA-MgYWzRbaoXFWwIqoUHqzcykEA4Aw4odpSHDSboaTWxYYpnTT8CmclxtK9t2HYZWUF4HlUKk806h8Jhq3iup2I414hAKpWCtcKgPidv64aPwucq3GYS_ZKsTXudLB7MIfK0wZ_yR47MscN_9ne6KDJvzv3EU4T-1XNMJZdu6ISqzgrUUCgIh-hnUHeSUH6Vy0M1Kc4rNDjBnp14xLA899OhmeZJiB5xQ5UKbv9Icf-dT3yW7qQRSgxWnMvMWgyle_DdmFSYwLJTqMjLaCnBF_LZiS1bJMfDcuctigjp3lqhy75LDcVssUs55sG_8qmd6zgY1A1PVeEbc3faMfQwM9ANDRZA4GAPLFTVYfsp5wVR6cCkYc6tehN7Q1D2DhTrgoJCZ55r0-9nsG-uA11nh5Lmy9Fe7TmPMceVqZXWYYqdP8Q35UHa8Kgq54dfYLjJ2PLOisuHzurd-qQes4NQfhCvsnsXW78VL-UsaW29tFMS_7k7_NH4X9DFNP7oUBsv87ISO_kpm0VWAylbsilxbLT8n5xa57q3USTJuBR5e6DYixRM0L0K_ElogvfiC2TMmYg_F4M5j_Fmg-VoPrxzIt4u6CQ9sNJ6ExcujX0ZEth-aiguKyQNlK2xBs2x9L8=w1908-h938-no "Live Server")

2) 用 `Live Server` 開啟 sample html 範本 `/docs/demo/chat-v2/index.html`。

![開啟 sample html 範本](https://lh3.googleusercontent.com/AgiqJicbCJPOqOd7krSCj4eoQulKtewUr71Gs67h-Z3PWiWpQT3hUguVvqQ_Wbsg82SPMZ6Cq5BC9BLN-YkgZQTf1l7JRwd3k5l0yfztgG3Mb_rRUps_ozF1ebzft2z4rst0i4xcEdY453CtVWWHIfkpl6iGgAdDptdUUDfeWvytYg8LEZX-Z9mpkyXI79oI3sYcXVgloKf0FH3ArfwUquBNNwQEUano4e7PPOcYkvXP3d0v9eO2JvayxYfc-c3WSSHEj4rPbx6SvlbZa8O4-0Q_x-rDQuLEoa7u7kCrBnIdaw0xbRxRBhPiGGxbYUJ_s3dBstI4DKzDt-wyJyKBwwV8K5zhfy5wwx4E4grg9NVZf9dp0l2-DDoh7zjHBLCpgLU1-YdmLKp47cmwxLPA7-FnloIsldbLrBS7hv3OQAfDMEb9o8_MQb_44ELsklUVY6wSo6rY894Ew5Wmu24CBd5UbjnO_vjOvvtKNPZKrnDmvnqmofS0x1Kk-Qzy5qKgZ4M3xXt8NAwGm6qa2Xi2vTZhKwy-ApKzBz-VqaOE1VWNW4cCgUZCh00MBeYxWSCdeJOrQlHgkW_tP0zuBBZFxu88siuX6ZTxq3mpVNa7bENEjPJjCSpxMXQemG-CqhQCnGZJTBkSUArTNUSNRDaQ4jixziHJURlhdZlS04s0MGEjPgsLJGM_RKkR=w2206-h1378-no "開啟 sample html 範本")

3) 自動開啟後，務必輸入 `apiBaseUrl` local 測試為 `http://localhost:7071`， Name 也是必填，請輸入聊天室的使用者名稱即可。

4) 成功之後就可以輸入訊息測試。並能多開數個分頁，測試訊息的接收是否正常。

![測試訊息接收](https://lh3.googleusercontent.com/PYziZWr5t2kOAe9sp4dAJ7f9RmUy-MVlPhZqyus33kJyLQIj61CocH4Rdj955TFA1SVQXZlsSqDhZtafBG5Z25vcLlq28mHCp8OnbxOqh65P81rNFxOH56SfUkJ91ha4KPI8ZHzzSk9zArbDgBNE9iM9NjTZ97lsDsbyO9kuqLDpuj2emQ1r9ak9iRLQXAotahmAelkr2dUiLCsbCphjQHX_fZA9k9KAsAmt2Rq7s5eBTqoHr_V3ZPHemP8QHJg41cHBMfLMwxaKKxqh7PtubOq33yRamyEsrFBfEi8mWAPfLTYmJbGD0izpZEuG1fhBamxoRt175Tgjv6qEIrwakqNQyBn_LnRoQCXYsntJ0XaWDka9yM1Vk9g4zeXp9Jdus09p3Gyj_ACYL98ESUffg8ifDiOPy7cAeFje9dM_FG3bQMtNBLn6Rq8BXXOcERuYUunQsOyalskX_8rnrfvDFGNm9I7Lm5y-wUMw59DmiuvvZsftTtM8lzhLKJDPziD1a_r13RhjLlBo1vfXM0Iq8dsGGe0G4KbinGq4kLIIx0rjg_BDDRQwQUThCUzpOVkYzkKPr7zyFTilAaZAsOeF_k54MrnLVq0sBPCUNN2EYUxI-mzWuhEtNIOzY4K-tmP1AtljaQeVRYnuDp-mMbmLfPW-2PiSf7iSlu6B03DhIpS3EfbFHW0xKEUH=w2532-h1246-no "測試訊息接收")

## 發布 Azure Function

* 安裝 [Azure Functions](vscode:extension/ms-azuretools.vscode-azurefunctions) 擴充功能。

![Azure Functions](https://docs.microsoft.com/zh-tw/azure/includes/media/functions-install-vs-code-extension/vscode-install-extension.png "Azure Functions")

安裝完後請務必重開 VScode。

1) 請務必確定 VScode 只開啟 src/chat/csharp 中的 csharp 資料夾。

2) 從擴充功能登入 Azure 帳號。





## 參考資料

* [快速入門：使用 C# 搭配 Azure Functions 與 SignalR 服務來建立聊天室](https://docs.microsoft.com/zh-tw/azure/azure-signalr/signalr-quickstart-azure-functions-csharp)
* [快速入門：使用 JavaScript 搭配 Azure Functions 與 SignalR 服務來建立聊天室](https://docs.microsoft.com/zh-tw/azure/azure-signalr/signalr-quickstart-azure-functions-javascript)
* [使用 Visual Studio Code 開發 Azure Functions](https://docs.microsoft.com/zh-tw/azure/azure-functions/functions-develop-vs-code)