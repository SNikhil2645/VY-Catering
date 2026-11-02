# LOCKED PROJECT PLAN — VENKY YADAV CATERINGS

> This section records the approved decisions, creative direction, scope, and delivery order for the build. It takes precedence over the master build prompt below wherever the two differ. The master build prompt remains the full engineering specification.

## 0.1 Workspace Audit

- The project folder contained only the original brief (`Plan.md.txt`). No code, `package.json`, git repository, or assets existed.
- This is a **greenfield build**. Nothing existing is overwritten.

## 0.2 Locked Decisions

| Decision | Choice |
| --- | --- |
| Release 1 scope | **Catering-first platform**, with Venky Yadav Cafe as a polished teaser page. Cafe menu management and ordering are deferred to v2. |
| Language | **English UI with Telugu brand accents** (`వెంకీ యాదవ్ కేటరింగ్స్`) in the hero and key traditional headings. |
| Media | **Licensed placeholder photography** for the first build, logged in `docs/asset-sources.md` and swapped for owner-approved photos later. |
| Accounts/auth | Build with local development fallbacks first; connect Vercel, Neon, Cloudinary, and email credentials when supplied. |
| Facts pending verification | 470K Instagram followers, cafe 24-hour operating hours, and all provisional prices must be shown as "to be confirmed" until the owner approves them. Never publish them as verified statistics. |

## 0.3 Creative Direction — Traditional Soul, Premium Finish, Unique Motion

The design must feel like a premium Andhra hospitality house, not a generic restaurant template.

### Palette

| Token | Hex | Use |
| --- | --- | --- |
| Charcoal | `#171411` | Cinematic sections |
| Warm Ivory | `#F8F3E9` | Editorial sections |
| Rich Maroon | `#681F2B` | Brand accents, primary CTAs |
| Antique Gold | `#C6A15B` | Borders, fine detail only |
| Warm Dark Brown | `#30231D` | Depth, wood textures |
| Marigold | `#E08A1E` | Small festive accents |
| Banana Leaf | `#4E6B3A` | Natural and food accents |

### Typography

- Elegant serif for large editorial headlines: Cormorant Garamond or Playfair Display.
- Modern sans-serif for navigation, body, forms, and controls: Inter or Mukta.
- Telugu accent font for the brand name and traditional headings.
- Proper local fallbacks and non-blocking font loading.

### Traditional Craft Cues (used sparingly, never kitschy)

- Kolam / muggu line-art section dividers drawn as SVG.
- Temple-arch (gopuram) framed image cards.
- Brass thali and banana-leaf serving motifs.
- Fine gold filigree borders and subtle silk texture.
- Marigold petal accents on key CTAs only.

### Avoid

Glassmorphism, neon effects, cartoon food illustrations, emoji as identity, random floating cards, excessive gradients, fake reviews, fake ratings, and fabricated statistics.

## 0.4 Unique Animation System

One consistent motion language: `ease-out`, 400–900 ms, transform and opacity only, fully disabled under `prefers-reduced-motion`.

| Moment | Animation |
| --- | --- |
| Hero | Banana-leaf unfurl clip-path reveal, staggered headline entrance, subtle steam over dish photography, CTA rise |
| Section dividers | Kolam SVG self-draws on scroll |
| "Journey of a Feast" | Pinned scroll timeline: sourcing → firewood → dum → banana-leaf serving |
| **Thali Orbit** (signature) | Scroll-driven brass thali rotates while dishes orbit in (GSAP ScrollTrigger used only here) |
| **Function Finder** (signature) | User selects a function type; an animated thali assembles a recommended menu |
| Dish cards | Desktop hover reveals subtle steam and ingredient notes |
| Gallery | Brass-frame lightbox, smooth category filters, keyboard navigation |
| Navigation | Gold underline sweep, smooth mobile menu sheet |
| Loading | Short kolam draw-in only; no artificial delay |

Libraries: **Framer Motion** by default; **GSAP + ScrollTrigger** only for the pinned Thali Orbit journey. No third animation library.

## 0.5 Functions We Cater (Event Taxonomy)

Every function receives its own content block or page with intro, sample menu, serving format, minimum-guest guidance, and a "Plan This Function" CTA that pre-fills the booking form.

### A. Wedding and Pre-Wedding

| Function | Recommended Service Style |
| --- | --- |
| Engagement / Nischitartham | Sit-down or buffet |
| Haldi / Pellikuthuru | Traditional meal plus live counters |
| Mehendi / Sangeet | Buffet plus mocktail counter |
| Wedding / Muhurtham | Banana-leaf sadhya or grand buffet (350–1,700+ guests) |
| Reception | Grand buffet plus live counters |
| Baraat / Groom's procession | Snack and beverage service |

### B. Family and Life Events

First birthday, kids' birthdays, milestone birthdays, anniversaries, baby shower (Seemantham), naming ceremony (Namakaranam), first rice (Annaprasana), thread ceremony (Upanayanam), ear-piercing (Karnavedha), housewarming (Gruhapravesham), retirement and farewell, family reunions.

### C. Religious, Temple, and Festival

Annadanam, temple festivals and Brahmotsavam, satvik and prasadam catering, Sankranti, Ugadi, Vinayaka Chavithi, Dasara, Deepavali, Pongal, Christmas, Eid, prayer meetings, and condolence gatherings (handled respectfully).

