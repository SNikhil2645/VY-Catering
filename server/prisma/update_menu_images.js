const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const MENU_IMAGE_MAPPINGS = [
  {
    slug: 'authentic-hyderabadi-mutton-dum-biryani',
    name: 'Authentic Hyderabadi Mutton Dum Biryani',
    imageFile: 'mutton-biryani.png',
  },
  {
    slug: 'crispy-andhra-loose-prawns',
    name: 'Crispy Andhra Loose Prawns',
    imageFile: 'Crispy Andhra Loose Prawns.png',
  },
  {
    slug: 'spicy-andhra-chicken-fry',
    name: 'Spicy Andhra Chicken Fry',
    imageFile: 'andhra-style-chicken-fry.png',
  },
  {
    slug: 'bendakaya-chepala-pulusu',
    name: 'Bendakaya Chepala Pulusu',
    imageFile: 'Bendakaya Chepala Pulusu.png',
  },
  {
    slug: 'classic-veg-manchuria',
    name: 'Classic Veg Manchuria',
    imageFile: 'Classic Veg Manchuria.png',
  },
  {
    slug: 'gutti-vankaya-kura',
    name: 'Gutti Vankaya Kura',
    imageFile: 'Gutti Vankaya Kura.png',
  },
  {
    slug: '4-am-maska-bun-irani-chai',
    name: '4 AM Maska Bun & Irani Chai',
    imageFile: 'Maska Bun & Irani Chai.png',
  },
  {
    slug: 'gongura-chicken-pizza',
    name: 'Gongura Chicken 9-inch Pizza',
    imageFile: 'Gongura Chicken 9-inch Pizza.png',
  },
  {
    slug: 'crispy-peri-peri-chicken-wings',
    name: 'Crispy Peri Peri Fried Chicken Wings',
    imageFile: 'Crispy Peri Peri Fried Chicken Wings.png',
  },
];

async function updateMenuImages() {
  console.log('🍽️ Starting safe menu image update...');
  const publicDir = path.join(__dirname, '..', '..', 'client', 'public');

  for (const mapping of MENU_IMAGE_MAPPINGS) {
    const fullPath = path.join(publicDir, mapping.imageFile);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ File not found in public/: ${mapping.imageFile} — Skipping ${mapping.slug}`);
      continue;
    }

    const publicPath = `/${mapping.imageFile}`;

    // Find the item first
    const existing = await prisma.menuItem.findFirst({
      where: {
        OR: [
          { slug: mapping.slug },
          { name: mapping.name },
        ],
      },
    });

    if (!existing) {
      console.warn(`⚠️ Menu item not found in DB: ${mapping.name} (${mapping.slug})`);
      continue;
    }

    // Update only the imageUrl
    const updated = await prisma.menuItem.update({
      where: { id: existing.id },
      data: {
        imageUrl: publicPath,
      },
    });

    console.log(`✅ Updated: "${updated.name}"`);
    console.log(`   Old Image: ${existing.imageUrl}`);
    console.log(`   New Image: ${updated.imageUrl}\n`);
  }

  console.log('🎉 Menu image update completed successfully.');
}

updateMenuImages()
  .catch((err) => {
    console.error('❌ Error updating menu images:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
