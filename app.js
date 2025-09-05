import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import itemsRouter from './src/routes/items.js';
import errorHandler from './src/middleware/errorHandler.js';
import rateLimit from 'express-rate-limit';
import authRouter from './src/routes/auth.js';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

app.use(express.json());

// Auth routes
app.use('/auth', authRouter);
app.use('/items', itemsRouter);

// Error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