### D. Corporate and Institutional

Conferences and seminars, annual day and awards nights, product launches, office inaugurations, training and workshops, college fests, sports meets, government, NGO, and community events.

### E. Social and Private

Kitty parties, private dinners, farmhouse and outdoor parties, school events, political and community gatherings, and film-crew catering where requested.

## 0.6 Cuisine Variety and Menu Matrix

| Cuisine | Signature Examples |
| --- | --- |
| Andhra / Telugu traditional | Gongura, Pulusu, Avakaya, Pesarattu, Pulihora, Gutti Vankaya, Bendakaya chepala pulusu |
| Hyderabadi | Mutton dum biryani, Haleem, Qubani ka Meetha |
| North Indian | Paneer dishes, Chole, Naan, Dal Makhani |
| South Indian tiffin | Idli, Dosa, Vada, Upma |
| Coastal and seafood | Loose prawns, Royyala Iguru |
| Indo-Chinese | Veg Manchuria, Chicken fry, noodles |
| Tandoor and BBQ | Kebabs and grilled counters |
| Continental | Pasta and pizza (shared with the cafe identity) |
| Chaat and street food | Pani puri and chaat counters |
| Desserts | Payasam, Jalebi, Double ka Meetha, Rabri |
| Beverages | Irani chai, filter coffee, buttermilk, mocktails |

- **Dietary axes:** Vegetarian, Non-Vegetarian, Satvik, Jain, Halal (labelled only where verified).
- **Live counters:** Dosa, appam, jalebi, dum biryani, grill, chaat, pani puri, mocktail.
- All items, descriptions, prices, availability, and images must be admin-editable. Unverified prices display as "on enquiry".

## 0.7 Site Architecture (Release 1)

```
/                    Home (cinematic)
/about               Founder story: Telavani Venkatesh (Venky Yadav)
/services            Services hub
/services/[slug]     Wedding, Reception, Corporate, Birthday,
                     Engagement, Family, Festival, Outdoor and large-scale
/functions           All function types from section 0.5
/menu                Explorer: search, filters, diet labels, download
/gallery             Masonry, filters, lightbox, video
/cafe                Venky Yadav Cafe teaser (distinct warmer identity)
/booking             Multi-step enquiry (4 steps, Zod validation)
/contact             Both addresses, maps, click-to-call, WhatsApp
/privacy /terms      Legal pages (flagged for professional review)
/admin/*             Protected dashboard
/api/*               Route handlers
```

## 0.8 Data Model Additions

In addition to the entities in section 10, add:

- `FunctionType` — name, slug, description, recommended menus, serving format, display order, published.
- `CuisineType` — name, slug, description, display order.
- `ServiceOffering` — links services to function types.
- `Testimonial` — genuine, authorized testimonials only.
- `FAQ` — real visible FAQs only, supporting FAQ structured data.

## 0.9 Phased Delivery

| Phase | Deliverable | Gate |
| --- | --- | --- |
| 0 | Discovery: asset manifest, sitemap, design-token spec, verified business facts | Signed-off facts and assets |
| 1 | Foundation: Next.js, TypeScript strict, Tailwind, tokens, UI primitives, layouts | Clean build |
| 2 | Public pages: Home, About, Services, Functions, Menu, Gallery, Cafe teaser, Contact, Legal | Fully responsive |
| 3 | Motion system: banana-leaf hero, kolam dividers, Thali Orbit, Function Finder | Reduced-motion safe |
| 4 | Backend: Prisma schema, migrations, seed, enquiry API, authentication | Enquiries persist |
| 5 | Admin dashboard and menu/gallery CRUD | End-to-end pass |
| 6 | Integration: forms to API, email, WhatsApp links, maps | Real success states only |
| 7 | Testing: unit, integration, end-to-end, mobile, keyboard | All green |
| 8 | Hardening: SEO, performance, security headers, accessibility audit | Lighthouse 90+ targets met |
| 9 | Deployment prep: env template, migrations, documentation, handover | Fresh-clone install verified |

## 0.10 Open Items Requiring Owner Confirmation

1. Approval to publish the 470K Instagram follower figure.
2. Confirmation of the cafe 24-hour operating claim.
3. Approval of all provisional menu prices.
4. Supply of the logo, founder portrait, and real event and food photography.
5. Domain, Vercel, database, media, and email account access.

---

# MASTER BUILD PROMPT: VENKY YADAV CATERINGS — PREMIUM WEBSITE & BUSINESS MANAGEMENT PLATFORM

## 1. YOUR ROLE

Act as a complete senior product engineering team consisting of:

- Senior UI/UX Designer
- Premium Hospitality Brand Designer
- Frontend Engineer
- Backend Engineer
- Database Architect
- Motion and Interaction Designer
- SEO Specialist
- Security Engineer
- QA and Deployment Engineer

Your mission is to PLAN, DESIGN, DEVELOP, TEST, and PREPARE FOR DEPLOYMENT a complete, production-quality website and backend platform for **Venky Yadav Caterings**, founded by Telavani Venkatesh, popularly known as Venky Yadav, in Tirupati, Andhra Pradesh, India.

