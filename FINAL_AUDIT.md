# SplitMind final release audit

Audit date: 21 November 2026 (Bangladesh). Source: uploaded splitmind-main.zip. This audit preserves the existing green design, logo and buildathon sticker. It fixes demonstrated defects; it does not certify that no future defect can occur.

## Fixed in this release

- Manual bill amounts, descriptions and custom shares now update the draft while typing. Adding another bill no longer relies on the browser firing a blur/change event first.
- Adding a manual bill keeps recognized entries and unresolved notes.
- Editing notes keeps the existing ledger. Re-parsing asks before replacement; cancelling preserves it.
- Group changes ask before clearing a reviewed ledger. Cancelling keeps names and bills.
- Invalid negative amounts, foreign currency and malformed comma grouping cannot silently become valid Banglish debts.
- Unsupported exclusion wording such as “B jai nai” stays flagged for review rather than silently charging everybody.
- Banglish correction does not overwrite an unrelated same-amount AI debt.
- Both local and AI note entry enforce the 8,000-character limit before processing.
- Invalid JSON body shapes and null ledger entries return validation errors instead of internal errors.
- Backup debt-note metadata is validated before replacing the workspace.
- Stale receipt AI failures cannot overwrite a newer workspace status.
- Shared snapshot marks reset for a new snapshot. Unicode link payloads are checked after encoding, and valid aggregate transfers up to the ledger maximum can round-trip.
- Long names wrap in settlement/member layouts.
- Development startup supports the preview host and port and validates its own origin correctly.

## Verification and its limits

| Area | Evidence |
|---|---|
| Build and automated suite | Run npm ci, then npm run build; the latter builds and executes the full test suite. Final result: 136 passed, zero failed (125 tests in the uploaded baseline). Test logs are included under evidence. |
| Arithmetic | Existing engine tests cover equal/custom/percentage shares, rounding, debts, repayments and settlement behavior. |
| Browser workflow | Entered Rahim/Rina/Karim, three manual bills and one debt. Expected and observed totals: spending 2,850 BDT; Karim pays Rahim 400; Rina pays Rahim 200. |
| Partial payment | Recorded a fictional 100 BDT from Karim; remaining transfer became 300 and total remaining became 500. |
| Reminder and copy | English and Bangla local reminders contained the updated 300 BDT amount; copied summary contained the remaining 300 and 200 BDT transfers. No message or actual payment was sent. |
| Group inputs | Removed and re-added a member and typed into the resulting fields in the browser; regression tests also cover group-change cancellation. |
| AI and API | Automated provider fixtures cover configuration, structured output, retry/fallback/error handling, quotas and validation. These are mocked integration tests, not live model accuracy evidence. |
| Receipts, backups and sharing | Automated UI/API tests cover supported file handling, OCR uncertainty, backup validation, snapshots and privacy constraints. Real receipt accuracy was not benchmarked. |
| Layout | Existing responsive CSS and startup tests reviewed; desktop browser rendering inspected. No new physical phone or mobile Safari run was performed in this audit. |
| Public Vercel | This environment returned “Forbidden. Calls to this URL are not allowed.” Actual public accessibility and production Gemini extraction could not be checked. This is an environment access limit, not evidence that the site is down. |

## Deployment before judging

1. Keep a backup of your existing source and any saved demo ledger.
2. Copy this release into your existing repository, preserving its .git directory and local .env. Do not commit .env or API keys.
3. With Node.js 22 installed, run npm ci and npm run build. Review the changed files, commit and push through your existing deployment workflow.
4. Keep your already-working Vercel AI_ENABLED, GEMINI_API_KEY and GEMINI_MODEL values. This ZIP does not contain or replace production secrets.
5. Wait for Vercel to finish. In a private browser window, check the homepage, then perform one short AI extraction, confirm the ledger and settlement, and open a copied plan link in another tab.
6. On the actual presentation phone/laptop check 320–430 px widths, the Expenses label, name typing after removal, modal centering, and the on-screen keyboard.
7. Keep an exported backup and a short English screen recording available. External model latency, quota and network access remain outside the local test suite.

## Reproducible presentation example

Add Rahim, Rina and Karim. Enter these manually (or use the AI notes below and review the result):

- Dinner: Rahim paid 1,500, shared by all three.
- Cinema: Rina paid 900, shared by Rahim and Rina only.
- Uber: Karim paid 450, shared by all three.
- Previous debt: Karim owes Rahim 200.

Expected initial balances: Rahim +600, Rina -200, Karim -400. Spending is 2,850; old debt is not new spending. Expected two transfers: Karim to Rahim 400 and Rina to Rahim 200.

AI notes for the same fictional example:

    Rahim paid 1500 BDT for dinner, shared equally by Rahim, Rina and Karim.
    Rina paid 900 BDT for cinema, shared equally by Rahim and Rina only.
    Karim paid 450 BDT for Uber, shared equally by Rahim, Rina and Karim.
    Karim owes Rahim 200 BDT from a previous debt.

Show human review before calculating. Then record a fictional 100 BDT partial payment to demonstrate the remaining 300 and 200 transfers. Explain that marking paid is a manual record, not a bank transaction.

## Honest presentation claims

AI proposes structured entries; users confirm. The settlement calculation is deterministic. Local rules support limited phrasing and flag uncertainty; they do not understand every Banglish sentence. Shared URLs are editable snapshots, not authenticated live collaboration. Six friends reported no issues on 19 November; their feedback is informal and predates these fixes. Instance quotas are best-effort unless durable quota storage is configured. Do not claim unlimited public-scale capacity, guaranteed model accuracy, verified payments or zero bugs.
