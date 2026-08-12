import React from 'react';

const PlantSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, species, or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search plants"
        />
      </div>
    </div>
  );
};

export default PlantSearch;