Do not create a generic restaurant template, a static landing page, or a frontend-only demonstration.

Build a visually exceptional, fast, responsive, accessible, maintainable, and secure website with a functional backend, database, admin dashboard, event enquiry system, media management, and advanced animations.

Work systematically, explain important decisions in beginner-friendly language, and implement actual functionality rather than leaving buttons and forms as placeholders.

## 2. BUSINESS INFORMATION

### Primary business: Venky Yadav Caterings

Founder: Telavani Venkatesh (Venky Yadav)

Official website reference:
https://venkyyadavcaterings.com/

Instagram:
https://www.instagram.com/venkyyadavforu/

Business address:
22-11-46/2, Autonagar, SV Auto Nagar, Tirupati, Andhra Pradesh 517501, India.

Primary service areas:
- Tirupati
- Renigunta Road
- Renigunta
- Other locations across the Rayalaseema region, subject to confirmation

Business services:
- Wedding and reception catering
- Large-scale wedding celebrations
- Birthday parties
- Engagement ceremonies
- Corporate events
- Family functions
- Festivals
- Private parties
- Indoor and outdoor catering
- Customized vegetarian and non-vegetarian menus
- Live cooking and traditional food preparation, where available

Stated event capacity:
- Medium and large gatherings starting around 350 guests
- Large wedding celebrations accommodating 1,700+ guests, subject to event requirements and availability

Signature dishes:
- Authentic Hyderabadi mutton dum biryani
- Loose prawns
- Veg Manchuria
- Chicken fry
- Bendakaya chepala pulusu
- Other traditional Andhra and popular Indian dishes

Contact information:
- Catering bookings: +91 63040 05185
- Promotions and enquiries: +91 83281 29450

Social proof:
The supplied business brief reports more than 470K Instagram followers. Treat this as an owner-provided figure that must be verified before displaying it as a current statistic.

## 3. RELATED BUSINESS: VENKY YADAV CAFE

> **Release 1 scope (locked):** Cafe is delivered as a **teaser only**. Build the cinematic hero, the 4 AM Maska Bun and Irani Chai feature, a curated static menu preview, location, contact, directions, and a phone CTA. Cafe menu management, live pricing, and ordering are deferred to v2. See section 0.2.

Create a distinct Cafe experience within the same website ecosystem.

Cafe name: Venky Yadav Cafe

Address:
20-7-60/A, Renigunta–Tirupati Road, Subash Nagar, Sujatha Nagar, Kothapalli, Tirupati, Andhra Pradesh 517501, India.

Contact:
+91 83281 29450

Operating hours:
24 hours, as supplied by the business owner. Display this claim only after confirmation.

Brand identity:
A lively, spacious, casual food destination with self-service and a memorable early-morning food culture.

Signature experience:
4 AM Maska Bun and Irani Chai.

Menu categories:
- Fried chicken wings, lollipops and leg pieces
- Nine-inch pizzas
- Peri Peri Chicken Pizza
- Gongura Chicken Pizza
- Gongura Veg Pizza
- Venky Yadav Special Pizza
- Chicken burgers
- Cheese burgers
- Sandwiches
- Momos
- Milkshakes
- Tea and other hot beverages
- Maska Bun varieties

Indicative supplied price ranges:
- Fried chicken: ₹130–₹250
- Pizzas: ₹240–₹369

Treat these as provisional, not a verified current menu. Allow the admin to manage current prices and availability.

Cafe ordering should link to the verified ordering platform if direct ordering is not implemented. Do not pretend an order has been placed unless the complete ordering backend is operational.

## 4. PRODUCT VISION

Create a premium hospitality website that combines:

1. A cinematic catering brand experience.
2. A beautiful food and event gallery.
3. A powerful catering quotation and enquiry system.
4. A separate cafe discovery and menu experience.
5. A secure admin dashboard.
6. Search engine optimization and local business visibility.
7. A reusable architecture that can grow into online ordering, event management, and customer relationship management.

The first priority is generating qualified catering leads and phone enquiries. The second priority is presenting the cafe in a compelling way.

Every major page should have a clear purpose and conversion goal.

## 5. VISUAL DESIGN DIRECTION

Design a premium visual identity inspired by luxury hospitality, contemporary Indian wedding photography, editorial food magazines, and cinematic live-cooking videos.

Avoid:
- Generic Bootstrap restaurant layouts
- Excessive glassmorphism
- Too many gradients
- Random floating cards
- Excessive rounded rectangles
- Unnecessary neon effects
- Cartoon food illustrations
- Emoji used as the primary visual identity
- Animations that interfere with reading or booking
- Fake testimonials, fabricated ratings, and invented statistics

### Suggested design system

Primary palette:
- Deep charcoal: #171411
- Warm ivory: #F8F3E9
- Rich maroon: #681F2B
- Antique gold: #C6A15B
- Warm dark brown: #30231D

Use ivory backgrounds for editorial sections, charcoal for cinematic sections, maroon for strong brand accents, and gold sparingly for details.

Typography:
- Elegant serif typography for large editorial headlines.
- Modern sans-serif typography for navigation, descriptions, forms, and controls.
- Use locally available or properly loaded fonts with suitable fallbacks.

