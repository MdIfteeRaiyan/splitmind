import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFile} from 'node:fs/promises';
import worker from '../worker/index.js';
import {banglishRules,applyBanglishRules} from '../worker/banglish.mjs';

const members=['iftee','samin','omor','ifty'];
const story='iftee samin theke 50 pay,iftyr wifi er bill dise 700 tk,omor abar iftee theke 170 pay.omorke iftee cha khayaise 20 tkr';
const brief=r=>r.kind==='debt'?`debt ${r.from}>${r.to} ${r.amount}`:`bill ${r.payer} [${r.participants}] ${r.amount}`;

test('Banglish "pay" means gets, possessive bills and -ke treats stay personal',()=>{
 assert.deepEqual(banglishRules(story,members).map(brief),['debt samin>iftee 50','bill null [ifty] 700','debt iftee>omor 170','bill iftee [omor] 20']);
 for(const [text,expected] of [
  ['iftee 520 pay samin theke',['debt samin>iftee 520']],
  ['omor samin er kache 300 pabe',['debt samin>omor 300']],
  ['iftee saminer kache 80 pay',['debt samin>iftee 80']],
  ['samin iftee theke 200 dhar nise',['debt samin>iftee 200']],
  ['samin betay iftee ke 500 dibe',['debt samin>iftee 500']],
  ['omor iftee ke 150 dhar',['debt omor>iftee 150']],
  ['iftee omorer mobile recharge 100 dise',['bill iftee [omor] 100']],
  ['১২০ taka iftee samin theke pabe',['debt samin>iftee 120']],
 ])assert.deepEqual(banglishRules(text,members).map(brief),expected,text);
});

test('Banglish rules stay silent when a statement is not clear enough',()=>{
 for(const text of ['iftee pay korse 600 dinner','iftee dinner er bill dise 1500 taka, sobai share korbo','iftee amader sobaike pizza khawaise 900','iftee 3 jon er jonno 600 dise','iftee cha khaise 20','iftee 200 or 300 pay samin theke','samin 22tk dise birir tk iftee ke'])
  assert.deepEqual(banglishRules(text,members),[],text);
 assert.deepEqual(banglishRules('ifty iftee theke 40 pay',members).map(brief),['debt iftee>ifty 40']);
});

test('reversed AI debts and over-shared personal bills are corrected without touching clear items',()=>{
 const wrong={expenses:[{payer:'iftee',amount:700,description:'wifi er bill',participants:['iftee','samin','omor','ifty']},{payer:'iftee',amount:20,description:'cha',participants:['iftee','omor']}],debts:[{from:'iftee',to:'samin',amount:50},{from:'omor',to:'iftee',amount:170}]};
 const r=applyBanglishRules(wrong,banglishRules(story,members),[]);
 assert.equal(r.fixes,4);
 assert.deepEqual(r.ledger.expenses.map(e=>[e.payer,e.amount,e.participants]),[['iftee',700,['ifty']],['iftee',20,['omor']]]);
 assert.deepEqual(r.ledger.debts.map(d=>[d.from,d.to,d.amount]),[['samin','iftee',50],['iftee','omor',170]]);
 const right=applyBanglishRules(r.ledger,banglishRules(story,members),[]);assert.equal(right.fixes,0);
 const missed=applyBanglishRules({expenses:[],debts:[]},banglishRules('iftee samin theke 50 pay',members),['iftee samin theke 50 pay']);
 assert.deepEqual(missed.ledger.debts,[{from:'samin',to:'iftee',amount:50}]);assert.deepEqual(missed.unknown,[]);
 const twin=applyBanglishRules({expenses:[],debts:[{from:'omor',to:'ifty',amount:50},{from:'ifty',to:'omor',amount:50}]},banglishRules('iftee samin theke 50 pay',members),[]);
 assert.equal(twin.fixes,0,'ambiguous matches are left for human review');
});

test('server corrects the AI answer from the reported Banglish note and reports the check',async()=>{
 const old=global.fetch;global.fetch=async()=>Response.json({candidates:[{content:{parts:[{text:JSON.stringify({expenses:[{payer:'iftee',amount:700,description:'wifi er bill',participants:members},{payer:'iftee',amount:20,description:'cha',participants:['iftee','omor']}],debts:[{from:'iftee',to:'samin',amount:50},{from:'omor',to:'iftee',amount:170}],unknown:[]})}]}}]});
 try{
  const r=await worker.fetch(new Request('https://splitmind.test/api/parse',{method:'POST',headers:{'Content-Type':'application/json','CF-Connecting-IP':'198.51.100.40'},body:JSON.stringify({members,text:story})}),{AI_ENABLED:'true',GEMINI_API_KEY:'k',AI_PER_MINUTE:'20',AI_DAILY_LIMIT:'500'});
  assert.equal(r.status,200);const d=await r.json();
  assert.equal(d.checked,4);
  assert.deepEqual(d.debts.map(x=>[x.from,x.to,x.amount]),[['samin','iftee',50],['iftee','omor',170]]);
  assert.deepEqual(d.expenses.map(x=>x.participants),[['ifty'],['omor']]);
 }finally{global.fetch=old}
});

test('the prompt teaches Banglish money grammar with the reported example',async()=>{
 const old=global.fetch;let prompt='';global.fetch=async(url,o)=>{prompt=JSON.parse(o.body).contents[0].parts[0].text;return Response.json({candidates:[{content:{parts:[{text:'{"expenses":[],"debts":[],"unknown":["x"]}'}]}}]})};
 try{await worker.fetch(new Request('https://splitmind.test/api/parse',{method:'POST',headers:{'Content-Type':'application/json','CF-Connecting-IP':'198.51.100.41'},body:JSON.stringify({members,text:'note'})}),{AI_ENABLED:'true',GEMINI_API_KEY:'k',AI_PER_MINUTE:'20',AI_DAILY_LIMIT:'500'});
  for(const piece of ['GETS / IS OWED','theke','-ke/-re','Possessive suffix','Iftee and Ifty are different people','re-check every debt direction'])assert(prompt.includes(piece),piece);
 }finally{global.fetch=old}
});

test('the page uses the same Banglish engine as the server and reads the note locally',async()=>{
 const [html,mod]=await Promise.all([readFile('ui/index.html','utf8'),readFile('worker/banglish.mjs','utf8')]);
 const cut=t=>t.slice(t.indexOf('/* banglish:start */'),t.indexOf('/* banglish:end */'));
 assert.equal(cut(html),cut(mod),'browser and server copies must be identical');
 const ctx={};vm.createContext(ctx);vm.runInContext(cut(mod)+';globalThis.rules=banglishRules;',ctx);
 assert.equal(ctx.rules(story,members).length,4);
});

test('an omitted Banglish subject carries over instead of someone paying their own bill',()=>{
 const rules=banglishRules(story,members);assert.equal(rules[1].payerGuess,'iftee');
 const ai={expenses:[{payer:'ifty',amount:700,description:'wifi er bill',participants:members},{payer:'iftee',amount:20,description:'cha',participants:['iftee','omor']}],debts:[{from:'iftee',to:'samin',amount:50},{from:'omor',to:'iftee',amount:170}]};
 const r=applyBanglishRules(ai,rules,[]);
 assert.deepEqual([r.ledger.expenses[0].payer,r.ledger.expenses[0].participants],['iftee',['ifty']]);
 assert.equal(banglishRules('iftyr wifi er bill dise 700 tk',members)[0].payerGuess,null,'no previous subject means no guess');
 const kept=applyBanglishRules({expenses:[{payer:'samin',amount:700,description:'wifi',participants:['ifty']}],debts:[]},rules.slice(1,2),[]);
 assert.equal(kept.ledger.expenses[0].payer,'samin','a different named payer from the AI is kept');
});

test('Banglish checks reject negatives, foreign currency and malformed comma amounts',()=>{
 for(const text of ['iftee samin ke -500 dibe','iftee samin ke 500 USD dibe','iftee samin ke 1,2 dibe','iftee samin ke ০.০০ dibe'])
  assert.deepEqual(banglishRules(text,members),[],text);
});

test('a Banglish correction cannot replace an unrelated same-price AI debt',()=>{
 const ledger={expenses:[],debts:[{from:'omor',to:'ifty',amount:50}]};
 const result=applyBanglishRules(ledger,banglishRules('iftee samin theke 50 pay',members),[]);
 assert.deepEqual(result.ledger,ledger);assert.equal(result.fixes,0);
});
