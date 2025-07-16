import React from 'react';
import { FiBarChart, FiPieChart, FiTrendingUp, FiCircle, FiHexagon, FiTarget } from 'react-icons/fi';
import { ChartType } from '../types';

interface ChartTypeSelectorProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ chartType, onChartTypeChange }) => {
  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case 'bar': return <FiBarChart className="chart-type-icon" />;
      case 'pie': return <FiPieChart className="chart-type-icon" />;
      case 'line': return <FiTrendingUp className="chart-type-icon" />;
      case 'doughnut': return <FiCircle className="chart-type-icon" />;
      case 'radar': return <FiHexagon className="chart-type-icon" />;
      case 'scatter': return <FiTarget className="chart-type-icon" />;
      default: return null;
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="chartType">
        {getChartIcon(chartType)}
        <span>Chart Type</span>
      </label>
      <select
        id="chartType"
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value as ChartType)}
      >
        <option value="bar">📊 Bar Chart</option>
        <option value="pie">🥧 Pie Chart</option>
        <option value="line">📈 Line Chart</option>
        <option value="doughnut">🍩 Doughnut Chart</option>
        <option value="radar">🔷 Radar Chart</option>
        <option value="scatter">🎯 Scatter Chart</option>
      </select>
    </div>
  );
};

export default ChartTypeSelector; 