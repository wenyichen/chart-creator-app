import { useState, useEffect, useRef } from 'react';
import { ChartData, DataPoint, ColorPalette, AdvancedSettings, ChartType } from '../types';
import { validateChartData, convertToChartData, ValidationResult } from '../utils/chartUtils';
import { DEFAULT_DATA_POINTS, DEFAULT_CUSTOM_COLORS, DEFAULT_CHART_SETTINGS } from '../constants/chartDefaults';

type SettingValue = string | number | boolean;

interface UseChartStateProps {
  onChartCreate: (data: ChartData, type: ChartType, title: string, palette: ColorPalette, settings: AdvancedSettings) => void;
  selectedPalette: ColorPalette;
  generateRandomTitle: () => string;
}

export const useChartState = ({ onChartCreate, selectedPalette, generateRandomTitle }: UseChartStateProps) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [chartTitle, setChartTitle] = useState('');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([...DEFAULT_DATA_POINTS]);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(selectedPalette);
  const [customColors, setCustomColors] = useState<string[]>([...DEFAULT_CUSTOM_COLORS]);
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({ ...DEFAULT_CHART_SETTINGS });
  
  // Updated error tracking for field-level errors
  const [titleError, setTitleError] = useState<string | null>(null);
  const [dataPointErrors, setDataPointErrors] = useState<Map<number, string>>(new Map());
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const hasInitialized = useRef(false);

  // Helper function to process validation results
  const processValidationResult = (result: ValidationResult) => {
    // Clear existing errors
    setTitleError(null);
    setDataPointErrors(new Map());
    setGeneralError(null);

    if (!result.isValid) {
      result.errors.forEach(error => {
        if (error.field === 'title') {
          setTitleError(error.message);
        } else if (error.field === 'dataPoint' && error.index !== undefined) {
          setDataPointErrors(prev => new Map(prev).set(error.index!, error.message));
        } else if (error.field === 'dataPoints') {
          setGeneralError(error.message);
        }
      });
    }
  };

  // Auto-generate initial chart
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const title = generateRandomTitle();
    setChartTitle(title);
    
    if (dataPoints.length > 0 && ((dataPoints[0].label && dataPoints[0].value) || (dataPoints[0].x && dataPoints[0].y))) {
      const timer = setTimeout(() => {
        const validation = validateChartData(dataPoints, title, chartType);
        if (validation.isValid) {
          const colors = useCustomColors ? customColors : currentPalette.colors;
          const chartData = convertToChartData(dataPoints, title, colors, advancedSettings, chartType);
          onChartCreate(chartData, chartType, title, currentPalette, advancedSettings);
          hasInitialized.current = true;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [dataPoints, chartType, currentPalette, customColors, useCustomColors, advancedSettings, generateRandomTitle, onChartCreate]);

  const addDataPoint = () => {
    setDataPoints(prev => [...prev, { label: '', value: '' }]);
  };

  const removeDataPoint = (index: number) => {
    setDataPoints(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
    // Clear error for removed data point
    setDataPointErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(index);
      // Adjust indices for remaining points
      const adjustedErrors = new Map();
      newErrors.forEach((error, idx) => {
        if (idx > index) {
          adjustedErrors.set(idx - 1, error);
        } else {
          adjustedErrors.set(idx, error);
        }
      });
      return adjustedErrors;
    });
  };

  const updateDataPoint = (index: number, field: keyof DataPoint, value: string) => {
    setDataPoints(prev => {
      const newDataPoints = [...prev];
      newDataPoints[index] = { ...newDataPoints[index], [field]: value };
      return newDataPoints;
    });
    
    // Clear error for this data point when user starts typing
    if (dataPointErrors.has(index)) {
      setDataPointErrors(prev => {
        const newErrors = new Map(prev);
        newErrors.delete(index);
        return newErrors;
      });
    }
  };

  const handlePaletteChange = (paletteId: string, colorPalettes: ColorPalette[]) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (palette) {
      setCurrentPalette(palette);
      setUseCustomColors(false);
    }
  };

  const handleCustomColorChange = (index: number, color: string) => {
    setCustomColors(prev => {
      const newColors = [...prev];
      newColors[index] = color;
      return newColors;
    });
  };

  const addCustomColor = () => {
    setCustomColors(prev => [...prev, '#000000']);
  };

  const removeCustomColor = (index: number) => {
    setCustomColors(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  };

  const handleGenerateTitle = () => {
    setChartTitle(generateRandomTitle());
    // Clear title error when user generates a title
    setTitleError(null);
  };

  const handleTitleChange = (title: string) => {
    setChartTitle(title);
    // Clear title error when user starts typing
    if (titleError && title.trim()) {
      setTitleError(null);
    }
  };

  const updateAdvancedSetting = (key: keyof AdvancedSettings, value: SettingValue) => {
    setAdvancedSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateChart = () => {
    const validation = validateChartData(dataPoints, chartTitle, chartType);
    
    if (!validation.isValid) {
      processValidationResult(validation);
      
      // Focus on the first error field
      if (validation.errors.length > 0) {
        const firstError = validation.errors[0];
        setTimeout(() => {
          if (firstError.field === 'title') {
            const titleInput = document.getElementById('chartTitle');
            titleInput?.focus();
          } else if (firstError.field === 'dataPoint' && firstError.index !== undefined) {
            const dataInput = document.querySelector(`[data-point-index="${firstError.index}"] input`);
            if (dataInput instanceof HTMLElement) {
              dataInput.focus();
            }
          }
        }, 100);
      }
      return;
    }
    
    // Clear all errors on successful validation
    processValidationResult({ isValid: true, errors: [] });
    
    const colors = useCustomColors ? customColors : currentPalette.colors;
    const chartData = convertToChartData(dataPoints, chartTitle, colors, advancedSettings, chartType);
    onChartCreate(chartData, chartType, chartTitle, currentPalette, advancedSettings);
  };

  const handleClear = () => {
    // Reset everything to initial state
    setChartType('bar');
    setChartTitle('');
    setDataPoints([...DEFAULT_DATA_POINTS]);
    setCurrentPalette(selectedPalette);
    setCustomColors([...DEFAULT_CUSTOM_COLORS]);
    setUseCustomColors(false);
    setAdvancedSettings({ ...DEFAULT_CHART_SETTINGS });
    
    // Clear all errors
    setTitleError(null);
    setDataPointErrors(new Map());
    setGeneralError(null);
    
    // Reset initialization flag so the auto-generate effect runs again
    hasInitialized.current = false;
  };

  const clearAllDataPoints = () => {
    setDataPoints(prev => {
      // Keep only the first data point and clear its values
      if (prev.length > 0) {
        return [{ label: '', value: '', x: '', y: '' }];
      }
      return prev;
    });
    // Clear all data point errors
    setDataPointErrors(new Map());
    setGeneralError(null);
  };

  const importData = (importedDataPoints: DataPoint[]) => {
    setDataPoints(importedDataPoints);
    // Clear all errors on data import
    setTitleError(null);
    setDataPointErrors(new Map());
    setGeneralError(null);
  };

  return {
    // State
    chartType,
    chartTitle,
    dataPoints,
    currentPalette,
    customColors,
    useCustomColors,
    advancedSettings,
    // Field-level errors
    titleError,
    dataPointErrors,
    generalError,
    // Setters
    setChartType,
    setChartTitle: handleTitleChange,
    setUseCustomColors,
    // Actions
    addDataPoint,
    removeDataPoint,
    updateDataPoint,
    handlePaletteChange,
    handleCustomColorChange,
    addCustomColor,
    removeCustomColor,
    handleGenerateTitle,
    updateAdvancedSetting,
    handleCreateChart,
    handleClear,
    clearAllDataPoints,
    importData
  };
}; 