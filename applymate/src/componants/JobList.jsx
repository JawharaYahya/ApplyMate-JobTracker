import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateJob } from "../redux/jobSlice";
import { updateJobInFirestore } from "../redux/jobServices";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

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

  const statusOptions = ["Applied", "Interview", "Rejected", "Hired"];

  // ألوان لكل حالة
  const statusColors = {
    Applied: "#2196f3", 
    Interview: "#ff9800",
    Rejected: "#f44336", 
    Hired: "#4caf50"      
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <h2>Job List</h2>
      {jobs.map((job) => (
        <Box 
          key={job.id} 
          sx={{ 
            marginBottom: "20px", 
            border: "1px solid #ddd", 
            padding: "10px", 
            borderRadius: "8px",
            backgroundColor: "#f9f9f9" 
          }}
        >
          <p>
            {job.title} -{" "}
            <span style={{ color: statusColors[job.status], fontWeight: "bold" }}>
              {job.status}
            </span>
          </p>

          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id={`status-label-${job.id}`}>Status</InputLabel>
            <Select
              labelId={`status-label-${job.id}`}
              value={job.status}
              label="Status"
              onChange={(e) => handleUpdate(job.id, e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                  sx={{ color: statusColors[status], fontWeight: "bold" }}
                >
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Box>
  );
}

export default JobList;