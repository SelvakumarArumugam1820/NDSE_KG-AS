// Generates the static NDSE site into ../public from data.js.
// Usage: node site-src/build.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { company, surveys, markings, projects, clients, equipment, industries } = require('./data');
const { serviceGroups, otherServices, featuredServiceSlugs, projectCats, caseStudies, featuredOld, clientDetails, testimonials, oldFaqs, galleryPhotos, nathan } = require('./content');
const legacy = require('./legacy-pages.json');

const OUT = path.join(__dirname, '..', 'public');
const SITE = company.url;
const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().slice(0, 10);

// Content hash on asset URLs so browsers never pair new pages with a cached old stylesheet or script.
const assetV = (f) => crypto.createHash('md5').update(fs.readFileSync(path.join(OUT, f))).digest('hex').slice(0, 8);
const mapsLink = (o) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.query)}`;
const mapsEmbed = (o) => `https://maps.google.com/maps?q=${encodeURIComponent(o.query)}&z=15&output=embed`;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Icons (small, functional only) ----------
const icon = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V7zm16 2.6-7.5 4.7a1 1 0 0 1-1 0L4 9.6V17h16z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12-.64.8-.79.97-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33a.45.45 0 0 0-.02-.42c-.06-.12-.56-1.34-.76-1.84s-.4-.42-.56-.43h-.47a.9.9 0 0 0-.66.31 2.8 2.8 0 0 0-.86 2.07 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.2 3.7c1.56.67 2.17.73 2.95.62a2.5 2.5 0 0 0 1.66-1.17 2 2 0 0 0 .14-1.17c-.06-.1-.22-.16-.47-.28z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9.5 5 5 5-5-1.4-1.4L12 11.7 8.4 8.1z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 16.2-4.2-4.2-1.4 1.4 5.6 5.6 11-11-1.4-1.4z"/></svg>',
};

// ---------- Components ----------
// Image container: shows the photo when `src` is set, otherwise a neutral placeholder
// at the same aspect ratio so layouts never shift when real photos are added.
function media(src, alt, label, ratio = '4x3', eager = false) {
  if (src) {
    return `<div class="media r-${ratio}"><img src="${esc(encodeURI(src))}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
  }
  return `<div class="media r-${ratio} is-placeholder" role="img" aria-label="${esc(alt)} (photo to be added)"><span>${esc(label)}</span></div>`;
}

const useList = (uses) => `<ul class="use-list">${uses.map((u) => `<li>${icon.check}<span>${esc(u)}</span></li>`).join('')}</ul>`;

const leadOf = (slug) => { const bl = legacy[slug].blocks; const i = bl.findIndex((x) => x.tag === 'h1'); return bl[i + 1].text; };
const nav = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'services.html', label: 'Services', key: 'services', mega: true },
  { href: 'projects.html', label: 'Projects', key: 'projects' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'teams.html', label: 'Team', key: 'teams' },
  { href: 'gallery.html', label: 'Gallery', key: 'gallery' },
  { href: 'clients.html', label: 'Clients', key: 'clients' },
];
const megaMenu = () => `<ul class="sub">${serviceGroups.map((g) => `<li class="sub-col"><a class="sub-head" href="services.html#${g.id}">${esc(g.name)}</a><ul>${g.items.map((s) => `<li><a href="${s.slug}.html">${esc(s.title)}</a></li>`).join('')}</ul></li>`).join('')}<li class="sub-col"><a class="sub-head" href="services.html#other-services">More Services</a><ul>${otherServices.map((s) => `<li><a href="${s.slug}.html">${esc(s.title)}</a></li>`).join('')}</ul></li><li class="sub-col"><a class="sub-head" href="services.html#divisions">Service Divisions</a><ul><li><a href="digital-survey-map.html">Digital Survey &amp; Map</a></li><li><a href="digital-setting-out.html">Digital Setting Out (Marking)</a></li></ul></li></ul>`;

function header(active) {
  const items = nav.map((n) => {
    const cur = n.key === active ? ' aria-current="page"' : '';
    if (!n.mega) return `<li><a href="${n.href}"${cur}>${n.label}</a></li>`;
    return `<li class="has-sub">
        <a href="${n.href}"${cur}>${n.label}</a>
        <button class="sub-toggle" type="button" aria-expanded="false" aria-label="Show ${n.label} menu">${icon.chevron}</button>
        ${megaMenu()}
      </li>`;
  }).join('\n      ');
  const p = company.phones[0];
  return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar-in">
    <span class="tb-item">${icon.pin}Manapparai, Trichy · Coimbatore, Tamil Nadu</span>
    <span class="tb-group">
      ${company.phones.map((ph) => `<a class="tb-item" href="tel:${ph.tel}">${icon.phone}${ph.display}</a>`).join('')}
      <a class="tb-item" href="mailto:${company.email}">${icon.mail}${company.email}</a>
    </span>
  </div>
</div>
<header class="site-header" id="siteHeader">
  <div class="wrap header-in">
    <a class="brand" href="index.html" aria-label="${esc(company.name)} — Home">
      <img src="${company.logo}" alt="NDSE logo" width="72" height="48">
      <span class="brand-text"><strong>Nathan Digital Survey Engineers</strong><small>NDSE · Digital Survey &amp; Setting Out</small></span>
    </a>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      <ul>
      ${items}
      </ul>
      <div class="nav-mobile-contact">
        <a class="btn btn-primary" href="contact.html">Request a Survey</a>
        <a class="btn btn-ghost" href="tel:${p.tel}">${icon.phone}Call ${p.display}</a>
      </div>
    </nav>
    <a class="btn btn-primary header-cta" href="contact.html"${active === 'contact' ? ' aria-current="page"' : ''}>Contact Us</a>
    <button class="nav-toggle" id="navToggle" type="button" aria-controls="mainNav" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="f-brand">
      <img src="${company.footerLogo}" alt="NDSE logo" width="80" height="120" loading="lazy">
      <p><strong>${esc(company.name)}</strong></p>
      <p>Digital Survey &amp; Map and Digital Setting Out (Marking) services for land, construction and infrastructure projects.</p>
      <p>Precision in Every Point. Leading industry experts in digital survey engineering since 2013.</p>
    </div>
    <div>
      <h2 class="f-head">Services</h2>
      <ul class="f-links">
        <li><a href="digital-survey-map.html">Digital Survey &amp; Map</a></li>
        <li><a href="digital-setting-out.html">Digital Setting Out (Marking)</a></li>
        <li><a href="digital-survey-map.html#boundary-survey">Boundary Survey &amp; Map</a></li>
        <li><a href="digital-survey-map.html#topographical-survey">Topographical Survey &amp; Map</a></li>
        <li><a href="digital-setting-out.html#construction-marking">Construction Marking</a></li>
      </ul>
    </div>
    <div>
      <h2 class="f-head">Company</h2>
      <ul class="f-links">
        <li><a href="about.html">About NDSE</a></li>
        <li><a href="projects.html">Completed Projects</a></li>
        <li><a href="clients.html">Clients</a></li>
        <li><a href="teams.html">Team</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="services.html">All Services</a></li>
        <li><a href="https://nathanassociates.in/" target="_blank" rel="noopener">Nathan Associates</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h2 class="f-head">Contact</h2>
      <ul class="f-contact">
        ${company.phones.map((ph) => `<li>${icon.phone}<a href="tel:${ph.tel}">${ph.display}</a></li>`).join('')}
        <li>${icon.mail}<a href="mailto:${company.email}">${company.email}</a></li>
        <li>${icon.whatsapp}<a href="https://wa.me/${company.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
        ${company.offices.map((o) => `<li>${icon.pin}<a href="contact.html#${o.id}"><strong>${esc(o.name)}:</strong> ${esc(o.short)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="wrap f-bottom">
    <p>&copy; ${YEAR} ${esc(company.name)}. All rights reserved.</p>
  </div>
</footer>
<a class="fab" href="https://wa.me/${company.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with NDSE on WhatsApp">${icon.whatsapp}</a>`;
}

function orgSchema() {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE}/#organization`,
    name: company.name,
    alternateName: company.short,
    url: `${SITE}/`,
    logo: `${SITE}/${company.footerLogo}`,
    image: `${SITE}/${company.footerLogo}`,
    telephone: company.phones.map((p) => p.tel),
    email: company.email,
    address: company.offices.map((o) => ({
      '@type': 'PostalAddress', streetAddress: o.street, addressLocality: o.locality,
      postalCode: o.postalCode, addressRegion: 'Tamil Nadu', addressCountry: 'IN',
    })),
    areaServed: { '@type': 'State', name: 'Tamil Nadu' },
    knowsAbout: [...surveys.map((s) => s.title), ...markings.map((m) => m.title)],
  };
}

function breadcrumb(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t[0], item: `${SITE}/${t[1]}` })),
  };
}

