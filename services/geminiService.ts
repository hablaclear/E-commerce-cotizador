import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectScope = async (data: FormData): Promise<string> => {
  try {
    const prompt = `
    Act as a Senior E-commerce Solutions Architect. Analyze the following client questionnaire data for a new e-commerce project and generate a professional "Project Scope & Estimation Brief".

    Client Data:
    ${JSON.stringify(data, null, 2)}

    Please format the response using Markdown. The response should include:
    1. **Executive Summary**: A brief overview of what the client needs.
    2. **Technical Complexity Assessment**: Rate as Low, Medium, or High complexity with a justification.
    3. **Key Features & Modules**: Bullet points of required functionality based on their answers.
    4. **Potential Challenges**: Identify any risks (e.g., if they have no content, or complex shipping needs).
    5. **Next Steps Recommendation**: What should the developer ask for next?

    Keep the tone professional, encouraging, and clear.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating scope. Please try again later or check your API key.";
  }
};
