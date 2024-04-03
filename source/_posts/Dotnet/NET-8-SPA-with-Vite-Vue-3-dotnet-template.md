---
title: .NET 8 SPA with Vite and Vue 3 - dotnet Template
categories:
  - .NET
thumbnailImage: https://s3-us-west-2.amazonaws.com/ca3db/pbs.twimg.com/c4bff765d9dfb3d8c6163b1de3a8e1a78cf0f9399b5a79c35695a49813821c44.jpg
thumbnailImagePosition: left
coverImage: https://vitejs.dev/og-image-announcing-vite3.png
coverMeta: out
tags: [.NET, dotnet, Vue, Vite, SPA, MVC, VScode]
date: 2024/04/03
updated: 2024/04/03
---

近期因工作的關係~需要研究 dotnet 8 template 用法, 我就連同 Vue3+Vite+Vutify 一次組裝完成, 做成模板來測試用.

<!--more-->

Template 作法不多做說明, 官網有[詳解](https://learn.microsoft.com/en-us/dotnet/core/tools/custom-templates) XD, 我們直接從打包用 local 試裝使用看看.

## 1. 打包 nupkg file

用 cmd 打包 `AnnyChang.Dotnet.Template.csproj` 產生 nupkg 檔案.

```
dotnet pack
```

結果會產生在 `bin\Release\AnnyChang.Dotnet.Template.1.0.0.nupkg`.

![打包 nupkg file](https://media.discordapp.net/attachments/1135775611948900472/1224999263533137972/image.png?ex=661f8877&is=660d1377&hm=45970f82702922dbeee99b27a39a83b06366ccf09e92dc417e8b9d8ab11195ab&=&format=webp&quality=lossless&width=699&height=415)

## 2. 用 local 打包好的檔案安裝 template

先去 nupkg file 所在位置.

```
cd bin\Release\
```

安裝 package.

```
dotnet new install AnnyChang.Dotnet.Template.1.0.0.nupkg
```

![用 local 打包好的檔案安裝 template](https://media.discordapp.net/attachments/1135775611948900472/1224999755961208892/image.png?ex=661f88ed&is=660d13ed&hm=ba109aedac000017a66fd6c9e6ed9785008e2e8e24d095c796b78ad1db1819a6&=&format=webp&quality=lossless&width=699&height=415)

## 3. 使用 Template

先去想要建立新專案的地方執行 dotnet new 並指定客製的 template. 使用 `-n` 指令來命名新專案.

```
dotnet new annydotnet8vue3 -n testweb
```

![使用 Template](https://media.discordapp.net/attachments/1135775611948900472/1225000108157046904/image.png?ex=661f8941&is=660d1441&hm=2be888f1f44f64c11f13debce8d084d55eb8a40d4b10e258b47ea6ba69ee91f9&=&format=webp&quality=lossless&width=699&height=415)

恭喜! 我們用客製的 template 建立了新專案.

## 4. 解安裝 Template

若同個模板要安裝新版本, 需先解除舊的 template 才能再重新裝新版本, 如下指令.

```
dotnet new uninstall AnnyChang.Dotnet.Template
```

今天的範例在 [github](https://github.com/Annilla/anny-dotnet8-vue3-template-example/tree/1.0)，下回見～

## 參考資料

* [Custom templates for dotnet new](https://learn.microsoft.com/en-us/dotnet/core/tools/custom-templates)