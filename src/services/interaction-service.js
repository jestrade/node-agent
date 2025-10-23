import { prisma } from '../models/prisma.js';

export class InteractionService {
    async getInteractions(page = 0, total = 10) {
        return await prisma.interaction.findMany({
            skip: total * page || 0,
            take: Number(total) || 10,
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
}

export default InteractionService;