import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const html=await readFile('public/index.html','utf8');
test('built internal links resolve and all packaged pages have metadata',async()=>{
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const m of html.matchAll(/href="(#[^"]+)"/g))assert(ids.has(m[1].slice(1)), 'Missing target '+m[1]);
 for(const name of ['index.html','404.html']){const page=await readFile('public/'+name,'utf8');assert(/<title>[^<]+<\/title>/.test(page));assert(/name="description" content="[^"]+"/.test(page));assert(page.includes('name="viewport"'));}
 await access('public/favicon.svg');assert(!html.includes('placeholder='));
 const missing=await readFile('public/404.html','utf8');assert(missing.includes('href="/"'));assert(missing.includes('noindex'));
});

test('browser favicon and visible brand use the same versioned green S asset',async()=>{assert(html.includes('rel="icon" type="image/svg+xml" href="/favicon.svg?v=green-s-2"'));assert(html.includes('class="brand-mark" src="/favicon.svg?v=green-s-2"'));const icon=await readFile('public/favicon.svg','utf8');assert(icon.includes('#0b5d46'));});
