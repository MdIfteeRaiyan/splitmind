import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
await import('./build.mjs');const worker=(await import(pathToFileURL(process.cwd()+'/dist/server/index.js'))).default;
http.createServer(async(req,res)=>{try{const chunks=[];let size=0;for await(const c of req){size+=c.length;if(size>4300000){res.writeHead(413);res.end('Request too large');return}chunks.push(c)}const origin='http://localhost:'+(process.env.PORT||3000);const request=new Request(origin+req.url,{method:req.method,headers:req.headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})});const response=await worker.fetch(request,process.env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()))}catch{res.writeHead(500);res.end('Server error')}}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('SplitMind local server ready'));
