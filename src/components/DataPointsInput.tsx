import React from 'react';
import { DataPoint } from '../types';

interface DataPointsInputProps {
  dataPoints: DataPoint[];
  onDataPointChange: (index: number, field: keyof DataPoint, value: string) => void;
  onAddDataPoint: () => void;
  onRemoveDataPoint: (index: number) => void;
}

const DataPointsInput: React.FC<DataPointsInputProps> = ({
  dataPoints,
  onDataPointChange,
  onAddDataPoint,
  onRemoveDataPoint
}) => {
  return (
    <div className="form-group">
      <label>Data Points</label>
      {dataPoints.map((point, index) => (
        <div key={index} className="data-input">
          <input
            type="text"
            placeholder="Label"
            value={point.label}
            onChange={(e) => onDataPointChange(index, 'label', e.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={point.value}
            onChange={(e) => onDataPointChange(index, 'value', e.target.value)}
          />
          {dataPoints.length > 1 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => onRemoveDataPoint(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={onAddDataPoint}>
        Add Data Point
      </button>
    </div>
  );
};

export default DataPointsInput; 