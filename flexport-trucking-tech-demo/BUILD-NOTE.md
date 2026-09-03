# Deploy note

`index.html` loads `content.js` with a version query:

    <script src="content.js?v=YYYYMMDDHHMMSS"></script>

**Bump that stamp whenever `content.js` changes.** Without it browsers serve a cached
copy, and the symptom is confusing: the HTML updates while the data does not, so the
page renders old copy or an old DRAFT flag with no error anywhere.

One-liner from this directory:

    sed -i "s|content\.js?v=[0-9]*|content.js?v=$(date +%Y%m%d%H%M%S)|" index.html
