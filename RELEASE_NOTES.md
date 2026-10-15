# SplitMind v1.1 beta — mobile and usability release

- Responsive layouts for all four workspace steps and the footer; wrapping long names, URLs, balances and table cells; no page-width scrolling. No navigation items point to missing sections.
- Mobile menu with expanded-state announcement, section selection closing and Escape support. The logo and footer brand open the workspace without clearing entries.
- Per-step browser titles, accurate page descriptions, theme color, compact SVG favicon and a mobile-friendly custom 404 page with a home link. Vercel serves public/404.html for unknown pages.
- Automatic copyright year; removed example placeholders and prototype wording. Kept explicit, optional sample flows and useful input labels.
- Download and manual payment record feedback; retained detailed validation, sharing, upload and saved-draft error messages.
- Fixed Add a bill when a ledger already exists: adds another bill while preserving previous entries.
- Fixed server receipt validation to accept the full advertised 3 MB raw image size. Photos over 512 KB are resized to a maximum 2200-pixel edge and encoded as JPEG at 86% quality only when smaller; the original stays if canvas is unavailable or compression increases size. QR codes retain their original pixels for scanning. No stock raster assets are shipped; the favicon is a compact SVG and the animated background is code.

## Validation and limits

Run npm run build followed by npm test. Automated tests cover arithmetic, validation, navigation, repeated bill entry, mobile-menu state, image compression behavior, internal link targets, metadata and deployment adapter behavior.

CSS supports narrow screens and touch targets. Real Android, iPhone and desktop browser visual testing was not available in this environment; test your actual deployment using DEPLOYMENT_STEPS.md before sharing publicly. CSS overflow protection does not establish browser compatibility by itself.

Internal anchors and generated asset paths were checked. External GitHub and LinkedIn profile URLs match the creator-supplied addresses, but network access prevented confirming that those profiles load. WhatsApp reminders and user-supplied payment links depend on their external services; payment URLs are validated for format, not account ownership or destination availability.

This ZIP updates the portable Vercel source package. It does not change the previous hosted Sites version and has not been deployed to your GitHub or Vercel accounts. AI remains optional and needs server configuration; payments remain external and manually recorded.
