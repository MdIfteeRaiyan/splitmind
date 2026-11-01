# SplitMind

Shared bills are easy to lose track of after a dinner or a trip. SplitMind turns them into a clear plan for who pays whom, in Bangladeshi taka.

Built by **Md. Iftee Raiyan** · [Live app](https://splitmind-bd.vercel.app/) · [GitHub](https://github.com/MdIfteeRaiyan/)

## Try it

Add your group, enter expenses, check the bills, then open the settlement plan. The dinner and trip examples let you explore without entering your own data.

You can enter bills manually, paste English or Banglish notes, or upload a receipt. When enabled by the host, Gemini can extract expenses from text and read receipt images. Every result is reviewed before it affects the plan.

## What it does

- Equal or custom splits, including a percentage helper.
- Different payers, previous debts and partial repayments.
- Calculations in integer poisha to avoid floating-point rounding errors.
- A settlement plan with the fewest transfers for up to 12 nonzero balances; a greedy plan for larger groups.
- Local receipt OCR with editable totals, plus optional Gemini vision.
- Balance explanations and editable English, Bangla or Banglish reminders.
- Shareable plan snapshots, print, CSV/JSON reports and restorable backups.
- Optional device saving and light/dark themes.

Payments happen outside SplitMind. Recipient-provided links, QR codes and copied details help with payment handoff; a manual payment mark is never bank confirmation. All calculations use BDT.

## Run locally

Requires Node.js 22.

```sh
npm ci
npm start
```

Open http://localhost:3000. To check the release:

```sh
npm run build
```

The build generates `public/` for Vercel and runs the full test suite. No third-party build packages are needed. OCR downloads Tesseract.js only when requested.

## Deploy

Use [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md). Existing Vercel Gemini settings should be preserved. For a new local setup, copy `.env.example` to `.env` and follow [AI_SETUP.md](AI_SETUP.md). Keep provider keys on the server.

## Privacy and limits

Manual entry and local note parsing run in the browser. Local notes use limited rules, not a language model. OCR loads third-party code and language data; the receipt image stays on the device unless you choose vision AI. AI sends the selected content to the configured provider.

Device saving is optional. Backups can include wallet details. Shared links contain names and amounts readable by anyone with the link; they are snapshots, not synchronized groups. Full-payment marks and photos are not saved.

Core tools need no paid AI subscription. Provider quotas, availability and data terms apply to optional AI. For a broad public launch, configure shared rate limits as described in AI_SETUP.md. Default in-memory limits apply only within one server instance.

Automated tests cover accounting and workflows, including mocked AI/OCR responses. They do not establish receipt accuracy or usability on real phones. See [BUILDATHON_READINESS.md](BUILDATHON_READINESS.md) for the remaining field checks.

## Source and license

`ui/` contains the page and assets, `worker/` the API and calculation engine, `api/` the Vercel adapter, and `tests/` the checks. Older visual components are retained in `ui/components/` with provenance notices; they are not executed by the app.

MIT licensed. Tesseract.js is Apache-2.0 licensed: https://github.com/naptha/tesseract.js.
