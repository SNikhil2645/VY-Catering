# PRODUCTION DEPLOYMENT GUIDE

This guide walks you through deploying the **Venky Yadav Caterings** platform split into a **Next.js client** and an **Express API server**.

## 1. Prerequisites
- A GitHub repository hosting this code
- A hosting provider for the Next.js app (e.g. [Vercel](https://vercel.com))
- A hosting provider for the Express API (e.g. [Render](https://render.com), [Railway](https://railway.app), [Fly.io](https://fly.io))
- A production PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com))

## 2. Prepare the Database
1. Create a PostgreSQL database on your provider and copy the connection string (`postgresql://...sslmode=require`).
2. Update `server/prisma/schema.prisma` to use PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. From the `server/` directory (or via your build/deploy pipeline), push the schema and seed data:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

## 3. Deploy the Express API (`server/`)
Create a web service pointing to the repository with:

- **Root Directory:** `server`
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npm run start`
- **Health Check Path:** `/api/health`

Set these environment variables on the API service:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | (provided by host, usually `10000`/auto) |
| `CLIENT_ORIGIN` | `https://your-client-domain.com` |
| `DATABASE_URL` | Your PostgreSQL connection string |
| `ADMIN_JWT_SECRET` | A strong random string (e.g. `openssl rand -base64 32`) |
| `ADMIN_DEFAULT_EMAIL` | `admin@venkyyadavcaterings.com` |
| `ADMIN_DEFAULT_PASSWORD` | A secure production password |

**Persistent disk:** If you want admin uploads to survive redeploys, attach a persistent volume mounted to `server/uploads` (or migrate uploads to object storage like S3/R2/Cloudinary).

## 4. Deploy the Next.js Client (`client/`)
Import the repository into Vercel (or your host):

- **Root Directory:** `client`
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (or `next build`)
- **Output Directory:** `.next`

Set environment variables:

| Variable | Value |
|---|---|
| `API_URL` | `https://your-api-domain.com` (internal/external base URL of the Express server) |
| `NEXT_PUBLIC_APP_URL` | `https://venkyyadavcaterings.com` |
| `NEXT_PUBLIC_PHONE_CATERING` | `+91 63040 05185` |
| `NEXT_PUBLIC_PHONE_CAFE` | `+91 83281 29450` |
| `NEXT_PUBLIC_WHATSAPP` | `+916304005185` |
| `NEXT_PUBLIC_INSTAGRAM` | `https://www.instagram.com/venkyyadavforu/` |

The client will rewrite `/api/*` and `/uploads/*` to `API_URL`. Ensure your API's `CLIENT_ORIGIN` matches the deployed client domain so CORS and cookies work correctly (HttpOnly cookies require `SameSite=Lax` with correct origins and `Secure` in production).

## 5. Custom Domain Setup
1. Point your domain to the Next.js client (Vercel domains).
2. Use a separate subdomain for the API (e.g. `api.venkyyadavcaterings.com`) or serve it behind the same domain via a reverse proxy.
3. Update `API_URL` and `CLIENT_ORIGIN` accordingly.
4. Provision TLS certificates (handled automatically by most hosts).

## 6. Post-Deployment Checklist
- [ ] `GET https://your-api-domain.com/api/health` returns `{"status":"ok",...}`
- [ ] Database seeded and `prisma db push` completed
- [ ] Admin login works at `/admin/login`
- [ ] Public menu/gallery/enquiry submission works
- [ ] Image uploads work and are served from `/uploads/...`
- [ ] Update the default admin password
- [ ] Set a strong `ADMIN_JWT_SECRET`
- [ ] Rotate any test credentials
