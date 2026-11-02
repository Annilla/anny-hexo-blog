---
title: Deep Learning by Python - Use Keras-Sequential Model Example
categories:
  - Python
thumbnailImage: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png
thumbnailImagePosition: left
coverImage: https://logonoid.com/images/python-logo.png
coverMeta: out
tags: [Python, Deep Learning, Keras, TensorFlow]
date: 2020/03/22
updated: 2020/03/22
---

model API 分為 Sequential （循序型） 和 Functional（多功能型）。

1. Sequential API: 用於單輸入單輸出，簡單的 model 由簡單的 layers 串接組成。
2. Functional API: 用於多輸入多輸出，layers 可有分支並可共用而組成複雜模型。

簡單的keras 的工作流程如下:

1. 創建 model
2. 創建和添加 layer 到 model
3. compile (編譯) model
4. Train model
5. 訓練完成後可用於 prediction (預測) 或 evaluation (評估)

本篇只是測試安裝環境是否成功，所以只會練習到工作流程第 4 點。

<!--more-->

# 基本概念

DL (Deep Learning) 是擁有多個且多層神經元之 NN (Neural Network 神經網路)，而所謂的多層通常是指隱藏層（Hidden Layer）。DL 要用幾層、每層要有幾個節點（神經元）、每個節點間要如何相連、要採用什麼激勵函數等（統稱網路架構），都是由我們決定，因此可以說是 NN 的天賦；而權重與誤差則是透過大量資料自動學習而得，可以視為是 NN 後天的努力結果。

![Deep Learning](https://miro.medium.com/proxy/1*5egrX--WuyrLA7gBEXdg5A.png)

# 此篇要練習的完整程式碼

這次要練習的完整程式碼如下：

```python
# 引入要用的函數
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.utils import np_utils
import numpy as np

# 準備測試資料
data = np.random.random((1000,784))

# 準備要逼近的目標資料
labels = np.random.randint(10, size=(1000,1))
labels = np_utils.to_categorical(labels,10)

# 創建 model
model = Sequential()
# 創建和添加 layer 到 model
model.add(Dense(64, activation='relu', input_dim=784))
model.add(Dense(64, activation='relu'))
model.add(Dense(10, activation='softmax'))

# compile (編譯) model
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=["accuracy"])

# Train model
model.fit(data, labels)
```

以下我們分段解說程式碼。

# 引入要用的函數

```python
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.utils import np_utils
import numpy as np
```

* keras.models: 從 Keras 引入 models（模型），Sequential 是 linear stack of layers（多個網絡層的線性堆疊），單輸入單輸出。
* keras.layers: 從 Keras 引入 layers（層）的 Dense 類型。Dense 類型的層（layers）為具有64個神經元。
* keras.utils: 從 Keras 引入 utils（工具）的 np_utils 函數。
* np 即 numpy，而 NumPy 是 Python 語言的一個擴充程式庫。

# 準備測試資料

```python
data = np.random.random((1000,784))
```

建立一組測試資料，使用 np.random.random 在 [0, 1) 中產生隨機數，DATA 為 1000 行 784 列（1000x784）的陣列。

# 準備要逼近的目標資料

```python
labels = np.random.randint(10, size=(1000,1))
labels = np_utils.to_categorical(labels,10)
```

* [numpy.random.randint](https://www.itread01.com/content/1541532849.html)是矩陣變數，其語法為 numpy.random.randint(low, high=None, size=None)。labels 結果 為 1 維隨機整數組（1000x1）ex: `array([0],[8],[6],…[9])`，因沒有 high 的值， 數值隨機介於[0,10)。
* [to_categorical](https://www.itread01.com/content/1549602019.html) 將類別向量轉換为二進制（只有0和1）的矩陣類型，原來 labels 為 1 維隨機整數組（1000x1），to_categorical 按照 10 個類別將這 1 維隨機整數組的每個值都轉換為矩陣裡的一個行向量。

舉例來說，`array([0],[8],[6],…[9])`的1維整數組，to_categorical 按照 10 個類別將 array 轉換為
array
[[1. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 1. 0. 0.] 
 [0. 0. 0. 0. 0. 0. 1. 0. 0. 0.]…
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 1.]]

# 創建和添加 layer 到 model

```python
model = Sequential()
model.add(Dense(64, activation='relu', input_dim=784))
model.add(Dense(64, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

* 定義Sequential模型，並model.add添加層。
* 此範例第一步添加 Dense 類型的層（layers）為具有64個神經元。由於模型需要知道它所期望的輸入尺寸，順序模型中的第一層需要接收關於其輸入尺寸的參數信息（Dense支持通過參數 input_dim 指定輸入參數信息，而某些 3D 時序層支持 input_dim 和 input_length 參數。
* ReLU為激勵函數（Activation Function）之一，[詳見此](https://mropengate.blogspot.com/2017/02/deep-learning-role-of-activation.html)。
* Softmax為激勵函數（Activation Function）之一，[詳見此](https://blog.csdn.net/bitcarmanlee/article/details/82320853)。

# compile (編譯) model

```python
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=["accuracy"])
```

* 模型在使用前必須編譯模型（model.compile）
* Optimizer (優化器)為 RMSprop：優化器目的是建立優化模型，優化目標函數並訓練出最好的模型，其功能是通過改善訓練方式，來最小化 (或最大化) 損失函數。RMSprop，[詳見此](https://zhuanlan.zhihu.com/p/34230849)
* loss (損失函數)為 categorical_crossentropy：損失函數基本上可以分成兩個面向(分類和回歸)，但都是希望最小化損失。loss(損失)就是實際和預測的殘差，損失愈小愈好。categorical_crossentropy，[詳見此](https://blog.csdn.net/legalhighhigh/article/details/81409551)
* metric (度量函數) 來評估模型性能，'accuracy'為評估指標。[詳見此](https://www.cnblogs.com/weiyinfu/p/9783776.html)

# Train model

```python
model.fit(data, labels)
```

最後設定參數輸入 data 與目標 labels，來 model.fit，也就是訓練模型。
執行結果，如圖表示以 TensorFlow 作為引擎使用，損失率為 2.3494，準確度為 0.0920。

![執行結果](https://cdn-images-1.medium.com/max/1600/1*dIwMENM7YtaYqdFOOYnQvw.png)

# Reference

* [Keras 簡介](https://laoweizz.blogspot.com/2018/12/keras.html)

* [速記AI課程－深度學習入門（一）](https://medium.com/@baubibi/%E9%80%9F%E8%A8%98ai%E8%AA%B2%E7%A8%8B-%E6%B7%B1%E5%BA%A6%E5%AD%B8%E7%BF%92%E5%85%A5%E9%96%80-%E4%B8%80-68e27912ce30)

