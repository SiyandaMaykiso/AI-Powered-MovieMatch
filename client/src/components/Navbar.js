import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MovieMatch</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/questionnaire">Questionnaire</Link>
        </li>
        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;