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
- **Catalog Management (`/admin/menu`):** Add dishes, update pricing, assign categories, and toggle availability.
- **Gallery Manager (`/admin/gallery`):** Manage photos, categories, alt text, and usage permission statuses.
- **Business Profile Settings (`/admin/settings`):** Update addresses, phones, and operating hours in real time.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6 (Strict Mode)
- **Styling:** Tailwind CSS with Indian Hospitality Design Tokens (Charcoal `#171411`, Warm Ivory `#F8F3E9`, Rich Maroon `#681F2B`, Antique Gold `#C6A15B`, Marigold `#E08A1E`, Banana Leaf `#4E6B3A`)
- **Typography:** Playfair Display (Serif) + Inter (Sans) + Noto Sans Telugu (Brand Accents)
- **Database & ORM:** Prisma ORM with SQLite (Local Dev) / PostgreSQL (Neon / Supabase Production)
- **Validation:** Zod Schema Validation
- **Icons:** Lucide React

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24.16.0)
- **npm**: v9+

### 2. Installation
Open PowerShell in the project directory:
```powershell
npm install
```

### 3. Database Initialization & Seeding
Initialize the SQLite database and seed initial admin credentials, authentic menu items, and business profiles:
```powershell
npx prisma db push
npm run db:seed
```

### 4. Start Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Admin Credentials

- **Admin Portal URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@venkyyadavcaterings.com`
- **Password:** `admin123@VenkyYadav`
*(Pre-filled on the login form for testing; change in production via environment variables)*

---

## 🧪 Testing & Verification

Run the automated test suite (Unit tests for validation schemas, reference code generation, formatters, and authentication token security):
```powershell
npm test
```

Run full production build verification:
```powershell
npm run build
```

---

## 📁 Project Structure

```
├── app/
│   ├── (public pages)
│   │   ├── page.tsx (Cinematic Home)
│   │   ├── about/page.tsx (Founder Story)
│   │   ├── services/page.tsx (Services Hub)
│   │   ├── services/[slug]/page.tsx (Service Details)
│   │   ├── functions/page.tsx (25+ Event Taxonomy)
│   │   ├── menu/page.tsx (Menu Explorer)
│   │   ├── gallery/page.tsx (Masonry Gallery)
│   │   ├── cafe/page.tsx (Cafe Teaser)
│   │   ├── booking/page.tsx (4-Step Wizard)
│   │   ├── contact/page.tsx (Dual Locations & Maps)
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── admin/ (Protected Admin Dashboard)
│   └── api/ (Secure Route Handlers for Enquiries, Auth, Menu, Gallery)
├── components/
│   ├── layout/ (Navbar, Footer, KolamDivider)
│   ├── hero/ (BananaLeafHero)
│   ├── motion/ (ThaliOrbit, JourneyOfAFeast, FunctionFinder)
│   ├── booking/ (BookingWizard)
│   ├── menu/ (MenuExplorer)
│   ├── gallery/ (GalleryGrid)
│   └── ui/ (Button, Input, Select, Badge, Card)
├── lib/
│   ├── db/ (prisma.ts)
│   ├── auth/ (token.ts, session.ts)
│   ├── validation/ (enquirySchema.ts)
│   └── utils/ (formatters.ts, referenceCode.ts)
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── deployment.md
│   └── asset-sources.md
└── tests/
    └── unit/*.test.js
```

---

## 🌐 Production Deployment

See [docs/deployment.md](docs/deployment.md) for full instructions on deploying to **Vercel** with a free serverless **Neon PostgreSQL** database.
