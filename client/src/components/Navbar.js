import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo/Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1, // Pushes links to the right
          }}
        >
          MovieMatch
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/questionnaire">
            Questionnaire
          </Button>
          <Button color="inherit" component={Link} to="/recommendations">
            Recommendations
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;