function page({ file, title, description, active, body, schema = [], ogImage, ld = [] }) {
  const canonical = file === 'index.html' ? `${SITE}/` : `${SITE}/${file}`;
  const graph = { '@context': 'https://schema.org', '@graph': [orgSchema(), ...schema] };
  const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.className='js'</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#23272a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(company.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/${ogImage || company.footerLogo}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary">
<meta name="geo.region" content="IN-TN">
<meta name="geo.placename" content="Coimbatore, Tamil Nadu">
<link rel="icon" href="images/NDSELOGO2.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Serif:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css?v=${assetV('css/site.css')}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>${ld.map((x) => `\n<script type="application/ld+json">${x}</script>`).join('')}
</head>
<body>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="js/site.js?v=${assetV('js/site.js')}" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, file), html);
  return file;
}

const pageHead = (eyebrow, h1, lead, crumbs, image = 'images/banner-1.jpg') => `<section class="page-head">
  <img class="page-head-img" src="${esc(encodeURI(image))}" alt="" fetchpriority="high">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${crumbs.map((c) => c[1] ? `<span>/</span><a href="${c[1]}">${esc(c[0])}</a>` : `<span>/</span><span aria-current="page">${esc(c[0])}</span>`).join('')}</nav>
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${esc(h1)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;

const ctaBand = (h = 'Planning a survey or setting-out job?', p = 'Share your site location, area and drawings. Our team will advise on the right survey or marking method.') => `<section class="cta-band">
  <img class="cta-img" src="images/survey_engineers_work.png" alt="" loading="lazy" decoding="async">
  <div class="wrap cta-in">
    <div>
      <h2>${esc(h)}</h2>
      <p>${esc(p)}</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-light" href="contact.html">Send an Enquiry ${icon.arrow}</a>
      <a class="btn btn-outline-light" href="tel:${company.phones[0].tel}">${icon.phone}${company.phones[0].display}</a>
    </div>
  </div>
</section>`;

// Compact card used on the homepage and services overview (links to full detail).
const serviceCard = (s, href) => `<article class="svc-card reveal">
  ${media(s.image, `${s.title} by NDSE`, s.title, '4x3')}
  <div class="svc-body">
  <h3><a href="${href}#${s.id}">${esc(s.title)}</a></h3>
  <p>${esc(s.meaning)}</p>
  <span class="svc-meta">${s.uses.length} applications <span class="arrow">${icon.arrow}</span></span>
  </div>
</article>`;

const pageCard = (s, short) => `<article class="svc-card reveal">
  ${media(s.image, `${s.title} by NDSE`, s.title, '4x3')}
  <div class="svc-body">
  <h3><a href="${s.slug}.html">${esc(s.title)}</a></h3>
  <p>${esc(short)}</p>
  <span class="svc-meta">Learn More <span class="arrow">${icon.arrow}</span></span>
  </div>
</article>`;
const allServices = serviceGroups.flatMap((g) => g.items);

// Full detail block used on division pages: title, meaning, uses, image, CTA.
const serviceDetail = (s, i, division) => `<article class="detail reveal" id="${s.id}">
  <div class="detail-media">${media(s.image, `${s.title} by NDSE`, s.title, '4x3')}</div>
  <div class="detail-body">
    <p class="detail-num">${String(i + 1).padStart(2, '0')} · ${esc(division)}</p>
    <h2>${esc(s.title)}</h2>
    <h3 class="label">Meaning</h3>
    <p class="meaning">${esc(s.meaning)}</p>
    <h3 class="label">Used For</h3>
    ${useList(s.uses)}
    <a class="btn btn-outline" href="contact.html?service=${encodeURIComponent(s.title)}">Enquire about ${esc(s.title)} ${icon.arrow}</a>
  </div>
</article>`;

const projectCard = (p, full = false) => `<article class="proj-card reveal" id="${full ? p.id : ''}" data-cat="${projectCats[p.id]}">
  ${media(p.image, 'NDSE survey field work', p.location, '3x2')}
  <div class="proj-body">
    <p class="proj-loc">${icon.pin}${esc(p.location)}</p>
    <h3>${full ? esc(p.name) : `<a href="projects.html#${p.id}">${esc(p.name)}</a>`}</h3>
    <dl class="proj-facts">
      <div><dt>Area / Length</dt><dd>${esc(p.area)}</dd></div>
      ${p.work ? `<div><dt>Scope of Work</dt><dd>${esc(p.work)}</dd></div>` : ''}
      ${p.client ? `<div><dt>Client</dt><dd>${esc(p.client)}</dd></div>` : ''}
    </dl>
  </div>
</article>`.replace(' id=""', '');

const faqs = [
  ['What is the difference between Digital Survey & Map and Digital Setting Out (Marking)?',
    'A Digital Survey & Map measures what already exists on the ground — boundaries, levels, features and structures — and produces a map. Digital Setting Out (Marking) works the other way: it transfers positions, alignments and levels from an approved drawing onto the ground so construction can begin in the right place.'],
  ['Which survey do I need before buying or developing land?',
    'A Boundary Survey & Map identifies the limits and corner points of the property using land records and field measurements. For design work, a Topographical Survey & Map adds ground levels, slopes and existing features such as roads, buildings, trees, drains, EB poles and wells.'],
  ['What instruments does NDSE use?',
    'NDSE uses electronic survey instruments including Total Station, DGPS/GNSS, Drone, LiDAR and 3D Scanner equipment, with Auto Level and Digital Level for level marking.'],
  ['Can NDSE prepare survey drawings for approvals?',
    'Yes. Our Approval Survey covers land, building, layout, renewal and infrastructure approval survey drawings for submission to the relevant authority.'],
  ['Where does NDSE work?',
    'NDSE has offices in Manapparai (Trichy) and Coimbatore and takes up survey and marking work across Tamil Nadu. Completed projects also include work in Karnataka.'],
  ['How do I request a quote?',
    `Call ${company.phones[0].display} or ${company.phones[1].display}, email ${company.email}, message us on WhatsApp, or send the enquiry form with your site location and approximate area.`],
];

const allFaqs = () => [...faqs, ...oldFaqs];
const faqBlock = () => `<div class="faq">${allFaqs().map(([q, a]) => `<details class="reveal"><summary>${esc(q)}<span class="plus" aria-hidden="true"></span></summary><p>${esc(a)}</p></details>`).join('')}</div>`;
const faqSchema = () => ({
  '@type': 'FAQPage',
  mainEntity: allFaqs().map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const serviceListSchema = (name, items, file) => ({
  '@type': 'Service',
  name,
  provider: { '@id': `${SITE}/#organization` },
  areaServed: { '@type': 'State', name: 'Tamil Nadu' },
  url: `${SITE}/${file}`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name,
    itemListElement: items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.meaning, url: `${SITE}/${file}#${s.id}` },
    })),
  },
});

const whyCards = () => [
  ['01', 'Survey and marking under one team', 'The same team that maps your site can set out the approved design, keeping data consistent from survey to construction.'],
  ['02', 'Digital instruments', 'Total Station, DGPS/GNSS, Drone, LiDAR, 3D Scanner and digital levelling equipment for reliable measurement.'],
  ['03', 'Clear, usable outputs', 'Survey maps, GIS/QGIS maps, contour and section drawings, and approval drawings prepared for your next step.'],
  ['04', 'Local presence', 'Offices in Coimbatore and Manapparai, Trichy, serving land, construction and infrastructure projects across Tamil Nadu.'],
].map(([n, h, p]) => `<div class="why reveal"><span class="why-n">${n}</span><h3>${h}</h3><p>${p}</p></div>`).join('');

// ---------- Pages ----------
const built = [];

// Home
const featuredProjects = ['kpr-mill', 'coimbatore-water-pipeline', 'thoothukudi-solar', 'mysuru-industrial'].map((id) => projects.find((p) => p.id === id));
built.push(page({
  file: 'index.html', active: 'home',
  title: 'NDSE | Digital Land Survey & Setting Out in Tamil Nadu',
  description: 'Nathan Digital Survey Engineers (NDSE): boundary, topographical, contour, GIS, LiDAR and route surveys, plus digital construction and boundary marking. Offices in Coimbatore and Manapparai, Trichy.',
  body: `
<section class="hero">
  <div class="hero-slides" aria-hidden="true">
    <img src="images/banner-3.jpg" alt="" fetchpriority="high">
    <img src="images/drone_survey_aerial.png" alt="" loading="lazy">
    <img src="images/construction_survey.png" alt="" loading="lazy">
  </div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Digital Survey &amp; Setting Out · Tamil Nadu</p>
      <h1>Accurate digital surveys and setting out for land, construction and infrastructure.</h1>
      <p class="lead">${esc(company.name)} measures, maps and marks sites using Total Station, DGPS, Drone, LiDAR and 3D Scanner equipment — from a single plot boundary to multi-acre industrial and solar sites.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="contact.html">Request a Survey ${icon.arrow}</a>
        <a class="btn btn-outline" href="services.html">Explore Services</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split media-split">
    <div class="reveal">${media('images/WhatsApp Image 2026-07-25 at 8.44.52 PM (1).jpeg', 'NDSE survey team on site', 'NDSE field survey', '4x3')}</div>
    <div class="reveal">
      <p class="eyebrow">About NDSE</p>
      <h2 class="h2">A dedicated survey engineering team for measurement and marking.</h2>
      <p>NDSE provides two clearly defined service divisions. <strong>Digital Survey &amp; Map</strong> records existing land, levels, water bodies, structures and utilities. <strong>Digital Setting Out (Marking)</strong> transfers approved drawings onto the ground for boundaries, buildings, roads, layouts and earthwork.</p>
      <a class="link" href="about.html">More about NDSE ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="section alt" id="services">
  <div class="wrap">
    <div class="sec-head row reveal">
      <div><p class="eyebrow">Our Services</p><h2 class="h2">Precision Services</h2><p class="sec-text">We provide professional surveying and engineering solutions tailored to your project's specific needs.</p></div>
      <a class="link" href="services.html">Explore All Services ${icon.arrow}</a>
    </div>
    <div class="svc-grid four">${featuredServiceSlugs.map((slug) => { const s = allServices.find((x) => x.slug === slug); return pageCard(s, s.short); }).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head center reveal"><p class="eyebrow">Why NDSE</p><h2 class="h2">Why clients choose NDSE</h2></div>
    <div class="why-grid">${whyCards()}</div>
    <p class="center more-link"><a class="link" href="about.html#why">Learn More About Us ${icon.arrow}</a></p>
  </div>
</section>

<section class="section alt" id="projects">
  <div class="wrap">
    <div class="sec-head row reveal">
      <div><p class="eyebrow">Portfolio</p><h2 class="h2">Our Successfully Completed Projects</h2></div>
      <a class="link" href="projects.html">View all projects ${icon.arrow}</a>
    </div>
    <div class="proj-grid even">${featuredProjects.map((p) => projectCard(p)).join('')}</div>
  </div>
</section>

<section class="section logos-sec">
  <div class="wrap">
    <div class="sec-head center reveal"><p class="eyebrow">Clients</p><h2 class="h2">Our Clients</h2></div>
  </div>
  <div class="logo-marquee"><ul class="logo-track">${[...clients, ...clients].map((c, i) => `<li${i >= clients.length ? ' aria-hidden="true"' : ''}><img src="${esc(c.logo)}" alt="${i >= clients.length ? '' : esc(c.name) + ' logo'}" width="148" height="72" loading="lazy" decoding="async"></li>`).join('')}</ul></div>
  <p class="center more-link"><a class="link" href="clients.html">View All Clients ${icon.arrow}</a></p>
</section>

<section class="section nathan" id="nathan-associates">
  <div class="wrap nathan-in">
    <div class="nathan-copy">
      <p class="eyebrow">Associated Company</p>
      <h2 class="h2">Expanding Our Expertise with Nathan Associates</h2>
      <div class="nathan-brand"><img class="nathan-logo" src="${nathan.logo}" alt="Nathan Associates logo" width="120" height="118" loading="lazy"><div><strong>${esc(nathan.name)}</strong><span>${esc(nathan.tagline)}</span></div></div>
      ${nathan.intro.map((p) => `<p>${esc(p)}</p>`).join('')}
      <ul class="nathan-list">${nathan.services.map((s) => `<li>${icon.check}<span>${esc(s)}</span></li>`).join('')}</ul>
      <a class="btn btn-primary" href="${nathan.url}" target="_blank" rel="noopener">Visit Website ${icon.arrow}</a>
    </div>
    <div>${media('images/about_1.jpg', 'Survey drawings and approvals work', 'Nathan Associates', '4x3')}</div>
  </div>
</section>

${ctaBand()}`,
}));

