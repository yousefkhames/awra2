const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' });
  const p = await b.newPage(); const B = process.argv[2];
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await p.goto(B, { waitUntil: 'networkidle0' });
  const d = n => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
  await p.evaluate(dd => localStorage.setItem('awra2.v1', JSON.stringify({ lang: 'ar', checks: { p1: true, p3: true }, steps: { 'passport.first.s0': true }, flags: { passport: { male: true } }, speed: { 'passport.first': 'u' }, dates: dd })), { id: d(45), passport: d(900), license: d(-12) });
  await p.goto(B, { waitUntil: 'networkidle0' }); await p.screenshot({ path: 'docs/home.png' });
  await p.goto(B + '#/doc/passport/first', { waitUntil: 'networkidle0' }); await p.evaluate(() => window.scrollTo(0, 0)); await p.screenshot({ path: 'docs/guide.png' });
  await p.goto(B + '#/dates', { waitUntil: 'networkidle0' }); await p.screenshot({ path: 'docs/dates.png' });
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('awra2.v1')); s.lang = 'en'; localStorage.setItem('awra2.v1', JSON.stringify(s)); });
  await p.goto(B + '#/doc/license/first', { waitUntil: 'networkidle0' }); await p.reload({ waitUntil: 'networkidle0' }); await p.screenshot({ path: 'docs/guide-en.png' });
  await b.close();
})();
