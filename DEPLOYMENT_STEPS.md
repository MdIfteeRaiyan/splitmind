# SplitMind — GitHub and Vercel deployment

This ZIP contains the complete source for SplitMind v1.6 beta, including its Vercel server adapter, build configuration, tests and MIT license. No GitHub repository or Vercel deployment has been created by this package. You will sign in to your own accounts to publish it.

## 1. Extract the ZIP

Extract it and open the `splitmind` folder. This is the project root: it contains `package.json`, `vercel.json`, `ui`, `worker` and `api`. Upload these files, not the ZIP itself. Node.js 22 LTS and Git are needed only if you use the local commands below.

## 2. Create your GitHub repository

1. Sign in at https://github.com/new.
2. Name the repository `splitmind` (or choose another name).
3. Select Public if you want the source publicly available. The included MIT license permits reuse.
4. Leave “Add a README”, license and gitignore unselected: these files are already included.
5. Create the repository.

Recommended: open a terminal inside the extracted `splitmind` folder and run these commands, one at a time. Change the remote URL if you chose another repository name or account.

```bash
git init
git add .
git commit -m "Initial SplitMind beta release"
git branch -M main
git remote add origin https://github.com/MdIfteeRaiyan/splitmind.git
git push -u origin main
```

Complete GitHub's sign-in prompt. Never commit API keys or your actual `.env` file.

Without Git installed: use the new repository's “uploading an existing file” link, upload the extracted project contents and commit. Check that `package.json` and `vercel.json` are at the repository root, not inside another folder. Include `.gitignore` and `.env.example`; your operating system may hide these files.

## 3. Import into Vercel

1. Sign in at https://vercel.com using GitHub.
2. Choose Add New → Project, allow access to your `splitmind` repository, then Import it.
3. Use these settings. The included `vercel.json` supplies the build and output settings automatically.

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Repository root (`./`) |
| Build command | `npm run build` |
| Output directory | `public` |
| Install command | `npm ci` |
| Node.js version | 22.x |

4. For your first deployment, leave environment variables empty. Manual bill entry and settlement calculation work without an AI key.
5. Click Deploy. Wait until the deployment is Ready, then open Visit. That actual generated `https://…vercel.app` address is your website link.
6. If Vercel displays a login screen to visitors, check project Settings → Deployment Protection for the production deployment. Test the production URL in a private browser window before sharing it.

## 4. Optional: enable AI text and receipt extraction

In Vercel → Project → Settings → Environment Variables, add:

| Variable | Value |
| --- | --- |
| `OPENAI_API_KEY` | Your own server-side OpenAI API key |
| `OPENAI_MODEL` | Optional model supporting image input and structured outputs; default is `gpt-4.1-mini` |
| `DEMO_ACCESS_CODE` | Recommended: a strong private code to restrict server API use |

Enable the variables for the deployment environments you intend to use, then redeploy. Enter the access code in the site's AI tools when prompted. Keep the API key only in Vercel; do not enter it into the site's access-code field or put it in a frontend variable. API usage can incur provider charges. Leave AI disabled until you are ready to manage access and usage.

Large receipt photos are compressed locally when this reduces their size. Receipt images in this release are limited to 3 MB (JPEG, PNG or WebP). Base64 encoding increases request size; this limit keeps typical requests within Vercel's function payload limit. Very large text combined with an image can still exceed the request limit; shorten the notes if prompted. AI results always require your review.

## 5. Check before sharing publicly

1. Create two people: Rafi and Mim. Add a 600 BDT expense paid by Rafi, shared by both. The result should say Mim owes Rafi 300 BDT.
2. Use Back and the four step buttons. Confirm your entries remain intact.
3. Try Bangla or another language in a manual description. Check the review screen and summary.
4. Save a draft, refresh, restore it, and delete it. Saving is optional and local to that browser and domain. Drafts from the previous website do not automatically move to the new Vercel address; export or print anything you need first.
5. Check sharing, copying an amount, printing and downloading summaries.
6. Check on a phone and desktop. Try turning visual effects off and use keyboard navigation.
7. If you add payment instructions, test your own recipient link and QR. These are recipient-supplied instructions; SplitMind does not process, verify or automatically complete payments. “Recorded” is a manual status.
8. If AI is configured, test text extraction and a small receipt with non-sensitive sample data. If it is disabled, confirm the site clearly explains that.

## 6. Run locally (optional)

```bash
npm ci
npm run build
npm test
npm start
```

Open http://localhost:3000. To configure AI locally, copy `.env.example` to `.env`, fill in your own values, and restart. Do not commit `.env`. Run `npm run build` after changing source files, then restart the local server.

## 7. Publish future updates

Edit your local source, then run:

```bash
npm run build
npm test
git add .
git commit -m "Improve SplitMind"
git push
```

Vercel automatically deploys pushes to the connected production branch (normally `main`). Check its deployment status before sharing the updated link. A custom domain can be added later under Vercel → Settings → Domains.

## Troubleshooting

- **Build fails:** verify the root directory and Node 22.x. Open the build log and check that all source files and `package-lock.json` were uploaded. Dependencies install during deployment; `node_modules` should not be uploaded.
- **Blank page or 404:** keep `vercel.json`, `package.json`, `api/`, `worker/`, `scripts/` and `ui/` at the project root. The build creates `public/index.html`; do not change the output directory to `dist`.
- **AI unavailable:** add your own API key in Vercel, select an appropriate model, then redeploy. Check the access code if configured. Manual entry remains available.
- **API returns 401:** enter the configured access code in the AI tools. If you changed the environment variable, redeploy.
- **Receipt rejected:** use a JPEG, PNG or WebP smaller than 3 MB; shorten accompanying notes.
- **Payment not automatically confirmed:** this is expected. Payment links and QR codes are instructions, and payment records are manual.

## Included and excluded

Included: editable source, Vercel API adapter/configuration, dependency lockfile, tests, visual component provenance, README and MIT license.

Excluded: secrets, private project metadata, Git history, installed dependencies and generated build output. Vercel installs dependencies and builds the site from source.

Automated tests validate calculations, API validation, UI behavior in a test harness and the Vercel adapter. They do not replace testing the deployed site in real browsers or checking a real provider integration. No live payment integration is included.
