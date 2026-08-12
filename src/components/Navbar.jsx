import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ theme, onThemeToggle }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🌿 PlantCare
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/plants')}`} to="/plants">
                Plants
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/add-plant')}`} to="/add-plant">
                Add Plant
              </Link>
            </li>
          </ul>
          
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