Visual characteristics:
- Large, expressive headlines.
- Full-bleed photography.
- Asymmetric image layouts.
- Generous whitespace.
- Refined separators and borders.
- Elegant hover states.
- Smooth transitions between sections.
- Sophisticated mobile layouts.

Create a consistent design token system for colors, typography, spacing, radii, shadows, and animation durations.

## 6. PHOTO RESEARCH AND BRAND ASSET DISCOVERY

Before finalizing the design, inspect the existing official website and publicly accessible brand sources.

Reference sources:
- https://venkyyadavcaterings.com/
- https://www.instagram.com/venkyyadavforu/
- https://www.google.com/search?q=Venky+Yadav+Caterings+Tirupati
- https://www.google.com/search?tbm=isch&q=Venky+Yadav+Caterings+Tirupati
- https://www.google.com/search?tbm=isch&q=Venky+Yadav+Cafe+Tirupati
- https://www.justdial.com/Tirupati/Venky-Yadav-Caters-Pullawanigunta/9999PX877-X877-250228200636-U4X4_BZDET
- https://www.zomato.com/tirupati/venky-yadav-cafe-korramenugunta

Search for authentic, publicly accessible photographs of:
- The founder and brand
- Wedding catering setups
- Large outdoor cooking vessels
- Wood-fire cooking
- Biryani preparation
- Live event catering
- Buffet arrangements
- Food close-ups
- Cafe interiors and exterior
- Maska Bun and Irani Chai
- Pizza, fried chicken, burgers, and beverages

Asset rules:
1. Prefer original, owner-provided photographs and videos.
2. Use official public media only where usage is permitted.
3. Do not bypass account restrictions, scrape private content, or download media in violation of applicable terms.
4. If the original media is unavailable, use appropriately licensed, high-quality replacement photography.
5. Never present stock photography as an actual photograph of Venky Yadav's business.
6. Keep image assets organized by category in a documented media directory or approved cloud media service.
7. Generate descriptive filenames, alt text, responsive image sizes, and appropriate image credits where required.
8. Use real brand photographs as soon as the owner supplies or approves them.
9. Create an asset manifest listing each image, its source, permission status, intended use, and replacement status.

Do not claim to have accessed private Google Photos albums. If the owner has specific Google Photos images, request an authorized export or uploaded files.

## 7. REQUIRED WEBSITE PAGES

### A. Home page

Create a premium cinematic landing page with:

- A refined transparent navigation bar that transitions into a solid background when scrolling.
- Brand logo and elegant wordmark.
- A compelling hero headline, such as “Every Celebration Deserves a Feast.”
- A supporting statement about large-scale catering and authentic flavors.
- Two primary calls to action: “Plan Your Event” and “Explore Our Food.”
- An immersive, high-quality food or event photograph.
- A subtle animated image reveal or video background.
- A quick enquiry or WhatsApp booking option.
- A concise section introducing Venky Yadav Caterings.
- Featured event types.
- Signature dishes.
- A visually striking live-cooking or catering gallery.
- Event capacity highlights, once confirmed.
- A founder or brand story section.
- A section introducing Venky Yadav Cafe.
- Genuine customer testimonials, if supplied or obtained from authorized sources.
- Instagram and YouTube content links.
- A strong final booking CTA.
- A complete footer with contacts, addresses, navigation, social links, and legal links.

Do not overload the homepage. Maintain a deliberate visual hierarchy and clear progression from brand discovery to booking.

### B. Catering services

Create dedicated sections or pages for:

- Wedding catering
- Reception catering
- Corporate catering
- Birthday and anniversary catering
- Engagement ceremonies
- Family celebrations
- Festival catering
- Outdoor and large-scale catering

Each service should include relevant imagery, a concise explanation, suitable menu options, and an enquiry CTA.

Do not claim that every menu, service, or event setup is guaranteed. Make the wording clear that availability and customization depend on the booking.

### C. Menu page

Create an attractive menu explorer with:

- Vegetarian and non-vegetarian categories.
- Starters.
- Main courses.
- Biryani and rice.
- Seafood.
- Traditional Andhra dishes.
- Desserts and beverages, if offered.
- Dish photography.
- Search and category filters.
- Dietary labels where verified.
- Spice-level indicators only where confirmed.
- A download-menu option when a current menu file exists.
- A catering enquiry CTA.

All menu items, descriptions, prices, availability, and photographs must be editable from the admin dashboard.

Avoid publishing invented menu items or unverified prices.

### D. Event gallery

Build a premium gallery organized by:

- Weddings
- Large-scale events
- Outdoor cooking
- Buffet setups
- Signature dishes
- Corporate events
- Behind the scenes

Requirements:
- Responsive masonry or editorial grid.
- Smooth image reveal.
- Category filters.
- Lightbox with next/previous controls.
- Keyboard accessibility.
- Lazy loading.
- Optimized image delivery.
- Optional captions and event descriptions.
- Video support for authorized cooking and event videos.

Use genuine business media wherever possible.

### E. About and founder story

Present the brand's story, founder, catering philosophy, food preparation, hospitality, and event capabilities.

Use only verified biographical information.

Include a founder portrait or brand photograph only if an authorized image is available.

### F. Catering booking page

Build a dedicated booking experience with a multi-step form.

