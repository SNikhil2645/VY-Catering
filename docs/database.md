# DATABASE SCHEMA & MIGRATION GUIDE

## 1. Architecture
The platform uses **Prisma ORM** with a normalized relational schema.
- **Local Development:** SQLite database (`prisma/dev.db`) for zero-configuration, instant local development on Windows, macOS, or Linux.
- **Production:** PostgreSQL (hosted on Neon Serverless Postgres, Supabase, or AWS RDS).

## 2. Entity Relationship Overview

| Model | Purpose | Key Attributes |
|---|---|---|
| `AdminUser` | Platform operators & managers | `email`, `passwordHash`, `role` |
| `Enquiry` | Catering booking leads | `referenceCode`, `customerName`, `phone`, `eventType`, `eventDate`, `guestCount`, `status` |
| `MenuCategory` | Category taxonomy | `name`, `slug`, `displayOrder`, `active` |
| `MenuItem` | Dishes for catering & cafe | `name`, `slug`, `price`, `dietaryType`, `businessType`, `availability` |
| `GalleryAsset` | Photography & event videos | `title`, `category`, `imageUrl`, `usagePermissionStatus`, `published` |
| `BusinessProfile` | Dual business metadata | `businessType`, `phone`, `address`, `operatingHours`, `serviceAreas` |
| `FunctionType` | Event taxonomy | `name`, `slug`, `category`, `servingFormat`, `minGuests` |
| `CuisineType` | Regional cuisine matrix | `name`, `slug`, `signatureDishes` |
| `Testimonial` | Verified customer reviews | `authorName`, `eventType`, `rating`, `content`, `verified` |
| `Faq` | Structured search FAQs | `question`, `answer`, `category`, `published` |
| `AuditLog` | Administrative action audit | `adminUserId`, `action`, `resourceType`, `resourceId`, `timestamp` |

## 3. Switching to Production PostgreSQL (Neon / Supabase)
1. Open `prisma/schema.prisma`.
2. Change the datasource block from:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
   to:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set your production `DATABASE_URL` in `.env`:
   ```bash
   DATABASE_URL="postgresql://username:password@ep-cool-proj.us-east-2.aws.neon.tech/venky_caterings?sslmode=require"
   ```
4. Run migrations:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
