import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";  
import { auth } from "./firebase";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import Admin from "./pages/Admin";
import Navbar from './componants/navBar/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

import { setUser, clearUser } from "./pages/redux/userSlice";


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          role: "user", 
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  } 
/>
      </Routes>
    </BrowserRouter>
  );
}