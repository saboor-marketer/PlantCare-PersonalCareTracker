import React from 'react';
import { formatDate } from '../utils/dateUtils';

const CareTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <p className="text-muted">No care history available.</p>;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'add':
        return '🌱';
      case 'water':
        return '💧';
      case 'fertilize':
        return '🧪';
      case 'next-water':
        return '💧';
      case 'next-fertilize':
        return '🧪';
      default:
        return '📋';
    }
  };

  return (
    <div className="care-timeline">
      {timeline.map((item, index) => (
        <div key={index} className="care-timeline-item">
          <div className="d-flex align-items-start">
            <span className="me-2" aria-hidden="true">
              {getIcon(item.type)}
            </span>
            <div>
              <strong>{item.action}</strong>
              <div className="text-muted small">{formatDate(item.date)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareTimeline;
