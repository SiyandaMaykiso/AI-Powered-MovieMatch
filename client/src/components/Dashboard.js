import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '20px' }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back to AI-Powered MovieMatch! Access all your personalized features below.
        </Typography>
      </Box>

      {/* Actions Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/questionnaire"
          sx={{
            padding: '10px 20px',
            fontSize: '1rem',
          }}
        >
          Start Questionnaire
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          component={Link}
          to="/recommendations"
          sx={{
            padding: '10px 20px',
            fontSize: '1rem',
          }}
        >
          View Recommendations
        </Button>
      </Box>

      {/* Additional Info Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          Need help? Visit our FAQ or contact support for assistance.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;