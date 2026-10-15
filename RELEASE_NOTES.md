# SplitMind v1.1.1 beta — compact footer and direct workflow tabs

The redundant header menu is removed. The header contains the clickable brand and a right-aligned Help link. How it works, connected tools, privacy, About and appearance controls live in a compact footer. Closed footer sections sit in a wrapping row; opening one reveals its details below. Effects and theme keep their existing functions.

Group, Expenses, Review and Settle now open their own section directly. Navigation scrolls to the visible panel instead of the workspace title. Empty Review and Settle screens explain what is missing and provide a working next-step button. Calculations still require valid group names and reviewed positive amounts. Switching tabs preserves current bills and existing payment records until the inputs change.

All previous mobile, metadata, favicon, custom 404, image compression and validation improvements are included. Deployment instructions are in DEPLOYMENT_STEPS.md.

Automated tests cover direct navigation, missing-data guidance, footer control placement, calculations, draft storage and the Vercel adapter. Real-device visual testing remains outstanding. External profile URLs match the creator-supplied addresses but could not be fetched in this environment. This is a source ZIP; upload it to your GitHub repository to trigger your connected Vercel deployment.
