import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth,db } from "../../firebase"; 
import { setUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
        role: "user",       
        createdAt: new Date()
      });

      
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        role: "user",
      }));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#e8f5e9",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#a5d6a7",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center" color="green.900">
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          margin="dense"
          required
          fullWidth
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "green.700",
            "&:hover": { bgcolor: "green.900" },
          }}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", color: "green.900" }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1b5e20", fontWeight: "bold", textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
