import React from 'react';

interface ProgressRingProps {
  progress: number; // 0-100
  size: number;
  strokeWidth: number;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size, 
  strokeWidth,
  label 
}) => {
  // Ensure progress is between 0-100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Calculate parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedProgress / 100) * circumference;
  
  // Determine color based on progress
  const getColor = () => {
    if (normalizedProgress < 30) return '#EF4444'; // red
    if (normalizedProgress < 70) return '#F59E0B'; // amber
    return '#10B981'; // green
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-semibold text-gray-800">
          {normalizedProgress}%
        </span>
        {label && (
          <span className="text-xs text-gray-500">{label}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;