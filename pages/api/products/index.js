import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { protect } from '../../../lib/middleware';

// handle products requests
async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
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

// only POST is protected in this simple example for admin
export default async function authHandler(req, res) {
  if (req.method === 'POST') {
    return protect(handler)(req, res);
  }
  return handler(req, res);
}
