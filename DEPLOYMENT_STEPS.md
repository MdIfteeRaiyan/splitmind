# Update your existing Vercel project

1. Extract the supplied ZIP. The `splitmind` folder contains the project root (package.json, ui, worker, api).
2. Replace your existing repository's app source with these files. Do not nest the splitmind folder inside another project root. Preserve your Git repository metadata.
3. Commit and push the changed source to the branch connected to your existing Vercel project.
4. Vercel settings: Framework Other, Build `npm run build`, Output `public`, Install `npm ci`, Node 22.x. The included vercel.json declares these build/output settings and API rewrites.
5. No environment secrets are needed for local tools. Optional AI setup is in AI_SETUP.md. Remove OPENAI_API_KEY, OPENAI_MODEL and DEMO_ACCESS_CODE from Vercel. Revoke the now-unused API key in the account that created it.
6. Wait for the new source deployment to say Ready. A redeploy of old source does not install these changes.
7. Open the site: local tools should work immediately; optional AI buttons activate only when configured. The receipt tools offer local OCR and optional vision AI. `/api/config` should show mode free-local and localOCR true, with aiReady false when no provider has been configured (expected).
8. Test local notes, receipt loading, manual fallback, custom shares, partial repayments, summary copying, local restore and a missing URL. Keep the Google verification meta tag in place.

The separately hosted ChatGPT Sites preview does not update your GitHub/Vercel repository automatically. Deploy this source ZIP to update Vercel.
