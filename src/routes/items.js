import express from 'express';
import { body } from 'express-validator';
import * as itemController from '../controllers/itemController.js';
import { auth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /items (with filtering)
router.get('/', itemController.getItems);

// GET /items/:id
router.get('/:id', itemController.getItemById);

// POST /items (auth required)
router.post(
  '/',
  auth,
  [
    body('title').isString().trim().notEmpty(),
    body('description').isString().trim().notEmpty(),
    body('status').isIn(['lost', 'found']),
    body('category').isString().trim().notEmpty(),
    body('location').isString().trim().notEmpty(),
    body('date').isISO8601(),
    body('contactInfo').isString().trim().notEmpty(),
    body('imageURL').optional().isURL()
  ],
  itemController.createItem
);

// PUT /items/:id (auth required)
router.put('/:id', auth, itemController.updateItem);

// DELETE /items/:id (admin only)
router.delete('/:id', auth, requireAdmin, itemController.deleteItem);

export default router;
