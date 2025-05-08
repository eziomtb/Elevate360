import React from 'react';
import { NotificationItem } from '../../types';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationListProps {
  notifications: NotificationItem[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'info':
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex items-start p-2 rounded-md ${
              !notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="ml-2 flex-1">
              <p className="text-sm font-medium text-gray-800">{notification.title}</p>
              <p className="text-xs text-gray-600 mt-0.5">{notification.content}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatTime(notification.createdAt)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-6 text-center text-gray-500 text-sm">
          No notifications yet
        </div>
      )}
    </div>
  );
};

export default NotificationList;