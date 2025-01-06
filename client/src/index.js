import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Your primary color
    },
    secondary: {
      main: '#ff4081', // Your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font family
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styling */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);