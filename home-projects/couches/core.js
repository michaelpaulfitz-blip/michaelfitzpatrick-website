/* Couch Guide core: data, storage, derived fields. Spec: home-and-personal-projects/couch-research/ux-spec.md */
(function(){
'use strict';
var BASE = '/home-projects/couches/';
var D = window.COUCH_DATA || { couches: [], retailers: [], excluded: [], editorial: {} };
var RET = {}; (D.retailers || []).forEach(function(r){ RET[r.id] = r; });
var ALL = (D.couches || []).filter(function(c){
  if (c.category === 'sectional' && ['right','reversible','any'].indexOf(c.chaiseSide) < 0){ console.warn('dropped (chaise side)', c.id); return false; }
  return true;
});
var BYID = {}; ALL.forEach(function(c){ BYID[c.id] = c; });
var ED = D.editorial || {};

/* ── helpers ── */
function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function $(id){ return document.getElementById(id); }
function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function lsSet(k, v){ try { localStorage.setItem(k, v); return true; } catch(e){ return false; } }
function jget(k, d){ try { var v = JSON.parse(lsGet(k)); return v == null ? d : v; } catch(e){ return d; } }
function jset(k, v){ return lsSet(k, JSON.stringify(v)); }
function num(v){ return (v === null || v === undefined || v === '' || isNaN(Number(v))) ? null : Number(v); }
function get(o, path){ return String(path).split('.').reduce(function(a, k){ if (a == null) return null; var m = /^(\w+)\[(\d+)\]$/.exec(k); return m ? (a[m[1]] || [])[+m[2]] : a[k]; }, o); }
function nowISO(){ return new Date().toISOString(); }
function safeUrl(u){ u = String(u || ''); return /^https?:\/\//i.test(u) ? u : ''; }
function money(n, opts){ if (n == null || isNaN(n)) return '?'; opts = opts || {}; var v = Math.round(n * (opts.cents ? 100 : 1)) / (opts.cents ? 100 : 1);
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: opts.cents ? 2 : 0, maximumFractionDigits: opts.cents ? 2 : 0 }); }
function inch(n){ return n == null ? '?' : (Math.round(n * 10) / 10) + '"'; }
function plural(n, w){ return n + ' ' + w + (n === 1 ? '' : 's'); }

/* dates: ISO strings in, local Date objects out */
function d0(iso){ if (!iso) return null; var p = String(iso).slice(0, 10).split('-'); if (p.length < 3) return null; return new Date(+p[0], +p[1] - 1, +p[2]); }
function today(){ var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
function diffDays(a, b){ return Math.round((a - b) / 86400000); }
function iso(d){ return d ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') : null; }
var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtD(d){ d = typeof d === 'string' ? d0(d) : d; return d ? MON[d.getMonth()] + ' ' + d.getDate() : '?'; }
function fmtDY(d){ d = typeof d === 'string' ? d0(d) : d; return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : '?'; }
function fmtRange(a, b){ if (!a || !b) return '?'; if (iso(a) === iso(b)) return fmtD(a); return a.getMonth() === b.getMonth() ? fmtD(a) + '-' + b.getDate() : fmtD(a) + ' to ' + fmtD(b); }

/* ── storage (spec 2.9): every shared value is {v, t} so imports merge per field ── */
var K = { notes: 'homeProjects.couches.v1.notes', settings: 'homeProjects.couches.v1.settings', ui: 'homeProjects.couches.v1.ui', who: 'homeProjects.couches.v1.who', lastExport: 'homeProjects.couches.v1.lastExport' };
var DEF_WEIGHTS = {
  sectional: { comfort: 20, tidy: 15, price: 12, financing: 12, timing: 10, depth: 8, care: 8, tryability: 6, build: 5, style: 4 },
  sofa:      { comfort: 12, tidy: 8,  price: 25, financing: 6,  timing: 10, depth: 6, care: 10, tryability: 8, build: 7, style: 8 }
};
var DEF_SETTINGS = {
  comfortBlend: 0.75, orderDate: null, arrivalTarget: '2027-02-14', deadline: '2027-03-07', taxRatePct: 10.35, oldCouchResaleUsd: null,
  maxSeatDepthIn: 23, maxOverallDepthIn: 40,
  rooms: { sectional: { maxWidthIn: null, maxChaiseIn: null, maxDepthIn: null, pathWidthIn: null }, sofa: { maxWidthIn: null, maxDepthIn: null, pathWidthIn: null } },
  budgets: { sectional: { targetUsd: null, ceilingUsd: null }, sofa: { targetUsd: null, ceilingUsd: null } },
  weights: JSON.parse(JSON.stringify(DEF_WEIGHTS)), mirrorLeftPhotos: true, introCardMonths: 21
};
var BASELINE = (window.COUCH_NOTES && typeof window.COUCH_NOTES === 'object') ? window.COUCH_NOTES : {};

function mergeField(a, b){ if (!a) return b; if (!b) return a; return (String(b.t || '') > String(a.t || '')) ? b : a; }
function mergeNotes(base, over){
  var out = {}; [base || {}, over || {}].forEach(function(src){
    Object.keys(src).forEach(function(id){ out[id] = out[id] || {};
      Object.keys(src[id] || {}).forEach(function(f){ var v = src[id][f]; if (v && typeof v === 'object' && 't' in v) out[id][f] = mergeField(out[id][f], v); }); });
  }); return out;
}
function mergeSettings(base, over){ var out = {}; [base || {}, over || {}].forEach(function(src){ Object.keys(src).forEach(function(k){ var v = src[k]; if (v && typeof v === 'object' && 't' in v) out[k] = mergeField(out[k], v); }); }); return out; }

var S = {
  notes: mergeNotes(BASELINE.notes, jget(K.notes, {})),
  settingsRaw: mergeSettings(BASELINE.settings, jget(K.settings, {})),
  ui: Object.assign({ cat: 'sectional', view: 'grid', sort: { sectional: 'fit', sofa: 'fit' }, filters: { sectional: {}, sofa: {} }, chips: { sectional: [], sofa: [] },
    compare: { sectional: [], sofa: [] }, lastVisit: null, seenPrice: {} }, jget(K.ui, {})),
  who: lsGet(K.who) || ''
};
['sort','filters','chips','compare'].forEach(function(k){ S.ui[k] = Object.assign({ sectional: k === 'sort' ? 'fit' : (k === 'filters' ? {} : []), sofa: k === 'sort' ? 'fit' : (k === 'filters' ? {} : []) }, S.ui[k] || {}); });
var prevVisit = S.ui.lastVisit;

function setting(k){ var r = S.settingsRaw[k]; var d = DEF_SETTINGS[k]; if (!r) return d;
  if (d && typeof d === 'object' && !Array.isArray(d)) return deepMerge(JSON.parse(JSON.stringify(d)), r.v); return r.v; }
function deepMerge(a, b){ if (!b || typeof b !== 'object') return a; Object.keys(b).forEach(function(k){ if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') a[k] = deepMerge(a[k], b[k]); else a[k] = b[k]; }); return a; }
function setSetting(k, v){ S.settingsRaw[k] = { v: v, t: nowISO() }; jset(K.settings, S.settingsRaw); }
function note(id, f){ var n = S.notes[id]; return n && n[f] ? n[f].v : null; }
function setNote(id, f, v){ S.notes[id] = S.notes[id] || {}; S.notes[id][f] = { v: v, t: nowISO() }; jset(K.notes, S.notes); }
function saveUI(){ jset(K.ui, S.ui); }
function setWho(w){ S.who = w; lsSet(K.who, w); }

/* ── derived fields (spec 3) ── */
function sett(){ return {
  blend: num(setting('comfortBlend')) == null ? .75 : num(setting('comfortBlend')),
  order: (function(){ var o = d0(setting('orderDate')), t = today(); return (o && o > t) ? o : t; })(),
  target: d0(setting('arrivalTarget')) || d0('2027-02-14'), deadline: d0(setting('deadline')) || d0('2027-03-07'),
  tax: num(setting('taxRatePct')) == null ? 10.35 : num(setting('taxRatePct')), resale: num(setting('oldCouchResaleUsd')),
  maxSeat: num(setting('maxSeatDepthIn')) || 23, maxDepth: num(setting('maxOverallDepthIn')) || 40,
  rooms: setting('rooms'), budgets: setting('budgets'), weights: setting('weights'), mirror: setting('mirrorLeftPhotos') !== false,
  introMonths: num(setting('introCardMonths')) || 21
}; }
function targetT(blend){ return 2.5 + blend * 2; }
function retailerOf(c){ return RET[c.retailerId] || { id: c.retailerId, name: c.retailerId, financing: [], delivery: {}, returns: {}, showrooms: [] }; }

function effectivePrice(c, fabricName){
  var col = fabricName ? (c.colors || []).filter(function(x){ return x.name === fabricName; })[0] : null;
  if (col && num(col.priceUsd) != null) return num(col.priceUsd);
  var p = c.price || {}; return num(p.saleUsd) != null ? num(p.saleUsd) : num(p.listUsd);
}
function deliveryUsd(c, price){
  var d = c.deliveryOverride || retailerOf(c).delivery || {};
  switch (d.feeType){
    case 'free': return 0;
    case 'flat': case 'tiered': return num(d.feeUsd);
    case 'pct': return d.feePct == null || price == null ? null : Math.round(price * d.feePct / 100);
    case 'free-over': return price == null ? null : (price >= (d.freeOverUsd || 0) ? 0 : num(d.feeUsd));
    default: return null;
  }
}
function amort(P, apr, n){ var r = apr / 1200; return r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n)); }

function offerRows(c, allIn, order){
  var offs = c.financingOverride || retailerOf(c).financing || [];
  var rows = [];
  offs.forEach(function(o){
    if (o.promoEnds && d0(o.promoEnds) < order) return;
    if (allIn != null && o.minPurchaseUsd != null && allIn < o.minPurchaseUsd) return;
    if (allIn != null && o.maxPurchaseUsd != null && allIn > o.maxPurchaseUsd) return;
    var terms = (o.termsMonths || []).filter(function(n){ return n > 0; });
    if (!terms.length) rows.push({ o: o, n: null }); else terms.forEach(function(n){ rows.push({ o: o, n: n }); });
  });
  return rows.map(function(r){
    var o = r.o, n = r.n, P = allIn, x = { offer: o, type: o.interestType, n: n, provider: o.provider };
    if (P == null || !n){ x.monthly = null; return x; }
    if (o.interestType === 'zero-apr'){ x.monthly = P / n; x.interest = 0;
      if (o.zeroForAll === false && o.aprRangePct){ x.rangeHi = amort(P, o.aprRangePct[1], n); } }
    else if (o.interestType === 'deferred-interest'){ x.monthly = P / n; x.safe = n > 1 ? P / (n - 1) : P; x.interest = 0;
      if (o.postPromoAprPct){ x.risk = Math.round(amort(P, o.postPromoAprPct, n) * n - P); } }
    else if (o.interestType === 'fixed-apr' && o.aprPct != null){ x.monthly = amort(P, o.aprPct, n); x.interest = Math.round(x.monthly * n - P); }
    else if (o.interestType === 'variable-by-credit' && o.aprRangePct){ x.monthly = amort(P, o.aprRangePct[0], n); x.rangeHi = amort(P, o.aprRangePct[1], n); x.interest = Math.round(x.monthly * n - P); }
    else x.monthly = null;
    return x;
  });
}
function bestOffer(rows){
  function pick(f, by){ var c = rows.filter(f); if (!c.length) return null; c.sort(by); return c[0]; }
  var longest = function(a, b){ return (b.n || 0) - (a.n || 0); };
  return pick(function(r){ return r.type === 'zero-apr' && r.offer.zeroForAll === true && r.n; }, longest)
    || pick(function(r){ return r.type === 'zero-apr' && r.n; }, longest)
    || pick(function(r){ return r.type === 'deferred-interest' && r.n; }, longest)
    || pick(function(r){ return r.type === 'fixed-apr' && r.n; }, function(a, b){ return (a.offer.aprPct || 99) - (b.offer.aprPct || 99) || longest(a, b); })
    || pick(function(r){ return r.type === 'variable-by-credit' && r.n && r.offer.aprRangePct; }, function(a, b){ return a.offer.aprRangePct[0] - b.offer.aprRangePct[0]; })
    || null;
}
function hasFinType(rows, t){ return rows.some(function(r){ return r.type === t; }); }

function arrival(c, s, fabricName){
  var L = c.lead || {}, lo = num(L.weeksMin), hi = num(L.weeksMax);
  var col = fabricName ? (c.colors || []).filter(function(x){ return x.name === fabricName; })[0] : null;
  if (col && Array.isArray(col.leadWeeks) && col.leadWeeks.length === 2){ lo = num(col.leadWeeks[0]); hi = num(col.leadWeeks[1]); }
  if (hi == null) return { flag: 'unknown', est: false };
  if (lo == null) lo = hi;
  var est = L.basis === 'ship', pad = est ? 7 : 0;
  var a = addDays(s.order, Math.round(lo * 7) + pad), b = addDays(s.order, Math.round(hi * 7) + pad);
  if (L.estDeliveryDate && L.checkedAt && Math.abs(diffDays(s.order, d0(L.checkedAt))) <= 3){ a = b = d0(L.estDeliveryDate); est = false; }
  var flag = b <= s.target ? 'early' : (a <= s.deadline ? 'tight' : 'late');
  var orderBy = addDays(s.target, -Math.round(hi * 7) - pad);
  return { start: a, end: b, est: est, flag: flag, orderBy: orderBy, weeksMax: hi };
}
var ARRIVE_LABEL = { early: 'Before target', tight: 'Cutting it close', late: 'After deadline', unknown: 'Lead time unknown' };
var ARRIVE_CLS = { early: 'good', tight: 'warn', late: 'bad', unknown: '' };

function cleanScore(c){
  var f = c.fabric || {}, s = 0, pf = (c.colors || []).filter(function(x){ return x.name === get(c, 'price.priceFabric'); })[0];
  if (pf && pf.performance) s += 2; else if ((c.colors || []).some(function(x){ return x.performance; })) s += 1;
  if (f.removableCovers === 'all') s += 1; else if (f.removableCovers === 'cushions' || f.removableCovers === 'seat-cushions') s += .5;
  if (f.washableCovers === 'machine') s += 1;
  if (f.cleaningCode === 'W' || f.cleaningCode === 'WS') s += .5;
  if (f.replacementCoversSold || f.stainWarranty) s += .5;
  return Math.min(5, s);
}
function buildScore(c){
  var b = c.build || {}, w = c.warranty || {}, s = 0;
  s += ({ 'kiln-dried-hardwood': 2, 'solid-hardwood': 1.75, 'hardwood-plywood': 1.5, 'plywood-engineered': 1, 'metal': 1, 'particleboard-mdf': .25 })[b.frame] || .5;
  s += ({ '8-way-hand-tied': 1.5, 'pocketed-coils': 1.25, 'sinuous-springs': 1, 'webbing': .5 })[b.suspension] || .5;
  var fy = w.frameYears; s += fy === 'lifetime' ? 1 : (fy >= 10 ? .75 : fy >= 5 ? .5 : fy >= 1 ? .25 : 0);
  if (num(get(c, 'comfort.foamDensityLbFt3')) >= 1.8) s += .5;
  return Math.min(5, s);
}
function agreement(cl, ml){
  if (cl === 1 || ml === 1) return 'vetoed';
  if (cl && ml){ if (cl === 5 && ml === 5) return 'both-love'; if (cl >= 4 && ml >= 4) return 'both-like'; if (Math.abs(cl - ml) >= 2) return 'split'; return 'lukewarm'; }
  if (ml) return 'needs-carla'; if (cl) return 'needs-mike'; return 'unrated';
}
var AGREE_LABEL = { 'both-love': 'Both love', 'both-like': 'Both like', split: 'Split', lukewarm: 'Lukewarm', vetoed: 'Vetoed', 'needs-carla': 'Needs Carla', 'needs-mike': 'Needs Mike', unrated: 'Unrated' };

function returnRisk(c, price, deliv){
  if (c.returnable === 'final-sale') return { final: true };
  var r = c.returnsOverride || retailerOf(c).returns || {};
  if (c.returnable === 'free') return { usd: 0 };
  if (r.restockingPct == null || r.returnShippingUsd == null || price == null) return { unknown: true };
  return { usd: Math.round(r.restockingPct * price / 100 + r.returnShippingUsd + (r.deliveryFeeRefunded === false ? (deliv || 0) : 0)) };
}
function isUnverified(c, prefix){ return (c.unverified || []).some(function(p){ return p === prefix || p.indexOf(prefix + '.') === 0 || p.indexOf(prefix + '[') === 0; }); }

function derive(c, s){
  var x = { c: c, r: retailerOf(c) };
  var p = c.price || {};
  x.list = num(p.listUsd); x.sale = num(p.saleUsd); x.price = effectivePrice(c);
  x.discountPct = (x.sale != null && x.list) ? Math.round((x.list - x.sale) / x.list * 100) : null;
  x.saleEnds = d0(p.saleEnds); x.saleDaysLeft = x.saleEnds ? diffDays(x.saleEnds, today()) : null;
  x.delivery = deliveryUsd(c, x.price);
  x.tax = x.price == null ? null : Math.round((x.price + (x.delivery || 0)) * s.tax / 100);
  x.allIn = x.price == null ? null : x.price + (x.delivery || 0) + x.tax;
  x.net = (c.category === 'sectional' && s.resale != null && x.allIn != null) ? x.allIn - s.resale : null;
  x.offers = offerRows(c, x.allIn, s.order);
  x.best = bestOffer(x.offers);
  x.bestMonthly = x.best ? x.best.monthly : null;
  x.zeroTerm = x.offers.filter(function(r){ return r.type === 'zero-apr' && r.n; }).reduce(function(m, r){ return Math.max(m, r.n); }, 0);
  x.arr = arrival(c, s);
  var d = c.dims || {};
  x.seatD = num(d.seatDepthIn); x.depth = num(d.overallDepthIn); x.width = num(d.overallWidthIn); x.seatH = num(d.seatHeightIn); x.chaiseD = num(d.chaiseDepthIn);
  x.depthClass = x.seatD == null ? null : (x.seatD <= 22 ? 'Shallow seat' : x.seatD <= 24 ? 'Medium seat' : 'Deep seat');
  x.notTooDeep = x.seatD != null && x.depth != null && x.seatD <= s.maxSeat && x.depth <= s.maxDepth;
  x.easyUp = x.seatH != null && x.seatD != null && x.seatH >= 18 && x.seatD <= 23;
  var room = (s.rooms || {})[c.category] || {};
  function chk(v, lim){ return (v == null || lim == null) ? 'check' : (v <= lim ? 'yes' : 'no'); }
  x.fitsWall = chk(x.width, num(room.maxWidthIn));
  x.fitsChaise = c.category === 'sectional' ? chk(x.chaiseD, num(room.maxChaiseIn)) : 'yes';
  x.fitsDepth = chk(x.depth, num(room.maxDepthIn));
  var path = num(room.pathWidthIn);
  if (path == null) x.fitsPath = 'check';
  else if (d.boxed && (d.boxDims || []).length){ var bx = d.boxDims[0], dd = [bx.widthIn, bx.depthIn, bx.heightIn].filter(function(v){ return v != null; }).sort(function(a, b){ return a - b; }); x.fitsPath = dd.length >= 2 ? (dd[1] <= path ? 'yes' : 'no') : 'check'; }
  else { var lp = d.largestPiece || {}, cand = [lp.heightIn || x.seatH && d.overallHeightIn, lp.depthIn || x.depth, d.diagonalDepthIn].filter(function(v){ return v != null; }); x.fitsPath = cand.length ? (Math.min.apply(null, cand) <= path - 1 ? 'yes' : 'no') : 'check'; }
  x.fitsRoom = [x.fitsWall, x.fitsChaise, x.fitsDepth, x.fitsPath].every(function(v){ return v === 'yes'; });
  x.roomSet = Object.keys(room).some(function(k){ return room[k] != null; });

  var cm = c.comfort || {};
  var cf = note(c.id, 'carlaFelt'), mf = note(c.id, 'mikeFelt');
  x.felt = (cf != null || mf != null) ? ([cf, mf].filter(function(v){ return v != null; }).reduce(function(a, b){ return a + b; }, 0) / [cf, mf].filter(function(v){ return v != null; }).length) : null;
  x.soft = num(cm.softness); x.tidy = num(cm.tidy);
  x.softUsed = x.felt != null ? x.felt : x.soft;
  var T = targetT(s.blend);
  x.comfortMatch = x.softUsed == null ? null : 1 - Math.min(Math.abs(x.softUsed - T), 3) / 3;
  x.tidyPlush = (x.soft != null && x.tidy != null) ? Math.min(x.soft, x.tidy) + (x.soft + x.tidy) / 100 : null;
  x.sweet = x.soft != null && x.tidy != null && x.soft >= 3.5 && x.tidy >= 3.5;
  x.clean = cleanScore(c); x.build = buildScore(c);
  x.buildKnown = !((get(c, 'build.frame') || 'unknown') === 'unknown' && (get(c, 'build.suspension') || 'unknown') === 'unknown');
  var rv = c.reviews || {};
  x.reviewScore = (num(rv.rating) != null && num(rv.count) != null) ? (rv.rating * rv.count + 4 * 25) / (rv.count + 25) : null;
  x.cl = note(c.id, 'carlaLike'); x.ml = note(c.id, 'mikeLike');
  x.agree = agreement(x.cl, x.ml);
  x.combined = (x.cl || x.ml) ? ((x.cl || 0) + (x.ml || 0)) / ((x.cl ? 1 : 0) + (x.ml ? 1 : 0)) : null;
  x.gap = (x.cl && x.ml) ? Math.abs(x.cl - x.ml) : null;
  x.shortlist = !!note(c.id, 'shortlist');
  x.rr = returnRisk(c, x.price, x.delivery);
  x.tryOn = get(c, 'tryIt.onDisplay') || 'unknown';
  x.performance = (c.colors || []).some(function(col){ return col.performance; });
  x.washable = get(c, 'fabric.washableCovers') === 'machine' || ['all', 'cushions'].indexOf(get(c, 'fabric.removableCovers')) >= 0;
  x.isNew = prevVisit && c.addedDate && c.addedDate > String(prevVisit).slice(0, 10);
  var seen = S.ui.seenPrice[c.id]; x.priceDelta = (seen != null && x.price != null && seen !== x.price) ? x.price - seen : null;
  var chk3 = get(c, 'price.checkedAt'); var age = chk3 ? diffDays(today(), d0(chk3)) : 99;
  var t = today(), season = t >= d0('2026-11-14') && t <= d0('2026-12-07');
  x.stale = age > (season ? 3 : 21); x.checkedAt = chk3;
  x.unverPrice = isUnverified(c, 'price'); x.unverDims = isUnverified(c, 'dims');
  x.leftPhoto = ((c.images || [])[0] || {}).chaiseSideShown === 'left' && c.category === 'sectional';
  x.mirror = x.leftPhoto && s.mirror && ['right', 'reversible', 'any'].indexOf(c.chaiseSide) >= 0;
  return x;
}

function fitScore(x, s, pool){
  var c = x.c, w = (s.weights || DEF_WEIGHTS)[c.category] || DEF_WEIGHTS[c.category], parts = {}, known = 0, total = 0;
  function put(k, v){ var wt = w[k] || 0; total += wt; if (v == null || isNaN(v)){ parts[k] = { v: .5, wt: wt, missing: true }; } else { parts[k] = { v: Math.max(0, Math.min(1, v)), wt: wt }; known += wt; } }
  put('comfort', x.comfortMatch);
  put('tidy', x.tidy == null ? null : (x.tidy - 1) / 4);
  var b = (s.budgets || {})[c.category] || {};
  if (x.allIn == null) put('price', null);
  else if (b.targetUsd != null && b.ceilingUsd != null && b.ceilingUsd > b.targetUsd) put('price', x.allIn <= b.targetUsd ? 1 : x.allIn >= b.ceilingUsd ? 0 : 1 - (x.allIn - b.targetUsd) / (b.ceilingUsd - b.targetUsd));
  else { var arr = pool.map(function(y){ return y.allIn; }).filter(function(v){ return v != null; }); var below = arr.filter(function(v){ return v < x.allIn; }).length; put('price', arr.length > 1 ? 1 - below / (arr.length - 1) : .5); }
  var bo = x.best, fin = 0;
  if (bo){ if (bo.type === 'zero-apr') fin = Math.min(bo.n, 48) / 48 * (bo.offer.zeroForAll === false ? .85 : 1); else if (bo.type === 'deferred-interest') fin = Math.min(bo.n, 48) / 48 / 2; else if (bo.type === 'fixed-apr' && bo.offer.aprPct <= 10) fin = .25; }
  put('financing', fin);
  put('timing', ({ early: 1, tight: .4, late: 0, unknown: .3 })[x.arr.flag]);
  if (x.seatD == null || x.depth == null) put('depth', null);
  else { var sp = x.seatD <= s.maxSeat ? 1 : Math.max(0, 1 - (x.seatD - s.maxSeat) / 3), op = x.depth <= s.maxDepth ? 1 : Math.max(0, 1 - (x.depth - s.maxDepth) / 4); put('depth', .7 * sp + .3 * op); }
  put('care', x.clean / 5);
  var tr; if (c.returnable === 'free') tr = 1; else if (c.returnable === 'final-sale') tr = 0; else if (c.returnable === 'with-fees' && x.rr.usd != null && x.price) tr = 1 - Math.min(x.rr.usd / x.price, .4) / .4; else tr = .3;
  if (x.tryOn === 'confirmed') tr = Math.max(tr, .9); else if (x.tryOn === 'likely') tr = Math.max(tr, .7);
  put('tryability', tr);
  put('build', x.buildKnown ? x.build / 5 : null);
  put('style', get(c, 'style.mcmFit') == null ? null : (get(c, 'style.mcmFit') - 1) / 4);
  var sum = 0; Object.keys(parts).forEach(function(k){ sum += parts[k].v * parts[k].wt; });
  x.fit = total ? Math.round(sum / total * 100) : null; x.fitParts = parts; x.fitConf = total ? known / total : 0;
}
function pctRank(arr, v){ var a = arr.filter(function(z){ return z != null; }); if (a.length < 2 || v == null) return null; return a.filter(function(z){ return z < v; }).length / (a.length - 1) * 100; }

var CACHE = null;
function computeAll(){
  var s = sett(), out = {};
  ['sectional', 'sofa'].forEach(function(cat){
    var xs = ALL.filter(function(c){ return c.category === cat; }).map(function(c){ return derive(c, s); });
    xs.forEach(function(x){ fitScore(x, s, xs); });
    var builds = xs.map(function(x){ return x.buildKnown ? x.build : null; }), prices = xs.map(function(x){ return x.price; });
    xs.forEach(function(x){ if (!x.buildKnown || x.price == null){ x.value = null; return; } var v = pctRank(builds, x.build) - pctRank(prices, x.price); x.value = isNaN(v) ? null : v; });
    out[cat] = xs;
  });
  out.s = s; out.T = targetT(s.blend);
  out.byId = {}; out.sectional.concat(out.sofa).forEach(function(x){ out.byId[x.c.id] = x; });
  CACHE = out; return out;
}

window.CG = {
  BASE: BASE, D: D, RET: RET, ALL: ALL, BYID: BYID, ED: ED, S: S, K: K, DEF_SETTINGS: DEF_SETTINGS, DEF_WEIGHTS: DEF_WEIGHTS, BASELINE: BASELINE,
  esc: esc, $: $, num: num, get: get, money: money, inch: inch, plural: plural, d0: d0, today: today, addDays: addDays, diffDays: diffDays, iso: iso,
  fmtD: fmtD, fmtDY: fmtDY, fmtRange: fmtRange, safeUrl: safeUrl, lsGet: lsGet, lsSet: lsSet, jget: jget, jset: jset, nowISO: nowISO,
  setting: setting, setSetting: setSetting, note: note, setNote: setNote, saveUI: saveUI, setWho: setWho, mergeNotes: mergeNotes, mergeSettings: mergeSettings,
  computeAll: computeAll, cache: function(){ return CACHE || computeAll(); }, targetT: targetT, effectivePrice: effectivePrice, arrival: arrival,
  offerRows: offerRows, bestOffer: bestOffer, amort: amort, retailerOf: retailerOf, deliveryUsd: deliveryUsd, isUnverified: isUnverified,
  ARRIVE_LABEL: ARRIVE_LABEL, ARRIVE_CLS: ARRIVE_CLS, AGREE_LABEL: AGREE_LABEL, prevVisit: prevVisit
};
})();
