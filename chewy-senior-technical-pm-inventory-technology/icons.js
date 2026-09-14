/* Icon set for the Chewy experience map.
   Derived from the Flexport build's icons.js. Licence: ISC (Lucide, https://lucide.dev;
   portions held by Cole Bemis 2013-2022 as part of Feather, MIT).

   Chewy's own icon system is 24x24, single-path, FILLED, currentColor, with rounded
   terminals built into the path geometry. Lucide ships stroked glyphs, so the small
   chrome marks used on this page (chevron, close, check) are hand-written filled paths
   in that register, and the larger content glyph stays a Lucide stroke glyph.

   Every entry declares `stroke`. The renderer reads it to pick fill vs stroke attrs.
   NO CHEWY BRAND GLYPH IS REPRODUCED HERE. Their script wordmark is a trademark and
   this is a personal page. */

const ICONS = {

  /* --- Filled, Chewy register. Used for UI chrome. --- */
  chevronDown: { viewBox:"0 0 24 24", stroke:false, d:[
    "M12 15.5a1 1 0 0 1-.71-.29l-5-5a1 1 0 0 1 1.42-1.42L12 13.09l4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1-.71.29z"
  ] },

  chevronUp:   { viewBox:"0 0 24 24", stroke:false, d:[
    "M17 15.5a1 1 0 0 1-.71-.29L12 10.91l-4.29 4.3a1 1 0 0 1-1.42-1.42l5-5a1 1 0 0 1 1.42 0l5 5A1 1 0 0 1 17 15.5z"
  ] },

  chevronRight:{ viewBox:"0 0 24 24", stroke:false, d:[
    "M9.5 18a1 1 0 0 1-.71-1.71L13.09 12 8.79 7.71a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 0 1.42l-5 5a1 1 0 0 1-.71.29z"
  ] },

  close:       { viewBox:"0 0 24 24", stroke:false, d:[
    "M13.41 12l4.3-4.29a1 1 0 0 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 1 0 1.42 1.42l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42-1.42z"
  ] },

  check:       { viewBox:"0 0 24 24", stroke:false, d:[
    "M9.5 17a1 1 0 0 1-.71-.29l-4-4a1 1 0 0 1 1.42-1.42l3.29 3.3 8.29-8.3a1 1 0 0 1 1.42 1.42l-9 9a1 1 0 0 1-.71.29z"
  ] },

  dot:         { viewBox:"0 0 24 24", stroke:false, d:[
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
  ] },

  /* --- Lucide stroke glyphs. Content marks, kept visually apart from the chrome. --- */
  document:    { viewBox:"0 0 24 24", stroke:true, d:[
    "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
    "M14 2v5a1 1 0 0 0 1 1h5",
    "M10 9H8",
    "M16 13H8",
    "M16 17H8"
  ] },

  search:      { viewBox:"0 0 24 24", stroke:true, d:[
    "M3 11a8 8 0 1 0 16 0a8 8 0 1 0-16 0",
    "m21 21-4.3-4.3"
  ] },

  link:        { viewBox:"0 0 24 24", stroke:true, d:[
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  ] },
};