Step 1: Event details
- Event type.
- Event date.
- Event start time.
- Venue or event location.
- Indoor or outdoor event.
- Approximate guest count.

Step 2: Food preferences
- Vegetarian, non-vegetarian, or both.
- Preferred menu categories.
- Dietary requirements.
- Special requests.
- Live cooking or special arrangements, if available.

Step 3: Customer details
- Customer name.
- Phone number.
- Email address, optional.
- Preferred contact method.
- Additional message.

Step 4: Review and submit
- Display all entered information.
- Allow editing before submission.
- Require consent to the privacy policy.
- Clearly state that the request is an enquiry, not a confirmed reservation.
- Submit securely to the backend.
- Display a confirmation message and unique enquiry reference after successful database persistence.

Use date validation to prevent invalid past-date submissions. Permit suitable future booking dates and make the minimum advance-notice rule configurable.

Include a WhatsApp option as a secondary path, not a replacement for the backend enquiry system.

### G. Cafe page

> **Release 1 scope (locked):** Build the cafe teaser experience only. Show the hero, the 4 AM Maska Bun and Irani Chai feature, a curated menu preview marked "indicative", interior and food photography, location, contact, directions, a verified ordering link if available, and a phone CTA. Do not build a live order tracker or cafe menu-management UI in v1.

Give the cafe a distinct visual identity while maintaining consistent brand ownership.

Use a warmer, more energetic visual style, with:
- A dramatic cafe hero.
- A 4 AM Maska Bun and Irani Chai feature.
- A cafe menu with categories and editable prices.
- Pizza and fried-chicken highlights.
- Interior and food photography.
- Location and contact details.
- The confirmed opening-hours information.
- A directions link.
- A verified third-party ordering link.
- A phone CTA.

Do not display a fake live order tracker or fake delivery status.

### H. Contact and location

Include:
- Catering phone number: +91 63040 05185.
- Promotions and cafe enquiry number: +91 83281 29450.
- Both business addresses.
- Click-to-call links.
- WhatsApp links using correctly encoded phone numbers.
- Directions to each location.
- A map embed using an appropriate verified map location.
- A contact form.
- Business hours where confirmed.
- Service-area information.

### I. Legal pages

Create:
- Privacy policy.
- Terms of use.
- Enquiry and booking terms.
- Cookie notice only where appropriate.
- A clear data retention and contact policy.

Use appropriate Indian business and privacy requirements as a checklist for review. Flag any legal text that requires professional review rather than claiming guaranteed legal compliance.

## 8. ADVANCED ANIMATION AND INTERACTION SYSTEM

Animations must look intentional, smooth, premium, and performance-conscious.

Use a consistent motion language rather than unrelated effects on every component.

### Hero animation
- A refined initial page reveal.
- Staggered headline entrance.
- Image reveal using a clip-path or mask.
- Subtle depth or parallax effect where appropriate.
- Animated CTA entrance.
- A restrained scroll indicator.

### Scroll-based motion
- Reveal section headlines as they enter the viewport.
- Use staggered cards and image reveals.
- Animate image crops subtly during scroll.
- Use pinned storytelling sections only where they improve the experience.
- Create an elegant progression through the founder story and event gallery.
- Avoid excessive full-page scroll hijacking.

### Signature food experience
- High-quality dish photography with subtle scale transitions.
- Image swaps or detail reveals on hover for desktop.
- Elegant menu card interactions.
- Optional ingredient or dish-story reveals.
- A visually distinctive featured-dish section.

### Gallery interactions
- Smooth filtering transitions.
- Lightbox open/close transitions.
- Image zoom with restrained easing.
- Keyboard navigation.
- Touch-friendly mobile controls.

### Navigation and buttons
- Animated navigation underline.
- Smooth mobile menu transitions.
- Clear button hover and pressed states.
- Small directional arrow animations.
- Smooth anchor scrolling.

### Loading experience
- A minimal, short branded loading treatment only if necessary.
- No long blocking intro.
- No artificial loading delay.
- Avoid a loading screen on every route.

### Motion engineering rules
- Prefer CSS transitions for simple interactions.
- Use Framer Motion (Motion for React) for complex React animations.
- Use GSAP and ScrollTrigger only where complex timeline or pinned-scroll behavior genuinely warrants them.
- Avoid introducing multiple animation libraries without a clear reason.
- Animate transform and opacity wherever possible.
- Avoid continuous animation that harms battery life.
- Respect prefers-reduced-motion.
- Ensure every animation works with keyboard navigation and touch devices.
- Keep booking forms usable when animations are disabled.
- Prevent layout shifts and content flashing.
- Test animations on real mobile viewport sizes.

## 9. RECOMMENDED TECHNOLOGY STACK

Use a modern TypeScript-based stack, with a clear separation between the public website, server-side business logic, and database.

### Frontend
- Next.js with the App Router.
- React.
- TypeScript with strict type checking.
- Tailwind CSS.
- A small set of reusable, accessible UI primitives.
- Framer Motion for animations.
- GSAP only for selected advanced scroll experiences.
- React Hook Form for form management.
- Zod for input validation.
- Lucide icons.

### Backend
Use Next.js server-side route handlers or server actions for the initial architecture, with dedicated service and repository layers. Do not add a separate Express server unless it provides a concrete architectural benefit.

