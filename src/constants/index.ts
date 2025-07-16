import { ColorPalette } from '../types';

// Pre-defined color palettes
export const colorPalettes: ColorPalette[] = [
  {
    id: 'classic',
    name: 'Classic',
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF']
  },
  {
    id: 'earth',
    name: 'Earth Tones',
    colors: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F4A460', '#D2691E', '#B8860B', '#DAA520']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#1E3A8A', '#3B82F6', '#06B6D4', '#0891B2', '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD']
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#FF6B6B', '#FF8E53', '#FFA726', '#FFB74D', '#FFCC02', '#FFD54F', '#FFE082', '#FFF3E0']
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#2E7D32', '#388E3C', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9', '#E8F5E8']
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: ['#2C3E50', '#34495E', '#5D6D7E', '#85929E', '#AEB6BF', '#D5DBDB', '#E8E8E8', '#F8F9F9']
  }
];

// Creative chart titles
export const creativeTitles = [
  "The Symphony of Numbers",
  "Data's Dance Through Time",
  "Whispers of the Metrics",
  "The Canvas of Quantities",
  "Echoes in the Analytics",
  "The Tapestry of Trends",
  "Rhythms of the Real",
  "The Poetry of Patterns",
  "Shadows of Statistics",
  "The Melody of Measurements",
  "Chronicles of Change",
  "The Alchemy of Analysis",
  "Dreams in Data",
  "The Cartography of Counts",
  "Songs of the Spreadsheet",
  "The Archaeology of Averages",
  "Whispers from the Workbook",
  "The Geometry of Growth",
  "Tales from the Table",
  "The Constellation of Calculations",
  "Echoes of the Excel",
  "The Mosaic of Metrics",
  "Symphony of the Stats",
  "The Atlas of Averages",
  "Chronicles of the Chart",
  "The Sonnet of Statistics",
  "Whispers of the Worksheet",
  "The Ballet of the Bar",
  "Tales of the Trend",
  "The Ode to Observations",
  "The Fable of the Figures",
  "Songs of the Survey",
  "The Legend of the Line",
  "The Epic of the Excel",
  "The Saga of the Stats",
  "The Myth of the Metrics",
  "The Ballad of the Bar",
  "The Romance of the Ratio",
  "The Comedy of the Count",
  "The Tragedy of the Trend"
];

export const generateRandomTitle = (): string => {
  return creativeTitles[Math.floor(Math.random() * creativeTitles.length)];
}; 