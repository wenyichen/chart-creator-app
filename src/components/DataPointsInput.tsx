import React, { useMemo, useRef, useEffect } from 'react';
import { FiPlus, FiTrash2, FiX, FiAlertCircle, FiChevronDown, FiList } from 'react-icons/fi';
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
  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Count valid and invalid data points for summary
  const { validCount, invalidCount } = useMemo(() => {
    let valid = 0;
    let invalid = 0;

    dataPoints.forEach((point, index) => {
      const hasError = dataPointErrors?.has(index);
      if (chartType === 'scatter') {
        const hasValidData = point.x && point.y && !isNaN(Number(point.x)) && !isNaN(Number(point.y));
        if (hasError || !hasValidData) invalid++;
        else valid++;
      } else {
        const hasValidData = point.label && point.value && !isNaN(Number(point.value));
        if (hasError || !hasValidData) invalid++;
        else valid++;
      }
    });

    return { validCount: valid, invalidCount: invalid };
  }, [dataPoints, dataPointErrors, chartType]);

  // Auto-scroll to bottom when new data points are added
  useEffect(() => {
    if (scrollContainerRef.current && dataPoints.length > 0) {
      // Use a small delay to ensure DOM has updated
      const timeoutId = setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          // Scroll to the bottom with smooth behavior
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [dataPoints.length]); // Only trigger when the number of data points changes

  return (
    <div className="form-group">
      <div className="data-points-header">
        <label className="data-points-label">
          <FiList className="data-points-icon" />
          <span>Data Points</span>
        </label>
        {dataPoints.length > 0 && (
          <div className="data-points-summary">
            <span className="data-count">{dataPoints.length} total</span>
            {validCount > 0 && <span className="valid-count">{validCount} valid</span>}
            {invalidCount > 0 && <span className="invalid-count">{invalidCount} invalid</span>}
          </div>
        )}
      </div>

      {/* Scrollable data points container */}
      <div className={`data-points-container scrollable`}>
        <div className="scroll-indicator">
          <FiChevronDown className="scroll-hint" />
          <span>Scroll to see more items</span>
        </div>

        <div className="data-points-list" ref={scrollContainerRef}>
          {dataPoints.map((point, index) => (
            <div key={index} className="data-input" data-point-index={index}>
              <div className="data-input-header">
                <span className="data-point-number">#{index + 1}</span>
                {dataPointErrors?.has(index) && (
                  <FiAlertCircle className="error-indicator" size={14} />
                )}
              </div>
              <div className="data-input-fields">
                {chartType === 'scatter' ? (
                  <>
                    <input
                      type="number"
                      placeholder="X value"
                      value={point.x ?? ''}
                      onChange={(e) => onDataPointChange(index, 'x', e.target.value)}
                      className={dataPointErrors?.has(index) ? 'input-error' : ''}
                      aria-label={`X value for data point ${index + 1}`}
                    />
                    <input
                      type="number"
                      placeholder="Y value"
                      value={point.y ?? ''}
                      onChange={(e) => onDataPointChange(index, 'y', e.target.value)}
                      className={dataPointErrors?.has(index) ? 'input-error' : ''}
                      aria-label={`Y value for data point ${index + 1}`}
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
                      aria-label={`Label for data point ${index + 1}`}
                    />
                    <input
                      type="number"
                      placeholder="Value"
                      value={point.value}
                      onChange={(e) => onDataPointChange(index, 'value', e.target.value)}
                      className={dataPointErrors?.has(index) ? 'input-error' : ''}
                      aria-label={`Value for data point ${index + 1}`}
                    />
                  </>
                )}
                {dataPoints.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-small btn-danger remove-btn"
                    onClick={() => onRemoveDataPoint(index)}
                    title={`Remove data point ${index + 1}`}
                    aria-label={`Remove data point ${index + 1}`}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-fade-bottom"></div>
      </div>

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
        <button
          type="button"
          className="btn btn-icon btn-success add-btn"
          onClick={onAddDataPoint}
          title="Add Data Point"
          aria-label="Add new data point"
        >
          <FiPlus />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClearAll}
          aria-label="Clear all data points"
        >
          <FiTrash2 />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default DataPointsInput; 