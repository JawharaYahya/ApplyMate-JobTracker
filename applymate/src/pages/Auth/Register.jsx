import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate= useNavigate();
  const firebaseErrorMessages = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Please enter a valid email address",
    "auth/weak-password": "Password must be at least 6 characters",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/too-many-requests": "Too many attempts. Try again later",
    "auth/user-disabled": "This account has been disabled",
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredtianls = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredtianls.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
      });
      Swal.fire({
        title: "Registration Successful",
        icon: "success",
        draggable: true,

      });
      navigate('/dashboard');
    } catch (error) {
      const erroMsg = firebaseErrorMessages[error.code];
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: erroMsg,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
       console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}