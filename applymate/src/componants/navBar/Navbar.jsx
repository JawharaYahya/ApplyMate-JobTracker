import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import jobTrackerLogo from "../../assests/jobTrackerLogo.png";
import { Link ,useNavigate} from "react-router-dom";

export default function Navbar( {isLoggedIn, setIsLoggedIn}){
const Navigate=useNavigate();
const handleSignOut=async()=>{

try {
  await signOut(auth);
    Navigate('/');
} catch (error) {
  console.log("error signing out", error);
}
}
return(
<div className="navbarContainer">
 <div className="titleNavbar">
<img src={jobTrackerLogo} alt="ApplyMate Logo" width='50 px' />
 <h1>ApplyMate</h1>
  </div>
  {isLoggedIn?
 (<> 
 <Link to="/profile">Profile</Link>
<Link to="/dashboard">Dashboard</Link>
   <button
  onClick={handleSignOut}>
  Sign out
</button>
 </>
    ):<Link to="/">Home</Link>}
              
        </div>
    );
}
