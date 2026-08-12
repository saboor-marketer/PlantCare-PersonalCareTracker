import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate, getNextWateringDate, getNextFertilizingDate, isDueToday, isOverdue } from '../utils/dateUtils';
import { getCareStatus, getCareTimeline, markAsWatered, markAsFertilized } from '../utils/plantUtils';
import { updatePlant, removePlant } from '../utils/storage';
import CareStatusBadge from '../components/CareStatusBadge';
import HealthBadge from '../components/HealthBadge';
import CareTimeline from '../components/CareTimeline';
import ConfirmModal from '../components/ConfirmModal';

const PlantDetails = ({ plants, setPlants }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  const plant = plants.find(p => p.id === id);
  const careStatus = getCareStatus(plant);
  const timeline = getCareTimeline(plant);

  const handleMarkWatered = async () => {
    const updated = markAsWatered(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const handleMarkFertilized = async () => {
    const updated = markAsFertilized(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const handleDeleteClick = () => {
    setDeleteConfirm(plant);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm) {
      await removePlant(deleteConfirm.id);
      setPlants(prev => prev.filter(p => p.id !== deleteConfirm.id));
      setDeleteConfirm(null);
      navigate('/plants');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  if (!plant) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          Plant not found.
        </div>
        <Link to="/plants" className="btn btn-primary">
          Back to Plants
        </Link>
      </div>
    );
  }

  const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
  const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Link to="/plants" className="btn btn-outline-secondary mb-3">
          ← Back to Plants
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            {plant.imageUrl ? (
              <img 
                src={plant.imageUrl} 
                alt={plant.name}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div 
                className="bg-light d-flex align-items-center justify-content-center"
                style={{ height: '300px' }}
              >
                <span className="display-1 text-muted" aria-hidden="true">🌿</span>
              </div>
            )}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="card-title mb-1">{plant.name}</h2>
                  <p className="card-subtitle text-muted mb-0">{plant.species}</p>
                </div>
                <HealthBadge healthStatus={plant.healthStatus} />
              </div>

              <div className="mb-3">
                <CareStatusBadge status={careStatus} />
              </div>

              <div className="d-grid gap-2">
                <button
                  onClick={handleMarkWatered}
                  className="btn btn-primary"
                  disabled={!plant.lastWatered || !plant.wateringFrequency}
                >
                  💧 Mark as Watered
                </button>
                {plant.fertilizingFrequency && (
                  <button
                    onClick={handleMarkFertilized}
                    className="btn btn-success"
                    disabled={!plant.lastFertilized}
                  >
                    🧪 Mark as Fertilized
                  </button>
                )}
                <Link to={`/edit-plant/${plant.id}`} className="btn btn-outline-primary">
                  ✏️ Edit Plant
                </Link>
                <button
                  onClick={handleDeleteClick}
                  className="btn btn-outline-danger"
                >
                  🗑️ Delete Plant
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Plant Information</h5>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <strong>Location:</strong>
                  <p className="mb-0">{plant.location || 'Not specified'}</p>
                </div>
                <div className="col-md-6">
                  <strong>Purchase Date:</strong>
                  <p className="mb-0">{formatDate(plant.purchaseDate)}</p>
                </div>
                <div className="col-md-6">
                  <strong>Light Requirement:</strong>
                  <p className="mb-0">{plant.lightRequirement || 'Not specified'}</p>
                </div>
                <div className="col-md-6">
                  <strong>Health Status:</strong>
                  <p className="mb-0">{plant.healthStatus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Watering Schedule</h5>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <strong>Last Watered:</strong>
                  <p className="mb-0">{formatDate(plant.lastWatered)}</p>
                </div>
                <div className="col-md-6">
                  <strong>Watering Frequency:</strong>
                  <p className="mb-0">Every {plant.wateringFrequency} days</p>
                </div>
                <div className="col-md-6">
                  <strong>Next Watering:</strong>
                  <p className="mb-0">
                    {nextWatering ? (
                      <>
                        {formatDate(nextWatering)}
                        {isOverdue(nextWatering) && (
                          <span className="text-danger ms-2">(Overdue)</span>
                        )}
                        {isDueToday(nextWatering) && (
                          <span className="text-warning ms-2">(Due today)</span>
                        )}
                      </>
                    ) : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {plant.fertilizingFrequency && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Fertilizing Schedule</h5>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>Last Fertilized:</strong>
                    <p className="mb-0">{formatDate(plant.lastFertilized)}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Fertilizing Frequency:</strong>
                    <p className="mb-0">Every {plant.fertilizingFrequency} days</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Next Fertilizing:</strong>
                    <p className="mb-0">
                      {nextFertilizing ? (
                        <>
                          {formatDate(nextFertilizing)}
                          {isOverdue(nextFertilizing) && (
                            <span className="text-danger ms-2">(Overdue)</span>
                          )}
                          {isDueToday(nextFertilizing) && (
                            <span className="text-warning ms-2">(Due today)</span>
                          )}
                        </>
                      ) : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {plant.notes && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Notes</h5>
                <p className="card-text">{plant.notes}</p>
              </div>
            </div>
          )}

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Care Timeline</h5>
              <CareTimeline timeline={timeline} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={deleteConfirm !== null}
        title="Delete Plant"
        message={`Are you sure you want to delete ${deleteConfirm?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default PlantDetails;
