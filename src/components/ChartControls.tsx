import React from 'react';

interface ChartControlsProps {
  onCreateChart: () => void;
  onClear: () => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({ onCreateChart, onClear }) => {
  return (
    <div className="chart-controls">
      <button 
        className="btn" 
        onClick={onCreateChart}
      >
        ✨ Create Chart
      </button>
      <button 
        className="btn btn-secondary" 
        onClick={onClear}
      >
        Clear All
      </button>
    </div>
  );
};

export default ChartControls; 