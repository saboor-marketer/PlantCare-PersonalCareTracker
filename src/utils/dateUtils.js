export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getNextWateringDate = (lastWatered, frequency) => {
  if (!lastWatered || !frequency) return null;
  return addDays(lastWatered, frequency);
};

export const getNextFertilizingDate = (lastFertilized, frequency) => {
  if (!lastFertilized || !frequency) return null;
  return addDays(lastFertilized, frequency);
};

export const getDaysUntil = (date) => {
  if (!date) return null;
  const target = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isDueToday = (date) => {
  if (!date) return false;
  const daysUntil = getDaysUntil(date);
  return daysUntil === 0;
};

export const isOverdue = (date) => {
  if (!date) return false;
  const daysUntil = getDaysUntil(date);
  return daysUntil < 0;
};

export const formatDate = (date) => {
  if (!date) return 'Not set';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isFutureDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date > today;
};
