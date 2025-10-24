import { sendEmail } from "../../services/email-service.js";
import { generateMessage } from "../../lib/llm.js";
import { UserService } from "../../services/user-service.js";
import { ListingService } from "../../services/listing-service.js";
import { InteractionService } from "../../services/interaction-service.js";

const MIN_PHOTOS_FOR_QUALITY = 3;
const VISITS_THRESHOLD = 50;

const userService = new UserService();
const listingService = new ListingService();
const interactionService = new InteractionService();

export const webhookController = async (req, res) => {
  const { type, payload } = req.body;
  try {
    if (type === "user.created") {
      // Get user by email
      const user = await userService.getUserByEmail(payload.email);
      
      if (!user) {
        throw new Error(`User with email ${payload.email} not found`);
      }

      const msg = await generateMessage({
        purpose: "Help publish the first listing",
        context: { user },
      });
      
      await sendEmail(user.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      await interactionService.createUserCreatedInteraction(user.id, payload);
    }

    if (type === "listing.created") {
      const { id, ownerId, title, price, description = "" } = payload;
      const listing = await listingService.createListing({
        id,
        ownerId,
        title,
        price,
        description,
      });

      await interactionService.createListingCreatedInteraction(
        listing.id,
        payload
      );

      if (
        !description ||
        (payload.photos?.length || 0) < MIN_PHOTOS_FOR_QUALITY
      ) {
        const owner = await userService.getUserById(ownerId);
        const msg = await generateMessage({
          purpose: "Suggest improving description and photos",
          context: { user: owner, listing },
        });
        await sendEmail(owner.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      }
    }

    if (type === "listing.view") {
      const listing = await listingService.incrementVisits(payload.listingId);

      if (
        listing.visits >= VISITS_THRESHOLD &&
        listing.visits % VISITS_THRESHOLD === 0
      ) {
        const owner = await userService.getUserById(listing.ownerId);
        const msg = await generateMessage({
          purpose: "Suggest upgrade to Pro due to strong traction",
          context: { user: owner, listing },
        });
        await sendEmail(owner.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
        await interactionService.createUpgradeSuggestionInteraction(
          listing.id,
          owner.id
        );
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
};
