import React from 'react';

const EmptyState = ({ icon, title, message, actionText, onAction }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="text-muted">{message}</p>
      {actionText && onAction && (
        <button className="btn btn-primary mt-3" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
