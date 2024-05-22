// ColorButtons.js
import React, { useState } from 'react';

const BackgroundColorPicker = ({ onColorChange }) => {
  const colors = ['#FF5733', '#3498DB', '#FFA500', '#800080']; // Example colors

  const handleColorClick = (color) => {
    onColorChange(color);
  };

  return (
    <div className="color-buttons">
      {colors.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        >
          {/* You can add labels or icons here */}
        </button>
      ))}
    </div>
  );
};

export default BackgroundColorPicker;