Implement:
- Server-side validation.
- Authentication and authorization.
- Enquiry processing.
- Database operations.
- Media management.
- Rate limiting.
- Logging.
- Email notifications.
- Admin-only endpoints.

### Database
Use PostgreSQL with Prisma ORM.

A managed PostgreSQL provider such as Supabase or Neon is acceptable. Choose one primary provider, document the setup, and avoid unnecessary duplication.

### Image and video storage
Use an authorized cloud media provider or managed object storage, such as Cloudinary or Supabase Storage.

Keep media URLs and metadata in the database. Do not store large image binaries directly in PostgreSQL.

### Authentication
Use a reputable authentication solution compatible with the selected Next.js architecture.

Support secure administrator login, session management, logout, and server-side role checks.

### Notifications
Implement configurable email notifications using a reputable transactional email provider.

If email credentials are unavailable, provide a clearly documented development fallback. Never expose secret keys in frontend code.

### Deployment
Prepare for deployment to a platform compatible with Next.js, such as Vercel, with the database and media service configured separately.

Pin compatible dependency versions and document required environment variables.

## 10. DATABASE DESIGN

Design a normalized, maintainable database with appropriate relationships, indexes, constraints, timestamps, and migrations.

Create the following entities as appropriate.

> **Additional entities (locked, see section 0.8):** `FunctionType`, `CuisineType`, `ServiceOffering`, `Testimonial`, and `FAQ` are required to support the function taxonomy and cuisine matrix.

### AdminUser
- id
- name
- email
- password hash or authentication-provider identifier
- role
- createdAt
- updatedAt

Use the authentication provider's recommended credential handling. Never store plaintext passwords.

### Enquiry
- id
- referenceCode
- customerName
- phone
- email
- preferredContactMethod
- eventType
- eventDate
- eventStartTime
- guestCount
- venue
- eventFormat
- foodPreference
- specialRequests
- status
- internalNotes
- source
- consentTimestamp
- createdAt
- updatedAt

Statuses:
- New
- Contacted
- Quotation in progress
- Quotation sent
- Confirmed
- Completed
- Cancelled

### MenuCategory
- id
- name
- slug
- description
- displayOrder
- active

### MenuItem
- id
- categoryId
- businessType
- name
- slug
- description
- price
- dietaryType
- imageUrl
- availability
- featured
- displayOrder
- createdAt
- updatedAt

### GalleryAsset
- id
- title
- description
- category
- imageUrl
- thumbnailUrl
- mediaType
- altText
- displayOrder
- published
- source
- usagePermissionStatus
- createdAt

### BusinessProfile
- id
- businessType
- businessName
- address
- phone
- operatingHours
- serviceAreas
- socialLinks
- published

### SiteContent
- id
- key
- title
- body
- imageUrl
- metadata
- updatedAt

### AuditLog
- id
- adminUserId
- action
- resourceType
- resourceId
- timestamp

Add any further tables only when justified. Use proper foreign keys, validation, and migrations.

Store all times consistently, display event dates and times in the appropriate local timezone, and prevent duplicate submissions where appropriate.

## 11. SECURE ADMIN DASHBOARD

Build a protected route such as /admin.

The dashboard must be a real application, not a decorative mockup.

### Overview
Display:
- New enquiries.
- Enquiries by status.
- Upcoming event requests.
- Recent activity.
- Menu item counts.
- Gallery asset counts.

Calculate dashboard statistics from actual database records. Do not use hardcoded fake metrics.

### Enquiry management
Administrators can:
- View and search enquiries.
- Filter by status, event date, event type, and guest count.
- Open enquiry details.
- Update statuses.
- Add internal notes.
- Record contact history where implemented.
- Export appropriately authorized records to CSV.
- Mark completed or cancelled requests.

### Menu management
Administrators can:
- Add menu items.
- Edit descriptions and prices.
- Change availability.
- Assign categories.
- Upload or select images.
- Feature selected items.
- Reorder menu items.
- Publish or unpublish items.

### Gallery management
Administrators can:
- Upload approved media.
- Add captions and alt text.
- Assign gallery categories.
- Reorder photographs.
- Publish and unpublish media.
- Record image usage permission.
- Remove outdated content.

### Business settings
Administrators can edit:
- Contact numbers.
- Business addresses.
- Operating hours.
- Service areas.
- Social media links.
- Booking notices.
- Menu and event settings.

Protect all administrator actions on the server. Hiding dashboard links is not authorization.

## 12. FUNCTIONAL REQUIREMENTS

Every visible interactive control must work.

Implement:
- Functional navigation.
- Working service and menu filters.
- Real enquiry form submission.
- Backend validation.
- Database persistence.
- Enquiry reference generation.
- Confirmation and error states.
- Phone links.
- Correctly encoded WhatsApp links.
- Map directions.
- Admin authentication.
- Protected admin routes.
- CRUD operations for menu and gallery content.
- Real database-driven dashboard metrics.
- Email notification integration.
- Responsive navigation.
- Search-friendly pages.
- Appropriate empty states.
- Loading indicators.
- Retry-friendly error handling.

Do not create fake success messages when a backend request fails.

If a third-party integration requires credentials, implement the integration structure, explain the missing configuration, and test the available parts.

## 13. SECURITY REQUIREMENTS

