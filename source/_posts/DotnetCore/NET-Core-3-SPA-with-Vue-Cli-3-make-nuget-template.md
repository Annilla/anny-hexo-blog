---
title: .NET Core 3.0 SPA with Vue-Cli 3 - Make Nuget Template
categories:
  - .NET Core
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET Core, dotnet, Vue, Webpack, SPA, MVC, VScode, Nuget, Template]
date: 2019/12/07
updated: 2019/12/07
---

上一篇寫過 [.NET core 3 + Vue-cli 3 的起手式](../../../../../2019/12/07/DotnetCore/NET-Core-3-SPA-with-Vue-Cli-3-make-nuget-template/)，這次我們要把做好的專案寫成 dotnet new 的範本，這樣以後就不用做這麼多繁瑣的步驟啦！

<!--more-->

# 製作範本

## Step1. 將內容放到 Content 資料夾

新增 `Content` 資料夾，把原本專案的檔案放到 Content 底下。

![將內容放到 Content 資料夾](https://lh3.googleusercontent.com/DM0FGhjan-_q6Kldvpdse7NxiCwGNlimwMYeakJ-kS-P5jyKz01UeewDUCCNVj-P81V9dssVgwmszQlwwBi40pZuFMI-EFnoREY6RmVcToZZTAx6zi29PEbH7d2eKEQcFSIM7CharolWbPK_UC1HngzN6u1PVKfYu4qhIETIUPccN9zRjGUfBwCOexzAMB_JWzoCy1nhR09B8n3x8zVdcQ8KHQL8UkjlJT7EECU7JE4hvWjNKbalwzROwjGlJHR8Rm_8Arje9iN3v3d4hvewzRtCWx8zpzjxMyPgWYYX-jofabaeM6rcAOhCId0BqCTjQ_ObVpRUK_lE1Vf1O2jqFRjOvas1Ll9Z5dXjuis_KXDsMyvcogE-Q6HzzzmcI5qyDK9FrB93N-JBCJD33fsfIeYbwIvevNOejtO-UNUvRces2Xxmj4RzjKVxBPiYBayAILx4PEqEY9VwKlBuDFVJZXAO1rF9RVPzVlmARhNG7_ezALQSlDXVIG1nAEA3uwXV4Ry3vxsb4N662yy2OufzZ-6W8z_C69WvDmPHCZb_J2eaQX6zQ_3KNlO1AwjrTlGNEGRw3eUudGQAwND2PkC0Lj-HeCZWNkPZwY8ToMQ2dKDrrow3px3qjqB6hbU8nCkkdO6j2C8qqFZnR0ETIH-7V7OyJE0jLu1c-exfR0bUmm1e__deylIbqI8yFG3uP3c-bXoXec0pMyU7TqUMshAaQAhslIAZ4m1hquCsOkls1hKIKnzQyQ=w636-h1324-no "將內容放到 Content 資料夾")

## Step2. 設定 template.json, .nuspec

* 在 Content 資料夾內新增 `.template.config` 資料夾，新增 `template.json`

Content/.template.config/template.json

```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Anny Chang",
  "classifications": [ "Web", "MVC", "SPA" ],
  "identity": "Anny.DotnetCore.VueCli",
  "name": "Anny Dotnet Core 3 With Vue Cli 3",
  "shortName": "annydotnetvuecli", 
  "tags": {
    "language": "C#",
    "type": "item"
  },
  "sourceName": "dotnet_core_with_vue_cli3",
  "preferNameDirectory": true
}
```

| 屬性 | 說明 |
| --- | --- |
| $schema | 使用 template schema |
| author | 作者名 |
| classifications | dotnet new 列表顯示的分類 |
| identity | 辨識此 Template 的唯一 ID |
| name | Template 顯示名稱 |
| shortName | dotnet new 使用此 Template 的簡寫 |
| tags | dotnet new 列表顯示的語言 |
| sourceName | 這個是到時候使用 template 時，可以將專案名稱替代成要的 |
| preferNameDirectory | dotnet new 沒有指定專案名稱時，他會自動命專案名為所在資料夾的名稱 |


* 在最外層新增 .nuspec 檔案。

Anny.DotnetCore.Template.nuspec

```xml
<?xml version="1.0" encoding="utf-8"?>
<package>
  <metadata>
    <id>Anny.DotnetCore.Template</id>
    <version>1.0.3</version>
    <title>Anny DotnetCore Template Example</title>
    <description>
      Anny's DotnetCore Template for example.
    </description>
    <authors>Anny Chang</authors>
    <summary>
      ASP.NET Core Teamplate for Vue Cli.
    </summary>
    <packageTypes>
      <packageType name="Template" />
    </packageTypes>
  </metadata>
  <files>
    <file
      src="Content/**/*"
      exclude="**/node_modules/**;**/package-lock.json;**/bin/**;**/obj/**;**/.vs/**;**/.vscode/**;**/wwwroot/**"
      target="Content" />
  </files>
</package>
```

| metadata 屬性 | 說明 |
| --- | --- |
| id | dotnet new 安裝 nuget template 識別唯一ID |
| version | nuget package version |
| title | nuget 官網上對於 package 的標題 |
| description | nuget 官網上對於 package 的描述 |
| authors | nuget 官網上對於 package 的作者名 |
| summary | nuget 官網上對於 package 的摘要 |
| packageType | 告知 nuget package 類行為 Template |

| files 屬性 | 說明 |
| --- | --- |
| src | 指定來源資料夾位置 |
| exclude | 排除特定檔案 |
| target | 指定生成資料夾位置 |

## Step3. 上傳 nuget package

執行 nuget cli 指令，若還沒有安裝請連[這裡](https://docs.microsoft.com/zh-tw/nuget/install-nuget-client-tools#nugetexe-cli)。

執行下列 nuget 指令打包 package。

```
nuget pack
```

將產生出來的 .nupkg 檔案上傳至官網。等待官網審核成功後就可以使用 Template 囉～

![nuget package 審核成功](https://lh3.googleusercontent.com/yLk0gObRHknv2ngdI8O11NeDcMkR29sCTV7ppUmQ-IEKBunro_4vpsh-TcIlpQYXj1ujWf_cZ6_lp-vl6oBui1KJYT59C4BT2GNvkv8qg0CMC93NWgio63OTuHf_344IVhUuX_CAgdMrE153QPu4soqcBaUlF0Ax3dYF0x6sHyyyGP8x8YjslbFdMVrMxTus7AfcC0h0b3Mzz19iUmzCu5OvB_5iVjNYnMNrMCHwURSvQP0J1w9PVBiJykWluB73IMh-EGcTIxH_6eyvArkdz_-pz-_Am3ZNdWiUXQml86aAJb7Tm6OJqcRlxNuO_nQpFW6JtUQVRWlkA85Xb32_uG9JymE_zrG47g6p982LlXTUv3kJC5RfjebKnbwlVDxoO7J501XO1abfjTKWzbSx6ERhyVjJE0CzJg2qiEKtOmXsJbAew0tJiSjH2H_ri-adgAudtsPS-Rair5WVtpB0AHaRjLcmZG4L1beOmWOcK1_0RejtWgE_Lwx19ngM1D8fuXsNd3uX_EGua57gR-0DlUpDwfknu14k9YuG9Wdz_TMmacAdfPFcR38vjLuGCzcHZ3RtSv-vmy-42x4KN5mKARKYKbmYptqVijJYN2yuI_W7LlVA9ruHKkLaBXKW8tHRyiWTx4nOvGvuLlNw6Qv9PaVp3ch7Ml8_lOnmChtNaCoknd4wE_txHXjegvpypmHrxE-RDGEw9LCGjn-Ny8R5p0yLSI8OoSho5ZcfdSkYyP-fNllqew=w2560-h1376-no "nuget package 審核成功")

# 使用範本

執行下列指令安裝範本。

```
dotnet new --install Anny.DotnetCore.Template::1.0.3
```

成功會看到列表出現安裝的範本名稱。

![安裝範本成功](https://lh3.googleusercontent.com/bEIRs1iYDfjJPgiOMe5tbywr7VZZh_RY9rw8mRHrA4BiWNwSzDO98dQrZ4CNe6QONzhdr1DQOrLJRw_OjjGie1lbOkCwlyTMqYb-5bV-3kL0McGF2mzzsbCJBuKRBxG2J4_7D3StYlRJoNbwb9GkOxDiB_uV0E2jY10ZNc5Uh0W7aaAx56zcLz7J7aWZCpLJfSBPBHXtXEDn6N3vnYwj2W81s_UHv95Zy78tJrRPrpWfk-FvLQM4LLnfKmTL0Ta0bv3eTBGYyzBXZKRuWIpkXeIjgmHh6eWXECGrM1LQ47tCYFTQ5vxJ4_eG0J75qOOYuZNmEl2fWHXYjlDjrr2e03lIPC5SFcgcymDvRViA9ZKtWooNCpirpA4xmWwHuMCr2-krpuudLCnOD0JmgYG2vfJ5yYjUvOc7IPuvrpHHMGZHNmOlVt6KRgd-B4n1D3C1QrFQ_l-hi_GyBXQNiHOj8roiW4vAh0WWmh2TjevORVh43ZOQ6WNWU8kLta63wAkWRCpBRcOP3_4f69fy3Wpkjex9T025guk11itdMNRkdDLNR8DUuz7-fLJmy1fI_6_urs9-lodG7NtKAxAtaxh5RKf2ZuW0ZA7MITnXFX28BMazKheqQEnn5F3fuaWoJVipRkawc8xTwN9AHh5o7NYRqcp_Rto3KP9NPAwy_sPPY2-SaDexOvRsZHpM9ib7LebSDb7iA7YLcAjOYOhJOZnFWls8Q56Wtl7VxrZC_1gPSF9aRGcPEw=w2310-h1354-no "安裝範本成功")

請去一個新資料夾來測試範本。
不指定名稱執行的話，專案名稱會自動取名為當前位置的資料夾名稱，如下指令。

```
dotnet new annydotnetvuecli
```

若要在當下位置建立自己命名的專案名稱，可傳入參數如下指令。 (XXX 請替換成你要的專案名稱)

```
dotnet new annydotnetvuecli -n XXX
```

若要安裝新版本的範本，記得解除舊的版本，解安裝請執行下列指令。

```
dotnet new -u Anny.DotnetCore.Template
```

這樣就完成我們的模板測試囉～今天的 code 放在 [github](https://github.com/Annilla/dotnet-core-with-vue-cli3/tree/v2.0)。

## 參考資料

* [How to create your own templates for dotnet new](https://devblogs.microsoft.com/dotnet/how-to-create-your-own-templates-for-dotnet-new/)
* [安裝 NuGet 用戶端工具](https://docs.microsoft.com/zh-tw/nuget/install-nuget-client-tools#nugetexe-cli)
