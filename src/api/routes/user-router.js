import express from 'express';
import { getUsers, createUser } from '../controllers/user-controller.js';

const router = express.Router();

router.route('/users')
  .get(getUsers)
  .post(createUser);

export default router;