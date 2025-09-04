import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setError("Profile not found. Please contact support.");
        } else {
          setProfile(snap.data());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      setError("Failed to log out: " + err.message);
    }
  };

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress sx={{ color: "#25A18E" }} />
        <Typography mt={2} color="#004E64">
          Loading profile…
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card
        sx={{
          p: 2,
          background: "linear-gradient(to right, #7AE582, #9FFFCB)",
          border: "2px solid #00A5CF",
          borderRadius: 3,
          color: "#004E64",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#004E64" }}
          >
            My Profile
          </Typography>
          <Typography variant="body1" sx={{ color: "#004E64", mb: 1 }}>
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography variant="body1" sx={{ color: "#004E64", mb: 1 }}>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Role:{" "}
            <span
              style={{
                color: profile.role === "admin" ? "#25A18E" : "#004E64",
                fontWeight: "bold",
              }}
            >
              {profile.role === "admin" ? "Admin" : "User"}
            </span>
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#25A18E",
              "&:hover": { backgroundColor: "#004E64" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
