import React from 'react';
import { Feedback } from '../../types';
import { ThumbsUp, Lightbulb, AlertCircle, User } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const senderName = () => {
    if (feedback.visibility === 'anonymous') {
      return 'Anonymous';
    }
    
    const sender = mockUsers.find(u => u.id === feedback.fromUserId);
    return sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown User';
  };
  
  const getTypeIcon = () => {
    switch (feedback.type) {
      case 'praise':
        return <ThumbsUp size={16} className="text-green-500" />;
      case 'suggestion':
        return <Lightbulb size={16} className="text-amber-500" />;
      case 'concern':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getTypeLabel = () => {
    switch (feedback.type) {
      case 'praise':
        return 'Praise';
      case 'suggestion':
        return 'Suggestion';
      case 'concern':
        return 'Concern';
      default:
        return 'Feedback';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {feedback.visibility === 'anonymous' ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              {senderName().split(' ').map(name => name[0]).join('')}
            </div>
          )}
          
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900">{senderName()}</p>
            <p className="text-xs text-gray-500">{formatDate(feedback.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
          {getTypeIcon()}
          <span className="text-xs ml-1 text-gray-700">
            {getTypeLabel()}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700">
        {feedback.content}
      </p>
    </div>
  );
};

export default FeedbackCard;