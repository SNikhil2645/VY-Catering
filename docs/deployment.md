# PRODUCTION DEPLOYMENT GUIDE

This guide walks you through deploying the **Venky Yadav Caterings** platform to **Vercel** with **Neon Serverless PostgreSQL**.

## 1. Prerequisites
- A GitHub repository hosting this code.
- A free account on [Vercel](https://vercel.com).
- A free PostgreSQL database on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).

## 2. Setting Up Production Database (Neon)
1. Log in to [Neon.tech](https://neon.tech) and create a new project named `venky-yadav-caterings`.
2. Copy the Connection String provided in the Neon dashboard (`postgresql://...sslmode=require`).
3. Set your local environment variable or execute schema push:
   ```bash
   $env:DATABASE_URL="your-neon-connection-string"
   npx prisma db push
   node prisma/seed.js
   ```

## 3. Deploying to Vercel
1. Push your repository to GitHub.
2. In Vercel, click **Add New Project** and import the GitHub repository.
3. In **Environment Variables**, add:
   - `DATABASE_URL`: Your production PostgreSQL connection string.
   - `ADMIN_JWT_SECRET`: A strong random string (e.g., `openssl rand -base64 32`).
   - `ADMIN_DEFAULT_EMAIL`: `admin@venkyyadavcaterings.com`
   - `ADMIN_DEFAULT_PASSWORD`: A secure password.
   - `NEXT_PUBLIC_APP_URL`: Your live production domain (e.g. `https://venkyyadavcaterings.com`).
4. Click **Deploy**. Vercel will run `npm run build` and deploy within 90 seconds.

## 4. Custom Domain Setup (Hostinger / GoDaddy / Cloudflare)
1. In Vercel, navigate to **Settings** -> **Domains**.
2. Add `venkyyadavcaterings.com` and `www.venkyyadavcaterings.com`.
3. Add the corresponding A Record (`76.76.21.21`) and CNAME record (`cname.vercel-dns.com`) at your DNS registrar.
4. SSL certificates are provisioned automatically by Vercel within 5 minutes.
