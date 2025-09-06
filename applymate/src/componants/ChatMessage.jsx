import { Box, Paper, Typography } from "@mui/material";

// Display a single chat message
export default function ChatMessages({ role, parts }) {
  const isUser = role === "user";

  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={1}
    >
      <Paper
        elevation={2} // subtle shadow
        sx={{
          backgroundColor: isUser ? "#9FFFCB" : "#00A5CF",
          color: isUser ? "#004E64" : "#fff",
          px: 2,
          py: 1.5,
          borderRadius: isUser
            ? "16px 16px 4px 16px" // user bubble shape
            : "16px 16px 16px 4px", // AI bubble shape
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ mb: 0.5, opacity: 0.7 }}
        >
          {isUser ? "You" : "AI"}
        </Typography>
        <Typography variant="body1">
          {parts.map((p) => p.text).join(" ")}
        </Typography>
      </Paper>
    </Box>
  );
}
