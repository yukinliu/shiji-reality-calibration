(() => {
  'use strict';

  const KEY = 'shiji-reality-calibration-v2';
  const OLD_KEY = 'shiji-reality-calibration-v1';

  const OPTIONS = {
    focus: [
      ['A', '更清楚地认识自己的特点与反复模式'], ['B', '理解自己的优势、能力与发挥条件'],
      ['C', '事业、学习或专业发展'], ['D', '财富、资源与投入回报'],
      ['E', '合作、沟通与个人边界'], ['F', '亲密关系或家庭互动'],
      ['G', '压力、情绪与恢复方式'], ['H', '行动力、持续性与生活节奏'],
      ['I', '当前正在经历的选择或阶段变化']
    ],
    positive: [
      ['A', '理解快，能够看清问题'], ['B', '思路清楚，善于分析和整理'],
      ['C', '有想法，能够提出新的方案'], ['D', '执行力强，能够把事情推进'],
      ['E', '可靠，答应的事情会尽量完成'], ['F', '细致，容易发现别人忽略的问题'],
      ['G', '独立，有自己的判断'], ['H', '善于表达、讲解或影响他人'],
      ['I', '能理解他人，愿意照顾关系'], ['J', '能协调不同的人和资源'],
      ['K', '面对变化或压力时反应较快'], ['L', '有耐心，能够长期深入一件事']
    ],
    friction: [
      ['A', '想得太多，决定得比较慢'], ['B', '标准较高，对自己或他人要求较多'],
      ['C', '表达直接，容易忽略对方的感受'], ['D', '不容易说出自己的真实需要'],
      ['E', '容易承担过多，不太会拒绝'], ['F', '坚持自己的判断，不容易被说服'],
      ['G', '遇到冲突时倾向暂时回避'], ['H', '开始得快，但后续容易失去兴趣'],
      ['I', '在意细节，容易影响整体推进'], ['J', '状态和效率容易受到环境影响']
    ],
    complex: [
      ['A', '先理解整体结构和问题原理'], ['B', '先收集足够的信息，再作判断'],
      ['C', '先确定目标、标准和风险边界'], ['D', '先与相关的人讨论，补充不同视角'],
      ['E', '先做一个小范围尝试，再根据结果调整'], ['F', '先开始行动，在过程中逐步理清'],
      ['G', '根据过往经验迅速判断，再检查是否需要修正']
    ],
    invest: [
      ['A', '能够自己决定方向和方式'], ['B', '能感受到自己不断掌握和进步'],
      ['C', '能做出具体、看得见的结果'], ['D', '得到认可、信任或积极反馈'],
      ['E', '对他人或某件重要的事有价值'], ['F', '能与认同的人共同完成'],
      ['G', '有清楚的规则、预期和稳定感'], ['H', '有新鲜感、变化或探索空间'],
      ['I', '有明确的现实回报'], ['J', '能表达自己的观点或创造新的东西']
    ],
    lose: [
      ['A', '长期看不到进展或结果'], ['B', '缺少自主空间，处处受到限制'],
      ['C', '目标和标准反复变化'], ['D', '任务重复，缺少新的挑战'],
      ['E', '责任很多，但资源或权限不足'], ['F', '人际关系消耗过大'],
      ['G', '努力长期得不到认可或回报'], ['H', '不认同事情本身的意义'],
      ['I', '需要长期独自承担，缺少支持']
    ],
    pressure: [
      ['A', '立即分析问题并寻找解决办法'], ['B', '反复思考细节，暂时难以停止'],
      ['C', '先压住感受，把该做的事情完成'], ['D', '暂时退出现场，减少交流和刺激'],
      ['E', '找信任的人讨论或寻求支持'], ['F', '通过运动、娱乐、睡眠等方式转移注意'],
      ['G', '情绪会先明显表现出来，之后再处理问题'], ['H', '身体会先出现疲惫、紧绷、睡眠或食欲变化']
    ],
    relationship: [
      ['A', '先把事实、逻辑和责任讲清楚'], ['B', '先了解彼此的感受和真实需要'],
      ['C', '尽快寻找双方都能接受的方案'], ['D', '先减少冲突，等情绪稳定后再谈'],
      ['E', '先反思自己是否需要承担责任'], ['F', '明确表达自己的立场和边界'],
      ['G', '希望对方主动理解，不太容易直接开口'], ['H', '根据关系的重要程度决定坚持还是退让'],
      ['I', '寻求可信任的第三方帮助梳理']
    ]
  };

  const DYNAMIC = {
    A: ['特点与反复模式', '最近最想改变的一个反复模式是什么？它通常在什么情境下出现？'],
    B: ['优势与能力', '你最希望被看见或进一步发挥的能力是什么？目前它最容易卡在哪里？'],
    C: ['事业、学习或专业发展', '你目前最想推进什么？真正卡住你的更像是方向、能力、行动、资源，还是关系？'],
    D: ['财富、资源与投入回报', '你最想理解的是价值创造、收入来源、资源分配，还是投入回报？目前最大的困惑是什么？'],
    E: ['合作、沟通与边界', '最近哪类合作或沟通最消耗你？你最希望改变其中哪一部分？'],
    F: ['亲密关系或家庭互动', '目前最常重复的关系摩擦是什么？你希望自己和对方分别发生什么变化？'],
    G: ['压力、情绪与恢复', '最近最常消耗你的情境是什么？你希望报告帮助你看清哪一部分？'],
    H: ['行动力、持续性与生活节奏', '你最常在哪个环节卡住：开始、持续、完成、停止，还是中断后重新开始？'],
    I: ['当前选择或阶段变化', '你正在面对什么选择或变化？目前最难判断的是什么？']
  };

  const STEPS = [
    ['01', '关注重点', '你最希望这份报告重点回应什么？'],
    ['02', '内外视角', '现在的你，和别人眼中的你'],
    ['03', '现实证据', '一件能够代表你的真实经历'],
    ['04', '判断起点', '面对复杂或不确定的问题，你通常从哪里开始？'],
    ['05', '动力条件', '什么让你愿意投入，又是什么在消耗动力？'],
    ['06', '压力恢复', '压力来临时，你最先怎样反应，又怎样恢复？'],
    ['07', '关系边界', '重要关系出现分歧时，你通常怎样处理？'],
    ['问', '动态追问', '只回答与你最关注的主题对应的一题'],
    ['08', '经历转折', '哪段经历改变了你对自己的认识？']
  ];

  const blank = {
    focus: [], primaryFocus: '', focusQuestion: '', selfNow: '', positive: [], friction: [],
    representativeExperience: '', complex: [], complexCase: '', invest: [], lose: [], investExample: '',
    pressure: [], pressureExperience: '', relationship: [], relationshipNeed: '', dynamicAnswer: '', turningPoints: ''
  };

  let answers = load();
  let screen = 'welcome';
  let step = 0;
  let notice = '';
  const app = document.getElementById('app');

  function load() {
    try {
      const current = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (current) return { ...blank, ...current };
      const old = JSON.parse(localStorage.getItem(OLD_KEY) || 'null');
      if (!old) return { ...blank };
      return {
        ...blank, ...old,
        selfNow: old.selfThree || '',
        representativeExperience: old.abilityEvidence || '',
        relationshipNeed: old.relationshipNeed || ''
      };
    } catch (_) { return { ...blank }; }
  }

  function save() { localStorage.setItem(KEY, JSON.stringify(answers)); }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
  function answeredCount() { return Object.values(answers).filter(value => Array.isArray(value) ? value.length : String(value).trim()).length; }

  function choices(name, max) {
    const selected = answers[name] || [];
    return `<div class="choice-count">已选择 ${selected.length}/${max}</div><div class="option-list">${OPTIONS[name].map(([code, text]) => {
      const active = selected.includes(code);
      const disabled = !active && selected.length >= max;
      return `<button type="button" class="option-card ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}" data-choice="${name}" data-code="${code}" data-max="${max}" aria-pressed="${active}" ${disabled ? 'disabled aria-disabled="true"' : ''}><span class="option-letter">${code}</span><span>${text}</span><span class="check">${active ? '✓' : ''}</span></button>`;
    }).join('')}</div>`;
  }

  function primaryFocus() {
    if (!answers.focus.length) return `<div class="primary-focus"><h2>最希望重点展开的一项</h2><p>请先在上方选择一至两个主题。</p></div>`;
    return `<div class="primary-focus"><h2>其中，最希望重点展开哪一项？</h2><p>动态追问将只围绕这一项出现。</p><div class="primary-pills">${answers.focus.map(code => {
      const text = (OPTIONS.focus.find(item => item[0] === code) || [code, code])[1];
      return `<button type="button" class="primary-pill ${answers.primaryFocus === code ? 'active' : ''}" data-primary="${code}"><i></i><span>${code}. ${text}</span></button>`;
    }).join('')}</div></div>`;
  }

  function field(name, label, hint = '', optional = false, rows = 5) {
    const value = answers[name] || '';
    return `<label class="text-field"><span class="field-label">${label}${optional ? '<em>选填</em>' : ''}</span>${hint ? `<span class="field-hint">${hint}</span>` : ''}<textarea rows="${rows}" data-field="${name}" placeholder="请写下真实经历或感受……">${esc(value)}</textarea><span class="char-count">${String(value).trim().length} 字</span></label>`;
  }

  function subheading(title, note) { return `<div class="subheading"><h2>${title}</h2><p>${note}</p></div>`; }

  function stepBody(index) {
    if (index === 0) return `<p class="helper">多选，最多选择2项；然后从已选主题中指定一项重点展开。</p>${choices('focus', 2)}${primaryFocus()}${field('focusQuestion', '你目前最想弄清楚的问题是什么？', '请用一句话说明，建议30—80字。', false, 3)}`;
    if (index === 1) return `${field('selfNow', '如果暂时不介绍年龄、职业和家庭身份，你会用哪一句话描述现在的自己？', '建议50字以内。', false, 3)}${subheading('别人较常肯定你什么？', '多选，最多选择3项。')}${choices('positive', 3)}${subheading('出现摩擦时，别人较常怎样评价你？', '多选，最多选择2项。')}${choices('friction', 2)}`;
    if (index === 2) return `<p class="helper">请写1件近两年真实发生的事情，建议100—150字。它不需要是很大的成就。</p><div class="prompt-box">写成一段完整经历即可：当时需要处理什么、你采取了哪些关键行动、什么让你坚持、最后形成什么结果，以及你从中确认了什么能力。</div>${field('representativeExperience', '你的真实经历', '', false, 8)}`;
    if (index === 3) return `<p class="helper">多选，最多选择2项。</p>${choices('complex', 2)}${field('complexCase', '最近一次遇到复杂问题时，你最先做了什么？', '选填，建议50字以内。', true, 3)}`;
    if (index === 4) return `${subheading('让你更愿意投入的条件', '多选，最多选择3项。')}${choices('invest', 3)}${subheading('让你容易失去动力的条件', '多选，最多选择2项。')}${choices('lose', 2)}${field('investExample', '一个“即使没人催促，你也愿意持续做”的例子', '选填，建议50字以内。', true, 3)}`;
    if (index === 5) return `${subheading('最先出现的反应', '多选，最多选择2项。')}${choices('pressure', 2)}<div class="prompt-box">请简短说明：什么触发了压力？什么方式真正帮助你恢复？大约多久开始缓解？不必描述隐私细节。</div>${field('pressureExperience', '一次近期压力经历', '合计建议50—100字。', false, 5)}`;
    if (index === 6) return `<p class="helper">这里的“重要关系”可以是伴侣、家人、朋友或长期合作伙伴。多选，最多选择2项。</p>${choices('relationship', 2)}${field('relationshipNeed', '关系中，你最难直接表达的需要是什么？', '请用一句话说明，建议50字以内；不确定时可以跳过。', true, 3)}`;
    if (index === 7) {
      if (!answers.primaryFocus || !DYNAMIC[answers.primaryFocus]) return `<div class="dynamic-sign">你还没有指定“最希望重点展开”的主题。可以返回第1题补充，也可以跳过本题。</div>`;
      const [label, question] = DYNAMIC[answers.primaryFocus];
      return `<div class="dynamic-sign">根据第1题，你最希望重点展开：<strong>${label}</strong></div>${field('dynamicAnswer', question, '建议50—100字。', false, 5)}`;
    }
    return `<p class="helper">选填，建议100—200字。不填写不会减少报告主体内容。</p><div class="prompt-box">可以围绕三个问题展开：事情发生前你怎样理解自己；事情发生后什么认识发生了变化；这种变化现在怎样影响你。</div>${field('turningPoints', '一段对你影响较大的经历', '', true, 8)}`;
  }

  function render() {
    if (screen === 'welcome') {
      app.innerHTML = `<section class="card hero-card"><div class="hero-copy"><p class="kicker">从真实经验出发</p><h1>识己｜现实校准信息表</h1><p class="lead">让报告中的理解，能够落回你真正经历过的生活。</p><div class="hero-quote">这不是心理测验，也没有需要迎合的正确答案。只需写下你愿意提供的事实。</div><div class="notice-row"><span>8—12分钟</span><span>7道核心题</span><span>1道动态追问</span><span>1道选填深度题</span><span>本地保存</span></div><button class="primary hero-button" data-action="start">${answeredCount() ? '继续填写' : '开始填写'}<span>→</span></button><p class="privacy-note">回答不会自动上传。任何让你不舒服的问题都可以跳过。</p></div><div class="hero-visual"><img src="assets/hero-paper-path.jpg" alt="一页纸化为通向远山的青绿路径"><p class="image-caption">由经验入径 · 向理解而行</p></div></section>`;
    } else if (screen === 'form') {
      const progress = Math.round(((step + 1) / STEPS.length) * 100);
      app.innerHTML = `<section class="card form-card"><div class="progress-row"><span>第 ${step + 1} 步，共 ${STEPS.length} 步</span><span>${progress}%</span></div><div class="progress-track"><span style="width:${progress}%"></span></div><p class="section-number">${STEPS[step][0]} · ${STEPS[step][1]}</p><h1>${STEPS[step][2]}</h1>${stepBody(step)}<div class="form-actions"><button class="text-button" data-action="previous">← 返回</button><button class="primary" data-action="next">${step === STEPS.length - 1 ? '检查并导出' : '下一步'}<span>→</span></button></div><button class="skip-link" data-action="next">暂时跳过这一题</button></section>`;
    } else {
      app.innerHTML = `<section class="card"><p class="kicker">填写完成</p><h1>回看一遍，再带走它</h1><p class="lead">答案仍只保存在当前设备。你可以返回修改，也可以导出Markdown文件并主动发送给识己报告操作者。</p><div class="review-list">${STEPS.map(([number, label, title], index) => `<button data-edit="${index}"><span>${number}</span><div><strong>${label}</strong><small>${title}</small></div><b>修改</b></button>`).join('')}</div><div class="export-panel"><p>导出前，请确认没有身份证号、详细住址、账户信息、完整医疗记录或其他不必要的敏感资料。</p><button class="primary export-button" data-action="export">导出填写内容（.md）</button>${notice ? `<span class="export-notice" role="status">${notice}</span>` : ''}</div><div class="review-actions"><button class="text-button" data-action="last">← 返回最后一题</button><button class="danger-link" data-action="clear">清空全部内容</button></div></section>`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function lines(value, optionList) {
    if (Array.isArray(value)) {
      if (!value.length) return '（未填写）';
      return value.map(code => `- ${code}. ${(optionList.find(item => item[0] === code) || [code, code])[1]}`).join('\n');
    }
    return String(value || '').trim() || '（未填写）';
  }

  function markdown() {
    const date = new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date());
    const focusLabel = answers.primaryFocus ? `${answers.primaryFocus}. ${(OPTIONS.focus.find(item => item[0] === answers.primaryFocus) || ['', ''])[1]}` : '（未填写）';
    const dynamic = answers.primaryFocus && DYNAMIC[answers.primaryFocus];
    return `# 识己｜现实校准信息表\n\n填写日期：${date}\n问卷版本：Reality Calibration v2.0\n\n> 本文件由填写者主动导出，仅用于识己报告的现实校准。它不改变已经独立完成并确认的传统判断。\n\n## 1. 你最希望这份报告重点回应什么？\n\n### 选择\n\n${lines(answers.focus, OPTIONS.focus)}\n\n### 最希望重点展开\n\n${focusLabel}\n\n### 目前最想弄清楚的问题\n\n${lines(answers.focusQuestion)}\n\n## 2. 现在的你，和别人眼中的你\n\n### 你怎样理解现在的自己\n\n${lines(answers.selfNow)}\n\n### 别人较常肯定你什么\n\n${lines(answers.positive, OPTIONS.positive)}\n\n### 出现摩擦时，别人较常怎样评价你\n\n${lines(answers.friction, OPTIONS.friction)}\n\n## 3. 一件能够代表你的真实经历\n\n${lines(answers.representativeExperience)}\n\n## 4. 面对复杂或不确定的问题，你通常从哪里开始？\n\n### 选择\n\n${lines(answers.complex, OPTIONS.complex)}\n\n### 最近一次复杂问题的起点\n\n${lines(answers.complexCase)}\n\n## 5. 什么让你愿意投入，又是什么在消耗动力？\n\n### 更愿意投入的条件\n\n${lines(answers.invest, OPTIONS.invest)}\n\n### 容易失去动力的条件\n\n${lines(answers.lose, OPTIONS.lose)}\n\n### 愿意持续做的例子\n\n${lines(answers.investExample)}\n\n## 6. 压力来临时，你最先怎样反应，又怎样恢复？\n\n### 最先出现的反应\n\n${lines(answers.pressure, OPTIONS.pressure)}\n\n### 近期压力经历\n\n${lines(answers.pressureExperience)}\n\n## 7. 重要关系出现分歧时，你通常怎样处理？\n\n### 选择\n\n${lines(answers.relationship, OPTIONS.relationship)}\n\n### 最难直接表达的需要\n\n${lines(answers.relationshipNeed)}\n\n## 动态追问｜${dynamic ? dynamic[0] : '未指定重点主题'}\n\n${dynamic ? `题目：${dynamic[1]}\n\n${lines(answers.dynamicAnswer)}` : '（未填写）'}\n\n## 8. 哪段经历改变了你对自己的认识？\n\n${lines(answers.turningPoints)}\n\n---\n\n隐私提示：本表不应包含身份证号码、详细住址、账户信息、完整医疗记录或其他不必要的敏感资料。\n`;
  }

  function exportMarkdown() {
    const content = markdown();
    const date = new Date().toISOString().slice(0, 10);
    const filename = `识己-现实校准信息-${date}.md`;
    const file = new File([content], filename, { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    try {
      document.body.appendChild(link);
      link.click();
      link.remove();
      notice = 'Markdown文件已导出，可在浏览器下载中查看';
      render();
    } catch (_) {
      notice = '暂时无法导出，请换用系统浏览器重试';
      render();
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  app.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.dataset.choice) {
      const name = button.dataset.choice;
      const code = button.dataset.code;
      const max = Number(button.dataset.max);
      const current = answers[name];
      answers[name] = current.includes(code) ? current.filter(item => item !== code) : current.length < max ? [...current, code] : current;
      if (name === 'focus' && !answers.focus.includes(answers.primaryFocus)) { answers.primaryFocus = ''; answers.dynamicAnswer = ''; }
      save(); render(); return;
    }

    if (button.dataset.primary) {
      if (answers.focus.includes(button.dataset.primary)) { answers.primaryFocus = button.dataset.primary; answers.dynamicAnswer = ''; save(); render(); }
      return;
    }

    if (button.dataset.edit !== undefined) { step = Number(button.dataset.edit); screen = 'form'; render(); return; }

    const action = button.dataset.action;
    if (action === 'start') screen = 'form';
    else if (action === 'next') { if (step < STEPS.length - 1) step += 1; else screen = 'review'; }
    else if (action === 'previous') { if (step > 0) step -= 1; else screen = 'welcome'; }
    else if (action === 'last') { step = STEPS.length - 1; screen = 'form'; }
    else if (action === 'export') { exportMarkdown(); return; }
    else if (action === 'clear' && confirm('确定清空当前设备上的全部填写内容吗？此操作无法撤销。')) {
      answers = { ...blank }; localStorage.removeItem(KEY); localStorage.removeItem(OLD_KEY); step = 0; screen = 'welcome';
    }
    render();
  });

  app.addEventListener('input', event => {
    const fieldName = event.target.dataset.field;
    if (!fieldName) return;
    answers[fieldName] = event.target.value;
    save();
    const counter = event.target.parentElement.querySelector('.char-count');
    if (counter) counter.textContent = `${event.target.value.trim().length} 字`;
  });

  render();
})();
