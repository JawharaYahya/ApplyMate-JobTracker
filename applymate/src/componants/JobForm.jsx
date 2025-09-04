import { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography, Paper } from '@mui/material';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const [company, setCompany] = useState(job?.company || '');
  const [position, setPosition] = useState(job?.position || '');
  const [status, setStatus] = useState(job?.status || 'applied');
  const [notes, setNotes] = useState(job?.notes || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: job?.id,
      company,
      position,
      status,
      notes,
      ...(job ? {} : { appliedDate: new Date() }),
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 3, backgroundColor: '#e8f5e9' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', textAlign: 'center' }}>
          {job ? 'Edit Job Application' : 'Add New Job Application'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            {['applied', 'interview', 'rejected', 'hired'].map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#43a047' }}>
              {job ? 'Update' : 'Add'}
            </Button>
            <Button type="button" variant="outlined" onClick={onCancel} sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobForm;
