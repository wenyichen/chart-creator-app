import React, { useRef, useState } from 'react';
import { DataPoint, ChartType } from '../types';

interface DataImportProps {
  onImportData: (dataPoints: DataPoint[]) => void;
  chartType: ChartType;
}

const DataImport: React.FC<DataImportProps> = ({ onImportData, chartType }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const parseCSV = (csvText: string): DataPoint[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const dataPoints: DataPoint[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const dataPoint: DataPoint = { label: '', value: '', x: '', y: '' };

      if (chartType === 'scatter') {
        // For scatter charts, look for x and y columns
        const xIndex = headers.findIndex(h => h === 'x' || h === 'x-axis' || h === 'x_value');
        const yIndex = headers.findIndex(h => h === 'y' || h === 'y-axis' || h === 'y_value');
        
        if (xIndex !== -1 && yIndex !== -1) {
          dataPoint.x = values[xIndex] || '';
          dataPoint.y = values[yIndex] || '';
        } else {
          // Fallback: use first two numeric columns
          const numericIndices = values
            .map((v, idx) => ({ value: v, index: idx }))
            .filter(({ value }) => !isNaN(Number(value)) && value !== '')
            .slice(0, 2);
          
          if (numericIndices.length >= 2) {
            dataPoint.x = numericIndices[0].value;
            dataPoint.y = numericIndices[1].value;
          }
        }
      } else {
        // For other chart types, look for label and value columns
        const labelIndex = headers.findIndex(h => 
          h === 'label' || h === 'name' || h === 'category' || h === 'title'
        );
        const valueIndex = headers.findIndex(h => 
          h === 'value' || h === 'amount' || h === 'count' || h === 'data'
        );

        if (labelIndex !== -1 && valueIndex !== -1) {
          dataPoint.label = values[labelIndex] || '';
          dataPoint.value = values[valueIndex] || '';
        } else {
          // Fallback: use first column as label, second as value
          dataPoint.label = values[0] || '';
          dataPoint.value = values[1] || '';
        }
      }

      // Only add data points that have valid data
      if (chartType === 'scatter') {
        if (dataPoint.x && dataPoint.y && !isNaN(Number(dataPoint.x)) && !isNaN(Number(dataPoint.y))) {
          dataPoints.push(dataPoint);
        }
      } else {
        if (dataPoint.label && dataPoint.value && !isNaN(Number(dataPoint.value))) {
          dataPoints.push(dataPoint);
        }
      }
    }

    if (dataPoints.length === 0) {
      throw new Error('No valid data points found in the CSV file');
    }

    return dataPoints;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      // Check file type
      if (!file.name.toLowerCase().endsWith('.csv')) {
        throw new Error('Please select a CSV file');
      }

      // Read file content
      const text = await file.text();
      const dataPoints = parseCSV(text);
      
      // Import the data
      onImportData(dataPoints);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import data');
    } finally {
      setIsImporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const getExpectedFormat = () => {
    if (chartType === 'scatter') {
      return 'CSV with columns: x, y (or first two numeric columns)';
    }
    return 'CSV with columns: label, value (or first two columns)';
  };

  return (
    <div className="form-group">
      <label>Import Data</label>
      <div className="import-section">
        <div className="import-info">
          <p className="import-description">
            Import your data from a CSV file. Expected format: {getExpectedFormat()}
          </p>
          <div className="import-example">
            <strong>Example format:</strong>
            {chartType === 'scatter' ? (
              <pre>{`x,y
1,5
2,8
3,12`}</pre>
            ) : (
              <pre>{`label,value
Category A,25
Category B,30
Category C,15`}</pre>
            )}
          </div>
        </div>
        
        <div className="import-controls">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleImportClick}
            disabled={isImporting}
          >
            {isImporting ? (
              <>
                <span className="loading-spinner-small"></span>
                <span>Importing...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
                <span>Import CSV</span>
              </>
            )}
          </button>
        </div>

        {importError && (
          <div className="import-error">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            {importError}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataImport; 