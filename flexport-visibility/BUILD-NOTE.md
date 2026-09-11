# Build note

Tier 1 experience map for Flexport, Staff Product Manager, Visibility. Scaffolded 2026-09-11
from `../flexport-trucking-tech-demo/` with the lifecycle, walkthrough, closer and appendix
sections removed. Design tokens are the ones read from Flexport's live CSS bundle
(`C:/dev/jobbot3000/demos/flexport/design-tokens.css`).

Status: shell only. `content.js` has `DRAFT = true` and PLACEHOLDER rows in `problems[]`,
`work[]`, `edges[]` and `references.primary[]`. The JD mine fills them in as a pure data swap.

Live at `https://michaelfitzpatrick.me/flexport-visibility/`. Everything is path-relative, so
renaming this folder is the whole change if the slug ever moves.

## Deploy

`index.html` loads `content.js` with a version query:

    <script src="content.js?v=YYYYMMDDHHMMSS"></script>

**Bump that stamp whenever `content.js` changes, in the same commit.** Without it browsers
serve a cached copy, and the symptom is confusing: the HTML updates while the data does not,
so the page renders old copy or an old DRAFT flag with no error anywhere.

One-liner from this directory:

    sed -i "s|content\.js?v=[0-9]*|content.js?v=$(date +%Y%m%d%H%M%S)|" index.html

Push to `master`; Render auto-deploys. The page carries `noindex, nofollow` and is not linked
from any nav or index page. Share the URL by hand only.
