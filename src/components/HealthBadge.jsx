import React from 'react';

const HealthBadge = ({ healthStatus }) => {
  const getBadgeClass = () => {
    switch (healthStatus) {
      case 'Healthy':
        return 'bg-success';
      case 'Needs Attention':
        return 'bg-warning text-dark';
      case 'Sick':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {healthStatus || 'Unknown'}
    </span>
  );
};

export default HealthBadge;
