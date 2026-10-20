# Contact form -> Google Sheet + email

1. Create a Google Sheet (any name).
2. **Extensions -> Apps Script**, replace the contents of `Code.gs` with [Code.gs](./Code.gs).
3. Select the `authorize` function in the toolbar dropdown and click **Run**. Approve the permissions (sheet + send email). On the "Google hasn't verified this app" screen choose **Advanced -> Go to (project) (unsafe)**; it's your own script. A web app deployment can't ask for these permissions, so without this step submissions fail with "You do not have permission to call SpreadsheetApp".
4. **Deploy -> New deployment -> Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL (ends in `/exec`).
6. Create `.env.local` in the project root:
   ```
   VITE_CONTACT_URL=https://script.google.com/macros/s/XXXX/exec
   ```
   Also add `VITE_CONTACT_URL` to your hosting provider's environment variables (e.g. Vercel) and redeploy.

If you grant permissions after already deploying, redeploy as a new version (below) so it picks them up.

After editing `Code.gs` later, use **Deploy -> Manage deployments -> Edit -> New version**; the URL stays the same.
