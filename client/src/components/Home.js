import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:3001';

const Home = () => {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async () => {
    try {
      setError('');
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
      // Save token and user_id to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleRegister = async () => {
    try {
      setError('');
      setSuccess('');
      await axios.post(`${API_BASE_URL}/api/auth/register`, registerData);
      setSuccess('Registration successful! Please log in.');
      setTab(0); // Switch to the login tab
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" color="primary" align="center" gutterBottom>
        Welcome to AI-Powered MovieMatch!
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
        Your personalized movie recommendation platform.
      </Typography>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Log In" />
          <Tab label="Register" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        {tab === 0 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={loginData.username}
              onChange={(e) => handleInputChange(e, 'login')}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, 'login')}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={registerData.username}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={registerData.password}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home;