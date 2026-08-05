#!/usr/bin/env node
/**
 * scripts/generate-sitemap.js
 *
 * Regenerates sitemap.xml from paintings.js so the two files can never drift
 * out of sync again. paintings.js is the single source of truth for every
 * illustration filename, title, description, medium, and year.
 *
 * Usage:
 *   node scripts/generate-sitemap.js
 *   npm run build:sitemap
 *
 * Run this any time paintings.js changes (new painting added/removed/renamed).
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.paolointerno.com';
const ROOT = path.join(__dirname, '..');

const PAINTINGS = require(path.join(ROOT, 'paintings.js'));

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function buildImageBlock(p) {
  // images[0] is the cover — same file used on-page for the gallery grid
  // and as the first lightbox slide.
  const imageSrc = p.images[0].src;
  const url = `${SITE_URL}/${imageSrc}`;
  const title = `${p.title} — ${p.seoCategory} by Paolo Internò`;
  const caption = `${p.desc} ${p.medium}, ${p.year}.`;
  return [
    '    <image:image>',
    `      <image:loc>${xmlEscape(url)}</image:loc>`,
    `      <image:title>${xmlEscape(title)}</image:title>`,
    `      <image:caption>${xmlEscape(caption)}</image:caption>`,
    '    </image:image>',
  ].join('\n');
}

function buildSitemap(paintings, lastmod) {
  const imageBlocks = paintings.map(buildImageBlock).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${imageBlocks}
  </url>
</urlset>
`;
}

function main() {
  for (const p of PAINTINGS) {
    if (!p.seoCategory) {
      throw new Error(`Painting "${p.id}" is missing seoCategory — add one in paintings.js before generating the sitemap.`);
    }
    if (!p.images || !p.images.length) {
      throw new Error(`Painting "${p.id}" has no images — add at least one in paintings.js before generating the sitemap.`);
    }
  }

  const outPath = path.join(ROOT, 'sitemap.xml');
  const lastmod = today();
  const xml = buildSitemap(PAINTINGS, lastmod);
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Wrote ${PAINTINGS.length} images to sitemap.xml (lastmod ${lastmod})`);
}

main();
