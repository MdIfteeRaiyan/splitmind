/* banglish:start */
// Deterministic Banglish money grammar. Used to check AI results and to read notes locally.
// Only clear, single-amount statements produce rules; anything else is left for AI or review.
const BN_WORDS={
 receive:/^(?:pay|pai|pae|pabe|paibe|paibo|pabo|paben|pawna|paona|paowa|pawa|gets?|receives?)$/,
 afterPay:/^(?:kor\S*|dis\S*|dil\S*|diy\S*|done)$/,
 paid:/^(?:dise|disi|dilo|dilam|disilo|disila|diyeche|diyechi|diyese|diyesi|paid|kinse|kinlo|kineche|kinsi|bhorse|bhorlo|vorse|vorlo|bhoreche)$/,
 give:/^(?:dibe|debe|diba|diben|dibi|dite|deya|dewa|ferot)$/,
 borrow:/^(?:nise|nilo|nisilo|nisi|niyeche|niyechi|niyese|nilam|borrowed)$/,
 owe:/^(?:dhar|dhaar|rin|baki|bakee|owes?)$/,
 treat:/^kh(?:a|o)o?[wy][aoy]*i[sclhy]/,
 group:/^(?:sobai|shobai|sobar|shobar|sobaike|shobaike|amra|amader|amaderke|all|everyone|everybody|split|share|bhag|vag|duijon|dujon|tinjon|charjon|jon|both)$/,
 bill:/^(?:bill|bil|vara|bhara|fee|fees|recharge|khoroch|khorch|ticket|wifi|net|internet|current|biddut|gas|rent|tuition|mobile|phone|data|beton|kisti)$/,
 source:/^(?:theke|thake|from)$/,
 kache:/^(?:kache|kase|kach|kachhe)$/,
 obj:/^(?:ke|re)$/,
 poss:/^(?:er|r|ar)$/,
 count:/^(?:jon|people|person|persons|ta|ti|din|days?)$/,
 filler:/^(?:tk|taka|takar|tkr|bdt|abar|ager|age|er|r|ar|ke|re|betay|beta|jonno|for|the|and|ar|o|tao|ta|ki|na|but|kintu|ekta|already|mot|total)$/
};
function bnNormalize(text){return String(text||'').replace(/[০-৯]/g,d=>String('০১২৩৪৫৬৭৮৯'.indexOf(d)))}
function bnClauses(text){
 const parts=bnNormalize(text).split(/\n|[;।!?]|\.(?!\d)|,(?=\s*\p{L})/u).map(s=>s.trim()).filter(Boolean),out=[];
 for(const p of parts){if(!/\d/.test(p)&&out.length)out[out.length-1]+=', '+p;else out.push(p)}
 return out;
}
function bnAmount(raw){if(!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(String(raw)))return 0;const n=Number(String(raw).replace(/,/g,''));return Number.isFinite(n)&&n>=0.01&&n<=1000000&&Math.abs(n*100-Math.round(n*100))<1e-6?n:0}
function bnEntities(tokens,names){
 const lower=names.map(n=>[n.toLowerCase(),n]).sort((a,b)=>b[0].length-a[0].length),found=[];
 for(let i=0;i<tokens.length;i++){
  const t=tokens[i];let name=null,role=null;
  const exact=lower.find(([l])=>l===t);
  if(exact){name=exact[1];role='nom'}
  else for(const [suffix,r] of [['theke','source'],['kache','kache'],['ke','obj'],['re','obj'],['er','poss'],['ar','poss'],['r','poss']]){
   if(!t.endsWith(suffix))continue;const hit=lower.find(([l])=>l===t.slice(0,-suffix.length));if(hit){name=hit[1];role=r;break}
  }
  if(!name)continue;
  const next=tokens[i+1]||'',after=tokens[i+2]||'';
  if(role==='nom'){if(BN_WORDS.source.test(next))role='source';else if(BN_WORDS.obj.test(next))role='obj';else if(BN_WORDS.poss.test(next))role=BN_WORDS.kache.test(after)?'source':'poss'}
  else if(role==='poss'&&BN_WORDS.kache.test(next))role='source';
  else if(role==='kache')role='source';
  found.push({name,role,i});
 }
 return found;
}
function banglishRules(text,names){
 const rules=[];let lastSubject=null;
 bnClauses(text).forEach((clause,index)=>{
  if(/[-−–]\s*\d|[$€£₹]|\b(?:usd|eur|gbp|inr|dollars?|rupees?)\b/i.test(clause))return;
  const tokens=clause.toLowerCase().match(/[\p{L}\p{M}]+|\d[\d,]*(?:\.\d+)?/gu)||[];
  const amounts=tokens.map((t,i)=>/^\d/.test(t)&&!BN_WORDS.count.test(tokens[i+1]||'')?bnAmount(t):null).filter(a=>a!==null);
  const ents=bnEntities(tokens,names),subject=[...new Set(ents.filter(e=>e.role==='nom').map(e=>e.name))];
  const carried=lastSubject;if(subject.length===1)lastSubject=subject[0];
  if(amounts.length!==1||!amounts[0])return;
  const amount=amounts[0];
  const role=r=>[...new Set(ents.filter(e=>e.role===r).map(e=>e.name))];
  const nom=role('nom'),src=role('source'),obj=role('obj'),poss=role('poss');
  const has=k=>tokens.some(t=>BN_WORDS[k].test(t));
  const payVerb=tokens.some((t,i)=>t==='pay'&&BN_WORDS.afterPay.test(tokens[i+1]||''));
  const receive=tokens.some((t,i)=>BN_WORDS.receive.test(t)&&!(t==='pay'&&BN_WORDS.afterPay.test(tokens[i+1]||'')));
  const paid=has('paid')||payVerb,give=has('give'),borrow=has('borrow'),owe=has('owe'),treat=has('treat'),group=has('group');
  const used=new Set(ents.map(e=>e.i));
  const words=tokens.filter((t,i)=>!used.has(i)&&!/^\d/.test(t)&&!['receive','paid','give','borrow','owe','treat','group','source','kache','obj','filler','afterPay'].some(k=>BN_WORDS[k].test(t))&&t!=='pay');
  const add=r=>rules.push({...r,description:words.join(' ').slice(0,60)||r.description,amount,clause,index});
  if(receive&&!paid&&!give&&nom.length===1&&src.length===1&&nom[0]!==src[0])return add({kind:'debt',from:src[0],to:nom[0]});
  if(borrow&&!receive&&nom.length===1&&src.length===1&&nom[0]!==src[0])return add({kind:'debt',from:nom[0],to:src[0]});
  if(give&&!paid&&!receive&&nom.length===1&&obj.length===1&&nom[0]!==obj[0])return add({kind:'debt',from:nom[0],to:obj[0]});
  if(treat&&!group&&nom.length===1&&obj.length&&!obj.includes(nom[0]))return add({kind:'expense',payer:nom[0],participants:obj,description:'Treat'});
  if(owe&&!paid&&!receive&&!treat&&nom.length===1&&obj.length===1&&nom[0]!==obj[0])return add({kind:'debt',from:nom[0],to:obj[0]});
  if(paid&&!group&&!obj.length&&poss.length===1&&!nom.includes(poss[0])&&nom.length<=1){
   const at=ents.find(e=>e.role==='poss').i;
   if(tokens.slice(at+1,at+5).some(t=>BN_WORDS.bill.test(t)))return add({kind:'expense',payer:nom[0]||null,payerGuess:nom[0]?null:(carried&&carried!==poss[0]?carried:null),participants:poss,description:'Bill'});
  }
 });
 return rules;
}
function applyBanglishRules(ledger,rules,unknown){
 const expenses=ledger.expenses.map(e=>({...e,participants:[...e.participants]})),debts=ledger.debts.map(d=>({...d}));
 let fixes=0;const used=new Set(),drop=new Set();
 const cents=n=>Math.round(n*100),sameSet=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
 for(const r of rules){
  const people=r.kind==='debt'?[r.from,r.to]:[...(r.payer?[r.payer]:[]),...r.participants];
  const score=list=>people.filter(p=>list.includes(p)).length;
  const cands=[...debts.map((d,i)=>({type:'debt',i,item:d,people:[d.from,d.to]})),...expenses.map((e,i)=>({type:'expense',i,item:e,people:[e.payer,...e.participants]}))]
   .filter(c=>!used.has(c.type+c.i)&&!drop.has(c.i+':'+c.type)&&cents(c.item.amount)===cents(r.amount)).sort((a,b)=>score(b.people)-score(a.people));
  if(cands.length>1&&score(cands[0].people)===score(cands[1].people))continue;
  if(cands.length&&score(cands[0].people)===0)continue;
  const c=cands[0];
  if(!c){
   if(r.kind==='debt'){debts.push({from:r.from,to:r.to,amount:r.amount});used.add('debt'+(debts.length-1));fixes++}
   else if(r.payer){expenses.push({payer:r.payer,amount:r.amount,description:r.description,participants:[...r.participants]});used.add('expense'+(expenses.length-1));fixes++}
   else continue;
   unknown=unknown.filter(u=>!(bnNormalize(u).includes(String(r.amount))&&people.some(p=>u.toLowerCase().includes(p.toLowerCase()))));
   continue;
  }
  used.add(c.type+c.i);
  if(r.kind==='debt'){
   if(c.type==='debt'){if(c.item.from!==r.from||c.item.to!==r.to){c.item.from=r.from;c.item.to=r.to;fixes++}}
   else{drop.add(c.i+':expense');debts.push({from:r.from,to:r.to,amount:r.amount});used.add('debt'+(debts.length-1));fixes++}
  }else if(c.type==='expense'){
   if(r.payer&&c.item.payer!==r.payer){c.item.payer=r.payer;fixes++}
   // Someone's own bill paid by themselves is not a group expense: the omitted Banglish subject carries over.
   else if(!r.payer&&r.payerGuess&&r.participants.length===1&&c.item.payer===r.participants[0]){c.item.payer=r.payerGuess;fixes++}
   if(!sameSet(c.item.participants,r.participants)){c.item.participants=[...r.participants];fixes++}
  }else{
   const payer=r.payer||c.item.to;
   if(r.participants.length===1&&(c.item.from!==r.participants[0]||c.item.to!==payer)&&payer!==r.participants[0]){c.item.from=r.participants[0];c.item.to=payer;fixes++}
  }
 }
 return{ledger:{expenses:expenses.filter((_,i)=>!drop.has(i+':expense')),debts},unknown,fixes};
}
/* banglish:end */
export {bnClauses,banglishRules,applyBanglishRules};
