import React from 'react';
import { FiPlus, FiTrash2, FiX, FiAlertCircle } from 'react-icons/fi';
import { DataPoint, ChartType } from '../types';

interface DataPointsInputProps {
  dataPoints: DataPoint[];
  onDataPointChange: (index: number, field: keyof DataPoint, value: string) => void;
  onAddDataPoint: () => void;
  onRemoveDataPoint: (index: number) => void;
  onClearAll: () => void;
  chartType: ChartType;
  dataPointErrors?: Map<number, string>;
  generalError?: string | null;
}

const DataPointsInput: React.FC<DataPointsInputProps> = ({
  dataPoints,
  onDataPointChange,
  onAddDataPoint,
  onRemoveDataPoint,
  onClearAll,
  chartType,
  dataPointErrors,
  generalError
}) => {
  return (
    <div className="form-group">
      <label>Data Points</label>
      {dataPoints.map((point, index) => (
        <div key={index} className="data-input" data-point-index={index}>
          <div className="data-input-fields">
            {chartType === 'scatter' ? (
              <>
                <input
                  type="number"
                  placeholder="X"
                  value={point.x ?? ''}
                  onChange={(e) => onDataPointChange(index, 'x', e.target.value)}
                  className={dataPointErrors?.has(index) ? 'input-error' : ''}
                />
                <input
                  type="number"
                  placeholder="Y"
                  value={point.y ?? ''}
                  onChange={(e) => onDataPointChange(index, 'y', e.target.value)}
                  className={dataPointErrors?.has(index) ? 'input-error' : ''}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Label"
                  value={point.label}
                  onChange={(e) => onDataPointChange(index, 'label', e.target.value)}
                  className={dataPointErrors?.has(index) ? 'input-error' : ''}
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={point.value}
                  onChange={(e) => onDataPointChange(index, 'value', e.target.value)}
                  className={dataPointErrors?.has(index) ? 'input-error' : ''}
                />
              </>
            )}
            {dataPoints.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemoveDataPoint(index)}
                title="Remove data point"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      ))}
      
      {/* Error messages displayed below all data inputs */}
      {generalError && (
        <div className="field-error general-error" role="alert">
          <FiAlertCircle size={14} />
          <span>{generalError}</span>
        </div>
      )}
      
      {Array.from(dataPointErrors?.entries() || []).map(([index, error]) => (
        <div key={`error-${index}`} className="field-error data-point-error" role="alert">
          <FiAlertCircle size={14} />
          <span>Row {index + 1}: {error}</span>
        </div>
      ))}
      
      <div className="data-controls">
        <button type="button" className="add-btn" onClick={onAddDataPoint} title="Add Data Point">
          <FiPlus />
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClearAll}>
          <FiTrash2 />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default DataPointsInput; 