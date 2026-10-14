# Deploy uniFind with Netlify Drop

Netlify Drop hosts the static React frontend. The Express API and PostgreSQL database must be hosted separately for login, item reports, claims, and matching to work.

1. Deploy the `backend` to a Node-compatible host and configure its database and service environment variables. The backend must be reachable over HTTPS and allow browser requests from the Netlify site origin.
2. Set `frontend/public/unifind-config.js` to the backend API base URL, including `/api`. For example:

   ```js
   window.UNIFIND_CONFIG = {
     API_BASE_URL: "https://your-backend.example.com/api",
   };
   ```

3. Build the frontend from the `frontend` directory with `npm install` and `npm run build`.
4. Unzip `uniFind-netlify-drop.zip` and drag the extracted site contents (with `index.html` at the root) into Netlify Drop. You can also drag the contents of `frontend/dist` directly.

The `dist` output includes Netlify's SPA fallback and runtime configuration file. If you edit the API URL after building, edit `dist/unifind-config.js` before uploading. Keep secrets only on the backend; do not put API keys or database credentials in this file.

If no API URL is configured, the deployed frontend opens in a labeled preview mode with sample listings so the UI remains visible. Sign-in, uploads, and claims are not saved in preview mode.

For persistent uploaded images in production, configure Cloudinary on the backend. Local `/uploads` files are not persistent on typical hosted serverless backends.