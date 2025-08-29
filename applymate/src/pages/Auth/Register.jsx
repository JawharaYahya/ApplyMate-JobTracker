import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

export default function Register({ handleRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        width: '100%',
        maxWidth: 400, // same wider width
        bgcolor: '#a5d6a7',
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 380,
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center" color="green.900">
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="dense"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: 'green.700',
          '&:hover': { bgcolor: 'green.900' },
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
