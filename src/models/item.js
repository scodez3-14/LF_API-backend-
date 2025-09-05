import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['lost', 'found'], required: true },
  category: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  contactInfo: { type: String, required: true, trim: true },
  imageURL: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Item', itemSchema);
