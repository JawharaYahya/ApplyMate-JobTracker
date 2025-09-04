import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "./redux/jobSlice";
import { addJobToFirestore, fetchJobsForCurrentUser } from "./redux/jobServices";
import JobForm from "../componants/JobForm";
import JobList from "../componants/JobList";
import { Box, Button, Typography } from "@mui/material";
import {auth } from "../firebase";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchJobsForCurrentUser(dispatch); 
  }, [dispatch]);

  const handleAddJob = async (jobData) => {
    try {
      const newJobId = await addJobToFirestore(jobData); 
      dispatch(addJob({ ...jobData, id: newJobId, userId: auth.currentUser.uid })); 
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
  sx={{
    minHeight: '100vh',
    backgroundColor: '#9FFFCB', // lightest mint as background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: 5,
    fontFamily: "'Roboto', sans-serif",
  }}
>
  {/* Dashboard Title */}
  <Typography
    variant="h4"
    sx={{
      mb: 1,
      color: '#004E64', 
      fontWeight: 'bold',
    }}
  >
    My Job Tracker Dashboard
  </Typography>

  {/* Subtitle */}
  <Typography
    variant="subtitle1"
    sx={{
      mb: 4,
      color: '#25A18E', 
    }}
  >
    Track all your job applications in one place
  </Typography>

 
  <Button
    variant="contained"
    sx={{
      mb: 4,
      backgroundColor: '#00A5CF', // cyan
      "&:hover": { backgroundColor: '#004E64' }, 
      color: '#fff',
    }}
    onClick={() => setShowForm(true)}
  >
    Add New Job
  </Button>

  {showForm && (
    <Box
      sx={{
        width: '90%',
        maxWidth: 600,
        p: 3,
        mb: 4,
        backgroundColor: '#7AE582', 
        borderRadius: 2,
      }}
    >
      <JobForm onSubmit={handleAddJob} onCancel={() => setShowForm(false)} />
    </Box>
  )}


  <Box sx={{ width: '90%', maxWidth: 900 }}>
    <JobList palette={{ header: '#25A18E', row: '#00A5CF', alternateRow: '#7AE582', text: '#004E64' }} />
  </Box>
</Box>

  );
}
