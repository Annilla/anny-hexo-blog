---
title: .NET Core Upgrade 2.2 with Webpack4 & Vue
categories:
  - .NET Core
thumbnailImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
thumbnailImagePosition: left
coverImage: http://www.dotnetcurry.com/images/dotnetcore/vuejs-templates/modernwebdev.png
coverMeta: out
tags: [.NET Core, dotnet, Vue, Webpack, SPA, MVC, VScode]
date: 2019/01/01
updated: 2019/01/01
---

紀錄 .NET Core 升級到 2.2 和 Webpack 升到 4 要注意的地方～

<!--more-->

---
## .NET Core 2.2 設定

### csproj 專案檔

`TargetFramework` 版本要改成 2.2, `PackageReference` 改成單一個 `Microsoft.AspNetCore.App`，就可以囉～

``` XML
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>
</Project>
```

### Program.cs

修改 `Program.cs` 中 `class` 內的程式，參考如下程式片段。

``` C#
namespace dotnet_core_vue_cli
{
  public class Program
  {
      public static void Main(string[] args)
      {
        CreateWebHostBuilder(args).Build().Run();
      }

      public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
          .UseStartup<Startup>();
  }
}
```

---
## VScode / VS2017 launch 設定

為了在 webpack 上可以依據環境變數判斷不同的 bundle 內容，所以分別在 VScode / VS2017 的 launch 檔案設定環境變數。

### .vscode/launch.json (for VScode)

`.vscode/launch.json` 在環境變數加上 `"NODE_ENV=development": ""` 。這邊有個小技巧，就是 `=development` 是放在前面，而不是在後面的雙引號，這部分應該是一個小 Bug，但目前先用這個方式解決。

``` json
...
  "env": {
    "ASPNETCORE_ENVIRONMENT": "Development",
    "NODE_ENV=development": ""
  },
...
```

### Properties/launchSettings.json (for VS2017)

`Properties/launchSettings.json` 則直接加上環境變數即可。

``` json
...
  "environmentVariables": {
    "ASPNETCORE_ENVIRONMENT": "Development",
    "NODE_ENV": "development"
  }
...
```

---
## Webpack4 設定

### package.json

更新所有 package 並執行 npm install，參考如下設定。

``` json
{
  "name": "dotnet-core-vue-cli",
  ...
  "scripts": {
    "hmr": "cross-env ASPNETCORE_ENVIRONMENT=Development NODE_ENV=development dotnet run",
    "build": "webpack --config webpack.pro.js"
  },
  "dependencies": {
    "vue": "^2.5.21"
  },
  ...
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.2.0",
    "aspnet-webpack": "^3.0.0",
    "babel-loader": "^8.0.4",
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.0",
    "cssnano": "^4.1.8",
    "file-loader": "^3.0.1",
    "mini-css-extract-plugin": "^0.5.0",
    "node-sass": "^4.11.0",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.5.0",
    "sass-loader": "^7.1.0",
    "uglifyjs-webpack-plugin": "^2.1.1",
    "vue-loader": "^15.4.2",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.5.21",
    "webpack": "^4.28.2",
    "webpack-cli": "^3.1.2",
    "webpack-dev-middleware": "^3.4.0",
    "webpack-hot-middleware": "^2.24.3",
    "webpack-merge": "^4.1.5"
  }
}
```

### .babelrc

因為升到 `babel` 7 之後套件會整個改成 `@` 開頭的，所以舊的同名 package 就可以刪掉了。所以 `babelrc` 設定檔也要改成如下片段。

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
```

### postcss.config.js

升級 `Vue-loader` 相容 `Webpack` 4 後就不會有自動 `autoprefixer` 的功能，需要自行引入 `postCSS` 來做這件事情。所以 `postcss.config.js` 設定檔要新增如下片段。

``` js
module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'cssnano': {},
  }
}
```

### webpack.base|config|pro.js

> 這邊升級後沒有用最新 `vue-cli` 3 的原因是因為 `aspnet-webpack` HMR 預設吃的 `webpack` 設定是最外層的 `webpack.config.js`，但最新 `Vue-cli` 3 已經把 `webpack.config.js` 藏起來了，改成 `vue.config.js` 做後續加工處理，且我們不使用 `node server` ，而是用 `dotnet server` 做 `HMR`，所以其實已經不需要 `vue-cli` 3 了。

因為我們需要分成 `develop` 和 `production` 的 `webpack` 設定，所以就可以把 `webpack` 的結構拆成一個共用的基底 `webpack.base.js`，然後 `develop` 就透過 `webpack-merge` 將 `base` 結合 `webpack.config.js`，而 `production` 則是將 `base` 結合 `webpack.pro.js`。

以下擷取部分比較重要的地方跟大家分享。

* webpack.base.js

``` js
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  ...
  module: {
    rules: [
      { // vue-loader 已經沒有預設 autoprefixer，所以 CSS 的部分要加上 postCSS
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      { // MiniCssExtractPlugin 目前在 HMR 模式沒辦法打包成獨立的 CSS 檔案，所以在開發模式的時候，必須使用 vue-style-loader 替代，變成 meta 內的 style。
        test: /\.scss?$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader', // for autoprefix
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: 'imgs/',
          outputPath: 'imgs/',
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    // Webpack4 需使用 MiniCssExtractPlugin 打包 CSS 成獨立的 CSS
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),
    // Webpack4 需使用 VueLoaderPlugin 才能正確讀取 .vue
    new VueLoaderPlugin()
  ]
}
```

* webpack.config.js

```js
const merge = require('webpack-merge')
const base = require('./webpack.base')

// 使用 webpack-merge 將 base 和 config 結合
module.exports = merge(base, {
  /* mode 替換掉以前的 process.env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  */
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    noInfo: false,
  },
  devtool: '#eval-source-map',
})
```

* webpack.pro.js

``` js
const merge = require('webpack-merge')
const base = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 使用 webpack-merge 將 base 和 pro 結合
module.exports = merge(base, {
  /* mode 替換掉以前的 process.env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  */
  mode: 'production',
  devtool: '#source-map',
  // 新的 Webpack 4 把優化的部份都移到 optimization 設定
  // 所以 UglifyJsPlugin 替代掉之前的 webpack.optimize.UglifyJsPlugin
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
})
```

今天的範例在 [github](https://github.com/Annilla/dotnet-core-vue-cli/tree/v2.2.0)，下回見～