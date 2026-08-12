import React, { useState, useEffect } from 'react';
import { validatePlantForm, hasErrors } from '../utils/validation';
import { formatDateInput } from '../utils/dateUtils';

const PlantForm = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    location: '',
    purchaseDate: '',
    imageUrl: '',
    wateringFrequency: 7,
    lastWatered: new Date().toISOString().split('T')[0],
    fertilizingFrequency: '',
    lastFertilized: '',
    lightRequirement: 'Bright indirect',
    healthStatus: 'Healthy',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        name: initialData.name || '',
        species: initialData.species || '',
        location: initialData.location || '',
        purchaseDate: formatDateInput(initialData.purchaseDate) || '',
        imageUrl: initialData.imageUrl || '',
        wateringFrequency: initialData.wateringFrequency || 7,
        lastWatered: formatDateInput(initialData.lastWatered) || new Date().toISOString().split('T')[0],
        fertilizingFrequency: initialData.fertilizingFrequency || '',
        lastFertilized: formatDateInput(initialData.lastFertilized) || '',
        lightRequirement: initialData.lightRequirement || 'Bright indirect',
        healthStatus: initialData.healthStatus || 'Healthy',
        notes: initialData.notes || ''
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validatePlantForm(formData);
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <h2 className="mb-4">{isEdit ? 'Edit Plant' : 'Add New Plant'}</h2>

      {/* Basic Information */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Basic Information</h5>
          
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Plant Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'nameError' : undefined}
              />
              {errors.name && (
                <div id="nameError" className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="species" className="form-label">
                Species <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.species ? 'is-invalid' : ''}`}
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.species}
                aria-describedby={errors.species ? 'speciesError' : undefined}
              />
              {errors.species && (
                <div id="speciesError" className="invalid-feedback">
                  {errors.species}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Living Room, Bedroom"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'locationError' : undefined}
              />
              {errors.location && (
                <div id="locationError" className="invalid-feedback">
                  {errors.location}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                id="purchaseDate"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="imageUrl" className="form-label">Image URL</label>
              <input
                type="url"
                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/plant-image.jpg"
                aria-invalid={!!errors.imageUrl}
                aria-describedby={errors.imageUrl ? 'imageUrlError' : undefined}
              />
              {errors.imageUrl && (
                <div id="imageUrlError" className="invalid-feedback">
                  {errors.imageUrl}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Watering */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Watering</h5>
          
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="wateringFrequency" className="form-label">
                Watering Frequency (days) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${errors.wateringFrequency ? 'is-invalid' : ''}`}
                id="wateringFrequency"
                name="wateringFrequency"
                value={formData.wateringFrequency}
                onChange={handleChange}
                min="1"
                max="365"
                required
                aria-required="true"
                aria-invalid={!!errors.wateringFrequency}
                aria-describedby={errors.wateringFrequency ? 'wateringFrequencyError' : undefined}
              />
              {errors.wateringFrequency && (
                <div id="wateringFrequencyError" className="invalid-feedback">
                  {errors.wateringFrequency}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastWatered" className="form-label">
                Last Watered <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${errors.lastWatered ? 'is-invalid' : ''}`}
                id="lastWatered"
                name="lastWatered"
                value={formData.lastWatered}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.lastWatered}
                aria-describedby={errors.lastWatered ? 'lastWateredError' : undefined}
              />
              {errors.lastWatered && (
                <div id="lastWateredError" className="invalid-feedback">
                  {errors.lastWatered}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Light */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Light Requirement</h5>
          
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="lightRequirement" className="form-label">Light Level</label>
              <select
                className="form-select"
                id="lightRequirement"
                name="lightRequirement"
                value={formData.lightRequirement}
                onChange={handleChange}
              >
                <option value="Low">Low Light</option>
                <option value="Medium">Medium Light</option>
                <option value="Bright indirect">Bright Indirect</option>
                <option value="Direct sunlight">Direct Sunlight</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Health */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Health Status</h5>
          
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="healthStatus" className="form-label">Current Health</label>
              <select
                className="form-select"
                id="healthStatus"
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Sick">Sick</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fertilizing */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Fertilizing (Optional)</h5>
          
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fertilizingFrequency" className="form-label">
                Fertilizing Frequency (days)
              </label>
              <input
                type="number"
                className={`form-control ${errors.fertilizingFrequency ? 'is-invalid' : ''}`}
                id="fertilizingFrequency"
                name="fertilizingFrequency"
                value={formData.fertilizingFrequency}
                onChange={handleChange}
                min="1"
                max="365"
                placeholder="Leave empty if not applicable"
                aria-invalid={!!errors.fertilizingFrequency}
                aria-describedby={errors.fertilizingFrequency ? 'fertilizingFrequencyError' : undefined}
              />
              {errors.fertilizingFrequency && (
                <div id="fertilizingFrequencyError" className="invalid-feedback">
                  {errors.fertilizingFrequency}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastFertilized" className="form-label">Last Fertilized</label>
              <input
                type="date"
                className="form-control"
                id="lastFertilized"
                name="lastFertilized"
                value={formData.lastFertilized}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Additional Information</h5>
          
          <div className="row">
            <div className="col-12">
              <label htmlFor="notes" className="form-label">Notes</label>
              <textarea
                className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Add any notes about your plant..."
                aria-invalid={!!errors.notes}
                aria-describedby={errors.notes ? 'notesError' : undefined}
              ></textarea>
              {errors.notes && (
                <div id="notesError" className="invalid-feedback">
                  {errors.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-3">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Save Changes' : 'Add Plant'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PlantForm;
