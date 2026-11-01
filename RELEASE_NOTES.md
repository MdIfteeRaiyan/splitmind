# v2 beta.11 — compact transfers and restrained motion

Reorganized transfer cards around full From/To identities and an adjacent amount on desktop, stacking cleanly on phones. Added short view transitions, popup/content fades, control feedback and a payment-record highlight, with keyboard focus restored after recording. Motion can be disabled in Appearance, persists on the browser and respects reduced-motion settings. No AI provider or accounting changes.

# v2 beta.10 — Gemini 3.x request compatibility

Use the modern model default and omit legacy thinkingBudget:0 and temperature overrides for newer Gemini models. Preserve explicit 2.5 Flash compatibility. Tests inspect the outbound request body for each model family. Live provider success still requires the deployment owner’s configured project and quota.

# v2 beta.9 — centered popups and quieter notes

Centered validation and first-visit panels without modal input locking. Removed the repeated notes examples; kept the homepage picker. Reduced nearby copy and moved detailed limitations/privacy into a disclosure. Normalized Gemini model IDs and clarified HTTP 404 resolution. Live project model access still needs validation by its owner.

# v2 beta.8 — first-visit guide and premium settlement

Removed the two in-flow help panels. Added dismissible, non-modal first-visit help remembered on the current browser, plus a compact per-step Quick guide. Settlement now emphasizes remaining BDT, manual recording progress, group context, numbered transfer cards and clear payment routes. Payment records remain manual; shared snapshots do not sync.

# v2 beta.7 — descriptive AI errors and non-blocking popups

Retain safe provider HTTP diagnostics after fallback, show actionable non-modal error popups for notes, receipt, review, payment and backup errors, and reject empty notes before calling AI. Configured-key wording no longer claims a verified AI connection. API secrets and raw provider responses are never displayed.

# v2 beta.6 — verified click routing regression

The document root carries data-step for styling. The old delegated click handler matched that root for ordinary input clicks, navigating back to the current step and stealing focus. Restricting the selector to button[data-step] fixes the cause. A regression with ancestor matching fails on the old selector (five unintended navigations) and passes on the fix.

# v2 beta.5 — input stability

Name and note typing no longer changes wizard visibility on every keystroke. Group validation uses a dismissible non-modal popup, never browser page-wide inertness, and clears when a name is corrected. Regression checks cover continuous English/Bangla typing and typing after invalid submission. Browser interaction still requires verification.

# v2 beta.4 — section guidance and control refinement

Added concise expandable guidance to all four steps, a live bill-review summary, descriptive control titles, consistent touch targets, destructive-action styling and narrower-phone action layouts. Clarified saved-copy deletion and backup/report differences. Core accounting and optional AI behavior are unchanged.

# v2 beta.3 — lightweight startup and recovery

Removed the automatic WebGL/React decoration bundle from the production page and eliminated third-party build dependencies. Kept a subtle static background with an on/off control. Added JavaScript-disabled guidance, startup error recovery, explicit closed-dialog styling, and narrower-phone layout fixes. Member-removal regression coverage remains in place. No receipt accuracy or user-study results are claimed.

# v2 beta.2 — Vercel build fix

Adapter tests now isolate and restore their AI environment fixtures. Builds no longer assume production AI is disabled. Added adapter tests for Gemini enabled, text-only Groq and durable quota configuration. Production Gemini variables remain enabled and are not changed by deployment.

# v2.0 beta — AI review and shared snapshots

Optional server-side Gemini chat/receipt extraction, Groq text fallback on temporary provider errors, per-instance limits and optional atomic Redis limits. Receipt items/VAT/service charges are shown separately for review; only the final total enters the ledger. Shared URL snapshots contain names/amounts and isolated local marks, not live sync. Added exact per-person balance explanations, AI rewrites and local/AI reminder drafts in English/Bangla/Banglish. All core tools remain free and available with no provider key. No provider success, receipt accuracy or real-user study is claimed without measurement.

# v1.9.1 — Free external payment handoff

Compact payment method selection, copy combined recipient/amount instructions, nearby clipboard fallback, missing recipient-details shortcut and external-link feedback. No invented app deep links, cloud payment processing, auto-prefilled personal transfers or transaction verification. Numeric/local address URLs are rejected.

# v1.9.0 — Simplified settlement workspace

Dinner and trip demos share one Try an example dropdown. Step 4 now uses a full-width settlement workspace, grouped overview metrics, responsive payment cards, a static Share plan button and collapsed balances/print/export tools. All accounting, manual repayments and free tools remain. Still to record refers to manual marks, not bank-confirmed outstanding money.

# v1.8.1 — Simpler visual controls

Removed the top event acknowledgment, glowing ElectricLogo and StarBorder button decoration. The header uses the static S favicon. Empty/duplicate group-name warnings open an accessible dialog and focus the affected field when dismissed. Free OCR, percentages, backups and settlement tools remain.

# v1.8.0 — Combined free release

Added portable backup download/import, percentage-to-custom splitting with exact poisha rounding, a phone-camera receipt input and collapsible recognized receipt text. Imports require confirmation, preserve partial repayments and do not restore verification. Existing features remain free. Official sticker artwork remains pending.

# v1.7.0 — Free edition

Removed cloud LLM calls and access codes. Added local receipt OCR with explicit BDT confirmation, four language choices, download/error fallback, and improved name whitespace handling. Existing splits, repayments, export and saving remain. See FREE_EDITION.md for scope and verification limits.

## Historical releases

# SplitMind v1.6 beta — fit and mobile navigation

Corrected the decorative StarBorder canvas width so its trail fits the button instead of being displaced. A small mobile menu opens the existing help, about, tools and privacy sections; the desktop header remains compact. User-provided phone-shaped mobile-wallet numbers open the phone dialer and email-shaped other-wallet references open the email app. SplitMind still does not initiate payments; bank and cryptocurrency references are not treated as phone numbers. No public contact details were invented.

The app has a favicon, metadata, responsive layouts, a custom 404 page and local image compression. External links can change; user-provided payment destinations are not verified by the app. Automated checks do not replace real-device testing. The public preview does not include AI credentials or live payment processing.

# SplitMind v1.5 beta — subtle motion

The supplied GradientASCII component adds a low-intensity background. The supplied StarBorder adds a decorative border to the main Group, Add bill and Continue to settlement buttons. These remain native controls; the visual effect does not take clicks. Effects can be disabled in Appearance, respect reduced-motion settings, stop while the page is hidden, and retain static fallbacks if WebGL is unavailable. Existing expense, receipt, sharing and payment behavior is unchanged.

Source from the user-supplied React Bits snippets is preserved in ui/components and hashed in ADDED_PROVENANCE.json. The code and dependencies are included in this package.

# SplitMind v1.4 beta

- Choose equal shares or exact custom BDT amounts for each selected participant. The sum must equal the total to the poisha. Custom values are retained in optional local draft saves and are included in ledger export.
- Manual partial payment records recalculate the remaining settlement. A fictional trip example demonstrates the flow.
- AI receipt reading is available only after server-side provider configuration and remains untested with live local receipts. The current feature extracts a proposed final total rather than merchant, item lines, tax and service charges as separate fields. Verify against the original receipt; use manual entry if unclear. No API keys are bundled.
- Drafts stay in one browser and do not synchronize across devices. Actual payments happen outside SplitMind, and its records do not verify them.
- See TRIP_DEMO.md and RECEIPT_AND_PHONE_TESTING.md for test instructions. No real-user or real-receipt testing is claimed.
