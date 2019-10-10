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

之前有寫過一篇 [.NET core 2 + Vue-cli 2 的起手式](../../../../../2017/12/02/DotnetCore/NET-Core-2-0-SPA-with-Vue-Cli/)，到了2019，兩者也紛紛出版本3。這次，我們將說明如何用 .NET Core 3 + Vue-cli 3 起一個新專案，附贈最新 [Vuetify 2](https://vuetifyjs.com/en/) 的 Material Design 框架。

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

![專案目錄](https://lh3.googleusercontent.com/wwWCN7sEkOe_b8cLViDcZC3R7ME3UockINzTAB_YRf8k7jQNAFEpzVNgkU-nXD_CU5tkIyOXMqGOo8KxGORoOZu5m7HOEfj7dHnv5Oz4mHqkQ_IHSgBKFYsJqh133OyK_NVLoJ1kOFtDoEQH1tDB5HZPZ8BUK4XSAtLX0aLyxaXneFWbKpHy8dLGAdSBzcqfXkXSx8mg7KZB5KzNFOlo08pYfQEyMRucyNkIrC1ppYRY0N1p4thGmrIHd6YR11FW16_DgL_obNECZUkq4kPaFSdtvbLifXEPyMoS7KjXMHlIpaavDQoN0qcBayEe-xI55NSvyAwX8ZwOFCF3gFk89tm6VoJUgCqMwf1dXM55uTJWWAgRkpCC1-lBd_7fOR6wvVy_CCRE-aSLKxoFDkU36btYoOo71bbpy_NP0aQTwAIXTYk5tWG00qun1U0lxZXmVpreIb8DPrJgIobJq_e8qVP01fHd-nqtci1JFpUiXqDpINedxyZ6Psqu4cJNTQRF9U8P7pVDHkOIqDTHunyIANbDHLWCZpbiTwGSV_3yIMewp86VW4yY1OpxBODqOfriLZwGstDzzywaxvzusuORxHB2lpmBXalHqv7VAy5LWmPLz3hMLmfZjRtpreJMTF2iIr1I69mS92A9fPzDaAa2nFAtzndq_UZtHNOAemugAV77T-LKfraOsD6K=w618-h934-no "專案目錄")

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

![http://localhost:8080](https://lh3.googleusercontent.com/26dQQ-M5-koPHKH_y9BFawnWirodMxFgDh4_9zREOiK9aXtry7Fwro6SmZGsajgFdH9hROsNvEpc5dai6mhaIs2MgO_Zfm73zLelayCDD_zRrhI9rHkYnJ5jjxcz9esWBeep5LT1-X73iS44NX0xaMzXtApoQAoOgZsnYcZhE8NvXbej8iEBMD-LirvJMMOyV409Lru2GSJAfb4EgegggnrK6_tK6NqqYRqWXc75EdoaadI8RO68OiyguxQaBe5RY7aB6L-aG4wet7yqA-QGfXd-kbkY8WfVtu_Joczi4mTs_ecaP3LGOIaTNE1WCjmxTZmDcWn9ei44ry_x09QLNf7nnN0HFQ5wvNasrY7gKDiPuoLGgHx1w9j4u8waaPqUZzaCXwSWLr0yqXQooulUGh-HfAmS-M2u-ft9QetC2DoVvyv4knB45d7SWDcRrDNUOHO_BMk3-JhdtHG-L0hVS4LiIbF09116mh_BEcVjXfBCJdwXChHr0mhDUl8b4JCsTcAYiwaIW9mCxxJ_AiTCGjIzcLTZX5QyZwjHMR8_rPUR5pMK-50mJRmfo7OI0PwIzLjWY9riCARatgXmkMB0htsYjawiPBMcSvljIdK9lRzqT2iRzkzSm1Hi8S8uADy6hR2bjgrNW3XgZvkmUJzIKFtUhrG87ztfiCPF1f7I49ru6SVZP-BqOL37=w2206-h1378-no "首頁")


## 起始 `.NET Core 3.0 MVC` 專案

* 安裝 [.NET Command Line Interface](https://github.com/dotnet/cli)

* 新增一個 Core MVC 專案

```dotnet
dotnet new mvc
```

把產生的檔案都移到最外層 (跟 Vue 同一層)，如下圖。

![專案目錄](https://lh3.googleusercontent.com/Qjjqvf8bGzegupNfGqrhGY-wbZImSgqxh35W1Y4LzsZde1Q_DMcVdCdi8fl2IY5LNLudirlwxYXjEUVqJoaqn_PpOuwar2J4c8K2sGqfWDiylE0K3699Hb9LsoOrE1XjDXhS3LSLYBJBMwatlmkWBgD3EBbvPGsnC5jMpN-vbL8SOHwb09wEnHEn1NmTQ49QSGiKfxUADK9-RSkgCLuTCZ1oFBL9DJZyYmJjqJhNHVE99LlLVZOS_Ys55-Wx-zh_mRN7ukj7Kttn7E1cH8zaYw93U6jROeIG74dtLTMA-gEZvhxZwHQ_XgajwqnlUFFsEgq54BrNd4_9hB--mFe6O9qo4R9dcl4omKlISBtiS8jiTd08Dr5-DaAXfCF2ZntN2Z_YfIxlu9jOpAeDImvL7-yWkkAgfQwxg410RHidywyw-6nVHqsoVia65nXB0lXQ0h-zuuQ_dXXGP2TuerGI37VeIzqS5vYPbqYJyjXj2C7D8WVrfr5-dB5pUG7h9jEX4Ozj7Y4rpHshYHCEog7dQcu3uqWG8bfdlhWmGXEd1GK37SWJAotDLwEkhkSpAxfhZwHcZSrDzBHWzXlxvpUfsH1WWRJAQqH6vcmODmlGpnxw290ikSPw4jjnnKALrkbFUAJKJxo7Iy3ZA-yi2bTskDCsI3HdMHaks1MuwjHIWH9KyfbzSPWk03c7=w614-h1208-no "專案目錄")

* 刪除不必要的檔案

因為我們是 `SPA` 不需要用到 MVC 其他頁面的功能，所以將多餘的頁面和樣式去除。參考如下的資料夾結構。

![刪除多餘頁面和樣式後的檔案](https://lh3.googleusercontent.com/FvEsZbRxdBXRzXbLUcSV2yboSLNo1yGJzqPp9kZLBS9GQABvNI-LaUk-c99plidnPWSL6Bxyeb_rRW8-L7aIBv4q-gnENfQeCupDfiJ55b3Irg6m0vEE2z7-fBa-zUI_desXw-nQ9fdf20nEZGXa5VxMAg_gaqTaySfUUKZS0XTk7Zw6pO3ENTrLxLLRP8GG6gC0i-OqIaps4uSDYHFm-fEYixkX6sIkbopJitlztYrB0QbckrbhQKt5UArxR57F5dWDoCTrLYPeSctO--_wZ3gTeaZhmZkQJPmE4AYHSs8YFyIBhUD18XcIQe8iuXwHmYp0u_xpcexmF0G4rfaUjhbOZSSvTVUgNZoRSPLt-u-bzw33tVu-EUP7lEq6YeeRsi2yc3_I1sZe0YnG2yTIrwzR-8LHn_MVlu-aFK59tj7tZzSV7vQZ9_Pm2Eyokg9_S1L_jeAWuWcIVsoioF-KwDifPhYuGKBETOdwUX6tbDz7ZzxNw4qb5T9w9BKrNrJ5t4LQknLeXjHolGOVms2051Cm3M4qcYDQkBmpYpWM5Bpweki1seQGf336WG5oy_N5XDhk86SITaFZQEGS5zT2Ga7E3jXH05zjRfC7EpJTbxw1KROn7OuhB6RcBmWExAafJ3twx0WiAfxLIavGSBrOhz-4oC9ZQqE6utllDU55FP3eEaZhUq3Xfen4=w620-h1248-no "資料夾結構")

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

執行如下 npm 指令或使用之前寫的另一篇文章方式 [vscode task](../../../../../2017/12/25/DotnetCore/NET-Core-2-0-Debug-with-VScode/) 來啟動專案。

```npm
npm run hmr
```


成功的話就會從 `Chrome` 開發者工具看到 `HMR` 連結成功囉～

![http://localhost:5000](https://lh3.googleusercontent.com/2yJWDSLLqr03zouev5wQTGAYVkvx6nt_2oX-jefwiwzVq4vbOkaZ0txl0OIs7XNrP2uRLB0N1o_QWhn4aaedbcCejciDzEKp5yLyxdYjb5GDhXdyghtob8GiPUb1oNvHJwKdBRwjQBS5QiP754tjaPeXvpz5o9G4PryJ2Yd3WjJiifnX7xPWqjrG5whyr4yzwWv4A_67w9sRkTLP6KeeO5v6Xiq8lnq-Bp1cRvuwW3SYbOX2ktosRCTsk2FjScrJRjfijBtTlQe35Sm08vuv1iI0b5GusQqT4KeVLicAn5_rKurm1MS9LswYRjnJH5_3j4Xj5sVDDRLb1UiZqfZG6WnmqWV4a4WRiFpfZmS2dgsrodki8jl6qw3OXu7RP1nE-DWPVXg5O6aO9bIUAfVV8f7TnWz0-jDHFlHBP-xDXD58I6315N6jCdBJ6iGlkTZsz67_ZOpjsfgdwuLrULqycseq2MZe0XaYQR9XjgX4yVZ8M2sJ1tl05U3BDiSL6G0XGpDecrMDeAZ_tgqW7J30j7z3TAzwRxeoEppQ0TWs7-dInOJQ9ZwyRIEJVuKgsVUCproRkQ3chPshlBDF3eyo4R_TQdVqRE0Gif6OAlzP_pLFXtOAsCyupFlFI9ouXjowWrQXJ2aTJ8XD8mj-7LKhPiXFQTTn1FO8lDHxxxd2beHn3YKqwNJzSzYk=w2206-h1378-no "首頁")

今天的範例在 [github](https://github.com/Annilla/dotnet-core-with-vue-cli3/tree/v1.0)，下回見～

## 參考資料

* [Microsoft.AspNetCore.SpaServices.Extensions](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices.Extensions/3.0.0)
* [Quickly Configure ASP.NET Core API to work with Vue CLI 3!](https://intellitect.com/quickly-configure-asp-net-core-api-to-work-with-vue-cli-3/)
* [從 ASP.NET Core 2.2 遷移至3](https://docs.microsoft.com/zh-tw/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio-code)