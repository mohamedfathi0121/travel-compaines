
import React from 'react';

export default function NextButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl bg-button-primary hover:shadow-sm shadow-text-secondary hover:bg-button-primary-hover text-button-text font-medium transition${className}`}
    >
      {children}
    </button>
  );
}

