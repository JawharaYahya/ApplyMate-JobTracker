import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateJob } from "../pages/redux/jobSlice";
import { updateJobInFirestore } from "../pages/redux/jobServices";
import { FormControl, Select, MenuItem, Box, Paper, Typography } from "@mui/material";

function JobList() {
  const jobs = useSelector((state) => state.job.jobs);
  const dispatch = useDispatch();

  const handleUpdate = async (id, newStatus) => {
    const updatedData = { status: newStatus };
    try {
      await updateJobInFirestore(id, updatedData);
      dispatch(updateJob({ id, updatedData }));
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const statusOptions = ["applied", "interview", "rejected", "hired"];
  const statusColors = {
    applied: "#81c784",
    interview: "#ffb74d",
    rejected: "#e57373",
    hired: "#4caf50",
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4, 
        mt: 3,
        width: '100%',
        px: 3,
        fontFamily: "'Roboto', sans-serif" ,
      }}
    >
      {jobs.map((job) => (
        <Paper 
          key={job.id} 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: 300, // slightly bigger box
            minHeight: 180, // proportional height
            borderRadius: 3, 
            backgroundColor: '#dcedc8', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#2e7d32' }}>
            {`Company Name: ${job.company || 'N/A'}`}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2, color: '#2e7d32' }}>
            {`Position: ${job.position || 'N/A'}`}
            </Typography>
         
             <Typography variant="subtitle1" sx={{ mb: 2, color: '#2e7d32' }}>
            {`Note: ${job.notes || ''}`}
          </Typography>
          <FormControl fullWidth sx={{ mt: 'auto' }}>
            <Select
              value={job.status || 'applied'}
              onChange={(e) => handleUpdate(job.id, e.target.value)}
              displayEmpty
              sx={{
                fontWeight: 'bold',
                color: statusColors[job.status] || '#000',
                fontSize: 14,
              }}
              renderValue={(selected) => (
                <span style={{ color: statusColors[selected] || '#000', fontWeight: 'bold' }}>
                  {selected.charAt(0).toUpperCase() + selected.slice(1)}
                </span>
              )}
            >
              {statusOptions.map((status) => (
                <MenuItem 
                  key={status} 
                  value={status} 
                  sx={{ color: statusColors[status], fontWeight: 'bold' }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      ))}
    </Box>
  );
}

export default JobList;
