import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, needsCareToday, markAsWatered, markAsFertilized } from '../utils/plantUtils';
import { updatePlant } from '../utils/storage';
import { formatDate, getNextWateringDate, getNextFertilizingDate, isDueToday, isOverdue } from '../utils/dateUtils';
import CareStatusBadge from '../components/CareStatusBadge';
import HealthBadge from '../components/HealthBadge';
import EmptyState from '../components/EmptyState';
import { samplePlants } from '../data/samplePlants';
import { addPlant } from '../utils/storage';

const Dashboard = ({ plants, setPlants }) => {
  const [loading, setLoading] = useState(true);
  const stats = getDashboardStats(plants);
  
  const plantsNeedingCare = plants.filter(plant => needsCareToday(plant));

  useEffect(() => {
    setLoading(false);
  }, [plants]);

  const handleMarkWatered = async (plant) => {
    const updated = markAsWatered(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const handleMarkFertilized = async (plant) => {
    const updated = markAsFertilized(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const getCareActions = (plant) => {
    const actions = [];
    const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
    const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);

    if (isDueToday(nextWatering) || isOverdue(nextWatering)) {
      actions.push({
        type: 'water',
        label: isOverdue(nextWatering) ? 'Water overdue' : 'Water today',
        onClick: () => handleMarkWatered(plant)
      });
    }

    if (isDueToday(nextFertilizing) || isOverdue(nextFertilizing)) {
      actions.push({
        type: 'fertilize',
        label: isOverdue(nextFertilizing) ? 'Fertilize overdue' : 'Fertilize today',
        onClick: () => handleMarkFertilized(plant)
      });
    }

    if (plant.healthStatus === 'Needs Attention' || plant.healthStatus === 'Sick') {
      actions.push({
        type: 'health',
        label: 'Update health',
        link: `/edit-plant/${plant.id}`
      });
    }

    return actions;
  };

  const handleLoadSamplePlants = async () => {
    for (const plant of samplePlants) {
      await addPlant(plant);
    }
    const loaded = [...samplePlants];
    setPlants(loaded);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Dashboard</h1>
        {plants.length === 0 && (
          <button 
            className="btn btn-outline-primary"
            onClick={handleLoadSamplePlants}
          >
            Load Sample Plants
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4 col-lg-2">
          <div className="card dashboard-card h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Plants</h6>
              <h2 className="card-title mb-0">{stats.totalPlants}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card dashboard-card water h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Need Watering Today</h6>
              <h2 className="card-title mb-0">{stats.needsWateringToday}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card dashboard-card overdue h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Overdue Care</h6>
              <h2 className="card-title mb-0">{stats.overdueCare}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card dashboard-card healthy h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Healthy Plants</h6>
              <h2 className="card-title mb-0">{stats.healthyPlants}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card dashboard-card attention h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Needs Attention</h6>
              <h2 className="card-title mb-0">{stats.needsAttention}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Care */}
      <section className="mb-5">
        <h2 className="mb-4">Today's Care</h2>
        
        {plantsNeedingCare.length === 0 ? (
          <EmptyState
            icon="✅"
            title="All caught up!"
            message="Your plants don't need care today."
          />
        ) : (
          <div className="row g-4">
            {plantsNeedingCare.map(plant => {
              const actions = getCareActions(plant);
              return (
                <div key={plant.id} className="col-md-6 col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="card-title mb-1">{plant.name}</h5>
                          <p className="card-subtitle text-muted small mb-0">{plant.species}</p>
                        </div>
                        <HealthBadge healthStatus={plant.healthStatus} />
                      </div>
                      
                      <div className="mb-3">
                        <CareStatusBadge status={plant.healthStatus === 'Sick' || plant.healthStatus === 'Needs Attention' ? 'needs-attention' : 
                          isOverdue(getNextWateringDate(plant.lastWatered, plant.wateringFrequency)) || 
                          isOverdue(getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency)) ? 'overdue' : 'due-today'} />
                      </div>

                      <div className="mb-3">
                        {actions.map((action, index) => (
                          action.link ? (
                            <Link 
                              key={index}
                              to={action.link}
                              className="btn btn-sm btn-outline-primary me-2 mb-2"
                            >
                              {action.label}
                            </Link>
                          ) : (
                            <button
                              key={index}
                              onClick={action.onClick}
                              className={`btn btn-sm me-2 mb-2 ${
                                action.type === 'water' ? 'btn-primary' : 
                                action.type === 'fertilize' ? 'btn-success' : 'btn-warning'
                              }`}
                            >
                              {action.label}
                            </button>
                          )
                        ))}
                      </div>

                      <Link to={`/plant/${plant.id}`} className="btn btn-sm btn-link p-0">
                        View details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      {plants.length > 0 && (
        <section>
          <h2 className="mb-4">Quick Actions</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <Link to="/add-plant" className="btn btn-primary w-100">
                ➕ Add New Plant
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/plants" className="btn btn-outline-primary w-100">
                🌿 View All Plants
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
