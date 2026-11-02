# VENKY YADAV CATERINGS & CAFE — PLATFORM

> A premium, cinematic, database-backed hospitality and business management platform for **Venky Yadav Caterings** & **Venky Yadav Cafe**, Tirupati, Andhra Pradesh. Founded by Telavani Venkatesh (Venky Yadav).

---

## 🌟 Key Features

### 1. Cinematic Public Experience
- **Hero Reveal:** Animated hero with Telugu brand accents (`వెంకీ యాదవ్ కేటరింగ్స్`), high-impact photography, and direct CTAs.
- **The Royal Thali Orbit:** Interactive rotating brass thali showcasing authentic delicacies (Hyderabadi Mutton Dum Biryani, Loose Prawns, Gutti Vankaya, Bendakaya Pulusu).
- **Function Finder:** Interactive event menu builder allowing users to choose functions (Wedding, Reception, Gruhapravesham, Birthday, Corporate) and calculate recommended course spreads and guest formats.
- **Journey of a Feast:** 4-step culinary timeline detailing heirloom sourcing, acacia firewood burning, sealed dum cooking, and banana-leaf serving.
- **Venky Yadav Cafe Teaser:** Dedicated cafe showcase featuring the famous 4 AM Maska Bun & Irani Chai culture on Renigunta Road, with directions and call links.
- **Catering Menu Explorer:** 40+ item matrix with real-time search, category filters, vegetarian/non-vegetarian toggles, spice-level indicators, and printable view.
- **Event & Feast Gallery:** Responsive masonry gallery with categories, brass-framed lightbox, and keyboard accessibility.
- **Full Functions Directory (`/functions`):** 25+ events categorized across Wedding & Pre-Wedding, Family & Life Milestones, Religious/Temple Festivals, Corporate, and Social Gatherings.

### 2. Multi-Step Catering Quotation & Booking Engine (`/booking`)
- **Step 1: Event Details:** Event type, future date validation, guest count, start time, format (Banana-leaf Sadhya, Buffet, Live counters), and venue.
- **Step 2: Food Preferences:** Dietary choices (Veg, Non-Veg, Both) and signature requests.
- **Step 3: Customer Details:** Name, phone validation, email, preferred contact mode (Phone, WhatsApp, Email), and privacy consent.
- **Step 4: Review & Submit:** Live review summary, anti-spam honeypot, secure persistence to database, and unique reference code generation (`VYC-YYYY-NNNNN`).
- **Post-Submission:** Confetti celebration, one-click code copy, and pre-filled WhatsApp message generator.

### 3. Secure Admin Management Portal (`/admin`)
- **Protected Access:** Session-based authentication with encrypted password hashing (`bcryptjs`) and secure HttpOnly cookie verification.
- **Overview Dashboard:** Real-time database metrics for total enquiries, new leads, confirmed events, and catalog counts.
- **Enquiry Triage (`/admin/enquiries`):** Search, filter by 7 lifecycle statuses, update statuses, add internal operational notes, and export to CSV.
- **Catalog Management (`/admin/menu`):** Add dishes, update pricing, assign categories, upload images, and toggle availability.
- **Gallery Manager (`/admin/gallery`):** Manage photos, categories, alt text, and usage permission statuses.
- **Business Profile Settings (`/admin/settings`):** Update addresses, phones, and operating hours in real time.

---

## 🛠️ Technology Stack

### Client (`client/`)
- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript 5.6 (Strict Mode)
- **Styling:** Tailwind CSS with Indian Hospitality Design Tokens (Charcoal `#171411`, Warm Ivory `#F8F3E9`, Rich Maroon `#681F2B`, Antique Gold `#C6A15B`, Marigold `#E08A1E`, Banana Leaf `#4E6B3A`)
- **Typography:** Playfair Display (Serif) + Inter (Sans) + Noto Sans Telugu (Brand Accents)
- **Motion:** Framer Motion + GSAP ScrollTrigger
- **Forms & Validation:** React Hook Form + Zod

