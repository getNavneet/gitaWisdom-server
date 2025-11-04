import mongoose, { Schema } from "mongoose";

const querySchema = new Schema(
{
  query: { type: String, required: true },
  AIResponse: { type: String }
},
{
  timestamps: true
});

const Query = mongoose.model('Query', querySchema);

export default Query;
