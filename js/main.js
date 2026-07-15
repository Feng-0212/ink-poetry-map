/* =========================================================
   墨韵山河 · 仙侠图
   3000×1800 可平移缩放水墨世界
   ========================================================= */

/* ---------- 场景水墨图标（小而精的墨线） ---------- */
const SCENES = {
  mountain:  `<path d="M-13,9 L-4,-9 L2,1 L8,-11 L13,9 Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M-2,3 L2,-3 L6,3" fill="none" stroke="currentColor" stroke-width="1"/>`,
  waterfall: `<path d="M-8,11 L-3,-10 L3,-10 L8,11 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M0,-8 Q2,0 0,8 Q-2,12 1,14" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  lake:      `<ellipse cx="0" cy="2" rx="12" ry="6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M-7,-2 q5,-3 10,0 M-6,5 q5,-3 10,0" fill="none" stroke="currentColor" stroke-width="1"/>`,
  tower:     `<path d="M-6,-12 L6,-12 L4,-6 L-4,-6 Z M-7,-6 L7,-6 L5,2 L-5,2 Z M-8,2 L8,2 L6,10 L-6,10 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>`,
  bridge:    `<path d="M-12,4 Q0,-12 12,4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M-12,4 L-12,9 M12,4 L12,9 M0,-4 L0,9" stroke="currentColor" stroke-width="1"/>`,
  boat:      `<path d="M-11,3 Q0,12 11,3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M0,3 L0,-10 M0,-10 L7,-5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="-2" cy="-1" r="1.6" fill="currentColor"/>`,
  bamboo:    `<line x1="-6" y1="12" x2="-6" y2="-10" stroke="currentColor" stroke-width="1.4"/><line x1="2" y1="12" x2="2" y2="-12" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="12" x2="8" y2="-8" stroke="currentColor" stroke-width="1.4"/><path d="M2,-12 q6,-3 9,1 M-6,-2 q-5,-2 -8,2 M2,2 q6,-2 9,2" stroke="currentColor" stroke-width="1" fill="none"/>`,
  moon:      `<circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="9" cy="-9" r="1" fill="currentColor"/><circle cx="-10" cy="6" r="0.9" fill="currentColor"/>`,
  pass:      `<path d="M-12,10 Q0,-2 12,10" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M-8,2 L-4,2 L-4,-6 L0,-6 L0,2 L4,2 L4,-8 L8,-8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>`,
  pavilion:  `<path d="M-10,-3 Q0,-14 10,-3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M-7,-3 L-7,8 M7,-3 L7,8 M0,-3 L0,8" stroke="currentColor" stroke-width="1.1"/><path d="M-9,8 L9,8" stroke="currentColor" stroke-width="1.2"/>`,
  blossom:   `<path d="M0,12 Q-3,2 0,-6" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="-6" cy="-2" r="2.4" fill="currentColor" opacity="0.5"/><circle cx="6" cy="-4" r="2.2" fill="currentColor" opacity="0.5"/><circle cx="0" cy="-9" r="2.4" fill="currentColor" opacity="0.5"/><circle cx="-2" cy="4" r="1.8" fill="currentColor" opacity="0.45"/>`,
  snow:      `<path d="M-11,3 Q0,12 11,3 Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M0,3 L0,-9 M0,-9 L6,-5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="-8" cy="-8" r="0.9" fill="currentColor"/><circle cx="9" cy="-4" r="0.8" fill="currentColor"/><circle cx="-3" cy="-11" r="0.7" fill="currentColor"/>`
};

/* ---------- 灵石标记 SVG（玉色发光 + 朱印） ---------- */
function makeStoneSVG(poem) {
  const icon = SCENES[poem.scene] || SCENES.mountain;
  return `
    <svg class="stone-svg" viewBox="-22 -22 44 44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sg${poem.id}" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#c0ffe8"/>
          <stop offset="60%" stop-color="#30c090"/>
          <stop offset="100%" stop-color="#107060"/>
        </radialGradient>
        <filter id="sf${poem.id}" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="matrix"
           values="0 0 0 0 0.1  0 0 0 0 0.6  0 0 0 0 0.5  0 0 0 1 0" result="glow"/>
          <feComposite in="glow" in2="SourceGraphic" operator="over"/>
        </filter>
      </defs>
      <!-- 外圈光晕 -->
      <circle class="stone-halo" r="21" fill="#30d090" opacity="0.18" filter="url(#sf${poem.id})"/>
      <!-- 灵石主体 -->
      <circle class="stone-body" r="17" fill="url(#sg${poem.id})" opacity="0.92"/>
      <!-- 内圈 -->
      <circle r="13" fill="none" stroke="#80ffd8" stroke-width="0.8" opacity="0.6"/>
      <!-- 墨线图标 -->
      <g class="stone-icon" color="#1a4030">${icon}</g>
      <!-- 顶部小高光 -->
      <ellipse cx="-4" cy="-5" rx="4" ry="2.5" fill="white" opacity="0.35"/>
      <!-- 朱印 -->
      <text x="0" y="4.5" text-anchor="middle" fill="#a02020" font-size="9"
            font-family="serif" font-weight="700" opacity="0.85">${poem.seal || poem.title.charAt(0)}</text>
    </svg>`;
}

/* ---------- 渲染灵石标记 ---------- */
const mapMarkers = document.getElementById('mapMarkers');
const POEMS = (typeof window !== 'undefined' && window.POEMS) ? window.POEMS : [];

