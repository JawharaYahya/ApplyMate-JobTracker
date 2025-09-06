import { Box, Typography, Paper, Fab, IconButton } from "@mui/material";
import ChatBox from "./ChatBox";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleIcon />
        </Fab>
      )}

     
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 350,
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          
          <Box
            sx={{
              backgroundColor: "#004E64",
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" color="white">
              AI Assistant 🤖
            </Typography>
            <IconButton size="small" onClick={() => setIsOpen(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

        
          <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
            <ChatBox />
          </Box>
        </Paper>
      )}
    </>
  );
}
