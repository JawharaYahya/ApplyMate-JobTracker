
import { useState } from "react";
import { chatWithAI } from "../Ai/Api";

export default function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      parts: [{ text: "Hello 👋 I'm your AI assistant!" }],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessages(text) {
    const newMessage = {
      role: "user",
      parts: [{ text }],
    };

    // Show user msg immediately
    setMessages((prev) => [...prev, newMessage]);

    setIsLoading(true);
    setError(null);

    try {
      // Call AI API
      const replyText = await chatWithAI(text);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          parts: [{ text: replyText }],
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("⚠️ Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, sendMessages, isLoading, error };
}
