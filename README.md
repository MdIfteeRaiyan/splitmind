# SplitMind v2 beta — Free core, optional AI

Optional server-side Gemini/Groq integration, receipt vision, shared URL snapshots, exact balance explanations and multilingual reminder drafts are documented in AI_SETUP.md and BUILDATHON_READINESS.md. AI is off by default and needs an owner-configured provider key. Core local features remain free.

# SplitMind — free edition

A BDT shared-expense web app by Md. Iftee Raiyan. No account, API key, access code or paid AI service is required.

## Run
Node 22: `npm ci`, then `npm start`. Open http://localhost:3000. `npm run build` creates the deployable page and runs the automated checks. MIT license.

## Features
- Four guided steps: group, expenses, review, settle.
- Manual descriptions in any language; limited English/Banglish rule-based note parsing with Bengali digits. This is not generative AI or universal language understanding.
- Equal/custom shares, a percentage calculator that converts to exact BDT shares, multiple payers, existing debts, integer-poisha accounting, minimized settlement transfers (exact for up to 12 nonzero balances, greedy thereafter).
- Free browser receipt OCR, editable text and final total, explicit BDT confirmation before adding a bill. JPEG/PNG/WebP up to 3 MB; no PDF/HEIC.
- OCR languages: English, Bangla+English, Hindi+English, Arabic+English. Accuracy is not guaranteed or proven on local receipts. Handwriting and blurry receipts may need manual entry.
- Portable JSON backup download/import (including partial repayments), phone-camera receipt input on supported devices, partial manual repayments, full-payment marks, copy/share/WhatsApp, JSON/CSV export, print, local draft save/restore, light/dark mode and an optional lightweight static background.
- Recipient-owned HTTPS payment links/QR and reference copying. No direct money transfers or provider verification.

## Privacy and downloads
Bills and photos are processed in the browser. Receipt scanning lazily loads Tesseract.js 6.0.1 from jsDelivr; its worker/core and language models require internet. It can take time or fail on low-memory phones; manual entry always remains available. Download hosts see ordinary download requests, not receipt uploads by SplitMind. There is no cloud account or group synchronization. Optional saving uses localStorage; photos and full-payment marks are session-only. Sharing/export deliberately sends the selected content outside the app.

## Free scope
Core mode makes no AI provider calls. Optional AI uses the provider/account tier configured by the owner. `/api/parse` is opt-in and ignores legacy OpenAI keys. `/api/config` reports AI/vision availability without secrets. Static hosting can use a provider's free plan subject to its terms, quotas and network/data costs. No unlimited hosting or perpetual third-party availability is promised.

## Build and tests
UI/engine/OCR workflow tests include mocks of OCR; they do not prove real image recognition accuracy. Build runs the full test suite. Test real receipts and phones before reporting accuracy or user outcomes. See FREE_EDITION.md, TRIP_DEMO.md and BUILDATHON_READINESS.md.

## Third-party notices
Tesseract.js is Apache-2.0: https://github.com/naptha/tesseract.js . It wraps the Tesseract OCR engine and neural-network language models. Model assets are fetched by the library. Existing React visual components and provenance files remain in ui/components. The core needs no cloud model. Optional server-side Gemini/Groq is available when configured; do not describe local note rules as generative AI.

## Reliability release (beta.3)
The live page and build use plain HTML/CSS/JavaScript and Node built-ins, with no third-party build packages or WebGL rendering. Archived visual source is retained for provenance, but is not bundled or executed. The optional OCR library downloads only when requested. Startup errors show a recovery message; reload does not erase the saved device draft. See BUILDATHON_READINESS.md for uncompleted real-world validation and sticker requirements.
