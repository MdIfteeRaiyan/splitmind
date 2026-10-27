import {build} from 'esbuild';
import {readFile,mkdir,writeFile,rm} from 'node:fs/promises';
const effects=await build({entryPoints:['ui/effects.jsx'],bundle:true,write:false,minify:true,format:'iife',target:['es2020'],jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},outdir:'dist-effects'});
const js=effects.outputFiles.find(f=>f.path.endsWith('.js')).text.replaceAll('</script','<\\/script');
const css=effects.outputFiles.find(f=>f.path.endsWith('.css'))?.text||'';
const html=(await readFile('ui/index.html','utf8')).replace('</head>',()=>'<style>'+css+'</style></head>').replace('</body>',()=>'<script>'+js+'</script></body>'),engine=(await readFile('worker/engine.mjs','utf8')).replaceAll('export function','function'),backend=(await readFile('worker/index.js','utf8')).replace("import { calculate } from './engine.mjs';",'');
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await writeFile('dist/server/index.js','const HTML='+JSON.stringify(html)+';\nconst FAVICON='+JSON.stringify(await readFile('ui/favicon.svg','utf8'))+';\nconst NOT_FOUND='+JSON.stringify(await readFile('ui/404.html','utf8'))+';\n'+engine+'\n'+backend);await mkdir('public',{recursive:true});await writeFile('public/index.html',html);console.log('Built static page and server test bundle for Vercel');

for(const name of ['favicon.svg','404.html'])await writeFile('public/'+name,await readFile('ui/'+name));

