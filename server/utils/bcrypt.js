import "dotenv/config.js";
import bcrypt from "bcryptjs";

const { BCRYPT_SALT_ROUNDS } = process.env;

const hash = async (password) => {
  return await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS));
}

const compare = async (value, anotherValue) => {
  return await bcrypt.compare(value, anotherValue);
}

export {
  compare,
  hash,
}