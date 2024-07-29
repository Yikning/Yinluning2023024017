# 心理学实验代码说明

## 1. 前言

## 1.1 说明

本实验是利用经典实验范式GO/NO-GO设计的一个简单按键反应实验。实验的基本内容是：屏幕上出现积极面孔，按【F】键；屏幕上出现消极面孔，按【J】键，最终通过计算被试的正确率和反应时来检验被试对两种面孔的反应是否有显著差异。

## 1.2 实验前准备材料

* [1]指导语，确保被试能够清楚理解实验任务
* [2]实验所用到的图片，即有情绪色彩的图片
* [3]实验程序代码编写
* [4]被试知情同意书

## 1.3 工具准备

* 代码编写工具：[Visual Studio Code](https://code.visualstudio.com/)
* JsPsych插件：[JsPsych](https://www.jspsych.org/v8/)

# 2. 代码说明

## 2.1 HTML代码

### 2.1.1 代码说明

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>心理学实验</title>
    <script src="https://unpkg.com/jspsych@7.3.4"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3"></script>
    <link rel="stylesheet" href="https://unpkg.com/jspsych@7.3.4/css/jspsych.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="experiment-container">
        <script>
            let jsPsych = **initJsPsych**();

           **// 介绍说明**
            let instruction = {
                type: jsPsychHtmlKeyboardResponse,
               stimulus: `
                <p>在实验中，屏幕中央会呈现一个面孔</p>
                <p>如果呈现的是积极面孔,请尽快按【f】键</p>
                <p>如果呈现的是消极面孔,请尽快按【j】键</p>
                <p>按任意键开始实验</p>
                `,
                post_trial_gap: 500
            };

            // 定义积极和消极试次
            let positive_trial = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: `<img src="./img/positive.png">`,
                choices: ['f', 'j'],
                data: { face: 'positive' },
                post_trial_gap: 500
            };

            let pessimistic_trial = {
               type: jsPsychHtmlKeyboardResponse,
                stimulus: `<img src="./img/pessimistic.png">`,
                choices: ['f', 'j'],
                data: { face: 'pessimistic' },
                post_trial_gap: 500
            };

            // 生成50个随机试次（积极和消极随机）
            let generateTrials = () => {
                let trials = [];
                for (let i = 0; i < 50; i++) {
                    trials. push(Math.random() < 0.5 ? positive_trial : pessimistic_trial);
                }
                return trials;
            };

          // 休息屏幕
            let break_screen = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: `<p>休息2分钟。请稍候...</p>`,
                trial_duration: 120000,
                post_trial_gap: 500
            };

            // 继续实验屏幕
            let continue_screen = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: `<p>休息结束。按任意键继续实验。</p>`,
                post_trial_gap: 500
            };

           // 实验时间轴
            let timeline = [instruction];

            // 添加第一组50个试次，然后休息，再添加第二组50个试次
            timeline = timeline.concat(generateTrials());
            timeline.push(break_screen);
            timeline.push(continue_screen);
            timeline = timeline.concat(generateTrials());

            // 启动实验
            jsPsych.run(timeline);
        </script>
    </div>
</body>
</html>
```


### 2.1.2 结构说明

* **`<!DOCTYPE html>`** ：声明文档类型。
* **`<html lang="en">`** ：定义HTML文档的语言。
* **`<head>`** ：包含元数据（如文档标题、字符集、外部样式和脚本）。
  * `<meta charset="UTF-8">`：设置文档字符编码。
  * `<meta name="viewport" content="width=device-width, initial-scale=1.0">`：设置视口，使网页在不同设备上显示良好。
  * `<title>`：定义网页标题。
  * `<script>`：引入外部JavaScript文件，这些文件包含我们需要的实验库。
  * `<link>`：引入外部CSS文件，用于样式设置。
* **`<body>`** ：包含文档的内容。
  * `<div id="experiment-container">`：容器，用于包含实验内容。
  * `<script>`：包含JavaScript代码。

## 2.2 JavaScript 代码

JavaScript 用于为网页添加动态功能。在这个实验中，我们使用 `jsPsych` 库来创建实验流程。

#### 实验流程

1. **初始化 `jsPsych`** ：
   
   ```
   let jsPsych = initJsPsych();
   ```
2. **介绍说明** ：
   
   ```
   let instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>在实验中，屏幕中央会呈现一个面孔</p>
    <p>如果呈现的是积极面孔,请尽快按【f】键</p>
    <p>如果呈现的是消极面孔,请尽快按【j】键</p>
    <p>按任意键开始实验</p>
    `,
    post_trial_gap: 500
   };
   ```
3. **定义试次** ：
   
   ```
   let positive_trial = {
   type: jsPsychHtmlKeyboardResponse,
   stimulus: `<img src="./img/positive.png">`,
   choices: ['f', 'j'],
   data: { face: 'positive' },
   post_trial_gap: 500
   };
   let pessimistic_trial = {
   type: jsPsychHtmlKeyboardResponse,
   stimulus: `<img src="./img/pessimistic.png">`,
   choices: ['f', 'j'],
   data: { face: 'pessimistic' },
   post_trial_gap: 500
   };
   ```
4. **生成随机试次** ：
   
   ```
   let generateTrials = () => {
   let trials = [];
   for (let i = 0; i < 50; i++) {
   trials.push(Math.random() < 0.5 ? positive_trial : pessimistic_trial);
   }
   return trials;
   };
   ```
5. **休息屏幕** ：
   
   ```
   let break_screen = {
   type: jsPsychHtmlKeyboardResponse,
      stimulus: `休息2分钟。请稍候...`,
      trial_duration: 120000,
      post_trial_gap: 500
      };
   ```
6. **继续实验屏幕** ：
   
   ```
   let continue_screen = {
   type: jsPsychHtmlKeyboardResponse,
   stimulus: `<p>休息结束。按任意键继续实验。</p>`,
   post_trial_gap: 500
   };
   ```
7. **实验时间轴** ：

    ```
    let timeline = [instruction];
    timeline = timeline.concat(generateTrials());
    timeline.push(break_screen);
    timeline.push(continue_screen);
    timeline = timeline.concat(generateTrials());

    ```

8. **启动实验** ：
    ```
    jsPsych.run(timeline);
    ```


## 2.3 CSS文件

CSS（层叠样式表）用于控制网页的视觉样式。在这个实验中，我们使用 CSS 来设置实验的布局，使其在不同设备上都能很好地展示。
`styles.css` 文件

### 2.3.1 代码

```/* Flexbox Container */
body, html {
height: 100%;
margin: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #f0f0f0;
}

#experiment-container {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
max-width: 800px;
padding: 20px;
box-sizing: border-box;
background-color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
}

img {
max-width: 100%;
height: auto;
}

/* Responsive Layout */
@media (max-width: 800px) {
#experiment-container {
padding: 15px;
}
}

@media (max-width: 600px) {
#experiment-container {
padding: 10px;
}
}
```

### 2.3.2 说明

* **Flexbox容器** ：
  * 使用Flexbox将内容垂直和水平居中。
  * 设置容器的最大宽度、内边距、背景颜色、阴影和圆角。
* **响应式布局** ：
  * 使用媒体查询，根据屏幕宽度调整容器的内边距，使其在不同设备上都有良好的展示效果。

