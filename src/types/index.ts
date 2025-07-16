export interface DataPoint {
  label: string;
  value: string;
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
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    borderRadius?: number;
  }>;
} 