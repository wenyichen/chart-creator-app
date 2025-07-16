import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { Chart, registerables } from 'chart.js';
import { ChartData, AdvancedSettings, ChartType } from '../types';

Chart.register(...registerables);

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartData | null;
  chartType: ChartType;
  chartTitle: string;
  advancedSettings: AdvancedSettings | null;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  chartData,
  chartType,
  chartTitle,
  advancedSettings
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Render chart in fullscreen
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartData || !chartRef.current || !isOpen) return;

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
                size: 14
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
              size: 24,
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
                size: 13
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
                size: 13
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
  }, [chartData, chartType, chartTitle, advancedSettings, isOpen]);

  // Handle click outside modal to close
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fullscreen-modal ${isOpen ? 'active' : ''}`} onClick={handleBackdropClick}>
      <div className="fullscreen-modal-content">
        <button
          type="button"
          className="fullscreen-modal-close"
          onClick={onClose}
          aria-label="Close fullscreen view"
        >
          <FiX size={24} />
        </button>
        
        <div className="fullscreen-chart-container">
          {chartData ? (
            <canvas 
              ref={chartRef}
              style={{ 
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '90vh',
                aspectRatio: `${advancedSettings?.width || 800} / ${advancedSettings?.height || 400}`
              }}
            />
          ) : (
            <div className="chart-placeholder">
              <h3>Chart Preview</h3>
              <p>No chart data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullscreenModal; 