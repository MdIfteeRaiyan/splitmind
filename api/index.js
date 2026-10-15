import worker from '../worker/index.js';
export default {async fetch(request){
 const url=new URL(request.url),route=url.searchParams.get('route');
 if(!route||!['config','parse','plan'].includes(route))return Response.json({error:'Not found'},{status:404});
 url.pathname='/api/'+route;url.searchParams.delete('route');
 const options={method:request.method,headers:request.headers};
 if(request.method!=='GET'&&request.method!=='HEAD'){options.body=request.body;options.duplex='half'}
 return worker.fetch(new Request(url,options),process.env);
}};
