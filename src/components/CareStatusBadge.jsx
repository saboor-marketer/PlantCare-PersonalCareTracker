import React from 'react';

const CareStatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'due-today':
        return 'bg-warning text-dark';
      case 'overdue':
        return 'bg-danger';
      case 'needs-attention':
        return 'bg-warning text-dark';
      case 'healthy':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  const getLabelText = () => {
    switch (status) {
      case 'due-today':
        return 'Due Today';
      case 'overdue':
        return 'Overdue';
      case 'needs-attention':
        return 'Needs Attention';
      case 'healthy':
        return 'Healthy';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {getLabelText()}
    </span>
  );
};

export default CareStatusBadge;
