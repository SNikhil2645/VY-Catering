# TECHNICAL ARCHITECTURE SPECIFICATION

## 1. Overview
Venky Yadav Caterings is built as an enterprise-grade hospitality platform split into two deployable packages inside a single npm-workspaces repository:

- **`client/`** — A Next.js 15 App Router frontend providing the cinematic public experience, the 4-step booking wizard, and the protected admin dashboard.
- **`server/`** — A standalone Express + Prisma REST API that owns all persistence, authentication, validation, audit logging, and media uploads.

The browser only talks to the Next.js origin. Next.js rewrites `/api/*` and `/uploads/*` to the Express API, which keeps authentication cookies same-origin and avoids CORS complexity in the browser.

## 2. Technology Stack

### Client
- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript 5.6 (strict mode enabled)
- **Styling:** Tailwind CSS with custom Indian Hospitality Design Tokens
- **Icons:** Lucide React
- **State & Form Management:** React Hook Form + Zod resolvers
- **Motion:** Framer Motion (primary) + GSAP ScrollTrigger (pinned Thali Orbit showcase)

### Server
- **Runtime:** Node.js + Express 4
- **Language:** TypeScript 5.6 (compiled to CommonJS in `dist/`)
- **ORM / Database:** Prisma ORM with SQLite for local zero-config development, switchable to PostgreSQL (Neon/Supabase) via `DATABASE_URL`
- **Auth:** HMAC-SHA256 signed tokens stored in HttpOnly cookies
- **Uploads:** Multer (memory storage) with MIME and magic-byte validation

## 3. Directory Layout
```
.
├── client/                          # Next.js frontend package (@vyc/client)
│   ├── public/                      # Static assets served by Next.js
│   ├── src/
│   │   ├── app/                     # App Router routes (pages only, no API routes)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Cinematic Home (fetches /api/content/home)
│   │   │   ├── about/page.tsx
│   │   │   ├── services/{page.tsx,[slug]/page.tsx}
│   │   │   ├── functions/page.tsx
│   │   │   ├── menu/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── cafe/page.tsx
│   │   │   ├── booking/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── robots.ts
│   │   │   ├── sitemap.ts
│   │   │   └── admin/               # Protected dashboard
│   │   ├── components/              # layout, hero, motion, booking, menu, gallery, ui
│   │   └── lib/
│   │       ├── validation/          # Client-side Zod schema (booking form)
│   │       └── utils/               # formatters
│   ├── next.config.js               # Rewrites /api + /uploads to the API
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── server/                          # Express API package (@vyc/server)
│   ├── src/
│   │   ├── index.ts                 # HTTP listener
│   │   ├── app.ts                   # Express app wiring
│   │   ├── config/env.ts            # dotenv + typed environment
│   │   ├── db/prisma.ts             # Prisma client singleton
│   │   ├── auth/
│   │   │   ├── token.ts             # Sign/verify admin session token
│   │   │   └── session.ts           # Read admin from request cookie
│   │   ├── middleware/
│   │   │   ├── require-admin.ts     # Admin route guard
│   │   │   └── error-handler.ts     # 404 + 500 handlers
│   │   ├── validation/              # Zod server schemas
│   │   ├── utils/                   # referenceCode
│   │   └── routes/
│   │       ├── auth.ts              # POST login, POST logout, GET me
│   │       ├── enquiries.ts         # POST public, GET/PATCH admin
│   │       ├── gallery.ts           # GET public gallery
│   │       ├── menu.ts              # GET public menu
│   │       ├── content.ts           # GET home page testimonials + FAQs
│   │       └── admin/
│   │           ├── gallery.ts       # CRUD
│   │           ├── menu.ts          # CRUD + unique slug generation
│   │           ├── settings.ts      # Business profiles
│   │           ├── stats.ts         # Dashboard metrics
│   │           └── upload.ts        # Validated image uploads
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   ├── update_menu_images.js
│   │   ├── deactivate_placeholder_gallery.js
│   │   └── dev.db                   # Local SQLite database
│   ├── scripts/verify-upgrade.js
│   ├── uploads/                     # Runtime media served at /uploads
│   └── tsconfig.json
│
├── tests/unit/                      # Node test runner suites
├── docs/
└── package.json                     # npm workspaces + unified scripts
```

## 4. Request Flow

```
Browser
  │
  ├─ GET /                     → Next.js server component
  │                                └─ fetch(${API_URL}/api/content/home)  (server-side)
  │
  ├─ fetch('/api/...')         → Next.js rewrite → Express API (/api/...)
  │
  └─ <img src="/uploads/..." />→ Next.js rewrite → Express static uploads
```

- **Client-side data:** all admin and public widgets call relative `/api/...` URLs. Next.js proxies these to `API_URL` (default `http://localhost:4000`).
- **Server-side data:** the home page fetches from `API_URL` directly and falls back to empty content if the API is unavailable at build time.
- **Uploads:** persisted under `server/uploads/<gallery|menu|general>/` and served by Express at `/uploads/...`, proxied by Next.js.
- **Revalidation:** the home page uses ISR (`revalidate = 60`).

## 5. Security Principles
1. **Zero Secret Leakage:** Database credentials, token secrets, and admin credentials live only in `server/.env` (gitignored). The client only receives `NEXT_PUBLIC_*` values.
2. **Strict Server-Side Validation:** All submissions are validated with Zod schemas at the API boundary before persistence.
3. **Admin Route Protection:** `requireAdmin` middleware verifies the signed HttpOnly cookie on every `/api/admin/*` and protected `/api/enquiries` route.
4. **HttpOnly Session Cookies:** Admin tokens are HMAC-signed, expire after 7 days, and are never readable by JavaScript.
5. **Upload Hardening:** 10MB size limit, MIME allow-list, magic-byte verification, random filenames, and path-traversal guards.
6. **Rate Limiting & Honeypots:** The public enquiry endpoint includes a honeypot field; additional rate limiting can be applied at the edge/proxy.
7. **Transport Security:** Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc.) are set by the Next.js client.

## 6. Environment Variables

| Location | Variable | Purpose |
|---|---|---|
| `server/.env` | `PORT` | API port (default `4000`) |
| `server/.env` | `CLIENT_ORIGIN` | Allowed CORS origin |
| `server/.env` | `DATABASE_URL` | Prisma datasource |
| `server/.env` | `ADMIN_JWT_SECRET` | Token signing secret |
| `server/.env` | `ADMIN_DEFAULT_EMAIL` / `ADMIN_DEFAULT_PASSWORD` | Seed credentials |
| `client/.env.local` | `API_URL` | Internal API base URL used by rewrites/server fetches |
| `client/.env.local` | `NEXT_PUBLIC_APP_URL` | Public site URL for metadata/sitemap |
| `client/.env.local` | `NEXT_PUBLIC_*` | Public phone/social links |
