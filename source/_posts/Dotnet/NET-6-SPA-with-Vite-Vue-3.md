---
title: .NET 6.0 SPA with Vite and Vue 3 - Start New Project
categories:
  - .NET
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET, dotnet, Vue, Vite, SPA, MVC, VScode]
date: 2022/10/26
updated: 2022/10/26
---

Webpack 雖然在前端很強大，起專案和 HMR 的速度也跟著套件裝越多越慢，但隨著 IE 的沒落，很多套件其實都不需再使用。這時候新一代的技術 [Vite](https://vitejs.dev/) 颳起一陣旋風，利用現代瀏覽器支持 ES 模塊的特性，直接用瀏覽器的資源做更快速的打包 & HMR，用了一次之後就回不去 Webpack 了 XD ~ 本篇說明如何用 NET 6 + Vite + Vue 3 來起一個新專案。

<!--more-->

## 起始 NET 6 專案

dotnet new 指令會自動產生 react SPA 專案，我們接著對此專案稍作修改。

```
dotnet new react
```

刪除原本的 ClientApp 資料夾。

![刪除原本的 ClientApp 資料夾]()

## 用 Vite 建立 Vue 專案

```
npm create vite@latest
```

專案名稱一樣取 ClientApp 即可，接著照步驟選擇 Vue 專案。
![照步驟選擇 Vue 專案]()

## 修改 .csproj 檔案

針對以下幾點參數作說明:

1. SpaProxyServerUrl: NET 專案起來之後的網址，可以放預設不動(`https://localhost:44434`)，或自己另外指定 port。
2. SpaProxyLaunchCommand: 開發時要起 HMR 的指令，這邊用 Vite 專案內建的 `npm run dev`。
3. SpaRoot: 這邊要放前端專案的資料夾名稱，因為我們故意取跟預設一樣的 ClientApp，所以這邊不用修改。
4. DistFiles: 這邊要放 build 完成後的資料夾位置，這邊用 Vite 專案內建的 dist 資料夾 `$(SpaRoot)dist\**`。

```xml
...
<PropertyGroup>
  <TargetFramework>net6.0</TargetFramework>
  <Nullable>enable</Nullable>
  <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
  <TypeScriptToolsVersion>Latest</TypeScriptToolsVersion>
  <IsPackable>false</IsPackable>
  <SpaRoot>ClientApp\</SpaRoot>
  <DefaultItemExcludes>$(DefaultItemExcludes);$(SpaRoot)node_modules\**</DefaultItemExcludes>
  <SpaProxyServerUrl>https://localhost:44434</SpaProxyServerUrl>
  <SpaProxyLaunchCommand>npm run dev</SpaProxyLaunchCommand>
  <RootNamespace>test_dotnet_vue_vite</RootNamespace>
  <ImplicitUsings>enable</ImplicitUsings>
</PropertyGroup>
...
<Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
  <!-- As part of publishing, ensure the JS resources are freshly built in production mode -->
  <Exec WorkingDirectory="$(SpaRoot)" Command="npm install" />
  <Exec WorkingDirectory="$(SpaRoot)" Command="npm run build" />

  <!-- Include the newly-built files in the publish output -->
  <ItemGroup>
    <DistFiles Include="$(SpaRoot)dist\**" />
    <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
      <RelativePath>wwwroot\%(RecursiveDir)%(FileName)%(Extension)</RelativePath>
      <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
      <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
    </ResolvedFileToPublish>
  </ItemGroup>
</Target>
```

## 設定 Vue 專案的 https 憑證

如果要開通 Vite https 可以安裝 https://github.com/liuweiGL/vite-plugin-mkcert。

```
npm install --save-dev vite-plugin-mkcert
```

### 設定 Vite.config.js

接著去設定 Vite.config.js。

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mkcert()],
  server: {
    port: 44434, // 要跟 .csproj 檔案中的 SpaProxyServerUrl 一致
    https: true, // vite-plugin-mkcert
    strictPort : true,
    proxy: {
      '/api' : {
        target: 'https://localhost:7092', // 要跟 launchSettings.json 中的 applicationUrl 一致
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
```

## 完成~~

完成後，可以直接使用 VS or VScode 的專案執行按鈕就能成功啟動囉~

![啟動畫面]()

今天的範例在 [github](https://github.com/Annilla/test-dotnet-vue-vite/tree/v1.0)，下回見～

## 參考資料

* [A guide to getting started with ASP.NET Core 6, Vite, and Vue 3](https://github.com/keithn/dotnetviteguide)
* [Vite](https://vitejs.dev/)
* [Vue 3](https://vuejs.org/)