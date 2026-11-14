/* Couch Guide UI: browse (filters, chips, sort, grid/table/map), detail drawer, compare. */
(function(){
'use strict';
var CG = window.CG, esc = CG.esc, $ = CG.$, num = CG.num, get = CG.get, money = CG.money, inch = CG.inch, S = CG.S;
var X = null;
function cat(){ return S.ui.cat === 'sofa' ? 'sofa' : 'sectional'; }
function catItems(){ return (X || CG.cache())[cat()]; }
function catWord(n){ return cat() === 'sofa' ? (n === 1 ? 'sofa' : 'sofas') : (n === 1 ? 'sectional' : 'sectionals'); }
function refresh(){ X = CG.computeAll(); }

/* ── small renderers ── */
var COUCH_SVG = '<svg viewBox="0 0 64 40" aria-hidden="true"><path d="M8 10a6 6 0 0 1 6-6h36a6 6 0 0 1 6 6v6h2a4 4 0 0 1 4 4v12a2 2 0 0 1-2 2h-4v4h-4v-4H12v4H8v-4H4a2 2 0 0 1-2-2V20a4 4 0 0 1 4-4h2z"/></svg>';
function imgSrc(im){ return im ? (im.src ? CG.BASE + im.src : CG.safeUrl(im.url)) : ''; }
function imgTag(x, im, extra){
  if (!im || !imgSrc(im)) return '<div class="noimg-ph">' + COUCH_SVG + '<span>Image unavailable</span></div>';
  var mir = x && x.mirror && im.chaiseSideShown === 'left';
  return '<img loading="lazy" referrerpolicy="no-referrer" src="' + esc(imgSrc(im)) + '" data-orig="' + esc(CG.safeUrl(im.url)) + '" alt="' + esc((x ? x.c.brand + ' ' + x.c.model : '') + (im.kind ? ' (' + im.kind + ')' : '')) + '"' +
    (mir ? ' class="mirror"' : '') + (extra || '') + ' onerror="CG.imgErr(this)">';
}
CG.imgErr = function(el){
  var o = el.getAttribute('data-orig');
  if (o && el.src !== o && !el.dataset.tried){ el.dataset.tried = '1'; el.src = o; return; }
  var ph = document.createElement('div'); ph.className = 'noimg-ph'; ph.innerHTML = COUCH_SVG + '<span>Image unavailable</span>';
  el.replaceWith(ph);
};
function pips(v, lowConf){
  if (v == null) return '<span class="muted">?</span>';
  var h = '<span class="pips' + (lowConf ? ' lowc' : '') + '" title="' + v + ' of 5' + (lowConf ? ', low confidence' : '') + '">';
  for (var i = 1; i <= 5; i++) h += '<i class="' + (v >= i ? 'on' : v >= i - .5 ? 'half' : '') + '"></i>';
  return h + '<b>' + v + '</b></span>';
}
var STAR_LBL = ['', 'No', 'Not really', 'Maybe', 'Like it', 'Love it'];
function stars(id, who, big){
  var f = who === 'carla' ? 'carlaLike' : 'mikeLike', v = CG.note(id, f);
  var canEdit = big || S.who === who || S.who === 'both' || !S.who;
  var h = '<span class="stars ' + who + (big ? ' big' : '') + '" role="group" aria-label="' + (who === 'carla' ? 'Carla' : 'Mike') + ' rating">' +
    '<span class="who">' + (who === 'carla' ? 'C' : 'M') + '</span>';
  for (var i = 1; i <= 5; i++) h += '<button type="button" class="' + (v >= i ? 'on' : '') + '" data-act="star" data-id="' + esc(id) + '" data-who="' + who + '" data-v="' + i + '"' +
    (canEdit ? '' : ' disabled') + ' title="' + STAR_LBL[i] + '" aria-label="' + STAR_LBL[i] + '" aria-pressed="' + (v === i) + '">&#9733;</button>';
  return h + (big ? '<span class="lv">' + (v ? STAR_LBL[v] : 'Not rated') + '</span>' : '') + '</span>';
}
function agreeBadge(x){ return '<span class="agree ' + x.agree + '">' + CG.AGREE_LABEL[x.agree] + (x.agree === 'vetoed' ? ' by ' + (x.cl === 1 && x.ml === 1 ? 'both' : x.cl === 1 ? 'Carla' : 'Mike') : '') + '</span>'; }
function verifyTag(c, path){ if (!CG.isUnverified(c, path)) return ''; var n = (c.fieldNotes || {})[path] || 'Not confirmed on the retailer page. Check before ordering.'; return '<span class="verify" title="' + esc(n) + '">verify</span>'; }
function swatches(c, max){
  var cols = (c.colors || []).filter(function(k){ return k.hex; }), h = '<span class="sws">';
  cols.slice(0, max).forEach(function(k){ h += '<span class="sw" style="background:' + esc(k.hex) + '" title="' + esc(k.name + (k.performance ? ' (performance)' : '')) + '"></span>'; });
  var total = Math.max(c.colorCountTotal || 0, (c.colors || []).length);
  if (total > Math.min(max, cols.length)) h += '<span class="more">+' + (total - Math.min(max, cols.length)) + '</span>';
  return h + '</span>';
}
function monthlyLine(x, short){
  var b = x.best;
  if (!b) return '<div class="mo muted">No financing listed</div>';
  var o = b.offer, n = b.n, m = b.monthly;
  if (b.type === 'zero-apr') return '<div class="mo" title="' + esc(o.provider) + '"><b>' + money(m) + '/mo</b> for ' + n + ' mo at 0%' + (o.zeroForAll === false ? ' <span class="tag">0% if approved</span>' : ' <span class="tag good">True 0%</span>') + '</div>';
  if (b.type === 'deferred-interest') return '<div class="mo def" title="' + esc(o.provider) + '"><b>' + money(b.safe) + '/mo</b> to clear ' + n + ' mo <span class="tag warn">Deferred interest</span></div>';
  if (b.type === 'fixed-apr') return '<div class="mo"><b>' + money(m) + '/mo</b> for ' + n + ' mo at ' + o.aprPct + '%</div>';
  return '<div class="mo"><b>' + money(m) + (b.rangeHi ? '-' + money(b.rangeHi).slice(1) : '') + '/mo</b> for ' + n + ' mo <span class="tag">Rate by credit</span></div>';
}
function arrivalLine(x){
  var a = x.arr; if (a.flag === 'unknown') return '<span class="tag">Lead time unknown</span>';
  var ordered = CG.setting('orderDate') ? ' if ordered ' + CG.fmtD(X.s.order) : '';
  return 'Arrives ' + CG.fmtRange(a.start, a.end) + (a.est ? ' (est.)' : '') + ordered + ' <span class="tag ' + CG.ARRIVE_CLS[a.flag] + '">' + CG.ARRIVE_LABEL[a.flag] + '</span>';
}
function configShort(c){
  if (c.category === 'sofa') return (c.seats || 3) + '-seat sofa';
  var side = { right: 'right chaise', reversible: 'reversible chaise', any: 'modular, any side' }[c.chaiseSide] || '';
  return (c.pieces ? c.pieces + '-piece' : '') + (side ? ', ' + side : '');
}
function flagsFor(x){
  var c = x.c, f = [];
  if (c.returnable === 'final-sale') f.push('<span class="tag bad">Final sale</span>');
  if (get(c, 'fabric.washableCovers') === 'machine') f.push('<span class="tag good">Washable covers</span>');
  if (x.performance) f.push('<span class="tag good">Performance fabric</span>');
  if (x.tryOn === 'confirmed' || x.tryOn === 'likely') f.push('<span class="tag">' + (x.tryOn === 'confirmed' ? 'On display in Seattle' : 'Likely on display') + '</span>');
  if (c.returnable === 'free') f.push('<span class="tag good">Free returns</span>');
  if (get(c, 'dims.boxed')) f.push('<span class="tag">Boxed delivery</span>');
  if (get(c, 'materials.flameRetardants') === 'none-added') f.push('<span class="tag">No added flame retardants</span>');
  return f.slice(0, 3).join('');
}
function awardFor(id){
  var ps = ((CG.ED.picks || {})[cat()] || []).filter(function(p){ return p.id === id; });
  return ps.map(function(p){ return AWARD[p.award] || p.award; });
}
var AWARD = { 'top-pick': 'Top pick', 'tidy-plush': 'Best tidy-plush', 'best-value': 'Best value', 'best-financing': 'Best financing', fastest: 'Fastest delivery',
  'try-in-seattle': 'Try it in Seattle', splurge: 'Worth the splurge', budget: 'Budget pick', 'most-washable': 'Most washable' };
CG.AWARD = AWARD;
var BM_SVG = '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';

/* ── card (spec 5.5) ── */
function cardHTML(x){
  var c = x.c, im = (c.images || [])[0], aw = awardFor(c.id), inCmp = (S.ui.compare[cat()] || []).indexOf(c.id) >= 0;
  var h = '<article class="cc' + (inCmp ? ' incompare' : '') + (x.agree === 'vetoed' ? ' vetoed' : '') + '" data-id="' + esc(c.id) + '">';
  h += '<button type="button" class="imgw" data-act="open" data-id="' + esc(c.id) + '" aria-label="Open ' + esc(c.brand + ' ' + c.model) + '">' + imgTag(x, im) +
    '<span class="badge-tl">' + aw.map(function(a){ return '<span class="award">' + esc(a) + '</span>'; }).join('') + '</span>' +
    '<span class="badge-bl">' + (x.isNew ? '<span class="ovl">New</span>' : '') +
    (x.priceDelta ? '<span class="ovl ' + (x.priceDelta < 0 ? 'good' : 'bad') + '">' + (x.priceDelta < 0 ? 'Down ' : 'Up ') + money(Math.abs(x.priceDelta)) + '</span>' : '') +
    (x.mirror ? '<span class="ovl">Mirrored to show right chaise</span>' : (x.leftPhoto ? '<span class="ovl">Photo shows left chaise</span>' : '')) +
    (c.availability && c.availability !== 'available' ? '<span class="ovl bad">' + esc(c.availability.replace(/-/g, ' ')) + '</span>' : '') + '</span></button>';
  h += '<button type="button" class="bm' + (x.shortlist ? ' on' : '') + '" data-act="bm" data-id="' + esc(c.id) + '" aria-pressed="' + x.shortlist + '" aria-label="Shortlist" title="Shortlist">' + BM_SVG + '</button>';
  h += '<div class="body">';
  h += '<div class="nm-row"><div><button type="button" class="nm" data-act="open" data-id="' + esc(c.id) + '">' + esc(c.brand) + ' ' + esc(c.model) + '</button>' +
    '<div class="ret">' + esc(x.r.name || c.retailerId) + ' &middot; ' + esc(configShort(c)) + '</div></div>' +
    (x.fit != null ? '<span class="fit' + (x.fit >= 70 ? ' hi' : '') + '" title="Fit for us, 0-100' + (x.fitConf < .8 ? ', partial data' : '') + '">Fit ' + x.fit + '</span>' : '') + '</div>';
  h += '<div class="price-row"><span class="price">' + money(x.price) + '</span>' +
    (x.sale != null && x.list && x.sale < x.list ? '<span class="was">' + money(x.list) + '</span><span class="off">-' + x.discountPct + '%</span>' : '') +
    (x.saleEnds && x.saleDaysLeft >= 0 ? '<span class="ends">' + (x.saleDaysLeft === 0 ? 'ends today' : 'ends ' + CG.fmtD(x.saleEnds)) + '</span>' : '') +
    (x.unverPrice ? verifyTag(c, 'price') : '') + (x.stale && x.checkedAt ? '<span class="stale">as of ' + CG.fmtD(x.checkedAt) + '</span>' : '') + '</div>';
  h += monthlyLine(x);
  var d = c.dims || {};
  h += '<div class="line num">' + inch(d.overallWidthIn) + ' W &middot; ' + inch(d.overallDepthIn) + ' D &middot; seat ' + inch(d.seatDepthIn) +
    (c.category === 'sectional' && d.chaiseDepthIn ? ' &middot; chaise ' + inch(d.chaiseDepthIn) : '') + (x.depthClass ? ' <span class="tag">' + x.depthClass + '</span>' : '') + (x.unverDims ? verifyTag(c, 'dims') : '') + '</div>';
  var cm = c.comfort || {};
  h += '<div class="line"><span class="pl">Soft</span>' + pips(x.soft, cm.softnessConfidence === 'low') + ' <span class="pl" style="margin-left:6px">Tidy</span>' + pips(x.tidy, cm.tidyConfidence === 'low') + (x.felt != null ? ' <span class="tag carla" title="Softness you felt in person">felt ' + x.felt + '</span>' : '') + '</div>';
  h += '<div class="line">' + arrivalLine(x) + '</div>';
  h += '<div class="line">' + swatches(c, 8) + '</div>';
  var fl = flagsFor(x); if (fl) h += '<div class="flags">' + fl + '</div>';
  h += '<div class="ours"><div class="ours-row">' + stars(c.id, 'carla') + stars(c.id, 'mike') + '</div><div class="ours-row">' + agreeBadge(x) +
    '<label class="cmpchk"><input type="checkbox" data-act="cmp" data-id="' + esc(c.id) + '"' + (inCmp ? ' checked' : '') + '> Compare</label></div></div>';
  return h + '</div></article>';
}
CG.cardHTML = cardHTML; CG.imgTag = imgTag; CG.pips = pips; CG.stars = stars; CG.agreeBadge = agreeBadge; CG.monthlyLine = monthlyLine; CG.arrivalLine = arrivalLine; CG.swatches = swatches; CG.configShort = configShort;

/* ── filters (spec 5.3) ── */
var FILL = { 'hd-foam': 'foam', 'memory-foam-blend': 'foam', 'foam-fiber-wrap': 'foam-fiber', 'foam-down-wrap': 'foam-down', 'down-feather': 'down', 'spring-core': 'spring', 'fiber-fill': 'fiber', unknown: 'unknown' };
var FILL_LBL = { foam: 'Foam', 'foam-fiber': 'Foam and fiber', 'foam-down': 'Foam and down', down: 'Down and feather', spring: 'Spring core', fiber: 'Fiber fill', unknown: 'Unknown' };
var FIN_LBL = { 'zero-apr': 'True 0%', 'deferred-interest': 'Deferred interest', 'fixed-apr': 'Fixed low APR', 'variable-by-credit': 'Rate by credit', lease: 'Lease to own', none: 'No financing' };
var CG_HEX = { green: '#4f6b3a', blue: '#3c5b8a', teal: '#2f7270', gray: '#9a9a96', 'charcoal-black': '#333438', 'white-ivory': '#f1ede2', 'beige-oatmeal': '#d6c7ad',
  'brown-camel': '#9a6b44', 'rust-orange': '#b5562a', 'pink-blush': '#e2b4b4', 'red-burgundy': '#7b2733', 'yellow-mustard': '#c99a2e', 'purple-plum': '#5e3a5c',
  'pattern-multi': 'conic-gradient(#b5562a 0 25%,#4f6b3a 0 50%,#3c5b8a 0 75%,#d6c7ad 0)' };
function titleCase(s){ return String(s || '').replace(/-/g, ' ').replace(/^\w/, function(m){ return m.toUpperCase(); }); }
var FILTERS = [
  { id: 'price', label: 'Price', type: 'range', get: function(x){ return x.price; }, step: 50, fmt: money },
  { id: 'monthly', label: 'Max monthly payment', type: 'max', get: function(x){ return x.bestMonthly; }, step: 10, fmt: money, dropNull: true },
  { id: 'fin', label: 'Financing type', type: 'multi', vals: function(x){ var t = {}; x.offers.forEach(function(r){ t[r.type] = 1; }); var k = Object.keys(t); return k.length ? k : ['none']; }, lbl: FIN_LBL },
  { id: 'zterm', label: 'Minimum 0% term', type: 'select', opts: [['', 'Any'], [6, '6 months'], [12, '12 months'], [18, '18 months'], [24, '24 months'], [36, '36 months'], [48, '48 months'], [60, '60 months']], test: function(x, v){ return x.zeroTerm >= +v; } },
  { id: 'side', label: 'Chaise side', type: 'multi', only: 'sectional', vals: function(x){ return [x.c.chaiseSide]; }, lbl: { right: 'Right', reversible: 'Reversible', any: 'Modular' } },
  { id: 'config', label: 'Configuration', type: 'multi', only: 'sectional', vals: function(x){ return [x.c.configuration]; }, lbl: { 'chaise-sectional': 'Chaise sectional', 'corner-sectional': 'Corner (L)', 'u-shape': 'U-shape', modular: 'Modular' } },
  { id: 'width', label: 'Overall width (in)', type: 'range', get: function(x){ return x.width; }, step: 1 },
  { id: 'depth', label: 'Overall depth, max (in)', type: 'max', get: function(x){ return x.depth; }, step: .5 },
  { id: 'seatd', label: 'Seat depth, max (in)', type: 'max', get: function(x){ return x.seatD; }, step: .5 },
  { id: 'seath', label: 'Seat height (in)', type: 'range', get: function(x){ return x.seatH; }, step: .5 },
  { id: 'chaised', label: 'Chaise depth (in)', type: 'range', only: 'sectional', get: function(x){ return x.chaiseD; }, step: 1 },
  { id: 'soft', label: 'Softness', type: 'range', get: function(x){ return x.softUsed; }, step: .5, fixed: [1, 5] },
  { id: 'tidy', label: 'Tidy look, min', type: 'min', get: function(x){ return x.tidy; }, step: .5, fixed: [1, 5] },
  { id: 'cush', label: 'Seat cushions', type: 'multi', vals: function(x){ return [get(x.c, 'comfort.seatCushions') || 'unknown']; }, lbl: { loose: 'Loose', bench: 'Bench', attached: 'Attached', unknown: 'Unknown' } },
  { id: 'fill', label: 'Seat fill', type: 'multi', vals: function(x){ return [FILL[get(x.c, 'comfort.seatFill')] || 'unknown']; }, lbl: FILL_LBL },
  { id: 'family', label: 'Fabric family', type: 'multi', vals: function(x){ var t = {}; (x.c.colors || []).forEach(function(k){ if (k.family) t[k.family] = 1; }); return Object.keys(t); }, lbl: null },
  { id: 'color', label: 'Color', type: 'colors', vals: function(x){ var t = {}; (x.c.colors || []).forEach(function(k){ if (k.colorGroup) t[k.colorGroup] = 1; }); return Object.keys(t); } },
  { id: 'care', label: 'Care (each one narrows)', type: 'care', opts: [
      ['perf', 'Performance fabric', function(x){ return x.performance; }],
      ['remov', 'Removable covers', function(x){ return ['all', 'cushions', 'seat-cushions'].indexOf(get(x.c, 'fabric.removableCovers')) >= 0; }],
      ['wash', 'Machine-washable covers', function(x){ return get(x.c, 'fabric.washableCovers') === 'machine'; }],
      ['codew', 'Cleaning code W or WS', function(x){ return ['W', 'WS'].indexOf(get(x.c, 'fabric.cleaningCode')) >= 0; }],
      ['repl', 'Replacement covers sold', function(x){ return !!get(x.c, 'fabric.replacementCoversSold'); }],
      ['nofr', 'No added flame retardants', function(x){ return get(x.c, 'materials.flameRetardants') === 'none-added'; }] ] },
  { id: 'mcm', label: 'MCM fit, min', type: 'min', get: function(x){ return get(x.c, 'style.mcmFit'); }, step: 1, fixed: [1, 5] },
  { id: 'legs', label: 'Legs', type: 'multi', vals: function(x){ return [get(x.c, 'style.legStyle') || 'other']; }, lbl: null },
  { id: 'arrive', label: 'Arrival', type: 'radio', opts: [['', 'Any'], ['early', 'Before target date'], ['deadline', 'Before hard deadline']],
    test: function(x, v){ return v === 'early' ? x.arr.flag === 'early' : (x.arr.flag === 'early' || x.arr.flag === 'tight'); } },
  { id: 'instock', label: 'In stock only', type: 'toggle', test: function(x){ return get(x.c, 'lead.inStock') === true; } },
  { id: 'lead', label: 'Lead time, max (weeks)', type: 'max', get: function(x){ return x.arr.weeksMax; }, step: 1 },
  { id: 'deliv', label: 'Delivery', type: 'multi', vals: function(x){ return [get(x.c, 'dims.boxed') ? 'boxed' : ((x.c.deliveryOverride || x.r.delivery || {}).method || 'unknown')]; },
    lbl: { 'white-glove': 'White glove', 'room-of-choice': 'Room of choice', threshold: 'Threshold', curbside: 'Curbside', parcel: 'Parcel', boxed: 'Boxed to the door', unknown: 'Unknown' } },
  { id: 'ret', label: 'Returns', type: 'radio', opts: [['', 'Any'], ['returnable', 'Returnable'], ['free', 'Free returns only']],
    test: function(x, v){ return v === 'free' ? x.c.returnable === 'free' : (x.c.returnable === 'free' || x.c.returnable === 'with-fees'); } },
  { id: 'retwin', label: 'Return window, min', type: 'select', opts: [['', 'Any'], [14, '14 days'], [30, '30 days'], [60, '60 days'], [100, '100 days'], [365, '365 days']],
    test: function(x, v){ var w = ((x.c.returnsOverride || x.r.returns) || {}).windowDays; return w != null && w >= +v && x.c.returnable !== 'final-sale'; } },
  { id: 'tryon', label: 'Try in Seattle', type: 'multi', vals: function(x){ return [x.tryOn]; }, lbl: { confirmed: 'Confirmed on display', likely: 'Likely on display', no: 'Not on display', unknown: 'Unknown' } },
  { id: 'retailer', label: 'Retailer', type: 'multi', vals: function(x){ return [x.c.retailerId]; }, lbl: function(v){ return (CG.RET[v] || {}).name || v; } },
  { id: 'warr', label: 'Frame warranty, min', type: 'select', opts: [['', 'Any'], [1, '1 year'], [5, '5 years'], [10, '10 years'], ['lifetime', 'Lifetime']],
    test: function(x, v){ var fy = get(x.c, 'warranty.frameYears'); if (fy === 'lifetime') return true; if (v === 'lifetime') return false; return fy != null && fy >= +v; } },
  { id: 'agree', label: 'Our ratings', type: 'multi', vals: function(x){ return [x.agree]; }, lbl: CG.AGREE_LABEL },
  { id: 'cmin', label: 'Carla, min stars', type: 'select', opts: [['', 'Any'], [2, '2+'], [3, '3+'], [4, '4+'], [5, '5']], test: function(x, v){ return x.cl >= +v; } },
  { id: 'mmin', label: 'Mike, min stars', type: 'select', opts: [['', 'Any'], [2, '2+'], [3, '3+'], [4, '4+'], [5, '5']], test: function(x, v){ return x.ml >= +v; } },
  { id: 'hideveto', label: 'Hide vetoed', type: 'toggle', test: function(x){ return x.agree !== 'vetoed'; } },
  { id: 'unavail', label: 'Include unavailable', type: 'toggle', invert: true },
  { id: 'hideunver', label: 'Hide unconfirmed price or size', type: 'toggle', test: function(x){ return !x.unverPrice && !x.unverDims; } }
];
var CHIPS = [
  { id: 'sweet', label: 'Tidy-plush', test: function(x){ return x.sweet; } },
  { id: 'early', label: 'Arrives before target', test: function(x){ return x.arr.flag === 'early'; } },
  { id: 'zero', label: 'True 0%', test: function(x){ return x.zeroTerm > 0; } },
  { id: 'notdeep', label: 'Not too deep', test: function(x){ return x.notTooDeep; } },
  { id: 'wash', label: 'Washable covers', test: function(x){ return x.washable; } },
  { id: 'perf', label: 'Performance fabric', test: function(x){ return x.performance; } },
  { id: 'tryon', label: 'Try in Seattle', test: function(x){ return x.tryOn === 'confirmed' || x.tryOn === 'likely'; } },
  { id: 'budget', label: 'Under budget', show: function(){ var b = (X.s.budgets || {})[cat()] || {}; return b.targetUsd != null || cat() === 'sofa'; },
    test: function(x){ var b = (X.s.budgets || {})[cat()] || {}; var lim = b.targetUsd != null ? b.targetUsd : 1000; return x.allIn != null && x.allIn <= lim; } },
  { id: 'fits', label: 'Fits our room', show: function(){ return catItems().some(function(x){ return x.roomSet; }); }, test: function(x){ return x.fitsRoom; } },
  { id: 'short', label: 'Shortlist', test: function(x){ return x.shortlist; } },
  { id: 'talk', label: 'Talk about these', test: function(x){ return ['split', 'needs-carla', 'needs-mike'].indexOf(x.agree) >= 0; } }
];
function fstate(){ return S.ui.filters[cat()] = S.ui.filters[cat()] || {}; }
function chipsOn(){ return S.ui.chips[cat()] = S.ui.chips[cat()] || []; }
function filterActive(f, v){
  if (v == null || v === '' || v === false) return false;
  if (Array.isArray(v)) return f.type === 'range' ? true : v.length > 0;
  return true;
}
function passOne(x, f, v){
  if (f.only && f.only !== x.c.category) return true;
  switch (f.type){
    case 'range': var g = f.get(x); return g == null ? false : g >= v[0] && g <= v[1];
    case 'max': var m = f.get(x); return m == null ? !f.dropNull && false : m <= v;
    case 'min': var n = f.get(x); return n != null && n >= v;
    case 'multi': case 'colors': var vs = f.vals(x); return vs.some(function(z){ return v.indexOf(z) >= 0; });
    case 'care': return v.every(function(k){ var o = f.opts.filter(function(p){ return p[0] === k; })[0]; return !o || o[2](x); });
    case 'select': case 'radio': return f.test(x, v);
    case 'toggle': return f.invert ? true : f.test(x);
  }
  return true;
}
function searchHit(x, q){
  if (!q) return true; var c = x.c;
  var hay = [c.brand, c.model, c.productName, x.r.name, (c.style || {}).look, ((c.style || {}).tags || []).join(' '), (c.colors || []).map(function(k){ return k.name + ' ' + k.colorGroup + ' ' + k.family; }).join(' ')].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).every(function(t){ return hay.indexOf(t) >= 0; });
}
function applyAll(xs, skip){
  var st = fstate(), chips = chipsOn(), q = ($('q') || {}).value || '';
  return xs.filter(function(x){
    if (!st.unavail && ['out-of-stock', 'discontinued'].indexOf(x.c.availability) >= 0) return false;
    if (!searchHit(x, q)) return false;
    for (var i = 0; i < chips.length; i++){ var ch = CHIPS.filter(function(z){ return z.id === chips[i]; })[0]; if (ch && (!ch.show || ch.show()) && !ch.test(x)) return false; }
    for (var j = 0; j < FILTERS.length; j++){ var f = FILTERS[j]; if (f.id === skip || f.id === 'unavail') continue; var v = st[f.id]; if (filterActive(f, v) && !passOne(x, f, v)) return false; }
    return true;
  });
}
function bounds(f){
  if (f.fixed) return f.fixed;
  var vs = catItems().map(f.get).filter(function(v){ return v != null; });
  if (!vs.length) return [0, 0];
  var lo = Math.min.apply(null, vs), hi = Math.max.apply(null, vs), st = f.step || 1;
  return [Math.floor(lo / st) * st, Math.ceil(hi / st) * st];
}
function renderFilters(){
  var st = fstate(), h = '';
  FILTERS.forEach(function(f){
    if (f.only && f.only !== cat()) return;
    var v = st[f.id], act = filterActive(f, v);
    h += '<div class="fgroup" data-f="' + f.id + '"><div class="fh"><span>' + esc(f.label) + '</span>' + (act ? '<button type="button" class="linkbtn" data-act="fclear" data-f="' + f.id + '">Reset</button>' : '') + '</div>';
    if (f.type === 'multi' || f.type === 'colors'){
      var base = applyAll(catItems(), f.id), counts = {}, all = {};
      catItems().forEach(function(x){ f.vals(x).forEach(function(z){ all[z] = 1; }); });
      base.forEach(function(x){ f.vals(x).forEach(function(z){ counts[z] = (counts[z] || 0) + 1; }); });
      var keys = Object.keys(all);
      if (f.lbl && typeof f.lbl === 'object') keys.sort(function(a, b){ var o = Object.keys(f.lbl); return (o.indexOf(a) < 0 ? 99 : o.indexOf(a)) - (o.indexOf(b) < 0 ? 99 : o.indexOf(b)); });
      else keys.sort(function(a, b){ return lbl(f, a).localeCompare(lbl(f, b)); });
      var sel = Array.isArray(v) ? v : [];
      if (f.type === 'colors'){
        h += '<div class="sw-toggles">' + keys.map(function(k){ return '<button type="button" data-act="fcolor" data-f="color" data-v="' + k + '" aria-pressed="' + (sel.indexOf(k) >= 0) + '"' + (counts[k] ? '' : ' class="zero"') +
          ' style="background:' + (CG_HEX[k] || '#ccc') + '" title="' + titleCase(k) + ' (' + (counts[k] || 0) + ')" aria-label="' + titleCase(k) + '"></button>'; }).join('') + '</div>';
      } else {
        keys.forEach(function(k){ h += '<label class="fopt' + (counts[k] ? '' : ' zero') + '"><input type="checkbox" data-act="fmulti" data-f="' + f.id + '" value="' + esc(k) + '"' + (sel.indexOf(k) >= 0 ? ' checked' : '') + '> ' + esc(lbl(f, k)) + '<em>' + (counts[k] || 0) + '</em></label>'; });
      }
    } else if (f.type === 'range'){
      var b = bounds(f), cur = Array.isArray(v) ? v : b;
      h += '<div class="frange"><input type="number" data-act="frange" data-f="' + f.id + '" data-i="0" step="' + f.step + '" value="' + cur[0] + '" aria-label="' + esc(f.label) + ' minimum"> to <input type="number" data-act="frange" data-f="' + f.id + '" data-i="1" step="' + f.step + '" value="' + cur[1] + '" aria-label="' + esc(f.label) + ' maximum"></div>';
    } else if (f.type === 'max' || f.type === 'min'){
      var bb = bounds(f), val = v != null ? v : (f.type === 'max' ? bb[1] : bb[0]);
      h += '<div class="fslider"><input type="range" data-act="fslide" data-f="' + f.id + '" min="' + bb[0] + '" max="' + bb[1] + '" step="' + f.step + '" value="' + val + '" aria-label="' + esc(f.label) + '"><output>' + (v != null ? (f.fmt ? f.fmt(v) : v) : 'off') + '</output></div>';
    } else if (f.type === 'select'){
      h += '<select class="sel" data-act="fselect" data-f="' + f.id + '" aria-label="' + esc(f.label) + '">' + f.opts.map(function(o){ return '<option value="' + o[0] + '"' + (String(v || '') === String(o[0]) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>';
    } else if (f.type === 'radio'){
      h += f.opts.map(function(o){ return '<label class="fopt"><input type="radio" name="r-' + f.id + '" data-act="fradio" data-f="' + f.id + '" value="' + o[0] + '"' + (String(v || '') === String(o[0]) ? ' checked' : '') + '> ' + o[1] + '</label>'; }).join('');
    } else if (f.type === 'care'){
      var sv = Array.isArray(v) ? v : [];
      h += f.opts.map(function(o){ var n = applyAll(catItems(), 'care').filter(o[2]).length; return '<label class="fopt' + (n ? '' : ' zero') + '"><input type="checkbox" data-act="fcare" data-f="care" value="' + o[0] + '"' + (sv.indexOf(o[0]) >= 0 ? ' checked' : '') + '> ' + o[1] + '<em>' + n + '</em></label>'; }).join('');
    } else if (f.type === 'toggle'){
      h += '<label class="fopt"><input type="checkbox" data-act="ftoggle" data-f="' + f.id + '"' + (v ? ' checked' : '') + '> ' + (v ? 'On' : 'Off') + '</label>';
    }
    h += '</div>';
  });
  $('filterBody').innerHTML = h;
}
function lbl(f, k){ if (typeof f.lbl === 'function') return f.lbl(k); if (f.lbl && f.lbl[k]) return f.lbl[k]; return titleCase(k); }
function activeFilterPills(){
  var st = fstate(), out = [];
  FILTERS.forEach(function(f){
    if (f.only && f.only !== cat()) return; var v = st[f.id]; if (!filterActive(f, v)) return;
    var t;
    if (f.type === 'range') t = f.label + ': ' + (f.fmt ? f.fmt(v[0]) : v[0]) + ' to ' + (f.fmt ? f.fmt(v[1]) : v[1]);
    else if (f.type === 'max') t = f.label.replace(', max', '') + ' up to ' + (f.fmt ? f.fmt(v) : v);
    else if (f.type === 'min') t = f.label.replace(', min', '') + ' ' + v + '+';
    else if (f.type === 'multi' || f.type === 'colors') t = f.label + ': ' + v.map(function(k){ return lbl(f, k); }).join(', ');
    else if (f.type === 'care') t = v.map(function(k){ return (f.opts.filter(function(o){ return o[0] === k; })[0] || [])[1]; }).join(', ');
    else if (f.type === 'select' || f.type === 'radio') t = f.label + ': ' + ((f.opts.filter(function(o){ return String(o[0]) === String(v); })[0] || [])[1] || v);
    else t = f.label;
    out.push('<span class="tag">' + esc(t) + '<button type="button" data-act="fclear" data-f="' + f.id + '" aria-label="Remove filter">&times;</button></span>');
  });
  $('activef').innerHTML = out.join('');
  var n = out.length + chipsOn().length; $('filtersBtn').textContent = 'Filters' + (n ? ' (' + n + ')' : '');
  $('clearAll').disabled = !n && !(($('q') || {}).value);
}
function renderChips(){
  var on = chipsOn(), base = catItems();
  $('chips').innerHTML = CHIPS.filter(function(ch){ return !ch.show || ch.show(); }).map(function(ch){
    var n = applyAll(base).filter(ch.test).length;
    if (on.indexOf(ch.id) >= 0) n = applyAll(base).length;
    return '<button type="button" class="chip" data-act="chip" data-chip="' + ch.id + '" aria-pressed="' + (on.indexOf(ch.id) >= 0) + '">' + esc(ch.label) + ' <em>' + n + '</em></button>';
  }).join('');
}

/* ── sort (spec 5.4) ── */
var SORTS = [
  ['fit', 'Best fit for us', function(x){ return x.fit; }, -1],
  ['ours', 'Our ratings', function(x){ return x.agree === 'vetoed' ? -1 : x.combined == null ? null : x.combined - (x.cl && x.ml ? 0 : .01); }, -1],
  ['carla', "Carla's rating", function(x){ return x.cl; }, -1],
  ['mike', "Mike's rating", function(x){ return x.ml; }, -1],
  ['gap', 'Most disagreement', function(x){ return x.gap; }, -1],
  ['plo', 'Price: low to high', function(x){ return x.price; }, 1],
  ['phi', 'Price: high to low', function(x){ return x.price; }, -1],
  ['mo', 'Lowest monthly payment', function(x){ return x.bestMonthly; }, 1],
  ['disc', 'Biggest discount', function(x){ return x.discountPct; }, -1],
  ['ends', 'Sale ending soonest', function(x){ return x.saleDaysLeft != null && x.saleDaysLeft >= 0 ? x.saleDaysLeft : null; }, 1],
  ['soft', 'Softest first', function(x){ return x.softUsed; }, -1],
  ['tidy', 'Tidiest first', function(x){ return x.tidy; }, -1],
  ['tp', 'Tidy-plush', function(x){ return x.tidyPlush; }, -1],
  ['shallow', 'Shallowest seat', function(x){ return x.seatD; }, 1],
  ['soon', 'Arrives soonest', function(x){ return x.arr.end ? x.arr.end.getTime() : null; }, 1],
  ['zterm', 'Longest 0% term', function(x){ return x.zeroTerm || null; }, -1],
  ['rev', 'Best reviewed', function(x){ return x.reviewScore; }, -1],
  ['new', 'Recently added', function(x){ return x.c.addedDate ? Date.parse(x.c.addedDate) : null; }, -1]
];
function sortXs(xs, key){
  var s = SORTS.filter(function(z){ return z[0] === key; })[0] || SORTS[0];
  var unav = function(x){ return ['out-of-stock', 'discontinued'].indexOf(x.c.availability) >= 0 ? 1 : 0; };
  return xs.slice().sort(function(a, b){
    var u = unav(a) - unav(b); if (u) return u;
    var va = s[2](a), vb = s[2](b);
    if (va == null && vb != null) return 1; if (vb == null && va != null) return -1;
    if (va != null && vb != null && va !== vb) return (va - vb) * s[3];
    return (b.fit || 0) - (a.fit || 0);
  });
}
CG.SORTS = SORTS; CG.sortXs = sortXs;

/* ── results ── */
function renderResults(){
  var xs = sortXs(applyAll(catItems()), S.ui.sort[cat()]), total = catItems().length, view = S.ui.view;
  $('rowcount').innerHTML = 'Showing <b>' + xs.length + '</b> of ' + total + ' ' + catWord(total);
  $('libNote').textContent = cat() === 'sectional' ? 'Every sectional here can have its chaise on the right.' : 'Every sofa here is a single-piece three-seater with no leather.';
  [].forEach.call(document.querySelectorAll('[data-view]'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-view') === view); });
  if (!total){ $('results').innerHTML = '<div class="empty">Research is still coming in. Options will appear here as soon as they are added.</div>'; return; }
  if (!xs.length){ $('results').innerHTML = '<div class="empty">Nothing matches every filter. <button type="button" class="linkbtn" data-act="clearall">Clear all filters</button></div>'; return; }
  if (view === 'table') $('results').innerHTML = tableHTML(xs);
  else if (view === 'map') $('results').innerHTML = mapHTML(xs);
  else $('results').innerHTML = '<div class="grid">' + xs.map(cardHTML).join('') + '</div>';
  markSeen(xs);
}
var seenTimer = null;
function markSeen(xs){
  clearTimeout(seenTimer);
  seenTimer = setTimeout(function(){ xs.forEach(function(x){ if (x.price != null) S.ui.seenPrice[x.c.id] = x.price; }); CG.saveUI(); }, 4000);
}
function tableHTML(xs){
  var cols = [
    ['img', '', function(x){ return '<img src="' + esc(imgSrc((x.c.images || [])[0])) + '" alt="" loading="lazy" referrerpolicy="no-referrer"' + (x.mirror ? ' class="mirror"' : '') + ' onerror="this.style.visibility=\'hidden\'">'; }],
    ['name', 'Couch', null],
    ['fit', 'Fit', function(x){ return x.fit; }, 'fit'],
    ['price', 'Price', function(x){ return money(x.price); }, 'plo'],
    ['allin', 'All-in', function(x){ return money(x.allIn); }],
    ['mo', 'Monthly', function(x){ return x.bestMonthly ? money(x.best.type === 'deferred-interest' ? x.best.safe : x.bestMonthly) : ''; }, 'mo'],
    ['offer', 'Best offer', function(x){ return x.best ? (FIN_LBL[x.best.type] + ' ' + (x.best.n || '') + 'mo') : ''; }],
    ['w', 'W', function(x){ return inch(x.width); }],
    ['d', 'D', function(x){ return inch(x.depth); }],
    ['sd', 'Seat D', function(x){ return inch(x.seatD); }, 'shallow'],
    ['sh', 'Seat H', function(x){ return inch(x.seatH); }],
    ['cd', 'Chaise D', function(x){ return x.c.category === 'sectional' ? inch(x.chaiseD) : ''; }],
    ['soft', 'Soft', function(x){ return x.softUsed; }, 'soft'],
    ['tidy', 'Tidy', function(x){ return x.tidy; }, 'tidy'],
    ['cush', 'Seat cushions', function(x){ return get(x.c, 'comfort.seatCushions') || ''; }],
    ['fill', 'Fill', function(x){ return FILL_LBL[FILL[get(x.c, 'comfort.seatFill')]] || ''; }],
    ['perf', 'Perf.', function(x){ return x.performance ? 'Yes' : ''; }],
    ['covers', 'Covers', function(x){ return (get(x.c, 'fabric.removableCovers') || '') + (get(x.c, 'fabric.washableCovers') === 'machine' ? ', washable' : ''); }],
    ['ncol', 'Colors', function(x){ return x.c.colorCountTotal || (x.c.colors || []).length; }],
    ['lead', 'Lead wks', function(x){ var l = x.c.lead || {}; return l.weeksMax != null ? (l.weeksMin != null && l.weeksMin !== l.weeksMax ? l.weeksMin + '-' : '') + l.weeksMax : ''; }],
    ['arr', 'Arrival', function(x){ return x.arr.flag === 'unknown' ? '' : CG.ARRIVE_LABEL[x.arr.flag]; }, 'soon'],
    ['retn', 'Returns', function(x){ return x.c.returnable || ''; }],
    ['risk', 'Return cost', function(x){ return x.rr.final ? 'Final sale' : x.rr.usd != null ? money(x.rr.usd) : ''; }],
    ['warr', 'Frame warranty', function(x){ var f = get(x.c, 'warranty.frameYears'); return f === 'lifetime' ? 'Lifetime' : f ? f + ' yr' : ''; }],
    ['disp', 'On display', function(x){ return x.tryOn === 'unknown' ? '' : x.tryOn; }],
    ['c', 'Carla', function(x){ return x.cl ? '&#9733;' + x.cl : ''; }, 'carla'],
    ['m', 'Mike', function(x){ return x.ml ? '&#9733;' + x.ml : ''; }, 'mike'],
    ['ag', 'Agreement', function(x){ return agreeBadge(x); }, 'ours'],
    ['sl', 'Shortlist', function(x){ return '<button type="button" class="bm' + (x.shortlist ? ' on' : '') + '" style="position:static;width:28px;height:28px" data-act="bm" data-id="' + esc(x.c.id) + '" aria-label="Shortlist">' + BM_SVG + '</button>'; }]
  ];
  var cur = S.ui.sort[cat()];
  var h = '<div class="tscroll"><table class="dt"><thead><tr>' + cols.map(function(c){ return '<th' + (c[0] === 'name' ? ' class="nmcol"' : '') + (c[3] ? ' data-act="tsort" data-sort="' + c[3] + '"' + (cur === c[3] ? ' class="sorted"' : '') : '') + '>' + c[1] + (cur === c[3] ? ' &#9662;' : '') + '</th>'; }).join('') + '</tr></thead><tbody>';
  xs.forEach(function(x){
    h += '<tr>' + cols.map(function(c){
      if (c[0] === 'name') return '<td class="nmcol"><button type="button" class="nm" style="font-size:13px" data-act="open" data-id="' + esc(x.c.id) + '">' + esc(x.c.brand + ' ' + x.c.model) + '</button><div class="ret">' + esc(x.r.name || '') + '</div></td>';
      var v = c[2](x); return '<td class="num">' + (v == null ? '' : v) + '</td>';
    }).join('') + '</tr>';
  });
  return h + '</tbody></table></div>';
}
function hashJ(s){ var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return ((h % 1000) / 1000) * .24 - .12; }
var MAP_COL = { 'both-love': '#2f6b3f', 'both-like': '#5c9a6a', split: '#c8841e', lukewarm: '#9aa1b0', vetoed: '#b3261e', 'needs-carla': '#a8466a', 'needs-mike': '#2b4c7e', unrated: '#7a8090' };
function mapHTML(xs){
  var W = 760, H = 460, L = 56, R = 20, Tp = 20, B = 46;
  function px(v){ return L + (v - 1) / 4 * (W - L - R); } function py(v){ return H - B - (v - 1) / 4 * (H - Tp - B); }
  var h = '<svg class="cmap" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Comfort map: softness across, tidy look up">';
  h += '<rect class="sweet" x="' + px(3.5) + '" y="' + py(5) + '" width="' + (px(5) - px(3.5)) + '" height="' + (py(3.5) - py(5)) + '" rx="6"></rect>';
  h += '<text x="' + (px(5) - 8) + '" y="' + (py(5) + 16) + '" text-anchor="end" style="fill:var(--green);font-weight:600">Tidy-plush sweet spot</text>';
  for (var i = 1; i <= 5; i++){ h += '<line class="ax" x1="' + px(i) + '" y1="' + py(1) + '" x2="' + px(i) + '" y2="' + py(5) + '" opacity=".5"></line><line class="ax" x1="' + px(1) + '" y1="' + py(i) + '" x2="' + px(5) + '" y2="' + py(i) + '" opacity=".5"></line>' +
    '<text x="' + px(i) + '" y="' + (H - B + 18) + '" text-anchor="middle">' + i + '</text><text x="' + (L - 10) + '" y="' + (py(i) + 4) + '" text-anchor="end">' + i + '</text>'; }
  h += '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">Softness (1 firm, 5 cloud)</text>';
  h += '<text transform="translate(14 ' + ((Tp + H - B) / 2) + ') rotate(-90)" text-anchor="middle">Tidy look (1 slouchy, 5 crisp)</text>';
  var T = X.T; h += '<line class="tline" x1="' + px(T) + '" y1="' + py(1) + '" x2="' + px(T) + '" y2="' + py(5) + '"></line><text x="' + (px(T) + 5) + '" y="' + (py(1) - 6) + '" style="fill:var(--carla)">Our target ' + T.toFixed(1) + '</text>';
  xs.forEach(function(x){
    if (x.softUsed == null || x.tidy == null) return;
    var low = get(x.c, 'comfort.softnessConfidence') === 'low' || get(x.c, 'comfort.tidyConfidence') === 'low';
    var cx = px(Math.min(5, Math.max(1, x.softUsed + hashJ(x.c.id)))), cy = py(Math.min(5, Math.max(1, x.tidy + hashJ(x.c.id + 'y'))));
    h += '<circle data-act="open" data-id="' + esc(x.c.id) + '" data-tip="' + esc(x.c.id) + '" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="8" fill="' + MAP_COL[x.agree] + '"' + (low ? ' class="hollow" stroke="' + MAP_COL[x.agree] + '"' : '') + '><title>' + esc(x.c.brand + ' ' + x.c.model + ', ' + money(x.price)) + '</title></circle>';
  });
  h += '</svg><div class="legend">' + Object.keys(MAP_COL).map(function(k){ return '<span><i style="background:' + MAP_COL[k] + '"></i>' + CG.AGREE_LABEL[k] + '</span>'; }).join('') + '<span><i style="background:transparent;box-shadow:inset 0 0 0 2px var(--faint)"></i>Low confidence score</span></div>';
  h += '<p class="caveat" style="text-align:center">Dots use the softness you felt in person when you have logged it. The dashed line is your comfort target from settings.</p>';
  return h;
}
document.addEventListener('mouseover', function(e){
  var t = e.target.closest && e.target.closest('circle[data-tip]'), tip = $('cmapTip');
  if (!t){ tip.hidden = true; return; }
  var x = X.byId[t.getAttribute('data-tip')]; if (!x) return;
  tip.innerHTML = imgTag(x, (x.c.images || [])[0]) + '<b>' + esc(x.c.brand + ' ' + x.c.model) + '</b><br>' + money(x.price) + ' &middot; soft ' + x.softUsed + ', tidy ' + x.tidy;
  tip.hidden = false; tip.style.left = Math.min(window.innerWidth - 230, e.clientX + 14) + 'px'; tip.style.top = Math.min(window.innerHeight - 220, e.clientY + 14) + 'px';
});

function renderLibrary(){ renderChips(); renderFilters(); activeFilterPills(); renderResults(); renderSortSel();
  $('targetRead').textContent = 'Comfort target ' + X.T.toFixed(1) + ', ' + (X.s.blend >= .55 ? 'leaning Carla' : X.s.blend <= .45 ? 'leaning Mike' : 'right between'); }
function renderSortSel(){ var cur = S.ui.sort[cat()]; $('sortSel').innerHTML = SORTS.map(function(s){ return '<option value="' + s[0] + '"' + (s[0] === cur ? ' selected' : '') + '>Sort: ' + s[1] + '</option>'; }).join(''); }
CG.renderLibrary = renderLibrary; CG.renderResults = renderResults;

/* ── library events ── */
var reT = null;
function rerender(){ refresh(); CG.renderAll(); }
function rerenderLib(){ clearTimeout(reT); reT = setTimeout(function(){ renderChips(); renderFilters(); activeFilterPills(); renderResults(); CG.saveUI(); }, 60); }
document.addEventListener('input', function(e){
  var t = e.target, a = t.getAttribute && t.getAttribute('data-act'), st = fstate();
  if (t.id === 'q'){ rerenderLib(); return; }
  if (a === 'fslide'){ var f = FILTERS.filter(function(z){ return z.id === t.getAttribute('data-f'); })[0]; st[f.id] = +t.value; t.nextElementSibling.textContent = f.fmt ? f.fmt(+t.value) : t.value;
    clearTimeout(reT); reT = setTimeout(function(){ renderChips(); activeFilterPills(); renderResults(); CG.saveUI(); }, 120); }
});
document.addEventListener('change', function(e){
  var t = e.target, a = t.getAttribute && t.getAttribute('data-act'), st = fstate(), fid = t.getAttribute && t.getAttribute('data-f');
  if (!a) return;
  if (a === 'fmulti' || a === 'fcare'){ var arr = Array.isArray(st[fid]) ? st[fid] : []; var i = arr.indexOf(t.value); if (t.checked && i < 0) arr.push(t.value); if (!t.checked && i >= 0) arr.splice(i, 1); st[fid] = arr; rerenderLib(); }
  else if (a === 'frange'){ var f = FILTERS.filter(function(z){ return z.id === fid; })[0], b = bounds(f), cur = Array.isArray(st[fid]) ? st[fid].slice() : b.slice(); cur[+t.getAttribute('data-i')] = num(t.value) == null ? b[+t.getAttribute('data-i')] : +t.value;
    st[fid] = (cur[0] <= b[0] && cur[1] >= b[1]) ? null : cur; rerenderLib(); }
  else if (a === 'fselect' || a === 'fradio'){ st[fid] = t.value || null; rerenderLib(); }
  else if (a === 'ftoggle'){ st[fid] = t.checked || null; rerenderLib(); }
  else if (a === 'fslide'){ rerenderLib(); }
  else if (a === 'cmp'){ toggleCompare(t.getAttribute('data-id'), t.checked); }
});
$('sortSel').addEventListener('change', function(){ S.ui.sort[cat()] = this.value; CG.saveUI(); renderResults(); });

/* ── detail drawer (spec 5.6) ── */
var detailId = null, detailFabric = null, detailImg = 0, lastFocus = null;
function openDetail(id, push){
  var x = X.byId[id]; if (!x) return;
  if (x.c.category !== cat()){ S.ui.cat = x.c.category; CG.saveUI(); CG.renderAll(); }
  lastFocus = document.activeElement; detailId = id; detailFabric = null; detailImg = 0;
  renderDetail();
  $('drawer').hidden = false; $('drawerScrim').hidden = false; document.body.style.overflow = 'hidden';
  if (push !== false){ var u = new URL(location.href); u.searchParams.set('item', id); history.pushState({ item: id }, '', u); }
  setTimeout(function(){ var b = $('drawer').querySelector('.xbtn'); if (b) b.focus(); }, 30);
}
function closeDetail(fromPop){
  if ($('drawer').hidden) return;
  $('drawer').hidden = true; $('drawerScrim').hidden = true; document.body.style.overflow = ''; detailId = null;
  if (!fromPop){ var u = new URL(location.href); if (u.searchParams.has('item')){ if (history.state && history.state.item) history.back(); else { u.searchParams.delete('item'); history.replaceState({}, '', u); } } }
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
CG.openDetail = openDetail; CG.closeDetail = closeDetail;
function kv(rows){ return '<dl class="kv">' + rows.filter(function(r){ return r && r[1] != null && r[1] !== ''; }).map(function(r){ return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('') + '</dl>'; }
function list(a){ return a && a.length ? '<ul class="bullets">' + a.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : ''; }
var CODE_GLOSS = { W: 'W: water-based cleaners are fine. Easiest with spills.', S: 'S: solvent cleaners only. Water can leave rings, which is hard with messes.', WS: 'WS: water or solvent cleaners. Flexible.', X: 'X: vacuum only, no liquid cleaners.', unknown: 'Unknown cleaning code.' };
function renderDetail(){
  var x = X.byId[detailId]; if (!x) return; var c = x.c, r = x.r, s = X.s;
  var fab = detailFabric || get(c, 'price.priceFabric');
  var price = CG.effectivePrice(c, fab), deliv = CG.deliveryUsd(c, price), tax = price == null ? null : Math.round((price + (deliv || 0)) * s.tax / 100);
  var allIn = price == null ? null : price + (deliv || 0) + tax, offers = CG.offerRows(c, allIn, s.order), arr = CG.arrival(c, s, fab);
  var imgs = (c.images || []).slice();
  var col = (c.colors || []).filter(function(k){ return k.name === fab; })[0];
  if (col && col.imageUrl && detailFabric) imgs.unshift({ url: col.imageUrl, kind: 'hero', chaiseSideShown: 'unclear', caption: col.name });
  var im = imgs[Math.min(detailImg, imgs.length - 1)];
  var h = '<div class="dhead"><div><div class="t" id="dTitle">' + esc(c.brand + ' ' + c.model) + '</div><div class="s">' + esc(c.productName || '') + '</div><div class="s">' + esc(r.name || '') + ' &middot; ' + esc(configShort(c)) +
    (x.fit != null ? ' &middot; <b>Fit ' + x.fit + '</b> <button type="button" class="linkbtn" data-act="whyfit">Why this score</button>' : '') + '</div></div>' +
    '<div class="acts">' + (CG.safeUrl(c.productUrl) ? '<a class="btn primary" href="' + esc(c.productUrl) + '" target="_blank" rel="noopener">View at ' + esc(r.name || 'retailer') + '</a>' : '') +
    '<button type="button" class="btn" data-act="bm" data-id="' + esc(c.id) + '">' + (x.shortlist ? 'Shortlisted' : 'Shortlist') + '</button>' +
    '<button type="button" class="btn" data-act="cmpbtn" data-id="' + esc(c.id) + '">' + ((S.ui.compare[cat()] || []).indexOf(c.id) >= 0 ? 'In compare' : 'Compare') + '</button>' +
    '<button type="button" class="btn" data-act="copylink" data-id="' + esc(c.id) + '">Copy link</button>' +
    '<button type="button" class="xbtn" data-act="close" aria-label="Close">&times;</button></div></div><div class="dbody">';
  h += '<div class="dsec" id="whyFit" hidden><h4>Why this score</h4>' + fitBreakdown(x) + '</div>';
  /* 1 gallery */
  h += '<div class="dsec gal"><button type="button" class="main" data-act="lb" data-i="' + Math.min(detailImg, imgs.length - 1) + '" aria-label="View full size">' + imgTag(x, im) + '</button>';
  if (x.leftPhoto) h += '<p class="caveat">' + (x.mirror ? 'Photos of the left-chaise version are mirrored to show the right side. <button type="button" class="linkbtn" data-act="mirror">Show original</button>' : 'This photo shows the left-chaise version. <button type="button" class="linkbtn" data-act="mirror">Mirror it</button>') + '</p>';
  if (imgs.length > 1) h += '<div class="thumbs">' + imgs.map(function(m, i){ return '<button type="button" class="' + (i === detailImg ? 'on' : '') + '" data-act="dimg" data-i="' + i + '">' + imgTag(x, m) + (m.kind && m.kind !== 'hero' ? '<span>' + esc(m.kind.replace('config-diagram', 'diagram')) + '</span>' : '') + '</button>'; }).join('') + '</div>';
  h += '</div>';
  /* 2 colors */
  var cols = c.colors || [];
  if (cols.length){
    var want = CG.note(c.id, 'swatches') || [];
    h += '<div class="dsec"><h4>Colors and fabrics</h4><div class="colors">' + cols.map(function(k){
      return '<div class="col' + (k.name === fab ? ' on' : '') + '" data-act="fabric" data-name="' + esc(k.name) + '" role="button" tabindex="0"><span class="sw" style="background:' + esc(k.hex || '#ccc') + '"></span><span><span class="cn">' + esc(k.name) + '</span><br><span class="cm">' + esc(titleCase(k.family || '')) +
        (k.performance ? ', performance' : '') + (k.priceUsd != null && k.priceUsd !== x.price ? ', ' + money(k.priceUsd) : '') + (k.leadWeeks ? ', ' + k.leadWeeks.join('-') + ' wks' : '') + (k.note ? '. ' + esc(k.note) : '') + '</span>' +
        '<label><input type="checkbox" data-act="swatch" data-id="' + esc(c.id) + '" data-name="' + esc(k.name) + '"' + (want.indexOf(k.name) >= 0 ? ' checked' : '') + '> Want a swatch</label></span></div>';
    }).join('') + '</div>';
    var tot = Math.max(c.colorCountTotal || 0, cols.length);
    h += '<p class="caveat">' + tot + ' options' + (tot > cols.length ? ', ' + cols.length + ' shown' : '') + (CG.safeUrl(c.colorsUrl) ? '. <a href="' + esc(c.colorsUrl) + '" target="_blank" rel="noopener">See every fabric</a>' : '') + '. Picking a fabric updates the money and timing below.</p></div>';
  }
  /* 3 our take */
  var tried = CG.note(c.id, 'tried') || {};
  h += '<div class="dsec"><h4>Our take</h4><div style="display:flex;flex-direction:column;gap:4px">' + stars(c.id, 'carla', true) + stars(c.id, 'mike', true) + '</div><div style="margin:6px 0">' + agreeBadge(x) + '</div>' +
    '<div class="felt"><span>Tried it:</span><input type="date" data-act="tried" data-k="date" data-id="' + esc(c.id) + '" value="' + esc(tried.date || '') + '" aria-label="Date tried">' +
    '<input type="text" data-act="tried" data-k="where" data-id="' + esc(c.id) + '" value="' + esc(tried.where || '') + '" placeholder="Where" aria-label="Where you tried it" style="width:130px"></div>' +
    '<div class="felt"><span>Felt softness:</span>' + feltSel(c.id, 'carlaFelt', 'Carla') + feltSel(c.id, 'mikeFelt', 'Mike') + '</div>' +
    '<p class="caveat">Felt softness replaces the researched score when we work out comfort match.</p>' +
    '<textarea class="notes" data-act="notes" data-id="' + esc(c.id) + '" placeholder="Notes for each other">' + esc(CG.note(c.id, 'notes') || '') + '</textarea><span class="saved" id="savedFlash">Saved</span></div>';
  /* 4 why it fits */
  h += '<div class="dsec"><h4>Why it fits</h4>' + (c.fitForUs ? '<p style="font-size:13px;line-height:1.55;margin-bottom:8px">' + esc(c.fitForUs) + '</p>' : '') +
    '<div class="two"><div><b style="font-size:12px">Pros</b>' + list(c.pros) + '</div><div><b style="font-size:12px">Cons</b>' + list(c.cons) + '</div></div>' +
    ((c.watchOuts || []).length ? '<div class="flags" style="margin-top:8px">' + c.watchOuts.map(function(w){ return '<span class="tag warn">' + esc(w) + '</span>'; }).join('') + '</div>' : '') +
    (c.curatorNote ? '<p style="margin-top:10px;font-size:13px"><b>Claudette\'s take:</b> ' + esc(c.curatorNote) + '</p>' : '') + '</div>';
  /* 5 money */
  var p = c.price || {};
  h += '<div class="dsec"><h4>Money</h4>' + kv([
    ['List price', money(p.listUsd) + verifyTag(c, 'price.listUsd')],
    ['Today', price != null ? '<b>' + money(price) + '</b>' + (p.saleName ? ' (' + esc(p.saleName) + ')' : '') + (p.saleEnds ? ', ends ' + CG.fmtD(p.saleEnds) : '') + (p.promoCode ? ', code ' + esc(p.promoCode) : '') : null],
    ['Fabric priced', esc(fab || '')],
    ['Price range', p.minUsd != null && p.maxUsd != null && p.minUsd !== p.maxUsd ? money(p.minUsd) + ' to ' + money(p.maxUsd) + ' across fabrics' : null],
    ['Black Friday outlook', p.bfOutlook ? esc({ 'at-bf-price': 'Already at Black Friday pricing', 'expect-deeper': 'Expect a deeper discount', 'rarely-discounted': 'Rarely discounted', unknown: 'Unknown' }[p.bfOutlook] || p.bfOutlook) + (p.bfOutlookNote ? '. ' + esc(p.bfOutlookNote) : '') : null],
    ['Member price', p.memberPriceUsd ? money(p.memberPriceUsd) + (p.memberProgram ? ' (' + esc(p.memberProgram) + ')' : '') : null],
    ['Other discounts', p.extraDiscountNote ? esc(p.extraDiscountNote) : null],
    ['Delivery', deliv == null ? 'Not known, check at checkout' : money(deliv)],
    ['Sales tax (' + s.tax + '%)', money(tax)],
    ['All-in', '<b>' + money(allIn) + '</b>'],
    c.category === 'sectional' && s.resale != null && allIn != null ? ['After selling the old couch', money(allIn - s.resale)] : null,
    ['Price checked', x.checkedAt ? CG.fmtDY(x.checkedAt) + (x.stale ? ' <span class="tag warn">Prices move fast this time of year; check before ordering</span>' : '') : null]
  ]);
  h += offersTable(offers, allIn, c);
  var rr = x.rr; h += '<p class="caveat">' + (rr.final ? '<b>Final sale.</b> No returns on this configuration.' : rr.usd != null ? 'If you return it: about <b>' + money(rr.usd) + '</b> in fees.' : 'Return cost unknown. Check the policy below.') + '</p></div>';
  /* 6 size */
  var d = c.dims || {};
  h += '<div class="dsec"><h4>Size and fit</h4>' + kv([
    ['Overall width', inch(d.overallWidthIn) + verifyTag(c, 'dims.overallWidthIn')], ['Overall depth', inch(d.overallDepthIn) + verifyTag(c, 'dims.overallDepthIn')],
    ['Height', inch(d.overallHeightIn)], ['Seat depth', inch(d.seatDepthIn) + (d.seatDepthBasis && d.seatDepthBasis !== 'unstated' ? ' (' + d.seatDepthBasis.replace(/-/g, ' ') + ')' : '') + (x.depthClass ? ' <span class="tag">' + x.depthClass + '</span>' : '') + verifyTag(c, 'dims.seatDepthIn')],
    ['Seat height', inch(d.seatHeightIn) + (x.easyUp ? ' <span class="tag good">Easy to get up from</span>' : '')], ['Arm height', d.armHeightIn != null ? inch(d.armHeightIn) : null],
    c.category === 'sectional' ? ['Chaise depth', inch(d.chaiseDepthIn) + verifyTag(c, 'dims.chaiseDepthIn')] : ['Inside width', d.insideWidthIn != null ? inch(d.insideWidthIn) : null],
    ['Back thickness', d.overallDepthIn != null && d.seatDepthIn != null ? inch(d.overallDepthIn - d.seatDepthIn) : null],
    ['Clearance under', d.underClearanceIn != null ? inch(d.underClearanceIn) : null],
    ['Pieces', c.pieces], ['Boxed', d.boxed ? 'Yes, ' + (d.boxDims || []).length + ' box' + ((d.boxDims || []).length === 1 ? '' : 'es') : d.boxed === false ? 'No' : null],
    ['Weight', d.weightLb ? d.weightLb + ' lb' : null]
  ]);
  var rs = x.roomSet;
  h += '<p class="caveat">' + (rs ? 'Room checks: wall ' + x.fitsWall + (c.category === 'sectional' ? ', chaise ' + x.fitsChaise : '') + ', depth ' + x.fitsDepth + ', doorway ' + x.fitsPath + '.' : 'Set your room size in <a href="#setup" data-act="close">settings</a> to check the fit.') + '</p>';
  h += '<p class="caveat"><b>Tape it out:</b> ' + (c.category === 'sectional' ? 'tape ' + inch(d.overallWidthIn) + ' along the wall, then ' + inch(d.chaiseDepthIn) + ' out from the wall at the right end. The main seats come ' + inch(d.overallDepthIn) + ' out.' : 'tape out ' + inch(d.overallWidthIn) + ' by ' + inch(d.overallDepthIn) + '.') + '</p>';
  if (c.configNote) h += '<p class="caveat">' + esc(c.configNote) + '</p>';
  if ((c.otherConfigs || []).length) h += '<p class="caveat">Other sizes: ' + c.otherConfigs.map(function(o){ return esc(o.label) + (o.overallWidthIn ? ' (' + inch(o.overallWidthIn) + ' W' + (o.priceUsd ? ', ' + money(o.priceUsd) : '') + ')' : ''); }).join('; ') + '</p>';
  h += '</div>';
  /* 7 comfort */
  var cm = c.comfort || {};
  h += '<div class="dsec"><h4>Comfort</h4>' + kv([
    ['Softness', pips(cm.softness, cm.softnessConfidence === 'low') + ' ' + esc(SOFT_LBL[Math.round(cm.softness || 0)] || '') + ' <span class="muted">(' + esc(cm.softnessConfidence || '?') + ' confidence)</span>'],
    ['Why', esc(cm.softnessEvidence || '')],
    ['Tidy look', pips(cm.tidy, cm.tidyConfidence === 'low') + ' ' + esc(TIDY_LBL[Math.round(cm.tidy || 0)] || '') + ' <span class="muted">(' + esc(cm.tidyConfidence || '?') + ' confidence)</span>'],
    ['Why', esc(cm.tidyEvidence || '')],
    ['Seat cushions', esc(cm.seatCushions || '') + (cm.seatCushionCount ? ', ' + cm.seatCushionCount : '') + (cm.edgeStyle && cm.edgeStyle !== 'unknown' ? ', ' + cm.edgeStyle.replace(/-/g, ' ') + ' edge' : '') + (cm.cushionsReversible ? ', reversible' : '')],
    ['Back cushions', esc((cm.backCushions || '').replace(/-/g, ' ')) + (cm.backBaffled ? ', baffled' : '')],
    ['Fill', esc((cm.seatFill || '').replace(/-/g, ' ')) + ' seat, ' + esc((cm.backFill || '').replace(/-/g, ' ')) + ' back' + (cm.foamDensityLbFt3 ? ', ' + cm.foamDensityLbFt3 + ' lb foam' : '')],
    ['How it ages', esc(cm.aging || '')],
    ['Reviewers say', esc((get(c, 'reviews.firmness') || '').replace(/-/g, ' '))]
  ]) + '</div>';
  /* 8 fabric */
  var f = c.fabric || {}, mt = c.materials || {};
  h += '<div class="dsec"><h4>Fabric and care</h4>' + kv([
    ['Fabric', esc(f.composition || '') + (f.performanceBrand && f.performanceBrand !== 'none' && f.performanceBrand !== 'unknown' ? ', ' + esc(f.performanceBrand.replace(/-/g, ' ')) : '')],
    ['Cleaning code', esc(CODE_GLOSS[f.cleaningCode] || '')],
    ['Covers', esc((f.removableCovers || 'unknown').replace(/-/g, ' ')) + ' removable, ' + esc((f.washableCovers || 'unknown').replace(/-/g, ' '))],
    ['Replacement covers', f.replacementCoversSold === true ? 'Sold' : f.replacementCoversSold === false ? 'Not sold' : null],
    ['Durability', f.doubleRubs ? f.doubleRubs.toLocaleString() + ' double rubs' : f.martindale ? f.martindale.toLocaleString() + ' Martindale' : null],
    ['Snag risk', f.snagRisk], ['Stain warranty', f.stainWarranty ? esc(f.stainWarranty) : null],
    ['Flame retardants', mt.flameRetardants ? esc(mt.flameRetardants.replace(/-/g, ' ')) : null],
    ['PFAS free', mt.pfasFree === true ? 'Yes' : mt.pfasFree === false ? 'No' : null],
    ['Certifications', (mt.certifications || []).length ? esc(mt.certifications.join(', ')) : null], ['Care note', f.careNote ? esc(f.careNote) : null]
  ]) + '</div>';
  /* 9 build */
  var b = c.build || {}, w = c.warranty || {};
  h += '<div class="dsec"><h4>Build and warranty</h4>' + kv([
    ['Frame', esc((b.frame || 'unknown').replace(/-/g, ' '))], ['Suspension', esc((b.suspension || 'unknown').replace(/-/g, ' '))], ['Joinery', b.joinery ? esc(b.joinery) : null],
    ['Pieces lock together', b.piecesLock === true ? 'Yes' : b.piecesLock === false ? 'No' : null], ['Made in', b.madeIn ? esc(b.madeIn) : null],
    ['Assembly', esc((b.assembly || '').replace(/-/g, ' ')) + (b.assemblyNote ? '. ' + esc(b.assemblyNote) : '')],
    ['Frame warranty', w.frameYears === 'lifetime' ? 'Lifetime' : w.frameYears ? w.frameYears + ' years' : null],
    ['Cushion warranty', w.cushionYears ? w.cushionYears + ' years' : null], ['Fabric warranty', w.fabricYears ? w.fabricYears + ' years' : null],
    ['Protection plan', w.protectionPlan ? esc(w.protectionPlan) : null], ['Note', w.note ? esc(w.note) : null],
    ['Build score', x.buildKnown ? x.build.toFixed(1) + ' of 5' + (x.value != null ? ' <span class="tag ' + (x.value >= 20 ? 'good' : x.value <= -20 ? 'warn' : '') + '">' + (x.value >= 20 ? 'Strong value' : x.value <= -20 ? 'Pricey for the build' : 'Fair value') + '</span>' : '') : null]
  ]) + '</div>';
  /* 10 delivery and returns */
  var L = c.lead || {}, dl = c.deliveryOverride || r.delivery || {}, rt = c.returnsOverride || r.returns || {};
  var retDl = arr.end && rt.windowDays ? (rt.startsAt === 'order' ? CG.addDays(s.order, rt.windowDays) : CG.addDays(arr.end, rt.windowDays)) : null;
  h += '<div class="dsec"><h4>Delivery and returns</h4>' + kv([
    ['Lead time', esc(L.raw || '') + (L.inStock ? ' <span class="tag good">In stock</span>' : '')],
    ['Arrives', arr.flag === 'unknown' ? 'Unknown' : CG.fmtRange(arr.start, arr.end) + (arr.est ? ' (estimate; ship time plus a week)' : '') + ' <span class="tag ' + CG.ARRIVE_CLS[arr.flag] + '">' + CG.ARRIVE_LABEL[arr.flag] + '</span>'],
    ['Order by', arr.orderBy ? (arr.orderBy < CG.today() ? '<span class="tag warn">Too late for the target date</span>' : CG.fmtDY(arr.orderBy) + ' to arrive by ' + CG.fmtD(s.target)) : null],
    ['Delivery', esc(dl.summary || (dl.method || '').replace(/-/g, ' '))], ['Haul-away', dl.haulAway && dl.haulAway.offered ? 'Offered' + (dl.haulAway.feeUsd != null ? ', ' + money(dl.haulAway.feeUsd) : '') : null],
    ['Returns', esc(rt.summary || (rt.windowDays != null ? rt.windowDays + ' days' : 'Unknown')) + (c.returnable ? ' <span class="tag ' + (c.returnable === 'free' ? 'good' : c.returnable === 'final-sale' ? 'bad' : '') + '">' + esc(c.returnable.replace(/-/g, ' ')) + '</span>' : '')],
    ['Final sale rules', rt.finalSaleRules ? esc(rt.finalSaleRules) : null],
    ['Return deadline', retDl ? 'About ' + CG.fmtDY(retDl) : null]
  ]) + '</div>';
  /* 11 try it */
  var ti = c.tryIt || {}, shows = (r.showrooms || []);
  h += '<div class="dsec"><h4>Try it in Seattle</h4>' + kv([
    ['On display', esc({ confirmed: 'Confirmed', likely: 'Likely', no: 'No', unknown: 'Unknown' }[ti.onDisplay] || 'Unknown')], ['Note', ti.note ? esc(ti.note) : null],
    ['Showrooms', shows.length ? shows.map(function(sr){ return esc(sr.name) + ' <a href="https://www.google.com/maps/search/' + encodeURIComponent(sr.address || sr.name) + '" target="_blank" rel="noopener">map</a>'; }).join('<br>') : 'None in the Seattle area']
  ]) + '</div>';
  /* 12 reviews */
  var rv = c.reviews || {};
  h += '<div class="dsec"><h4>Reviews</h4>' + kv([
    ['Rating', rv.rating != null ? rv.rating + ' of 5' + (rv.count != null ? ' from ' + rv.count.toLocaleString() + ' reviews' : '') + (rv.source ? ' (' + esc(rv.source) + ')' : '') + (CG.safeUrl(rv.url) ? ' <a href="' + esc(rv.url) + '" target="_blank" rel="noopener">read</a>' : '') : 'None found'],
    ['Summary', esc(rv.summary || '')], ['Praise', (rv.praise || []).length ? esc(rv.praise.join(', ')) : null], ['Complaints', (rv.complaints || []).length ? esc(rv.complaints.join(', ')) : null],
    ['Looks after use', rv.tidyMentions ? esc(rv.tidyMentions) : null], ['Delivery delays', rv.delayMentions ? 'Some reviewers mention late delivery' : null]
  ]) + ((rv.thirdParty || []).length ? '<ul class="bullets" style="margin-top:6px">' + rv.thirdParty.map(function(t){ return '<li>' + (CG.safeUrl(t.url) ? '<a href="' + esc(t.url) + '" target="_blank" rel="noopener">' + esc(t.source) + '</a>' : esc(t.source)) + ': ' + esc(t.verdict) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
  /* 13 sources */
  h += '<div class="dsec"><h4>Sources</h4><ul class="bullets">' + (c.sources || []).map(function(sr){ return '<li>' + (CG.safeUrl(sr.url) ? '<a href="' + esc(sr.url) + '" target="_blank" rel="noopener">' + esc(sr.label || sr.url) + '</a>' : esc(sr.label)) + (sr.accessed ? ', ' + CG.fmtD(sr.accessed) : '') + '</li>'; }).join('') + '</ul>' +
    '<p class="caveat">Record checked ' + CG.fmtDY(c.asOf) + ', overall confidence ' + esc(c.confidence || '?') + '.</p>' +
    ((c.unverified || []).length ? '<p class="caveat"><b>Not yet confirmed:</b> ' + c.unverified.map(function(u){ return esc(u) + ((c.fieldNotes || {})[u] ? ' (' + esc(c.fieldNotes[u]) + ')' : ''); }).join('; ') + '</p>' : '') + '</div>';
  h += '</div>';
  $('drawer').innerHTML = h;
}
var SOFT_LBL = ['', 'Firm', 'Medium-firm', 'Medium', 'Plush', 'Cloud'], TIDY_LBL = ['', 'Slouchy', 'Relaxed', 'Neat with upkeep', 'Tailored', 'Crisp'];
CG.SOFT_LBL = SOFT_LBL; CG.TIDY_LBL = TIDY_LBL;
function feltSel(id, f, who){ var v = CG.note(id, f); var h = '<label>' + who + ' <select data-act="felt" data-id="' + esc(id) + '" data-k="' + f + '"><option value="">?</option>';
  for (var i = 1; i <= 5; i += .5) h += '<option value="' + i + '"' + (v === i ? ' selected' : '') + '>' + i + '</option>'; return h + '</select></label>'; }
var FIT_LBL = { comfort: 'Comfort match', tidy: 'Tidy look', price: 'Price', financing: 'Financing', timing: 'Arrival', depth: 'Depth', care: 'Easy care', tryability: 'Try or return', build: 'Build', style: 'MCM style' };
var FIT_COL = ['#2b4c7e', '#4a6fa5', '#2f6b3f', '#5c9a6a', '#c8841e', '#a8466a', '#7c4fa8', '#2f7270', '#9a6b44', '#7a8090'];
function fitBreakdown(x){
  var ps = x.fitParts || {}, keys = Object.keys(ps), tot = keys.reduce(function(a, k){ return a + ps[k].wt; }, 0) || 1;
  var bar = '<div class="fitbars">' + keys.map(function(k, i){ return '<i style="width:' + (ps[k].v * ps[k].wt / tot * 100) + '%;background:' + FIT_COL[i % FIT_COL.length] + '" title="' + FIT_LBL[k] + '"></i>'; }).join('') + '</div>';
  return bar + '<table class="plain"><tbody>' + keys.map(function(k, i){ var p = ps[k]; return '<tr><td><i class="sw" style="background:' + FIT_COL[i % FIT_COL.length] + ';width:10px;height:10px"></i> ' + FIT_LBL[k] + (p.missing ? ' <span class="muted">(no data, counted as half)</span>' : '') + '</td><td class="n">' + (p.v * p.wt).toFixed(1) + ' of ' + p.wt + '</td></tr>'; }).join('') +
    '</tbody></table>' + (x.fitConf < .8 ? '<p class="caveat">Partial data: some parts of this score are guesses.</p>' : '') + '<p class="caveat">Change the weights in <a href="#setup" data-act="close">settings</a>.</p>';
}
function offersTable(rows, allIn, c){
  var s = X.s, h = '<h3 style="font-size:13px">Financing for this couch</h3>';
  var intro = { type: 'intro', n: s.introMonths, monthly: allIn != null ? allIn / s.introMonths : null, provider: '0% intro APR credit card (any store)' };
  if (!rows.length) h += '<p class="caveat">No financing listed for ' + esc(CG.retailerOf(c).name || 'this retailer') + '.</p>';
  h += '<div class="tw"><table class="plain"><thead><tr><th>Offer</th><th>Type</th><th>Term</th><th>APR</th><th>Monthly</th><th>Notes</th></tr></thead><tbody>';
  rows.concat([intro]).forEach(function(r){
    var o = r.offer || {}, type = r.type === 'intro' ? '<span class="tag good">True 0%</span>' : finBadge(o);
    var mo = r.monthly == null ? '' : money(r.type === 'deferred-interest' ? r.safe : r.monthly) + (r.rangeHi ? ' to ' + money(r.rangeHi) : '');
    var note = r.type === 'intro' ? 'Benchmark: a new card, used at any store, stacks with any sale. Check current offers.' : r.type === 'deferred-interest' ? 'Pay ' + money(r.safe) + '/mo to finish a month early.' + (r.risk ? ' Miss it and about ' + money(r.risk) + ' in back interest lands at once.' : '') : esc(o.gotchas || '');
    h += '<tr><td>' + esc(r.provider || o.provider || '') + (o.offerText ? '<div class="muted" style="font-size:11.5px">' + esc(o.offerText) + '</div>' : '') + '</td><td>' + type + '</td><td class="n">' + (r.n ? r.n + ' mo' : '?') + '</td><td class="n">' +
      (r.type === 'intro' ? '0%' : o.aprPct != null ? o.aprPct + '%' : o.aprRangePct ? o.aprRangePct[0] + '-' + o.aprRangePct[1] + '%' : '?') + '</td><td class="n">' + mo + '</td><td style="font-size:11.5px;color:var(--muted)">' + note + (o.verify ? ' <span class="verify">verify</span>' : '') + '</td></tr>';
  });
  return h + '</tbody></table></div>';
}
function finBadge(o){
  switch (o.interestType){
    case 'zero-apr': return o.zeroForAll === false ? '<span class="tag good">0% if approved</span>' : '<span class="tag good">True 0%</span>';
    case 'deferred-interest': return '<span class="tag warn">Deferred interest</span>';
    case 'fixed-apr': return '<span class="tag">Fixed ' + (o.aprPct != null ? o.aprPct + '%' : 'APR') + '</span>';
    case 'variable-by-credit': return '<span class="tag">Rate by credit</span>';
    case 'split-0': return '<span class="tag">Pay in 4</span>';
    case 'lease': return '<span class="tag bad">Lease to own, avoid</span>';
  }
  return '<span class="tag">?</span>';
}
CG.finBadge = finBadge; CG.FIN_LBL = FIN_LBL;

/* ── compare (spec 5.10) ── */
function toggleCompare(id, on){
  var arr = S.ui.compare[cat()] = S.ui.compare[cat()] || [], i = arr.indexOf(id);
  if (on && i < 0){ if (arr.length >= 4){ toast('Compare holds 4. Remove one first.'); renderResults(); return; } arr.push(id); }
  if (!on && i >= 0) arr.splice(i, 1);
  CG.saveUI(); renderTray();
  [].forEach.call(document.querySelectorAll('.cc[data-id="' + id + '"]'), function(el){ el.classList.toggle('incompare', arr.indexOf(id) >= 0); var cb = el.querySelector('[data-act="cmp"]'); if (cb) cb.checked = arr.indexOf(id) >= 0; });
}
function renderTray(){
  var arr = (S.ui.compare[cat()] || []).filter(function(id){ return X.byId[id]; }), t = $('tray');
  if (!arr.length){ t.hidden = true; return; }
  t.hidden = false;
  t.innerHTML = arr.map(function(id){ var x = X.byId[id]; return '<div class="ti" title="' + esc(x.c.brand + ' ' + x.c.model) + '">' + imgTag(x, (x.c.images || [])[0]) + '<button type="button" data-act="uncmp" data-id="' + esc(id) + '" aria-label="Remove">&times;</button></div>'; }).join('') +
    '<button type="button" class="btn primary" data-act="cmpopen"' + (arr.length < 2 ? ' disabled title="Pick at least two"' : '') + '>Compare (' + arr.length + ')</button><button type="button" class="btn" data-act="cmpclear">Clear</button>';
}
CG.renderTray = renderTray; CG.toggleCompare = toggleCompare;
var cmpDiffOnly = false;
function openCompare(ids, push){
  ids = (ids || S.ui.compare[cat()] || []).filter(function(id){ return X.byId[id]; }).slice(0, 4);
  if (!ids.length) return;
  var xs = ids.map(function(id){ return X.byId[id]; });
  var groups = [
    ['Our take', [['Carla', function(x){ return x.cl; }, 1, function(x){ return x.cl ? '&#9733; ' + x.cl : ''; }], ['Mike', function(x){ return x.ml; }, 1, function(x){ return x.ml ? '&#9733; ' + x.ml : ''; }],
      ['Combined', function(x){ return x.combined; }, 1], ['Agreement', null, 0, agreeBadge], ['Felt softness', function(x){ return x.felt; }, 0], ['Notes', null, 0, function(x){ return esc((CG.note(x.c.id, 'notes') || '').slice(0, 140)); }]]],
    ['Money', [['Price today', function(x){ return x.price; }, -1, function(x){ return money(x.price); }], ['List price', function(x){ return x.list; }, 0, function(x){ return money(x.list); }],
      ['Discount', function(x){ return x.discountPct; }, 0, function(x){ return x.discountPct ? x.discountPct + '%' : ''; }], ['Sale ends', null, 0, function(x){ return x.saleEnds ? CG.fmtD(x.saleEnds) : ''; }],
      ['All-in', function(x){ return x.allIn; }, -1, function(x){ return money(x.allIn); }], ['Best offer', null, 0, function(x){ return x.best ? finBadge(x.best.offer) + ' ' + (x.best.n || '') + ' mo' : 'None'; }],
      ['Monthly', function(x){ return x.best ? (x.best.type === 'deferred-interest' ? x.best.safe : x.bestMonthly) : null; }, -1, function(x){ return x.best ? money(x.best.type === 'deferred-interest' ? x.best.safe : x.bestMonthly) : ''; }],
      ['Longest 0% term', function(x){ return x.zeroTerm || null; }, 1, function(x){ return x.zeroTerm ? x.zeroTerm + ' mo' : ''; }],
      ['Return cost', function(x){ return x.rr.final ? 1e9 : x.rr.usd; }, -1, function(x){ return x.rr.final ? 'Final sale' : x.rr.usd != null ? money(x.rr.usd) : '?'; }]]],
    ['Size', [['Width', function(x){ return x.width; }, 0, function(x){ return inch(x.width); }], ['Depth', function(x){ return x.depth; }, -1, function(x){ return inch(x.depth); }],
      ['Seat depth', function(x){ return x.seatD; }, -1, function(x){ return inch(x.seatD) + (get(x.c, 'dims.seatDepthBasis') === 'to-frame' ? ' (to frame)' : ''); }], ['Seat height', function(x){ return x.seatH; }, 0, function(x){ return inch(x.seatH); }],
      ['Chaise depth', function(x){ return x.chaiseD; }, 0, function(x){ return x.c.category === 'sectional' ? inch(x.chaiseD) : ''; }], ['Arm height', null, 0, function(x){ return inch(get(x.c, 'dims.armHeightIn')); }],
      ['Room check', null, 0, function(x){ return x.roomSet ? (x.fitsRoom ? 'Fits' : 'Check') : 'Room not set'; }]]],
    ['Comfort', [['Softness', function(x){ return x.softUsed; }, 0, function(x){ return pips(x.softUsed); }], ['Comfort match', function(x){ return x.comfortMatch; }, 1, function(x){ return x.comfortMatch != null ? Math.round(x.comfortMatch * 100) + '%' : ''; }],
      ['Tidy look', function(x){ return x.tidy; }, 1, function(x){ return pips(x.tidy); }], ['Seat / back', null, 0, function(x){ return esc((get(x.c, 'comfort.seatCushions') || '') + ' / ' + (get(x.c, 'comfort.backCushions') || '').replace(/-/g, ' ')); }],
      ['Fill', null, 0, function(x){ return esc((get(x.c, 'comfort.seatFill') || '').replace(/-/g, ' ')); }], ['Edges', null, 0, function(x){ return esc(get(x.c, 'comfort.edgeStyle') || ''); }],
      ['Reviewers say', null, 0, function(x){ return esc((get(x.c, 'reviews.firmness') || '').replace(/-/g, ' ')); }], ['Aging', null, 0, function(x){ return esc(get(x.c, 'comfort.aging') || ''); }]]],
    ['Fabric and care', [['Families', null, 0, function(x){ var t = {}; (x.c.colors || []).forEach(function(k){ t[k.family] = 1; }); return esc(Object.keys(t).join(', ')); }],
      ['Performance', null, 0, function(x){ return x.performance ? 'Yes' : 'No'; }], ['Covers', null, 0, function(x){ return esc((get(x.c, 'fabric.removableCovers') || '?') + ', ' + (get(x.c, 'fabric.washableCovers') || '?')); }],
      ['Cleaning code', null, 0, function(x){ return esc(get(x.c, 'fabric.cleaningCode') || '?'); }], ['Easy-care score', function(x){ return x.clean; }, 1, function(x){ return x.clean.toFixed(1); }],
      ['Colors', null, 0, function(x){ return (x.c.colorCountTotal || (x.c.colors || []).length) + ' ' + swatches(x.c, 6); }], ['Free swatches', null, 0, function(x){ var sw = x.r.swatches || {}; return sw.free === true ? 'Yes' : sw.free === false ? 'Paid' : '?'; }]]],
    ['Timing', [['Lead time', function(x){ return x.arr.weeksMax; }, -1, function(x){ return esc(get(x.c, 'lead.raw') || ''); }], ['Arrives', null, 0, function(x){ return x.arr.flag === 'unknown' ? '?' : CG.fmtRange(x.arr.start, x.arr.end) + ' <span class="tag ' + CG.ARRIVE_CLS[x.arr.flag] + '">' + CG.ARRIVE_LABEL[x.arr.flag] + '</span>'; }],
      ['Order by', null, 0, function(x){ return x.arr.orderBy ? CG.fmtD(x.arr.orderBy) : ''; }]]],
    ['Policies', [['Delivery', null, 0, function(x){ var d = x.c.deliveryOverride || x.r.delivery || {}; return esc((d.method || '?').replace(/-/g, ' ')) + (x.delivery != null ? ', ' + money(x.delivery) : ''); }],
      ['Assembly', null, 0, function(x){ return esc((get(x.c, 'build.assembly') || '').replace(/-/g, ' ')); }], ['Return window', function(x){ return x.c.returnable === 'final-sale' ? 0 : ((x.c.returnsOverride || x.r.returns) || {}).windowDays; }, 1, function(x){ var w = ((x.c.returnsOverride || x.r.returns) || {}).windowDays; return x.c.returnable === 'final-sale' ? 'Final sale' : w != null ? w + ' days' : '?'; }],
      ['Frame warranty', function(x){ var f = get(x.c, 'warranty.frameYears'); return f === 'lifetime' ? 100 : f; }, 1, function(x){ var f = get(x.c, 'warranty.frameYears'); return f === 'lifetime' ? 'Lifetime' : f ? f + ' yr' : '?'; }]]],
    ['Try it', [['On display', null, 0, function(x){ return esc(x.tryOn); }], ['Showrooms', null, 0, function(x){ return esc((x.r.showrooms || []).map(function(s){ return s.name; }).join('; ') || 'None'); }]]],
    ['Build and style', [['Frame', null, 0, function(x){ return esc((get(x.c, 'build.frame') || '?').replace(/-/g, ' ')); }], ['Suspension', null, 0, function(x){ return esc((get(x.c, 'build.suspension') || '?').replace(/-/g, ' ')); }],
      ['Build score', function(x){ return x.buildKnown ? x.build : null; }, 1, function(x){ return x.buildKnown ? x.build.toFixed(1) : '?'; }], ['MCM fit', function(x){ return get(x.c, 'style.mcmFit'); }, 1],
      ['Arms / legs', null, 0, function(x){ return esc((get(x.c, 'style.armStyle') || '') + ' / ' + (get(x.c, 'style.legStyle') || '').replace(/-/g, ' ')); }], ['Reviews', function(x){ return x.reviewScore; }, 1, function(x){ var r = x.c.reviews || {}; return r.rating != null ? r.rating + ' (' + (r.count || 0) + ')' : '?'; }]]],
    ['Pros and cons', [['Pros', null, 0, function(x){ return list(x.c.pros); }], ['Cons', null, 0, function(x){ return list(x.c.cons); }]]]
  ];
  var h = '<div class="cmp-head"><h2>Compare ' + xs.length + ' ' + catWord(xs.length) + '</h2><label class="fopt"><input type="checkbox" id="cmpDiff"' + (cmpDiffOnly ? ' checked' : '') + '> Differences only</label>' +
    '<button type="button" class="btn" data-act="copycmp">Copy link</button><span class="spacer"></span><button type="button" class="xbtn" data-act="cmpclose" aria-label="Close compare">&times;</button></div>';
  h += '<div style="overflow-x:auto"><table class="cmp"><thead><tr><th></th>' + xs.map(function(x){ return '<th>' + imgTag(x, (x.c.images || [])[0]) + '<button type="button" class="nm" data-act="open" data-id="' + esc(x.c.id) + '">' + esc(x.c.brand + ' ' + x.c.model) + '</button><div class="ret">' + esc(x.r.name || '') + ' &middot; ' + money(x.price) + (x.fit != null ? ' &middot; Fit ' + x.fit : '') + '</div>' +
    '<button type="button" class="linkbtn" data-act="uncmp" data-id="' + esc(x.c.id) + '" style="font-size:12px">Remove</button></th>'; }).join('') + '</tr></thead><tbody>';
  groups.forEach(function(g){
    h += '<tr class="grp"><td colspan="' + (xs.length + 1) + '">' + g[0] + '</td></tr>';
    g[1].forEach(function(row){
      var vals = xs.map(function(x){ return row[1] ? row[1](x) : null; }), shown = xs.map(function(x){ var v = row[3] ? row[3](x) : (row[1](x) == null ? '' : row[1](x)); return v == null ? '' : String(v); });
      var same = shown.every(function(v){ return v === shown[0]; });
      var win = null; if (row[2] && row[1]){ var known = vals.filter(function(v){ return v != null; }); if (known.length > 1){ var bestV = row[2] > 0 ? Math.max.apply(null, known) : Math.min.apply(null, known); if (known.filter(function(v){ return v === bestV; }).length < known.length) win = bestV; } }
      h += '<tr' + (same ? ' class="same"' : '') + (same && cmpDiffOnly ? ' hidden' : '') + '><td class="lab">' + row[0] + '</td>' + shown.map(function(v, i){ return '<td' + (win != null && vals[i] === win ? ' class="win"' : '') + '>' + v + '</td>'; }).join('') + '</tr>';
    });
  });
  h += '</tbody></table></div>';
  $('cmpov').innerHTML = h; $('cmpov').hidden = false; document.body.style.overflow = 'hidden';
  $('cmpDiff').addEventListener('change', function(){ cmpDiffOnly = this.checked; [].forEach.call($('cmpov').querySelectorAll('tr.same'), function(tr){ tr.hidden = cmpDiffOnly; }); });
  if (push !== false){ var u = new URL(location.href); u.searchParams.set('compare', ids.join(',')); history.pushState({ compare: ids }, '', u); }
  setTimeout(function(){ var b = $('cmpov').querySelector('.xbtn'); if (b) b.focus(); }, 30);
}
function closeCompare(fromPop){
  if ($('cmpov').hidden) return; $('cmpov').hidden = true; document.body.style.overflow = '';
  if (!fromPop){ var u = new URL(location.href); if (u.searchParams.has('compare')){ if (history.state && history.state.compare) history.back(); else { u.searchParams.delete('compare'); history.replaceState({}, '', u); } } }
}
CG.openCompare = openCompare; CG.closeCompare = closeCompare;

/* ── lightbox ── */
var lbList = [], lbI = 0;
function openLB(list, i){ lbList = list; lbI = i; showLB(); $('lb').hidden = false; $('lbClose').focus(); }
function showLB(){ var it = lbList[lbI] || {}; $('lbImg').src = it.src; $('lbImg').className = it.mirror ? 'mirror' : ''; $('lbCap').innerHTML = esc(it.cap || '') + (lbList.length > 1 ? ' &middot; ' + (lbI + 1) + ' of ' + lbList.length : '') + (it.source ? ' &middot; <a href="' + esc(it.source) + '" target="_blank" rel="noopener">source</a>' : ''); }
$('lbClose').addEventListener('click', function(){ $('lb').hidden = true; });
$('lbPrev').addEventListener('click', function(){ lbI = (lbI - 1 + lbList.length) % lbList.length; showLB(); });
$('lbNext').addEventListener('click', function(){ lbI = (lbI + 1) % lbList.length; showLB(); });
$('lb').addEventListener('click', function(e){ if (e.target === this) this.hidden = true; });

function toast(msg){ var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(function(){ t.remove(); }, 2600); }
CG.toast = toast;
function copyText(s){ if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s).then(function(){ toast('Copied'); }, function(){ prompt('Copy this:', s); }); prompt('Copy this:', s); }
CG.copyText = copyText;

/* ── click delegation ── */
var noteT = null;
document.addEventListener('click', function(e){
  var el = e.target.closest && e.target.closest('[data-act]'); if (!el) return;
  var a = el.getAttribute('data-act'), id = el.getAttribute('data-id');
  switch (a){
    case 'open': e.preventDefault(); openDetail(id); break;
    case 'close': closeDetail(); break;
    case 'bm': CG.setNote(id, 'shortlist', !CG.note(id, 'shortlist')); rerender(); if (detailId) renderDetail(); break;
    case 'star': var f = el.getAttribute('data-who') === 'carla' ? 'carlaLike' : 'mikeLike', v = +el.getAttribute('data-v');
      CG.setNote(id, f, CG.note(id, f) === v ? null : v); rerender(); if (detailId) renderDetail(); break;
    case 'chip': var on = chipsOn(), c = el.getAttribute('data-chip'), i = on.indexOf(c); if (i >= 0) on.splice(i, 1); else on.push(c); CG.saveUI(); rerenderLib(); break;
    case 'fcolor': var st = fstate(), arr = Array.isArray(st.color) ? st.color : [], k = el.getAttribute('data-v'), j = arr.indexOf(k); if (j >= 0) arr.splice(j, 1); else arr.push(k); st.color = arr; rerenderLib(); break;
    case 'fclear': fstate()[el.getAttribute('data-f')] = null; rerenderLib(); break;
    case 'clearall': clearAll(); break;
    case 'tsort': S.ui.sort[cat()] = el.getAttribute('data-sort'); CG.saveUI(); renderSortSel(); renderResults(); break;
    case 'cmpbtn': toggleCompare(id, (S.ui.compare[cat()] || []).indexOf(id) < 0); renderDetail(); break;
    case 'uncmp': toggleCompare(id, false); if (!$('cmpov').hidden){ if ((S.ui.compare[cat()] || []).length) openCompare(null, false); else closeCompare(); } break;
    case 'cmpopen': openCompare(); break;
    case 'cmpclose': closeCompare(); break;
    case 'cmpclear': S.ui.compare[cat()] = []; CG.saveUI(); renderTray(); renderResults(); break;
    case 'copycmp': copyText(location.href); break;
    case 'copylink': var u = new URL(location.origin + location.pathname); u.searchParams.set('item', id); copyText(u.toString()); break;
    case 'dimg': detailImg = +el.getAttribute('data-i'); renderDetail(); break;
    case 'fabric': if (e.target.closest('label')) break; detailFabric = el.getAttribute('data-name'); detailImg = 0; renderDetail(); break;
    case 'mirror': CG.setSetting('mirrorLeftPhotos', !X.s.mirror); rerender(); renderDetail(); break;
    case 'whyfit': var w = $('whyFit'); w.hidden = !w.hidden; break;
    case 'lb': var x = X.byId[detailId], imgs = (x.c.images || []).filter(function(m){ return imgSrc(m); });
      openLB(imgs.map(function(m){ return { src: imgSrc(m), cap: x.c.brand + ' ' + x.c.model + (m.caption ? ', ' + m.caption : ''), source: CG.safeUrl(m.source), mirror: x.mirror && m.chaiseSideShown === 'left' }; }), +el.getAttribute('data-i') || 0); break;
  }
});
document.addEventListener('keydown', function(e){ var el = e.target; if ((e.key === 'Enter' || e.key === ' ') && el.getAttribute && el.getAttribute('data-act') === 'fabric'){ e.preventDefault(); el.click(); } });
document.addEventListener('change', function(e){
  var el = e.target, a = el.getAttribute && el.getAttribute('data-act'), id = el.getAttribute && el.getAttribute('data-id');
  if (a === 'swatch'){ var cur = (CG.note(id, 'swatches') || []).slice(), n = el.getAttribute('data-name'), i = cur.indexOf(n); if (el.checked && i < 0) cur.push(n); if (!el.checked && i >= 0) cur.splice(i, 1); CG.setNote(id, 'swatches', cur); CG.renderShortlist && CG.renderShortlist(); }
  else if (a === 'felt'){ CG.setNote(id, el.getAttribute('data-k'), el.value === '' ? null : +el.value); rerender(); renderDetail(); }
  else if (a === 'tried'){ var t = Object.assign({}, CG.note(id, 'tried') || {}); t[el.getAttribute('data-k')] = el.value; CG.setNote(id, 'tried', t); }
});
document.addEventListener('input', function(e){
  var el = e.target; if (!el.getAttribute || el.getAttribute('data-act') !== 'notes') return;
  clearTimeout(noteT); var id = el.getAttribute('data-id'), v = el.value;
  noteT = setTimeout(function(){ CG.setNote(id, 'notes', v); var f = $('savedFlash'); if (f){ f.classList.add('show'); setTimeout(function(){ f.classList.remove('show'); }, 1200); } }, 500);
});
function clearAll(){ S.ui.filters[cat()] = {}; S.ui.chips[cat()] = []; $('q').value = ''; CG.saveUI(); rerenderLib(); }
$('clearAll').addEventListener('click', clearAll);
$('fClear').addEventListener('click', clearAll);
[].forEach.call(document.querySelectorAll('[data-view]'), function(b){ b.addEventListener('click', function(){ S.ui.view = b.getAttribute('data-view'); CG.saveUI(); renderResults(); }); });
function filtersDrawer(open){ document.body.classList.toggle('filters-open', open); if (open) $('fDone').textContent = 'Show ' + applyAll(catItems()).length + ' ' + catWord(2); }
$('filtersBtn').addEventListener('click', function(){ filtersDrawer(true); });
$('fDone').addEventListener('click', function(){ filtersDrawer(false); });
$('fscrim').addEventListener('click', function(){ filtersDrawer(false); });
document.addEventListener('change', function(){ if (document.body.classList.contains('filters-open')) setTimeout(function(){ $('fDone').textContent = 'Show ' + applyAll(catItems()).length + ' ' + catWord(2); }, 80); });
$('drawerScrim').addEventListener('click', function(){ closeDetail(); });
document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  if (!$('lb').hidden){ $('lb').hidden = true; return; }
  if (!$('drawer').hidden){ closeDetail(); return; }
  if (!$('cmpov').hidden){ closeCompare(); return; }
  if (document.body.classList.contains('filters-open')){ filtersDrawer(false); return; }
  if (document.body.classList.contains('nav-open')) CG.toggleNav(false);
});
document.addEventListener('keydown', function(e){
  if (e.key !== 'Tab') return; var box = !$('drawer').hidden ? $('drawer') : !$('cmpov').hidden ? $('cmpov') : !$('lb').hidden ? $('lb') : null; if (!box) return;
  var f = box.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]'); if (!f.length) return;
  var first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});
$('targetRead').addEventListener('click', function(){ location.hash = '#setup'; setTimeout(function(){ var s = document.querySelector('[data-set="comfortBlend"]'); if (s) s.focus(); }, 300); });

CG.refresh = refresh; CG.cat = cat; CG.catItems = catItems; CG.catWord = catWord; CG.rerender = rerender; CG.renderDetailIfOpen = function(){ if (detailId) renderDetail(); };
CG.applyAll = applyAll; CG.imgSrc = imgSrc; CG.list = list; CG.kv = kv; CG.titleCase = titleCase;
refresh();
})();
