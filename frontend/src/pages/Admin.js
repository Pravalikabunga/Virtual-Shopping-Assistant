import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: 'core',
  });
  
  const { getAuthHeaders, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Fetch users and stats
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await fetch('http://localhost:3000/api/admin/users', {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await usersResponse.json();
        setUsers(usersData.users);
        
        // Fetch stats
        const statsResponse = await fetch('http://localhost:3000/api/admin/stats', {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        });
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch system stats');
        }
        
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [getAuthHeaders]);

  // Handle edit user
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setOpenDialog(true);
  };

  // Handle delete user
  const handleDeleteClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Remove user from state
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Handle form submit
  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${selectedUser._id}`, {
        method: 'PATCH',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();

      // Update user in state
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, ...data.user } : user
      ));

      setOpenDialog(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          Admin Dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        {/* Stats Cards */}
        {stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <GroupIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" color="text.primary">{stats.totalUsers}</Typography>
                  <Typography variant="body1" color="text.secondary">Total Users</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <PersonIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" color="text.primary">{stats.coreUsers}</Typography>
                  <Typography variant="body1" color="text.secondary">Regular Users</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AdminPanelSettingsIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h4" color="text.primary">{stats.adminUsers}</Typography>
                  <Typography variant="body1" color="text.secondary">Admin Users</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ mt: 4, mb: 2 }}
        >
          User Management
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditClick(user)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteClick(user._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={editForm.username}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={editForm.email}
            onChange={handleFormChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={editForm.role}
              onChange={handleFormChange}
              label="Role"
            >
              <MenuItem value="core">Core User</MenuItem>
              <MenuItem value="admin">Admin User</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin; 