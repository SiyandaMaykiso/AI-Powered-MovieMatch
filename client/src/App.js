import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Questionnaire from './components/Questionnaire';
import Recommendations from './components/Recommendations';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Check if the user is authenticated (e.g., token exists in localStorage)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/questionnaire"
          element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;