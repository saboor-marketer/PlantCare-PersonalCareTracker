import { getNextWateringDate, getNextFertilizingDate, isDueToday, isOverdue, getDaysUntil } from './dateUtils';

export const getCareStatus = (plant) => {
  if (!plant) return 'unknown';
  
  if (plant.healthStatus === 'Sick' || plant.healthStatus === 'Needs Attention') {
    return 'needs-attention';
  }
  
  const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
  const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);
  
  if (isOverdue(nextWatering) || isOverdue(nextFertilizing)) {
    return 'overdue';
  }
  
  if (isDueToday(nextWatering) || isDueToday(nextFertilizing)) {
    return 'due-today';
  }
  
  return 'healthy';
};

export const getWateringStatus = (plant) => {
  if (!plant || !plant.lastWatered || !plant.wateringFrequency) {
    return 'unknown';
  }
  
  const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
  
  if (isOverdue(nextWatering)) return 'overdue';
  if (isDueToday(nextWatering)) return 'due-today';
  return 'healthy';
};

export const getFertilizingStatus = (plant) => {
  if (!plant || !plant.lastFertilized || !plant.fertilizingFrequency) {
    return 'unknown';
  }
  
  const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);
  
  if (isOverdue(nextFertilizing)) return 'overdue';
  if (isDueToday(nextFertilizing)) return 'due-today';
  return 'healthy';
};

export const needsCareToday = (plant) => {
  const careStatus = getCareStatus(plant);
  return careStatus === 'due-today' || careStatus === 'overdue' || careStatus === 'needs-attention';
};

export const getDashboardStats = (plants) => {
  const totalPlants = plants.length;
  const needsWateringToday = plants.filter(plant => {
    const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
    return isDueToday(nextWatering) || isOverdue(nextWatering);
  }).length;
  
  const overdueCare = plants.filter(plant => {
    const nextWatering = getNextWateringDate(plant.lastWatered, plant.wateringFrequency);
    const nextFertilizing = getNextFertilizingDate(plant.lastFertilized, plant.fertilizingFrequency);
    return isOverdue(nextWatering) || isOverdue(nextFertilizing);
  }).length;
  
  const healthyPlants = plants.filter(plant => {
    const careStatus = getCareStatus(plant);
    return careStatus === 'healthy';
  }).length;
  
  const needsAttention = plants.filter(plant => {
    return plant.healthStatus === 'Needs Attention' || plant.healthStatus === 'Sick';
  }).length;
  
  return {
    totalPlants,
    needsWateringToday,
    overdueCare,
    healthyPlants,
    needsAttention
  };
};

export const markAsWatered = (plant) => {
  const today = new Date().toISOString().split('T')[0];
  const nextWatering = getNextWateringDate(today, plant.wateringFrequency);
  
  return {
    ...plant,
    lastWatered: today,
    nextWatering: nextWatering ? nextWatering.toISOString().split('T')[0] : null,
    updatedAt: new Date().toISOString()
  };
};

export const markAsFertilized = (plant) => {
  const today = new Date().toISOString().split('T')[0];
  const nextFertilizing = getNextFertilizingDate(today, plant.fertilizingFrequency);
  
  return {
    ...plant,
    lastFertilized: today,
    nextFertilizing: nextFertilizing ? nextFertilizing.toISOString().split('T')[0] : null,
    updatedAt: new Date().toISOString()
  };
};

export const searchPlants = (plants, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return plants;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return plants.filter(plant => {
    return (
      plant.name?.toLowerCase().includes(term) ||
      plant.species?.toLowerCase().includes(term) ||
      plant.location?.toLowerCase().includes(term)
    );
  });
};

export const filterPlants = (plants, filters) => {
  let filtered = [...plants];
  
  if (filters.health && filters.health !== 'all') {
    filtered = filtered.filter(plant => plant.healthStatus === filters.health);
  }
  
  if (filters.careStatus && filters.careStatus !== 'all') {
    filtered = filtered.filter(plant => {
      const careStatus = getCareStatus(plant);
      return careStatus === filters.careStatus;
    });
  }
  
  if (filters.location && filters.location !== 'all') {
    filtered = filtered.filter(plant => plant.location === filters.location);
  }
  
  return filtered;
};

export const sortPlants = (plants, sortBy) => {
  const sorted = [...plants];
  
  switch (sortBy) {
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'recently-watered':
      sorted.sort((a, b) => {
        if (!a.lastWatered) return 1;
        if (!b.lastWatered) return -1;
        return new Date(b.lastWatered) - new Date(a.lastWatered);
      });
      break;
    case 'watering-due-soon':
      sorted.sort((a, b) => {
        const daysA = getDaysUntil(getNextWateringDate(a.lastWatered, a.wateringFrequency));
        const daysB = getDaysUntil(getNextWateringDate(b.lastWatered, b.wateringFrequency));
        if (daysA === null) return 1;
        if (daysB === null) return -1;
        return daysA - daysB;
      });
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }
  
  return sorted;
};

export const getUniqueLocations = (plants) => {
  const locations = plants
    .map(plant => plant.location)
    .filter(location => location && location.trim() !== '');
  return [...new Set(locations)].sort();
};

export const getCareTimeline = (plant) => {
  const timeline = [];
  
  if (plant.createdAt) {
    timeline.push({
      date: plant.createdAt,
      action: 'Plant added',
      type: 'add'
    });
  }
  
  if (plant.lastWatered) {
    timeline.push({
      date: plant.lastWatered,
      action: 'Watered',
      type: 'water'
    });
  }
  
  if (plant.lastFertilized) {
    timeline.push({
      date: plant.lastFertilized,
      action: 'Fertilized',
      type: 'fertilize'
    });
  }
  
  if (plant.nextWatering) {
    timeline.push({
      date: plant.nextWatering,
      action: 'Next watering',
      type: 'next-water'
    });
  }
  
  if (plant.nextFertilizing) {
    timeline.push({
      date: plant.nextFertilizing,
      action: 'Next fertilizing',
      type: 'next-fertilize'
    });
  }
  
  return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
};
