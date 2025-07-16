import { AdvancedSettings } from '../types';

export const DEFAULT_CHART_SETTINGS: AdvancedSettings = {
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

export const DEFAULT_CUSTOM_COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
  '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
];

export const DEFAULT_DATA_POINTS = [
  { label: 'Dragon Wings', value: '42' },
  { label: 'Magic Potions', value: '67' },
  { label: 'Stardust', value: '89' },
  { label: 'Rainbow Dreams', value: '34' },
  { label: 'Moonbeams', value: '56' }
];

export const CHART_FONTS = {
  title: {
    family: 'Playfair Display, serif',
    size: 18,
    weight: 'bold'
  },
  legend: {
    family: 'Source Serif Pro, serif',
    size: 12
  },
  axis: {
    family: 'Source Serif Pro, serif',
    size: 11
  }
} as const;

export const CHART_COLORS = {
  title: '#1A1A1A',
  legend: '#374151',
  axis: '#6B7280'
} as const; 