import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { signToken } from '../../../lib/auth';

// handle login request
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // fallback for testing without database
  if (!process.env.MONGODB_URI) {
    if (email && password) {
      return res.status(200).json({
        _id: 'mock_id_' + Date.now(),
        name: 'Test Setup User',
        email,
        role: email.includes('seller') ? 'seller' : 'buyer', // simple mock logic
        token: 'mock_token_for_local_testing',
      });
    }
    return res.status(401).json({ message: 'Email and password required for mock login' });
  }

  await dbConnect();

  try {
    // find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: signToken({ id: user._id }),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