// Services overview
built.push(page({
  file: 'services.html', active: 'services',
  title: 'Survey & Setting Out Services | NDSE Tamil Nadu',
  description: 'All NDSE services: 15 Digital Survey & Map categories and 7 Digital Setting Out (Marking) categories for land, construction and infrastructure in Tamil Nadu.',
  schema: [breadcrumb([['Home', ''], ['Services', 'services.html']])],
  body: `${pageHead('Our Services', 'Survey & Setting Out Services', 'NDSE services are organised into two divisions. Select a category to see its meaning and applications.', [['Services']], 'images/survey_engineers_work.png')}
<section class="section compact">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">What We Offer</p><h2 class="h2">Specialized Survey Solutions</h2><p class="sec-text">Comprehensive survey engineering solutions with extreme precision and cutting-edge technology.</p><p class="sec-text">We provide a wide range of surveying services across Tamil Nadu, Kerala, Delhi and All India, leveraging cutting-edge technology to deliver accurate results.</p></div>
    <nav class="filter-chips" aria-label="Service categories">${serviceGroups.map((g) => `<a href="#${g.id}">${esc(g.name)}</a>`).join('')}<a href="#other-services">More Services</a><a href="#divisions">Service Divisions</a></nav>
  </div>
</section>
${serviceGroups.map((g, i) => `<section class="section compact${i % 2 ? '' : ' alt'}" id="${g.id}">
  <div class="wrap">
    <div class="sec-head reveal"><h2 class="h2">${esc(g.name)}</h2></div>
    <div class="svc-grid four">${g.items.map((s) => pageCard(s, s.short)).join('')}</div>
  </div>
</section>`).join('\n')}
<section class="section compact" id="other-services">
  <div class="wrap">
    <div class="sec-head reveal"><h2 class="h2">More Services</h2></div>
    <div class="svc-grid four">${otherServices.map((s) => pageCard(s, leadOf(s.slug))).join('')}</div>
  </div>
</section>
<section class="section alt" id="divisions">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">Our Services</p><h2 class="h2">Two service divisions</h2></div>
    <ul class="hero-facts light">
      <li><strong>${surveys.length}</strong><span>Survey &amp; map categories</span></li>
      <li><strong>${markings.length}</strong><span>Setting-out categories</span></li>
      <li><strong>2</strong><span>Offices: Coimbatore &amp; Manapparai</span></li>
    </ul>
    <div class="division-grid">
      <a class="division reveal" href="digital-survey-map.html">
        ${media('images/drone_survey.png', 'Digital Survey & Map', 'Digital Survey & Map', '16x9')}
        <div class="division-body">
          <h3>Digital Survey &amp; Map</h3>
          <p>Measuring and mapping boundaries, terrain, water bodies, ground conditions, structures and routes.</p>
          <span class="svc-meta">${surveys.length} categories <span class="arrow">${icon.arrow}</span></span>
        </div>
      </a>
      <a class="division reveal" href="digital-setting-out.html">
        ${media('images/construction_measurement.png', 'Digital Setting Out (Marking)', 'Digital Setting Out (Marking)', '16x9')}
        <div class="division-body">
          <h3>Digital Setting Out (Marking)</h3>
          <p>Transferring approved drawings, alignments and levels from plan to ground with survey instruments.</p>
          <span class="svc-meta">${markings.length} categories <span class="arrow">${icon.arrow}</span></span>
        </div>
      </a>
    </div>
  </div>
</section>
${ctaBand()}`,
}));

// Division pages
function divisionPage({ file, name, lead, items, title, description, other }) {
  return page({
    file, active: 'services', title, description,
    schema: [breadcrumb([['Home', ''], ['Services', 'services.html'], [name, file]]), serviceListSchema(name, items, file)],
    body: `${pageHead('Service Division', name, lead, [['Services', 'services.html'], [name]], file === 'digital-survey-map.html' ? 'images/drone_survey.png' : 'images/construction_measurement.png')}
<section class="section">
  <div class="wrap division-layout">
    <aside class="toc" aria-label="${esc(name)} categories">
      <p class="toc-title">Categories</p>
      <ol>${items.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('')}</ol>
      <a class="toc-other" href="${other[1]}">${esc(other[0])} ${icon.arrow}</a>
    </aside>
    <div class="details">${items.map((s, i) => serviceDetail(s, i, name)).join('')}</div>
  </div>
</section>
${ctaBand()}`,
  });
}

built.push(divisionPage({
  file: 'digital-survey-map.html', name: 'Digital Survey & Map', items: surveys,
  title: 'Digital Survey & Map | Boundary, Topo, Contour, GIS Survey | NDSE',
  description: 'Boundary, topographical, contour, hydrographic, geotechnical, GIS, LiDAR, route, as-built and approval surveys by NDSE in Coimbatore, Trichy and across Tamil Nadu.',
  lead: 'Measuring and mapping land, terrain, water bodies, ground conditions, structures and routes with digital survey instruments.',
  other: ['See Digital Setting Out (Marking)', 'digital-setting-out.html'],
}));
built.push(divisionPage({
  file: 'digital-setting-out.html', name: 'Digital Setting Out (Marking)', items: markings,
  title: 'Digital Setting Out & Construction Marking | NDSE Tamil Nadu',
  description: 'Boundary, construction, level, route, infrastructure, layout and earthwork marking by NDSE using Total Station, DGPS/GNSS and digital levels across Tamil Nadu.',
  lead: 'Transferring positions, alignments and levels from approved drawings onto the ground using survey instruments.',
  other: ['See Digital Survey & Map', 'digital-survey-map.html'],
}));

