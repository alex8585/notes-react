import React from 'react';

export default ({ onDelete, children, className }) => {
  className = className ?? "btn btn-red";
  return (
  <button
    className={className}
    tabIndex="-1"
    type="button"
    onClick={onDelete}
  >
    {children}
  </button>
  );
};
