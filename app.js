/**
 * app.js — Paolo Internò portfolio
 * Builds the gallery grid from PAINTINGS (see paintings.js), lays it out in
 * an editorial row pattern, and drives the lightbox viewer.
 * Depends on paintings.js being loaded first.
 */
'use strict';


/* ── Build gallery from PAINTINGS data ── */
const grid = document.getElementById('galleryGrid');
PAINTINGS.forEach((p, i) => {
  const isFirst = i === 0;
  const el = document.createElement('article');
  el.className = 'gallery-item';
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.innerHTML = `
    <figure>
      <picture>
        <source srcset="${p.thumbnail}" type="image/webp"${isFirst ? '' : ''} />
        <img src="${p.thumbnail}" alt="${p.title} — illustration by Paolo Internò"${isFirst ? ' fetchpriority="high"' : ' loading="lazy"'} />
      </picture>
      <figcaption>${p.title} — ${p.desc} ${p.medium} · ${p.year}.</figcaption>
    </figure>
    <div class="item-overlay"><span class="item-label">${p.title}</span></div>`;
  el.style.animationDelay = Math.min(0.04 + i * 0.05, 0.5) + 's';
  grid.appendChild(el);
});

/* ── Gallery layout ── */
const items = Array.from(document.querySelectorAll('.gallery-item'));
const DESKTOP_ROW_H = 500, TABLET_ROW_H = 340;
const desktopPatterns = [[58,42],[45,55],[30,40,30],[25,50,25]];
const desktopPair = [58,42];
const tabletPairs = [['62%','38%'],['38%','62%']];

// Row-based patterns need a full group to look balanced. Any leftover items
// (count not divisible by 3 on desktop, or not paired on tablet) are widened
// to fill their row completely instead of leaving dead space — so the grid
// stays balanced no matter how many illustrations are added.
function applyGalleryLayout() {
  const w = window.innerWidth;
  const n = items.length;
  const styles = [];
  if (w > 1100) {
    const total = desktopPatterns[0].reduce((a,b) => a+b, 0);
    const fullRows = Math.floor(n/3), remainder = n%3;
    for (let i = 0; i < fullRows*3; i++) {
      const row = Math.floor(i/3), col = i%3;
      const ratios = desktopPatterns[row % desktopPatterns.length];
      const pct = (ratios[col]/total*100).toFixed(2);
      styles.push({el:items[i], width:'calc('+pct+'% - 7px)', height:DESKTOP_ROW_H+'px', flex:'0 0 calc('+pct+'% - 7px)'});
    }
    if (remainder === 1) {
      styles.push({el:items[n-1], width:'100%', height:DESKTOP_ROW_H+'px', flex:'0 0 100%'});
    } else if (remainder === 2) {
      [n-2, n-1].forEach((idx, col) => {
        const pct = desktopPair[col];
        styles.push({el:items[idx], width:'calc('+pct+'% - 7px)', height:DESKTOP_ROW_H+'px', flex:'0 0 calc('+pct+'% - 7px)'});
      });
    }
  } else if (w >= 769) {
    styles.push({el:items[0], width:'100%', height:TABLET_ROW_H+'px', flex:'none'});
    const rest = n-1, fullPairs = Math.floor(rest/2);
    for (let i = 1; i <= fullPairs*2; i++) {
      const pi = i-1, pr = Math.floor(pi/2) % tabletPairs.length, pos = pi%2;
      styles.push({el:items[i], width:'calc('+tabletPairs[pr][pos]+' - 5px)', height:TABLET_ROW_H+'px', flex:'none'});
    }
    if (rest % 2 === 1) {
      styles.push({el:items[n-1], width:'100%', height:TABLET_ROW_H+'px', flex:'none'});
    }
  } else {
    items.forEach(el => styles.push({el, width:'', height:'', flex:''}));
  }
  requestAnimationFrame(() => {
    items.forEach(el => { el.style.width=''; el.style.height=''; el.style.flex=''; });
    styles.forEach(({el,width,height,flex}) => { el.style.width=width; el.style.height=height; el.style.flex=flex; });
  });
}
applyGalleryLayout();
let _rt;
window.addEventListener('resize', () => { clearTimeout(_rt); _rt = setTimeout(applyGalleryLayout, 120); });

