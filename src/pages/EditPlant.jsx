import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantForm from '../components/PlantForm';
import { updatePlant } from '../utils/storage';
import { getNextWateringDate, getNextFertilizingDate } from '../utils/dateUtils';

const EditPlant = ({ plants, setPlants }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const plant = plants.find(p => p.id === id);

  const handleSubmit = async (formData) => {
    const nextWatering = getNextWateringDate(formData.lastWatered, formData.wateringFrequency);
    const nextFertilizing = formData.fertilizingFrequency && formData.lastFertilized
      ? getNextFertilizingDate(formData.lastFertilized, formData.fertilizingFrequency)
      : null;

    const plantData = {
      ...formData,
      id: plant.id,
      createdAt: plant.createdAt,
      nextWatering: nextWatering ? nextWatering.toISOString().split('T')[0] : null,
      nextFertilizing: nextFertilizing ? nextFertilizing.toISOString().split('T')[0] : null
    };

    const success = await updatePlant(plantData);
    if (success) {
      setPlants(prev => prev.map(p => p.id === plant.id ? plantData : p));
      navigate(`/plant/${plant.id}`);
    }
  };

  const handleCancel = () => {
    navigate(`/plant/${id}`);
  };

  if (!plant) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          Plant not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <PlantForm
        initialData={plant}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={true}
      />
    </div>
  );
};

export default EditPlant;
