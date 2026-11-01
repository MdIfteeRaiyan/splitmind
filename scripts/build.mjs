import {readFile,mkdir,writeFile,rm} from 'node:fs/promises';
const html=await readFile('ui/index.html','utf8'),engine=(await readFile('worker/engine.mjs','utf8')).replaceAll('export function','function'),backend=(await readFile('worker/index.js','utf8')).replace("import { calculate } from './engine.mjs';",'');
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await writeFile('dist/server/index.js','const HTML='+JSON.stringify(html)+';\nconst FAVICON='+JSON.stringify(await readFile('ui/favicon.svg','utf8'))+';\nconst NOT_FOUND='+JSON.stringify(await readFile('ui/404.html','utf8'))+';\n'+engine+'\n'+backend);await mkdir('public',{recursive:true});await writeFile('public/index.html',html);console.log('Built static page and server test bundle for Vercel');

for(const name of ['favicon.svg','404.html'])await writeFile('public/'+name,await readFile('ui/'+name));

try{await mkdir('dist/.openai',{recursive:true});await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'))}catch(error){if(error.code!=='ENOENT')throw error}
