const POEMS = {
  huashan: {
    title: '登高',
    author: '杜甫',
    dynasty: '唐',
    seal: '岳',
    body: '风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。',
    note: '华山峻极，登临万里，天地萧飒，诗心浩荡。'
  },
  lushan: {
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐',
    seal: '瀑',
    body: '日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。',
    note: '飞瀑如练，银河倒悬，庐山之壮，天下无匹。'
  },
  xihu: {
    title: '饮湖上初晴后雨',
    author: '苏轼',
    dynasty: '宋',
    seal: '湖',
    body: '水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。',
    note: '西湖如镜，晴雨皆诗，淡妆浓抹，人间绝色。'
  },
  shanju: {
    title: '山居秋暝',
    author: '王维',
    dynasty: '唐',
    seal: '居',
    body: '空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。\n竹喧归浣女，莲动下渔舟。\n随意春芳歇，王孙自可留。',
    note: '竹林深处，明月松风，此中有真意，欲辨已忘言。'
  },
  bianse: {
    title: '出塞',
    author: '王昌龄',
    dynasty: '唐',
    seal: '塞',
    body: '秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。',
    note: '边关万里，长河落日，铁马冰河，壮怀激烈。'
  },
  yueye: {
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    seal: '月',
    body: '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。',
    note: '一轮明月，照见千古游子的乡愁。'
  },
  chunxiao: {
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐',
    seal: '春',
    body: '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。',
    note: '桃花始盛，鸟鸣山幽，春意盎然，万物生发。'
  },
  fengqiao: {
    title: '枫桥夜泊',
    author: '张继',
    dynasty: '唐',
    seal: '桥',
    body: '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。',
    note: '枫桥夜泊，钟声悠悠，一愁一景，千古绝唱。'
  },
  jiangxue: {
    title: '江雪',
    author: '柳宗元',
    dynasty: '唐',
    seal: '雪',
    body: '千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。',
    note: '寒江孤影，天地一色，万籁俱寂，独钓乾坤。'
  },
  huanghelou: {
    title: '黄鹤楼送孟浩然之广陵',
    author: '李白',
    dynasty: '唐',
    seal: '楼',
    body: '故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。',
    note: '登楼远眺，孤帆远影，长江天际，送别情深。'
  }
};

const overlay = document.getElementById('poemOverlay');
const closeBtn = document.getElementById('poemClose');
const titleEl = document.getElementById('poemTitle');
const metaEl = document.getElementById('poemMeta');
const bodyEl = document.getElementById('poemBody');
const noteEl = document.getElementById('poemNote');
const sealEl = document.getElementById('poemSeal');

function showPoem(id) {
  const poem = POEMS[id];
  if (!poem) return;

  titleEl.textContent = poem.title;
  metaEl.textContent = `${poem.dynasty} · ${poem.author}`;
  bodyEl.textContent = poem.body;
  noteEl.textContent = poem.note;
  sealEl.textContent = poem.seal;

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function hidePoem() {
  overlay.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.poem-spot').forEach(spot => {
  spot.addEventListener('click', () => showPoem(spot.dataset.poem));
  spot.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPoem(spot.dataset.poem);
    }
  });
});

closeBtn.addEventListener('click', hidePoem);

overlay.querySelector('.poem-backdrop').addEventListener('click', hidePoem);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !overlay.hidden) hidePoem();
});
