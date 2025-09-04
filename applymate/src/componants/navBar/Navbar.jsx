import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../pages/redux/userSlice";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import JobTrackerLogo from "../../assests/jobTrackerLogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector(state => state.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.log("Error signing out", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={JobTrackerLogo} alt="ApplyMate Logo" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6" component="div">
            ApplyMate
          </Typography>
        </Box>
        
        {isLoggedIn ? (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            {role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={handleSignOut}>
              Sign out
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}