Treat the website as a real business platform that receives customer information.

Implement:
- Server-side input validation.
- Parameterized database operations through the ORM.
- Authentication and server-side authorization.
- Secure session handling.
- Rate limiting for public forms.
- Protection against automated spam.
- Safe error responses.
- Secure environment-variable handling.
- Upload size and MIME-type validation.
- Appropriate file upload restrictions.
- Safe rendering of customer-supplied content.
- Protection against common XSS and CSRF risks where applicable.
- Secure production cookie settings.
- Data access restrictions.
- Appropriate HTTP security headers.
- Database backups and recovery guidance.
- Minimal collection and retention of personal information.
- Audit logging for important administrative actions.

Do not expose internal notes, customer phone numbers, emails, or enquiry records to public endpoints.

Never commit API keys, passwords, database URLs containing credentials, or production secrets to Git.

## 14. SEO AND LOCAL DISCOVERY

Optimize the website for searches related to catering services in Tirupati and surrounding service areas.

Implement:
- Unique titles and meta descriptions.
- Canonical URLs.
- Open Graph metadata.
- Social sharing images.
- XML sitemap.
- robots.txt.
- Semantic headings.
- Descriptive image alt text.
- Internal linking.
- Breadcrumbs where appropriate.
- Fast page loading.
- Clean URL slugs.
- Appropriate LocalBusiness or FoodEstablishment structured data for the correct business.
- Service-related structured data only when supported by the content.
- FAQ structured data only for genuine visible FAQs that meet search-engine requirements.

Use separate, accurate business details for the caterer and cafe.

Do not publish fake reviews, ratings, awards, opening hours, prices, or unverified location information in structured data.

Provide an SEO checklist for verifying the domain, Google Search Console, sitemap submission, and Google Business Profile.

## 15. PERFORMANCE AND ACCESSIBILITY

Target excellent Core Web Vitals and an accessible user experience.

Implement:
- Responsive images.
- Next.js image optimization where supported.
- Modern image formats when supported.
- Lazy loading below the fold.
- Appropriate font loading.
- Minimal client-side JavaScript.
- Server rendering for suitable public pages.
- Route-level code splitting.
- Reduced-motion support.
- Keyboard-accessible controls.
- Visible focus indicators.
- Accessible form labels.
- Helpful validation messages.
- Adequate text contrast.
- Appropriate semantic landmarks.
- Descriptive link labels.
- Accessible gallery controls.

Aim for Lighthouse scores of 90+ in Performance, Accessibility, Best Practices, and SEO where practical. Treat the scores as targets to measure, not results to claim without testing.

Avoid loading large animation libraries or high-resolution video files unnecessarily on mobile.

## 16. TESTING REQUIREMENTS

Write and run meaningful tests.

### Unit tests
Test:
- Form validation.
- Enquiry reference generation.
- Business and menu data validation.
- Enquiry status transitions.
- Access-control helpers.

### Integration tests
Test:
- Enquiry creation.
- Invalid enquiry rejection.
- Database persistence.
- Menu CRUD.
- Gallery CRUD.
- Authentication and authorization.
- Email integration behavior.

### End-to-end tests
Use Playwright or an equivalent tool to test:
- Homepage navigation.
- Catering enquiry submission.
- Invalid and missing fields.
- Confirmation states.
- Admin login and logout.
- Unauthorized dashboard access.
- Menu management.
- Gallery interactions.
- Mobile navigation.
- Responsive booking forms.

Run linting, type checking, production builds, and available automated tests. Fix discovered errors instead of merely reporting them.

Never run destructive tests against production customer data.

## 17. DEVELOPMENT WORKFLOW

> **Aligned delivery order (locked):** Follow the Phase 0–9 table in section 0.9. The seven phases below map onto those gates and still apply in full.

Follow these phases in order.

### Phase 1 — Audit and planning
- Inspect the existing repository before modifying it.
- Identify existing files, dependencies, and deployment configuration.
- Review the current website and permitted public references.
- Document business requirements and unknown information.
- Create a sitemap.
- Create a design system.
- Plan the database schema.
- Plan the backend API and security model.
- Produce an implementation checklist.

Do not overwrite existing work without inspecting it first.

### Phase 2 — Project foundation
- Configure the application.
- Configure TypeScript and linting.
- Install compatible dependencies.
- Set up the database client and migrations.
- Configure environment variables.
- Create shared layouts and design tokens.
- Establish reusable UI components.

### Phase 3 — Frontend
Build the responsive public pages and navigation.

Implement the design system, media layouts, interactions, animations, and mobile behavior.

Use actual business content and clearly marked placeholders only where assets are unavailable.

### Phase 4 — Backend
Implement the database, authentication, validation, enquiry processing, menu operations, gallery operations, email notifications, and administrative permissions.

### Phase 5 — Integration
Connect the frontend to real backend endpoints.

Ensure all displayed business data is derived from the appropriate source and all forms handle success, validation failures, and network errors.

### Phase 6 — Testing
Run unit, integration, and end-to-end tests.

Test mobile and desktop layouts, keyboard navigation, security controls, and production builds.

