const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing lessons if needed
  await prisma.lesson.deleteMany({});
  
  console.log('Seeding database with initial lessons data...');

  // Create initial lessons
  const lessons = [
    {
      title: 'Beginner Surf Lesson',
      description: 'Perfect for first-timers. Learn the basics of surfing including water safety, paddling techniques, and how to stand up on your board.',
      price: 79.99,
    },
    {
      title: 'Intermediate Surf Session',
      description: 'Refine your surfing skills with our intermediate lesson. Focus on turning techniques, wave selection, and building confidence in various conditions.',
      price: 99.99,
    },
    {
      title: 'Advanced Surf Coaching',
      description: 'Take your surfing to the next level with personalized advanced coaching. Work on complex maneuvers, competition strategies, and advanced wave reading.',
      price: 129.99,
    },
    {
      title: 'Kids Surf Camp (Ages 8-12)',
      description: 'A fun and safe introduction to surfing for kids. Small group sizes ensure personalized attention while children learn surfing fundamentals.',
      price: 59.99,
    },
    {
      title: 'Family Surf Package',
      description: 'A special package for families (up to 4 people) to learn surfing together. Create unforgettable memories while learning a new skill as a family.',
      price: 199.99,
    },
    {
      title: 'Private One-on-One Lesson',
      description: 'Get dedicated instruction with our private lesson option. Perfect for those wanting accelerated learning or specific skill development.',
      price: 149.99,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: lesson,
    });
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });