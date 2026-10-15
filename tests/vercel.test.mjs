import test from 'node:test';
import assert from 'node:assert/strict';
import adapter from '../api/index.js';

test('Vercel adapter routes config, rejects retired endpoints, and preserves origin checks', async () => {
  const config = await adapter.fetch(new Request('https://splitmind.test/api?route=config'));
  assert.equal(config.status, 200);
  assert.deepEqual(Object.keys(await config.json()), ['aiReady']);
  const missing = await adapter.fetch(new Request('https://splitmind.test/api?route=orders'));
  assert.equal(missing.status, 404);
  const forbidden = await adapter.fetch(new Request('https://splitmind.test/api?route=plan', {
    method: 'POST', headers: {'Content-Type':'application/json', Origin:'https://evil.test'}, body:'{}'
  }));
  assert.equal(forbidden.status, 403);
});
