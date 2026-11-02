# DATABASE SCHEMA & MIGRATION GUIDE

## 1. Architecture
The platform uses **Prisma ORM** with a normalized relational schema, owned exclusively by the Express API package (`server/`). The Next.js client never talks to the database directly.

- **Local Development:** SQLite database at `server/prisma/dev.db` for zero-configuration, instant local development on Windows, macOS, or Linux.
- **Production:** PostgreSQL (hosted on Neon Serverless Postgres, Supabase, or AWS RDS).

> `DATABASE_URL` is read from `server/.env`. Relative SQLite paths are resolved from the location of `server/prisma/schema.prisma`.

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

## 3. Local Commands

Run these from the repository root:

```bash
npm run db:push       # Push schema to SQLite/PostgreSQL
npm run db:generate   # Regenerate Prisma Client
npm run db:seed       # Seed admin, profiles, menu, gallery, content
npm run db:studio     # Open Prisma Studio
```

Or from `server/` directly:

```bash
npx prisma db push
node prisma/seed.js
```

## 4. Maintenance Scripts

Located in `server/prisma/`:

| Script | Purpose |
|---|---|
| `seed.js` | Upserts admin user, business profiles, functions, menu, gallery, testimonials, FAQs |
| `update_menu_images.js` | Maps seeded menu item slugs to local images in `client/public/` |
| `deactivate_placeholder_gallery.js` | Backs up gallery rows to `gallery_backup.json` and unpublishes placeholders |

Example:

```bash
cd server
node prisma/update_menu_images.js
node prisma/deactivate_placeholder_gallery.js
```

## 5. Switching to Production PostgreSQL (Neon / Supabase)
1. Open `server/prisma/schema.prisma`.
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
3. Set `DATABASE_URL` in `server/.env` (and in your API host's environment):
   ```bash
   DATABASE_URL="postgresql://username:password@ep-cool-proj.us-east-2.aws.neon.tech/venky_caterings?sslmode=require"
   ```
4. Push the schema and seed:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

## 6. Backups
- **SQLite:** Copy `server/prisma/dev.db` while the API is stopped.
- **PostgreSQL:** Use your provider's automated backups or `pg_dump`.
- **Uploads:** Back up `server/uploads/` or migrate to object storage.
