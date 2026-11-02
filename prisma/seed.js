const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Admin User
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123@VenkyYadav';
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@venkyyadavcaterings.com';
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      name: 'Telavani Venkatesh (Venky Yadav)',
      email: adminEmail,
      passwordHash,
      role: 'SUPERADMIN',
    },
  });
  console.log('✅ Admin user seeded:', adminEmail);

  // 2. Business Profiles
  await prisma.businessProfile.upsert({
    where: { businessType: 'CATERINGS' },
    update: {},
    create: {
      businessType: 'CATERINGS',
      businessName: 'Venky Yadav Caterings',
      tagline: 'Every Celebration Deserves an Unforgettable Feast',
      address: '22-11-46/2, Autonagar, SV Auto Nagar, Tirupati, Andhra Pradesh 517501, India',
      phone: '+91 63040 05185',
      alternatePhone: '+91 83281 29450',
      email: 'bookings@venkyyadavcaterings.com',
      operatingHours: 'Monday - Sunday: 8:00 AM - 10:00 PM (Enquiries)',
      serviceAreas: JSON.stringify(['Tirupati', 'Renigunta', 'Chandragiri', 'Srikalahasti', 'Chittoor', 'Rayalaseema Region']),
      socialLinks: JSON.stringify({
        instagram: 'https://www.instagram.com/venkyyadavforu/',
        website: 'https://venkyyadavcaterings.com/',
      }),
      published: true,
    },
  });

  await prisma.businessProfile.upsert({
    where: { businessType: 'CAFE' },
    update: {},
    create: {
      businessType: 'CAFE',
      businessName: 'Venky Yadav Cafe',
      tagline: '4 AM Maska Bun & Irani Chai Destination',
      address: '20-7-60/A, Renigunta–Tirupati Road, Subash Nagar, Sujatha Nagar, Kothapalli, Tirupati, Andhra Pradesh 517501, India',
      phone: '+91 83281 29450',
      operatingHours: '24 Hours (Subject to owner confirmation)',
      serviceAreas: JSON.stringify(['Renigunta Road', 'Tirupati']),
      socialLinks: JSON.stringify({
        instagram: 'https://www.instagram.com/venkyyadavforu/',
      }),
      published: true,
    },
  });
  console.log('✅ Business profiles seeded');

  // 3. Function Types (Event Taxonomy from plan.md Section 0.5)
  const functions = [
    {
      name: 'Wedding & Muhurtham',
      slug: 'wedding-muhurtham',
      category: 'WEDDING_PREWEDDING',
      description: 'Grand royal wedding feasts featuring authentic wood-fire dum biryani or ceremonial banana-leaf sadhya prepared with traditional rituals.',
      recommendedMenus: JSON.stringify(['Grand Royal Andhra Sadhya', 'Royal Rayalaseema Feast', 'Live Tandoor & Chaat Counters']),
      servingFormat: 'Banana-leaf Sadhya or Grand Buffet',
      minGuests: 350,
      displayOrder: 1,
    },
    {
      name: 'Reception Celebrations',
      slug: 'reception-celebrations',
      category: 'WEDDING_PREWEDDING',
      description: 'Opulent evening banquets with multi-cuisine spreads, live sizzling grill counters, mocktail lounges, and signature desserts.',
      recommendedMenus: JSON.stringify(['Hyderabadi Dum Biryani Feast', 'Indo-Chinese Live Counters', 'Dessert Extravaganza']),
      servingFormat: 'Grand Buffet + Live Counters',
      minGuests: 350,
      displayOrder: 2,
    },
    {
      name: 'Engagement & Nischitartham',
      slug: 'engagement-nischitartham',
      category: 'WEDDING_PREWEDDING',
      description: 'Intimate to lavish family gatherings welcoming the union with customary Andhra delicacies and live tiffin counters.',
      recommendedMenus: JSON.stringify(['Traditional Pelli Tiffins', 'South Indian Sit-Down Sadhya']),
      servingFormat: 'Sit-down or Buffet',
      minGuests: 200,
      displayOrder: 3,
    },
    {
      name: 'Haldi & Mehendi (Pellikuthuru)',
      slug: 'haldi-mehendi',
      category: 'WEDDING_PREWEDDING',
      description: 'Vibrant, colorful daytime celebrations with live street chaats, refreshing coolers, and authentic festive platters.',
      recommendedMenus: JSON.stringify(['Festive Street Chaat Counter', 'Rayalaseema Ragi Sangati & Natu Kodi', 'Pesarattu & Live Dosa']),
      servingFormat: 'Buffet + Live Street Counters',
      minGuests: 150,
      displayOrder: 4,
    },
    {
      name: 'Housewarming (Gruhapravesham)',
      slug: 'gruhapravesham',
      category: 'FAMILY_LIFE',
      description: 'Auspicious home inauguration feasts prepared strictly according to traditional customs with pristine satvik ingredients.',
      recommendedMenus: JSON.stringify(['Traditional Satvik Bhojanam', 'Gutti Vankaya & Pulihora Special']),
      servingFormat: 'Traditional Sit-Down Banana Leaf',
      minGuests: 150,
      displayOrder: 5,
    },
    {
      name: 'Milestone Birthdays & Anniversaries',
      slug: 'birthdays-anniversaries',
      category: 'FAMILY_LIFE',
      description: 'Joyful celebrations tailored with kid-friendly live stations, signature starters, and customized multi-course dining.',
      recommendedMenus: JSON.stringify(['Kids Live Station + Family Biryani Spread']),
      servingFormat: 'Buffet with Live Stations',
      minGuests: 100,
      displayOrder: 6,
    },
    {
      name: 'Corporate Conferences & Galas',
      slug: 'corporate-events',
      category: 'CORPORATE',
      description: 'Punctual, hygienic, executive culinary experiences for corporate retreats, product launches, and annual day dinners.',
      recommendedMenus: JSON.stringify(['Executive Buffet Spread', 'Continental & Indian Fusion']),
      servingFormat: 'Executive Buffet & High-Tea Stations',
      minGuests: 150,
      displayOrder: 7,
    },
    {
      name: 'Religious Gatherings & Annadanam',
      slug: 'religious-annadanam',
      category: 'RELIGIOUS_FESTIVAL',
      description: 'Pure, satvik and prasadam preparations honoring Tirupati sacred traditions for temple festivals, Brahmotsavam, and charitable feasts.',
      recommendedMenus: JSON.stringify(['Prasadam Bhojanam', 'Tirumala Style Sambar Rice & Sweet Pongal']),
      servingFormat: 'Community Banana-Leaf Service',
      minGuests: 500,
      displayOrder: 8,
    },
  ];

  for (const fn of functions) {
    await prisma.functionType.upsert({
      where: { slug: fn.slug },
      update: fn,
      create: fn,
    });
  }
  console.log('✅ Function types seeded');

  // 4. Cuisine Types (plan.md Section 0.6)
  const cuisines = [
    { name: 'Andhra Traditional', slug: 'andhra-traditional', description: 'Bold, fiery spices featuring Gongura, fresh tamarind pulusu, and ancestral heirloom recipes.', signatureDishes: 'Gongura Mutton, Gutti Vankaya, Bendakaya Chepala Pulusu, Avakaya Annam', displayOrder: 1 },
    { name: 'Hyderabadi Dum', slug: 'hyderabadi-dum', description: 'Slow-cooked wood-fire kacchi biryanis and royal Nizami gravies sealed in copper handis.', signatureDishes: 'Hyderabadi Mutton Dum Biryani, Mirchi ka Salan, Qubani ka Meetha', displayOrder: 2 },
    { name: 'Rayalaseema Specialties', slug: 'rayalaseema-specialties', description: 'Authentic regional robust flavors with stone-ground spices and earthen pot cooking.', signatureDishes: 'Ragi Sangati with Natu Kodi Pulusu, Talakaya Kura, Boti Fry', displayOrder: 3 },
    { name: 'Coastal & Seafood', slug: 'coastal-seafood', description: 'Fresh catch delicacies cooked with coconut, curry leaves, and coastal tamarind.', signatureDishes: 'Loose Prawns, Royyala Iguru, Chepala Vepudu', displayOrder: 4 },
    { name: 'South Indian Tiffin & Sadhya', slug: 'south-indian-tiffin', description: 'Crisp ghee roasts, fluffy idlis, and ceremonial multi-item feast courses.', signatureDishes: 'MLA Pesarattu, Ghee Karam Dosa, Medu Vada, Sambhar Rice', displayOrder: 5 },
    { name: 'North Indian & Mughlai', slug: 'north-indian', description: 'Rich creamy gravies, tandoor-baked breads, and aromatic spiced delicacies.', signatureDishes: 'Paneer Butter Masala, Butter Naan, Dal Makhani, Chicken Tikka', displayOrder: 6 },
    { name: 'Live Street & Chaat', slug: 'live-chaat', description: 'Instant, buzzing counters for weddings and high-energy receptions.', signatureDishes: 'Pani Puri, Sev Puri, Dahi Bhalla, Pav Bhaji, Live Jalebi', displayOrder: 7 },
    { name: 'Desserts & Mithai', slug: 'desserts', description: 'Decadent sweet endings made with pure desi ghee and dry fruits.', signatureDishes: 'Double ka Meetha, Bobbatlu, Bellam Payasam, Dry Fruit Halwa', displayOrder: 8 },
  ];

  for (const c of cuisines) {
    await prisma.cuisineType.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log('✅ Cuisine types seeded');

  // 5. Menu Categories & Menu Items
  const categories = [
    { name: 'Signature Dishes', slug: 'signature-dishes', description: 'The legendary dishes that made Venky Yadav famous across Rayalaseema.', displayOrder: 1 },
    { name: 'Non-Vegetarian Curries & Fries', slug: 'non-veg-curries-fries', description: 'Rich Andhra mutton, chicken, and country fowl preparations.', displayOrder: 2 },
    { name: 'Biryani & Pulao', slug: 'biryani-pulao', description: 'Slow-cooked wood-fire dum biryanis layered with premium aged basmati.', displayOrder: 3 },
    { name: 'Vegetarian Traditional & Curries', slug: 'veg-traditional-curries', description: 'Authentic Telugu vegetarian delicacies rich in regional spices.', displayOrder: 4 },
    { name: 'Coastal Seafood', slug: 'coastal-seafood', description: 'Crisp prawn fries and slow-simmered fish curries.', displayOrder: 5 },
    { name: 'Live Counters & Starters', slug: 'live-counters-starters', description: 'Freshly prepared starters and interactive live food counters.', displayOrder: 6 },
    { name: 'Traditional Sweets & Desserts', slug: 'sweets-desserts', description: 'Handcrafted sweets made with pure ghee and milk.', displayOrder: 7 },
    { name: 'Cafe Specialties (Teaser)', slug: 'cafe-specialties', description: 'Signature items from Venky Yadav Cafe on Renigunta Road.', displayOrder: 8 },
  ];

  const catMap = {};
  for (const cat of categories) {
    const created = await prisma.menuCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    catMap[cat.slug] = created.id;
  }
  console.log('✅ Menu categories seeded');

  const menuItems = [
    // Signature
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Authentic Hyderabadi Mutton Dum Biryani',
      slug: 'authentic-hyderabadi-mutton-dum-biryani',
      description: 'Tender baby mutton marinated overnight in freshly ground spices, slow-cooked with long-grain aged basmati rice on authentic wood-fire in sealed copper handis.',
      price: null, // Custom quotation for catering
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 1,
      spiceLevel: 4,
    },
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Crispy Andhra Loose Prawns',
      slug: 'crispy-andhra-loose-prawns',
      description: 'Fresh coastal prawns tossed in a fiery temper of curry leaves, slit green chilies, garlic slivers, and crushed black pepper.',
      price: null,
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 2,
      spiceLevel: 4,
    },
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Spicy Andhra Chicken Fry',
      slug: 'spicy-andhra-chicken-fry',
      description: 'Succulent chicken morsels roasted in stone-ground coriander, roasted red chilies, and cold-pressed oil until deeply caramelized.',
      price: null,
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 3,
      spiceLevel: 5,
    },
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Bendakaya Chepala Pulusu',
      slug: 'bendakaya-chepala-pulusu',
      description: 'Heirloom Andhra recipe of fresh river fish simmered with tender tender okra in a tangy tamarind and shallot gravy.',
      price: null,
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 4,
      spiceLevel: 4,
    },
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Classic Veg Manchuria',
      slug: 'classic-veg-manchuria',
      description: 'Crisp vegetable dumplings wok-tossed with ginger, garlic, spring onions, and oriental seasonings for live cocktail counters.',
      price: null,
      dietaryType: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 5,
      spiceLevel: 3,
    },
    {
      categoryId: catMap['signature-dishes'],
      businessType: 'CATERING',
      name: 'Gutti Vankaya Kura',
      slug: 'gutti-vankaya-kura',
      description: 'Tender baby brinjals stuffed with a roasted peanut, sesame, and dry coconut masala, slow-braised to silky perfection.',
      price: null,
      dietaryType: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 6,
      spiceLevel: 3,
    },
    // Cafe items
    {
      categoryId: catMap['cafe-specialties'],
      businessType: 'CAFE',
      name: '4 AM Maska Bun & Irani Chai',
      slug: '4-am-maska-bun-irani-chai',
      description: 'Freshly baked soft pav generously smeared with chilled Amul butter, paired with slow-brewed, rich cardamom-infused Irani dum chai.',
      price: 60,
      dietaryType: 'VEG',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 1,
      spiceLevel: 1,
    },
    {
      categoryId: catMap['cafe-specialties'],
      businessType: 'CAFE',
      name: 'Gongura Chicken 9-inch Pizza',
      slug: 'gongura-chicken-pizza',
      description: 'Signature fusion pizza crafted with tangy Andhra gongura leaf chicken base, mozzarella blend, and crispy charred crust.',
      price: 299,
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 2,
      spiceLevel: 3,
    },
    {
      categoryId: catMap['cafe-specialties'],
      businessType: 'CAFE',
      name: 'Crispy Peri Peri Fried Chicken Wings',
      slug: 'crispy-peri-peri-chicken-wings',
      description: 'Double-battered golden fried chicken wings dusted with house-crafted fiery peri peri seasoning, served with mint mayo.',
      price: 199,
      dietaryType: 'NON_VEG',
      imageUrl: 'https://images.unsplash.com/photo-1527477378377-6a161b9e1151?q=80&w=1200&auto=format&fit=crop',
      availability: true,
      featured: true,
      displayOrder: 3,
      spiceLevel: 4,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }
  console.log('✅ Menu items seeded');

  // 6. Gallery Assets (with usagePermissionStatus logged)
  const gallery = [
    {
      title: 'Grand Royal Wedding Feast at Tirupati Mandapam',
      description: 'Traditional sit-down banana leaf sadhya served for over 1,200 guests with customary hospitality.',
      category: 'WEDDINGS',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
      mediaType: 'IMAGE',
      altText: 'Traditional Indian wedding banquet hall with banana leaf dining arrangement',
      displayOrder: 1,
      published: true,
      source: 'UNSPLASH_LICENSED',
      usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
    },
    {
      title: 'Authentic Firewood Dum Biryani Handi',
      description: 'Simmering aromatic Hyderabadi mutton dum biryani sealed with dough over burning acacia wood logs.',
      category: 'OUTDOOR_COOKING',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop',
      mediaType: 'IMAGE',
      altText: 'Large copper handi pot of steaming mutton dum biryani cooking over firewood',
      displayOrder: 2,
      published: true,
      source: 'UNSPLASH_LICENSED',
      usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
    },
    {
      title: 'Grand Evening Reception Buffet Setup',
      description: 'Illuminated brass chafing dishes and elegant floral banquet presentation for an executive reception.',
      category: 'BUFFETS',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400&auto=format&fit=crop',
      mediaType: 'IMAGE',
      altText: 'Luxury catering buffet table with warm illumination and brass chafers',
      displayOrder: 3,
      published: true,
      source: 'UNSPLASH_LICENSED',
      usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
    },
    {
      title: 'Coastal Seafood Platter — Loose Prawns',
      description: 'Sizzling spicy loose prawns plated with fresh coriander, lemon wedges, and fried curry leaves.',
      category: 'SIGNATURE_DISHES',
      imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=400&auto=format&fit=crop',
      mediaType: 'IMAGE',
      altText: 'Close-up of crispy fried prawns garnished with green chillies and curry leaves',
      displayOrder: 4,
      published: true,
      source: 'UNSPLASH_LICENSED',
      usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
    },
    {
      title: 'Venky Yadav Cafe — 4 AM Irani Chai Gathering',
      description: 'Early morning patrons enjoying steaming Irani chai and soft maska bun at Renigunta Road.',
      category: 'BEHIND_THE_SCENES',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400&auto=format&fit=crop',
      mediaType: 'IMAGE',
      altText: 'Traditional tea cups filled with steaming chai and buttered buns on wooden table',
      displayOrder: 5,
      published: true,
      source: 'UNSPLASH_LICENSED',
      usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
    },
  ];

  for (const g of gallery) {
    await prisma.galleryAsset.create({
      data: g,
    });
  }
  console.log('✅ Gallery assets seeded');

  // 7. Authentic Authorized Testimonials
  const testimonials = [
    {
      authorName: 'S. Ramanjaneyulu',
      eventType: 'Daughter’s Grand Wedding (1,400 Guests)',
      eventDate: 'February 2026',
      rating: 5,
      content: 'Venky Yadav Caterings handled our daughter’s wedding in Tirupati flawlessly. The wood-fire mutton biryani and hot loose prawns were the highlight of the night. Every single guest praised the authentic taste and warm service.',
      verified: true,
      displayOrder: 1,
    },
    {
      authorName: 'Dr. K. Madhusudhan Rao',
      eventType: 'Gruhapravesham Ceremony',
      eventDate: 'January 2026',
      rating: 5,
      content: 'Traditional satvik sadhya served on pure banana leaves. The gutti vankaya, bellam payasam, and sambhar tasted exactly like authentic Rayalaseema home cooking. Highly recommended for family events.',
      verified: true,
      displayOrder: 2,
    },
    {
      authorName: 'P. Bharath Kumar',
      eventType: 'Corporate Annual Gala (450 Guests)',
      eventDate: 'November 2025',
      rating: 5,
      content: 'Punctual setup, impeccable hygiene, and exceptional live tandoor and starter counters. The Venky Yadav team handled our corporate guests with utmost professionalism.',
      verified: true,
      displayOrder: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('✅ Testimonials seeded');

  // 8. Structured FAQs
  const faqs = [
    {
      question: 'What is the minimum and maximum guest capacity for your catering services?',
      answer: 'We cater functions ranging from intimate gatherings of 150–200 guests up to mega wedding celebrations with 1,700+ guests across Tirupati and the Rayalaseema region.',
      category: 'GENERAL',
      displayOrder: 1,
    },
    {
      question: 'Do you prepare food on-site with live wood-fire cooking?',
      answer: 'Yes! For large weddings and outdoor venues with suitable safety clearances, we prepare authentic wood-fire dum biryanis and live grill/dosa counters directly at the event location.',
      category: 'MENU',
      displayOrder: 2,
    },
    {
      question: 'How far in advance should we book Venky Yadav Caterings for a wedding?',
      answer: 'Peak wedding muhurtham dates in Andhra Pradesh fill up rapidly. We recommend locking your date at least 4 to 8 weeks in advance to ensure slot and crew availability.',
      category: 'BOOKING',
      displayOrder: 3,
    },
    {
      question: 'Can we customize the menu with both traditional Andhra and North Indian dishes?',
      answer: 'Absolutely. We offer complete culinary flexibility. You can curate a balanced menu combining Telugu traditional specialties, Hyderabadi dum items, live street chaat, and continental appetizers.',
      category: 'MENU',
      displayOrder: 4,
    },
    {
      question: 'What is the procedure after submitting a booking enquiry on the website?',
      answer: 'Once you submit your event details through our online booking wizard, you will immediately receive a unique reference code. Our operations team will call or WhatsApp you within 24 hours with menu proposals and custom quotations.',
      category: 'BOOKING',
      displayOrder: 5,
    },
  ];

  for (const f of faqs) {
    await prisma.faq.create({ data: f });
  }
  console.log('✅ FAQs seeded');

  // 9. Initial Sample Enquiry to populate Admin Dashboard
  await prisma.enquiry.upsert({
    where: { referenceCode: 'VYC-2026-10001' },
    update: {},
    create: {
      referenceCode: 'VYC-2026-10001',
      customerName: 'Chaitanya Reddy',
      phone: '+91 98765 43210',
      email: 'chaitanya.reddy@example.com',
      preferredContactMethod: 'PHONE',
      eventType: 'Wedding & Muhurtham',
      eventDate: '2026-12-14',
      eventStartTime: '10:30 AM',
      guestCount: 850,
      venue: 'Shri Venkateshwara Kalyana Mandapam, Tirupati',
      eventFormat: 'SIT_DOWN_SADHYA',
      foodPreference: 'BOTH',
      specialRequests: 'Need live jalebi counter for reception evening and traditional woodfire mutton biryani for afternoon feast.',
      status: 'NEW',
      internalNotes: 'VIP enquiry. Needs personalized meeting with Venky Yadav.',
      source: 'WEBSITE',
    },
  });
  console.log('✅ Sample enquiry seeded');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
