const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deactivatePlaceholderGallery() {
  console.log('🖼️ Deactivating existing placeholder gallery assets...');

  // 1. Fetch all current assets
  const existingAssets = await prisma.galleryAsset.findMany();
  console.log(`Found ${existingAssets.length} total gallery assets in database.`);

  // 2. Backup to json for safe recovery
  const backupPath = path.join(__dirname, 'gallery_backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(existingAssets, null, 2), 'utf-8');
  console.log(`💾 Safe backup saved to: ${backupPath}`);

  // 3. Mark all placeholder assets as published: false
  const updated = await prisma.galleryAsset.updateMany({
    where: {
      published: true,
    },
    data: {
      published: false,
    },
  });

  console.log(`✅ Set published = false for ${updated.count} gallery assets.`);

  // 4. Verify public gallery query
  const publicAssets = await prisma.galleryAsset.findMany({
    where: { published: true },
  });
  console.log(`🔍 Active public gallery asset count: ${publicAssets.length} (Expected: 0)`);
}

deactivatePlaceholderGallery()
  .catch((err) => {
    console.error('❌ Error deactivating gallery assets:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
