import Item from '../models/item.js';
import { validationResult } from 'express-validator';

// GET /items with filtering
export const getItems = async (req, res, next) => {
  try {
    const { status, category, location, date } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (date) filter.date = new Date(date);
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// GET /items/:id
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /items
export const createItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const item = new Item({ ...req.body, poster: req.user._id });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// PUT /items/:id
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (!item.poster.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:id
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
