import React from 'react';
import { FiPlay, FiRefreshCw } from 'react-icons/fi';

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
        <FiPlay />
        <span>Create Chart</span>
      </button>
      <button 
        className="btn btn-secondary" 
        onClick={onClear}
      >
        <FiRefreshCw />
        <span>Reset Chart</span>
      </button>
    </div>
  );
};

export default ChartControls; 