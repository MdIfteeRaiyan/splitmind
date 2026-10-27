export function calculate(members,data){
 const cents=Object.fromEntries(members.map(m=>[m.name,0])),pair=new Map();let total=0;
 const add=(a,b,v)=>{if(a===b)return;const k=JSON.stringify([a,b].sort());pair.set(k,(pair.get(k)||0)+(a<b?v:-v))};
 data.expenses.forEach(e=>{const amount=Math.round(e.amount*100),base=Math.floor(amount/e.participants.length),remainder=amount%e.participants.length,custom=e.shares;if(custom!==undefined&&(!Array.isArray(custom)||custom.length!==e.participants.length||custom.some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0||Math.abs(v*100-Math.round(v*100))>0.000001)||custom.reduce((sum,v)=>sum+Math.round(v*100),0)!==amount))throw Error('Custom shares must match the bill total.');total+=amount;cents[e.payer]+=amount;e.participants.forEach((n,i)=>{const share=custom===undefined?base+(i<remainder?1:0):Math.round(custom[i]*100);cents[n]-=share;add(n,e.payer,share)})});
 data.debts.forEach(d=>{const amount=Math.round(d.amount*100);cents[d.from]-=amount;cents[d.to]+=amount;add(d.from,d.to,amount)});
 const optimized=optimizeBalances(cents);
 return{bal:Object.fromEntries(Object.entries(cents).map(([n,v])=>[n,v/100])),tx:optimized.tx,exact:optimized.exact,naive:[...pair.values()].filter(v=>v!==0).length,total:total/100};
}
export function optimizeBalances(cents){
 const entries=Object.entries(cents).filter(([,v])=>v!==0),n=entries.length;
 if(entries.reduce((s,[,v])=>s+v,0)!==0)throw Error('Ledger does not balance');
 const exact=n<=12;let groups=[entries];
 if(exact&&n){
  const size=1<<n,sums=new Float64Array(size),memo=new Int8Array(size).fill(-1),choice=new Int32Array(size);memo[0]=0;
  for(let mask=1;mask<size;mask++){const bit=mask&-mask,index=31-Math.clz32(bit);sums[mask]=sums[mask^bit]+entries[index][1]}
  function solve(mask){if(memo[mask]>=0)return memo[mask];const first=mask&-mask;let best=-1;for(let sub=mask;sub;sub=(sub-1)&mask){if(!(sub&first)||sums[sub]!==0)continue;const score=1+solve(mask^sub);if(score>best){best=score;choice[mask]=sub}}return memo[mask]=best}
  solve(size-1);groups=[];for(let mask=size-1;mask;){const sub=choice[mask];groups.push(entries.filter((_,i)=>sub&(1<<i)));mask^=sub}
 }
 const tx=[];for(const group of groups){const cr=group.filter(([,v])=>v>0).map(([n,v])=>[n,v]).sort((a,b)=>b[1]-a[1]),de=group.filter(([,v])=>v<0).map(([n,v])=>[n,-v]).sort((a,b)=>b[1]-a[1]);let i=0,j=0;while(i<de.length&&j<cr.length){const a=Math.min(de[i][1],cr[j][1]);tx.push({from:de[i][0],to:cr[j][0],amt:a/100});de[i][1]-=a;cr[j][1]-=a;if(!de[i][1])i++;if(!cr[j][1])j++}}
 return{tx,exact};
}

