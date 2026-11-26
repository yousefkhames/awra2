(function () {
  'use strict';
  var D = window.AwraData;
  var KEY = 'awra2.v1';
  var UI = {
    skip: ['تخطَّ إلى المحتوى', 'Skip to content'],
    nav_home: ['الرئيسية', 'Home'], nav_dates: ['تواريخي', 'My dates'],
    foot1: ['دليل مجمّع من مصادر منشورة. الرسوم والقواعد تتغير، تأكد من الجهة المختصة قبل الذهاب.', 'A guide compiled from published sources. Fees and rules change, confirm with the authority before you go.'],
    foot2: ['مشروع تجريبي مستقل، وليس موقعًا حكوميًا. بياناتك تُحفظ في متصفحك فقط.', 'An independent demo project, not a government site. Your data stays in your browser only.'],
    hero_h: ['أوراقك جاهزة قبل ما تروح الشباك', 'Your papers ready before you reach the counter'],
    hero_p: ['خطوات وأوراق ورسوم البطاقة والجواز والرخصة، مع قائمة تطبعها وتاخدها معاك.', 'Steps, papers and fees for the ID, passport and license, with a checklist you can print and carry.'],
    pick: ['اختر ما تريد استخراجه', 'What do you need?'],
    ready: ['جاهز', 'ready'], papers_n: ['أوراق', 'papers'],
    dates_cta_h: ['تواريخ انتهاء أوراقك', 'Your expiry dates'],
    dates_cta_p: ['سجّل تواريخ الانتهاء ونذكّرك بالأيام المتبقية.', 'Save your expiry dates and see the days left.'],
    open: ['افتح', 'Open'],
    back: ['رجوع', 'Back'],
    who: ['حالتك', 'Your case'],
    f_male: ['ذكر (موقف التجنيد)', 'Male (military status)'], f_married: ['متزوج أو متزوجة', 'Married'],
    f_minor: ['أقل من 16 عامًا', 'Under 16'], f_noqual: ['المؤهل غير مسجل في البطاقة', 'Qualification not on ID'],
    steps: ['الخطوات', 'Steps'], papers: ['الأوراق المطلوبة', 'Papers to bring'], fees: ['الرسوم', 'Fees'],
    notes: ['ملاحظات', 'Notes'], sources: ['المصادر', 'Sources'], where: ['الجهة', 'Where'],
    total: ['الإجمالي', 'Total'], egp: ['جنيه', 'EGP'], nofee: ['لا نذكر رقمًا: لم نتأكد منه من مصدر موثوق.', 'No figure given: we could not confirm one from a reliable source.'],
    unverified: ['غير مؤكد', 'unverified'], official: ['حكومي', 'official'], media: ['صحافة', 'press'],
    checked: ['تاريخ الاطلاع', 'checked'], pub: ['نُشر', 'published'],
    print: ['اطبع القائمة', 'Print checklist'], copy: ['انسخ كنص', 'Copy as text'], copied: ['تم النسخ', 'Copied'], reset: ['ابدأ من جديد', 'Reset this list'],
    warn: ['الرسوم والقواعد تتغير. هذه الأرقام من مصادر منشورة بتاريخ الاطلاع المذكور، وليست قرارًا رسميًا. اسأل الجهة المختصة قبل الدفع.', 'Fees and rules change. These figures come from published sources as of the date checked, not an official ruling. Ask the authority before paying.'],
    dates_h: ['تواريخ انتهاء أوراقك', 'My expiry dates'],
    dates_p: ['اكتب تاريخ الانتهاء المطبوع على كل وثيقة. يُحفظ في هذا المتصفح فقط.', 'Enter the expiry date printed on each document. It is saved in this browser only.'],
    expiry: ['تاريخ الانتهاء', 'Expiry date'], days_left: ['يوم متبقٍ', 'days left'], expired_ago: ['انتهت منذ', 'expired'], days: ['يومًا', 'days'],
    s_ok: ['سارية', 'valid'], s_soon: ['قاربت على الانتهاء', 'expires soon'], s_expired: ['منتهية', 'expired'], s_none: ['لم تُسجَّل', 'not set'],
    start_renew: ['ابدأ التجديد', 'Start renewal'], remind: ['أضف تذكيرًا للتقويم', 'Add calendar reminder'],
    clear: ['مسح', 'Clear'], soon_note: ['نعتبرها قاربت على الانتهاء قبل 90 يومًا.', 'We flag a document 90 days before it expires.'],
    cl_title: ['قائمة', 'Checklist'], cl_date: ['تاريخ الإعداد', 'Prepared'], cl_steps: ['الخطوات', 'Steps'],
    cl_foot: ['من أوراق (Awra2). الرسوم والقواعد تتغير، تأكد من الجهة المختصة.', 'From Awra2. Fees and rules change, confirm with the authority.'],
    prog: ['أوراق جاهزة', 'papers ready']
  };
  var FLAGS = {
    id: ['married'], passport: ['male', 'married', 'minor', 'noqual'], license: []
  };

  var state = load();
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') return Object.assign({ lang: 'ar', checks: {}, steps: {}, flags: {}, speed: {}, dates: {} }, s); } catch (e) {}
    return { lang: 'ar', checks: {}, steps: {}, flags: {}, speed: {}, dates: {} };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var ar = function () { return state.lang === 'ar'; };
  function u(k) { return UI[k][ar() ? 0 : 1]; }
  function L(o) { return o[state.lang]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function num(n) { return Number(n).toLocaleString(ar() ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }); }
  function money(n) { return num(n) + ' ' + u('egp'); }
  function icon(name) {
    var m = {
      id: '<svg viewBox="0 0 64 44" aria-hidden="true"><rect x="2" y="2" width="60" height="40" rx="6" fill="#fff" stroke="currentColor" stroke-width="3"/><circle cx="19" cy="18" r="6" fill="currentColor"/><path d="M8 34c2-7 16-7 22 0z" fill="currentColor"/><rect x="36" y="12" width="20" height="3.5" rx="1.7" fill="currentColor"/><rect x="36" y="20" width="16" height="3.5" rx="1.7" fill="currentColor" opacity=".6"/><rect x="36" y="28" width="12" height="3.5" rx="1.7" fill="currentColor" opacity=".35"/></svg>',
      passport: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="3" width="44" height="58" rx="6" fill="currentColor"/><circle cx="32" cy="27" r="11" fill="none" stroke="#f4ecd8" stroke-width="2.5"/><path d="M21 27h22M32 16c-5 6-5 16 0 22M32 16c5 6 5 16 0 22" fill="none" stroke="#f4ecd8" stroke-width="2"/><rect x="21" y="45" width="22" height="3.5" rx="1.7" fill="#f4ecd8"/></svg>',
      license: '<svg viewBox="0 0 64 44" aria-hidden="true"><rect x="2" y="2" width="60" height="40" rx="6" fill="#fff" stroke="currentColor" stroke-width="3"/><rect x="8" y="9" width="18" height="22" rx="3" fill="currentColor"/><circle cx="46" cy="19" r="9" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="46" cy="19" r="2.5" fill="currentColor"/><path d="M46 10v6M38 24l5-3M54 24l-5-3" stroke="currentColor" stroke-width="2.5"/><rect x="31" y="34" width="26" height="3" rx="1.5" fill="currentColor" opacity=".4"/></svg>'
    };
    return m[name] || '';
  }

  function ck(id) { return !!state.checks[id]; }
  function flagsFor(docId) { var f = state.flags[docId] || {}; return f; }
  function progress(docId, sKey) {
    var sc = D.DOCS[docId].scenarios[sKey];
    var list = D.visiblePapers(sc, flagsFor(docId)).filter(function (p) { return !p.unverified; });
    var done = list.filter(function (p) { return ck(p.id); }).length;
    return { done: done, total: list.length };
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, '').split('/');
    if (h[0] === 'doc' && D.DOCS[h[1]]) {
      var s = D.DOCS[h[1]].scenarios[h[2]] ? h[2] : 'first';
      return { v: 'doc', doc: h[1], scen: s };
    }
    if (h[0] === 'dates') return { v: 'dates' };
    return { v: 'home' };
  }

  function render() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = ar() ? 'rtl' : 'ltr';
    document.getElementById('lang').textContent = ar() ? 'EN' : 'عربي';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (UI[k]) el.textContent = u(k); });
    var r = route();
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === (r.v === 'dates' ? 'dates' : 'home')); });
    var m = document.getElementById('main');
    m.innerHTML = r.v === 'home' ? home() : r.v === 'doc' ? doc(r.doc, r.scen) : dates();
    document.title = (r.v === 'doc' ? L(D.DOCS[r.doc].name) + ' | ' : '') + 'أوراق | Awra2';
  }

  function home() {
    var cards = Object.keys(D.DOCS).map(function (id) {
      var d = D.DOCS[id];
      var rows = Object.keys(d.scenarios).map(function (k) {
        var p = progress(id, k);
        return '<a class="chip" href="#/doc/' + id + '/' + k + '"><span>' + esc(L(d.scenarios[k].title)) + '</span>' + (p.done ? '<em>' + num(p.done) + '/' + num(p.total) + '</em>' : '') + '</a>';
      }).join('');
      return '<article class="folder f-' + id + '"><div class="tab">' + esc(L(d.name)) + '</div><div class="fbody"><div class="ficon">' + icon(d.icon) + '</div><h2>' + esc(L(d.name)) + '</h2><p>' + esc(L(d.blurb)) + '</p><div class="chips">' + rows + '</div></div></article>';
    }).join('');
    return '<section class="hero"><div class="stampmark" aria-hidden="true"><span>✓</span></div><h1>' + u('hero_h') + '</h1><p>' + u('hero_p') + '</p></section>' +
      '<h2 class="sec">' + u('pick') + '</h2><div class="folders">' + cards + '</div>' +
      '<a class="datesband" href="#/dates"><div><h3>' + u('dates_cta_h') + '</h3><p>' + u('dates_cta_p') + '</p></div><span class="btn">' + u('open') + '</span></a>' +
      '<p class="warn">' + u('warn') + '</p>';
  }

  function doc(id, sKey) {
    var d = D.DOCS[id], sc = d.scenarios[sKey], f = flagsFor(id);
    var tabs = Object.keys(d.scenarios).map(function (k) {
      return '<a role="tab" aria-selected="' + (k === sKey) + '" class="tabbtn' + (k === sKey ? ' on' : '') + '" href="#/doc/' + id + '/' + k + '">' + esc(L(d.scenarios[k].title)) + '</a>';
    }).join('');
    var flagHtml = FLAGS[id].length ? '<div class="flags"><span>' + u('who') + '</span>' + FLAGS[id].map(function (k) {
      return '<label class="flag"><input type="checkbox" data-flag="' + k + '"' + (f[k] ? ' checked' : '') + '><span>' + u('f_' + k) + '</span></label>';
    }).join('') + '</div>' : '';
    var vis = D.visiblePapers(sc, f), p = progress(id, sKey);
    var pct = p.total ? Math.round(p.done / p.total * 100) : 0;
    var steps = sc.steps.map(function (s, i) {
      var key = id + '.' + sKey + '.s' + i;
      return '<li class="step' + (state.steps[key] ? ' done' : '') + '"><label><input type="checkbox" data-step="' + key + '"' + (state.steps[key] ? ' checked' : '') + '><span class="n">' + num(i + 1) + '</span><span class="tx">' + esc(L(s)) + '</span></label></li>';
    }).join('');
    var papers = vis.map(function (x) {
      return '<li class="paper' + (ck(x.id) ? ' done' : '') + (x.unverified ? ' unv' : '') + '"><label><input type="checkbox" data-check="' + x.id + '"' + (ck(x.id) ? ' checked' : '') + '><span class="box"></span><span class="tx">' + esc(L(x.t)) + (x.unverified ? ' <b class="badge warnb">' + u('unverified') + '</b>' : '') + '</span></label></li>';
    }).join('');
    var feeHtml;
    if (sc.feeMode === 'none') feeHtml = '<p class="nofee">' + u('nofee') + '</p>';
    else {
      var choice = state.speed[id + '.' + sKey] || (sc.fees[0] && sc.fees[0].id);
      var rows = sc.fees.map(function (x) {
        if (sc.feeMode === 'options') {
          return '<li><label class="fee"><input type="radio" name="speed" data-speed="' + x.id + '"' + (x.id === choice ? ' checked' : '') + '><span class="tx">' + esc(L(x.t)) + '</span><b>' + money(x.a) + '</b></label></li>';
        }
        return '<li><div class="fee"><span class="tx">' + esc(L(x.t)) + '</span><b>' + money(x.a) + '</b></div></li>';
      }).join('');
      feeHtml = '<ul class="fees">' + rows + '</ul><div class="total"><span>' + u('total') + '</span><strong id="total">' + money(D.feeTotal(sc, choice)) + '</strong></div>';
    }
    var notes = sc.notes.map(function (n) { return '<li>' + esc(L(n)) + '</li>'; }).join('');
    var srcs = sc.src.map(function (k) {
      var s = D.SOURCES[k];
      return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + esc(L(s.t)) + '</a> <span class="badge' + (s.official ? ' off' : '') + '">' + u(s.official ? 'official' : 'media') + '</span><small>' + u('checked') + ': ' + D.CHECKED + (s.pub ? ' · ' + u('pub') + ': ' + s.pub : '') + '</small></li>';
    }).join('');
    return '<a class="back" href="#/">' + (ar() ? '→ ' : '← ') + u('back') + '</a>' +
      '<header class="dochead f-' + id + '"><div class="ficon">' + icon(d.icon) + '</div><div><h1>' + esc(L(d.name)) + '</h1><p>' + u('where') + ': ' + esc(L(d.where)) + '</p></div></header>' +
      '<div class="tabs" role="tablist">' + tabs + '</div>' + flagHtml +
      '<div class="progress" aria-label="' + u('prog') + '"><div class="bar"><i style="width:' + pct + '%"></i></div><span id="progtxt">' + num(p.done) + ' / ' + num(p.total) + ' ' + u('prog') + '</span></div>' +
      '<div class="grid"><section class="card"><h2>' + u('steps') + '</h2><ol class="steps">' + steps + '</ol></section>' +
      '<section class="card"><h2>' + u('papers') + '</h2><ul class="papers">' + papers + '</ul></section>' +
      '<section class="card"><h2>' + u('fees') + '</h2>' + feeHtml + '<ul class="notes">' + notes + '</ul></section></div>' +
      '<div class="actions"><button class="btn" data-act="print">' + u('print') + '</button><button class="btn ghost" data-act="copy">' + u('copy') + '</button><button class="btn ghost" data-act="reset">' + u('reset') + '</button><span id="msg" role="status"></span></div>' +
      '<p class="warn">' + u('warn') + '</p>' +
      '<section class="card srcs"><h2>' + u('sources') + '</h2><ul>' + srcs + '</ul></section>';
  }

  var DATEDOCS = [['id', 'id_exp'], ['passport', 'passport_exp'], ['license', 'license_exp']];
  function dates() {
    var cards = DATEDOCS.map(function (x) {
      var id = x[0], v = state.dates[id] || '';
      var dl = D.daysLeft(v), st = D.status(dl);
      var line = st === 'none' ? '' : dl < 0 ? u('expired_ago') + ' ' + num(-dl) + ' ' + u('days') : num(dl) + ' ' + u('days_left');
      return '<article class="dcard st-' + st + '" data-doc="' + id + '"><div class="ficon">' + icon(D.DOCS[id].icon) + '</div><h3>' + esc(L(D.DOCS[id].name)) + '</h3>' +
        '<label class="dlab">' + u('expiry') + '<input type="date" data-date="' + id + '" value="' + esc(v) + '"></label>' +
        '<div class="pill st">' + u('s_' + st) + '</div><div class="dleft">' + line + '</div>' +
        '<div class="dact">' + (st === 'soon' || st === 'expired' ? '<a class="btn small" href="#/doc/' + id + '/renew">' + u('start_renew') + '</a>' : '') +
        (v ? '<button class="btn ghost small" data-ics="' + id + '">' + u('remind') + '</button><button class="btn ghost small" data-clear="' + id + '">' + u('clear') + '</button>' : '') + '</div></article>';
    }).join('');
    return '<h1 class="h1">' + u('dates_h') + '</h1><p class="lead">' + u('dates_p') + '</p><div class="dgrid">' + cards + '</div><p class="warn">' + u('soon_note') + '</p>';
  }

  function checklistText(id, sKey) {
    var d = D.DOCS[id], sc = d.scenarios[sKey];
    var lines = [L(d.name) + ' - ' + L(sc.title), ''];
    lines.push(u('papers') + ':');
    D.visiblePapers(sc, flagsFor(id)).forEach(function (p) { lines.push((ck(p.id) ? '[x] ' : '[ ] ') + L(p.t)); });
    lines.push('', u('steps') + ':');
    sc.steps.forEach(function (s, i) { lines.push((i + 1) + '. ' + L(s)); });
    if (sc.feeMode !== 'none') {
      lines.push('', u('fees') + ':');
      var ch = state.speed[id + '.' + sKey] || sc.fees[0].id;
      if (sc.feeMode === 'itemized') sc.fees.forEach(function (f) { lines.push('- ' + L(f.t) + ': ' + money(f.a)); });
      else sc.fees.forEach(function (f) { lines.push((f.id === ch ? '* ' : '- ') + L(f.t) + ': ' + money(f.a)); });
      lines.push(u('total') + ': ' + money(D.feeTotal(sc, ch)));
    }
    lines.push('', u('warn'), u('checked') + ': ' + D.CHECKED);
    return lines.join('\n');
  }
  function printHtml(id, sKey) {
    var d = D.DOCS[id], sc = d.scenarios[sKey], ch = state.speed[id + '.' + sKey] || (sc.fees[0] && sc.fees[0].id);
    var fee = sc.feeMode === 'none' ? '<p>' + u('nofee') + '</p>' : '<table>' + sc.fees.filter(function (f) { return sc.feeMode === 'itemized' || f.id === ch; }).map(function (f) { return '<tr><td>' + esc(L(f.t)) + '</td><td>' + money(f.a) + '</td></tr>'; }).join('') + '<tr class="t"><td>' + u('total') + '</td><td>' + money(D.feeTotal(sc, ch)) + '</td></tr></table>';
    return '<div class="ph"><img src="assets/logo.svg" alt="" width="44" height="44"><div><h1>' + esc(L(d.name)) + ': ' + esc(L(sc.title)) + '</h1><small>' + u('cl_date') + ': ' + new Date().toISOString().slice(0, 10) + ' · ' + u('checked') + ': ' + D.CHECKED + '</small></div></div>' +
      '<h2>' + u('papers') + '</h2><ul class="pl">' + D.visiblePapers(sc, flagsFor(id)).map(function (p) { return '<li><span class="cb"></span>' + esc(L(p.t)) + '</li>'; }).join('') + '</ul>' +
      '<h2>' + u('steps') + '</h2><ol>' + sc.steps.map(function (s) { return '<li>' + esc(L(s)) + '</li>'; }).join('') + '</ol>' +
      '<h2>' + u('fees') + '</h2>' + fee +
      '<h2>' + u('sources') + '</h2><ul class="sl">' + sc.src.map(function (k) { return '<li>' + esc(L(D.SOURCES[k].t)) + ' - ' + D.SOURCES[k].url + '</li>'; }).join('') + '</ul>' +
      '<p class="pw">' + u('warn') + '</p><p class="pw">' + u('cl_foot') + '</p>';
  }
  function icsFor(id) {
    var v = state.dates[id]; if (!v) return;
    var d = new Date(v + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() - 60);
    var s = d.toISOString().slice(0, 10).replace(/-/g, '');
    var e = new Date(d.getTime() + 86400000).toISOString().slice(0, 10).replace(/-/g, '');
    var t = 'Renew: ' + D.DOCS[id].name.en + ' / تجديد: ' + D.DOCS[id].name.ar;
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Awra2//EN', 'BEGIN:VEVENT', 'UID:awra2-' + id + '-' + v + '@local', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z', 'DTSTART;VALUE=DATE:' + s, 'DTEND;VALUE=DATE:' + e, 'SUMMARY:' + t, 'DESCRIPTION:Expires ' + v + '. 60 days left.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'awra2-' + id + '-reminder.ics';
    document.body.appendChild(a); a.click(); a.remove();
  }

  document.addEventListener('change', function (e) {
    var t = e.target, r = route();
    if (t.dataset.check) { state.checks[t.dataset.check] = t.checked; save(); render(); focusBack(t.dataset.check, 'check'); }
    else if (t.dataset.step) { state.steps[t.dataset.step] = t.checked; save(); render(); focusBack(t.dataset.step, 'step'); }
    else if (t.dataset.flag) { state.flags[r.doc] = state.flags[r.doc] || {}; state.flags[r.doc][t.dataset.flag] = t.checked; save(); render(); }
    else if (t.dataset.speed) { state.speed[r.doc + '.' + r.scen] = t.dataset.speed; save(); render(); }
    else if (t.dataset.date) { state.dates[t.dataset.date] = t.value; save(); render(); }
  });
  function focusBack(id, kind) { var el = document.querySelector('[data-' + kind + '="' + id + '"]'); if (el) el.focus(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var r = route();
    if (b.id === 'lang') { state.lang = ar() ? 'en' : 'ar'; save(); render(); return; }
    if (b.dataset.act === 'print') { document.getElementById('printarea').innerHTML = printHtml(r.doc, r.scen); window.print(); }
    else if (b.dataset.act === 'copy') {
      var txt = checklistText(r.doc, r.scen);
      var done = function () { var m = document.getElementById('msg'); if (m) m.textContent = u('copied'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt); done(); });
      else { fallbackCopy(txt); done(); }
      window.__lastCopy = txt;
    } else if (b.dataset.act === 'reset') {
      var sc = D.DOCS[r.doc].scenarios[r.scen];
      sc.papers.forEach(function (p) { delete state.checks[p.id]; });
      sc.steps.forEach(function (_, i) { delete state.steps[r.doc + '.' + r.scen + '.s' + i]; });
      save(); render();
    } else if (b.dataset.ics) icsFor(b.dataset.ics);
    else if (b.dataset.clear) { delete state.dates[b.dataset.clear]; save(); render(); }
  });
  function fallbackCopy(t) { var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); }

  window.addEventListener('hashchange', function () { render(); window.scrollTo(0, 0); });
  render();
})();
