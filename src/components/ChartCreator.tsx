import React, { useState, useEffect, useRef } from 'react';
import { ChartData, ColorPalette, AdvancedSettings, DataPoint } from '../types';
import { validateChartData, convertToChartData, createDefaultAdvancedSettings, createDefaultCustomColors } from '../utils/chartUtils';
import ChartTypeSelector from './ChartTypeSelector';
import TitleInput from './TitleInput';
import ColorPaletteSelector from './ColorPaletteSelector';
import DataPointsInput from './DataPointsInput';
import AdvancedSettingsComponent from './AdvancedSettings';
import ChartControls from './ChartControls';

interface ChartCreatorProps {
  onChartCreate: (data: ChartData, type: 'bar' | 'pie', title: string, palette: ColorPalette, advancedSettings: AdvancedSettings) => void;
  selectedPalette: ColorPalette;
  colorPalettes: ColorPalette[];
  generateRandomTitle: () => string;
}

const ChartCreator: React.FC<ChartCreatorProps> = ({ 
  onChartCreate, 
  selectedPalette, 
  colorPalettes, 
  generateRandomTitle 
}) => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [chartTitle, setChartTitle] = useState('');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { label: 'Dragon Wings', value: '42' },
    { label: 'Magic Potions', value: '67' },
    { label: 'Stardust', value: '89' },
    { label: 'Rainbow Dreams', value: '34' },
    { label: 'Moonbeams', value: '56' }
  ]);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(selectedPalette);
  const [customColors, setCustomColors] = useState<string[]>(createDefaultCustomColors());
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>(createDefaultAdvancedSettings());
  
  // Track if initial chart has been created
  const hasInitialized = useRef(false);

  // Set a random title and generate initial chart on component mount
  useEffect(() => {
    if (hasInitialized.current) return; // Prevent multiple runs
    
    const title = generateRandomTitle();
    setChartTitle(title);
    
    // Generate chart after title is set
    if (dataPoints.length > 0 && dataPoints[0].label && dataPoints[0].value) {
      // Small delay to ensure all state is properly initialized
      const timer = setTimeout(() => {
        // Create chart data with the generated title
        const validation = validateChartData(dataPoints, title);
        if (validation.isValid) {
          const colors = useCustomColors ? customColors : currentPalette.colors;
          const chartData = convertToChartData(dataPoints, title, colors, advancedSettings);
          onChartCreate(chartData, chartType, title, currentPalette, advancedSettings);
          hasInitialized.current = true;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [dataPoints, chartType, currentPalette, customColors, useCustomColors, advancedSettings, generateRandomTitle, onChartCreate]);

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { label: '', value: '' }]);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      const newDataPoints = dataPoints.filter((_, i) => i !== index);
      setDataPoints(newDataPoints);
    }
  };

  const updateDataPoint = (index: number, field: keyof DataPoint, value: string) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index][field] = value;
    setDataPoints(newDataPoints);
  };

  const handlePaletteChange = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (palette) {
      setCurrentPalette(palette);
      setUseCustomColors(false);
    }
  };

  const handleCustomColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  const addCustomColor = () => {
    setCustomColors([...customColors, '#000000']);
  };

  const removeCustomColor = (index: number) => {
    if (customColors.length > 1) {
      const newColors = customColors.filter((_, i) => i !== index);
      setCustomColors(newColors);
    }
  };

  const handleGenerateTitle = () => {
    setChartTitle(generateRandomTitle());
  };

  const updateAdvancedSetting = (key: keyof AdvancedSettings, value: any) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateChart = () => {
    // Validate data
    const validation = validateChartData(dataPoints, chartTitle);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Use custom colors or selected palette
    const colors = useCustomColors ? customColors : currentPalette.colors;

    // Convert data for Chart.js
    const chartData = convertToChartData(dataPoints, chartTitle, colors, advancedSettings);

    onChartCreate(chartData, chartType, chartTitle, currentPalette, advancedSettings);
  };

  const handleClear = () => {
    setChartTitle(generateRandomTitle());
    setDataPoints([{ label: '', value: '' }]);
  };

  return (
    <div className="card">
      <h2>Chart Settings</h2>
      
      <ChartTypeSelector 
        chartType={chartType}
        onChartTypeChange={setChartType}
      />

      <TitleInput 
        chartTitle={chartTitle}
        onTitleChange={setChartTitle}
        onGenerateTitle={handleGenerateTitle}
      />

      <ColorPaletteSelector 
        colorPalettes={colorPalettes}
        currentPalette={currentPalette}
        useCustomColors={useCustomColors}
        customColors={customColors}
        onPaletteChange={handlePaletteChange}
        onUseCustomColorsChange={setUseCustomColors}
        onCustomColorChange={handleCustomColorChange}
        onAddCustomColor={addCustomColor}
        onRemoveCustomColor={removeCustomColor}
      />

      <DataPointsInput 
        dataPoints={dataPoints}
        onDataPointChange={updateDataPoint}
        onAddDataPoint={addDataPoint}
        onRemoveDataPoint={removeDataPoint}
      />

      <AdvancedSettingsComponent 
        advancedSettings={advancedSettings}
        onSettingChange={updateAdvancedSetting}
      />

      <ChartControls 
        onCreateChart={handleCreateChart}
        onClear={handleClear}
      />
    </div>
  );
};

export default ChartCreator; 