/**
 * paintings.js — Gallery data source
 *
 * HOW TO ADD A NEW PAINTING
 * ─────────────────────────
 * 1. Export ONE image per illustration, ~1800px on the long edge, as .webp,
 *    into assets/illustrations/. That single file is used for both the
 *    gallery grid and the lightbox — no separate thumbnail/full-size needed.
 * 2. Copy one of the objects below and paste it at the end of the array.
 * 3. Fill in the fields:
 *    - id         : unique slug, no spaces (used for future deep-linking)
 *    - seoCategory: short category tag used only for sitemap.xml image titles
 *                   (e.g. "Landscape Illustration", "Fantasy Environment Art")
 *    - title      : display name shown in the gallery and lightbox
 *    - year       : e.g. "2025"
 *    - medium     : e.g. "Digital painting"
 *    - desc       : short description shown in the lightbox panel
 *    - thumbnail  : path to the single image file (grid + lightbox)
 * 4. Run `npm run build:sitemap` to update sitemap.xml.
 *
 * SHOWING MULTIPLE PROCESS STAGES (optional)
 * ───────────────────────────────────────────
 * If you want the lightbox to scroll through WIP/rough/final shots instead
 * of just the one image, add a `stages` array:
 *   stages: [
 *     { src: 'assets/illustrations/name_rough.webp', label: 'Rough' },
 *     { src: 'assets/illustrations/name_final.webp', label: 'Final', caption: 'optional note' },
 *   ]
 * Omit `stages` entirely for a single-image painting — the site falls back
 * to using `thumbnail` in the lightbox automatically.
 */

const PAINTINGS = [
  {
    id: 'forest',
    seoCategory: 'Fantasy Landscape Illustration',
    title: 'Forest',
    year: '2026',
    medium: 'Digital painting',
    desc: 'A sprawling ancient forest bathed in light.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'plains',
    seoCategory: 'Environment Landscape Illustration',
    title: 'Plains',
    year: '2026',
    medium: 'Digital painting',
    desc: 'Wide-open grassland at golden hour.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'umbral_rift',
    seoCategory: 'Fantasy Environment Art',
    title: 'Umbral Rift',
    year: '2026',
    medium: 'Digital painting',
    desc: 'A monumental beast-mouth cavern entrance.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'ash_monolith',
    seoCategory: 'Landscape Illustration',
    title: 'Ash Monolith',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A solitary ancient monolith rises from an ash-covered plain.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'mana_breach',
    seoCategory: 'Fantasy Landscape Art',
    title: 'Mana Breach',
    year: '2025',
    medium: 'Digital painting',
    desc: 'An arcane rupture tears through a ruined landscape.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'whispers_from_the_mireglass',
    seoCategory: 'Landscape Illustration',
    title: 'Whispers from the Mireglass',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A reflective swamp with ghostly apparitions.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'heartroot_vault',
    seoCategory: 'Environment Illustration',
    title: 'Heartroot Vault',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A vast underground root network forms a cathedral-like natural vault.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'paradox_hollow',
    seoCategory: 'Landscape Illustration',
    title: 'Paradox Hollow',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A spatially distorted desert where geometry defies logic.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
  {
    id: 'the_artifact_vault',
    seoCategory: 'Environment Illustration',
    title: 'The Artifact Vault',
    year: '2025',
    medium: 'Digital painting',
    desc: 'An old catacomb guarded by creepy spiders.',
    thumbnail: 'assets/illustrations/Plains_Aethros.jpg',
  },
];

// Node export (build scripts, e.g. scripts/generate-sitemap.js). No-op in the
// browser, where PAINTINGS is used directly as a global — this file is still
// loaded there via a plain <script src="paintings.js"> tag.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PAINTINGS;
}
