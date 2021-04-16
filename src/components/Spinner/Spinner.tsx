import React from 'react';
import './Spinner.css';
const Spinner = () => {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="spinner-item item1" />
      <div className="spinner-item item2" />
      <div className="spinner-item item3" />
    </div>
  );
};

export default Spinner;
