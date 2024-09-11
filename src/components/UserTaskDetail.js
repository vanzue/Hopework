import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Grid, Button, Chip, 
  LinearProgress, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Box, IconButton
} from '@mui/material';

function UserTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data - replace with actual data fetching
  const task = {
    id,
    name: `Task ${id}`,
    description: 'This is a detailed description of the task. It explains what needs to be done and how to complete it successfully.',
    type: 'Image Classification',
    difficulty: 'Medium',
    reward: 20,
    status: 'Available',
    deadline: '2023-12-31',
    progress: 0,
    totalItems: 100,
    completedItems: 0
  };

  const handleApply = () => {
    setOpenDialog(true);
  };

  const handleConfirmApply = () => {
    // Logic to apply for the task
    setOpenDialog(false);
    navigate('/user/my-tasks');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBack = () => {
    navigate('/user/tasks');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <IconButton 
        onClick={handleBack} 
        sx={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem', 
          fontSize: '1.5rem' 
        }}
      >
        ←
      </IconButton>
      <Container maxWidth="sm" sx={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <Paper elevation={3} sx={{ padding: '2rem', width: '100%', maxWidth: '500px', margin: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            {task.name}
          </Typography>
          <Chip 
            label={task.type} 
            color="primary" 
            sx={{ marginBottom: '1rem' }}
          />
          <Chip 
            label={task.difficulty} 
            color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
            sx={{ marginLeft: '0.5rem', marginBottom: '1rem' }}
          />
          <Typography variant="body1" paragraph>
            {task.description}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Reward: ${task.reward}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Status: {task.status}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Deadline: {task.deadline}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Progress: {task.completedItems}/{task.totalItems}</Typography>
            </Grid>
          </Grid>
          <LinearProgress 
            variant="determinate" 
            value={(task.completedItems / task.totalItems) * 100} 
            sx={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApply}
            fullWidth
          >
            Apply for This Task
          </Button>
        </Paper>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to apply for this task? Once applied, you'll be responsible for completing it before the deadline.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmApply} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserTaskDetail;