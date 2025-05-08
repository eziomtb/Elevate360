import React from 'react';
import { Zap } from 'lucide-react';

interface LevelProgressBarProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ 
  level, 
  currentXP, 
  nextLevelXP 
}) => {
  const percentComplete = Math.min(100, (currentXP / nextLevelXP) * 100);
  
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items-center">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0">
        {level}
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium text-gray-700">Level {level}</div>
          <div className="flex items-center text-xs text-yellow-600 font-medium">
            <Zap size={14} className="mr-1 text-yellow-500" />
            {currentXP}/{nextLevelXP} XP
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgressBar;