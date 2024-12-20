# 视频技术基础 - x264 压制教程 HTML 网页版

本教程的目的是简述视频技术的常识，以及视频编码器的基本原理，最后简述 x264 编码器对于这些原理的实现方法，辅以使用 x264 编码器的方法与参数说明，以及根据需求进阶扩充认知的教程地图。
本教程的目标用户是有一定计算机原理基础，会使用鼠标和键盘，能够或有耐心，空出一两个小时阅读的人。
阅后可以下载教程页尾提供的 x264 编码器及编码工具、阅览进阶的 x265 教程以了解其原理和参数，或阅览急用版 x264 教程以方便地使用 x264 编码器。

## [点此打开](https://iavoe.github.io/x264-web-tutorial/HTML/index.html)

- 建立于[x264-x265-QAAC-ffprobe-Ultimatetutorial](https://github.com/iAvoe/x264-x265-QAAC-ffprobe-Ultimatetutorial)的 x264 教程 2024.45 版，并大幅改进了内容。

### HTML 版特点

- [x] 基于 docx 版教程的手工移植，解决了诸多涉及文书规范性等适合通过重写解决的的历史遗留问题
- [x] 支持如 [Dark Reader](https://darkreader.org) 的暗黑模式浏览器插件
- [x] 响应式桌面 + 移动端网站设计，搭配点击图片放大缩小以及更改环绕模式的排版格式
- [x] HTML 版教程会因显示方案变更而区别于 docx，但仍然会为减少维护难度而延用英文/半角标点符号
- [x] 解决了难以通过 git 的变更跟踪系统检查更改内容的版本管理问题，尤其影响协作检查和撰写
- [x] 100% LaTex 公式（使用 MathJax 实现，支持复制为 MathML 以及 LaTex，见下）

### 字体系统

分为正文黑体，注解圆体和代码段字体共三套字体集。

- 正文黑体为首选[煮豆黑体 Zhudou Sans](https://github.com/Buernia/Zhudou-Sans)（中文）附件  
  - 辅以系统 Sans Serif（英文）
- 注解圆体为 Windows 的幼圆（中英文）附件
- 代码段的字体为传统代码段的 SFMono-Regular，Menlo，Monaco，Consolas（英文）  
辅以[狮尾圆体 Light](https://github.com/max32002/swei-gothic/blob/master)（中文）附件
- 公式段的字体为 [KaTeX Math Regular](https://github.com/KaTeX/katex-fonts/blob/master)（英文）附件（适配安卓）  
  - 辅以 Cochin，Georgia，Times，Times New Roman，serif

### 公式转换

- 目前引入了 [MathJax JavaScript]("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js") 附件做公式转换，同时因为 MathML Tag 占据 HTML 源码的面积太大而重写为 LaTex。工具为 [Text2Latex.com]("https://www.text2latex.com")
- 一开始因为没有转换 LaTex 的工具链而使用了手写转 MathML 的处理。工具为 [ConvertMathToLaTexMathML]("https://webdemo.myscript.com/views/math/index.html")

### 内容范围（三部分）

#### I - 视频技术基础

封装文件，封装与解封装，编码与解码，硬解与软解，滤镜，三角形定律，帧数，小数帧，码率，分辨率，向量，GUI-CLI-API，录屏，超频，算力性能，视频格式编目分类，音频格式编目分类，图像格式编目分类，有损压缩与无损压缩，色深，色彩空间，色度采样，伽马，伽马矫正，逐行扫描，交错/隔行扫描，噪点与抖动，拜耳滤镜，RAW 图像，RAW 视频，编程语言编目分类，压制软件

#### II - x264 视频编码基础

GOP，关键帧，参考帧，待定帧，参数集，Lookahead 进程，维特比算法，动态搜索，运动补偿，SAD 与 SATD，加权预测，多参考帧，变换与量化，率控制模式，CRF，ABR，CQP，3CQP，zones，VBR，2pass，FTQP，方差自适应量化，去块滤波，模式决策，率失真，率失真优化，mbtree，qcomp，SSE，Noise-SSE，拉格朗日代价，游程编码，色彩信息

#### III - x264 与 ffmpeg 的用法用例

压制 log，软件下载，ffmpeg-pipe，去可变帧率，CMD 操作，x264 参数，图像序列格式，序号表达式，ffmpeg-Image2，ffmpeg-Concat

### 繁体中文支持

本教程由简体中文编写，可以通过安装浏览器插件来转换繁体及变体。效果不理想则请截图，并发送到本教程 Github 仓库中的 Issues，或 QQ 群里。

### 暗黑模式支持

设计上通过将图片的白色背景改为透明，并给剩下的内容添加白色描边实现。目前已验证了 [Dark Reader](https://darkreader.org) 的效果。效果不理想时请截图发送到本教程 Github 仓库中的 Issues，或 QQ 群里。

### 打印机支持

打开教程后，在标题栏中可以将当前内容切换到打印排版。并切换回一般排版。转换效果不理想时请截图发送到本教程 Github 仓库中的 Issues，或 QQ 群里。

### 打赏

<p align="center"><img src="bmc_qr.png"><br><img src="pp_tip_qr.png"></p>

——[Buy me a coffee 链接](https://buymeacoffee.com/iavoe)

——[PayPal 链接](https://www.paypal.com/qrcodes/managed/3e3e8b7f-27ed-4edc-a0fa-1b469e854a3c?utm_source=consapp)

<p align="center"><font size=1>——新纪录！这玩意现在年收入 20 人民币</font></p>

-----

当前版本（年，版，改）：2024.204.0<br>
联系方式：[Github：iAvoe]("https://github.com/iAvoe/iAvoe)，[QQ 群]("https://jq.qq.com/?_wv=1027&k=5YJFXyf")  
欢迎提交 pull-request 和 issues 指正