/**
 * uri is obfuscated so I can add this file to github as a public repo
 * and there's no security alert of a connection string in the repo.
 * By no means this is an best practice at all, .env file should not be
 * commited in the repo, but I figured it was a quick and  dirty solution
 */
import "dotenv/config.js";
import mongoose from "mongoose";
let uri;

if (process.env.NODE_ENV === "test") {
  uri = Buffer.from(process.env.MONGO_URI_TEST, "base64").toString();
} else if (process.env.NODE_ENV === "development") {
  uri = Buffer.from(process.env.MONGO_URI_DEV, "base64").toString();
} else if (process.env.NODE_ENV === "production") {
  uri = Buffer.from(process.env.MONGO_URI, "base64").toString();
} else {
  uri = Buffer.from(process.env.MONGO_URI, "base64").toString();
}

export default mongoose.connect(uri);
