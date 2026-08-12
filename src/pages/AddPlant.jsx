import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantForm from '../components/PlantForm';
import { addPlant } from '../utils/storage';
import { getNextWateringDate, getNextFertilizingDate } from '../utils/dateUtils';

const AddPlant = ({ setPlants }) => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const nextWatering = getNextWateringDate(formData.lastWatered, formData.wateringFrequency);
    const nextFertilizing = formData.fertilizingFrequency && formData.lastFertilized
      ? getNextFertilizingDate(formData.lastFertilized, formData.fertilizingFrequency)
      : null;

    const plantData = {
      ...formData,
      nextWatering: nextWatering ? nextWatering.toISOString().split('T')[0] : null,
      nextFertilizing: nextFertilizing ? nextFertilizing.toISOString().split('T')[0] : null
    };

    const newPlant = await addPlant(plantData);
    if (newPlant) {
      setPlants(prev => [...prev, newPlant]);
      navigate('/plants');
    }
  };

  const handleCancel = () => {
    navigate('/plants');
  };

  return (
    <div className="container py-4">
      <PlantForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={false}
      />
    </div>
  );
};

export default AddPlant;
