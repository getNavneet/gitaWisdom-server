import Query from "../models/query.model.js";
import { getGeminiResponse } from "../services/GeminiResponse.js";

export const getResponse = async (req, res) => {
  console.log("Request Body:", req.body);
  const { query } = req.body;
  // console.log(req);
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }
  try {
    const aiResponse = await getGeminiResponse(query);
    const newQuery = new Query({ query, AIResponse: aiResponse });
    await newQuery.save();
    res.status(200).json({ query, AIResponse: aiResponse });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};
