import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import PlantSearch from '../components/PlantSearch';
import PlantFilters from '../components/PlantFilters';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { searchPlants, filterPlants, sortPlants, getUniqueLocations, markAsWatered, markAsFertilized } from '../utils/plantUtils';
import { updatePlant, removePlant } from '../utils/storage';

const Plants = ({ plants, setPlants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    health: 'all',
    careStatus: 'all',
    location: 'all',
    sortBy: 'name-asc'
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const availableLocations = useMemo(() => getUniqueLocations(plants), [plants]);

  const filteredAndSortedPlants = useMemo(() => {
    let result = searchPlants(plants, searchTerm);
    result = filterPlants(result, filters);
    result = sortPlants(result, filters.sortBy);
    return result;
  }, [plants, searchTerm, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      health: 'all',
      careStatus: 'all',
      location: 'all',
      sortBy: 'name-asc'
    });
    setSearchTerm('');
  };

  const handleWatered = async (plant) => {
    const updated = markAsWatered(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const handleFertilized = async (plant) => {
    const updated = markAsFertilized(plant);
    await updatePlant(updated);
    setPlants(prev => prev.map(p => p.id === plant.id ? updated : p));
  };

  const handleDeleteClick = (plant) => {
    setDeleteConfirm(plant);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm) {
      await removePlant(deleteConfirm.id);
      setPlants(prev => prev.filter(p => p.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">My Plants</h1>
        <Link to="/add-plant" className="btn btn-primary">
          ➕ Add Plant
        </Link>
      </div>

      <PlantSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <PlantFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableLocations={availableLocations}
        onClearFilters={handleClearFilters}
      />

      {filteredAndSortedPlants.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No plants found"
          message={searchTerm ? 'No plants match your search or filters.' : 'You haven\'t added any plants yet.'}
          actionText={!searchTerm ? "Add Your First Plant" : undefined}
          onAction={!searchTerm ? () => window.location.href = '/add-plant' : undefined}
        />
      ) : (
        <div className="row g-4">
          {filteredAndSortedPlants.map(plant => (
            <div key={plant.id} className="col-md-6 col-lg-4">
              <PlantCard
                plant={plant}
                onWatered={handleWatered}
                onFertilized={handleFertilized}
                onDelete={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      )}

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

export default Plants;
