
import { prisma } from '../src/models/prisma.js';
import { faker } from '@faker-js/faker';

async function main() {
    const u = await prisma.user.create({
        data: { 
            email: faker.internet.email(),
            name: faker.person.fullName() 
    }
    });

    console.log('Created user:', u);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });