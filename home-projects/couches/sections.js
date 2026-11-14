/* Couch Guide sections, settings, sync, routing and boot. */
(function(){
'use strict';
var CG = window.CG, esc = CG.esc, $ = CG.$, num = CG.num, money = CG.money, S = CG.S, ED = CG.ED || {};
var X = function(){ return CG.cache(); };

/* ── mini markdown for editorial blocks: **bold**, [text](url), "- " bullets, pipe tables ── */
function inline(s){
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, function(m, t, u){ return '<a href="' + u + '" target="_blank" rel="noopener">' + t + '</a>'; });
}
function md(src){
  if (!src) return '';
  var paras = Array.isArray(src) ? src : String(src).split(/\n\s*\n/);
  var out = '', ul = [];
  function flush(){ if (ul.length){ out += '<ul>' + ul.map(function(l){ return '<li>' + inline(l) + '</li>'; }).join('') + '</ul>'; ul = []; } }
  paras.forEach(function(p){
    p = String(p).trim(); if (!p) return;
    var lines = p.split('\n');
    if (lines.every(function(l){ return /^\s*[-*] /.test(l); })){ lines.forEach(function(l){ ul.push(l.replace(/^\s*[-*] /, '')); }); return; }
    flush();
    if (lines.length > 1 && lines.every(function(l){ return /^\s*\|/.test(l); })){
      var rows = lines.filter(function(l){ return !/^\s*\|[\s:|-]+\|\s*$/.test(l); }).map(function(l){ return l.trim().replace(/^\||\|$/g, '').split('|').map(function(c){ return c.trim(); }); });
      out += '<table><thead><tr>' + rows[0].map(function(c){ return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.slice(1).map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
      return;
    }
    out += '<p>' + inline(p).replace(/\n/g, '<br>') + '</p>';
  });
  flush();
  return '<div class="prose">' + out + '</div>';
}
CG.md = md;
var B = ED.blocks || {};

/* ── theme, who, nav ── */
(function(){
  var btn = $('themeBtn'), root = document.documentElement;
  function sync(){ var dark = root.getAttribute('data-theme') === 'dark'; btn.innerHTML = dark ? '&#9728;' : '&#9790;'; btn.title = btn.ariaLabel = dark ? 'Switch to light mode' : 'Switch to dark mode'; }
  btn.addEventListener('click', function(){ var dark = root.getAttribute('data-theme') !== 'dark'; if (dark) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme'); CG.lsSet('homeProjects.theme', dark ? 'dark' : 'light'); sync(); });
  sync();
})();
function renderWho(){
  $('whoName').textContent = S.who === 'carla' ? 'Carla' : S.who === 'mike' ? 'Mike' : 'both';
  $('whoBtn').classList.toggle('carla', S.who === 'carla');
  var slot = $('bannerSlot'), banner = slot.querySelector('.banner.who');
  if (!S.who && !banner){ slot.insertAdjacentHTML('beforeend', '<div class="banner who"><b>Who is using this device?</b> It decides whose stars you can tap on the cards.' +
    '<button type="button" class="btn" data-who-set="carla">Carla</button><button type="button" class="btn" data-who-set="mike">Mike</button><button type="button" class="btn" data-who-set="both">Both of us</button></div>'); }
  else if (S.who && banner) banner.remove();
}
$('whoBtn').addEventListener('click', function(){ var order = ['carla', 'mike', 'both'], i = order.indexOf(S.who); CG.setWho(order[(i + 1) % 3]); renderWho(); CG.rerender(); });
document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-who-set]'); if (!b) return; CG.setWho(b.getAttribute('data-who-set')); renderWho(); CG.rerender(); });

var SECTIONS = [
  { id: 'overview', label: 'Overview', group: 'Decide' }, { id: 'brief', label: 'What we want', group: 'Decide' },
  { id: 'picks', label: 'Top picks', group: 'Decide', count: function(){ return ((ED.picks || {})[CG.cat()] || []).length; } },
  { id: 'library', label: 'Browse all', group: 'Decide', count: function(){ return CG.catItems().length; } },
  { id: 'shortlist', label: 'Shortlist and compare', group: 'Decide', count: function(){ return CG.catItems().filter(function(x){ return x.shortlist; }).length; } },
  { id: 'money', label: 'Financing', group: 'Money and timing' }, { id: 'timing', label: 'Timing', group: 'Money and timing' },
  { id: 'try', label: 'Try in Seattle', group: 'Practical' }, { id: 'care', label: 'Fabric and messes', group: 'Practical' },
  { id: 'setup', label: 'Our room and settings', group: 'Practical' }, { id: 'old-couch', label: 'Old couch', group: 'Practical' },
  { id: 'sources', label: 'Sources and data', group: 'Housekeeping' }, { id: 'sync', label: 'Notes and sync', group: 'Housekeeping' }
];
function renderNav(){
  var h = '', g = null;
  SECTIONS.forEach(function(s){ if (s.group !== g){ g = s.group; h += '<div class="sn-section">' + esc(g) + '</div>'; }
    var n = s.count ? s.count() : null; h += '<a href="#' + s.id + '" class="sn-item" data-sec="' + s.id + '">' + esc(s.label) + (n ? '<span class="sn-count">' + n + '</span>' : '') + '</a>'; });
  $('snList').innerHTML = h; spy();
}
function spy(){
  var cur = SECTIONS[0].id, atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  SECTIONS.forEach(function(s){ var el = $(s.id); if (el && el.getBoundingClientRect().top <= 120) cur = s.id; });
  if (atBottom) cur = SECTIONS[SECTIONS.length - 1].id;
  [].forEach.call(document.querySelectorAll('.sn-item'), function(a){ var on = a.getAttribute('data-sec') === cur; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
}
var spyT = false; window.addEventListener('scroll', function(){ if (spyT) return; spyT = true; setTimeout(function(){ spyT = false; spy(); }, 80); }, { passive: true });
function toggleNav(open){ document.body.classList.toggle('nav-open', open); $('menuBtn').setAttribute('aria-expanded', open); }
CG.toggleNav = toggleNav;
$('menuBtn').addEventListener('click', function(){ toggleNav(!document.body.classList.contains('nav-open')); });
$('scrim').addEventListener('click', function(){ toggleNav(false); });
$('sectionnav').addEventListener('click', function(e){ if (e.target.closest('a')) toggleNav(false); });

/* ── category switch ── */
function setCat(c, push){
  S.ui.cat = c === 'sofa' ? 'sofa' : 'sectional'; CG.saveUI();
  [].forEach.call(document.querySelectorAll('[data-cat]'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-cat') === S.ui.cat); });
  if (push !== false){ var u = new URL(location.href); if (S.ui.cat === 'sofa') u.searchParams.set('cat', 'sofa'); else u.searchParams.delete('cat'); history.replaceState(history.state, '', u); }
  renderAll();
}
[].forEach.call(document.querySelectorAll('[data-cat]'), function(b){ b.addEventListener('click', function(){ setCat(b.getAttribute('data-cat')); }); });

/* ── overview ── */
var BF = CG.d0('2026-11-27'), CM = CG.d0('2026-11-30');
function renderOverview(){
  var x = X(), s = x.s, t = CG.today();
  $('lead').innerHTML = md(B.overviewLead && B.overviewLead.length ? B.overviewLead : ['Two couches: a plush, tidy, right-chaise sectional for the main floor and a budget three-seat sofa for the family room. Everything is filterable, rateable by both of us, and priced with real financing math.']).replace(/^<div class="prose"><p>|<\/p><\/div>$/g, '');
  function cd(d, label, note){ var n = CG.diffDays(d, t); if (n < 0) return ''; return '<div class="fact"><div class="k">' + label + '</div><div class="v">' + (n === 0 ? 'Today' : n + ' days') + '</div><div class="d">' + CG.fmtDY(d) + (note ? ', ' + note : '') + '</div></div>'; }
  var h = '<div class="facts">' + cd(BF, 'Black Friday') + cd(CM, 'Cyber Monday') + cd(s.target, 'Arrival target', 'aim for delivery by here') + cd(s.deadline, 'Hard deadline', 'must be in the house') + '</div>';
  h += '<h3>Order by, to arrive by ' + CG.fmtD(s.target) + '</h3><div class="tw"><table class="plain"><thead><tr><th>Lead time</th><th>Order by</th><th></th></tr></thead><tbody>' + [4, 8, 10, 12, 16].map(function(w){
    var ob = CG.addDays(s.target, -w * 7), late = ob < t; return '<tr><td class="n">' + w + ' weeks</td><td class="n">' + CG.fmtDY(ob) + '</td><td>' + (late ? '<span class="tag bad">Already passed</span>' : CG.diffDays(ob, t) <= 14 ? '<span class="tag warn">Soon</span>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  h += '<div class="two" style="margin-top:14px">' + ['sectional', 'sofa'].map(function(cat){
    var xs = x[cat], rated = xs.filter(function(y){ return y.cl && y.ml; }).length, sl = xs.filter(function(y){ return y.shortlist; });
    var top = sl.slice().sort(function(a, b){ return (b.combined || 0) - (a.combined || 0) || (b.fit || 0) - (a.fit || 0); })[0];
    var dec = (ED.decisions || []).filter(function(d){ return d.category === cat; }).slice(-1)[0];
    return '<div class="fact" style="background:var(--card)"><div class="k">' + (cat === 'sectional' ? 'Main floor sectional' : 'Family room sofa') + '</div><div class="v sm" style="margin-top:6px">' +
      xs.length + ' options &middot; ' + rated + ' rated by both &middot; ' + sl.length + ' shortlisted</div><div class="d">' +
      (top ? 'Leading: <a href="?item=' + esc(top.c.id) + '" data-act="open" data-id="' + esc(top.c.id) + '">' + esc(top.c.brand + ' ' + top.c.model) + '</a>' : 'Nothing shortlisted yet') + (dec ? '<br>Decision: ' + esc(dec.decision) : '') + '</div>' +
      '<button type="button" class="btn" style="margin-top:8px" data-gocat="' + cat + '">Browse ' + (cat === 'sectional' ? 'sectionals' : 'sofas') + '</button></div>';
  }).join('') + '</div>';
  if (CG.prevVisit){
    var all = x.sectional.concat(x.sofa), nw = all.filter(function(y){ return y.isNew; }).length, ch = all.filter(function(y){ return y.priceDelta; });
    if (nw || ch.length) h += '<p class="caveat">Since your last visit: ' + [nw ? CG.plural(nw, 'new option') : '', ch.length ? CG.plural(ch.length, 'price change') : ''].filter(Boolean).join(', ') + '.</p>';
  }
  $('overviewBody').innerHTML = h;
}
document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-gocat]'); if (!b) return; setCat(b.getAttribute('data-gocat')); location.hash = '#library'; });

/* ── brief ── */
function renderBrief(){
  var br = B.brief || {};
  var h = '<div class="two"><div><h3 style="margin-top:0">Main floor sectional</h3>' + md(br.sectional) + '</div><div><h3 style="margin-top:0">Family room sofa</h3>' + md(br.sofa) + '</div></div>';
  if ((B.houseRules || []).length) h += '<h3>House rules for ties</h3>' + md(B.houseRules.map(function(r){ return /^- /.test(r) ? r : '- ' + r; }));
  h += '<details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600">How we score comfort</summary>' + md(B.scoring) +
    '<div class="two"><div><table class="plain"><thead><tr><th>Softness</th><th>What it feels like</th></tr></thead><tbody>' +
    [['1 Firm', 'Under an inch of sink. You sit on top of it.'], ['2 Medium-firm', 'About an inch of sink, very supportive. Mike\'s natural zone.'], ['3 Medium', '1-2 in of sink with a quick spring back.'],
     ['4 Plush', '2-3 in of sink into a soft top layer over real support. Carla\'s zone begins here.'], ['5 Cloud', '3+ in of sink, enveloping, slow to rebound.']].map(function(r){ return '<tr><td class="n"><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>'; }).join('') +
    '</tbody></table></div><div><table class="plain"><thead><tr><th>Tidy look</th><th>After a movie night</th></tr></thead><tbody>' +
    [['1 Slouchy', 'Cushions slump and crease after one sitting. Needs fluffing every day.'], ['2 Relaxed', 'Wrinkles and shifted cushions by evening.'], ['3 Neat with upkeep', 'Some dents that recover with a weekly fluff.'],
     ['4 Tailored', 'Defined edges, fitted covers, minor creasing that mostly recovers.'], ['5 Crisp', 'Looks the same as it did that morning.']].map(function(r){ return '<tr><td class="n"><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>'; }).join('') +
    '</tbody></table></div></div><p class="caveat">The sweet spot for us is about 4 and 4: plush seat, tailored look.</p></details>';
  $('briefBody').innerHTML = h;
}

/* ── picks ── */
function renderPicks(){
  var ps = ((ED.picks || {})[CG.cat()] || []).filter(function(p){ return X().byId[p.id]; });
  $('picksHint').textContent = ED.lastReviewed ? 'Reviewed ' + CG.fmtD(ED.lastReviewed) : '';
  if (!ps.length){ $('picksBody').innerHTML = '<div class="empty">Top picks get written once the research is in and checked.</div>'; return; }
  $('picksBody').innerHTML = '<div class="picks">' + ps.map(function(p){ var x = X().byId[p.id];
    return '<button type="button" class="pk" data-act="open" data-id="' + esc(p.id) + '"><div class="imgw">' + CG.imgTag(x, (x.c.images || [])[0]) + '</div><div class="b"><span class="aw">' + esc(CG.AWARD[p.award] || p.award) + '</span><span class="t">' + esc(x.c.brand + ' ' + x.c.model) + '</span>' +
      '<span class="p">' + money(x.price) + (x.best && x.bestMonthly ? ' &middot; ' + money(x.best.type === 'deferred-interest' ? x.best.safe : x.bestMonthly) + '/mo' : '') + ' &middot; ' + esc(x.r.name || '') + '</span><span class="w">' + esc(p.why || '') + '</span></div></button>'; }).join('') + '</div>';
}

/* ── shortlist ── */
function renderShortlist(){
  var xs = CG.catItems().filter(function(x){ return x.shortlist; }).sort(function(a, b){ return (b.combined || 0) - (a.combined || 0) || (b.fit || 0) - (a.fit || 0); });
  var counts = {}; xs.forEach(function(x){ counts[x.agree] = (counts[x.agree] || 0) + 1; });
  var h = '';
  if (!xs.length) h += '<div class="empty">Tap the bookmark on any card to shortlist it. The shortlist syncs between your phones.</div>';
  else {
    h += '<div class="sl-sum">' + Object.keys(counts).map(function(k){ return '<span class="agree ' + k + '">' + CG.AGREE_LABEL[k] + ' ' + counts[k] + '</span>'; }).join('') +
      '<span class="spacer"></span><button type="button" class="btn primary" data-sl="cmp4"' + (xs.length < 2 ? ' disabled' : '') + '>Compare top ' + Math.min(4, xs.length) + '</button><button type="button" class="btn" data-sl="only">Show only these in Browse</button></div>';
    h += xs.map(function(x){ var c = x.c, n = CG.note(c.id, 'notes');
      return '<div class="sl-row"><button type="button" style="border:0;padding:0;background:none;cursor:pointer" data-act="open" data-id="' + esc(c.id) + '">' + (CG.imgSrc((c.images || [])[0]) ? '<img src="' + esc(CG.imgSrc(c.images[0])) + '" alt="" loading="lazy" referrerpolicy="no-referrer"' + (x.mirror ? ' class="mirror" style="transform:scaleX(-1)"' : '') + '>' : '<img alt="">') + '</button>' +
        '<div><button type="button" class="nm" data-act="open" data-id="' + esc(c.id) + '">' + esc(c.brand + ' ' + c.model) + '</button><div class="m"><b>' + money(x.price) + '</b>' + (x.bestMonthly ? '<span>' + money(x.best.type === 'deferred-interest' ? x.best.safe : x.bestMonthly) + '/mo</span>' : '') +
        '<span class="tag ' + CG.ARRIVE_CLS[x.arr.flag] + '">' + CG.ARRIVE_LABEL[x.arr.flag] + '</span><span><span class="pl">Soft</span>' + CG.pips(x.softUsed) + '</span><span><span class="pl">Tidy</span>' + CG.pips(x.tidy) + '</span></div>' +
        (n ? '<div class="nt">' + esc(n.slice(0, 160)) + '</div>' : '') + '</div>' +
        '<div class="r">' + CG.stars(c.id, 'carla') + CG.stars(c.id, 'mike') + '<span style="display:flex;gap:8px;align-items:center">' + CG.agreeBadge(x) + '<label class="cmpchk" style="margin:0"><input type="checkbox" data-act="cmp" data-id="' + esc(c.id) + '"' + ((S.ui.compare[CG.cat()] || []).indexOf(c.id) >= 0 ? ' checked' : '') + '> Compare</label></span></div></div>'; }).join('');
  }
  /* swatch list, both categories */
  var all = X().sectional.concat(X().sofa), by = {};
  all.forEach(function(x){ (CG.note(x.c.id, 'swatches') || []).forEach(function(n){ (by[x.c.retailerId] = by[x.c.retailerId] || []).push({ x: x, name: n }); }); });
  var rids = Object.keys(by);
  h += '<h3>Swatches to order</h3>';
  if (!rids.length) h += '<p class="caveat">Tick "Want a swatch" on any color in a couch\'s detail view and it collects here, grouped by store.</p>';
  else {
    h += rids.map(function(rid){ var r = CG.RET[rid] || { name: rid }, sw = r.swatches || {};
      return '<div style="margin-bottom:8px"><b>' + esc(r.name) + '</b> <span class="muted">' + (sw.free === true ? 'free swatches' : sw.free === false ? 'paid swatches' : 'swatch policy unknown') + (sw.typicalDays ? ', about ' + sw.typicalDays + ' days' : '') + '</span>' + (CG.safeUrl(sw.url) ? ' <a href="' + esc(sw.url) + '" target="_blank" rel="noopener">order page</a>' : '') +
        '<ul class="bullets">' + by[rid].map(function(s){ return '<li>' + esc(s.name) + ' <span class="muted">(' + esc(s.x.c.model) + ')</span></li>'; }).join('') + '</ul></div>'; }).join('') +
      '<button type="button" class="btn" data-sl="copysw">Copy list</button>';
  }
  $('shortlistBody').innerHTML = h;
  CG._swList = rids.map(function(rid){ return (CG.RET[rid] || { name: rid }).name + ':\n' + by[rid].map(function(s){ return '- ' + s.name + ' (' + s.x.c.model + ')'; }).join('\n'); }).join('\n\n');
}
CG.renderShortlist = renderShortlist;
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-sl]'); if (!b) return; var a = b.getAttribute('data-sl');
  var xs = CG.catItems().filter(function(x){ return x.shortlist; }).sort(function(p, q){ return (q.combined || 0) - (p.combined || 0) || (q.fit || 0) - (p.fit || 0); });
  if (a === 'cmp4'){ S.ui.compare[CG.cat()] = xs.slice(0, 4).map(function(x){ return x.c.id; }); CG.saveUI(); CG.renderTray(); CG.openCompare(); }
  if (a === 'only'){ var on = S.ui.chips[CG.cat()] = S.ui.chips[CG.cat()] || []; if (on.indexOf('short') < 0) on.push('short'); CG.saveUI(); CG.renderLibrary(); location.hash = '#library'; }
  if (a === 'copysw') CG.copyText(CG._swList || '');
});

/* ── money ── */
function renderMoney(){
  var x = X(), s = x.s, used = {};
  x.sectional.concat(x.sofa).forEach(function(y){ used[y.c.retailerId] = (used[y.c.retailerId] || 0) + 1; });
  var h = md(B.financing);
  /* calculator */
  var pool = CG.catItems().filter(function(y){ return y.shortlist; }); if (!pool.length) pool = CG.catItems();
  var def = pool.length ? Math.round(pool.map(function(y){ return y.allIn || 0; }).sort(function(a, b){ return a - b; })[Math.floor(pool.length / 2)]) : 3000;
  h += '<h3>Payment calculator</h3><div class="calc"><label>Amount, all-in<input type="number" id="calcP" value="' + (def || 3000) + '" step="50"></label><label>Months<input type="number" id="calcN" value="12" step="1" min="1"></label>' +
    '<label>Deferred-interest APR<input type="number" id="calcA" value="29.99" step="0.01"></label><label>Fixed APR<input type="number" id="calcF" value="9.99" step="0.01"></label></div><div id="calcOut"></div>';
  /* retailer offers */
  var rs = Object.keys(used).map(function(id){ return CG.RET[id]; }).filter(Boolean);
  function bestZ(r){ return (r.financing || []).filter(function(o){ return o.interestType === 'zero-apr'; }).reduce(function(m, o){ return Math.max(m, Math.max.apply(null, (o.termsMonths || []).concat([0]))); }, 0); }
  rs.sort(function(a, b){ return bestZ(b) - bestZ(a) || a.name.localeCompare(b.name); });
  h += '<h3>Offers by store</h3><p class="caveat">Only stores with a couch in this guide. Sorted by longest true 0% term. Store offers change often; the retailer\'s checkout is the final word.</p><div class="tw"><table class="plain"><thead><tr><th>Store</th><th>Couches</th><th>Best offer</th><th>Type</th><th>Terms</th><th>Min</th><th>Credit check</th><th>Watch out</th></tr></thead><tbody>' +
    rs.map(function(r){ var fs = (r.financing || []); if (!fs.length) return '<tr><td><b>' + esc(r.name) + '</b></td><td class="n">' + used[r.id] + '</td><td colspan="6" class="muted">No financing listed</td></tr>';
      return fs.map(function(o, i){ return '<tr>' + (i === 0 ? '<td rowspan="' + fs.length + '"><b>' + esc(r.name) + '</b>' + (r.bestFinancingSummary ? '<div class="muted" style="font-size:11.5px;max-width:240px">' + esc(r.bestFinancingSummary) + '</div>' : '') + '</td><td rowspan="' + fs.length + '" class="n">' + used[r.id] + '</td>' : '') +
        '<td>' + esc(o.provider) + (o.offerText ? '<div class="muted" style="font-size:11.5px;max-width:260px">' + esc(o.offerText) + '</div>' : '') + '</td><td>' + CG.finBadge(o) + '</td><td class="n">' + ((o.termsMonths || []).length ? o.termsMonths.join(', ') + ' mo' : '?') + '</td><td class="n">' + (o.minPurchaseUsd ? money(o.minPurchaseUsd) : '') + '</td><td>' + esc((o.creditCheck || '').replace(/-/g, ' ')) + '</td><td style="font-size:11.5px;color:var(--muted);max-width:280px">' + esc(o.gotchas || '') + (o.verify ? ' <span class="verify">verify</span>' : '') + (CG.safeUrl(o.sourceUrl) ? ' <a href="' + esc(o.sourceUrl) + '" target="_blank" rel="noopener">terms</a>' : '') + '</td></tr>'; }).join(''); }).join('') + '</tbody></table></div>';
  var cards = ED.introCards || [];
  if (cards.length) h += '<h3>0% intro APR cards (works at any store)</h3><div class="tw"><table class="plain"><thead><tr><th>Card</th><th>Intro</th><th>After</th><th>Fee</th><th>Notes</th></tr></thead><tbody>' + cards.map(function(c){
    return '<tr><td><b>' + esc(c.name) + '</b></td><td class="n">' + esc(c.introApr) + ' for ' + esc(c.introMonths) + ' mo</td><td style="font-size:12px">' + esc(c.after || '') + '</td><td class="n">' + (c.annualFee === 0 ? 'None' : esc(c.annualFee)) + '</td><td style="font-size:11.5px;color:var(--muted)">' + esc(c.notes || '') + ' <span class="verify">verify</span>' + (CG.safeUrl(c.source) ? ' <a href="' + esc(c.source) + '" target="_blank" rel="noopener">source</a>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  $('moneyBody').innerHTML = h;
  ['calcP', 'calcN', 'calcA', 'calcF'].forEach(function(id){ $(id).addEventListener('input', calc); }); calc();
}
function calc(){
  var P = num($('calcP').value) || 0, n = Math.max(1, Math.round(num($('calcN').value) || 12)), A = num($('calcA').value) || 0, F = num($('calcF').value) || 0, s = X().s;
  var fixedM = CG.amort(P, F, n), defRisk = Math.round(CG.amort(P, A, n) * n - P);
  $('calcOut').innerHTML = '<div class="tw"><table class="plain"><thead><tr><th>Plan</th><th>Monthly</th><th>Total interest</th><th>What can go wrong</th></tr></thead><tbody>' +
    '<tr><td><span class="tag good">True 0%</span> ' + n + ' mo</td><td class="n"><b>' + money(P / n, { cents: true }) + '</b></td><td class="n">$0</td><td>Pay late and only the leftover starts charging interest.</td></tr>' +
    '<tr><td><span class="tag warn">Deferred interest</span> ' + n + ' mo</td><td class="n"><b>' + money(n > 1 ? P / (n - 1) : P, { cents: true }) + '</b> to finish a month early</td><td class="n">$0 if cleared</td><td>Leave even $1 at the deadline and about <b>' + money(defRisk) + '</b> of back interest at ' + A + '% lands at once.</td></tr>' +
    '<tr><td><span class="tag">Fixed ' + F + '%</span> ' + n + ' mo</td><td class="n"><b>' + money(fixedM, { cents: true }) + '</b></td><td class="n">' + money(Math.round(fixedM * n - P)) + '</td><td>Predictable. Compare against a 0% card.</td></tr>' +
    '<tr><td><span class="tag good">0% intro card</span> ' + s.introMonths + ' mo</td><td class="n"><b>' + money(P / s.introMonths, { cents: true }) + '</b></td><td class="n">$0</td><td>New card means a hard pull. After the intro, the regular rate applies to any balance.</td></tr>' +
    '</tbody></table></div>';
}

/* ── timing ── */
function renderTiming(){
  var x = X(), s = x.s, t = CG.today();
  var h = md(B.timing);
  var xs = CG.catItems().filter(function(y){ return y.arr.start; }).sort(function(a, b){ return a.arr.end - b.arr.end; });
  if (xs.length){
    var lo = t, hi = CG.addDays(s.deadline, 21); xs.forEach(function(y){ if (y.arr.end > hi) hi = CG.addDays(y.arr.end, 7); });
    var span = hi - lo; function pct(d){ return Math.max(0, Math.min(100, (d - lo) / span * 100)); }
    var ticks = ''; for (var d = new Date(lo.getFullYear(), lo.getMonth() + 1, 1); d < hi; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) ticks += '<span style="left:' + pct(d) + '%">' + CG.fmtD(d) + '</span>';
    var marks = [[BF, 'b', 'Black Friday'], [s.target, 't', 'Arrival target'], [s.deadline, 'd', 'Hard deadline']].filter(function(m){ return m[0] >= lo; });
    h += '<h3>When each ' + CG.catWord(1) + ' would arrive if ordered ' + (CG.setting('orderDate') ? 'on ' + CG.fmtD(s.order) : 'today') + '</h3><div class="legend" style="justify-content:flex-start">' + marks.map(function(m){ return '<span><i style="border-radius:0;width:2px;height:12px;background:var(--' + (m[1] === 't' ? 'green' : m[1] === 'd' ? 'red' : 'accent') + ')"></i>' + m[2] + ', ' + CG.fmtD(m[0]) + '</span>'; }).join('') +
      '<span><i style="background:var(--green)"></i>Before target</span><span><i style="background:var(--gold)"></i>Cutting it close</span><span><i style="background:var(--red)"></i>After deadline</span></div>';
    h += '<div class="tl"><div class="tl-axis">' + ticks + '</div><div class="tl-wrap">' + xs.map(function(y){
      return '<div class="tl-row"><span class="lab" title="' + esc(y.c.brand + ' ' + y.c.model) + '"><a href="?item=' + esc(y.c.id) + '" data-act="open" data-id="' + esc(y.c.id) + '">' + esc(y.c.brand + ' ' + y.c.model) + '</a></span><span class="track">' +
        marks.map(function(m){ return '<span class="tl-mark ' + m[1] + '" style="left:' + pct(m[0]) + '%"></span>'; }).join('') +
        '<span class="tl-bar ' + y.arr.flag + '" style="left:' + pct(y.arr.start) + '%;width:' + Math.max(.6, pct(y.arr.end) - pct(y.arr.start)) + '%" title="' + CG.fmtRange(y.arr.start, y.arr.end) + '"></span></span></div>'; }).join('') + '</div></div>';
    var unk = CG.catItems().filter(function(y){ return !y.arr.start; }); if (unk.length) h += '<p class="caveat">Lead time unknown: ' + unk.map(function(y){ return esc(y.c.brand + ' ' + y.c.model); }).join(', ') + '.</p>';
  }
  var cal = ED.salesCalendar || [];
  if (cal.length) h += '<h3>Sales calendar</h3><div class="tw"><table class="plain"><thead><tr><th>Window</th><th>Dates</th><th>What usually happens</th><th>What to do</th></tr></thead><tbody>' + cal.map(function(c){ return '<tr><td><b>' + esc(c.window) + '</b></td><td class="n">' + esc(c.dates) + '</td><td style="font-size:12px">' + esc(c.typical) + '</td><td style="font-size:12px">' + esc(c.recommendation) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  var sales = Object.keys(CG.RET).map(function(k){ return CG.RET[k]; }).filter(function(r){ return r.currentSale && r.currentSale.summary && x.sectional.concat(x.sofa).some(function(y){ return y.c.retailerId === r.id; }); });
  if (sales.length) h += '<h3>Sales running now</h3><div class="tw"><table class="plain"><thead><tr><th>Store</th><th>Sale</th><th>Ends</th><th>Last Black Friday</th></tr></thead><tbody>' + sales.map(function(r){ var cs = r.currentSale; return '<tr><td><b>' + esc(r.name) + '</b></td><td style="font-size:12px">' + esc(cs.summary) + (cs.verify ? ' <span class="verify">verify</span>' : '') + '</td><td class="n">' + (cs.ends ? CG.fmtD(cs.ends) : '') + '</td><td style="font-size:12px;color:var(--muted)">' + esc(r.blackFridayHistory || '') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  $('timingBody').innerHTML = h;
}

/* ── try in Seattle ── */
var AREA = { 'seattle-north': 'North Seattle (U Village and around)', 'seattle-central': 'Central Seattle', 'seattle-south-west': 'South and West Seattle', eastside: 'Eastside (Bellevue and around)', 'south-king': 'South King County (Tukwila, Renton)', 'north-sound': 'North (Lynnwood and up)', other: 'Elsewhere' };
function renderTry(){
  var x = X(), all = x.sectional.concat(x.sofa), by = {};
  Object.keys(CG.RET).forEach(function(rid){ var r = CG.RET[rid], models = all.filter(function(y){ return y.c.retailerId === rid; }); if (!models.length) return;
    (r.showrooms || []).forEach(function(sr){ (by[sr.area || 'other'] = by[sr.area || 'other'] || []).push({ r: r, sr: sr, models: models }); }); });
  var h = md(B.tryInSeattle);
  var areas = Object.keys(AREA).filter(function(a){ return by[a]; });
  if (!areas.length) h += '<p class="caveat">No showroom data yet.</p>';
  areas.forEach(function(a){
    h += '<h3>' + AREA[a] + '</h3><div class="tw"><table class="plain"><thead><tr><th>Store</th><th>Couches in this guide</th></tr></thead><tbody>' + by[a].map(function(e){
      return '<tr><td><b>' + esc(e.sr.name) + '</b><div class="muted" style="font-size:11.5px">' + esc(e.sr.address || '') + ' <a href="https://www.google.com/maps/search/' + encodeURIComponent(e.sr.address || e.sr.name) + '" target="_blank" rel="noopener">map</a></div></td><td>' +
        e.models.map(function(y){ return '<a href="?item=' + esc(y.c.id) + '" data-act="open" data-id="' + esc(y.c.id) + '">' + esc(y.c.model) + '</a> <span class="tag' + (y.tryOn === 'confirmed' ? ' good' : '') + '">' + esc(y.tryOn === 'confirmed' ? 'on display' : y.tryOn === 'likely' ? 'likely on display' : 'call ahead') + '</span>'; }).join('<br>') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  });
  $('tryBody').innerHTML = h;
}

/* ── care ── */
function renderCare(){
  var h = md(B.fabricCare), ft = ED.fabricTable || [];
  if (ft.length) h += '<div class="tw"><table class="plain"><thead><tr><th>Fabric</th><th>Cleanability</th><th>Snags</th><th>Looks rumpled?</th><th>Note</th></tr></thead><tbody>' + ft.map(function(r){ return '<tr><td><b>' + esc(CG.titleCase(r.family)) + '</b></td><td>' + esc(r.cleanability) + '</td><td>' + esc(r.snag) + '</td><td>' + esc(r.rumple) + '</td><td style="color:var(--muted)">' + esc(r.note || '') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  $('careBody').innerHTML = h;
}

/* ── settings ── */
function renderSetup(){
  var s = X().s, raw = function(k){ return CG.setting(k); };
  function n(path, val, step, unit){ return '<input type="number" data-set="' + path + '" value="' + (val == null ? '' : val) + '" step="' + (step || 1) + '" placeholder="not set">' + (unit ? ' <span class="ns">' + unit + '</span>' : ''); }
  var rooms = s.rooms, bud = s.budgets, w = s.weights;
  var h = '<div class="setgrid">';
  h += '<fieldset><legend>This device</legend><div class="setrow"><span>Who is using this</span><span class="seg">' + ['carla', 'mike', 'both'].map(function(k){ return '<button type="button" data-who-set="' + k + '" aria-pressed="' + (S.who === k) + '">' + (k === 'both' ? 'Both' : CG.titleCase(k)) + '</button>'; }).join('') + '</span></div></fieldset>';
  h += '<fieldset><legend>Comfort target</legend><div class="setrow"><span style="flex-basis:100%">Mike\'s end (medium-firm) to Carla\'s end (very soft)</span><input type="range" min="0" max="1" step="0.05" data-set="comfortBlend" value="' + s.blend + '" aria-label="Comfort target"><b id="tVal">' + CG.targetT(s.blend).toFixed(1) + '</b></div><p class="caveat">The softness score every couch is matched against. 4.0 is plush, leaning Carla.</p></fieldset>';
  h += '<fieldset><legend>Timing</legend><div class="setrow"><span>We plan to order on</span><input type="date" data-set="orderDate" value="' + (raw('orderDate') || '') + '"></div><div class="setrow"><span>Arrival target</span><input type="date" data-set="arrivalTarget" value="' + CG.iso(s.target) + '"></div><div class="setrow"><span>Hard deadline</span><input type="date" data-set="deadline" value="' + CG.iso(s.deadline) + '"></div></fieldset>';
  h += '<fieldset><legend>Main floor room</legend><div class="setrow"><span>Wall width available</span>' + n('rooms.sectional.maxWidthIn', rooms.sectional.maxWidthIn, 1, 'in') + '</div><div class="setrow"><span>Room for the chaise, out from the wall</span>' + n('rooms.sectional.maxChaiseIn', rooms.sectional.maxChaiseIn, 1, 'in') + '</div>' +
    '<div class="setrow"><span>Max depth of main seats</span>' + n('rooms.sectional.maxDepthIn', rooms.sectional.maxDepthIn, .5, 'in') + '</div><div class="setrow"><span>Narrowest door or hall on the way in</span>' + n('rooms.sectional.pathWidthIn', rooms.sectional.pathWidthIn, .5, 'in') + '</div></fieldset>';
  h += '<fieldset><legend>Family room</legend><div class="setrow"><span>Wall width available</span>' + n('rooms.sofa.maxWidthIn', rooms.sofa.maxWidthIn, 1, 'in') + '</div><div class="setrow"><span>Max depth</span>' + n('rooms.sofa.maxDepthIn', rooms.sofa.maxDepthIn, .5, 'in') + '</div><div class="setrow"><span>Narrowest door or stair</span>' + n('rooms.sofa.pathWidthIn', rooms.sofa.pathWidthIn, .5, 'in') + '</div></fieldset>';
  h += '<fieldset><legend>Depth preference</legend><div class="setrow"><span>Max seat depth</span>' + n('maxSeatDepthIn', s.maxSeat, .5, 'in') + '</div><div class="setrow"><span>Max overall depth</span>' + n('maxOverallDepthIn', s.maxDepth, .5, 'in') + '</div><p class="caveat">Drives the "Not too deep" chip.</p></fieldset>';
  h += '<fieldset><legend>Money</legend><div class="setrow"><span>Sales tax rate <span class="verify" title="10.35% is the City of Seattle rate. Check your address with the WA Department of Revenue lookup.">verify</span></span>' + n('taxRatePct', s.tax, .01, '%') + '</div>' +
    '<div class="setrow"><span>Expected sale price of the old couch</span>' + n('oldCouchResaleUsd', s.resale, 25, 'USD') + '</div>' +
    '<div class="setrow"><span>Sectional budget: target</span>' + n('budgets.sectional.targetUsd', bud.sectional.targetUsd, 100) + '</div><div class="setrow"><span>Sectional budget: ceiling</span>' + n('budgets.sectional.ceilingUsd', bud.sectional.ceilingUsd, 100) + '</div>' +
    '<div class="setrow"><span>Sofa budget: target</span>' + n('budgets.sofa.targetUsd', bud.sofa.targetUsd, 50) + '</div><div class="setrow"><span>Sofa budget: ceiling</span>' + n('budgets.sofa.ceilingUsd', bud.sofa.ceilingUsd, 50) + '</div>' +
    '<div class="setrow"><span>0% intro card months</span>' + n('introCardMonths', s.introMonths, 1, 'mo') + '</div></fieldset>';
  ['sectional', 'sofa'].forEach(function(cat){
    var ww = w[cat], tot = Object.keys(ww).reduce(function(a, k){ return a + (+ww[k] || 0); }, 0);
    h += '<fieldset><legend>Priorities: ' + (cat === 'sectional' ? 'sectional' : 'sofa') + ' (total ' + tot + ')</legend>' + Object.keys(ww).map(function(k){ return '<div class="setrow"><span>' + ({ comfort: 'Comfort match', tidy: 'Tidy look', price: 'Price', financing: 'Financing', timing: 'Arrival', depth: 'Depth', care: 'Easy care', tryability: 'Try or return', build: 'Build', style: 'MCM style' })[k] + '</span><input type="range" min="0" max="40" step="1" data-set="weights.' + cat + '.' + k + '" value="' + ww[k] + '"><b style="min-width:22px;text-align:right">' + ww[k] + '</b></div>'; }).join('') +
      '<div class="setrow"><button type="button" class="btn" data-reset-w="' + cat + '">Reset to defaults</button></div></fieldset>';
  });
  h += '<fieldset><legend>Photos</legend><div class="setrow"><label class="fopt"><input type="checkbox" data-set="mirrorLeftPhotos"' + (s.mirror ? ' checked' : '') + '> Mirror left-chaise photos to show the right side</label></div></fieldset>';
  $('setupBody').innerHTML = h + '</div>';
}
var setT = null;
function applySet(el){
  var path = el.getAttribute('data-set').split('.'), top = path[0], v;
  if (el.type === 'checkbox') v = el.checked; else if (el.type === 'date') v = el.value || null; else v = el.value === '' ? null : +el.value;
  if (path.length === 1){ CG.setSetting(top, v); }
  else { var obj = JSON.parse(JSON.stringify(CG.setting(top))), o = obj; for (var i = 1; i < path.length - 1; i++){ o[path[i]] = o[path[i]] || {}; o = o[path[i]]; } o[path[path.length - 1]] = v; CG.setSetting(top, obj); }
  if (top === 'comfortBlend') $('tVal').textContent = CG.targetT(v).toFixed(1);
  if (el.type === 'range' && el.nextElementSibling && top === 'weights') el.nextElementSibling.textContent = v;
  clearTimeout(setT); setT = setTimeout(function(){ CG.refresh(); renderAll({ keepSetup: true }); }, 250);
}
document.addEventListener('input', function(e){ if (e.target.getAttribute && e.target.getAttribute('data-set') && e.target.type === 'range') applySet(e.target); });
document.addEventListener('change', function(e){ if (e.target.getAttribute && e.target.getAttribute('data-set')) applySet(e.target); });
document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-reset-w]'); if (!b) return; var w = JSON.parse(JSON.stringify(CG.setting('weights'))); w[b.getAttribute('data-reset-w')] = JSON.parse(JSON.stringify(CG.DEF_WEIGHTS[b.getAttribute('data-reset-w')])); CG.setSetting('weights', w); CG.refresh(); renderAll(); });

/* ── old couch ── */
function renderOld(){
  var h = md(B.oldCouch), oc = ED.oldCouch || {};
  if (oc.priceRangeUsd) h += '<p><b>Likely sale price:</b> ' + money(oc.priceRangeUsd[0]) + ' to ' + money(oc.priceRangeUsd[1]) + ' <span class="verify">verify</span></p>';
  var x = X(), used = {}; x.sectional.concat(x.sofa).forEach(function(y){ used[y.c.retailerId] = 1; });
  var hauls = Object.keys(used).map(function(id){ return CG.RET[id]; }).filter(function(r){ return r && r.delivery && r.delivery.haulAway && r.delivery.haulAway.offered; });
  if (hauls.length) h += '<p class="caveat">Stores here that mention haul-away of an old couch: ' + hauls.map(function(r){ return esc(r.name); }).join(', ') + '.</p>';
  h += '<p class="caveat">Enter the expected sale price in <a href="#setup">settings</a> to see each sectional\'s cost after the sale.</p>';
  $('oldBody').innerHTML = h;
}

/* ── sources ── */
function renderSources(){
  var D = CG.D, h = md(B.method);
  h += '<p class="caveat">Data generated ' + CG.fmtDY(D.generated) + '. ' + CG.ALL.length + ' couches from ' + Object.keys(CG.RET).length + ' stores. <span class="verify">verify</span> marks a value we could not confirm on the retailer\'s own page. Hover it for the reason.</p>';
  var ex = D.excluded || [];
  if (ex.length) h += '<details style="margin-top:10px"><summary style="cursor:pointer;font-weight:600">Considered and ruled out (' + ex.length + ')</summary><div class="tw"><table class="plain"><thead><tr><th>Couch</th><th>Type</th><th>Why</th><th>Note</th></tr></thead><tbody>' + ex.map(function(e){
    return '<tr><td>' + (CG.safeUrl(e.url) ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.name) + '</a>' : esc(e.name)) + '<div class="muted" style="font-size:11.5px">' + esc((CG.RET[e.retailerId] || {}).name || e.retailerName || e.retailerId || '') + '</div></td><td>' + esc(e.category) + '</td><td>' + esc((e.reason || '').replace(/-/g, ' ')) + '</td><td style="font-size:12px;color:var(--muted)">' + esc(e.note || '') + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
  $('sourcesBody').innerHTML = h;
}

/* ── sync (spec 5.12) ── */
function exportObj(){ var st = {}; Object.keys(S.settingsRaw).forEach(function(k){ st[k] = S.settingsRaw[k]; }); return { type: 'couch-guide-notes', version: 1, exported: CG.nowISO(), from: S.who || 'unknown', notes: S.notes, settings: st }; }
function ratedCount(notes){ return Object.keys(notes || {}).filter(function(id){ var n = notes[id]; return n && ((n.carlaLike && n.carlaLike.v) || (n.mikeLike && n.mikeLike.v)); }).length; }
function renderSync(){
  var le = CG.lsGet(CG.K.lastExport);
  $('syncBody').innerHTML = '<p>Ratings, notes, the shortlist and settings save in this browser. To get Carla\'s phone and Mike\'s laptop on the same page, send a sync link or export a file. Merging keeps the newest edit for each field, so two people rating the same couch never overwrite each other.</p>' +
    '<div class="lib-top" style="margin-top:10px"><button type="button" class="btn primary" id="syncLink">Copy sync link</button><button type="button" class="btn" id="exportBtn">Export notes</button><button type="button" class="btn" id="importBtn">Import notes</button></div>' +
    '<p class="caveat">' + (le ? 'Last export ' + CG.fmtD(le.slice(0, 10)) + ' &middot; ' : '') + ratedCount(S.notes) + ' rated couches on this device. Send the export to Claudette to bake both sets of ratings into the page.</p>';
  $('syncLink').addEventListener('click', makeSyncLink);
  $('exportBtn').addEventListener('click', function(){ var blob = new Blob([JSON.stringify(exportObj(), null, 1)], { type: 'application/json' }), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'couch-notes-' + (S.who || 'device') + '-' + CG.iso(CG.today()) + '.json'; a.click(); CG.lsSet(CG.K.lastExport, CG.nowISO()); renderSync(); });
  $('importBtn').addEventListener('click', function(){ $('importFile').click(); });
}
$('importFile').addEventListener('change', function(){ var f = this.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function(){ try { mergeIn(JSON.parse(rd.result)); } catch(e){ CG.toast('That file could not be read.'); } }; rd.readAsText(f); this.value = ''; });
function mergeIn(o){
  if (!o || o.type !== 'couch-guide-notes'){ CG.toast('Not a couch notes file.'); return; }
  S.notes = CG.mergeNotes(S.notes, o.notes || {}); CG.jset(CG.K.notes, S.notes);
  S.settingsRaw = CG.mergeSettings(S.settingsRaw, o.settings || {}); CG.jset(CG.K.settings, S.settingsRaw);
  CG.refresh(); renderAll(); CG.toast('Merged ' + CG.plural(ratedCount(o.notes), 'rated couch') + ' from ' + (o.from === 'carla' ? 'Carla' : o.from === 'mike' ? 'Mike' : 'the other device'));
}
function b64u(bytes){ var s = ''; bytes.forEach(function(b){ s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function unb64u(s){ s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; var bin = atob(s), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
function makeSyncLink(){
  var json = JSON.stringify(exportObj()), enc = new TextEncoder().encode(json);
  var finish = function(tag, bytes){ var u = new URL(location.origin + location.pathname); u.searchParams.set('sync', tag + b64u(bytes)); CG.copyText(u.toString()); CG.lsSet(CG.K.lastExport, CG.nowISO()); };
  if (window.CompressionStream){ new Response(new Blob([enc]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer().then(function(b){ finish('z.', new Uint8Array(b)); }, function(){ finish('j.', enc); }); }
  else finish('j.', enc);
}
function readSync(param){
  var tag = param.slice(0, 2), bytes = unb64u(param.slice(2));
  var done = function(text){ try { var o = JSON.parse(text); showSyncBanner(o); } catch(e){ CG.toast('That sync link could not be read.'); } };
  if (tag === 'z.' && window.DecompressionStream) new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text().then(done, function(){ CG.toast('That sync link could not be read.'); });
  else done(new TextDecoder().decode(bytes));
}
function showSyncBanner(o){
  var who = o.from === 'carla' ? "Carla's" : o.from === 'mike' ? "Mike's" : 'the other device\'s', when = o.exported ? new Date(o.exported) : null;
  $('bannerSlot').insertAdjacentHTML('afterbegin', '<div class="banner" id="syncBanner">Merge ' + who + ' ratings' + (when ? ' from ' + CG.fmtD(when) + ', ' + when.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '') + ' (' + CG.plural(ratedCount(o.notes), 'couch') + ')?' +
    '<button type="button" class="btn primary" id="syncMerge">Merge</button><button type="button" class="btn" id="syncDismiss">Dismiss</button></div>');
  $('syncMerge').addEventListener('click', function(){ mergeIn(o); $('syncBanner').remove(); });
  $('syncDismiss').addEventListener('click', function(){ $('syncBanner').remove(); });
}

/* ── render all ── */
function renderAll(opts){
  opts = opts || {};
  CG.refresh();
  [].forEach.call(document.querySelectorAll('[data-cat]'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-cat') === CG.cat()); });
  renderOverview(); renderPicks(); CG.renderLibrary(); renderShortlist(); renderMoney(); renderTiming(); renderTry(); renderOld(); renderNav(); CG.renderTray();
  if (!opts.keepSetup) renderSetup();
  CG.renderDetailIfOpen();
}
CG.renderAll = renderAll;

/* ── routing ── */
function route(){
  var u = new URL(location.href), it = u.searchParams.get('item'), cmp = u.searchParams.get('compare');
  if (it && CG.BYID[it]) CG.openDetail(it, false); else CG.closeDetail(true);
  if (cmp){ var ids = cmp.split(',').filter(function(id){ return CG.BYID[id]; }); if (ids.length){ var c0 = CG.BYID[ids[0]].category; if (c0 !== CG.cat()) setCat(c0, false); S.ui.compare[c0] = ids.filter(function(id){ return CG.BYID[id].category === c0; }).slice(0, 4); CG.saveUI(); CG.renderTray(); CG.openCompare(S.ui.compare[c0], false); } }
  else CG.closeCompare(true);
}
window.addEventListener('popstate', route);

/* ── boot ── */
(function boot(){
  var u = new URL(location.href);
  var qc = u.searchParams.get('cat'); if (qc === 'sofa' || qc === 'sectional') S.ui.cat = qc;
  renderWho(); renderBrief(); renderCare(); renderSources(); renderSync(); renderAll();
  var sy = u.searchParams.get('sync'); if (sy){ readSync(sy); u.searchParams.delete('sync'); history.replaceState({}, '', u); }
  route();
  setTimeout(function(){ S.ui.lastVisit = CG.nowISO(); CG.saveUI(); }, 10000);
  if (location.hash){ var el = document.querySelector(location.hash); if (el) setTimeout(function(){ el.scrollIntoView(); }, 50); }
})();
})();
