# Verify the existing Vercel site

This package contains the supplied Google site verification tag in ui/index.html. It must be deployed to the same exact Vercel address entered as the Search Console URL-prefix property.

1. Extract this ZIP. Copy the contents of its splitmind folder into the local Git project connected to your existing Vercel project. Keep your existing .git folder, .env secrets and Vercel account configuration.
2. From that Git project run: git add .
3. Run: git commit -m "Add Google Search Console verification"
4. Run: git push
5. Wait for the production deployment in your existing Vercel project to show Ready. Check that this deployment uses the commit you just pushed. Do not create a second Vercel project or a new site URL.
6. Open the exact Vercel homepage entered in Search Console. View page source (Ctrl+U) and search for google-site-verification. Confirm the content matches 2A9GBDVUBb4EHR1uPaEhCVuAMNRIhvDUQdlgH9Vo6JY.
7. Return to Search Console's HTML tag verification screen and click Verify. Keep the meta tag in future updates.

If you use GitHub's web interface instead of Git, open the connected repository, choose Add file -> Upload files, upload the extracted source contents at the repository root, and commit to the production branch. Do not upload the ZIP itself.

Build settings remain Other, npm run build, output public, npm ci, Node 22.x. A successful preview deployment on another host does not verify the Vercel URL. Google indexing is a separate step after ownership verification.
