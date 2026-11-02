---
title: .NET Core 3.0 SPA with Vue-Cli 3 - Start New Project
categories:
  - .NET Core
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET Core, dotnet, Vue, Webpack, SPA, MVC, VScode]
date: 2019/10/10
updated: 2019/10/10
---

之前有寫過一篇 [.NET core 2 + Vue-cli 2 的起手式](../../../../../2017/12/02/Dotnet/NET-Core-2-0-SPA-with-Vue-Cli/)，到了2019，兩者也紛紛出版本3。這次，我們將說明如何用 .NET Core 3 + Vue-cli 3 起一個新專案，附贈最新 [Vuetify 2](https://vuetifyjs.com/en/) 的 Material Design 框架。

<!--more-->

## 安裝 `vue-cli` 模板

> 注意： vue-cli 需要 Node.js 版本 > v8.9

<br />

* 安裝全域 `vue-cli`

```npm
npm install -g @vue/cli
```

* 起始一個 vue 專案 `my-app`

```npm
vue create my-app
```

按照 `vue-cli` 的指示選擇預設 (`default`) 即可。

安裝完後，可以把專案從 `my-app` 資料夾中移出來，如下圖。

![專案目錄](https://lh3.googleusercontent.com/mg4HgncLJ66AZ4wnPznFb1X55drWjTCgDy-22BLolsQRlBTYghwQg8kDxWkCaneH4eoyns8JS9Xi42b74lk4ATinxc19-ka7voTtH8ySKcfZZ4j9nRsj_X0FQvBCzIIsk9ZHBv159X0piGmlaJKvLm2q6V-Rpmzbpl6pvd9M1zNtO5Cu01hFRED2G0Zoh9y5ELB6u_vU1uqoCFfNM-eDDjFMQrqTZ0vd3PxmjciMwdQ8hjMxMGoo9pVci3V3z-K0NlFqfuX5O7Skg1Qhk0OgCa7DYqfmL-QrdZ-PcJOK0sMBCY2LfW3cOjFK9AkQTCTYnbn4xMLLAX8dR1jRgFXBGIsDJl_FiE-HCNrT71O1wrA1yd751rABO2w8ghElsJgteqvSBBoukRrgYwX4z8Efuu1BReVfX3hfdPAsfJKSHsZZuM-C5G3GzT58GHQpXpVHyAQME344dX0zqaZmDrWb0PKcD77G0lsYmZcpXAuczuhWADSAPMUGCuswMgan3q35GRrpN9SJwekmzHXs1J818eOptpn0jTO3x--I6bhsvB9OpmchFI8ZoFtE21LDPa1Jfrss_-HZ4ZpzdNslDdNeOL33kHLu00zXne8AwMCCmD1KKp4aLwniW3-n7tVuQFTKLYRb3sNfKOgbdYwNHK4urpo1IaBLazDwcjnhESmz-fJEzyZ2mH-121t3_VfSDcwsmSOKlZKs6pXbA_uK_YFIIBHF5IozC1vv6QUQ40WIe9aiUnLTqg=w618-h934-no "專案目錄")

* 執行套件安裝

```
npm install
```

* 安裝 Vuetify 框架

> 如果不想要安裝樣式框架可以直接跳過這個步驟

```
vue add vuetify
```

* 測試 vue 專案是否安裝成功

```
npm run serve
```

用瀏覽器看 `http://localhost:8080` 如果有成功出現如下面畫面就是安裝成功 `vue` + `vuetify` 的專案囉～

![http://localhost:8080](https://lh3.googleusercontent.com/WTI7SZCavIJAmLRqZNbCMMRHxPwSm6yD_EkBf-DHV8Rn_96Sa39daK1aYjxFd34c_XAjiC8yDZVwspgn2arZdo-_ptFvduN4CQ0cNnJC5_xohUq10ggkuzHrdn7m9KezmU-8E4FZMBD3PzRMeWPYlwJCj-JjSfkNpQZGLRn37RyoGNvpJECdgnBsEEQx5AZHx-E4ZJDOTujyDBGEkqvp8lI3oW--jDOoCIMaFUuLu-vHxKvWtFprE_mBzwI7KIkkeC9D0rWhUsX93hJT4x46Elmj1TOYSDRMiNogHG0P5cZ5JSUIUsdM_T9XKQ-U0oTDeD3iHipDBmBfJH5KgmpXGh3e8cBlyHqpkqu5DVXe468cWfNT9nRqCB3IQOPtPcJg5tB0bKe68fQTjaIwwiqEngW1aB-8gXZgt5OCDeAyOZJB0rvXvr9uoL69sUrHCamSGT0ppGLenX7yFeP-uNVPXgi899gQj9siNlqWbQWnjjdrhsTAvrx5-3rFS43GIssEkwwB_MiQT411oAdd_g9ds_BgCDSohxD2NOWZAWJ3NmvrSupIsvckps0p7jLJ-4Mqb82J5KvJ0GdIT8wIjqF8hZmhFeAWxFgmwE10axr7eClFsN4CjIqhnFdO_v86vyYDx2S60EVqUPW8t1PorW0jbXJG3TGjEeWlHYLEme8d7mQaIT1001f174oEY9twCvgAd5YxmLFCZyaGrqvleFOveUc221DTKkgYdC9k9oAjr2qAyV4J7A=w2206-h1378-no "首頁")


## 起始 `.NET Core 3.0 MVC` 專案

* 安裝 [.NET Command Line Interface](https://github.com/dotnet/cli)

* 新增一個 Core MVC 專案

```dotnet
dotnet new mvc
```

把產生的檔案都移到最外層 (跟 Vue 同一層)，如下圖。

![專案目錄](https://lh3.googleusercontent.com/W203GfdGjLI_7ZhUUZjmE4LYVKs6AFGNMcVohuF2E5_eQqKQrXc_ZV58HCPvQPjwBuxBPZEplhsJ_-WrPJ_nH_5OgjijEFAcZsStz2-ckatWBngIvgpo4p1pWPt_o613hObxX2CS9jz7g9zuRqIyQH5CAwrF8pnQAvls9fHvsnL3Zzuy6mqCNjzy9H6C1KJTmA7mdNbSJhtUr6JqNjFuw1hWgEAyVGiDCJNcNnGFK0zi3f74byGEMh_K7ymwRv6iJUhXN74GwTRMpV7r_jZIOrs7AOv10UhezxHhKFvkCe_ZZ0YbhohieE4LmwiAzL-urryjpLE95apTMTf6xRIRB8Gv-0lX4UNjC4MN9CI7jwdGklQ2djXDnmfys7rbsk0p6a5gr3dPsD-98pwTC3I--LmngPdBjOR6QED59piLeKbeQ4N3QG0L19JW6hcF0liPvdEwToC3psjUiC-jYimsUK6jvxU2xlyMqAIAtjm9fLCmnFp5kfMH_qbihmO9dQGnpmsYx_rCQqTXrfmODYvTL1LwiMBRe-Hp_twIBHB1S6K5XtCCk19SLYHD7VEKKK6sfAcawo5V4Ohe_yJ8Phxkod0rhXv4KSvlYdD3iJbCLCFhMhWgyAIGhZTcST0lDzUhxz5L8TKZRa5hbHA8kjw7hNlnjhYm5b92HFetGcwPbTi-3t57nL9C0H2drgjwqOBh8m8Zwh5l0QDdBrdToOQg-PKII9XK0eMh5oriRCvgjjaP_H14vg=w614-h1208-no "專案目錄")

* 刪除不必要的檔案

因為我們是 `SPA` 不需要用到 MVC 其他頁面的功能，所以將多餘的頁面和樣式去除。參考如下的資料夾結構。

![刪除多餘頁面和樣式後的檔案](https://lh3.googleusercontent.com/_6YDysh2v7AoOk4y82teBx4qsEXdrEvO5y6LKda2Vt87eLX1RCRfXOIaFhHK5Iy7OsBCkzdRehhB7-VsvrRSUWZsPO9tONVNw-c1pwcsrsA6wOAMn-D22zI0gQa2DrEDmBYttUore2G0kNtZkGaLwt2LQMuK3Zs-8cOEyHUPy1nnWD66GVUNozqty6tNTGmyIK20sN8kZpCLEikfEYunKI3gVlT0G5UfEmVAJ25VlKUbkziTEPwTDtwxvBmz6qlPbcEKXNSOLAe-zAeYR6b4-yTPFifwmiNrwdHEebD3kkZrYdfCPO9KFw4FOFQpNHkrGP-LxbeXCnatvDzMA0k9A81iHtVD0t8_9vkfb0lBvm40S0sFTvXXI_kUW-ncr639iMkXZ66v55ZXWOMAUL3trWESyUZ6FPMtiCzUVZRNlR0kfKV_CmgLivBugJxl696Vh6MPbUWcAwr3dxBnU9Iwvd5wHad4lpGbDEF2GTSzL8ZV1Hh8HnwLiGbqqGfJzFs9O8sgsa4dDJAnQpwCuCTrJJbk5KmMNPLR5tbiSyY9MGz1nbkCYtrtSNNPro_OsqiG3uMNXm-tCbtUkTjGG953ULeTY45NQqPwVqugKu3T0t4DMKjEJvoky0IBUOd7hdoTMgyRb9bMMJMedWyAuoFLZwM5Ar4qOZ3Um-nmQ2HA-lp4GDG1wO9rbxk4Sh2Ng8WR_rzH9Hnwy1DR8qFrXWv4E58WrzfK79A01VcCgBkAyR74bl9vUg=w620-h1248-no "資料夾結構")

* `HomeController.cs` 刪除多餘的 Controller，只保留 `Index` 和 `Error`

```C#
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnet_core_with_vue_cli3.Models;

namespace dotnet_core_with_vue_cli3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
```

* `Index.cshtml` 多餘的 HTML 刪除

```html
<div id="app"></div>
```

* `_Layout.cshtml` 修改內容如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="~/favicon.ico">
    <title>dotnet_core_with_vue_cli3</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@@mdi/font@latest/css/materialdesignicons.min.css">
</head>
<body>
    <noscript>
      <strong>We're sorry but my-app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    @RenderBody()

    <script src="~/js/app.js" asp-append-version="true"></script>

    @RenderSection("Scripts", required: false)
</body>
</html>
```

> 誒～你有沒有覺得明明我們把 `wwwroot` 裡面的靜態資源都殺光光，卻在 `_Layout.cshtml` 上面放 `app.js`？因為這邊是留給 Vue-cli 去產生靜態資源，所以我們接下來就要說明如何設定讓 `.NET Core` 和 `Vue` 做連動。

## 設定 `HMR` 和 `vue router` 的 fallback

接著才是重頭戲～如魔法般的 `HMR` 功能登場!!!

如果還不太知道什麼是 `HMR` 的，就 google 一下囉～

* 安裝 `aspnet-webpack`, `webpack-hot-middleware`, `webpack-dev-middleware`

```
npm i -D aspnet-webpack webpack-hot-middleware webpack-dev-middleware
```

* 新增 `Microsoft.AspNetCore.SpaServices.Extensions`

```
dotnet add package Microsoft.AspNetCore.SpaServices.Extensions --version 3.0.0
```

* 修改 `Startup.cs`

```C#
...
using Microsoft.AspNetCore.SpaServices.Webpack;

......
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ConfigFile = @"./node_modules/@vue/cli-service/webpack.config.js"
                });
            }
            else
            {
                ...
            }
            ...

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
......
```

* 新增 `vue.config.js` 在最外層

> 這邊就是設定 `Vue-cli` 將產生的靜態檔案放在 `wwwroot` 讓 `.Net Core` 去吃。

```js
module.exports = {
  outputDir: 'wwwroot',
  publicPath: "/",
  chainWebpack: config => {
    // https://github.com/vuejs/vue-cli/issues/3603#issuecomment-483913563
    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // https://intellitect.com/quickly-configure-asp-net-core-api-to-work-with-vue-cli-3/
    // aspnet uses the other hmr so remove this one
    config.plugins.delete('hmr');
  }
}
```

* 若要使用 vscode 跑專案：修改 `Properties/launchSettings.json`

修改 `Properties/launchSettings.json`

```json
{
  "iisSettings": {
    ...
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "NODE_ENV": "development"
      }
    },
    "dotnet_core_with_vue_cli3": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "NODE_ENV": "development"
      }
    }
  }
}
```

* 若要使用 npm 跑專案：`package.json` 指令加上 HMR

安裝 cross-env

```
npm install -D cross-env
```

`package.json`

```json
{
  ......
  "scripts": {
    "hmr": "cross-env ASPNETCORE_ENVIRONMENT=Development NODE_ENV=development dotnet run",
    ...
  },
  ......
}
```

執行如下 npm 指令或使用之前寫的另一篇文章方式 [vscode task](../../../../../2017/12/25/Dotnet/NET-Core-2-0-Debug-with-VScode/) 來啟動專案。

```npm
npm run hmr
```


成功的話就會從 `Chrome` 開發者工具看到 `HMR` 連結成功囉～

![http://localhost:5000](https://lh3.googleusercontent.com/iwyqGKY3x0PNLHZvmRMQxAG53ta1MNkplE5rDHIwfr884IxIPhOlHaZwUzMdPS4B5MvWrK-BzP1afJMnZkHfuwAGJ8szM1VJmqo3BkZZs9GN92uP-zTk3oS7spcGo8DinPhbi9M7TZJkku95nzIxh1UIebtussfopG1byaWLQOna9wt9_CK8tiSyugr1A6x0bPG20SsAO6--hwmNa4SiODAyeTeADmMs1dtrI8d-6gDvtULip1yljjzKfnDm2iECcreinLfD3mUyUkAaW25-jzyXpa3dQ5EokLdx9JNVVLWM1kKmeadHGdcPNXEKJIaWK8TMFuxjRL6YiiwPeRpEMXSHGZI7Czbaqxh1GJmdBCejLIbWaOy-NKuqKJ37_Xf5FVFTnXlEyBZs3yAfr2pNtBgbk9SsZJvB1ljszKOE-CwhXmJJinfBpJ-kGd2Lh2gsQwo2JC6_frvi3uv3gl9LVhBQC6iZdawwvwTveTr_E4X7Z5-P-EenyBMKUV6IRoFUE_b_dfPZlPYMBCD8UBSau-F3Y1HZNAIihor6R1o4c2RSKF01GWXq62HBdnlQgX-94mNkj4noSm9dHaErDzTOm0WUwJVw_SxfdFB3_2aP6ddi5ce2mxHiiau5ajes_rvFBuMlLAmwIOhiXR1KwdBdS5hqjTB4rdGTGEA3IYqlyLXtLdFNzM8iuMhZvlFra90dpXFlLvYBGCitsQ8VTQFc4ukw1Di0HvdY4cZFsLulfcTv9FhEAA=w1780-h1112-no "首頁")

今天的範例在 [github](https://github.com/Annilla/dotnet-core-with-vue-cli3/tree/v1.0)，下回見～

## 參考資料

* [Microsoft.AspNetCore.SpaServices.Extensions](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices.Extensions/3.0.0)
* [Quickly Configure ASP.NET Core API to work with Vue CLI 3!](https://intellitect.com/quickly-configure-asp-net-core-api-to-work-with-vue-cli-3/)
* [從 ASP.NET Core 2.2 遷移至3](https://docs.microsoft.com/zh-tw/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio-code)