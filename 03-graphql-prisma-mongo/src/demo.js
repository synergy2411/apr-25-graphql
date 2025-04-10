import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  // Delete
  await prisma.book.delete({
    where: {
      isbn: "878f8sfs7d",
    },
  });

  // Create
  //   await prisma.book.create({
  //     data: {
  //       title: "Prisma - The best ORM",
  //       authorName: "Jack",
  //       isbn: "878f8sfs7d",
  //       numOfPages: 999,
  //       published: true,
  //     },
  //   });

  // Read
  const allBooks = await prisma.book.findMany();
  console.log(allBooks);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.log(err);
    prisma.$disconnect();
    process.exit(1);
  });
