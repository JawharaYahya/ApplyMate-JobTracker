import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
console.log("API Key:", process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

 export const chat = model.startChat({
  history: [ 
  ],
});

export async function chatWithAI(message) {
const result=  await chat.sendMessage(message);
 return result.response.text();
}


