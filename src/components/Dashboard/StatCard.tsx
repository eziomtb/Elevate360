import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number; // Positive for up, negative for down, undefined for no trend
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 transform transition-transform hover:scale-102 duration-200">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {trend !== undefined && (
            <div className="flex items-center mt-1">
              {trend > 0 ? (
                <>
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+{trend}% from last period</span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className="text-red-500 mr-1" />
                  <span className="text-xs text-red-600">{trend}% from last period</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="p-2 rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;