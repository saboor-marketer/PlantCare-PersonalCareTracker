const PLANTS_STORAGE_KEY = 'plantcare_plants';
const THEME_STORAGE_KEY = 'plantcare_theme';

export const savePlants = (plants) => {
  try {
    localStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
    return true;
  } catch (error) {
    console.error('Error saving plants to localStorage:', error);
    return false;
  }
};

export const loadPlants = () => {
  try {
    const stored = localStorage.getItem(PLANTS_STORAGE_KEY);
    if (stored === null) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading plants from localStorage:', error);
    return [];
  }
};

export const removePlant = (plantId) => {
  try {
    const plants = loadPlants();
    const filtered = plants.filter(plant => plant.id !== plantId);
    savePlants(filtered);
    return true;
  } catch (error) {
    console.error('Error removing plant from localStorage:', error);
    return false;
  }
};

export const updatePlant = (updatedPlant) => {
  try {
    const plants = loadPlants();
    const index = plants.findIndex(plant => plant.id === updatedPlant.id);
    if (index !== -1) {
      plants[index] = { ...plants[index], ...updatedPlant, updatedAt: new Date().toISOString() };
      savePlants(plants);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating plant in localStorage:', error);
    return false;
  }
};

export const addPlant = (plant) => {
  try {
    const plants = loadPlants();
    const newPlant = {
      ...plant,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    plants.push(newPlant);
    savePlants(plants);
    return newPlant;
  } catch (error) {
    console.error('Error adding plant to localStorage:', error);
    return null;
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
    return false;
  }
};

export const loadTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored || 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
