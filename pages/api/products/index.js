import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { protect, sellerOnly } from '../../../lib/middleware';

/**
 * Products API Endpoint
 * Handles fetching all and creating new
 */
async function handler(req, res) {
  // ensure database is connected
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ message: 'Database disconnected. Please check MONGODB_URI.' });
  }
  
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { seller } = req.query;
        const filter = seller ? { seller } : {};
        // retrieve available products, optionally filtered
        const products = await Product.find(filter);
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        // create new product listing associated with seller
        const productData = { ...req.body, seller: req.user._id };
        const product = await Product.create(productData);
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// wrap POST in seller protection
export default async function authHandler(req, res) {
  if (req.method === 'POST') {
    return sellerOnly(handler)(req, res);
  }
  return handler(req, res);
}
