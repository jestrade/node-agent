import { de } from '@faker-js/faker';
import { prisma } from '../models/prisma.js';

export class UserService {
    async getUsers(page = 0, total = 10) {
        return await prisma.user.findMany({
            skip: total * page || 0,
            take: Number(total) || 10,
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
}

export default UserService;