function renderMarkers(poems) {
  while (mapMarkers.firstChild) mapMarkers.removeChild(mapMarkers.firstChild);

  const seen = {};
  poems.forEach(p => {
    const key = p.id;
    if (seen[key]) return;
    seen[key] = true;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'poem-stone';
    btn.setAttribute('aria-label', `${p.place} · ${p.title} · ${p.author}`);
    btn.title = p.place;
    btn.style.left = p.x + 'px';
    btn.style.top  = p.y + 'px';
    btn.innerHTML = makeStoneSVG(p);
    btn.addEventListener('click', () => showPoem(p));
    mapMarkers.appendChild(btn);
  });

  // HUD 计数器
  const counter = document.getElementById('hudCounter');
  if (counter) counter.textContent = poems.length + ' 处胜迹';
}

if (POEMS.length) {
  renderMarkers(POEMS);
} else {
  const msg = document.createElement('div');
  msg.className = 'map-empty-msg';
  msg.textContent = '未找到诗词数据，请检查 poems.js';
  document.getElementById('mapWorld').appendChild(msg);
}

/* ---------- 诗轴浮层 ---------- */
const overlay  = document.getElementById('poemOverlay');
const closeBtn = document.getElementById('poemClose');

function showPoem(poem) {
  document.getElementById('poemTitle').textContent = poem.title;
  document.getElementById('poemMeta').textContent = `${poem.place} · ${poem.dynasty} · ${poem.author}`;
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

/* ================================================================
   仙侠图 · 平移缩放控制器
   ================================================================ */
(function () {
  const container = document.getElementById('mapContainer');
  const world     = document.getElementById('mapWorld');
  if (!container || !world) return;

  /* 世界尺寸 */
  const WORLD_W = 3000;
  const WORLD_H = 1800;

  /* 缩放范围 */
  const ZOOM_MIN = 0.25;
  const ZOOM_MAX = 4.5;
  const ZOOM_STEP = 0.15;

  /* 状态 */
  let zoom   = 1;
  let panX   = 0;
  let panY   = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startPanX  = 0;
  let startPanY  = 0;
  let moved = false;

  /* 计算填充视口的初始缩放（留 5% 边距） */
  function calcFitZoom() {
    const cW = container.clientWidth;
    const cH = container.clientHeight;
    if (!cW || !cH) return 0.5;
    return Math.min(cW / WORLD_W, cH / WORLD_H) * 0.92;
  }

  /* 应用 transform 到 world */
  function apply() {
    world.style.transform = `translate(${panX.toFixed(1)}px, ${panY.toFixed(1)}px) scale(${zoom})`;
  }

  /* 初始：填充视口并居中 */
  function initView() {
    zoom = calcFitZoom();
    const cW = container.clientWidth;
    const cH = container.clientHeight;
    panX = (cW - WORLD_W * zoom) / 2;
    panY = (cH - WORLD_H * zoom) / 2;
    apply();
  }

  /* ---------- 鼠标拖拽平移 ---------- */
  container.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    if (e.target.closest('.poem-stone') || e.target.closest('.map-hud')) return;
    dragging  = true;
    moved     = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    startPanX  = panX;
    startPanY  = panY;
    container.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    if (!moved && Math.hypot(dx, dy) > 4) moved = true;
    panX = startPanX + dx;
    panY = startPanY + dy;
    apply();
  });

  window.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      container.style.cursor = '';
    }
  });

  /* ---------- 滚轮缩放（以鼠标位置为中心） ---------- */
  container.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? (1 + ZOOM_STEP) : (1 - ZOOM_STEP);
    const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom * factor));

    /* 以鼠标位置为中心缩放 */
    const rect = container.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const actual = newZoom / zoom;
    panX = cx - (cx - panX) * actual;
    panY = cy - (cy - panY) * actual;
    zoom = newZoom;
    apply();
  }, { passive: false });

  /* ---------- 双击放大（以点击位置为中心） ---------- */
  container.addEventListener('dblclick', e => {
    if (e.target.closest('.poem-stone') || e.target.closest('.map-hud')) return;
    const rect = container.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const newZoom = Math.min(ZOOM_MAX, zoom * 1.6);
    const actual = newZoom / zoom;
    panX = cx - (cx - panX) * actual;
    panY = cy - (cy - panY) * actual;
    zoom = newZoom;
    apply();
  });

  /* ---------- HUD 按钮 ---------- */
  const zoomInBtn    = document.getElementById('zoomIn');
  const zoomOutBtn   = document.getElementById('zoomOut');
  const zoomResetBtn = document.getElementById('zoomReset');

  function zoomCentered(factor) {
    const cW = container.clientWidth;
    const cH = container.clientHeight;
    const cx = cW / 2;
    const cy = cH / 2;
    const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom * factor));
    const actual = newZoom / zoom;
    panX = cx - (cx - panX) * actual;
    panY = cy - (cy - panY) * actual;
    zoom = newZoom;
    apply();
  }

  if (zoomInBtn)    zoomInBtn.addEventListener('click',    () => zoomCentered(1 + ZOOM_STEP));
  if (zoomOutBtn)   zoomOutBtn.addEventListener('click',   () => zoomCentered(1 - ZOOM_STEP));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => { initView(); });

  /* ---------- 窗口大小变化时重新计算 ---------- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      zoom = Math.max(calcFitZoom() * 0.8, zoom);
      const cW = container.clientWidth;
      const cH = container.clientHeight;
      panX = (cW - WORLD_W * zoom) / 2;
      panY = (cH - WORLD_H * zoom) / 2;
      apply();
    }, 150);
  });

  /* ---------- 初始化 ---------- */
  initView();

})();
