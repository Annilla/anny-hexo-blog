---
title: Upgrade .NET 5 with Vue & Webpack without HMR
categories:
  - .NET
thumbnailImage: https://dotnet.microsoft.com/static/images/redesign/social/square.png
thumbnailImagePosition: left
coverImage: http://imgconvert.csdnimg.cn/aHR0cHM6Ly9oYWJyYXN0b3JhZ2Uub3JnL3dlYnQvZnUvdmYvbXAvZnV2Zm1wa2dza2gxbHJmcGtqcHVxd2tvc2I0LnBuZw?x-oss-process=image/format,png
coverMeta: out
tags: [.NET, dotnet, Vue, Webpack, SPA, MVC, VScode]
date: 2021/06/07
updated: 2021/06/07
---

.NET 5 之後會將 dotnet 各 platform 整合起來，且 dotnet 3.1 cshtml HMR 的 extension 功能被官方強迫棄用，目前我看各方文章感覺還沒有一個很好的升級方式。要馬就是改用網友寫的 [Vue-Cli](https://codetherapist.com/blog/aspnetcore-deprecated-spa-services/)，把 config 轉到 cli，要馬就是 Nuget 套件改用[網友寫的](https://github.com/dotnet/aspnetcore/issues/12890#issuecomment-784537371)。我自己參考國外文章，是有人用 Vite 做到用 index.cshtml 的 HMR: [這篇](https://blogs.taiga.nl/martijn/2021/02/24/integrating-vite-with-asp-net-core-a-winning-combination/)。但是因為公司內部還是有 IE 瀏覽器且 Vite 相關套件還沒有到完整，沒辦法放棄使用 webpack，只好參考這篇嘗試用 webpack HMR，很不幸的，若照文章模仿雖然 HMR 字眼有出現，但一直沒有正常作用，胡亂嘗試了一番，勉強用奇怪的方式有做到 Auto Reload，但沒有 HMR 效果就不太滿意。目前先將這些研究文章和亂試的方式記錄下來。

<!--more-->

## .csproj

```xhtml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.SpaServices.Extensions" Version="5.0.6" />
  </ItemGroup>
</Project>
```

## Program.cs

```csharp
...
using Microsoft.Extensions.Hosting;

namespace dotnet_core_vue_cli
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
```

## Startup.cs

```csharp
...
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace dotnet_core_vue_cli
{
    public class Startup
    {
        ...

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
        }
        ...

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapFallbackToController("Index", "Home");
            });

            if (env.IsDevelopment())
            {
                app.UseSpa(spa =>
                {
                    // SPA的檔案放在最外層
                    spa.Options.SourcePath = "./";
                    // webpack-dev-server 起在 port 3000
                    spa.Options.DevServerPort = 3000;
                    
                    // 呼叫 npm run start
                    spa.UseReactDevelopmentServer(npmScript: "start");
                });
            }
        }
    }
}
```

## webpack.xxx.js

webpack.dev.js 把 entry 部分 加入 'webpack-dev-server/client?http://localhost:3000/' 進去 js，devServer 設定如下。其中的原因可參考[這位網友解釋](https://github.com/CommanderXL/biu-blog/issues/7)。

```js
...
module.exports = merge(base, {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000/',
            './src/main.js'
        ]
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        // hot: true,
        port: 3000,
        inline: false,
        liveReload: true,
    },
    devtool: 'eval-source-map',
})
```

## package.json

npm run hmr 會呼叫 dotnet run 把專案跑起來。
執行 startup.cs 會自動呼叫 npm run start 顯示 "Starting the development server"。之後就會將 port 3000(webpack-dev-server) 跟 8080(dotnet) 做對應。

```json
{
    ...
    "scripts": {
        "hmr": "cross-env ASPNETCORE_ENVIRONMENT=Development NODE_ENV=development dotnet run",
        "start": "echo Starting the development server && webpack serve --config webpack.config.js",
        "dev": "webpack serve --config webpack.config.js",
        "build": "webpack --config webpack.pro.js"
    },
    ...
}
```

這樣起來的專案就會依據 vue code 修改做 Auto Reload 的動作，程式放在 [Github](https://github.com/Annilla/dotnet-core-vue-cli/tree/v5.0.beta)。

## 參考資料

* [webpack-dev-server使用方法，看完还不会的来找我~](https://github.com/CommanderXL/biu-blog/issues/7)
* [ASP.NET Core Vue Starter](https://github.com/SoftwareAteliers/asp-net-core-vue-starter)
* [The deprecated ASP.NET Core SpaServices](https://codetherapist.com/blog/aspnetcore-deprecated-spa-services/)
* [Integrating Vite with ASP.NET Core – a winning combination?](https://blogs.taiga.nl/martijn/2021/02/24/integrating-vite-with-asp-net-core-a-winning-combination/)
* [BrunoLau.SpaServices NuGet package](https://github.com/dotnet/aspnetcore/issues/12890#issuecomment-784537371)
* [Webpack Development Server Support for ASP.NET Core 3.1 and ASP.NET 5.0](https://github.com/RimuTec/AspNetCore.SpaServices.Extensions)