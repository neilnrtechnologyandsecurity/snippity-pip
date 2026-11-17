// Audit the generated output without changing it.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sitemap = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 14);
assert.equal(new Set(urls).size, 14);
const titles = new Set(), descriptions = new Set();
let images = 0, links = 0;
for (const url of urls) {
  const u = new URL(url);
  assert.equal(u.origin, 'https://thesnippitypip.co.uk');
  assert(!u.pathname.endsWith('.html'), 'Sitemap should use final clean URLs');
  const file = u.pathname === '/' ? 'index.html' : u.pathname.slice(1) + '.html';
  const html = readFileSync(path.join(dist, file), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, file + ': one H1');
  assert.equal((html.match(/<title>/g) || []).length, 1);
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
  assert(!titles.has(title), file + ': duplicate title');
  assert(!descriptions.has(description), file + ': duplicate description');
  titles.add(title); descriptions.add(description);
  assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)[1], url);
  assert.equal(html.match(/<meta property="og:url" content="([^"]+)"/)[1], url);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), file + ': public page noindex');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json" id="site-schema">([\s\S]*?)<\/script>/g)];
  assert.equal(schemas.length, 1, file + ': schema count');
  const schema = JSON.parse(schemas[0][1]);
  const salon = schema['@graph'].find(n => n['@type'] === 'HairSalon');
  assert(!('address' in salon), file + ': street address must not be published');
  assert(!('telephone' in salon), file + ': phone must not be published');
  assert(!JSON.stringify(schema).includes('aggregateRating'));
  assert(!/href="tel:|<address\b|"streetAddress"|"postalCode"|"telephone"/.test(html), file + ': unapproved contact details');
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0]; images++;
    assert(/\balt="[^"]*"/.test(tag), file + ': image alt missing');
    assert(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), file + ': dimensions missing');
    const src = tag.match(/\bsrc="([^"]+)"/)[1];
    assert(existsSync(path.join(dist, src)), 'Missing image ' + src);
    for (const entry of (tag.match(/\bsrcset="([^"]+)"/)?.[1] || '').split(',')) {
      if (entry.trim()) assert(existsSync(path.join(dist, entry.trim().split(' ')[0])), 'Missing responsive image');
    }
    assert(!tag.includes('fetchpriority="high"') || !tag.includes('loading="lazy"'));
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1]; links++;
    if (target === '/') continue;
    assert(!['/portal', '/portal.html', '/classroom', '/classroom.html'].includes(target), file + ': private page linked');
    assert(existsSync(path.join(dist, target)) || existsSync(path.join(dist, target + '.html')), file + ': broken local URL ' + target);
  }
}
const contact = readFileSync(path.join(dist, 'contact.html'), 'utf8');
assert(contact.includes('17:00 – 19:00') && contact.includes('17:00 – 20:00'));
assert.equal((contact.match(/id="salon-directions"/g) || []).length, 0);
const academy = readFileSync(path.join(dist, 'academy.html'), 'utf8');
assert(academy.includes('waitlist.js') && academy.includes('coming soon'));
const shop = readFileSync(path.join(dist, 'shop.html'), 'utf8');
assert(!shop.includes('src="/shop.js"'), 'Do not launch demo checkout');
assert(/noindex/.test(readFileSync(path.join(dist, 'portal.html'), 'utf8')));
assert(/noindex/.test(readFileSync(path.join(dist, 'classroom.html'), 'utf8')));
const worker = (await import('../src/worker.js')).default;
for (const endpoint of ['/portal', '/portal/', '/portal.html', '/classroom', '/classroom/', '/classroom.html']) {
  const response = await worker.fetch(new Request('https://thesnippitypip.co.uk' + endpoint), { ASSETS: { fetch() { throw new Error('Private demo exposed: ' + endpoint); } } });
  assert.equal(response.status, 404);
  assert(response.headers.get('x-robots-tag').includes('noindex'));
}
console.log(`SEO audit passed: ${urls.length} pages, ${images} image references, ${links} local links/assets, valid structured data and six blocked private URL variants.`);
