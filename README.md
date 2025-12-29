<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Server-side RBAC (Supabase)

To enforce admin-only create/edit/delete on the server, the app can connect to Supabase when environment variables are set. If Supabase is not configured, the site falls back to read-only static `assets/posts.json` and localStorage.

1. Create a Supabase project and a `posts` table matching the `Post` type in [types.ts](types.ts).
2. Enable Row Level Security and add policies:
   - Read: `auth.role() = 'authenticated' OR anon` allow select
   - Write: allow insert/update/delete only for authenticated users who are admins (e.g., via a `admins` table or JWT claim)
3. In Vercel project settings, add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy. When configured, `App.tsx` will load posts from Supabase and mutations will go through RLS-enforced APIs.

Note: Client still hides admin UI and guards routes, but server-side denial requires Supabase policies or an API with authentication.
