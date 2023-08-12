import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  // should be "gold", "silver" or "free"
  subscriptionStatus: { type: String, default: "free" }
});

export default mongoose.model("User", userSchema);
