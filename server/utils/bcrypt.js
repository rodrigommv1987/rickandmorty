import "dotenv/config.js";
import bcrypt from "bcryptjs";

const { BCRYPT_SALT_ROUNDS } = process.env;

/**
 * hashes password with bcrypt hash function
 * @param {string} password
 * @returns hashed password
 */
const hash = async (password) => {
  return await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS));
};

/**
 * compares both values using bcrypt compare function
 * @param {string} value
 * @param {string} anotherValue
 * @returns if strings matches
 */
const compare = async (value, anotherValue) => {
  return await bcrypt.compare(value, anotherValue);
};

export { compare, hash };
