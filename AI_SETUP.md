# Optional free-tier AI setup

Core bills, local notes, OCR, splits and sharing work without AI configuration.

## Gemini first
1. Sign into https://aistudio.google.com/ using your chosen Google account. Create/select a project eligible for the Gemini API free tier. Confirm the project shows Free tier and check its model quota before using it. Do not enable paid billing if your goal is zero AI API charges. This app cannot inspect or enforce your provider billing plan.
2. Create an API key. Paste it only in Vercel project Settings → Environment Variables as GEMINI_API_KEY for Production. Do not paste it into chat, frontend code or Git.
3. Add AI_ENABLED=true and GEMINI_MODEL=gemini-2.5-flash. The model accepts text/images and has a listed free tier; availability, region and quota depend on the provider/account and can change. Verify in AI Studio.
4. Optionally configure GROQ_API_KEY and GROQ_MODEL=llama-3.3-70b-versatile from your own Groq free-tier project. Groq is a text-only fallback in this implementation, not a receipt-image fallback. It is tried after temporary provider failures/rate limits; no OpenAI calls are made.
5. Optional DEMO_ACCESS_CODE provides a shared judge/demo gate. Users enter the code under footer Connected tools; never enter a provider API key there. BYOK browser fields are intentionally not included.
6. Deploy the new source to Vercel, then check /api/config. aiReady confirms key/config presence, not a successful provider call. visionReady needs Gemini. Test a real request to confirm the provider works.
7. In Expenses, use Extract with AI for a pasted chat. Review all names, amounts and exclusions. In photos, select payer/participants and Read with vision AI. Item/VAT/charge breakdowns are reference information only; the final payable total is entered once.

## Quotas and no silent charges
AI_PER_MINUTE (default 4, max 20) and AI_DAILY_LIMIT (default 40, max 500) cap requests. Without Redis these are best-effort per server instance: cold starts/multiple instances can reset or multiply them. They are NOT a hard deployment-wide budget. Your provider free-tier limits still apply. Up to two upstream model attempts can occur per accepted text request.

For a durable shared atomic cap, create a Redis database compatible with Upstash REST and configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Use its free plan only if available and appropriate; verify its own usage terms. The app uses one atomic EVAL to check/increment a hashed-IP minute key and UTC daily key before any model call. If that configured store fails, AI fails closed and local tools remain available. Do not claim global enforcement without configuring/testing Redis. Edge IP-header trust depends on your host.

## Privacy
Selected chat/images or confirmed ledger facts are sent only when the user chooses an AI action. Gemini/Groq free-service data terms may permit product improvement; remove private messages/payment identifiers and use permitted receipts. No provider key is exposed in config or stored in local drafts. No keys are accepted through a public browser input. There is no guarantee of perpetual free tiers or model availability.

## Honest demos
Dinner/trip examples run locally and consume no API quota. They are fictional deterministic examples, not evidence of a live AI call. Live AI is labeled separately. Errors fall back to local review for notes; photos offer local OCR/manual entry. A fallback is not a guarantee that every input can be understood.

Official references checked October 31, 2026:
https://ai.google.dev/gemini-api/docs/pricing
https://ai.google.dev/gemini-api/docs/billing
https://ai.google.dev/gemini-api/docs/generate-content/structured-output
https://console.groq.com/docs/structured-outputs
https://upstash.com/docs/redis/features/restapi

## When a configured key still fails
Configuration presence is not a successful live request. Popups now preserve a safe provider name and HTTP reason: 400 key/request/project requirements, 403 permissions, 404 model access, 429 quota, 5xx provider availability, or timeout/connection failure. Check the corresponding project in AI Studio and redeploy after changing server variables. Raw provider messages, API keys and billing identifiers are never sent to users. Manual entry/local notes/OCR remain available.
