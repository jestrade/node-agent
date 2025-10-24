import { prisma } from "../models/prisma.js";

export class ListingService {
  // Create a new listing
  async createListing({ id, ownerId, title, price, description = "" }) {
    return await prisma.listing.create({
      data: { id, ownerId, title, price, description }
    });
  }

  // Find a listing by ID
  async findById(id) {
    return await prisma.listing.findUnique({ where: { id } });
  }

  // Increment visit count for a listing
  async incrementVisits(listingId) {
    return await prisma.listing.update({
      where: { id: listingId },
      data: { visits: { increment: 1 } },
      select: { id: true, visits: true, ownerId: true }
    });
  }
}

export default ListingService;
