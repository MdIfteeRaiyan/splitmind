# Start here

Read **DEPLOYMENT_STEPS.md** for numbered GitHub → Vercel instructions.

# SplitMind

A small shared-expense calculator for friends, families and trips. Add people, enter bills, review the split and share who pays whom.

## Run locally

Requires Node.js 22+.

1. Run `npm ci`.
2. Copy `.env.example` to `.env`; AI fields may stay blank for manual use.
3. Run `npm start`, then open http://localhost:3000.
4. Run `npm run build` before `npm test`.

## Features

- Four clickable, keyboard-accessible steps: Group, Expenses, Review, Settle. Group names and bill amounts are validated before advancing.
- Manual descriptions in any language; local automatic note recognition for supported English/Banglish patterns.
- JPEG, PNG and WebP bill-photo previews, up to 3 MB. Optional configured AI reading requires review. PDF/HEIC inputs are not supported.
- Integer-poisha equal sharing with deterministic remainder allocation. Exact minimum-transfer optimization up to 12 nonzero balances, labeled greedy fallback above that.
- Optional browser-local draft save/restore/delete, print, CSV/JSON export and copy/share summary.
- Payment-method labels: bKash, Nagad, Rocket, Upay, bank transfer, card, cash, cryptocurrency and other/custom wallets. These are manual guidance and records, not payment integrations.

## Payment limits

SplitMind does not send, receive or hold funds. All actual payments happen outside the site. Ledger values are BDT; no crypto pricing, exchange-rate conversion, card collection or blockchain execution is provided. A recorded payment is the user's own record, not provider verification. Legacy order/capture endpoints are removed and return 404.

## Optional AI

Set `OPENAI_API_KEY`, `OPENAI_MODEL` (default `gpt-4.1-mini`) and `DEMO_ACCESS_CODE` on the server. Users enter the access code under Footer → Tools → Access code. `/api/parse` uses schema-constrained multilingual note/image extraction; it must never invent payer/participants for receipts. Ambiguous totals and explicit non-BDT currency need review. Provider results are not automatically accepted. `PORT` controls the local server.

## Privacy and local drafts

Unsaved entries live in memory. Opt-in saving stores one draft in this browser: names, optional wallet numbers, notes and ledger. Restoring starts at Review; payment records, images, access codes and provider tokens are excluded. Pause saving keeps the last copy; Delete removes it without clearing the open workspace. Shared-device users should avoid saving sensitive details. AI receives selected notes/photos and names only after an explicit AI action. Share summary excludes wallet numbers and credentials. No cloud login/sync or analytics is implemented.

## Architecture and visual components

`ui/index.html` owns the workspace. `ui/effects.jsx` integrates the supplied SlingButton, ElectricLogo, HoldButton and SideRays components in `ui/components/`. React/Motion/OGL/Hugeicons are bundled locally with esbuild into the served page. The logo uses one slot and a static fallback; SideRays is the gold-and-blue full-viewport background. Effects can be disabled and respect reduced motion. Sources and provenance hashes are retained.

`worker/index.js` serves the page, optional AI API and server-side ledger calculation. `worker/engine.mjs` owns integer accounting. Vercel configuration is in `vercel.json`; `api/index.js` adapts the API to Vercel. Build produces `public/index.html` and a local test bundle at `dist/server/index.js`.

## Verification limits

Automated tests cover accounting, review/navigation, storage recovery, sharing, uploads, validation and mocked AI. Real provider extraction and mobile/desktop graphics/browser QA remain pending. The public audience has not been changed.

MIT license for project code; supplied component attribution is retained in `ui/components/README.md`.

## Creator and recipient payment links

Built by **Md. Iftee Raiyan**. GitHub: https://github.com/MdIfteeRaiyan/ · LinkedIn: https://www.linkedin.com/in/md-iftee-raiyan-b20336386/ . Footer navigation uses one set of expandable sections; the creator block lives inside About.

Each person can optionally provide separate account details, an HTTPS payment link and a provider-generated QR image for each method. These are recipient-supplied destinations, not provider-verified integrations. SplitMind shows the destination host and BDT amount for confirmation, does not append invented amount parameters and never marks a link click/QR view as payment. Invalid/non-HTTPS links cannot be opened. QR uploads accept JPEG/PNG/WebP up to 1 MB and 12 megapixels; photos remain in memory and are excluded from saved drafts. Account details and links save only with explicit device-saving consent. Existing drafts without these fields remain compatible. Copy controls are available for the amount and recipient details.