// Projects
const catName = (id) => serviceGroups.find((g) => g.id === id).name;
const usedCats = serviceGroups.filter((g) => [...Object.values(projectCats), ...caseStudies.map((c) => c.cat), ...featuredOld.map((c) => c.cat)].includes(g.id));
built.push(page({
  file: 'projects.html', active: 'projects',
  title: 'Completed Survey Projects | NDSE Portfolio',
  description: 'NDSE completed projects: boundary survey at Karur, solar power plants at Udumalaipet and Thoothukudi, a 53 KM water pipeline in Coimbatore, and industrial, residential and mill projects.',
  schema: [breadcrumb([['Home', ''], ['Projects', 'projects.html']]), {
    '@type': 'ItemList', name: 'Our Successfully Completed Projects',
    itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `${p.name} – ${p.location}`, url: `${SITE}/projects.html#${p.id}` })),
  }],
  body: `${pageHead('Portfolio', 'Our Successfully Completed Projects', 'A selection of survey and marking work completed by NDSE.', [['Projects']], 'images/drone_survey_aerial.png')}
<section class="section compact">
  <div class="wrap">
    <div class="filter-chips" role="group" aria-label="Filter projects by category">
      <button type="button" class="is-active" data-filter="all" aria-pressed="true">All</button>
      ${usedCats.map((g) => `<button type="button" data-filter="${g.id}" aria-pressed="false">${esc(g.name)}</button>`).join('')}
    </div>
    <div class="proj-grid">${projects.map((p) => projectCard(p, true)).join('')}</div>
  </div>
</section>
<section class="section alt" id="case-studies">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">Portfolio</p><h2 class="h2">Trusted By Leading Organizations</h2><p class="sec-text">We proudly provide professional survey solutions for industries, infrastructure projects, government organizations, real estate developers, and corporate clients.</p></div>
    <div class="case-grid">${caseStudies.map((c) => `<article class="case-card reveal" id="${c.id}" data-cat="${c.cat}">
      <div class="case-media">${media(c.image, 'NDSE survey field work', c.type, '4x3')}<span class="status">${c.status}</span></div>
      <div class="proj-body">
        <p class="proj-loc">${icon.pin}${esc(c.location)}</p>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.text)}</p>
        <dl class="proj-facts"><div><dt>Client</dt><dd>${esc(c.client)}</dd></div><div><dt>Type</dt><dd>${esc(c.type)}</dd></div></dl>
      </div>
    </article>`).join('')}</div>
  </div>
</section>
<section class="section" id="featured">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">Our Projects</p><p class="sec-text">A showcase of precision and excellence across various engineering sectors.</p><h2 class="h2">Our Featured Projects</h2><p class="sec-text">A glimpse into our diverse range of successful surveying projects across India.</p></div>
    <div class="feat-grid">${featuredOld.map((f) => `<article class="feat reveal" id="${f.id}" data-cat="${f.cat}">${media(f.image, 'NDSE survey field work', f.name, '4x3')}<div class="feat-cap"><span>${esc(f.tag)}</span><h3>${esc(f.name)}</h3></div></article>`).join('')}</div>
  </div>
</section>
${ctaBand('Have a similar project?', 'Tell us about your site and scope, and we will recommend the right survey or marking approach.')}
<section class="section compact"><div class="wrap center"><h2 class="h2">Have a Survey Project in Mind?</h2><p>Let's talk about your requirements. Our expert team is ready to deliver precise results.</p><a class="btn btn-primary" href="contact.html">Start Your Project ${icon.arrow}</a></div></section>`,
}));

// About
built.push(page({
  file: 'about.html', active: 'about',
  title: 'About NDSE | Nathan Digital Survey Engineers',
  description: 'About Nathan Digital Survey Engineers (NDSE), a digital survey and setting-out company with offices in Coimbatore and Manapparai, Trichy, Tamil Nadu.',
  schema: [breadcrumb([['Home', ''], ['About', 'about.html']])],
  body: `${pageHead('About Us', 'About NDSE', 'Nathan Digital Survey Engineers — digital survey engineering for land, construction and infrastructure.', [['About']], 'images/banner-3.jpg')}
<section class="section">
  <div class="wrap split media-split">
    <div class="reveal">${media('images/WhatsApp Image 2026-07-25 at 8.44.52 PM (1).jpeg', 'NDSE team at work', 'NDSE team', '4x3')}</div>
    <div class="reveal">
      <h2 class="h2">Who we are</h2>
      <p>${esc(company.name)} is a survey engineering company based in Tamil Nadu, with offices in Coimbatore and Manapparai, Trichy. We provide digital survey and mapping services and digital setting out (marking) services for landowners, developers, contractors and infrastructure projects.</p>
      <p>Our work covers boundaries, topography, contours, water bodies, ground investigation, infrastructure, routes, GIS and LiDAR mapping, earthwork quantities and approval drawings — and the accurate marking of approved designs on the ground.</p>
      <p>Our mission is to provide accurate and reliable surveying solutions using modern technology, so that clients can plan, approve and build with confidence.</p>
      <a class="btn btn-primary" href="contact.html">Get in Touch ${icon.arrow}</a>
    </div>
  </div>
</section>
<section class="section alt" id="story">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Our Story</p>
      <h2 class="h2">Precision Redefined Since 2013</h2>
      <p class="sec-text">Building trust through precision engineering and excellence since 2013.</p>
    </div>
    <div class="reveal">
      <p>Starting in Tamil Nadu, Nathan Digital Survey Engineers (NDSE) was established to bridge the gap in high-precision surveying services within the Indian construction industry. Over the past 12 years, we have grown into a leading firm with over 20+ specialized staff members.</p>
      <p>Our commitment to accuracy and efficiency has made us a preferred partner for infrastructure projects across the country. We believe in transparency, precision, and delivering results that stand the test of time.</p>
      <p>Starting in Tamil Nadu, NDSE has expanded operations across Kerala and Delhi, with active projects throughout India. We were created after recognizing the gap in surveying services in the construction industry. Today, we are industry leaders in precision engineering. Our highly qualified surveyors use the latest technology to deliver accurate reports and guidance for every project across Tamil Nadu, Kerala, Delhi and pan-India.</p>
    </div>
  </div>
</section>
<section class="stat-band" id="achievements">
  <div class="wrap">
    <ul class="hero-facts four">
      <li><strong>12+</strong><span>Years of Trusted Service</span></li>
      <li><strong>5000+</strong><span>Successful Projects Completed</span></li>
      <li><strong>20+</strong><span>Expert Engineers</span></li>
      <li><strong>100%</strong><span>Client Satisfaction</span></li>
    </ul>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">Our Experience</p><h2 class="h2">Experience &amp; Achievements</h2><p class="sec-text">With 12+ years of trusted service and a portfolio of over 5000+ successful projects completed, our expertise covers everything from simple land surveys to complex industrial alignment.</p></div>
    <div class="why-grid">
      <div class="why reveal"><p class="why-tag">Nathan Digital Survey Engineers</p><h3>Precision Engineering &amp; Digital Surveying</h3><p>Industry-leading survey solutions with cutting-edge technology and certified precision.</p></div>
      <div class="why reveal"><p class="why-tag">Expert Survey Team</p><h3>Leading Industry Experts in Land Survey</h3><p>Over 13 years of delivering precision surveying across Tamil Nadu, Kerala, Delhi and pan-India.</p></div>
      <div class="why reveal"><p class="why-tag">Advanced Technology</p><h3>Advanced Drone Mapping &amp; GIS Technology</h3><p>Next-generation aerial surveys, GIS mapping, and LiDAR scanning for every project.</p></div>
      <div class="why reveal"><p class="why-tag">Since 2013 · All India</p><h3>500+ Projects Delivered Across All India</h3><p>From solar parks to smart cities — certified precision on every large-scale project across the nation since 2013.</p></div>
    </div>
    <ul class="use-list two">
      ${['State-of-the-art Survey Equipment', 'Certified & Licensed Surveyors', 'Serving Clients Across Tamil Nadu', 'High-Precision Equipment & Instruments', 'Certified & Experienced Surveyors', 'Active in Tamil Nadu, Kerala, Delhi & All India', 'Timely Delivery on Every Project', '24/7 Engineering Support'].map((u) => `<li>${icon.check}<span>${esc(u)}</span></li>`).join('')}
    </ul>
  </div>
</section>
<section class="section alt">
  <div class="wrap">
    <div class="sec-head center reveal"><p class="eyebrow">Our Values</p><h2 class="h2">Mission, Vision &amp; Experience</h2></div>
    <div class="mv-grid">
      <div class="mv reveal"><p class="eyebrow">Our Mission</p><p>To provide the most accurate and reliable surveying solutions using state-of-the-art technology, ensuring our clients achieve fruitful outcomes in minimal time.</p></div>
      <div class="mv reveal"><p class="eyebrow">Our Vision</p><p>To be India's benchmark in digital survey engineering, setting new standards for precision, data integrity, and engineering excellence across all sectors.</p></div>
    </div>
  </div>
</section>
<section class="section" id="equipment">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Equipment &amp; Technology</p>
      <h2 class="h2">Our surveying equipment</h2>
      <p class="sec-text"><strong>Harnessing Modern Digital Technology.</strong> Experience the next generation of GIS, LiDAR, and Drone surveying technology with NDSE's digital survey division. <a class="inline" href="digital-survey.html">Digital Survey Page</a></p>
    </div>
    <div class="equip-grid">${equipment.map((e) => `<article class="equip reveal">${media(e.image, `${e.title} survey equipment`, e.title, '4x3')}<div class="equip-body"><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></article>`).join('')}</div>
  </div>
</section>
<section class="section alt" id="why">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">Why Choose Us</p><h2 class="h2">Over 13 Years of Excellence Tamil Nadu, Kerala, Delhi &amp; All India</h2></div>
    <div class="why-grid">${whyCards()}</div>
    <div class="prose reveal">
      <h3>Why is Professional Land Surveying and PMC Important in Manapparai &amp; Trichy?</h3>
      <p>In today's fast-paced real estate and construction environment in Tamil Nadu, securing timely Approvals, precise Building Plans, and accurate Digital Surveys is crucial. By partnering with a top-tier provider like Nathan Digital Survey Engineers, developers ensure that their Construction projects adhere to legal boundaries through stringent Validation protocols. Our robust Approval PMC and Labour Contract solutions mitigate risk, while strategic Site Marketing helps you reach the right buyers quickly in local markets like Manapparai, Trichy, and Coimbatore.</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Industries &amp; Applications</p>
      <h2 class="h2">Sectors we serve</h2>
      <p>Our survey and marking services support projects across public infrastructure, industry, energy and private development.</p>
    </div>
    <ul class="chips reveal">${industries.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>
</section>
<section class="section alt">
  <div class="wrap">
    <div class="sec-head reveal"><p class="eyebrow">What we do</p><h2 class="h2">Our service divisions</h2></div>
    <div class="division-grid">
      <a class="division reveal" href="digital-survey-map.html"><div class="division-body"><h3>Digital Survey &amp; Map</h3><p>${surveys.map((s) => esc(s.title)).join(' · ')}</p><span class="svc-meta">View division <span class="arrow">${icon.arrow}</span></span></div></a>
      <a class="division reveal" href="digital-setting-out.html"><div class="division-body"><h3>Digital Setting Out (Marking)</h3><p>${markings.map((s) => esc(s.title)).join(' · ')}</p><span class="svc-meta">View division <span class="arrow">${icon.arrow}</span></span></div></a>
    </div>
  </div>
</section>
<section class="section" id="team-intro">
  <div class="wrap split media-split">
    <div class="reveal">${media('images/BALASUBRAMANI.jpeg', 'Balasubramani, Founder & Managing Director of NDSE', 'NDSE team', '1x1')}</div>
    <div class="reveal">
      <p class="eyebrow">Our Team</p>
      <h2 class="h2">Meet The Team</h2>
      <p>The dedicated experts behind NDSE's success in digital survey engineering.</p>
      <a class="link" href="teams.html">Our Team ${icon.arrow}</a>
    </div>
  </div>
</section>
${ctaBand()}`,
}));

