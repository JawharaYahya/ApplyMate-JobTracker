import logo from './logo.svg';
import './App.css';
import Register from './pages/Auth/Register';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from './componants/navBar/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { useEffect, useState } from 'react';
import Login from './pages/Auth/Login';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
    });

    return () => unsubscribe(); 
  }, []);
   
  return (
    <BrowserRouter>
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
