import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#e8f5e9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        color="green.800"
      >
        Welcome to ApplyMate
      </Typography>

      <Box sx={{ mt: 3 }}>
        {/* Wrap form and subtitle together */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Subtitle inside the card wrapper */}
          <Typography
            variant="body1"
            textAlign="center"
            color="green.900"
            sx={{ mb: 2 }}
          >
            {showLogin
              ? "Login to your account"
              : "Register to create your account"}
          </Typography>

          {/* The form itself */}
          {showLogin ? <Login /> : <Register />}

          {/* Toggle button */}
          <Button
            onClick={() => setShowLogin(!showLogin)}
            sx={{ 
              mt: 2,
              textTransform: "none",
              color: "green.900",
              fontWeight: "bold",
            }}
          >
            {showLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
