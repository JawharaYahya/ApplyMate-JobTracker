import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Paper,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [jobsByUser, setJobsByUser] = useState({});
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        const profileRef = doc(db, "users", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) {
          setError("Profile not found.");
          setLoading(false);
          return;
        }

        const profileData = profileSnap.data();
        setProfile(profileData);

        if (profileData.role !== "admin") {
          setError("You are not authorized to view this page.");
          setLoading(false);
          return;
        }

        const usersSnap = await getDocs(collection(db, "users"));
        setUsers(usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleExpand = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      return;
    }

    setExpandedUser(userId);

    if (!jobsByUser[userId]) {
      const q = query(
        collection(db, "jobApplications"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobsByUser((prev) => ({ ...prev, [userId]: jobs }));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress sx={{ color: "#25A18E" }} />
        <Typography mt={2} color="#004E64">
          Loading Admin Dashboard…
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
    <Container sx={{ mt: 5 }}>
      <Card
        sx={{
          p: 2,
          mb: 3,
          background: "linear-gradient(to right, #004E64, #00A5CF)",
          borderRadius: 3,
          color: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#25A18E",
              "&:hover": { backgroundColor: "#004E64" },
              mb: 2,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Typography variant="h5" sx={{ mb: 1, color: "#004E64" }}>
        Users & Their Job Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#7AE582" }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <>
                <TableRow key={u.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleExpand(u.id)}>
                      {expandedUser === u.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} sx={{ p: 0 }}>
                    <Collapse
                      in={expandedUser === u.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#25A18E", fontWeight: "bold" }}
                        >
                          Job Applications
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Company</TableCell>
                              <TableCell>Position</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Created At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(jobsByUser[u.id] || []).map((job) => (
                              <TableRow key={job.id}>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.position}</TableCell>
                                <TableCell>{job.status}</TableCell>
                                <TableCell>
                                  {job.createdAt?.toDate
                                    ? job.createdAt
                                        .toDate()
                                        .toLocaleDateString()
                                    : ""}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