// Team
built.push(page({
  file: 'teams.html', active: 'teams',
  title: 'Our Team | NDSE',
  description: 'Meet the leadership of Nathan Digital Survey Engineers (NDSE).',
  schema: [breadcrumb([['Home', ''], ['Team', 'teams.html']])],
  body: `${pageHead('Our Team', 'Leadership', 'The people behind NDSE’s survey and setting-out work.', [['Team']], 'images/WhatsApp Image 2026-07-25 at 8.44.53 PM.jpeg')}
<section class="section">
  <div class="wrap">
    <div class="sec-head center reveal"><p class="eyebrow">Our Leadership &amp; Experts</p><h2 class="h2">Our Team</h2><p>Highly skilled professionals dedicated to precision and excellence in every survey project.</p></div>
    <div class="team-grid">
    <article class="team reveal">
      <div class="media r-1x1"><img src="images/BALASUBRAMANI.jpeg" alt="Balasubramani, Founder & Managing Director of NDSE" loading="lazy" decoding="async"></div>
      <h2>Balasubramani</h2>
      <p>Founder &amp; Managing Director</p>
    </article>
    </div>
  </div>
</section>
<section class="section alt compact"><div class="wrap center"><h2 class="h2">Work With Our Expert Team</h2><p>Our team of certified surveyors and engineers are ready to handle your next project with precision.</p><a class="btn btn-primary" href="gallery.html">Our Team at Work ${icon.arrow}</a></div></section>
${ctaBand()}`,
}));

// Gallery
built.push(page({
  file: 'gallery.html', active: 'gallery',
  title: 'Gallery | NDSE Field Survey Work',
  description: 'Real project execution, field survey, DGPS, Total Station, Layout marking and site inspection activities by Nathan Digital Survey Engineers (NDSE).',
  schema: [breadcrumb([['Home', ''], ['Gallery', 'gallery.html']])],
  body: `${pageHead('Gallery', 'Our Team at Work', 'Real project execution, field survey, DGPS, Total Station, Layout marking and site inspection activities.', [['Gallery']], 'images/WhatsApp Image 2026-07-25 at 8.44.52 PM (1).jpeg')}
<section class="section">
  <div class="wrap">
    <div class="gallery">${galleryPhotos.map((g) => { const src = esc(encodeURI(g)); return `<a class="gallery-item reveal" href="${src}" data-lightbox><img src="${src}" alt="Team at Work" width="400" height="300" loading="lazy" decoding="async"></a>`; }).join('')}</div>
  </div>
</section>
${ctaBand()}`,
}));

