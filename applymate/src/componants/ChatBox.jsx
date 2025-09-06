import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import useChat from "../hooks/UseChat";
import ChatMessages from "./ChatMessage";

export default function ChatBox() {
  const { messages, sendMessages, isLoading, error } = useChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend() {
    if (!input.trim()) return;
    await sendMessages(input);
    setInput("");
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      {/* Messages area */}
      <Box
        flexGrow={1}
        overflow="auto"
        p={2}
        sx={{ backgroundColor: "#E8F8F5", borderRadius: 2 }}
      >
        {messages.map((msg, i) => (
          <ChatMessages key={i} role={msg.role} parts={msg.parts} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <Box display="flex" justifyContent="flex-start" mb={1}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              AI is typing...
            </Typography>
          </Box>
        )}

        {/* Error message */}
        {error && (
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        )}

        <div ref={chatEndRef} />
      </Box>

      {/* Input area */}
      <Box display="flex" mt={1} p={1}>
        <TextField
          placeholder="Ask anything..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          size="small"
        />
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{ ml: 1, backgroundColor: "#00A5CF", "&:hover": { backgroundColor: "#004E64" } }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
