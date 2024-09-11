import React, { useState } from 'react';
import { 
  Container, Typography, Button, TextField, Select, MenuItem, FormControl, 
  InputLabel, Grid, Card, CardContent, Chip, InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserTaskList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  // Mock data - replace with actual data fetching
  const tasks = [
    { id: 1, name: 'Image Classification', type: 'Image', difficulty: 'Easy', reward: 10, status: 'Available' },
    { id: 2, name: 'Text Translation', type: 'Text', difficulty: 'Medium', reward: 20, status: 'Available' },
    { id: 3, name: 'Data Entry', type: 'Data', difficulty: 'Easy', reward: 15, status: 'Available' },
    { id: 4, name: 'Audio Transcription', type: 'Audio', difficulty: 'Hard', reward: 30, status: 'Available' },
  ];

  const handleViewTask = (id) => {
    navigate(`/user/task/${id}`);
  };

  const handleApplyTask = (id) => {
    // Logic to apply for task
    navigate('/user/my-tasks');
  };

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || task.type === filterType) &&
    (filterDifficulty === '' || task.difficulty === filterDifficulty)
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Available Tasks
      </Typography>
      
      <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Tasks"
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Image">Image</MenuItem>
              <MenuItem value="Text">Text</MenuItem>
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Difficulty</InputLabel>
            <Select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              label="Filter by Difficulty"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {task.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Type: {task.type}
                </Typography>
                <Chip 
                  label={task.difficulty} 
                  color={task.difficulty === 'Easy' ? 'success' : task.difficulty === 'Medium' ? 'warning' : 'error'}
                  size="small"
                  sx={{ marginBottom: 1 }}
                />
                <Typography variant="body2" component="p">
                  Reward: ${task.reward}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
                  Status: {task.status}
                </Typography>
                <Button size="small" color="primary" onClick={() => handleViewTask(task.id)} sx={{ marginRight: 1 }}>
                  View Details
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={() => handleApplyTask(task.id)}>
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserTaskList;