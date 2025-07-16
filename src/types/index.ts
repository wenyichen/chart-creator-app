export type ChartType = 'bar' | 'pie' | 'line' | 'doughnut' | 'radar' | 'scatter';

export interface DataPoint {
  label: string;
  value: string;
  x?: string;
  y?: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export interface AdvancedSettings {
  width: number;
  height: number;
  animation: boolean;
  animationDuration: number;
  showGrid: boolean;
  gridColor: string;
  showLegend: boolean;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  borderWidth: number;
  borderRadius: number;
  shadow: boolean;
  maintainAspectRatio: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | { x: number; y: number }[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    borderRadius?: number;
    fill?: boolean;
    tension?: number;
    showLine?: boolean;
    // Add any other Chart.js dataset options as needed
  }>;
} 