### Server (`server/`)
- **Runtime:** Node.js + Express 4
- **Language:** TypeScript 5.6
- **Database & ORM:** Prisma ORM with SQLite (Local Dev) / PostgreSQL (Neon / Supabase Production)
- **Auth:** HMAC-signed session tokens stored in HttpOnly cookies
- **Uploads:** Multer with MIME + magic-byte validation, stored under `server/uploads/`

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24.16.0)
- **npm**: v9+ (workspaces support)

### 2. Installation
Open PowerShell in the repository root:
```powershell
npm install
```

### 3. Environment Setup
```powershell
Copy-Item client\.env.example client\.env.local
Copy-Item server\.env.example server\.env
```
Adjust `DATABASE_URL`, `ADMIN_JWT_SECRET`, and admin credentials in `server/.env` as needed.

### 4. Database Initialization & Seeding
```powershell
npm run db:push
npm run db:seed
```

### 5. Start Development (Client + API together)
```powershell
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:4000](http://localhost:4000)
- Health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)

The Next.js client proxies `/api/*` and `/uploads/*` to the Express server, so the browser sees a single origin and HttpOnly auth cookies work normally.

---

## 📜 Root Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run API and Next.js client concurrently |
| `npm run build` | Build server (`tsc`) then client (`next build`) |
| `npm run start` | Run both production servers concurrently |
| `npm run lint` | Lint the Next.js client |
| `npm test` | Run unit tests (`tests/unit`) |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:seed` | Seed admin, menu, gallery and content data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run verify` | Run end-to-end verification (server + client must be running) |

---

## 🔐 Default Admin Credentials

- **Admin Portal URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@venkyyadavcaterings.com`
- **Password:** `admin123@VenkyYadav`
*(Pre-filled on the login form for testing; change in production via environment variables)*

---

## 🧪 Testing & Verification

Run the automated unit test suite:
```powershell
npm test
```

Run full production build verification:
```powershell
npm run build
```

Run end-to-end API/admin verification (start `npm run dev` first):
```powershell
npm run verify
```

---

## 📁 Project Structure

```
.
├── client/                        # Next.js 15 frontend
│   ├── public/                    # Static images and brand assets
│   ├── src/
│   │   ├── app/                   # App Router pages (public + admin)
│   │   ├── components/            # UI, layout, hero, motion, booking, menu, gallery
│   │   └── lib/                   # Client-side utils + validation schemas
│   ├── next.config.js             # Proxies /api and /uploads to the API server
│   ├── tailwind.config.ts
│   └── .env.example
├── server/                        # Express + Prisma API
│   ├── src/
│   │   ├── app.ts                 # Express app, CORS, static uploads, route mounting
│   │   ├── index.ts               # HTTP server entry point
│   │   ├── config/                # Environment configuration
│   │   ├── db/                    # Prisma client singleton
│   │   ├── auth/                  # Token signing/verification + session helpers
│   │   ├── middleware/            # Admin guard + error handling
│   │   ├── validation/            # Zod schemas
│   │   ├── utils/                 # Reference code generation
│   │   └── routes/
│   │       ├── auth.ts
│   │       ├── enquiries.ts
│   │       ├── gallery.ts
│   │       ├── menu.ts
│   │       ├── content.ts
│   │       └── admin/             # gallery, menu, settings, stats, upload
│   ├── prisma/                    # schema.prisma, seed.js, maintenance scripts, SQLite DB
│   ├── scripts/                   # verify-upgrade.js
│   ├── uploads/                   # Runtime media uploaded from the admin portal
│   └── .env.example
├── tests/
│   └── unit/                      # Node test runner suites
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── deployment.md
│   └── asset-sources.md
└── package.json                   # npm workspaces + unified scripts
```

---

## 🌐 Production Deployment

The project now deploys as two services:

1. **Client:** Next.js on Vercel (or any Node host).
2. **Server:** Express API on Render, Railway, Fly.io, or a VPS, with a persistent disk for `server/uploads` and SQLite (or a managed PostgreSQL database).

See [docs/deployment.md](docs/deployment.md) for the full guide.
