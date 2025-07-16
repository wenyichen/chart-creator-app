import React, { memo, useState } from 'react';
import { FiSettings, FiChevronDown, FiChevronRight, FiPlay, FiRefreshCw } from 'react-icons/fi';
import ChartTypeSelector from './ChartTypeSelector';
import TitleInput from './TitleInput';
import ColorPaletteSelector from './ColorPaletteSelector';
import DataPointsInput from './DataPointsInput';
import DataImport from './DataImport';
import AdvancedSettings from './AdvancedSettings';
import { ChartData, ColorPalette, AdvancedSettings as AdvancedSettingsType, ChartType } from '../types';
import { useChartState } from '../hooks/useChartState';

interface ChartCreatorProps {
  onChartCreate: (data: ChartData, type: ChartType, title: string, palette: ColorPalette, settings: AdvancedSettingsType) => void;
  selectedPalette: ColorPalette;
  colorPalettes: ColorPalette[];
  generateRandomTitle: () => string;
}

const ChartCreator: React.FC<ChartCreatorProps> = memo(({ 
  onChartCreate, 
  selectedPalette, 
  colorPalettes, 
  generateRandomTitle 
}) => {
  const {
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
    setChartTitle,
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
  } = useChartState({ onChartCreate, selectedPalette, generateRandomTitle });

  // Collapsible section state
  const [advancedSectionOpen, setAdvancedSectionOpen] = useState(false);

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
        error={titleError}
      />
      
      <ColorPaletteSelector 
        colorPalettes={colorPalettes}
        currentPalette={currentPalette}
        useCustomColors={useCustomColors}
        customColors={customColors}
        onPaletteChange={(paletteId) => handlePaletteChange(paletteId, colorPalettes)}
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
        onClearAll={clearAllDataPoints}
        chartType={chartType}
        dataPointErrors={dataPointErrors}
        generalError={generalError}
      />
      
      <DataImport 
        onImportData={importData}
        chartType={chartType}
      />

      {/* Collapsible Advanced Settings Section */}
      <div className="collapsible-section">
        <button
          type="button"
          className="collapsible-header"
          onClick={() => setAdvancedSectionOpen(!advancedSectionOpen)}
          aria-expanded={advancedSectionOpen}
        >
          <div className="header-content">
            <FiSettings size={20} />
            <span>Advanced Settings</span>
          </div>
          {advancedSectionOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
        </button>
        
        {advancedSectionOpen && (
          <AdvancedSettings 
            advancedSettings={advancedSettings}
            onSettingChange={updateAdvancedSetting}
          />
        )}
      </div>

      <div className="chart-controls">
        <button className="btn btn-success" onClick={handleCreateChart}>
          <FiPlay />
          <span>Create Chart</span>
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          <FiRefreshCw />
          <span>Reset Chart</span>
        </button>
      </div>
    </div>
  );
});

ChartCreator.displayName = 'ChartCreator';

export default ChartCreator; 