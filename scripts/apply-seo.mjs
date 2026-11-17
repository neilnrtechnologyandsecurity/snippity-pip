// Final, idempotent SEO pass over the generated public site. No dependencies.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const origin = 'https://thesnippitypip.co.uk';
const book = 'https://bookings.gettimely.com/thesnippitypip/bb/book';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export const pages = {
  'index.html': {
    title: 'Hairdresser in Saltash | The Snippitypip',
    description: 'Personal hairdressing with Pippin in Saltash, Cornwall. Discover cuts, colour, hair extensions, bridal styling and scalp care. Book your appointment online.',
    label: 'Home', heading: 'Hairdressing<br>in Saltash.<br><em>Your way.</em>',
    intro: 'Personal, one-to-one hairdressing in Saltash, Cornwall. From a fresh cut and colour to extensions and bridal styling, Pippin helps you find hair that feels like you.'
  },
  'salon.html': {
    title: 'Hair Salon & Services in Saltash | The Snippitypip',
    description: 'Explore haircuts, colouring, blow dries, bridal hair, extensions, mesh integration and scalp therapy in Saltash. Personal appointments with Pippin.',
    label: 'The salon', heading: 'Your Saltash<br>hair salon.<br><em>Your time.</em>',
    intro: 'Thoughtful, one-to-one hairdressing in Saltash, Cornwall. Explore cutting, colour, extensions and specialist hair services, with time to feel listened to and looked after.'
  },
  'cutting-styling.html': {
    title: 'Haircuts & Styling in Saltash | The Snippitypip',
    description: 'Find a haircut that suits your hair and everyday routine. Personal cutting and styling with Pippin in Saltash, Cornwall. View appointments and prices online.',
    label: 'Cutting & styling', service: 'Hair cutting and styling', heading: 'Haircuts &amp; styling<br><em>in Saltash.</em>',
    intro: 'A fresh shape, a little maintenance or a complete restyle. Pippin offers personal cutting and styling in Saltash, with a consultation to understand your hair and routine.'
  },
  'hair-colouring.html': {
    title: 'Hair Colouring in Saltash | The Snippitypip',
    description: 'Explore personalised hair colouring with Pippin in Saltash. Discuss your colour goals, consultation, preparation and aftercare before booking your appointment.',
    label: 'Hair colouring', service: 'Hair colouring', heading: 'Hair colouring<br><em>in Saltash.</em>',
    intro: 'Colour should feel like you. Explore personal hair colouring in Saltash with Pippin, with time to discuss your shade, hair history, upkeep and preparation.'
  },
  'blow-dries-styling.html': {
    title: 'Bridal Hair & Blow Dries in Saltash | The Snippitypip',
    description: 'Blow dries, occasion styling and bridal hair with Pippin in Saltash. Discuss your wedding look, bridal party and styling at your chosen wedding-day location.',
    label: 'Blow dries & bridal hair', service: 'Blow dries, bridal and occasion hair', heading: 'Blow dries &amp;<br>bridal hair <em>in Saltash.</em>',
    intro: 'From a salon blow-dry in Saltash to hair for your wedding day, Pippin creates a finish that feels like you. Explore occasion styling and personal bridal packages.'
  },
  'hair-extensions.html': {
    title: 'Hair Extensions in Saltash | The Snippitypip',
    description: 'Discover Nanos, Ultra Tips and Weft hair extensions in Saltash. Consult Pippin about colour matching, fitting, maintenance and professional extension removal.',
    label: 'Hair extensions', service: 'Hair extensions', heading: 'Hair extensions<br><em>in Saltash.</em>',
    intro: 'Explore extra length and fullness with hair extensions in Saltash. Pippin works with Nanos, Ultra Tips and Wefts, choosing a method and colour match around you.'
  },
  'mesh-integration.html': {
    title: 'Mesh Hair Integration in Saltash | The Snippitypip',
    description: 'Explore mesh hair integration in Saltash for fuller-looking hair. A private consultation with Pippin covers suitability, fitting, maintenance and aftercare.',
    label: 'Mesh integration', service: 'Mesh hair integration', heading: 'Mesh hair integration<br><em>in Saltash.</em>',
    intro: 'A supportive, personal approach to fuller-looking hair in Saltash. Talk to Pippin about mesh integration, suitability and the care involved in a private consultation.'
  },
  'scalp-therapy.html': {
    title: 'Head Lab Scalp Therapy in Saltash | The Snippitypip',
    description: 'Discover Malibu C Head Lab scalp therapy in Saltash. Personal cosmetic scalp care, cleansing and aftercare advice from trained Hair and Scalp Practitioner Pippin.',
    label: 'Scalp therapy', service: 'Malibu C Head Lab scalp therapy', heading: 'Head Lab scalp therapy<br><em>in Saltash.</em>',
    intro: 'Give your scalp a little care with Malibu C Head Lab in Saltash. Pippin combines a personal consultation with cosmetic scalp cleansing, conditioning and aftercare advice.'
  },
  'haircare.html': {
    title: 'Haircare & GLOWWA Advice in Saltash | The Snippitypip',
    description: 'Ask Pippin in Saltash about haircare, colour and extension aftercare, professional styling products and GLOWWA. Find a home routine that suits your hair.',
    label: 'Haircare & GLOWWA', heading: 'Haircare advice<br><em>from Saltash.</em>',
    intro: 'Personal haircare advice from Pippin in Saltash. Explore colour and extension aftercare, professional products and GLOWWA, with a routine that suits your individual needs.'
  },
  'about.html': {
    title: 'Meet Pippin, Saltash Hairdresser | The Snippitypip',
    description: 'Meet Pippin, the Saltash hairdresser behind The Snippitypip. Over 20 years of experience, personal hairdressing, extension expertise and cosmetic scalp care.',
    label: 'Meet Pippin', heading: 'Meet Pippin.<br><em>Your Saltash hairdresser.</em>',
    intro: 'More than 20 years of hairdressing experience, a personal approach and a warm welcome in Saltash, Cornwall.'
  },
  'contact.html': {
    title: 'Contact & Book in Saltash | The Snippitypip',
    description: 'Find The Snippitypip at 5 Brookdown Terrace, Saltash PL12 6HU. Call 07826 847068, enquire about your hair or book an appointment through Timely.',
    label: 'Contact & appointments', heading: 'Visit us in Saltash.<br><em>Let’s talk hair.</em>',
    intro: 'Book an appointment, ask Pippin about a hair service or enquire about the upcoming training academy. Find The Snippitypip in Saltash, Cornwall.'
  },
  'academy.html': {
    title: 'Hair Training Academy: Coming Soon | The Snippitypip',
    description: 'The Snippitypip Training Academy is coming soon from Saltash hairdresser Pippin. Join the waiting list for Hair Cutting and Hair Extensions course updates.',
    label: 'Training academy'
  },
  'shop.html': {
    title: 'Haircare Store: Coming Soon | The Snippitypip',
    description: 'The Snippitypip online haircare store is coming soon. Ask Pippin about haircare advice or purchase a salon gift voucher through the existing Timely booking site.',
    label: 'Online store · coming soon'
  },
  'privacy.html': {
    title: 'Privacy & Cookies | The Snippitypip',
    description: 'How The Snippitypip handles website enquiries, academy waiting-list details, cookies and links to external services such as Timely.',
    label: 'Privacy & cookies'
  }
};
const urlFor = name => origin + (name === 'index.html' ? '/' : '/' + name.replace(/\.html$/, ''));
const hours = [
  ['Monday', '09:00', '17:00'], ['Tuesday', '09:00', '17:00'],
  ['Wednesday', '17:00', '19:00'], ['Thursday', '17:00', '20:00'],
  ['Friday', '09:00', '17:00'], ['Saturday', '09:00', '13:00']
];
const address = { '@type': 'PostalAddress', streetAddress: '5 Brookdown Terrace', addressLocality: 'Saltash', addressRegion: 'Cornwall', postalCode: 'PL12 6HU', addressCountry: 'GB' };
const business = {
  '@type': 'HairSalon', '@id': origin + '/#salon', name: 'The Snippitypip',
  url: origin + '/', image: origin + '/assets/salon-hero-1280.webp',
  logo: origin + '/assets/salon-logo-small.webp', telephone: '+447826847068',
  email: 'thesnippitypip@hotmail.com', address,
  description: 'Personal, one-to-one hairdressing with Pippin in Saltash, Cornwall, including cuts, colour, extensions, bridal styling and cosmetic scalp care.',
  areaServed: { '@type': 'City', name: 'Saltash' },
  sameAs: ['https://www.instagram.com/thesnippitypip/', 'https://www.facebook.com/p/Thesnippitypip-100064112289747/', 'https://www.tiktok.com/@thesnippitypip', 'https://thesnippitypip.gettimely.com/'],
  openingHoursSpecification: hours.map(([day, opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/' + day, opens, closes })),
  potentialAction: { '@type': 'ReserveAction', target: book }
};
function schema(name, page) {
  const url = urlFor(name);
  const nodes = [business,
    { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: 'The Snippitypip', publisher: { '@id': business['@id'] }, inLanguage: 'en-GB' },
    { '@type': name === 'contact.html' ? 'ContactPage' : name === 'about.html' ? 'AboutPage' : 'WebPage', '@id': url + '#webpage', url, name: page.title, description: page.description, isPartOf: { '@id': origin + '/#website' }, about: { '@id': business['@id'] }, inLanguage: 'en-GB' }
  ];
  if (name !== 'index.html') {
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }];
    if (page.service) crumbs.push({ '@type': 'ListItem', position: 2, name: 'The salon', item: urlFor('salon.html') });
    crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: page.label, item: url });
    nodes.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs', itemListElement: crumbs });
    nodes[2].breadcrumb = { '@id': url + '#breadcrumbs' };
  }
  if (page.service) {
    nodes.push({ '@type': 'Service', '@id': url + '#service', name: page.service + ' in Saltash', serviceType: page.service, url, description: page.description, provider: { '@id': business['@id'] }, areaServed: { '@type': 'City', name: 'Saltash' } });
    nodes[2].mainEntity = { '@id': url + '#service' };
  }
  return '<script type="application/ld+json" id="site-schema">' + JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replaceAll('<', '\\u003c') + '</script>';
}
const imgSpecs = {
  '/assets/salon-logo-transparent.webp': ['/assets/salon-logo-small.webp', 160, 160],
  '/assets/academy-logo.png': ['/assets/academy-logo-small.webp', 500, 500],
  '/assets/salon-hero.jpg': ['/assets/salon-hero-1280.webp', 1280, 853, '/assets/salon-hero-640.webp 640w, /assets/salon-hero-1280.webp 1280w'],
  '/assets/pippin.jpg': ['/assets/pippin-960.webp', 960, 1280, '/assets/pippin-480.webp 480w, /assets/pippin-960.webp 960w'],
  '/assets/hair.jpg': ['/assets/extension-colour-swatches-1200.webp', 1200, 900, '/assets/extension-colour-swatches-640.webp 640w, /assets/extension-colour-swatches-1200.webp 1200w']
};
function images(html) {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    const spec = imgSpecs[src];
    if (!spec) return tag;
    tag = tag.replace(/\s(?:width|height|decoding|srcset|sizes)="[^"]*"/g, '').replace('src="' + src + '"', 'src="' + spec[0] + '"');
    const sizeAttrs = spec[3] ? ' srcset="' + spec[3] + '" sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 1200px) 45vw, 600px"' : '';
    return tag.replace(/>$/, ` width="${spec[1]}" height="${spec[2]}" decoding="async"${sizeAttrs}>`);
  });
}
for (const [name, page] of Object.entries(pages)) {
  let html = readFileSync(path.join(dist, name), 'utf8');
  // Cloudflare redirects .html to these clean URLs; use the final URL everywhere.
  html = html.replace(/href="\/(index|[a-z][a-z-]*)\.html([?#][^"]*)?"/g, (_, slug, suffix = '') => `href="/${slug === 'index' ? '' : slug}${suffix}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  const replacements = { description: page.description, 'og:title': page.title, 'og:description': page.description, 'og:url': urlFor(name), 'og:image': origin + '/assets/salon-hero-1280.webp' };
  for (const [key, value] of Object.entries(replacements)) {
    html = html.replace(new RegExp(`<meta (?:name|property)="${key}" content="[^"]*">`), `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${esc(value)}">`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${urlFor(name)}">`);
  html = html.replace('<link rel="icon" href="/assets/salon-logo-transparent.webp">', '<link rel="icon" href="/assets/salon-logo-small.webp">');
  html = html.replace(/<script type="application\/ld\+json" id="site-schema">[\s\S]*?<\/script>/g, '').replace(/<!-- SEO extras -->[\s\S]*?<!-- End SEO extras -->/g, '');
  const extras = '<!-- SEO extras --><meta property="og:site_name" content="The Snippitypip"><meta property="og:locale" content="en_GB"><meta property="og:image:width" content="1280"><meta property="og:image:height" content="853"><meta property="og:image:alt" content="Pippin styling a client’s hair at The Snippitypip"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' + esc(page.title) + '"><meta name="twitter:description" content="' + esc(page.description) + '"><meta name="twitter:image" content="' + origin + '/assets/salon-hero-1280.webp"><meta name="twitter:image:alt" content="Pippin styling a client’s hair at The Snippitypip"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- End SEO extras -->';
  html = html.replace('</head>', extras + schema(name, page) + '</head>');
  if (page.heading) html = html.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${page.heading}</h1>`);
  if (page.intro) html = html.replace(/<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${esc(page.intro)}</p>`);
  html = html.replace('Personal hairdressing. Thoughtful education. Helping you feel confident in your own next chapter.', 'Personal hairdressing in Saltash, Cornwall. Cuts, colour, extensions and care, with a warm welcome from Pippin.');
  html = html.replace('<span>Saltash, Cornwall</span><div class="socials">', '<a href="tel:+447826847068">07826 847068</a><address style="font-style:normal">5 Brookdown Terrace<br>Saltash, Cornwall<br>PL12 6HU</address><div class="socials">');
  html = html.replace('Explore the shop preview', 'Online store · coming soon');
  if (name === 'contact.html') {
    html = html.replace('The Snippitypip is based in Saltash, Cornwall. Your appointment details will confirm where to come.', 'The Snippitypip<br>5 Brookdown Terrace<br>Saltash, Cornwall<br>PL12 6HU');
    if (!html.includes('id="salon-directions"')) html = html.replace('<h3>Find us in Saltash.</h3>', '<h3>Find us in Saltash.</h3><p><a href="tel:+447826847068">Call 07826 847068</a></p>');
    if (!html.includes('id="salon-directions"')) html = html.replace('PL12 6HU</p><div class="socials">', 'PL12 6HU</p><p><a id="salon-directions" class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=5%20Brookdown%20Terrace%2C%20Saltash%2C%20PL12%206HU" target="_blank" rel="noopener noreferrer">Get directions to the salon</a></p><div class="socials">');
    const rows = hours.map(([day, opens, closes]) => `<tr><td>${day}</td><td>${opens} – ${closes}</td></tr>`).join('') + '<tr><td>Sunday</td><td>Closed</td></tr>';
    html = html.replace(/<table class="hours">[\s\S]*?<\/table>/, '<table class="hours"><caption class="sr-only">Salon opening hours — appointments by booking</caption><tbody>' + rows + '</tbody></table>');
    html = html.replace('Please confirm opening hours and availability in the Timely diary.', 'Opening hours match our Timely listing. Appointments are booked in advance; check the live diary for availability.');
  }
  html = images(html);
  writeFileSync(path.join(dist, name), html, 'utf8');
}
writeFileSync(path.join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(pages).map(name => '  <url><loc>' + urlFor(name) + '</loc></url>').join('\n') + '\n</urlset>\n');
writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /portal\nDisallow: /classroom\n\nSitemap: ' + origin + '/sitemap.xml\n');
console.log('Applied local SEO to ' + Object.keys(pages).length + ' public pages.');
