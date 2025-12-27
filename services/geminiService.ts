
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizePost = async (content: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy tóm tắt bài viết sau đây một cách ngắn gọn và súc tích trong khoảng 3-4 câu: ${content}`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Không thể tạo tóm tắt vào lúc này.";
  } catch (error) {
    console.error("AI Summarize Error:", error);
    return "Có lỗi xảy ra khi kết nối với AI.";
  }
};

export const generateBlogIdeas = async (topic: string): Promise<string[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gợi ý 5 tiêu đề bài viết blog hấp dẫn về chủ đề: ${topic}. Trả về dưới dạng danh sách.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    try {
      return JSON.parse(response.text || "[]");
    } catch {
      return (response.text || "").split('\n').filter(line => line.trim() !== "");
    }
  } catch (error) {
    console.error("AI Ideas Error:", error);
    return [];
  }
};
