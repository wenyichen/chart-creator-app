import { useState } from 'react';
import ChartCreator from './components/ChartCreator';
import ChartDisplay from './components/ChartDisplay';
import FullscreenModal from './components/FullscreenModal';
import ErrorBoundary from './components/ErrorBoundary';
import { ColorPalette, AdvancedSettings, ChartData, ChartType } from './types';
import { colorPalettes, generateRandomTitle } from './constants';
import './App.css';

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [chartTitle, setChartTitle] = useState('');
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(colorPalettes[0]);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const handleChartCreate = async (data: ChartData, type: ChartType, title: string, palette: ColorPalette, settings: AdvancedSettings) => {
    setChartData(data);
    setChartType(type);
    setChartTitle(title);
    setSelectedPalette(palette);
    setAdvancedSettings(settings);
  };

  const handleFullscreenClick = () => {
    setIsFullscreenOpen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <div className="container">
          <div className="header">
            <h1>Chart Creator</h1>
            <p>Create beautiful bar, pie, line, doughnut, radar, and scatter charts with your data</p>
          </div>
          
          <div className="main-content">
            <ChartCreator 
              onChartCreate={handleChartCreate} 
              selectedPalette={selectedPalette}
              colorPalettes={colorPalettes}
              generateRandomTitle={generateRandomTitle}
            />
            <ChartDisplay 
              chartData={chartData} 
              chartType={chartType} 
              chartTitle={chartTitle}
              advancedSettings={advancedSettings}
              onFullscreenClick={handleFullscreenClick}
            />
          </div>
        </div>

        <FullscreenModal
          isOpen={isFullscreenOpen}
          onClose={handleCloseFullscreen}
          chartData={chartData}
          chartType={chartType}
          chartTitle={chartTitle}
          advancedSettings={advancedSettings}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App; 