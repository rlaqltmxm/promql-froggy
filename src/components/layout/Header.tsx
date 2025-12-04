import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🐸</span>
          <span className="logo-text">PromQL Froggy</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/levels" className="nav-link">Levels</Link>
          <Link to="/sandbox" className="nav-link">Sandbox</Link>
        </nav>
      </div>
    </header>
  );
};
