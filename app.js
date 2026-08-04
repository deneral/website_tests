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
// Fixed 2-per-row grid; column width is fluid (CSS grid `1fr`), so no JS
// sizing is needed — see .gallery-grid / .gallery-item in style.css.
const items = Array.from(document.querySelectorAll('.gallery-item'));

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
