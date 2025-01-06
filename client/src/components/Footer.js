import React from 'react';
import './Footer.css'; // Optional for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} AI-Powered MovieMatch. All rights reserved. Created by Siyanda Burnham</p>
        <div className="footer-links">
          <a href="https://github.com/SiyandaBurnham" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/siyandaburnham/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;