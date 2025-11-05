import mongoose, { Schema } from "mongoose";

const newsletterSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.model('Feedback', newsletterSchema);
export default Newsletter;