import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '20px' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Welcome to AI-Powered MovieMatch!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Your personalized movie recommendation platform.
        </Typography>
      </Box>
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
    </Container>
  );
};

export default Home;