/* ── Lightbox ── */
const data = PAINTINGS.map((p, i) => ({
  i, title: p.title,
  meta: p.medium + ' · ' + p.year,
  desc: p.desc,
  stages: p.stages || [{ src: p.thumbnail }],
  el: items[i]
}));

let cur = 0, lbOpen = false;
const isMob = () => window.innerWidth <= 768;
const lb          = document.getElementById('lightbox');
const lbScrollArea = document.getElementById('lbScrollArea');
const lbCtr       = document.getElementById('lbCounter');
const lbTitl      = document.getElementById('lbTitle');
const lbMeta      = document.getElementById('lbMeta');
const lbDesc      = document.getElementById('lbDesc');
const sbCap       = document.getElementById('sbCaption');
const sbTitl      = document.getElementById('sbTitle');
const sbMeta      = document.getElementById('sbMeta');
function buildScrollArea(d) {
  lbScrollArea.innerHTML = '';
  d.stages.forEach((s, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'lightbox-process-item';
    const img = document.createElement('img');
    img.src = s.src;
    img.alt = d.title;
    img.loading = idx === 0 ? 'eager' : 'lazy';
    wrap.appendChild(img);
    if (s.caption) {
      const cap = document.createElement('p');
      cap.style.cssText = 'font-family:var(--font-serif);font-size:12px;font-style:italic;color:var(--ink-dim);text-align:center;margin-top:-.4rem';
      cap.textContent = s.caption;
      wrap.appendChild(cap);
    }
    lbScrollArea.appendChild(wrap);
  });
  lbScrollArea.scrollTop = 0;
}

function syncUI() {
  const d = data[cur];
  lbCtr.textContent = (cur+1) + ' / ' + data.length;
  lbTitl.textContent = d.title;
  lbMeta.textContent = d.meta;
  lbDesc.textContent = d.desc;
  sbTitl.textContent = d.title;
  sbMeta.textContent = d.meta;
  buildScrollArea(d);
}

function navigate(dir) {
  cur = (cur + dir + data.length) % data.length;
  syncUI();
}

function openLb(idx) {
  cur = idx; lbOpen = true;
  syncUI();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!isMob()) { sbCap.classList.add('active'); sbCap.removeAttribute('aria-hidden'); }
  document.getElementById('lbClose').focus();
}

function closeLb() {
  if (!lbOpen) return;
  lbOpen = false;
  lb.classList.remove('open');
  document.body.style.overflow = '';
  sbCap.classList.remove('active');
  sbCap.setAttribute('aria-hidden', 'true');
  data[cur].el.focus();
}

items.forEach((el, i) => {
  el.addEventListener('click', () => openLb(i));
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); } });
});
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbCloseMobile').addEventListener('click', closeLb);
document.getElementById('lbBackdrop').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => navigate(-1));
document.getElementById('lbNext').addEventListener('click', () => navigate(1));
document.getElementById('sbPrev').addEventListener('click', () => navigate(-1));
document.getElementById('sbNext').addEventListener('click', () => navigate(1));
document.addEventListener('keydown', e => {
  if (!lbOpen) return;
  if (e.key === 'ArrowLeft') navigate(-1);
  else if (e.key === 'ArrowRight') navigate(1);
  else if (e.key === 'Escape') closeLb();
});
lbScrollArea.addEventListener('click', e => {
  if (e.target === lbScrollArea || e.target.classList.contains('lightbox-process-item')) closeLb();
});
let _tx = null, _ty = null;
lb.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; _ty = e.touches[0].clientY; }, {passive:true});
lb.addEventListener('touchend', e => {
  if (_tx === null) return;
  const dx = e.changedTouches[0].clientX - _tx;
  const dy = Math.abs(e.changedTouches[0].clientY - _ty);
  if (Math.abs(dx) > 50 && dy < 60) navigate(dx < 0 ? 1 : -1);
  _tx = null; _ty = null;
}, {passive:true});
