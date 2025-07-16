import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartData, AdvancedSettings, ChartType } from '../types';
import { createChartConfig } from '../utils/chartConfigFactory';

Chart.register(...registerables);

interface UseChartInstanceProps {
  chartData: ChartData | null;
  chartType: ChartType;
  chartTitle: string;
  advancedSettings: AdvancedSettings | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useChartInstance = ({
  chartData,
  chartType,
  chartTitle,
  advancedSettings,
  canvasRef
}: UseChartInstanceProps) => {
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (!chartData || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const settings = advancedSettings || {
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

    if (canvasRef.current) {
      canvasRef.current.width = settings.width;
      canvasRef.current.height = settings.height;
    }

    // Create chart configuration
    const config = createChartConfig({
      chartType,
      chartData,
      chartTitle,
      advancedSettings: settings
    });

    // Create new chart instance
    chartInstance.current = new Chart(ctx, config);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartData, chartType, chartTitle, advancedSettings, canvasRef]);

  const downloadChart = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = `${chartTitle || 'chart'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return {
    downloadChart
  };
}; 