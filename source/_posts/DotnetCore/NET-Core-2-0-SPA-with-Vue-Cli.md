---
title: .NET Core 2.0 SPA with Vue-Cli - Start New Project
categories:
  - .NET Core
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET Core, dotnet, Vue, Webpack, SPA, MVC, VScode]
date: 2017/12/02
updated: 2017/12/02
---

`.Net Core` 可以不用開啟慢吞吞的 `IDE`，即可快速建立專案。本篇全程使用 `VScode`，手把手教你如何用 `.NET Core 2.0 MVC` + `vue-cli` 起始一個 `SPA` 專案。當然， `HMR` (Hot Module Replacement) 神器也會一併附上啦。
<!--more-->

> 首先，這裡先澄清一點，就是 `.NET Core` 的 `template` 內建有 `ASP.NET Core with Vue.js`。因為是套裝，裡面還包含 `Bootstrap`, `Typescript` 等等，畢竟不是每個專案都會用到這些，所以本篇專注在如何結合 `.NET Core` 和 `Vue` ，那些依專案選用的項目就不會在這裡提到。

## 起始 `.NET Core 2.0 MVC` 專案

1. 安裝 [.NET Command Line Interface](https://github.com/dotnet/cli)

2. 新增一個 Core MVC 專案

```dotnet
dotnet new 'ASP.NET Core Web App (Model-View-Controller)'
```

3. 刪除不必要的檔案

因為我們是 `SPA` 不需要用到 MVC 其他頁面的功能，所以將多餘的頁面和樣式去除。參考如下的資料夾結構。

![刪除多餘頁面和樣式後的檔案](https://lh3.googleusercontent.com/SS8p9bPMBScLwOK1WgnN62PV1W2Tzw2B7KHNgVD9hs2BNQdweBgEZ2ryH8b_X24hUSPNbY52hcdlEeblEfWOjKdXFbZW_ZnZ44yftNz9fbfcuhy8BF8BrlMmmF_PBFJhB7AcOXA4o36r24UcqHbMZQcoAnkCxflijNMA7bZhNhWPXTgqXl4N_ePy8CghldoBBFzDgxtrRgPFS5Xm4cjxl69szT3g1yCmQs0goeNWTFOR12nIsnkbUQN1Cru5V6d6Emfbv9zJE8vsMzde_uFU0VyV0OgGd994-sQs-jORDQ1qijU1O3O3Ycb1Ns8ZM6In9ibZmukZ4GBtNV6SW6dj83Ley2Xo4J_4L-jt__9kRBsVvANhIEonZ-R68GcPqE0KhstaAbvu30u4qtWJJBmuRmfbcEA_1w4qdEkDJ4WJlA4PIbqketu_tLSswyN0U5MDSi0DF0PGHjQA8mXsuYhktGhoJzwEZ8HLa0ENNsIkqgKR4enL2EZWJJVcH-Zc5nqus7A-VYiNfIBv90xzV_DXyN9JVtyEuvpY0H85v65J-uRgTnkJv3JE1Oy2c3nwNcbDWVt67WYwmgr_jNheePATkguwF8zRzmp6Y5vbIGcv4O02vqVBobVZmdtycobJ9E_OT_fFwkUxzA9YCJvuwf7zJFibPpyONXOd=w492-h1024-no "資料夾結構")

* `HomeController.cs` 刪除多餘的 Controller，只保留 `Index` 和 `Error`

```C#
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnet_core_vue_cli.Models;

namespace dotnet_core_vue_cli.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
```

* `Index.cshtml` 多餘的 HTML 刪除

```html
@{
    ViewData["Title"] = "Home Page";
}
<h1>TEST</h1>
```

* `_Layout.cshtml` 修改內容如下

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - dotnet_core_vue_cli</title>

    <environment include="Development">
        <!-- 這邊放 Development 的 CSS -->
        <!-- <link rel="stylesheet" href="~/css/xxx.css" asp-append-version="true"/> -->
    </environment>
    <environment exclude="Development">
        <!-- 這邊放 Production 的 CSS -->
    </environment>
</head>
<body>
    @RenderBody()

    <environment include="Development">
        <!-- 這邊放 Development 的 JS -->
        <!-- <script src="~/js/xxx.js" asp-append-version="true"></script> -->
    </environment>
    <environment exclude="Development">
        <!-- 這邊放 Production 的 JS -->
    </environment>

    @RenderSection("Scripts", required: false)
</body>
</html>
```

現在來測試跑看看專案有沒有成功～

執行

```dotnet
dotnet run
```

用瀏覽器看 `http://localhost:5000` 就會跑出剛剛在 `Index.cshtml` 改寫的 TEST 字樣囉～

![http://localhost:5000](https://lh3.googleusercontent.com/jx-O61iOA94K7jY7sjjT1cnBGOG5cuJGlUIqGe96uJOEjZr4gbqFXfb3aD_NWUjP-fsO0pQT8FyHi_WfqN8OvYAijsFrPKfz1eZewo5RDj10Cey0BaWbcPx-fINI8QOSESlq_s-7_NLbC6P5K4n75NztGHc3k1PQybqcZTr7ECKIdjnHvZ7tUgtp0YBOblYyEyUX88rTpLHw40Lhh7LPuSIuQZAXIvUE0q6o0_u7AdfR5wBEfBPMf7TdRVb62uHJzsATQQ9BsAupE4uGj0azfDSiMgassf92umZymj9oLTO7hqZpYT526HkbUSxp8fPkahFvk64wSrClyNFrUltLA0oVXa_YCe1sZ-rS1S5cHxRNNgLDQeUHm8pMWwylXEFTGkszYXe5FVgdxJ-ShYNCOTfj1GU2aAKADKocU_Q2h4jcrX0YyRM8sOiiyI84nEG4ojOS5cAY54IXdT5d_RuAtgZNwh3qnk8MUefgImbnQZQIJnZb45xagVaHqaY3E8L4g7uVBIISo76khvDEW0mgAaCJCmUY-opy5RyFeDFEXJNPbyMfcSgfnMlpzkA_xCJhyhpIqtepveU_QIQqFepAXThCbOGbFX8JP30-seCSQMwFYpFzuTtD6QTwVfHRCDSv9r71dEM-I-EN7MUylDXaRX7MpNKj4UH3=w1024-h670-no "首頁")

## 安裝 `vue-cli` 模板

1. 安裝全域 `vue-cli`

```npm
npm install -g vue-cli
```

2. 起始一個簡易的 `vue` + `webpack` 專案

```npm
vue init webpack-simple
```

按照 `vue-cli` 的指示回覆操作如下圖。

![vue-cli](https://lh3.googleusercontent.com/7ZcKoLrotMFeNr2e41u_n_BRCQaMGoBjMQdX5_c1QH0kZycDBNJxLMz0JbnP4SU7Gb70QFSzVcNFWT4EO2qW5ThZCO1lDUhIW_2-4wPR2t02qbBHdlqYaOwAjuJhPioCY_rAFy6y9u9kPZ5rt8hEqfvHYYc76puVmwrv7r-KV9rT6RN5tdQfJzMhwnCCwMZEfysY_g-zWr49MtT2uf3q5jEKpmR3xbQ2P4QajWQ1g5lEjA-hiOQnbJXkfKl9z6tqzBxyNBQTZISlV0C7DIf4pzFTRk0IFLPW9CfnNtDNDIdT3VyTvONjMoxH6tql-qYwb59Qmg4ExG53WKIrw4YlUfVgR0jtNKnpkxQULSzRPG9xeuOdN0KLyDQ8v_Dvy4JsZLrKSPZVhWHmMyge_Kg_BHITk7Rkfu3g4wNWtZXo2keGXtTlX0_0hXdrAfQtX2lWB92lzc7TknYtrT3WwnEs5-2xKyHUh195Re2x-GdrkzbhsctuIFlw4fHHZIIq8NniKT84GZpTRXVPww9n3AqKcy9dOEdkDy_JvmEhOiLuAM3f5HRUp-8qWpo6bue5ItlRI51PgU4LuuralE9R8SgbnynfBHmkI4a_bdFXWTIUj4BJgEEvExRFhjqwpsbDlQT6MK8xd7-D1H7K6fYamrAaVdP8QYzXQwCu=w1024-h579-no "vue-cli")

執行

```npm
npm install
```

測試 `Node` 有沒有安裝成功 `Vue` 專案

```npm
npm run dev
```

用瀏覽器看 `http://localhost:8080` 如果有成功出現如下面畫面就是安裝成功 `vue` 的專案囉～

![http://localhost:8080](https://lh3.googleusercontent.com/WTK7IxK_nr3qmzCqevVgFhFZQXnkW0t4QPpng4VkfYOWOQSvFL7eHZbDEvfPqDwEjAazw49geCW3opNOVcz45uRoDcIKjPFmnoL8lL8v5Jppc2MrkEF5OvuDb912EfiapEkmNpw-DxzLcb_S3NKzsjnGs3wiuhUaMep1iSiz2Ctt6Nie9pYoV4ucqhvwJ_J4G9IOZ809FBWn7rcr7yit7K-vGQ3__3mJEv4npj123wb6RhkNcXvAswKA4VeCuaRehdCn13U94F5R0WRFFOJam5VNM_klgKWATfZsPcXMgGbQ2-M9KXmXmbZsQRBok5-qDxi9MNtKS5iEBSwgEVZipKafLl-5eqUxe5jiNSyLrHae7KeYsueMDrodFSQdnCjpPaCBjs6rUIrpsncyZGs3G56E3uMYNAfEpIYD9bzpm77m7_SBNcq8WkxbRYhDgpLsiCjiNFLl9FOXMi7ALPM5pWP5QoTi07vUJJFFU6V-pvwRoFUaOjVWb7B9o3j7RXm9hvRWo35lQ1dIQv-q0Wv-KYgrLySLS_WJtVmkdjs6T8iPAxUl0wTuMx1d99q7tgH_W3gFjuFqNL5mpd9b0T8QMMzDimpsEVCjUmzeza_HddnzVLW08caAEISY8IDdSq6CmO0q_msw-qEgUzRMhry4Bs6fzPmxFIVd=w1024-h670-no "首頁")

> 誒～你有沒有注意到奇怪的地方啊?!我們跑 `vue` 的時候是用 `node server` 執行，但是真正專案要在 `.NET server` 執行。所以怎麼把這兩者結合呢？主要原理就是：在 `Development` 時把 `node server` 當作是前端產生靜態資源 (`JS`, `Css`, `images`...) 的工具; `Production` 的部分就把產出過後的靜態資源給 `.NET server` 使用。廢話不多說，我們就來趕緊試試看吧。

## 結合 `.NET Core` 和 `Vue`

1. 修改 `webpack.config.js`，將靜態檔案產生在 `wwwroot` 資料夾中

```js
......
module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './wwwroot'),
    publicPath: '/wwwroot/',
    filename: 'js/build.js'
  },
  module: {
    rules: [
      ......
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
          outputPath: 'imgs/',
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  ......
}
......
```

2. 修改 `cshtml` 加入對應的 `js` 和 `html`

* `_Layout.cshtml` 修改內容如下

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - dotnet_core_vue_cli</title>

    <environment include="Development">
        <!-- 這邊放 Development 的 CSS -->
        <!-- <link rel="stylesheet" href="~/css/xxx.css" asp-append-version="true"/> -->
    </environment>
    <environment exclude="Development">
        <!-- 這邊放 Production 的 CSS -->
    </environment>
</head>
<body>
    @RenderBody()

    <environment include="Development">
        <!-- 這邊放 Development 的 JS -->
        <script src="~/js/build.js" asp-append-version="true"></script>
    </environment>
    <environment exclude="Development">
        <!-- 這邊放 Production 的 JS -->
        <script src="~/js/build.js" asp-append-version="true"></script>
    </environment>

    @RenderSection("Scripts", required: false)
</body>
</html>
```

* 接著修改 `Index.cshtml`

```html
@{
    ViewData["Title"] = "Home Page";
}
<div id="app"></div>
```

測試跑跑看 `.NET server` 有沒有成功？

先產生靜態檔案

```npm
npm run build
```

再啟動伺服器

```dotnet
dotnet run
```

成功就會出現之前一樣的畫面囉～

![http://localhost:5000](https://lh3.googleusercontent.com/WTK7IxK_nr3qmzCqevVgFhFZQXnkW0t4QPpng4VkfYOWOQSvFL7eHZbDEvfPqDwEjAazw49geCW3opNOVcz45uRoDcIKjPFmnoL8lL8v5Jppc2MrkEF5OvuDb912EfiapEkmNpw-DxzLcb_S3NKzsjnGs3wiuhUaMep1iSiz2Ctt6Nie9pYoV4ucqhvwJ_J4G9IOZ809FBWn7rcr7yit7K-vGQ3__3mJEv4npj123wb6RhkNcXvAswKA4VeCuaRehdCn13U94F5R0WRFFOJam5VNM_klgKWATfZsPcXMgGbQ2-M9KXmXmbZsQRBok5-qDxi9MNtKS5iEBSwgEVZipKafLl-5eqUxe5jiNSyLrHae7KeYsueMDrodFSQdnCjpPaCBjs6rUIrpsncyZGs3G56E3uMYNAfEpIYD9bzpm77m7_SBNcq8WkxbRYhDgpLsiCjiNFLl9FOXMi7ALPM5pWP5QoTi07vUJJFFU6V-pvwRoFUaOjVWb7B9o3j7RXm9hvRWo35lQ1dIQv-q0Wv-KYgrLySLS_WJtVmkdjs6T8iPAxUl0wTuMx1d99q7tgH_W3gFjuFqNL5mpd9b0T8QMMzDimpsEVCjUmzeza_HddnzVLW08caAEISY8IDdSq6CmO0q_msw-qEgUzRMhry4Bs6fzPmxFIVd=w1024-h670-no "首頁")

## 設定 `HMR` 和 `vue router` 的 fallback

接著才是重頭戲～如魔法般的 `HMR` 功能登場!!!

如果還不太知道什麼是 `HMR` 的，就 google 一下囉～

1. 安裝 `aspnet-webpack`, `webpack-hot-middleware`

```npm
npm i -D aspnet-webpack
```

```npm
npm i -D webpack-hot-middleware
```

2. 新增 `ASP.NET Core SPA Services`

```npm
dotnet add package Microsoft.AspNetCore.SpaServices --version 2.0.1 
```

3. 修改 `Startup.cs`

```C#
using Microsoft.AspNetCore.SpaServices.Webpack;

......
  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IHostingEnvironment env)
  {
    // [HMR] http://www.c-sharpcorner.com/article/using-hot-module-replacement-feature-of-webpack-in-asp-net-core/
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
      app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
      {
        HotModuleReplacement = true
      });
    }
    ......
    app.UseMvc(routes =>
    {
      routes.MapRoute(
        name: "default",
        template: "{controller=Home}/{action=Index}/{id?}");

      // Use Vue Router must add fallback route
      // Help to navigate directly
      // https://stu.ratcliffe.io/2017/07/20/vuejs-serverside-rendering-with-aspnet-core
      routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
    });
  }
......
```

4. `package.json` 指令加上 HMR

```json
{
  ......
  "scripts": {
    "hmr": "cross-env ASPNETCORE_ENVIRONMENT=Development NODE_ENV=development dotnet run",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  ......
}
```

執行

```npm
npm run hmr
```

成功的話就會從 `Chrome` 開發者工具看到 `HMR` 連結成功囉～

![http://localhost:5000](https://lh3.googleusercontent.com/teS4z4xS0BE6CsIMEuUgrFU5cEQE_naAsDJb_O-6aYc-WeCvmduiHEyRQJPaBzbMQmOImdXcfv1E9VmDRitocPemHDsPCuk-njpIeDdPItuP4kdMfI_cqaJNnrSO9k8NpJC_0NwQj5L8NgHSIH7amFlGYZwNk9JsyxhgMkOCc67_dbYE48P8gTTr0qbqutjyrm14fdsNJjyUJsAPn8xji47-Asj55hOQv8ilN3-3pNNeXAMybVAdNRoCKZk8MnMJea_qTuoiEMzltk_LHP07K6jbamM7--uqYimHhmW2ZtZ89z9GrW5mc9zR4G9X2oosIEByxrB7tlrHPyDm_JDPQ30cVBaqaed0XwYLwYyemd9IDDQb3e5UvfAbih1KB9UK6poAkEuwAaEXvFlkZRC5_rN16EVSzUoHFH5sTQ2_7xVo4YAP0U_gpP4K1gQdVUVM2yFvOBWpf8V0bJQWIv5QV9vxihQ5nZp5Mk58dK8XhAQPMxCQKDc6VdVBQ-5B5VT1_s_OATXA6masol_u--aruB29iWQPemdwa-iGpYdkWmGkAVVXTcyPqqUZ_uZDkoVo5EPhQ-fYZtlrupwtNXy84xiVmbSQSDUr7kFb4ns7e7RQ2oZChZO7bC72UuvqyMTKWH91j1htEDPQJzjHNFJKaKYmd0xg-9R6=w1024-h670-no "首頁")

今天的範例在 [github](https://github.com/Annilla/dotnet-core-vue-cli/tree/v1.0.0)，下回見～

## 參考資料

* [Modern Web Development using ASP.NET Core template, Vue.js and Webpack](http://www.dotnetcurry.com/aspnet/1383/modern-web-dev-aspnet-core-webpack-vuejs)
* [Using Hot Module Replacement Feature Of Webpack In ASP.NET Core](http://www.c-sharpcorner.com/article/using-hot-module-replacement-feature-of-webpack-in-asp-net-core/)
* [Microsoft.AspNetCore.SpaServices](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices/)