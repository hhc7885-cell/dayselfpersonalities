export const elements=[
  {id:'wood',name:'木',tendency:'向上生长，也柔韧连接。',ids:['jia-mu','yi-mu']},
  {id:'fire',name:'火',tendency:'向外传递热情，也认真守护微光。',ids:['bing-fire','ding-fire']},
  {id:'earth',name:'土',tendency:'稳稳承接，也耐心培育。',ids:['wu-earth','ji-earth']},
  {id:'metal',name:'金',tendency:'清晰行动，也细致打磨。',ids:['geng-metal','xin-metal']},
  {id:'water',name:'水',tendency:'自在探索，也安静感知。',ids:['ren-water','gui-water']}
];

export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='<span aria-hidden="true">→</span>';

export const image=(p,cls='',lazy=true)=>`<img class="character ${cls}" src="/characters/${p.id}.png?v=5-reference-20260906" width="1600" height="1600" alt="${p.dayMaster}水彩元素精灵" ${lazy?'loading="eager"':'fetchpriority="high"'}>`;
export const header=()=>`<header class="site-header wrap"><a class="brand" href="/" aria-label="日主图鉴首页"><span class="brand-seal" aria-hidden="true">五行</span><span>日主图鉴</span></a><nav aria-label="主要导航"><a href="/#types">十日主图鉴</a></nav></header>`;
export const footer=()=>`<footer class="site-footer wrap"><div><a class="brand" href="/">日主图鉴</a><p>输入你的生日，找到你的八字日主。</p></div><div><strong>探索倾向，不定义人生。</strong><p>本体验只计算生日当天的日干，不包含完整八字，也不提供预测。</p></div><nav aria-label="页脚导航"><a href="/">返回首页</a><a href="/#types">十日主图鉴</a></nav></footer>`;
export const form=(id='birthday')=>`<form id="${id}-form" class="birth-form" novalidate><label for="${id}">出生日期<span>公历</span></label><div class="birth-row"><input id="${id}" name="birthday" type="date" min="1900-01-01" required aria-describedby="${id}-hint ${id}-error"><button type="submit" class="button">查看我的日主${arrow}</button></div><p id="${id}-hint" class="form-hint">从出生当天的天干出发，无需问卷。</p><p id="${id}-error" class="form-error" role="alert"></p></form>`;
export const backdrop=name=>`<div class="scene" aria-hidden="true"><img src="/backgrounds/${name}.png" alt="" fetchpriority="high"><div class="scene-mask"></div></div>`;

export function map(profiles){
  return `<div class="element-explorer" data-map data-mode="before-result"><div class="element-wheel"><div class="wheel-ring" aria-hidden="true"></div><div class="wheel-center"><small>五种节奏</small><strong>五行</strong><span>木 · 火 · 土 · 金 · 水</span></div>${elements.map((e,i)=>`<button class="element-node ${e.id}" data-element="${e.id}" style="--node:${i}" aria-pressed="false" aria-label="探索${e.name}元素"><span>${e.name}</span></button>`).join('')}</div><div class="element-description" aria-live="polite"><p>点选一个元素，认识它的两种表达。</p><div class="element-entries"></div></div></div>`;
}

function card(p,i){
  return `<a class="profile-card ${p.element}" href="/type/${p.id}">${image(p)}<div class="card-heading"><span class="index">${String(i+1).padStart(2,'0')} / 10</span><h3>${p.dayMaster}<small>${p.polarity}${p.elementZh}</small></h3><p class="role-name">${p.name}</p></div><p class="card-intro">${p.oneLiner}</p><div class="tags">${p.keywords.slice(0,3).map(k=>`<span>${k}</span>`).join('')}</div><span class="card-link">阅读${p.dayMaster} ${arrow}</span></a>`;
}