// Clients
built.push(page({
  file: 'clients.html', active: 'clients',
  title: 'Our Clients | NDSE',
  description: 'Organisations that have worked with Nathan Digital Survey Engineers (NDSE).',
  schema: [breadcrumb([['Home', ''], ['Clients', 'clients.html']])],
  body: `${pageHead('Clients', 'Our Clients', 'Organisations we have worked with.', [['Clients']], 'images/land_survey.png')}
<section class="section">
  <div class="wrap">
    <div class="sec-head center reveal"><h2 class="h2">Trusted By Leading Organizations Across Industries</h2><p>We are proud to provide professional survey solutions for government, industrial, infrastructure, real estate, and corporate clients.</p><p>We have successfully partnered with top organizations across India.</p></div>
    <ul class="client-grid">${clients.map((c) => { const d = clientDetails[c.name]; return `<li class="client reveal"><div class="client-logo"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo" width="160" height="80" loading="lazy" decoding="async"></div><div class="client-body"><strong>${esc(c.name)}</strong><span class="client-sector">${esc(d[0])}</span><dl><div><dt>Project Type</dt><dd>${esc(d[1])}</dd></div><div><dt>Survey Service</dt><dd>${esc(d[2])}</dd></div><div><dt>Location</dt><dd>${esc(d[3])}</dd></div><div><dt>Status</dt><dd>${esc(d[4])}</dd></div></dl></div></li>`; }).join('')}</ul>
  </div>
</section>
<section class="section alt" id="testimonials">
  <div class="wrap">
    <div class="sec-head center reveal"><p class="eyebrow">Client Trust</p><h2 class="h2">What Our Clients Say</h2><p>Over 500 successful projects delivered with precision, reliability, and excellence.</p></div>
    <div class="quote-grid">${testimonials.map((t) => `<figure class="quote reveal"><blockquote>"${esc(t.quote)}"</blockquote><figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption></figure>`).join('')}</div>
  </div>
</section>
${ctaBand()}`,
}));

// Contact
const serviceOptions = [
  ['Digital Survey & Map', surveys], ['Digital Setting Out (Marking)', markings],
].map(([g, list]) => `<optgroup label="${esc(g)}">${list.map((s) => `<option>${esc(s.title)}</option>`).join('')}</optgroup>`).join('');

built.push(page({
  file: 'contact.html', active: 'contact',
  title: 'Contact NDSE | Survey Enquiry – Coimbatore & Trichy',
  description: `Contact Nathan Digital Survey Engineers (NDSE): call ${company.phones[0].display}, email ${company.email}. Offices in Tiruchirapalli, Pudukkottai, Manapparai and Coimbatore.`,
  schema: [breadcrumb([['Home', ''], ['Contact', 'contact.html']]), faqSchema()],
  body: `${pageHead('Contact', 'Contact NDSE', 'Tell us about your site and the survey or marking work you need.', [['Contact']], 'images/banner-1.jpg')}
<section class="section compact"><div class="wrap center"><p class="eyebrow">Get In Touch</p><h2 class="h2">Let's Discuss Your Next Project</h2><p>Get in touch with our expert team for your next big project.</p><p>Reach out to our team for a free consultation and project assessment.</p></div></section>
<section class="section compact">
  <div class="wrap contact-details reveal">
    <h2 class="c-head">Call or message</h2>
    <ul class="f-contact dark">
      ${company.phones.map((ph) => `<li>${icon.phone}<a href="tel:${ph.tel}">${ph.display}</a></li>`).join('')}
      <li>${icon.mail}<a href="mailto:${company.email}">${company.email}</a></li>
      <li>${icon.whatsapp}<a href="https://wa.me/${company.whatsapp}" target="_blank" rel="noopener">WhatsApp ${company.phones[0].display}</a></li>
    </ul>
  </div>
</section>
<section class="section alt" id="offices">
  <div class="wrap">
    <div class="sec-head center reveal"><h2 class="h2">Office Locations</h2></div>
    <div class="office-grid">${company.offices.map((o) => `<article class="office reveal" id="${o.id}">
      <div class="office-body">
        <h3>${esc(o.name)}</h3>
        <a class="addr" href="${esc(mapsLink(o))}" target="_blank" rel="noopener">${icon.pin}<span>${o.lines.map(esc).join('<br>')}</span></a>
        <a class="btn btn-outline" href="${esc(mapsLink(o))}" target="_blank" rel="noopener">View on Map ${icon.arrow}</a>
      </div>
      <div class="map"><iframe src="${esc(mapsEmbed(o))}" title="Map of NDSE ${esc(o.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </article>`).join('')}</div>
  </div>
</section>
<section class="section" id="enquiry">
  <div class="wrap narrow">
    <div class="c-card form-card reveal">
      <h2 class="c-head">Project enquiry</h2>
      <p class="muted">Fields marked * are required. Submitting opens your email app (or WhatsApp) with the details filled in.</p>
      <form id="enquiryForm" novalidate>
        <div class="f-row">
          <div class="field"><label for="f-name">Full name *</label><input id="f-name" name="name" autocomplete="name" required minlength="2"><span class="err" aria-live="polite"></span></div>
          <div class="field"><label for="f-phone">Phone *</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required pattern="[+0-9 ()-]{10,16}"><span class="err" aria-live="polite"></span></div>
        </div>
        <div class="f-row">
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email"><span class="err" aria-live="polite"></span></div>
          <div class="field"><label for="f-location">Site location *</label><input id="f-location" name="location" required placeholder="Village / town, district"><span class="err" aria-live="polite"></span></div>
        </div>
        <div class="f-row">
          <div class="field"><label for="f-service">Service *</label><select id="f-service" name="service" required><option value="">Select a service</option>${serviceOptions}<option>Other / Not sure</option></select><span class="err" aria-live="polite"></span></div>
          <div class="field"><label for="f-area">Approx. area / length</label><input id="f-area" name="area" placeholder="e.g. 5 Acres or 2 KM"></div>
        </div>
        <div class="field"><label for="f-message">Message *</label><textarea id="f-message" name="message" rows="5" required minlength="10"></textarea><span class="err" aria-live="polite"></span></div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit" data-channel="email">${icon.mail}Send by Email</button>
          <button class="btn btn-outline" type="submit" data-channel="whatsapp">${icon.whatsapp}Send on WhatsApp</button>
        </div>
        <p class="form-status" id="formStatus" role="status"></p>
      </form>
    </div>
  </div>
</section>
<section class="section alt" id="faq">
  <div class="wrap narrow">
    <div class="sec-head center reveal">
      <p class="eyebrow">FAQ</p>
      <h2 class="h2">Frequently asked questions</h2>
    </div>
    ${faqBlock()}
  </div>
</section>`,
}));

// Restored service pages: same URLs, titles and text as before, in the new layout.
const serviceImage = Object.fromEntries([...allServices, ...otherServices].map((s) => [s.slug, s.image]));
function renderFlow(flow, slug, images) {
  const out = [];
  let list = [], steps = [], cards = [], qa = [], btns = [], eyebrow = null, inFaq = false;
  const flush = () => {
    if (list.length) out.push(`<ul class="use-list">${list.map((t) => { const m = t.match(/^(.{2,60}?) — (.+)$/); return `<li>${icon.check}<span>${m ? `<strong>${esc(m[1])}</strong> — ${esc(m[2])}` : esc(t)}</span></li>`; }).join('')}</ul>`);
    if (steps.length) out.push(`<ol class="steps">${steps.map((s) => `<li><span class="step-n">${esc(s[0])}</span><div><h4>${esc(s[1])}</h4>${s[2] ? `<p>${esc(s[2])}</p>` : ''}</div></li>`).join('')}</ol>`);
    if (cards.length) out.push(`<div class="info-cards">${cards.map((c) => `<div class="info-card"><h4>${esc(c[0])}</h4><p>${esc(c[1])}</p></div>`).join('')}</div>`);
    if (qa.length) out.push(`<div class="faq">${qa.map((q) => `<details><summary>${esc(q[0])}<span class="plus" aria-hidden="true"></span></summary><p>${esc(q[1])}</p></details>`).join('')}</div>`);
    if (btns.length) out.push(`<div class="hero-actions">${btns.map((x, i) => `<a class="btn ${i ? 'btn-outline' : 'btn-primary'}" href="${esc(x.href === '#contact' ? 'contact.html' : x.href)}">${esc(x.text)}</a>`).join('')}</div>`);
    list = []; steps = []; cards = []; qa = []; btns = [];
  };
  for (let j = 0; j < flow.length; j++) {
    const b = flow[j], n = flow[j + 1];
    if (b.tag === 'div' && /^\d+$/.test(b.text) && n && /^h[2-6]$/.test(n.tag)) {
      const p = flow[j + 2] && flow[j + 2].tag === 'p' ? flow[j + 2].text : '';
      steps.push([b.text, n.text, p]); j += p ? 2 : 1; continue;
    }
    if (b.tag === 'summary' && n && n.tag === 'p') { qa.push([b.text, n.text]); j++; continue; }
    if (/^h[3-6]$/.test(b.tag) && n && n.tag === 'p') { (inFaq ? qa : cards).push([b.text, n.text]); j++; continue; }
    if (/^h[2-6]$/.test(b.tag)) {
      flush();
      inFaq = /frequently/i.test(b.text);
      out.push(`<div class="legacy-head">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h2>${esc(b.text)}</h2></div>`);
      eyebrow = null;
      if (b.text === 'Recent Projects') out.push(`<div class="gallery three">${images.map((src) => `<a class="gallery-item" href="${esc(encodeURI(src))}" data-lightbox><img src="${esc(encodeURI(src))}" alt="${esc(legacy[slug].blocks.find((x) => x.tag === 'h1').text)} project" width="400" height="300" loading="lazy" decoding="async"></a>`).join('')}</div>`);
      continue;
    }
    if (b.tag === 'div' && n && n.tag === 'h2') { flush(); eyebrow = b.text; continue; }
    if (b.tag === 'p') { flush(); out.push(`<p>${esc(b.text)}</p>`); continue; }
    if (b.tag === 'a') { btns.push(b); continue; }
    if (b.tag === 'li' || b.tag === 'div') { list.push(b.text); continue; }
    if (b.tag === 'button') btns.push({ text: b.text, href: 'contact.html' });
  }
  flush();
  return out.join('\n');
}
function legacyPage(slug) {
  const d = legacy[slug];
  const bl = d.blocks;
  const iH1 = bl.findIndex((x) => x.tag === 'h1');
  const before = bl[iH1 - 1];
  const kicker = before && before.tag === 'div' && !before.text.startsWith('|') && !before.text.includes('@') ? before.text : 'Our Services';
  const h1 = bl[iH1].text;
  let rest = bl.slice(iH1 + 1);
  const lead = rest[0] && rest[0].tag === 'p' ? rest.shift().text : '';
  const hero = [];
  while (rest[0] && rest[0].tag === 'a' && rest[0].href !== 'index.html') hero.push(rest.shift());
  rest = rest.filter((x) => !(x.tag === 'a' && x.href === 'index.html') && !/^› /.test(x.text) && !(slug === 'digital-survey' && x.tag === 'div' && /^(Full Name|Email Address|Phone Number|Project Details)$/.test(x.text)));
  // Sidebar: quote box and related links
  let aside = '';
  const iQ = rest.findIndex((x) => x.text === 'Request a Quote');
  if (iQ >= 0) {
    let end = rest.findIndex((x, k) => k > iQ && x.tag === 'h2');
    if (end < 0) end = rest.length;
    const box = rest.slice(iQ, end);
    rest = [...rest.slice(0, iQ), ...rest.slice(end)];
    const note = box.find((x) => x.tag === 'p');
    const acts = box.filter((x) => x.tag === 'a' && !/\.html$/.test(x.href) || x.href === 'contact.html');
    const related = box.filter((x) => x.tag === 'a' && /\.html$/.test(x.href) && x.href !== 'contact.html');
    aside = `<aside class="svc-aside">
      <h2 class="c-head">Request a Quote</h2>
      ${note ? `<p class="muted">${esc(note.text)}</p>` : ''}
      ${acts.map((a, i) => `<a class="btn ${i ? 'btn-outline' : 'btn-primary'}" href="${esc(a.href)}">${esc(a.text)}</a>`).join('')}
      ${related.length ? `<h3 class="toc-title">Related Services</h3><ul class="related">${related.map((a) => `<li><a href="${esc(a.href)}">${esc(a.text.replace(/^→\s*/, ''))}</a></li>`).join('')}</ul>` : ''}
    </aside>`;
  } else {
    aside = `<aside class="svc-aside"><h2 class="c-head">Contact Us</h2><a class="btn btn-primary" href="contact.html?service=${encodeURIComponent(h1)}">Send an Enquiry</a><a class="btn btn-outline" href="tel:${company.phones[0].tel}">${company.phones[0].display}</a></aside>`;
  }
  const image = serviceImage[slug];
  return page({
    file: `${slug}.html`, active: 'services', title: d.title, description: d.description || lead,
    schema: [breadcrumb([['Home', ''], ['Services', 'services.html'], [h1, `${slug}.html`]])], ld: d.ld,
    body: `${pageHead(kicker, h1, lead, [['Services', 'services.html'], [h1]], image)}
${hero.length ? `<div class="wrap head-actions">${hero.map((a, i) => `<a class="btn ${i ? 'btn-outline' : 'btn-primary'}" href="${esc(a.href)}">${esc(a.text)}</a>`).join('')}</div>` : ''}
<section class="section compact">
  <div class="wrap svc-layout">
    <div class="svc-main">
      ${media(image, `${h1} by NDSE`, h1, '16x9')}
      ${renderFlow(rest, slug, d.images.filter((x) => !/tps-1/.test(x)))}
    </div>
    ${aside}
  </div>
</section>
${ctaBand()}`,
  });
}
[...allServices, ...otherServices].forEach((s) => built.push(legacyPage(s.slug)));

// 404
built.push(page({
  file: '404.html', active: '',
  title: 'Page Not Found | NDSE',
  description: 'The page you are looking for could not be found.',
  body: `<section class="section notfound"><div class="wrap narrow center">
  <p class="eyebrow">404</p>
  <h1 class="h2">Page not found</h1>
  <p>The page may have moved as part of our website update.</p>
  <div class="hero-actions center"><a class="btn btn-primary" href="index.html">Go to Home</a><a class="btn btn-outline" href="services.html">View Services</a></div>
</div></section>`,
}));

// Sitemap + robots
const priority = { 'index.html': '1.0', 'services.html': '0.9', 'digital-survey-map.html': '0.9', 'digital-setting-out.html': '0.9', 'projects.html': '0.8', 'contact.html': '0.8' };
const urls = built.filter((f) => f !== '404.html').map((f) => `  <url>
    <loc>${f === 'index.html' ? `${SITE}/` : `${SITE}/${f}`}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${priority[f] || '0.6'}</priority>
  </url>`).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built ${built.length} pages: ${built.join(', ')}`);
