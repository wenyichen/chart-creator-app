import React from 'react';
import { ColorPalette } from '../types';

interface ColorPaletteSelectorProps {
  colorPalettes: ColorPalette[];
  currentPalette: ColorPalette;
  useCustomColors: boolean;
  customColors: string[];
  onPaletteChange: (paletteId: string) => void;
  onUseCustomColorsChange: (useCustom: boolean) => void;
  onCustomColorChange: (index: number, color: string) => void;
  onAddCustomColor: () => void;
  onRemoveCustomColor: (index: number) => void;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({
  colorPalettes,
  currentPalette,
  useCustomColors,
  customColors,
  onPaletteChange,
  onUseCustomColorsChange,
  onCustomColorChange,
  onAddCustomColor,
  onRemoveCustomColor
}) => {
  return (
    <div className="form-group">
      <label>Color Palette</label>
      <div className="palette-selector">
        <div className="palette-options">
          {colorPalettes.map((palette) => (
            <button
              key={palette.id}
              type="button"
              className={`palette-option ${currentPalette.id === palette.id && !useCustomColors ? 'active' : ''}`}
              onClick={() => onPaletteChange(palette.id)}
            >
              <div className="palette-preview">
                {palette.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>{palette.name}</span>
            </button>
          ))}
        </div>
        
        <div className="custom-colors-section">
          <label className="custom-colors-toggle">
            <input
              type="checkbox"
              checked={useCustomColors}
              onChange={(e) => onUseCustomColorsChange(e.target.checked)}
            />
            <span>Use Custom Colors</span>
          </label>
          
          {useCustomColors && (
            <div className="custom-colors-grid">
              {customColors.map((color, index) => (
                <div key={index} className="custom-color-item">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => onCustomColorChange(index, e.target.value)}
                    className="color-picker"
                  />
                  {customColors.length > 1 && (
                    <button
                      type="button"
                      className="remove-color-btn"
                      onClick={() => onRemoveCustomColor(index)}
                      title="Remove this color"
                      aria-label={`Remove color ${index + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-icon btn-blue add-color-btn"
                onClick={onAddCustomColor}
                title="Add new color"
              >
                <span>+</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteSelector; 