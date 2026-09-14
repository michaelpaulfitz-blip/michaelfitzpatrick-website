# Build note: Chewy experience map

Built 2026-09-14 against `docs/experience-map-playbook.md` in jobbot3000, using
`flexport-trucking-tech-demo/` as the reference build and
`jobbot3000/demos/chewy/design-tokens.css` for the palette.

Three files: `index.html` (renderer, zero prose), `content.js` (all copy and data),
`icons.js`. No framework, no bundler, no npm, no third-party scripts beyond Google Fonts.

---

## Decisions

### Rem root: 16px root, Chewy values converted to px

Chewy ships `html{font-size:10px}` and expresses everything in rem against that. This page
keeps a normal **16px root** and converts instead: every Chewy rem was multiplied by 10 to
get px, then re-expressed against 16px.

- Their `0.8rem` card radius is written here as `0.5rem` (8px).
- Their `5.6rem` pill is `3.5rem` (56px).
- Their type scale (19 / 23 / 31 / 39 / 47 / 55px) is used as px-equivalent rem.

Reason: the reference build is rem-against-16px throughout. Dropping the root to 10px would
have silently shrunk every inherited value to 62.5% of its intended size. One convention,
applied everywhere, is the safer trade.

### Wordmark: text only, no Chewy logo

The nav carries a plain text wordmark, `Michael Fitzpatrick` (pulled from `meta.owner`),
next to a small blue dot. **Chewy's script wordmark is deliberately not reproduced.** It is
their trademark, and a personal page carrying their logo reads as impersonation rather than
as a candidate artifact. This matches the explicit instruction in `design-tokens.css`. The
page uses their palette, type, and component conventions, and names Chewy in text only.

### Sections stripped from the reference build

Removed entirely:

- **`#lifecycle`** and everything it needed: the flow line, the moving vehicle animation,
  the 6-row lifecycle grid, `runsOf()`, the step-icon map, the marker modal, the cell modal,
  and the lifecycle metrics row.
- **`#appendix`**, including the "If I had ninety days" closer, the bets grid, and the
  closer footer.
- The **popup/notice modal queue**, its `localStorage` key, and the "Show notices" nav
  button, which existed to carry the Flexport disclaimers.
- The **`LAYOUT` / `single-line`** switch and the walkthrough section, both Flexport-specific.

The page is now hero, `#mapping`, `#references`, footer. Nothing else.

### Design specifics worth not regressing

- **Accent `#1c49c4` is reserved for one meaning**: work outcomes, active card borders, lit
  primary connectors, and section eyebrows. Links are navy `#002857` and go blue only on
  hover.
- **Yellow `#ffc60a` appears exactly once on the page**, on the hero cue pill, on the navy
  band. Verified by DOM audit: one element. Never on a number.
- **Cards separate with a 1px `#ededed` border and `box-shadow:none`.** Shadow appears on
  hover only. `box-shadow:none` is the most frequent shadow declaration in Chewy's bundle.
- **Zero letter-spacing on every heading.** The only tracking on the page is Chewy's "wide"
  0.16em variant, used on the eyebrow, column heads, and the JD badge.
- **Banner line-height 1.56** on the hero h1 and section h2s. It looks loose. It is
  deliberate and it is theirs.
- **All pills are 56px radius**, cards 8px.
- Backgrounds are warm creams (`#faf8f5` page, `#f6f2ea` map band), never grey off-whites.

### Deliberate palette exceptions

Two elements sit **outside** the Chewy palette, both in orange `#f58039`:

1. **The coach mark.** Sanctioned by §6.5 of the spec. Its job is to be impossible to ignore.
2. **The draft bar and TODO toggle.** Draft scaffolding. Kept in the same orange so it can
   never be mistaken for Chewy chrome, and so the yellow stays reserved for the hero cue.
   Both disappear when `DRAFT` flips to false.

Chewy's own orange is `#f06c00`. `#f58039` was chosen precisely because it is *not* in their
token file.

### Fonts

Poppins (headings) and Work Sans (body) loaded directly from Google Fonts. Both are Chewy's
actual banner and editorial faces. Their UI font **Gordita is licensed and was not attempted
or substituted**; the two real faces carry the whole page.

---

## Deviations

### 1. A `ui` block was added to `content.js`

The prompt said not to edit `content.js` except for a genuine rendering bug. This is that
case: the spec requires **zero prose in `index.html`**, and `content.js` as written had
nowhere to put the strings the reference build had hardcoded in markup.

Added a single new top-level `ui` key, between `hero` and `mapping`. **No existing field was
touched.** It holds:

- `columns.problems` / `columns.work` — the two column heads
- `fromJD` — the badge on research-versus-JD problems
- `coach[]` — the two coach-mark states, title and body
- `coachDismiss` — aria-label on the dismiss control
- `refs.*` — the primary heading, disclosure title, count template, open/close labels
- `draftBar`, `todoTitle`, `todoToggle`, `todoEmpty`, `todoCount`, `todoNone` — draft chrome

Mike should treat these as copy like everything else, and they are worth a pass.

The `<title>` tag ships empty and is composed at runtime from `meta`, so the markup holds no
reader-visible sentence at all. Verified: zero text nodes in the body outside `<script>`.

### 2. Fixed a latent bug carried over from the reference build

`classList.toggle(name, force)` treats an **undefined** second argument as "no argument
given" and plain-toggles instead of setting. The reference build computes
`!!active && (i===active || linked[i])`, which is `undefined` for any unlinked card, so
`.on` was being flipped onto every card on every trace. Caught by DOM assertion, not by eye.
Fixed here by coercing to a real boolean: `!!(lit && (...))`.

**The same bug is live in `flexport-trucking-tech-demo/index.html` around line 947.** It is
worth patching there.

### 3. References layout follows the spec, not the reference build

§7 says the primary list is visible and only the secondary groups sit behind a disclosure.
The Flexport build put both inside one `<details>`. This page shows the 10 primary sources
with their notes inline, and collapses the 32 secondary sources behind
"10 primary sources, 32 more in the full list".

### 4. Connector stroke colours

The spec's §6.3 snippet strokes every path in `var(--accent)`. The reference build uses two
colours, and this page keeps that: `#1c49c4` for primary edges, `#617c98` (Chewy slate) for
supporting. The opacity ladder is untouched and exact: idle 0.10, primary 0.9, supporting
0.5, inactive 0.05. An unpinned hover preview multiplies the lit values by 0.55 and applies
no `.off` class, which is the "reduced strength" the spec asks for.

---

## Cache-buster: bump it on EVERY `content.js` edit

```html
<script src="content.js?v=20260914074952"></script>
```

**This is the single highest-frequency failure mode in this build pattern.** If a copy change
does not appear, check this stamp before you check anything else. Deploys report success
while the browser happily serves a days-old `content.js`; a `DRAFT = false` flip will look
like it undid itself.

Before every push:

```bash
sed -i "s|content\.js?v=[0-9]*|content.js?v=$(date +%Y%m%d%H%M%S)|" index.html
```

Commit that change in the same commit as the content change.

---

## Before this ships

- `DRAFT` is still `true` in `content.js`. Mike does a content pass using the visible IDs.
- Work the five items in `todos[]`, especially **T01** (the automation percentage is from an
  older disclosure) and **T03** (the MATES YTD figure).
- Three `[VERIFY]` markers are in the content and need clearing.
- Flip `DRAFT = false`, bump the cache-buster, re-run the §10 checklist, then deploy.
- Not deployed and not pushed. Mike reviews first.
