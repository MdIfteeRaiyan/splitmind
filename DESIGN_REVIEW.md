# Design review — v2.1

Preserved the uploaded green/amber palette, new favicon, typography and payment illustration. Only ui/index.html and ui/favicon.svg differed from the preceding release.

## Fixes
- Restored centered quick-guide placement on phones and desktop.
- Appearance now contains only the theme setting; motion automatically respects the device preference.
- Animation replay keeps its original button and keyboard focus; obeys motion preferences.
- Removed the global number-counting observer: financial amounts now remain exact and readable throughout rendering.
- Removed progress-ring registration/entrance overrides that could briefly show an inaccurate recorded proportion.
- Matched primary hover color and browser theme color to the green design.
- Placed the headline left and illustration right on desktop, stacked on small phones.
- Used one green S favicon/logo in the header and settlement summary.
- Removed duplicate/invalid CSS and unused header styling.

## Verification
105 automated checks pass, including ledger calculations, entry/removal, review, partial repayments, AI request validation, error handling, backups and deployment adapters. No live provider call was made; working AI server code is unchanged. Browser automation was unavailable in this session, so visual checks on physical phones remain necessary.

## Deploy
Replace the corresponding files in your repository, commit and push. Keep your existing Vercel environment variables. No credential changes are required.

AI extraction remains retryable when the configuration check fails or a key is missing. Only an in-flight extraction disables the button; server authorization still applies. The configuration check times out after ten seconds and bypasses browser cache.
