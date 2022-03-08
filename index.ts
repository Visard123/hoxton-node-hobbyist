import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { hobbies: true },
  });

  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findFirst({
    where: { id: id },
    include: { hobbies: true },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobby.findMany({ include: { users: true } });
  res.send(hobbies);
});

app.get("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobby.findFirst({
    where: { id: id },
    include: { users: true },
  });
  if (hobby) {
    res.send(hobby);
  } else {
    res.status(404).send({ error: "Hobby not found" });
  }
});

app.post("/users", async (req, res) => {
  const { name, image, email } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      image,
      email,
    },
  });
  res.send(newUser);
});

app.post("/hobbies", async (req, res) => {
  const { title, image, active } = req.body;

  const newHobby = await prisma.user.create({
    data: {
      title,
      image,
      active,
    },
  });
  res.send(newHobby);
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.delete({ where: { id: id } });
  res.send(user);
});
app.delete("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.hobby.delete({ where: { id: id } });
  res.send(user);
});

app.listen(4006, () => {
  console.log(`server up : http://localhost:4006`);
});
