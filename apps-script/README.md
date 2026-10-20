# Contact form -> Google Sheet + email

1. Create a Google Sheet (any name).
2. **Extensions -> Apps Script**, replace the contents of `Code.gs` with [Code.gs](./Code.gs).
3. Run `doPost` once from the editor (Run button) and approve the permissions (sheet + send email). It will log an error about `e` being undefined; that's expected, the point is to grant permissions.
4. **Deploy -> New deployment -> Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL (ends in `/exec`).
6. Create `.env.local` in the project root:
   ```
   VITE_CONTACT_URL=https://script.google.com/macros/s/XXXX/exec
   ```
   Also add `VITE_CONTACT_URL` to your hosting provider's environment variables (e.g. Vercel) and redeploy.

After editing `Code.gs` later, use **Deploy -> Manage deployments -> Edit -> New version**; the URL stays the same.
