let instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <p>在实验中，屏幕中央会呈现一个图片</p>
      <p>如果呈现的是积极面孔,请按【F】 键</p>
      <p>如果呈现的是消极面孔,请按【J】 键</p>
      <p>按任意键开始实验</p>
    `,
    post_trial_gap: 500
}
let positive_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<img src="./img/positive.png">`,
    choices: ['f', 'j'],
    post_trial_gap: 500
  }
let pessimistic_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<img src="./img/pessimistic.png">`,
    choices: ['f', 'j'],
    post_trial_gap: 500
  }
let generateTrials = () => {
    let trials = [];
    for (let i = 0; i < 50; i++) {
      trials.push(Math.random() < 0.5 ? positive_trial : pessimistic_trial);
    }
    return trials;
  }
let break_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>休息2分钟。请稍候...</p>`,
    trial_duration: 120000,
    post_trial_gap: 500
  }
let continue_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>休息结束。按任意键继续实验。</p>`,
    post_trial_gap: 500
  }
let timeline = [instruction];
  timeline = timeline.concat(generateTrials());
    timeline.push(break_screen);
    timeline.push(continue_screen);
    timeline = timeline.concat(generateTrials());
jsPsych.run(timeline)