import { GoogleGenAI } from "@google/genai";
import { generatePrompt } from "./prompts/prompt.js";

const API_KEY = process.env.GEMINI_API || '';
// console.log("Using Gemini API Key:", API_KEY);
const ai = new GoogleGenAI({
  apiKey: API_KEY
});
 

export async function getGeminiResponse(userProblem) {
  if (!API_KEY) {
    throw new Error('Please set your Gemini API key in the .env file');
  }

  try {
    const prompt = generatePrompt(userProblem);
    // console.log("Generated Prompt for Gemini:", prompt);
    const result = await ai.models.generateContent({    
    model: "gemini-2.5-flash",
    contents: prompt,
  });
    // const response = await result.response;
    // console.log(result.text);
    return result.text;
  } catch (error) {
    if (!API_KEY) {
      throw new Error('Missing API key for Gemini API');
    }
    console.error('Error generating response:', error);
    throw new Error(`Failed to get response from Gemini. Please try again later. err= ${error.message}`);
  }
}


// const ans=getGeminiResponse("sample query");
// console.log("Gemini Response:", ans); 
//Gemini Response: Promise { <pending> }
//async function returns a promise