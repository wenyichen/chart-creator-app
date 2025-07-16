import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartData, AdvancedSettings } from '../types';

Chart.register(...registerables);

interface ChartDisplayProps {
  chartData: ChartData | null;
  chartType: 'bar' | 'pie';
  chartTitle: string;
  advancedSettings: AdvancedSettings | null;
  isLoading?: boolean;
  onFullscreenClick?: () => void;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  chartData, 
  chartType, 
  chartTitle,
  advancedSettings,
  isLoading = false,
  onFullscreenClick
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartData || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const defaultSettings: AdvancedSettings = {
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
    };

    const settings = advancedSettings || defaultSettings;

    const config: any = {
      type: chartType,
      data: chartData,
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: settings.animation ? {
          duration: settings.animationDuration
        } : false,
        plugins: {
          legend: {
            display: settings.showLegend,
            position: settings.legendPosition,
            labels: {
              font: {
                family: 'Source Serif Pro, serif',
                size: 12
              },
              color: '#374151',
              usePointStyle: true,
              padding: 20
            }
          },
          title: {
            display: true,
            text: chartTitle,
            font: {
              family: 'Playfair Display, serif',
              size: 18,
              weight: 'bold'
            },
            color: '#1A1A1A',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
        scales: chartType === 'bar' ? {
          x: {
            display: true,
            grid: {
              display: settings.showGrid,
              color: settings.gridColor,
              lineWidth: 1
            },
            ticks: {
              font: {
                family: 'Source Serif Pro, serif',
                size: 11
              },
              color: '#6B7280'
            }
          },
          y: {
            display: true,
            grid: {
              display: settings.showGrid,
              color: settings.gridColor,
              lineWidth: 1
            },
            ticks: {
              font: {
                family: 'Source Serif Pro, serif',
                size: 11
              },
              color: '#6B7280'
            }
          }
        } : undefined,
        elements: {
          bar: {
            borderRadius: settings.borderRadius,
            borderSkipped: false
          },
          arc: {
            borderWidth: settings.borderWidth
          }
        }
      }
    };

    // Set canvas dimensions before creating chart
    if (chartRef.current) {
      chartRef.current.width = settings.width;
      chartRef.current.height = settings.height;
    }

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, chartType, chartTitle, advancedSettings]);

  const downloadChart = () => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const link = document.createElement('a');
      link.download = `${chartTitle || 'chart'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M8 21H5C3.89543 21 3 20.1046 3 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button className="btn download-btn" onClick={downloadChart} aria-label="Download Chart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChartDisplay; 