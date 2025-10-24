import { prisma } from "../models/prisma.js";

export class InteractionService {
  // CRUD
  async createInteraction(type, payload) {
    try {
      const data = {
        type,
        payload: payload.payload || payload, 
      };

      if (payload.userId) {
        data.user = { connect: { id: payload.userId } };
      }

      return await prisma.interaction.create({ data });
    } catch (error) {
      console.error('Error in createInteraction:', error);
      throw error;
    }
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

  // Webhook Interactions
  async createUserCreatedInteraction(userId, payload) {
    try {
      // First, ensure the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Now create the interaction with proper payload structure
      return await prisma.interaction.create({
        data: {
          type: 'user_created',
          userId,
          payload
        }
      });
    } catch (error) {
      console.error('Error in createUserCreatedInteraction:', error);
      throw error;
    }
  }

  async createListingCreatedInteraction(listingId, payload) {
    try {
      // First, ensure the listing exists
      const listing = await prisma.listing.findUnique({
        where: { id: listingId },
        select: { id: true }
      });

      if (!listing) {
        throw new Error(`Listing with ID ${listingId} not found`);
      }

      // Now create the interaction
      return await prisma.interaction.create({
        data: {
          type: 'listing_created',
          listingId,
          payload
        }
      });
    } catch (error) {
      console.error('Error in createListingCreatedInteraction:', error);
      throw error;
    }
  }

  async createUpgradeSuggestionInteraction(listingId, userId) {
    try {
      // Ensure both listing and user exist
      const [listing, user] = await Promise.all([
        prisma.listing.findUnique({
          where: { id: listingId },
          select: { id: true }
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { id: true }
        })
      ]);

      if (!listing) {
        throw new Error(`Listing with ID ${listingId} not found`);
      }
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Now create the interaction
      return await prisma.interaction.create({
        data: {
          type: 'upgrade_suggestion',
          listingId,
          userId
        }
      });
    } catch (error) {
      console.error('Error in createUpgradeSuggestionInteraction:', error);
      throw error;
    }
  }

  async createReengagementInteraction(userId) {
    try {
      // First, ensure the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Now create the interaction
      return await prisma.interaction.create({
        data: {
          type: "reengagement_sent",
          userId,
        },
      });
    } catch (error) {
      console.error('Error in createReengagementInteraction:', error);
      throw error;
    }
  }

  async createPriceSuggestionInteraction(listingId, suggestedPrice) {
    try {
      // First, ensure the listing exists
      const listing = await prisma.listing.findUnique({
        where: { id: listingId },
        select: { id: true }
      });

      if (!listing) {
        throw new Error(`Listing with ID ${listingId} not found`);
      }

      // Now create the interaction
      return await prisma.interaction.create({
        data: {
          type: "price_suggestion",
          listingId,
          payload: { suggestion: suggestedPrice },
        },
      });
    } catch (error) {
      console.error('Error in createPriceSuggestionInteraction:', error);
      throw error;
    }
  }
}

export default InteractionService;
