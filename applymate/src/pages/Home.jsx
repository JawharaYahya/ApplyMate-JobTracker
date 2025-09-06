import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#9FFFCB", // mint background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(to bottom right, #7AE582, #00A5CF)",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#004E64" }}
        >
          Job Tracker
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 4, color: "#004E64" }}
        >
          Keep track of your job applications and update their status anytime.
          Use your dashboard to manage statuses and stay on top of your career journey.
        </Typography>

        {!user && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                bgcolor: "#25A18E",
                "&:hover": { bgcolor: "#004E64" },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              sx={{
                color: "#25A18E",
                borderColor: "#25A18E",
                "&:hover": { bgcolor: "#7AE582" },
              }}
            >
              Register
            </Button>
          
          </Box>
        )}
      </Container>
    </Box>
  );
}
