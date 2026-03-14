import { verifyToken } from './auth';
import User from '../models/User';
import dbConnect from './dbConnect';

// auth middleware helper
export const protect = (handler) => async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }

      await dbConnect();

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
