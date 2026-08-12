import React from 'react';

const PlantFilters = ({ filters, onFilterChange, availableLocations, onClearFilters }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="healthFilter" className="form-label small fw-bold">
              Health
            </label>
            <select
              id="healthFilter"
              className="form-select"
              value={filters.health}
              onChange={(e) => onFilterChange({ ...filters, health: e.target.value })}
              aria-label="Filter by health status"
            >
              <option value="all">All Health</option>
              <option value="Healthy">Healthy</option>
              <option value="Needs Attention">Needs Attention</option>
              <option value="Sick">Sick</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="careStatusFilter" className="form-label small fw-bold">
              Care Status
            </label>
            <select
              id="careStatusFilter"
              className="form-select"
              value={filters.careStatus}
              onChange={(e) => onFilterChange({ ...filters, careStatus: e.target.value })}
              aria-label="Filter by care status"
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="due-today">Due Today</option>
              <option value="overdue">Overdue</option>
              <option value="needs-attention">Needs Attention</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="locationFilter" className="form-label small fw-bold">
              Location
            </label>
            <select
              id="locationFilter"
              className="form-select"
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              aria-label="Filter by location"
            >
              <option value="all">All Locations</option>
              {availableLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="sortBy" className="form-label small fw-bold">
              Sort By
            </label>
            <select
              id="sortBy"
              className="form-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              aria-label="Sort plants"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="recently-watered">Recently Watered</option>
              <option value="watering-due-soon">Watering Due Soon</option>
              <option value="oldest">Oldest First</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="col-12">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onClearFilters}
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantFilters;
