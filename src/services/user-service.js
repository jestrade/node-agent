import { prisma } from "../models/prisma.js";

export class UserService {
  // CRUD
  async createUser(email, name) {
    return await prisma.user.create({
      data: { email, name }
    });
  }

  // Upsert a user by email
  async upsertUser(email, name) {
    return await prisma.user.upsert({
      where: { email },
      update: { lastActiveAt: new Date() },
      create: { email, name }
    });
  }

  async getUsers(page = 0, total = 10) {
    const users = await prisma.user.findMany({
      skip: total * page || 0,
      take: Number(total) || 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.user.count();

    return { users, count };
  }

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // MORE

  async findInactiveUsers(daysInactive = 7) {
    const date = new Date(Date.now() - daysInactive * 24 * 60 * 60 * 1000);
    return await prisma.user.findMany({
      where: {
        lastActiveAt: {
          lt: date,
        },
      },
    });
  }
}

export default UserService;
