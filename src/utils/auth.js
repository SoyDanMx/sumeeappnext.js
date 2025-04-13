// src/utils/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key';
console.log('JWT_SECRET:', SECRET_KEY); // Log para depurar

export function verifyToken(token) {
  try {
    console.log('Token recibido:', token); // Log para depurar
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return null;
  }
}

export function generateToken(user) {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
}