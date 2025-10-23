import { prisma } from "../models/prisma.js";

export class InteractionService {
  // CRUD
  async createInteraction(type, payload) {
    return await prisma.interaction.create({
      data: {
        type,
        payload,
        user: { connect: { email: payload.to } },
      },
    });
  }

  async getInteractions(page = 0, total = 10) {
    const interactions = await prisma.interaction.findMany({
      skip: total * page || 0,
      take: Number(total) || 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.interaction.count();

    return { interactions, count };
  }

  // MORE

  async createReengagementInteraction(userId) {
    return await prisma.interaction.create({
      data: {
        type: "reengagement_sent",
        userId,
      },
    });
  }

  async createPriceSuggestionInteraction(listingId, suggestedPrice) {
    return await prisma.interaction.create({
      data: {
        type: "price_suggestion",
        listingId,
        payload: { suggestion: suggestedPrice },
      },
    });
  }
}

export default InteractionService;
