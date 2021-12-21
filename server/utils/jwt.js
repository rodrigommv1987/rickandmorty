import "dotenv/config.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRE } = process.env;

/**
 * creates a jwt using params, and the app configured secret and expire time
 * @param {Object} params
 * @returns jwt string
 */
const sign = async (params) => {
  return await jwt.sign(params, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

/**
 * verifies if passed jwt token is valid using configured secret
 * @param {string} token
 * @returns the token payload
 */
const verify = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

export { sign, verify };
