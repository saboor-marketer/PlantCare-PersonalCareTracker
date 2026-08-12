import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getNextWateringDate, getNextFertilizingDate, isDueToday, isOverdue } from '../utils/dateUtils';
import { getCareStatus } from '../utils/plantUtils';
import CareStatusBadge from './CareStatusBadge';
import HealthBadge from './HealthBadge';

const PlantCard = ({ plant, onWatered, onFertilized, onDelete }) => {
  const careStatus = getCareStatus(plant);
  const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
  const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);

  const handleWaterClick = (e) => {
    e.preventDefault();
    onWatered(plant);
  };

  const handleFertilizeClick = (e) => {
    e.preventDefault();
    onFertilized(plant);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(plant);
  };

  return (
    <Link to={`/plant/${plant.id}`} className="text-decoration-none">
      <div className="card h-100 plant-card">
        {plant.imageUrl ? (
          <img 
            src={plant.imageUrl} 
            alt={plant.name}
            className="card-img-top plant-card-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="plant-card-img bg-light d-flex align-items-center justify-content-center">
            <span className="display-4 text-muted" aria-hidden="true">🌿</span>
          </div>
        )}
        
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="card-title mb-1">{plant.name}</h5>
              <p className="card-subtitle text-muted small mb-0">{plant.species}</p>
            </div>
            <HealthBadge healthStatus={plant.healthStatus} />
          </div>

          <div className="mb-2">
            <small className="text-muted d-block">📍 {plant.location || 'No location'}</small>
          </div>

          <div className="mb-3">
            <CareStatusBadge status={careStatus} />
          </div>

          <div className="mb-3">
            <small className="text-muted">
              💧 Last watered: {formatDate(plant.lastWatered)}
            </small>
            {nextWatering && (
              <div className="small">
                {isOverdue(nextWatering) ? (
                  <span className="text-danger">⚠️ Overdue by {Math.abs(Math.ceil((nextWatering - new Date()) / (1000 * 60 * 60 * 24)))} days</span>
                ) : isDueToday(nextWatering) ? (
                  <span className="text-warning">⚠️ Due today</span>
                ) : (
                  <span className="text-muted">Next: {formatDate(nextWatering)}</span>
                )}
              </div>
            )}
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button
              onClick={handleWaterClick}
              className="btn btn-sm btn-primary"
              aria-label={`Water ${plant.name}`}
            >
              💧 Water
            </button>
            {plant.fertilizingFrequency && (
              <button
                onClick={handleFertilizeClick}
                className="btn btn-sm btn-success"
                aria-label={`Fertilize ${plant.name}`}
              >
                🧪 Fertilize
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="btn btn-sm btn-outline-danger"
              aria-label={`Delete ${plant.name}`}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
