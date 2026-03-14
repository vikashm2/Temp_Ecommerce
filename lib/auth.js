import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// sign jwt token
export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// verify jwt token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
