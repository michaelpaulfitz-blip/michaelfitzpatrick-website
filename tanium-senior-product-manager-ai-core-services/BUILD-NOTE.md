# Build note

Built from `docs/experience-map-spec.md` v1.0, reusing the Flexport reference build.

- **Design tokens** in `design-tokens.css` are read from Tanium's live Tailwind v4 theme
  (`/_next/static/chunks/06u3lnvlzmor1.css`), not guessed. Navy `#101842` ground, brand red
  `#e01a33` stepping to `#ff2742` on dark, warm bone `#efeeeb` text, radius `.375rem`,
  negative heading tracking at `-.02em`, and no shadows for depth.
- **Fonts**: Tanium self-hosts the Inter variable font, which is on Google Fonts, so no
  substitution was needed. Inconsolata is their mono voice.
- **Work outcomes** are reproduced verbatim from the career memory files by way of the
  Flexport build. No number was altered.
- **The cache-buster is bumped in the same commit as the content change**, per spec section 9.

## Two fixes made to logic inherited from the reference build

1. `classList.toggle("on", <maybe-undefined>)` treats an `undefined` second argument as
   absent and therefore *toggles* rather than forcing the class off. Because `linkedP[i]`
   and `linkedW[i]` are `undefined` for unlinked cards, every card accumulated `.on` on
   each trace. The matching `off` lines were unaffected because `!(...)` always yields a
   real boolean. Both `on` calls are now wrapped in `!!( ... )`.
2. `Escape` closed the modal scrim but did not clear an active trace. Added a handler in
   the scope where `activeId` and `setActive` live.

Both bugs exist in the Flexport build and are worth back-porting.

## Known deviation from the spec

`W11` (Project Roadie) has no digit in its `outcome`, which spec section 4.4 requires.
Carried over deliberately from the Flexport build rather than inventing a metric.
Tracked as `T07` in the draft TODO panel.

## State

`DRAFT = true`. Content IDs are visible on every card and the TODO panel is on, so the
content pass can be given as "kill R11, W07 needs a harder number". Flip `DRAFT` and
`SHOW_TODOS` to `false` in `content.js`, bump the cache-buster, and redeploy to ship.