export function home(profiles){
  const five=elements.map(e=>profiles.find(p=>p.id===e.ids[0]));
  return `<main data-page="home">
    <div class="opening home-opening">${backdrop('home')}${header()}
      <section class="home-hero wrap" data-section="home-hero">
        <div class="hero-copy"><p class="eyebrow">八字日主 · 十天干图鉴</p><h1>你是什么<br><em>日主？</em></h1><p class="lede">像聊星座一样，聊聊你的日主。输入公历生日，从木火土金水里，认识自己的另一面。</p>${form()}</div>
        <div class="five-spirits" aria-label="木火土金水，五种元素平等呈现">${five.map(p=>`<figure>${image(p,'',false)}<figcaption>${p.elementZh}</figcaption></figure>`).join('')}<p>五种元素 · 十种回应世界的方式</p></div>
      </section>
    </div>
    <section class="journey wrap" data-section="journey" aria-label="体验流程"><span>你的生日</span>${arrow}<span>日主</span>${arrow}<span>日主意象</span>${arrow}<span>元素伙伴</span>${arrow}<span>身份卡</span></section>
    <section id="elements" class="element-system wrap section" data-section="elements"><div class="section-heading"><p class="eyebrow">五行，是理解日主的第一层地图</p><h2>先看元素，<br>再遇见自己的日主</h2><p>木、火、土、金、水不是标签，而是五种不同的感受、行动与表达节奏。日主只是其中更具体的一种个人倾向。</p><p>我们只取“日主”这个小小入口，把它设计成可以理解自己、认识朋友、开启对话的日主意象。它不告诉你将来会怎样，只邀请你看看：自己更习惯怎样回应世界。</p></div>${map(profiles)}</section>
    <section id="types" class="gallery wrap section" data-section="types"><div class="section-heading"><p class="eyebrow">十种日主 · 十种回应世界的方式</p><h2>你会遇见哪一种？</h2><p>同一种元素，也有截然不同的表达。每个伙伴都有自己的形状、节奏和成长故事。</p></div><div class="profile-grid">${profiles.map(card).join('')}</div></section>
    <section id="how" class="how-section wrap section" data-section="how"><div class="section-heading"><p class="eyebrow">HOW IT WORKS</p><h2>30 秒，认识一种<br>熟悉又陌生的自己</h2><p>从出生那一天的天干出发，认识你的八字日主。甲乙丙丁戊己庚辛壬癸，十种意象，各有自己的节奏。</p></div><ol class="how-list"><li><span>01</span><div><h3>输入公历生日</h3><p>日期只在你的浏览器里参与计算，不上传，也不需要出生时间和地点。</p></div></li><li><span>02</span><div><h3>找到当天的日主</h3><p>日主是当天日柱的天干，共有甲乙丙丁戊己庚辛壬癸十种。</p></div></li><li><span>03</span><div><h3>遇见日主伙伴</h3><p>阅读你的性格底色、连接方式、创造节奏与成长方向，再生成身份卡分享。</p></div></li></ol></section>
    <section class="home-share wrap section" data-section="share"><p class="eyebrow">不是预测，是一种自我介绍</p><h2>看见自己，也让朋友看见你</h2><p>你的结果，应该像一张身份名片。</p><blockquote>“你是什么日主？”</blockquote><a class="button" href="#birthday-form">回到出生日期${arrow}</a></section>
    ${footer()}
  </main>`;
}

const ids=['core','foundation','reading','resonance','exchange','growth','compatibility','sibling','quote'];
export function readingSections(p,readings,isResult=false){
  return `<div class="reading-content wrap">${readings[p.id].filter(s=>!isResult||!['type-manifesto','element-sibling','type-quote'].includes(s.class)).map(s=>{const idx=readings[p.id].indexOf(s);return `<section class="${s.class} reading-section" id="${ids[idx]}" data-section="${ids[idx]}">${s.html}</section>`}).join('')}</div>`;
}

