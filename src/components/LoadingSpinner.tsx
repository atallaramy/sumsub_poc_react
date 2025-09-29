import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'small' : '';

  return (
    <div className={`loading-spinner ${sizeClass}`} />
  );
};

export default LoadingSpinner;