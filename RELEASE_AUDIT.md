# Release review

Reviewed the group, expenses, review, settlement, sharing, save/restore, API and deployment paths.

## Changes in this package

- Backups retain the selected recipient wallet. Older backups still open with the default wallet. Invalid saved methods are rejected.
- Duplicate-name checks account for leading and trailing spaces.
- Typing notes invalidates the plan without redrawing the current step.
- The missing-page screen follows the green brand.
- Updated deployment instructions preserve the existing Vercel Gemini configuration and correctly identify the ZIP root.
- Rewrote the README around the product, its setup and actual limits.

## Verification

107 automated checks pass. These exercise accounting, custom splits, entry and removal, review, partial repayments, payment marks, snapshots, backups, API validation, quota handling and AI error recovery. Provider responses and OCR recognition are mocked where required. The package contains source, tests, assets, setup instructions and the MIT license; no runtime secrets or saved personal records.

Browser automation was unavailable during this review. Actual phone layout, receipt accuracy, live provider extraction and high-traffic behavior have not been independently verified here. The owner previously confirmed Gemini extraction working on Vercel; its server code was preserved.

## Before submission or a broad launch

1. Add the official buildathon sticker when supplied.
2. Recheck one real AI extraction after deploying this source.
3. Complete the real-receipt and five-user phone checks in BUILDATHON_READINESS.md.
4. Configure and verify the documented shared AI quota protection before inviting a large public audience. Local core tools do not need an AI key.

The app records payment claims; it does not process or verify bank transfers.
