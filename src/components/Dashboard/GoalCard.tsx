import React from 'react';
import { Goal } from '../../types';
import { Dot, Calendar, ChevronsUp } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const getStatusColor = () => {
    switch (goal.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-lg hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor()}`}>
            {goal.status.replace('-', ' ')}
          </span>
          
          {goal.type !== 'personal' && (
            <span className="flex items-center text-xs text-gray-500">
              <ChevronsUp size={14} className="mr-1" />
              {goal.type}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {goal.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          Due: {formatDate(goal.dueDate)}
        </div>
      </div>
      
      <div className="mt-auto px-4 pb-4">
        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Progress</span>
          <span>{goal.progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;