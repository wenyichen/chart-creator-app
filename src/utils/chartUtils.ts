import { ChartData, DataPoint, AdvancedSettings, ChartType } from '../types';
import { DEFAULT_CHART_SETTINGS, DEFAULT_CUSTOM_COLORS, DEFAULT_DATA_POINTS } from '../constants/chartDefaults';

// Enhanced validation types for field-level errors
export interface ValidationError {
  field: string;
  message: string;
  index?: number; // For data point errors
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  globalError?: string; // For general errors that don't fit a specific field
}

/**
 * Validates chart data and returns detailed validation result with field-specific errors
 */
export const validateChartData = (dataPoints: DataPoint[], chartTitle: string, chartType?: ChartType): ValidationResult => {
  const errors: ValidationError[] = [];

  // Title validation
  if (!chartTitle.trim()) {
    errors.push({
      field: 'title',
      message: 'Chart title is required'
    });
  }

  if (chartType === 'scatter') {
    // Scatter chart validation
    let hasValidScatterPoint = false;
    let rowErrors = 0;
    dataPoints.forEach((point, index) => {
      const hasX = point.x !== undefined && point.x !== '' && !isNaN(Number(point.x));
      const hasY = point.y !== undefined && point.y !== '' && !isNaN(Number(point.y));
      if (!hasX && !hasY) {
        errors.push({
          field: 'dataPoint',
          message: 'Both X and Y values are required',
          index
        });
        rowErrors++;
      } else if (!hasX) {
        errors.push({
          field: 'dataPoint',
          message: 'X value is required and must be a number',
          index
        });
        rowErrors++;
      } else if (!hasY) {
        errors.push({
          field: 'dataPoint',
          message: 'Y value is required and must be a number',
          index
        });
        rowErrors++;
      } else {
        hasValidScatterPoint = true;
      }
    });
    // Only show general error if there are no row errors
    if (!hasValidScatterPoint && dataPoints.length > 0 && rowErrors === 0) {
      errors.push({
        field: 'dataPoints',
        message: 'At least one complete data point (X and Y) is required'
      });
    }
  } else {
    // Regular chart validation
    let hasValidPoint = false;
    const labelCounts = new Map<string, number[]>();
    let rowErrors = 0;
    dataPoints.forEach((point, index) => {
      const hasLabel = point.label && point.label.trim();
      const hasValue = point.value && point.value.trim();
      if (!hasLabel && !hasValue) {
        errors.push({
          field: 'dataPoint',
          message: 'Both label and value are required',
          index
        });
        rowErrors++;
      } else if (!hasLabel) {
        errors.push({
          field: 'dataPoint',
          message: 'Label is required',
          index
        });
        rowErrors++;
      } else if (!hasValue) {
        errors.push({
          field: 'dataPoint',
          message: 'Value is required',
          index
        });
        rowErrors++;
      } else {
        // Check for valid numeric value
        const value = parseFloat(point.value);
        if (isNaN(value) || value < 0) {
          errors.push({
            field: 'dataPoint',
            message: 'Value must be a positive number',
            index
          });
          rowErrors++;
        } else {
          hasValidPoint = true;
          // Track labels for duplicate detection
          const normalizedLabel = point.label.trim().toLowerCase();
          if (!labelCounts.has(normalizedLabel)) {
            labelCounts.set(normalizedLabel, []);
          }
          labelCounts.get(normalizedLabel)!.push(index);
        }
      }
    });
    // Check for duplicate labels
    labelCounts.forEach((indices) => {
      if (indices.length > 1) {
        indices.forEach(index => {
          errors.push({
            field: 'dataPoint',
            message: 'This label is already used. Labels must be unique.',
            index
          });
          rowErrors++;
        });
      }
    });
    // Only show general error if there are no row errors
    if (!hasValidPoint && dataPoints.length > 0 && rowErrors === 0) {
      errors.push({
        field: 'dataPoints',
        message: 'At least one complete data point (label and value) is required'
      });
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
    globalError: errors.length === 0 ? undefined : undefined // No global error needed with field-specific errors
  };
};

/**
 * Converts data points to Chart.js format
 */
export const convertToChartData = (
  dataPoints: DataPoint[], 
  chartTitle: string, 
  colors: string[], 
  advancedSettings: AdvancedSettings,
  chartType: ChartType = 'bar'
): ChartData => {
  const validData = dataPoints.filter(point => point.label && point.value);
  const labels = validData.map(point => point.label);
  const values = validData.map(point => parseFloat(point.value));

  if (chartType === 'scatter') {
    // For scatter, use x/y pairs
    const scatterData = dataPoints
      .filter(point => point.x !== undefined && point.y !== undefined)
      .map((point, i) => ({
        x: point.x ? parseFloat(point.x) : i,
        y: point.y ? parseFloat(point.y) : 0
      }));
    return {
      labels: [],
      datasets: [{
        label: chartTitle,
        data: scatterData,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: advancedSettings.borderWidth,
        showLine: false
      }]
    };
  }

  if (chartType === 'line') {
    return {
      labels: labels,
      datasets: [{
        label: chartTitle,
        data: values,
        borderColor: colors,
        backgroundColor: colors.map(c => c + '33'),
        fill: true,
        tension: 0.4,
        borderWidth: advancedSettings.borderWidth
      }]
    };
  }

  if (chartType === 'radar') {
    return {
      labels: labels,
      datasets: [{
        label: chartTitle,
        data: values,
        backgroundColor: colors.map(c => c + '33'),
        borderColor: colors,
        borderWidth: advancedSettings.borderWidth
      }]
    };
  }

  // Pie and doughnut are the same data structure
  if (chartType === 'pie' || chartType === 'doughnut') {
    return {
      labels: labels,
      datasets: [{
        label: chartTitle,
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: advancedSettings.borderWidth
      }]
    };
  }

  // Default: bar
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
  ...DEFAULT_CHART_SETTINGS
});

/**
 * Creates default custom colors
 */
export const createDefaultCustomColors = (): string[] => [
  ...DEFAULT_CUSTOM_COLORS
];

/**
 * Creates default data points
 */
export const createDefaultDataPoints = () => [
  ...DEFAULT_DATA_POINTS
]; 