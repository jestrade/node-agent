import { ListingService } from "../../services/listing-service.js";
import axios from "axios";
import { config } from "../../config/index.js";

const listingService = new ListingService();

export const createListing = async (req, res) => {
  const { ownerId, title, price, description = "", photos = [] } = req.body;

  if (!ownerId || !title || price === undefined) {
    return res.status(400).json({
      ok: false,
      error: "ownerId, title, and price are required",
    });
  }

  try {
    // First create the listing
    const listing = await listingService.createListing({
      ownerId,
      title,
      price: Number(price),
      description,
      photos: { set: photos }, // Store photos as an array
    });

    // Then trigger the webhook with the created listing data
    const webhookUrl = `${config.httpServer.baseUrl}/webhook`;
    await axios.post(webhookUrl, {
      type: "listing.created",
      payload: {
        id: listing.id,
        ownerId: listing.ownerId,
        title: listing.title,
        price: listing.price,
        description: listing.description,
        photos: listing.photos,
      },
    });

    res.status(201).json({
      ok: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({
      ok: false,
      error: "Failed to create listing",
      details: error.message,
    });
  }
};
