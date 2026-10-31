# Buildathon readiness — v2 beta

Implemented: optional server-side AI chat extraction, Gemini receipt vision with item/VAT/service-charge breakdown, validated human review, local fallback, exact BDT accounting, snapshot share links, per-person balance explanations, editable multilingual reminder drafts and external payment handoff. No payments are processed or verified.

## Still needs real evidence
- Configure a provider key and make a real successful call. Tests mock provider responses; they do not prove live model accuracy.
- Scan 10 permitted real BDT receipts. Enter human-checked totals first, record returned total/items/taxes, uncertainty and corrections. Report exact counts and denominator, not invented accuracy. See evidence/receipt-tests.csv.
- Test five first-time users on their phones: group, bill/chat, receipt review, settlement, partial payment and sharing without coaching. Log errors, time, assistance and retest fixes. See evidence/phone-tests.csv.
- Obtain/add the official sticker. The prior text banner was removed at the user's request; sticker compliance remains pending.
- Record actual app footage. Never represent local examples, mocked tests or fallback drafts as live AI.

## Scope limits
Shared links are unsigned snapshots, not authenticated live groups. They contain names and amounts visible to anyone with the URL; they exclude recipient account details and images. Payment marks on a recipient's copy do not sync or survive refresh. Exact balance math stays deterministic. AI rewrites can be wrong; the factual breakdown remains visible for comparison. Global durable caps need Redis configuration; otherwise limits are per-instance only.

## Recording sequence
Show one real messy chat extraction and review. Scan one real permitted receipt and compare the final BDT total and breakdown with the photo. Correct any uncertainty rather than hiding it. Demonstrate a trip with custom shares and a partial repayment. Open a snapshot in another browser and show its isolated local mark. Explain a balance and draft a Bangla/Banglish reminder, reviewing before sharing. Report only measured user and accuracy results.
