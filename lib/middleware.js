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

/**
 * Seller-only middleware helper
 * Checks if user has seller role
 */
export const sellerOnly = (handler) => async (req, res) => {
  return protect(async (req, res) => {
    // block if user is NOT a seller
    if (req.user && req.user.role === 'seller') {
      return handler(req, res);
    }
    // send forbidden response for non-sellers
    return res.status(403).json({ message: 'Forbidden: Only sellers can perform this action' });
  })(req, res);
};
