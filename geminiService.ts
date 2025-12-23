
import { GoogleGenAI } from "@google/genai";
import { Property } from "./types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getSmartInsights = async (property: Property): Promise<string> => {
  if (!apiKey) return "AI Insights are currently unavailable. Please check API configuration.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief, professional real estate analysis for this property: 
      Title: ${property.title}
      Location: ${property.location}
      Price: $${property.price}
      Type: ${property.type}
      Bedrooms/Bathrooms: ${property.bedrooms}/${property.bathrooms}
      Description: ${property.description}
      
      Focus on investment potential, neighborhood vibe, and who this home is perfect for. Keep it under 150 words.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });

    return response.text || "No insights available for this property.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate insights at this time.";
  }
};
