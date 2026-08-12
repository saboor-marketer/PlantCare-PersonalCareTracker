export const validatePlantForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Plant name is required';
  } else if (formData.name.length > 100) {
    errors.name = 'Plant name must be less than 100 characters';
  }
  
  if (!formData.species || formData.species.trim() === '') {
    errors.species = 'Species is required';
  } else if (formData.species.length > 100) {
    errors.species = 'Species must be less than 100 characters';
  }
  
  if (!formData.wateringFrequency || formData.wateringFrequency <= 0) {
    errors.wateringFrequency = 'Watering frequency must be a positive number';
  } else if (formData.wateringFrequency > 365) {
    errors.wateringFrequency = 'Watering frequency must be less than 365 days';
  }
  
  if (!formData.lastWatered) {
    errors.lastWatered = 'Last watered date is required';
  }
  
  if (formData.fertilizingFrequency && formData.fertilizingFrequency <= 0) {
    errors.fertilizingFrequency = 'Fertilizing frequency must be a positive number';
  }
  
  if (formData.fertilizingFrequency && formData.fertilizingFrequency > 365) {
    errors.fertilizingFrequency = 'Fertilizing frequency must be less than 365 days';
  }
  
  if (formData.imageUrl && formData.imageUrl.trim() !== '') {
    if (!isValidUrl(formData.imageUrl)) {
      errors.imageUrl = 'Please enter a valid URL';
    }
  }
  
  if (formData.notes && formData.notes.length > 500) {
    errors.notes = 'Notes must be less than 500 characters';
  }
  
  if (formData.location && formData.location.length > 50) {
    errors.location = 'Location must be less than 50 characters';
  }
  
  return errors;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const hasErrors = (errors) => {
  return Object.keys(errors).some(key => errors[key] !== null && errors[key] !== '');
};
