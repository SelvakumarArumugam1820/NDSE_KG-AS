// One-off: converts _legacy/pages/*.html into legacy-pages.json (verbatim text blocks + SEO head).
// Usage: node site-src/extract-legacy.js
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', '_legacy', 'pages');
const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&rsaquo;/g, '›').replace(/&rarr;/g, '→').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const clean = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
const BLOCK = /^(h[1-6]|p|li|div|section|ul|ol|main|article|aside|button|summary|details|tr|td|th)$/;

function blocks(html) {
  const out = [];
  let buf = '';
  let cur = null; // innermost heading/li/p tag being collected
  let link = null;
  const flush = (tag) => {
    const text = clean(buf);
    buf = '';
    if (text) out.push(link && link.text === text ? { tag: tag || 'div', text, href: link.href } : { tag: tag || 'div', text });
    link = null;
  };
  const re = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
  let pos = 0, m;
  while ((m = re.exec(html))) {
    buf += html.slice(pos, m.index);
    pos = re.lastIndex;
    const [, close, name, attrs] = m;
    const t = name.toLowerCase();
    if (t === 'a' && !close) {
      const h = attrs.match(/href="([^"]*)"/);
      // A standalone anchor is its own block; inline anchors stay in the sentence.
      if (!clean(buf)) link = { href: h ? h[1] : '', text: null, pending: true };
      else buf += ' ';
      continue;
    }
    if (t === 'a' && close) {
      if (link && link.pending) { link.text = clean(buf); link.pending = false; flush('a'); }
      continue;
    }
    if (BLOCK.test(t)) { flush(cur || (close ? null : null)); cur = close ? null : (/^(h[1-6]|p|li|summary|button)$/.test(t) ? t : null); } else buf += ' ';
  }
  flush(cur);
  return out;
}

const pages = {};
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.html'))) {
  const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
  const title = clean((raw.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1]);
  const desc = (raw.match(/<meta\s+name="description"\s+content="([^"]*)"/) || ['', ''])[1];
  const ld = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => x[1].trim());
  let body = raw.match(/<body[\s\S]*<\/body>/)[0]
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/g, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/g, '')
    .replace(/<header\b[\s\S]*?<\/header>/g, '');
  const imgs = [...new Set([...body.matchAll(/(?:src="|url\(['"]?)(images\/[^"')]+)/g)].map((x) => x[1]))]
    .filter((x) => !/logo|founder/i.test(x) && fs.existsSync(path.join(__dirname, '..', 'public', x)));
  pages[f.replace('.html', '')] = { title, description: clean(desc), ld, images: imgs, blocks: blocks(body) };
}
fs.writeFileSync(path.join(__dirname, 'legacy-pages.json'), JSON.stringify(pages, null, 1));
console.log(`Extracted ${Object.keys(pages).length} pages`);
