import mongoose, { Schema } from "mongoose";

const utmSchema = new Schema({
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  utm_term: String,
  utm_content: String,
  visitedAt: { type: Date, default: Date.now },
});

const visitorSchema = new Schema({
  visitorId: { type: String, required: true, unique: true },
  ip: String,
  os: String,
  browser: String,
  utm_source: String,
  utmHistory: [utmSchema],
  page: String,
  visitCount: { type: Number, default: 1 },
  screenWidth: String,
  screenHeight: String,
  innerWidth: String,
  innerHeight: String,
  firstVisitedAt: { type: Date, default: Date.now },
  lastVisitedAt: { type: Date, default: Date.now },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
