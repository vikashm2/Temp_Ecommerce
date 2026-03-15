import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { signToken } from '../../../lib/auth';

// handle signup request
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, role, shopName, businessDescription } = req.body;

  // fallback for testing without database
  if (!process.env.MONGODB_URI) {
    return res.status(201).json({
      _id: 'mock_id_' + Date.now(),
      name,
      email,
      role: role || 'buyer',
      shopName: shopName || '',
      businessDescription: businessDescription || '',
      token: 'mock_token_for_local_testing',
    });
  }

  await dbConnect();

  try {
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create new user with details
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'buyer',
      shopName,
      businessDescription,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: signToken({ id: user._id }),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
