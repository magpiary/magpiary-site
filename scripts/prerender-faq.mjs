// Writes the FAQ from site.js into index.html as plain HTML so search engines read it without running JavaScript.
// Run after editing the FAQ in site.js:  node scripts/prerender-faq.mjs
import fs from 'node:fs';
const src = fs.readFileSync('site.js', 'utf8');
const a = src.indexOf("$('#faqs').innerHTML=") + "$('#faqs').innerHTML=".length;
const endMark = ".join('');";
const b = src.indexOf(endMark, a) + endMark.length - 1;
const REPO = 'https://github.com/magpiary/magpiary';
const lk = (u, t) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
const html = new Function('REPO', 'lk', 'return ' + src.slice(a, b))(REPO, lk);
let page = fs.readFileSync('index.html', 'utf8');
const re = /<!--faq-->[\s\S]*?<!--\/faq-->/;
if (!re.test(page)) throw new Error('markers <!--faq--> not found in index.html');
page = page.replace(re, () => `<!--faq-->${html}<!--/faq-->`);
fs.writeFileSync('index.html', page);
console.log('FAQ prerendered:', (html.match(/<details>/g) || []).length, 'questions');