### Phase 7 — Deployment preparation
Prepare:
- Production build.
- Database migration instructions.
- Environment-variable template.
- Hosting instructions.
- Domain configuration instructions.
- Image storage configuration.
- Admin account setup instructions.
- Backup and recovery notes.
- A post-deployment verification checklist.

Do not claim the website is deployed unless deployment has actually succeeded.

## 18. EXPECTED PROJECT STRUCTURE

Adapt this structure to the chosen implementation without forcing unnecessary files.

.
├── client/                          # Next.js 15 frontend package (@vyc/client)
│   ├── public/                      # Static images, icons, brand assets
│   ├── src/
│   │   ├── app/                     # App Router routes (pages only, no API routes)
│   │   │   ├── page.tsx             # Cinematic home
│   │   │   ├── layout.tsx
│   │   │   ├── about/
│   │   │   ├── services/            # Hub + [slug] detail
│   │   │   ├── functions/
│   │   │   ├── menu/
│   │   │   ├── gallery/
│   │   │   ├── cafe/
│   │   │   ├── booking/
│   │   │   ├── contact/
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   ├── robots.ts
│   │   │   ├── sitemap.ts
│   │   │   └── admin/               # Protected dashboard pages
│   │   ├── components/              # layout, hero, sections, motion, booking, menu, gallery, ui
│   │   └── lib/                     # Client-side utils + validation schemas
│   ├── next.config.js               # Rewrites /api + /uploads to the API
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── .env.example
│
├── server/                          # Express + Prisma API package (@vyc/server)
│   ├── src/
│   │   ├── index.ts                 # HTTP listener
│   │   ├── app.ts                   # Express app wiring
│   │   ├── config/                  # Environment configuration
│   │   ├── db/                      # Prisma client singleton
│   │   ├── auth/                    # Token signing/verification + session helpers
│   │   ├── middleware/              # Admin guard + error handlers
│   │   ├── validation/              # Zod schemas
│   │   ├── utils/                   # Reference code generation
│   │   └── routes/                  # auth, enquiries, gallery, menu, content, admin/*
│   ├── prisma/                      # schema.prisma, seed.js, maintenance scripts, dev.db
│   ├── scripts/                     # verify-upgrade.js
│   ├── uploads/                     # Runtime media (/uploads/gallery|menu|general)
│   ├── tsconfig.json
│   └── .env.example
│
├── tests/                           # Automated tests (unit, integration, e2e)
├── docs/                            # architecture, database, deployment, asset-sources, testing
├── package.json                     # npm workspaces + unified scripts
├── package-lock.json
├── .gitignore
└── README.md

The final architecture may differ if there is a clear technical reason. Keep server-only code out of client bundles and do not expose privileged database access to the browser. In this implementation the browser only talks to the Next.js origin, which proxies `/api/*` and `/uploads/*` to the Express API.

## 19. REQUIRED DOCUMENTATION

Create a professional README with:

- Project overview.
- Features.
- Technology stack.
- Prerequisites.
- Installation steps.
- Development commands.
- Environment variable instructions.
- Database setup.
- Migration commands.
- Seed-data instructions.
- Admin setup.
- Test commands.
- Production build commands.
- Deployment instructions.
- Troubleshooting guide.
- Security notes.

Include a safe .env.example with placeholder values, never actual secrets.

Provide database schema documentation, an API endpoint summary, an architecture overview, and a list of integrations requiring owner credentials.

If the project is developed on Windows, include clear PowerShell commands and Windows-friendly setup instructions.

## 20. DEFINITION OF DONE

The project is complete only when:

1. The public website is fully responsive.
2. The design feels premium and consistent across all pages.
3. The animation system is polished and accessible.
4. The catering booking form submits to a working backend.
5. Enquiries persist in the database.
6. Administrators can securely manage enquiries.
7. Menu and gallery management work end to end.
8. Customer contact details are protected.
9. All critical navigation and CTA links work.
10. Business information is accurate or explicitly marked for verification.
11. No fake reviews, statistics, bookings, or success states remain.
12. Automated tests, linting, type checking, and production builds have been run.
13. Setup and deployment instructions are complete.
14. Any missing external credentials or owner approvals are clearly documented.
15. The final handover explains what works, what was tested, and what remains to be configured.

## 21. HOW YOU MUST WORK

I am a beginner developer, so guide me step by step without sacrificing professional engineering standards.

First, inspect the existing workspace and report what you find. Then create a detailed implementation plan and start building.

Do not stop after generating a plan or a homepage. Continue through implementation, backend integration, testing, and deployment preparation.

Do not ask me to make unnecessary technical decisions. Choose sensible defaults and explain the important ones.

If you need business credentials, an approved image, a domain account, or an API key, request it only when necessary and explain exactly how to obtain and configure it safely.

If a task cannot be completed in the current environment, identify the limitation and provide the next actionable step.

After every major phase:
- Summarize what was completed.
- List important files created or modified.
- Run the relevant checks.
- Report errors honestly.
- Continue with the next phase when possible.

Do not repeatedly recreate the project from scratch. Preserve working code and make incremental, tested changes.

**FINAL OBJECTIVE:** Deliver a complete, premium, animated, SEO-friendly, secure, database-backed website and business management platform for Venky Yadav Caterings and Venky Yadav Cafe that is ready for real-world testing and production deployment after the required owner approvals and configuration are complete.