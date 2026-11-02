---
title: Deep Learning by Python - Setup Environment
categories:
  - Python
thumbnailImage: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png
thumbnailImagePosition: left
coverImage: https://logonoid.com/images/python-logo.png
coverMeta: out
tags: [Python, Deep Learning, Keras, TensorFlow]
date: 2020/02/15
updated: 2020/02/15
---

深度學習(Deep Learning)將以數篇呈現，先簡要介紹以開源機器學習平台Tensorflow與神經網絡API Keras 在Python實作 Deep Learning。

<!--more-->

1. 開源機器學習平台Tensorflow，TensorFlow是一個開源軟件庫，在維基上提到用於各種感知和語言理解任務的機器學習。如語音識別，Gmail，Google相簿和搜尋。TensorFlow提供了一個Python API，以及C++、Haskell、Java、Go和Rust API。第三方包可用於 C#、.NET Core、Julia、R和Scala。TensorFlow的底層核心引擎由C++實現，通過gRPC實現網路互訪、分散式執行。雖然它的Python/C++/Java API共享了大部分執行代碼，但是有關於反向傳播梯度計算的部分需要在不同語言單獨實現。目前只有Python API較為豐富。

2. Keras 是一個快速實現深度神經網路用Python編寫的開源神經網路庫，包含許多常用神經網路構建塊的實現，來簡單處理圖像和文字資料。能夠配合TensorFlow，Microsoft Cognitive Toolkit，Theano或PlaidML之上執行，其代碼代管在GitHub上，社區支援論壇包括GitHub的問題頁面和Slack通道。

環境設置：原本按照《深度學習入門教室》一書安裝步驟發現遇到許多問題，python版本與Anaconda的適配問題，以及一些tensorflow相關問題。
在安裝與環境設定過程常卡住，以下提及安裝需注意的適配版本。
以下安裝範例為Python 3.7.4+Anaconda+tensorflow2.0
安裝Anaconda：有分python3.7與python2.7版本。

![Python](https://miro.medium.com/max/2880/0*svhqy8xjtu21TnE9 "Python")

安装Tensorflow ：
輸入命令
```
conda create -n tensorflow python=3.7
```

![Tensorflow](https://miro.medium.com/max/3200/0*DZi-3SBgonasZeH4 "Tensorflow")

1. 安装tensorflow：
輸入命令`pip install tensorflow==2.0.0 -i`
https://pypi.tuna.tsinghua.edu.cn/simple
激活tensorflow：輸入命令`conda activate tensorflow`

2. 安装Keras：輸入命令`sudo pip install keras`
測試執行：表示安裝成功

![Keras](https://miro.medium.com/max/1650/0*peFE1lqO8w65CN3W "Keras")

確認安裝環境：輸入命令python

![python](https://miro.medium.com/max/2944/0*gRcC0khdnxuynJI8 "python")

測試執行：
輸入命令`import tensorflow as tf`
輸入命令`hello=tf.constant('123')`
輸入命令`sess=tf.Session()`

![測試執行python](https://miro.medium.com/max/2912/0*k7tyXMt7OpeznOiE "測試執行python")

會錯誤！
原因：在於TF 2.0不使用`tf.Session`，若要繼續使用，需改為`sess=tf.compat.v1.Session()`

這裡我先備註以後會需要的資料

1. tensorflow 指令說明網址 https://www.tensorflow.org/api_docs/python/tf/compat/v1/Session#graph

2. 待研究將TensorFlow 1.X的代碼轉換為TensorFlow2.0代碼
https://blog.csdn.net/xovee/article/details/93402172

接著
輸入命令`print(sess.run(hello))`

會發現錯誤！

![測試執行python](https://miro.medium.com/max/2884/0*5JslrazdBViiv0ek "測試執行python")

原因：
使用`tf.compat.v1.Session()`雖可執行，但是，然而TF 1.X的的API 使用 Graph Execution，但是TF 2.0 默認使用 eager execution，要解決這個問題有兩種方式一種辦法先定義數據向量圖形，或是使用`tf.compat.v1.disable_eager_execution()` ，在tensorflow 指令說明裡提這個指令被使用在TF1.X代碼至TF2.0代碼的轉換(It can be used at the beginning of the program for complex migration projects from TensorFlow 1.x to 2.x.)

因此，最後如下暫時解決，確認是可執行的。
測試執行：

![測試執行python](https://miro.medium.com/max/2214/0*MApZjmF_L-69z5Kn "測試執行python")