export function detail(p,readings){
  return `<main data-page="detail" class="theme-${p.element}" data-profile="${p.id}"><div class="opening detail-opening">${backdrop(p.element)}${header()}<section class="profile-hero wrap" data-section="profile-hero"><div class="profile-copy"><a class="back-link" href="/#types" data-return>← 返回十日主图鉴</a><p class="eyebrow">${p.polarity}${p.elementZh} · 八字日主</p><h1>${p.dayMaster}<span>${p.name}</span></h1><p class="lede">${p.oneLiner}</p><div class="tags">${p.keywords.map(k=>`<span>${k}</span>`).join('')}</div><a class="button" href="/#birthday-form">看看我的日主是不是它${arrow}</a></div><figure class="hero-character">${image(p,'',false)}<figcaption>${p.dayMaster} · ${p.englishName}</figcaption></figure></section></div><nav class="reading-nav wrap" aria-label="解析目录"><a href="#foundation">日主意象</a><a href="#reading">日常解析</a><a href="#growth">成长方向</a><a href="#compatibility">关系相处</a></nav>${readingSections(p,readings)}${footer()}</main>`;
}

export function result(p,readings){
  return `<main data-page="result" class="theme-${p.element}" data-profile="${p.id}">
    <div class="opening detail-opening">${backdrop(p.element)}${header()}<section class="profile-hero wrap" data-section="profile-hero"><div class="profile-copy"><a class="back-link" href="/" data-clear>← 重新查询</a><p class="eyebrow">我的八字日主</p><h1>${p.dayMaster}<span>${p.name}</span></h1><p class="lede">${p.oneLiner}</p><div class="tags">${p.keywords.map(k=>`<span>${k}</span>`).join('')}</div><div class="actions"><button class="button" data-share="${p.id}">生成我的身份卡${arrow}</button></div><p class="share-status" role="status"></p></div><figure class="hero-character">${image(p,'',false)}<figcaption>${p.dayMaster} · ${p.englishName}</figcaption></figure></section></div>
    ${readingSections(p,readings,true)}
    <section class="partner-story wrap section" data-section="partner"><div class="partner-art">${image(p)}</div><div><p class="eyebrow">为什么是这个形象？</p><h2>${p.dayMaster}，<br>你的元素原型</h2><p>${p.elementImage}</p><p>它不替你做决定，也不定义你的边界。它只是提醒你：那些自然流露的倾向，也可以被看见、被理解、被好好使用。</p><dl><dt>形态</dt><dd>${p.form}</dd><dt>材质</dt><dd>${p.material}</dd><dt>动作</dt><dd>${p.motion}</dd></dl></div></section>
    <section class="result-share-card wrap section" data-section="share"><p class="eyebrow">我的日主签名</p><h2>${p.dayMaster} · ${p.name}</h2><div class="tags"><span>#${p.dayMaster}</span><span>#${p.name}</span><span>#八字日主</span></div><blockquote>${p.deep.quote}</blockquote><div class="actions"><button class="button" data-share="${p.id}">生成身份卡${arrow}</button><a class="button secondary" href="/">回到首页${arrow}</a></div></section>
    ${footer()}
  </main>`;
}

export const emptyResult=()=>`<main data-page="result-empty"><div class="opening test-opening">${backdrop('birthday')}${header()}<section class="empty-result wrap section"><h1>先回到首页，<br>告诉我你的出生日期。</h1><p>完成生日计算后，才会出现属于你的日主。</p><a class="button" href="/#birthday-form">返回首页${arrow}</a></section></div>${footer()}</main>`;
export const document=(body,title)=>`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜日主图鉴</title><meta name="description" content="从公历生日认识八字日主。十种水彩元素精灵，十种回应世界的方式。探索倾向，不定义人生。"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/styles.css"><script type="module" src="/app.js"></script></head><body><a href="#app" class="skip-link">跳到主要内容</a><div id="app">${body}</div><dialog class="share-dialog" aria-labelledby="share-title"><div class="dialog-top"><h2 id="share-title">我的日主身份卡</h2><button class="icon-button" data-close aria-label="关闭分享预览">×</button></div><img class="share-preview" alt="生成的日主身份卡"><div class="actions"><a class="button" data-download download>保存身份卡 ↓</a><button class="button secondary" data-close>返回阅读</button></div><p>分享卡不包含生日。</p></dialog></body></html>`;
