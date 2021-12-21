import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  favorites: { type: [Schema.Types.Mixed] },
});

export default mongoose.model("User", userSchema);
