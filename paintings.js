/**
 * paintings.js — Gallery data source
 *
 * Each painting has one ordered `images` array — this mirrors editor.html
 * exactly, so what you see in the editor is what ships to the site:
 *   - images[0] is the cover: used for the gallery grid tile.
 *   - every image in the array (including the cover) is shown, in order,
 *     when the lightbox is opened — swipe/click through WIP, rough, final, etc.
 *   - each image can have an optional `caption` shown under it in the lightbox.
 *
 * HOW TO ADD A NEW PAINTING
 * ─────────────────────────
 * 1. Export image(s) per illustration, ~1800px on the long edge, as .webp,
 *    into assets/illustrations/.
 * 2. Copy one of the objects below and paste it at the end of the array.
 * 3. Fill in the fields:
 *    - id         : unique slug, no spaces (used for future deep-linking)
 *    - seoCategory: short category tag used only for sitemap.xml image titles
 *                   (e.g. "Landscape Illustration", "Fantasy Environment Art")
 *    - title      : display name shown in the gallery and lightbox
 *    - year       : e.g. "2025"
 *    - medium     : e.g. "Digital painting"
 *    - desc       : short description shown in the lightbox panel
 *    - images     : [{ src: 'assets/illustrations/name.webp' }, ...] —
 *                   add more entries (each with an optional `caption`) to
 *                   give the piece a multi-image lightbox.
 * 4. Run `npm run build:sitemap` to update sitemap.xml.
 *
 * Easiest way to manage all of this: open editor.html in a browser.
 */

const PAINTINGS = [
  {
    id: 'forest',
    seoCategory: 'Fantasy Landscape Illustration',
    title: 'Forest',
    year: '2026',
    medium: 'Digital painting',
    desc: 'A sprawling ancient forest bathed in light.',
    images: [{ src: 'assets/illustrations/forest_bloomborrow_final.webp' }],
  },
  {
    id: 'plains',
    seoCategory: 'Environment Landscape Illustration',
    title: 'Plains',
    year: '2026',
    medium: 'Digital painting',
    desc: 'Wide-open grassland at golden hour.',
    images: [{ src: 'assets/illustrations/plains_final.webp' }],
  },
  {
    id: 'umbral_rift',
    seoCategory: 'Fantasy Environment Art',
    title: 'Umbral Rift',
    year: '2026',
    medium: 'Digital painting',
    desc: 'A monumental beast-mouth cavern entrance.',
    images: [{ src: 'assets/illustrations/umbral_rift_final.webp' }],
  },
  {
    id: 'ash_monolith',
    seoCategory: 'Landscape Illustration',
    title: 'Ash Monolith',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A solitary ancient monolith rises from an ash-covered plain.',
    images: [{ src: 'assets/illustrations/ash_monolith_final.webp' }],
  },
  {
    id: 'mana_breach',
    seoCategory: 'Fantasy Landscape Art',
    title: 'Mana Breach',
    year: '2025',
    medium: 'Digital painting',
    desc: 'An arcane rupture tears through a ruined landscape.',
    images: [{ src: 'assets/illustrations/mana_breach_final.webp' }],
  },
  {
    id: 'whispers_from_the_mireglass',
    seoCategory: 'Landscape Illustration',
    title: 'Whispers from the Mireglass',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A reflective swamp with ghostly apparitions.',
    images: [{ src: 'assets/illustrations/whispers_from_the_mireglass_final.webp' }],
  },
  {
    id: 'heartroot_vault',
    seoCategory: 'Environment Illustration',
    title: 'Heartroot Vault',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A vast underground root network forms a cathedral-like natural vault.',
    images: [{ src: 'assets/illustrations/heartroot_vault_final.webp' }],
  },
  {
    id: 'paradox_hollow',
    seoCategory: 'Landscape Illustration',
    title: 'Paradox Hollow',
    year: '2025',
    medium: 'Digital painting',
    desc: 'A spatially distorted desert where geometry defies logic.',
    images: [{ src: 'assets/illustrations/paradox_hollow_final.webp' }],
  },
  {
    id: 'the_artifact_vault',
    seoCategory: 'Environment Illustration',
    title: 'The Artifact Vault',
    year: '2025',
    medium: 'Digital painting',
    desc: 'An old catacomb guarded by creepy spiders.',
    images: [{ src: 'assets/illustrations/the_artifact_vault_final.webp' }],
  },
];

// Node export (build scripts, e.g. scripts/generate-sitemap.js). No-op in the
// browser, where PAINTINGS is used directly as a global — this file is still
// loaded there via a plain <script src="paintings.js"> tag.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PAINTINGS;
}
