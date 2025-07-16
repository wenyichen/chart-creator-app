import React from 'react';
import { FiShuffle, FiAlertCircle } from 'react-icons/fi';

interface TitleInputProps {
  chartTitle: string;
  onTitleChange: (title: string) => void;
  onGenerateTitle: () => void;
  error?: string | null;
}

const TitleInput: React.FC<TitleInputProps> = ({ chartTitle, onTitleChange, onGenerateTitle, error }) => {
  return (
    <div className="form-group">
      <label htmlFor="chartTitle">Chart Title</label>
      <div className="title-input-group">
        <input
          type="text"
          id="chartTitle"
          value={chartTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter chart title"
          className={error ? 'input-error' : ''}
        />
        <button
          type="button"
          className="generate-title-btn"
          onClick={onGenerateTitle}
          title="Generate random title"
        >
          <FiShuffle />
        </button>
      </div>
      {error && (
        <div className="field-error" role="alert">
          <FiAlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TitleInput; 