import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Mangata & Gallo luxury commerce database...');

  // 1. Create VIP & Customer Users
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const vipUser = await prisma.user.upsert({
    where: { email: 'vip.client@mangatagallo.com' },
    update: {},
    create: {
      name: 'Lady Mariana Gallo',
      email: 'vip.client@mangatagallo.com',
      passwordHash,
      role: 'VIP',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@mangatagallo.com' },
    update: {},
    create: {
      name: 'Atelier Admin',
      email: 'admin@mangatagallo.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // 2. Seed Products
  const products = [
    {
      id: 'ring-01',
      name: 'The Eternal Solitaire Ring',
      description: 'A timeless 2.0 carat round brilliant diamond set in pure 950 Platinum.',
      price: 2450.0,
      category: 'rings',
      image: '/assets/ring-1.jpg',
      stock: 12,
    },
    {
      id: 'crown-01',
      name: 'The Empress Emerald Tiara',
      description: 'Hand-set Colombian emeralds surrounded by VVS1 diamonds.',
      price: 12800.0,
      category: 'crowns',
      image: '/assets/crown-1.jpg',
      stock: 3,
    },
    {
      id: 'necklace-01',
      name: 'The Royal Sapphire Choker',
      description: 'Deep royal blue sapphires linked by delicate 18K white gold strands.',
      price: 6400.0,
      category: 'necklace',
      image: '/assets/necklace-1.jpg',
      stock: 5,
    },
    {
      id: 'earrings-01',
      name: 'Celestial Diamond Drops',
      description: 'Cascading pear-cut diamonds emitting unmatched brilliance.',
      price: 3800.0,
      category: 'earrings',
      image: '/assets/earrings-1.jpg',
      stock: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  // 3. Seed Initial User Cart
  const cart = await prisma.cart.upsert({
    where: { userId: vipUser.id },
    update: {},
    create: { userId: vipUser.id },
  });

  await prisma.cartItem.createMany({
    data: [
      { cartId: cart.id, productId: 'ring-01', quantity: 1 },
      { cartId: cart.id, productId: 'earrings-01', quantity: 1 },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
