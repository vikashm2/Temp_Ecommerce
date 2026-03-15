import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { sellerOnly } from '../../../lib/middleware';

/**
 * Single Product API Endpoint
 * Handles detailed view, updates, and deletes
 */
async function handler(req, res) {
  // block if no db url
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ message: 'Database disconnected.' });
  }

  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        // find product by id string
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'PUT':
      try {
        // update existing product record
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'DELETE':
      try {
        // permanently remove product data
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// enforce seller logic for modifications
export default async function authHandler(req, res) {
  if (req.method === 'PUT' || req.method === 'DELETE') {
    return sellerOnly(handler)(req, res);
  }
  return handler(req, res);
}
