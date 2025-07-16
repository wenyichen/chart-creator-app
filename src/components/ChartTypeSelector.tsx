import React from 'react';

interface ChartTypeSelectorProps {
  chartType: 'bar' | 'pie';
  onChartTypeChange: (type: 'bar' | 'pie') => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ chartType, onChartTypeChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="chartType">Chart Type</label>
      <select
        id="chartType"
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value as 'bar' | 'pie')}
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
  );
};

export default ChartTypeSelector; 