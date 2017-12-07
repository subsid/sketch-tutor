import React from 'react';

function DrawingLine({ line }) {
  const pathData = "M " +
    line
      .map(p => p.x + ' ' + p.y)
      .join(" L ");

  return <path className="path" d={pathData} />;
}

export default DrawingLine;
