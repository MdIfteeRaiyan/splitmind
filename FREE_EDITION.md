# Current v2 scope

Free local tools remain available without secrets. Optional Gemini/Groq AI is now implemented; see AI_SETUP.md for opt-in server setup, provider free-tier/privacy terms, durable quotas and verification limits. Shared snapshots and AI review are described in BUILDATHON_READINESS.md. The following notes describe earlier local-only releases.

# Combined v1.8 additions

Download a portable backup under Save or restore. Open that file on another device with the import input, confirm replacement and review the bills. Backups include any entered wallet details: keep them private. Photos and full-payment marks are not included. Imported data does not overwrite a previously saved local draft unless you explicitly enable device saving.

In bill review, expand Split by percentages, enter values totaling 100% and Apply. These become custom BDT amounts with exact poisha conservation. If the amount or participants change, reapply percentages or correct amounts.

On supported phones, Or take a receipt photo uses the back camera; gallery upload remains available. Recognized receipt text collapses to keep the review compact.

# Free edition: what changed

All core tools are free to use with no paid AI account. Cloud parsing is removed, not silently replaced with another limited paid/free-tier provider. Leftover hosting secrets cannot cause provider calls in this build.

Notes use conservative local rules. Supported examples: `Rafi paid 1200 for dinner, all split.` or `Rafi dinner e 1200 dilo, shobai bhag korbo.` Unsupported text is flagged for correction, not guessed.

Receipt reading uses on-device Tesseract OCR. Select a language, upload a clear photo, select payer and participants, scan, inspect the original image and recognized text, correct the final BDT total and tick its confirmation, then Add reviewed receipt. OCR only suggests a uniquely labeled total. Currency and total must be checked by the user. Existing bills remain intact if downloads or recognition fail. First-use downloads need internet and can be substantial; manual entry avoids them.

No direct bKash/Nagad/Rocket/bank/crypto payment processing is included. People pay externally and record it manually. No cloud sync or automatic verification is claimed.

## Release checks
Automated tests cover the OCR integration with a mocked recognizer, conflict/foreign-currency total suggestions, manual fallback, exact accounting, custom shares, partial repayment and sharing. A live browser/OCR engine run and real local receipt accuracy tests remain pending. Real-user phone tests remain pending. Official buildathon artwork remains pending.

## Hosting
A free deployment is subject to the host's plan limits and terms. This app has no recurring AI API cost; ordinary internet/data and optional domain/hosting costs are separate.
