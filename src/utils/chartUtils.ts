import { ChartData, DataPoint, AdvancedSettings } from '../types';

/**
 * Validates chart data and returns validation result
 */
export const validateChartData = (dataPoints: DataPoint[], chartTitle: string): { isValid: boolean; error?: string } => {
  const validData = dataPoints.filter(point => point.label && point.value);
  
  if (validData.length === 0) {
    return { isValid: false, error: 'Please add at least one data point' };
  }

  if (!chartTitle.trim()) {
    return { isValid: false, error: 'Please enter a chart title' };
  }

  return { isValid: true };
};

/**
 * Converts data points to Chart.js format
 */
export const convertToChartData = (
  dataPoints: DataPoint[], 
  chartTitle: string, 
  colors: string[], 
  advancedSettings: AdvancedSettings
): ChartData => {
  const validData = dataPoints.filter(point => point.label && point.value);
  const labels = validData.map(point => point.label);
  const values = validData.map(point => parseFloat(point.value));

  return {
    labels: labels,
    datasets: [{
      label: chartTitle,
      data: values,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: advancedSettings.borderWidth,
      borderRadius: advancedSettings.borderRadius
    }]
  };
};

/**
 * Creates default advanced settings
 */
export const createDefaultAdvancedSettings = (): AdvancedSettings => ({
  width: 800,
  height: 400,
  animation: true,
  animationDuration: 1000,
  showGrid: true,
  gridColor: '#e0e0e0',
  showLegend: true,
  legendPosition: 'top',
  borderWidth: 1,
  borderRadius: 0,
  shadow: true,
  maintainAspectRatio: true
});

/**
 * Creates default custom colors
 */
export const createDefaultCustomColors = (): string[] => [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
  '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
]; 