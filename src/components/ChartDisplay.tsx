import React, { useRef, memo } from 'react';
import { FiMaximize2, FiDownload } from 'react-icons/fi';
import { ChartData, AdvancedSettings, ChartType } from '../types';
import { useChartInstance } from '../hooks/useChartInstance';

interface ChartDisplayProps {
  chartData: ChartData | null;
  chartType: ChartType;
  chartTitle: string;
  advancedSettings: AdvancedSettings | null;
  isLoading?: boolean;
  onFullscreenClick?: () => void;
}

const ChartDisplay: React.FC<ChartDisplayProps> = memo(({ 
  chartData, 
  chartType, 
  chartTitle,
  advancedSettings,
  isLoading = false,
  onFullscreenClick
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  const { downloadChart } = useChartInstance({
    chartData,
    chartType,
    chartTitle,
    advancedSettings,
    canvasRef: chartRef
  });

  const handleChartClick = () => {
    if (chartData && onFullscreenClick) {
      onFullscreenClick();
    }
  };

  if (isLoading) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Generating your chart...</div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="chart-container">
        <div className="chart-placeholder">
          <h3>Chart Preview</h3>
          <p>Add some data to see your chart here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Chart Preview</h2>
      <div className="chart-container" onClick={handleChartClick}>
        <canvas 
          ref={chartRef} 
          style={{ 
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '600px',
            aspectRatio: `${advancedSettings?.width || 800} / ${advancedSettings?.height || 400}`
          }}
        />
        <div className="fullscreen-overlay">
          <FiMaximize2 size={24} />
        </div>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button className="btn btn-icon download-btn" onClick={downloadChart} aria-label="Download Chart" title="Download Chart">
          <FiDownload />
        </button>
      </div>
    </div>
  );
});

ChartDisplay.displayName = 'ChartDisplay';

export default ChartDisplay; 