import mongoose from 'mongoose';

// Product schema definition
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide product title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  image: {
    type: String,
    required: [true, 'Please provide product image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 0,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A product must be associated with a seller'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
