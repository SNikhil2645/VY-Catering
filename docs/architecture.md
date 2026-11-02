# TECHNICAL ARCHITECTURE SPECIFICATION

## 1. Overview
Venky Yadav Caterings is built as an enterprise-grade hospitality platform combining:
- **Cinematic Public Web Presence:** High-conversion catering sales funnel, dynamic event taxonomy, interactive menu explorer, and Venky Yadav Cafe teaser.
- **Bespoke Motion System:** Lightweight Framer Motion reveals, self-drawing Kolam SVGs, and pinned-scroll Thali Orbit via GSAP ScrollTrigger.
- **Multi-Step Enquiry Booking Engine:** 4-step wizard with Zod schema validation, duplicate submission protection, and unique reference code generation (`VYC-YYYY-XXXXX`).
- **Secure Admin Management Dashboard:** Protected administrative portal for Enquiry triage, Menu Item CRUD, Gallery asset curation, and Business profile settings.

## 2. Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6 (strict mode enabled)
- **Styling:** Tailwind CSS with custom Indian Hospitality Design Tokens
- **Icons:** Lucide React
- **ORM / Database:** Prisma ORM with SQLite for local zero-config development, smoothly switchable to PostgreSQL (Neon/Supabase) via environment variables.
- **State & Form Management:** React Hook Form + Zod resolvers
- **Motion:** Framer Motion (primary) + GSAP ScrollTrigger (for the pinned Thali Orbit showcase)

## 3. Directory Layout
```
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Cinematic Home)
│   │   ├── about/page.tsx (Founder Story)
│   │   ├── services/page.tsx (Services Hub)
│   │   ├── services/[slug]/page.tsx (Service Details)
│   │   ├── functions/page.tsx (Functions Taxonomy)
│   │   ├── menu/page.tsx (Menu Explorer)
│   │   ├── gallery/page.tsx (Masonry Gallery)
│   │   ├── cafe/page.tsx (Venky Yadav Cafe Teaser)
│   │   ├── booking/page.tsx (4-Step Wizard)
│   │   ├── contact/page.tsx (Dual Locations & Maps)
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx (Dashboard Overview)
│   │   ├── enquiries/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── enquiries/route.ts
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── me/route.ts
│       ├── menu/route.ts
│       ├── gallery/route.ts
│       └── admin/
├── components/
│   ├── layout/ (Navbar, Footer, MobileNav, KolamDivider)
│   ├── hero/ (BananaLeafHero, HeroStats)
│   ├── motion/ (ThaliOrbit, JourneyOfAFeast, FunctionFinder)
│   ├── booking/ (BookingWizard, StepEvent, StepFood, StepContact, StepReview)
│   ├── menu/ (MenuExplorer, DishCard, FilterBar)
│   ├── gallery/ (MasonryGrid, LightboxModal)
│   └── ui/ (Button, Input, Select, Badge, Card, Dialog, Toast)
├── lib/
│   ├── db/ (prisma.ts)
│   ├── auth/ (jwt.ts, session.ts, password.ts)
│   ├── validation/ (enquirySchema.ts, menuSchema.ts, authSchema.ts)
│   └── utils/ (formatters.ts, referenceCode.ts)
└── prisma/
    ├── schema.prisma
    └── seed.js
```

## 4. Security Principles
1. **Zero Secret Leakage:** No database credentials or private keys in client code or public Git.
2. **Strict Server-Side Validation:** All submissions validated via Zod schemas on API route boundaries before database persistence.
3. **Admin Route Protection:** Middleware/Session tokens verified on all `/api/admin/*` and `/admin/*` routes.
4. **Rate Limiting & Honeypots:** Public enquiry endpoints protected against automated submission spam.
5. **Sanitization:** All text inputs sanitized and rendered safely to prevent XSS.
