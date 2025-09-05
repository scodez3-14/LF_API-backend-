import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register
router.post(
  '/register',
  [
    body('username').isString().trim().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    body('isAdmin').optional().isBoolean()
  ],
  authController.register
);

// POST /auth/login
router.post(
  '/login',
  [
    body('username').isString().trim().notEmpty(),
    body('password').isString().notEmpty()
  ],
  authController.login
);

export default router;
