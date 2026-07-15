/* =========================================================
   墨韵山河 · 诗地图
   读取 poems.json → 自动布点 → 自动生成水墨景色 → 点击浮现诗轴
   ========================================================= */

/* ---------- 水墨景色生成器（小而精致的墨线图标） ---------- */
const SCENES = {
  mountain: `<path d="M-13,9 L-4,-9 L2,1 L8,-11 L13,9 Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M-2,3 L2,-3 L6,3" fill="none" stroke="currentColor" stroke-width="1"/>`,
  waterfall: `<path d="M-8,11 L-3,-10 L3,-10 L8,11 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M0,-8 Q2,0 0,8 Q-2,12 1,14" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  lake: `<ellipse cx="0" cy="2" rx="12" ry="6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M-7,-2 q5,-3 10,0 M-6,5 q5,-3 10,0" fill="none" stroke="currentColor" stroke-width="1"/>`,
  tower: `<path d="M-6,-12 L6,-12 L4,-6 L-4,-6 Z M-7,-6 L7,-6 L5,2 L-5,2 Z M-8,2 L8,2 L6,10 L-6,10 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>`,
  bridge: `<path d="M-12,4 Q0,-12 12,4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M-12,4 L-12,9 M12,4 L12,9 M0,-4 L0,9" stroke="currentColor" stroke-width="1"/>`,
  boat: `<path d="M-11,3 Q0,12 11,3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M0,3 L0,-10 M0,-10 L7,-5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="-2" cy="-1" r="1.6" fill="currentColor"/>`,
  bamboo: `<line x1="-6" y1="12" x2="-6" y2="-10" stroke="currentColor" stroke-width="1.4"/><line x1="2" y1="12" x2="2" y2="-12" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="12" x2="8" y2="-8" stroke="currentColor" stroke-width="1.4"/><path d="M2,-12 q6,-3 9,1 M-6,-2 q-5,-2 -8,2 M2,2 q6,-2 9,2" stroke="currentColor" stroke-width="1" fill="none"/>`,
  moon: `<circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="9" cy="-9" r="1" fill="currentColor"/><circle cx="-10" cy="6" r="0.9" fill="currentColor"/>`,
  pass: `<path d="M-12,10 Q0,-2 12,10" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M-8,2 L-4,2 L-4,-6 L0,-6 L0,2 L4,2 L4,-8 L8,-8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>`,
  pavilion: `<path d="M-10,-3 Q0,-14 10,-3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M-7,-3 L-7,8 M7,-3 L7,8 M0,-3 L0,8" stroke="currentColor" stroke-width="1.1"/><path d="M-9,8 L9,8" stroke="currentColor" stroke-width="1.2"/>`,
  blossom: `<path d="M0,12 Q-3,2 0,-6" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="-6" cy="-2" r="2.4" fill="currentColor" opacity="0.5"/><circle cx="6" cy="-4" r="2.2" fill="currentColor" opacity="0.5"/><circle cx="0" cy="-9" r="2.4" fill="currentColor" opacity="0.5"/><circle cx="-2" cy="4" r="1.8" fill="currentColor" opacity="0.45"/>`,
  snow: `<path d="M-11,3 Q0,12 11,3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M0,3 L0,-9 M0,-9 L6,-5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="-8" cy="-8" r="0.9" fill="currentColor"/><circle cx="9" cy="-4" r="0.8" fill="currentColor"/><circle cx="-3" cy="-11" r="0.7" fill="currentColor"/>`
};

/* ---------- 根据诗词内容自动判断景色 ---------- */
function detectScene(poem) {
  if (poem.scene && SCENES[poem.scene]) return poem.scene;
  const t = (poem.title + poem.body).replace(/\s/g, '');
  const rules = [
    [/瀑|瀑布/, 'waterfall'],
    [/月/, 'moon'],
    [/湖|西湖|水光|潭/, 'lake'],
    [/楼|阁|鹤/, 'tower'],
    [/桥|枫桥/, 'bridge'],
    [/舟|船|渔|钓/, 'boat'],
    [/雪|寒江/, 'snow'],
    [/竹|居|辋川|松|林/, 'bamboo'],
    [/塞|关|城|长城|烽/, 'pass'],
    [/花|桃|春|柳/, 'blossom'],
    [/山|岳|峰|岭|岩/, 'mountain']
  ];
  for (const [re, s] of rules) if (re.test(t)) return s;
  return 'mountain';
}

