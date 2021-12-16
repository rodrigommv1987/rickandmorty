import "dotenv/config.js";
import mongoose from "mongoose";

let uri;

if (process.env.NODE_ENV === "test") {
  uri = process.env.MONGO_URI_TEST;
} else if (process.env.NODE_ENV === "development") {
  uri = process.env.MONGO_URI_DEV;
} else if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGO_URI;
} else {
  uri = process.env.MONGO_URI;
}

export default mongoose.connect(uri);
