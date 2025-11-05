import Feedback from "../models/contact.model.js";
import Newsletter from "../models/newsletter.model.js";

export const submitFeedback = async (req, res) => {
  console.log("Feedback Request Body:", req.body);
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: "Name, email, and feedback are required" });
  }

  try {
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const submitNewsletter = async (req, res) => {
  console.log("Newsletter Request Body:", req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

   try {
    const newNewsletter = new Newsletter({ email });
    await newNewsletter.save();
    res.status(200).json({ message: "Successfully Subscribed ! " });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }    
};

