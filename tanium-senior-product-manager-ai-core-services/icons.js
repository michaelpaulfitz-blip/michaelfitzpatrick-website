/* Source: stroke icons from Lucide (https://lucide.dev, raw SVGs from lucide-icons/lucide@main).
   Licence: ISC (Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of
   Feather (MIT); all other copyright (c) for Lucide are held by Lucide Contributors 2022).
   fpArrow / fpChevron are filled glyphs extracted from Flexport's own public SVG sprite at
   https://www.flexport.com/sprite.e33429a35c5ee6af61655d468770b6c9efdc79929a6f5845e4c3cc937c3b7412.svg
   Extracted 2026-09-03.

   Style separation: every `stroke:true` entry is a 24x24 Lucide stroke glyph (fill:none,
   stroke:currentColor, stroke-width:2, round caps/joins). The only `stroke:false` entries are the
   two Flexport brand glyphs, which are filled and deliberately kept apart from the Lucide set.

   All <circle>, <rect> and <polyline> primitives have been converted to equivalent <path> data so
   every icon is uniformly a list of path strings. */

const ICONS = {
  truck:     { viewBox:"0 0 24 24", stroke:true,  d:[
    "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
    "M15 18H9",
    "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
    "M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
  ] },

  warehouse: { viewBox:"0 0 24 24", stroke:true,  d:[
    "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11",
    "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
    "M6 13h12",
    "M6 17h12"
  ] },

  ship:      { viewBox:"0 0 24 24", stroke:true,  d:[
    "M12 2v2",
    "M12 9.189V13",
    "M19 12V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6",
    "M19.38 19A11.6 11.6 0 0 0 21 13l-8.188-3.639a2 2 0 0 0-1.624 0L3 13.001a11.6 11.6 0 0 0 2.81 7.76",
    "M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  ] },

  container: { viewBox:"0 0 24 24", stroke:true,  d:[
    "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
    "M10 21.9V14L2.1 9.1",
    "m10 14 11.9-6.9",
    "M14 19.8v-8.1",
    "M18 17.5V9.4"
  ] },

  anchor:    { viewBox:"0 0 24 24", stroke:true,  d:[
    "M12 6v16",
    "m19 13 2-1a9 9 0 0 1-18 0l2 1",
    "M9 11h6",
    "M10 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
  ] },

  package:   { viewBox:"0 0 24 24", stroke:true,  d:[
    "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
    "M12 22V12",
    "M3.29 7L12 12L20.71 7",
    "m7.5 4.27 9 5.15"
  ] },

  document:  { viewBox:"0 0 24 24", stroke:true,  d:[
    "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
    "M14 2v5a1 1 0 0 0 1 1h5",
    "M10 9H8",
    "M16 13H8",
    "M16 17H8"
  ] },

  receipt:   { viewBox:"0 0 24 24", stroke:true,  d:[
    "M12 17V7",
    "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8",
    "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
  ] },

  money:     { viewBox:"0 0 24 24", stroke:true,  d:[
    "M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
    "M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M6 12h.01M18 12h.01"
  ] },

  clock:     { viewBox:"0 0 24 24", stroke:true,  d:[
    "M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0",
    "M12 6v6l4 2"
  ] },

  calendar:  { viewBox:"0 0 24 24", stroke:true,  d:[
    "M8 2v3",
    "M16 2v3",
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "M3 9h18",
    "m9 15 2 2 4-4"
  ] },

  verified:  { viewBox:"0 0 24 24", stroke:true,  d:[
    "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "m16 9-5.5 5.5L8 12"
  ] },

  warning:   { viewBox:"0 0 24 24", stroke:true,  d:[
    "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
    "M12 9v4",
    "M12 17h.01"
  ] },

  handshake: { viewBox:"0 0 24 24", stroke:true,  d:[
    "m11 17 2 2a1 1 0 1 0 3-3",
    "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    "m21 3 1 11h-2",
    "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
    "M3 4h8"
  ] },

  train:     { viewBox:"0 0 24 24", stroke:true,  d:[
    "M8 3.1V7a4 4 0 0 0 8 0V3.1",
    "m9 15-1-1",
    "m15 15 1-1",
    "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z",
    "m8 19-2 3",
    "m16 19 2 3"
  ] },

  plane:     { viewBox:"0 0 24 24", stroke:true,  d:[
    "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
  ] },

  /* --- Flexport brand glyphs. FILLED, not stroked. Do not mix with the set above. --- */
  fpArrow:   { viewBox:"0 0 28 28", stroke:false, d:[
    "M14.36 0H0l11.11 12.19L0 24.39h14.36l10.84-12.2L14.36 0z"
  ] },

  fpChevron: { viewBox:"0 0 26 26", stroke:false, d:[
    "M9.306 17.962L14.268 13 9.306 8.027 10.833 6.5l6.5 6.5-6.5 6.5-1.527-1.538z"
  ] },
};
