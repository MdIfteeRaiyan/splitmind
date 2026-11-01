# Update SplitMind on Vercel

1. Extract the ZIP. Use the folder containing `package.json` as the project root.
2. Copy its source into your existing local repository. Preserve `.git` and any private `.env` file. Do not put the project inside a second nested folder.
3. Run `npm ci` and `npm run build`.
4. Review, commit and push the changed files to the branch connected to Vercel.
5. Keep the existing Vercel environment variables, including your working Gemini key, model, AI enablement and any demo access code. This update needs no new key.
6. Wait for the new deployment to show Ready. Redeploying an old commit will not install this source update.
7. Open the production URL and test a group, a manual bill, a real AI extraction, review, partial repayment, sharing and backup restore.

## Project settings

- Framework: Other
- Node: 22.x
- Install: `npm ci`
- Build: `npm run build`
- Output: `public`

The included `vercel.json` supplies build settings and API routing. Do not upload `.env` or provider keys to GitHub.

## Check AI availability

Open `/api/config` on your Vercel domain. `aiReady: true` means a key and AI enablement are present; it does not prove a successful provider request. Test one extraction as well. If unavailable, inspect the popup and Vercel function logs. A temporary configuration check failure should not leave the extraction button locked.

The separate ChatGPT-hosted preview has its own server settings. Updating that preview does not update your GitHub repository, Vercel source or Vercel secrets.

## Before opening to a large audience

Configure shared quota protection using the optional Upstash variables in AI_SETUP.md, check provider limits, and run the receipt and phone checks in BUILDATHON_READINESS.md. Default per-instance limits are not a durable global usage cap.
