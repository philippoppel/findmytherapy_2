import React from "react";

export const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const width = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress-track">
      <div className="progress-bar" style={{ width: `${width}%` }} />
    </div>
  );
};
