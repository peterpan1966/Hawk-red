import jwt from 'jsonwebtoken';
import 'dotenv/config.js'

const secretKey = process.env.SECRET_KEY;

export const generateToken = async(user)=> {
  try {
    console.log('validatoken',user);
    const token = jwt.sign( { user }, secretKey, {
      expiresIn: '6h',
    });
    return token;
  } catch (err) {
    return null;
  }
}

export const validateToken= async (token)=> {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}