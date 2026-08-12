import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      className="btn btn-outline-secondary ms-2"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span aria-hidden="true">🌙</span>
      ) : (
        <span aria-hidden="true">☀️</span>
      )}
      <span className="d-none d-sm-inline ms-1">
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;
