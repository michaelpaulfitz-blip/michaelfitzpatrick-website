# Build note: Instacart experience map

Built 2026-09-21 against `docs/experience-map-playbook.md` in jobbot3000, using
`chewy-senior-technical-pm-inventory-technology/` as the reference build (it carries the
`classList.toggle` fix) and `jobbot3000/demos/instacart/design-tokens.css` for the palette.

Three files: `index.html` (renderer, zero prose), `content.js` (all copy and data),
`icons.js` (copied unchanged from Chewy). No framework, no bundler, no npm, no third-party
scripts beyond Google Fonts.

Inputs: `demos/instacart/research/03-pain-and-competitors.md` (left column),
`research/05-jd-mining-mode-b.md` (JD-derived problems), `RESEARCH-BRIEF.md`, and
`research/07-ida-sourceability-home-run.md` (the W01 and W02 framing). Every outcome number
is verbatim from a cleared memory file, except W10 (see todos).

---

## Decisions

### Tokens are Instacart's IDS variables, read from the live inline CSS

The `_next` stylesheet URLs 404 from outside, but the pages declare the full `--ids-*` token
set inline. Accent is `#108910` (brand-primary-regular), the hero and footer band is Kale
`#003d29` (brand-secondary), section bands are the tertiary creams, grayscale is verbatim.
Yellow `#ffdc23` (brand-max-light) appears exactly once, on the hero cue. Verified by DOM
audit: one element.

### Fonts

Instacart Sans is licensed and self-hosted. Their own declared fallback is `"Open Sans",
"Helvetica Neue", Helvetica, sans-serif`, so Open Sans carries the body. Their display face,
Instacart Contrast, is a high-contrast serif; DM Serif Display stands in for it on `h1` and
`h2` only. Every label, card title, outcome, and control stays in the sans, because the serif
has no bold weight and reads as marketing chrome at small sizes.

### Register

Depth from 1px `#e8e9eb` borders and cream bands. `box-shadow:none` is 7 of the 14 shadow
declarations in their bundle; shadow on hover only. Cards 8px, pills 999px. Zero
letter-spacing declarations exist in their bundle, so headings carry none; small uppercase
labels get 0.12em for legibility only.

### Wordmark: text only, no carrot

The nav carries `Michael Fitzpatrick` next to a green dot. The carrot mark is Instacart's
trademark and is deliberately not reproduced.

### Deliberate palette exceptions

The coach mark and the draft scaffolding are orange `#f58039`, outside the Instacart palette
on purpose, so they can never be mistaken for Instacart chrome. Both disappear when `DRAFT`
flips to false.

### Content shape

12 problems (6 from the JD, 6 from research), 11 work items, 30 edges, zero orphans. W01
(the IDA item data layer) and W02 (sourceability and the inverted contract) carry the
catalog-specific framing from the 2026-09-20 home run build; the rest are the cleared stories
in their usual shape.

---

## Cache-buster: bump it on EVERY `content.js` edit

```html
<script src="content.js?v=20260921054210"></script>
```

Before every push:

```bash
sed -i "s|content\.js?v=[0-9]*|content.js?v=$(date +%Y%m%d%H%M%S)|" index.html
```

Commit that change in the same commit as the content change.

---

## Verification, 2026-09-21

At 1440x900: 12 `.pcard`, 11 `.wcard`, 30 `path` elements, edge layer 2278px tall, click on
R02 lights W01, W02, W04 and dims 19 cards, reverse click on W01 lights R02, R03, R07, R12,
Escape clears, `scrollHeight` identical idle and traced (4068), no `on` or `off` class on any
path, idle opacity 0.10 on all paths, zero data assertions. Below 900px the board collapses to
one column and the edge layer hides by design.

---

## Before this ships

- `DRAFT` is `true`. Mike does a content pass using the visible IDs.
- Six items in `todos[]`. T01 (hero first sentence) and T02 (which system the W01 numbers
  attach to) matter most.
- Flip `DRAFT = false`, bump the cache-buster, re-run the checklist, push.
- Add the page to the-bridge.
