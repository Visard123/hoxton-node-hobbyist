import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    name: "Visi",
    email: "visi@mail",
    image: "img.png",
    hobbies: {
      create: [
        {
          title: "Dynamite Fishing",
          image: "img.png",
          active: true,
        },
        {
          title: "Electric Fishing",
          image: "img.png",
          active: false,
        },

        {
          title: "Gardening",
          image: "img.png",
          active: true,
        },
      ],
    },
  },
  {
    name: "Vivi",
    email: "vivi@mail",
    image: "img.png",
  },
  {
    name: "Visar",
    email: "visar@mail",
    image: "img.png",
    hobbies: {
      create: [
        {
          title: "Dynamite Fishing",
          image: "img.png",
          active: true,
        },
      ],
    },
  },
];

// const hobbies = [
//   {
//     title: "Dynamite Fishing",
//     image: "img.png",
//     active: true,
//     userId: 1,
//   },
//   {
//     title: "Electric Fishing",
//     image: "img.png",
//     active: false,
//     userId: 2,
//   },
//   {
//     title: "Gardening",
//     image: "img.png",
//     active: true,
//     userId: 3,
//   },
// ];

async function createStuff() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  //   for (const hobby of hobbies) {
  //     await prisma.hobby.create({ data: hobby });
  //   }
}
createStuff();
