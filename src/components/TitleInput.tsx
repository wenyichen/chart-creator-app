import React from 'react';

interface TitleInputProps {
  chartTitle: string;
  onTitleChange: (title: string) => void;
  onGenerateTitle: () => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ chartTitle, onTitleChange, onGenerateTitle }) => {
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
        />
        <button
          type="button"
          className="generate-title-btn"
          onClick={onGenerateTitle}
          title="Generate random title"
        >
          🎲
        </button>
      </div>
    </div>
  );
};

export default TitleInput; 