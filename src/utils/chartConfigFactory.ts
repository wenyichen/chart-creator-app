import { ChartData, AdvancedSettings, ChartType } from '../types';
import { DEFAULT_CHART_SETTINGS, CHART_FONTS, CHART_COLORS } from '../constants/chartDefaults';

export interface ChartConfigOptions {
  chartType: ChartType;
  chartData: ChartData;
  chartTitle: string;
  advancedSettings: AdvancedSettings;
}

export const createChartConfig = ({
  chartType,
  chartData,
  chartTitle,
  advancedSettings
}: ChartConfigOptions) => {
  const settings = advancedSettings || DEFAULT_CHART_SETTINGS;

  const baseConfig: any = {
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
              family: CHART_FONTS.legend.family,
              size: CHART_FONTS.legend.size
            },
            color: CHART_COLORS.legend,
            usePointStyle: true,
            padding: 20
          }
        },
        title: {
          display: true,
          text: chartTitle,
          font: {
            family: CHART_FONTS.title.family,
            size: CHART_FONTS.title.size,
            weight: CHART_FONTS.title.weight
          },
          color: CHART_COLORS.title,
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      elements: {
        bar: {
          borderRadius: settings.borderRadius,
          borderSkipped: false
        },
        arc: {
          borderWidth: settings.borderWidth
        },
        line: {
          tension: 0.4,
          borderWidth: settings.borderWidth,
          fill: true
        },
        point: {
          radius: 4,
          backgroundColor: CHART_COLORS.legend
        }
      }
    }
  };

  // Add scales configuration for bar, line, radar, and scatter charts
  if (chartType === 'bar' || chartType === 'line') {
    baseConfig.options.scales = {
      x: {
        display: true,
        grid: {
          display: settings.showGrid,
          color: settings.gridColor,
          lineWidth: 1
        },
        ticks: {
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
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
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        }
      }
    };
  }

  if (chartType === 'scatter') {
    baseConfig.options.scales = {
      x: {
        type: 'linear',
        position: 'bottom',
        display: true,
        grid: {
          display: settings.showGrid,
          color: settings.gridColor,
          lineWidth: 1
        },
        title: {
          display: true,
          text: 'X',
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        },
        ticks: {
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        }
      },
      y: {
        type: 'linear',
        display: true,
        grid: {
          display: settings.showGrid,
          color: settings.gridColor,
          lineWidth: 1
        },
        title: {
          display: true,
          text: 'Y',
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        },
        ticks: {
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        }
      }
    };
  }

  if (chartType === 'radar') {
    baseConfig.options.scales = {
      r: {
        angleLines: { display: true, color: settings.gridColor },
        grid: { color: settings.gridColor },
        pointLabels: {
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        },
        ticks: {
          font: {
            family: CHART_FONTS.axis.family,
            size: CHART_FONTS.axis.size
          },
          color: CHART_COLORS.axis
        }
      }
    };
  }

  return baseConfig;
}; 