/* ---------- 稳定散点布局（游戏地图式分层） ---------- */
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h / 4294967295;
}
function layout(poems) {
  const range = {
    moon: [105, 165], mountain: [430, 540], waterfall: [430, 540],
    tower: [380, 500], pavilion: [380, 500], bamboo: [380, 500], pass: [380, 500],
    lake: [560, 685], boat: [560, 685], snow: [560, 685], bridge: [560, 685], blossom: [560, 685]
  };
  const byScene = {};
  poems.forEach(p => { const s = detectScene(p); (byScene[s] = byScene[s] || []).push(p); });
  poems.forEach(p => {
    const s = detectScene(p);
    const r = range[s] || range.mountain;
    const group = byScene[s];
    const idx = group.indexOf(p);
    const n = group.length;
    const x = n === 1 ? 600 : 150 + (1050 - 150) * (idx / (n - 1)) + (hash(p.id) - 0.5) * 40;
    const y = r[0] + hash(p.id + 'y') * (r[1] - r[0]);
    placed.push({ poem: p, x, y, scene: s });
  });
  return placed;
}

/* ---------- 渲染 ---------- */
const SVGNS = 'http://www.w3.org/2000/svg';
const sitesG = document.getElementById('sites');

function svgFragment(markup) {
  const doc = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg">' + markup + '</svg>', 'image/svg+xml');
  const frag = document.createDocumentFragment();
  const root = doc.documentElement;
  while (root.firstChild) {
    frag.appendChild(document.importNode(root.firstChild, true));
    root.removeChild(root.firstChild);
  }
  return frag;
}

function render(poems) {
  while (sitesG.firstChild) sitesG.removeChild(sitesG.firstChild);
  const placed = layout(poems);
  placed.forEach(({ poem, x, y, scene }) => {
    const g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('class', 'poem-spot');
    g.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${poem.title} · ${poem.dynasty} · ${poem.author}`);
    g.appendChild(svgFragment(
      '<circle class="spot-token" r="18"></circle>' +
      '<circle class="spot-glow" r="18"></circle>' +
      '<g class="spot-icon">' + (SCENES[scene] || SCENES.mountain) + '</g>'));
    g.addEventListener('click', () => showPoem(poem));
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPoem(poem); }
    });
    sitesG.appendChild(g);
  });
}

/* ---------- 诗轴浮层 ---------- */
const overlay = document.getElementById('poemOverlay');
const closeBtn = document.getElementById('poemClose');

function showPoem(poem) {
  document.getElementById('poemTitle').textContent = poem.title;
  document.getElementById('poemMeta').textContent = `${poem.dynasty} · ${poem.author}`;
  document.getElementById('poemBody').textContent = poem.body;
  document.getElementById('poemNote').textContent = poem.note || '';
  document.getElementById('poemSeal').textContent = poem.seal || poem.title.charAt(0);
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}
function hidePoem() { overlay.hidden = true; document.body.style.overflow = ''; }

closeBtn.addEventListener('click', hidePoem);
overlay.querySelector('.poem-backdrop').addEventListener('click', hidePoem);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) hidePoem(); });

/* ---------- 加载诗词数据（由 poems.js 提供全局 window.POEMS） ---------- */
const POEMS = (typeof window !== 'undefined' && window.POEMS) ? window.POEMS : [];
if (POEMS.length) {
  render(POEMS);
} else {
  sitesG.appendChild(svgFragment('<text x="600" y="400" text-anchor="middle" fill="#8b3a3a" font-size="20" font-family="serif">未找到诗词数据，请检查 poems.js</text>'));
}
