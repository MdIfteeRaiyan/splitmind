import test from 'node:test';
import assert from 'node:assert/strict';
import adapter from '../api/index.js';

// Vercel injects real production variables while running the build. Each adapter
// test owns its fixture and restores the inherited environment, including keys.
const fixtureKeys=['AI_ENABLED','GEMINI_API_KEY','GROQ_API_KEY','DEMO_ACCESS_CODE','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN'];
async function withEnvironment(values,run){
  const previous=new Map(fixtureKeys.map(key=>[key,process.env[key]]));
  try{
    for(const key of fixtureKeys){if(values[key]===undefined)delete process.env[key];else process.env[key]=values[key]}
    return await run();
  }finally{
    for(const [key,value] of previous){if(value===undefined)delete process.env[key];else process.env[key]=value}
  }
}
const getConfig=async()=>{const response=await adapter.fetch(new Request('https://splitmind.test/api?route=config'));assert.equal(response.status,200);return response.json()};

test('Vercel adapter routes config, rejects retired endpoints, and preserves origin checks',async()=>withEnvironment({},async()=>{
  assert.deepEqual(await getConfig(),{aiReady:false,visionReady:false,mode:'free-local',localOCR:true,accessRequired:false,quotaProtection:'instance'});
  const missing=await adapter.fetch(new Request('https://splitmind.test/api?route=orders'));
  assert.equal(missing.status,404);
  const forbidden=await adapter.fetch(new Request('https://splitmind.test/api?route=plan',{
    method:'POST',headers:{'Content-Type':'application/json',Origin:'https://evil.test'},body:'{}'
  }));
  assert.equal(forbidden.status,403);
}));

test('Vercel adapter reports configured Gemini without exposing its key',async()=>withEnvironment({AI_ENABLED:'true',GEMINI_API_KEY:'test-gemini-fixture'},async()=>{
  const config=await getConfig();
  assert.deepEqual(config,{aiReady:true,visionReady:true,mode:'optional-ai',localOCR:true,accessRequired:false,quotaProtection:'instance'});
  assert.equal(JSON.stringify(config).includes('test-gemini-fixture'),false);
}));

test('Vercel adapter distinguishes text-only fallback, demo gate and durable quotas',async()=>withEnvironment({AI_ENABLED:'true',GROQ_API_KEY:'test-groq-fixture',DEMO_ACCESS_CODE:'test-code',UPSTASH_REDIS_REST_URL:'https://redis.example.test',UPSTASH_REDIS_REST_TOKEN:'test-redis-fixture'},async()=>{
  assert.deepEqual(await getConfig(),{aiReady:true,visionReady:false,mode:'optional-ai',localOCR:true,accessRequired:true,quotaProtection:'durable'});
}));
