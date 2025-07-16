import React from 'react';
import { AdvancedSettings as AdvancedSettingsType } from '../types';

type SettingValue = string | number | boolean;

interface AdvancedSettingsProps {
  advancedSettings: AdvancedSettingsType;
  onSettingChange: (key: keyof AdvancedSettingsType, value: SettingValue) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ advancedSettings, onSettingChange }) => {
  return (
    <div className="settings-grid">
      {/* Chart Dimensions */}
      <div className="settings-group">
        <h4>Dimensions</h4>
        <div className="setting-row">
          <label htmlFor="chartWidth">Width (px)</label>
          <input
            type="number"
            id="chartWidth"
            value={advancedSettings.width}
            onChange={(e) => onSettingChange('width', parseInt(e.target.value) || 800)}
            min="200"
            max="2000"
          />
        </div>
        <div className="setting-row">
          <label htmlFor="chartHeight">Height (px)</label>
          <input
            type="number"
            id="chartHeight"
            value={advancedSettings.height}
            onChange={(e) => onSettingChange('height', parseInt(e.target.value) || 400)}
            min="200"
            max="2000"
          />
        </div>
        <div className="setting-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={advancedSettings.maintainAspectRatio}
              onChange={(e) => onSettingChange('maintainAspectRatio', e.target.checked)}
            />
            <span>Maintain Aspect Ratio</span>
          </label>
        </div>
      </div>

      {/* Animation Settings */}
      <div className="settings-group">
        <h4>Animation</h4>
        <div className="setting-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={advancedSettings.animation}
              onChange={(e) => onSettingChange('animation', e.target.checked)}
            />
            <span>Enable Animation</span>
          </label>
        </div>
        <div className="setting-row">
          <label htmlFor="animationDuration">Duration (ms)</label>
          <input
            type="number"
            id="animationDuration"
            value={advancedSettings.animationDuration}
            onChange={(e) => onSettingChange('animationDuration', parseInt(e.target.value) || 1000)}
            min="0"
            max="5000"
            step="100"
          />
        </div>
      </div>

      {/* Grid Settings */}
      <div className="settings-group">
        <h4>Grid & Styling</h4>
        <div className="setting-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={advancedSettings.showGrid}
              onChange={(e) => onSettingChange('showGrid', e.target.checked)}
            />
            <span>Show Grid</span>
          </label>
        </div>
        <div className="setting-row">
          <label htmlFor="gridColor">Grid Color</label>
          <input
            type="color"
            id="gridColor"
            value={advancedSettings.gridColor}
            onChange={(e) => onSettingChange('gridColor', e.target.value)}
          />
        </div>
        <div className="setting-row">
          <label htmlFor="borderWidth">Border Width</label>
          <input
            type="number"
            id="borderWidth"
            value={advancedSettings.borderWidth}
            onChange={(e) => onSettingChange('borderWidth', parseInt(e.target.value) || 1)}
            min="0"
            max="10"
          />
        </div>
        <div className="setting-row">
          <label htmlFor="borderRadius">Border Radius</label>
          <input
            type="number"
            id="borderRadius"
            value={advancedSettings.borderRadius}
            onChange={(e) => onSettingChange('borderRadius', parseInt(e.target.value) || 0)}
            min="0"
            max="50"
          />
        </div>
        <div className="setting-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={advancedSettings.shadow}
              onChange={(e) => onSettingChange('shadow', e.target.checked)}
            />
            <span>Enable Shadow</span>
          </label>
        </div>
      </div>

      {/* Legend Settings */}
      <div className="settings-group">
        <h4>Legend</h4>
        <div className="setting-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={advancedSettings.showLegend}
              onChange={(e) => onSettingChange('showLegend', e.target.checked)}
            />
            <span>Show Legend</span>
          </label>
        </div>
        <div className="setting-row">
          <label htmlFor="legendPosition">Position</label>
          <select
            id="legendPosition"
            value={advancedSettings.legendPosition}
            onChange={(e) => onSettingChange('legendPosition', e.target.value as 'top' | 'bottom' | 'left' | 'right')}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings; 