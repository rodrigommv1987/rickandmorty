import "dotenv/config.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRE } = process.env;

const sign = async (params) => {
  return await jwt.sign(params, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

const verify = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

export { sign, verify };
