import express from 'express';
import { createListing } from '../controllers/listing-controller.js';

const router = express.Router();

router.route('/listings')
  .post(createListing);

export default router;
