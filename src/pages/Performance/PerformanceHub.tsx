import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Goal, Feedback } from '../../types';
import { mockGoals, mockFeedback } from '../../data/mockData';
import { 
  BarChart3, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Plus, 
  Target, 
  ThumbsUp 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import GoalCard from '../../components/Dashboard/GoalCard';
import FeedbackCard from '../../components/Dashboard/FeedbackCard';

const PerformanceHub = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<PerformanceOverview />} />
        <Route path="/goals" element={<GoalsList />} />
        <Route path="/goals/new" element={<GoalForm />} />
        <Route path="/goals/:id" element={<GoalDetail />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/new" element={<FeedbackForm />} />
        <Route path="/reviews" element={<ReviewsList />} />
      </Routes>
    </div>
  );
};

const PerformanceOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  
  useEffect(() => {
    // In a real app, these would be API calls
    setGoals(mockGoals.filter(goal => goal.userId === user?.id));
    setFeedback(mockFeedback.filter(f => f.toUserId === user?.id));
  }, [user]);
  
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'in-progress').length;
  const notStartedGoals = goals.filter(g => g.status === 'not-started').length;
  
  const positiveRatio = feedback.length > 0 
    ? Math.round((feedback.filter(f => f.type === 'praise').length / feedback.length) * 100) 
    : 0;
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Performance Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Goals</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-sm font-medium">{completedGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="text-sm font-medium">{inProgressGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Not Started</span>
              <span className="text-sm font-medium">{notStartedGoals}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => navigate('/performance/goals')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Goals
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Feedback</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Received</span>
              <span className="text-sm font-medium">{feedback.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Positive Ratio</span>
              <span className="text-sm font-medium">{positiveRatio}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Received</span>
              <span className="text-sm font-medium">
                {feedback.length > 0 
                  ? new Date(feedback[0].createdAt).toLocaleDateString() 
                  : 'N/A'}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => navigate('/performance/feedback')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Feedback
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Reviews</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Review</span>
              <span className="text-sm font-medium">July 15, 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Next Review</span>
              <span className="text-sm font-medium">January 15, 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overall Rating</span>
              <span className="text-sm font-medium">4.2/5.0</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => navigate('/performance/reviews')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Review History
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Your Goals
          </h2>
          <button
            onClick={() => navigate('/performance/goals/new')}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-1" />
            New Goal
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.slice(0, 3).map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
          
          {goals.length === 0 && (
            <div className="col-span-3 py-8 text-center text-gray-500">
              No goals set yet. Start by creating your first goal.
            </div>
          )}
        </div>
        
        {goals.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/performance/goals')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Goals
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 text-purple-600" size={20} />
            Recent Feedback
          </h2>
          <button
            onClick={() => navigate('/performance/feedback/new')}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Plus size={16} className="mr-1" />
            Request Feedback
          </button>
        </div>
        
        <div className="space-y-4">
          {feedback.slice(0, 3).map(item => (
            <FeedbackCard key={item.id} feedback={item} />
          ))}
          
          {feedback.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No feedback received yet.
            </div>
          )}
        </div>
        
        {feedback.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/performance/feedback')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Feedback
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart3 className="mr-2 text-green-600" size={20} />
            Performance Metrics
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">Goal Completion Rate</h3>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${goals.length > 0 ? (completedGoals / goals.length) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0%</span>
              <span>{goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0}%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">Feedback Sentiment</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${positiveRatio}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{positiveRatio}%</span>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Positive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                <span>Neutral/Constructive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'not-started', 'in-progress', 'completed'
  
  useEffect(() => {
    // In a real app, this would be an API call
    setGoals(mockGoals.filter(goal => goal.userId === user?.id));
  }, [user]);
  
  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    return goal.status === filter;
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Goals</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your personal and team goals
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'not-started'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-l border-gray-300`}
              onClick={() => setFilter('not-started')}
            >
              Not Started
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'in-progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-300`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <button
            onClick={() => navigate('/performance/goals/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-1" />
            New Goal
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map(goal => (
              <div 
                key={goal.id} 
                className="cursor-pointer"
                onClick={() => navigate(`/performance/goals/${goal.id}`)}
              >
                <GoalCard goal={goal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't created any goals yet." 
                : `You don't have any ${filter.replace('-', ' ')} goals.`}
            </p>
            <button
              onClick={() => navigate('/performance/goals/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} className="mr-1" />
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GoalForm = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'personal',
    dueDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Goal Created',
        message: 'Your new goal has been created successfully.'
      });
      
      navigate('/performance/goals');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/performance/goals')}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          ← Back to Goals
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Goal</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Goal Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Goal Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="personal">Personal</option>
                <option value="team">Team</option>
                <option value="department">Department</option>
                <option value="company">Company</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => navigate('/performance/goals')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Goal'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const GoalDetail = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call using the ID from params
    // For demo, just use the first goal
    setGoal(mockGoals[0]);
  }, []);
  
  const handleStatusUpdate = (newStatus: Goal['status']) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      if (goal) {
        const updatedGoal = {
          ...goal,
          status: newStatus,
          progress: newStatus === 'completed' ? 100 : goal.progress
        };
        setGoal(updatedGoal);
        
        addToast({
          type: 'success',
          title: 'Goal Updated',
          message: `Goal status updated to ${newStatus.replace('-', ' ')}.`
        });
      }
      setIsUpdating(false);
    }, 1000);
  };
  
  if (!goal) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/performance/goals')}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          ← Back to Goals
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{goal.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Created on {new Date(goal.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
              goal.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : goal.status === 'in-progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {goal.status.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Type</div>
              <div className="font-medium text-gray-900 capitalize">{goal.type}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Due Date</div>
              <div className="font-medium text-gray-900">
                {new Date(goal.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="font-medium text-gray-900">{goal.progress}%</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{goal.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Key Results</h3>
            <div className="space-y-4">
              {goal.keyResults.map(kr => (
                <div key={kr.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{kr.title}</h4>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Current: {kr.currentValue} {kr.unit}
                    </span>
                    <span className="text-sm text-gray-600">
                      Target: {kr.targetValue} {kr.unit}
                    </span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                      style={{ width: `${(kr.currentValue / kr.targetValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {goal.keyResults.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No key results defined for this goal.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <div className="relative w-full sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0%</span>
                <span className="text-xs text-gray-500">Progress: {goal.progress}%</span>
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/performance/goals/${goal.id}/edit`)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Goal
              </button>
              
              {goal.status !== 'in-progress' && (
                <button
                  onClick={() => handleStatusUpdate('in-progress')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    'Mark In Progress'
                  )}
                </button>
              )}
              
              {goal.status !== 'completed' && (
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState('received'); // 'received', 'given'
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (filter === 'received') {
      setFeedback(mockFeedback.filter(f => f.toUserId === user?.id));
    } else {
      setFeedback(mockFeedback.filter(f => f.fromUserId === user?.id));
    }
  }, [user, filter]);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
          <p className="text-gray-600 mt-1">
            View and manage feedback received and given
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === 'received'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
              onClick={() => setFilter('received')}
            >
              Received
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === 'given'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('given')}
            >
              Given
            </button>
          </div>
          
          <button
            onClick={() => navigate('/performance/feedback/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Plus size={16} className="mr-1" />
            {filter === 'received' ? 'Request Feedback' : 'Give Feedback'}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        {feedback.length > 0 ? (
          <div className="space-y-4">
            {feedback.map(item => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'received' 
                ? "You haven't received any feedback yet." 
                : "You haven't given any feedback yet."}
            </p>
            <button
              onClick={() => navigate('/performance/feedback/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus size={16} className="mr-1" />
              {filter === 'received' ? 'Request Feedback' : 'Give Feedback'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackForm = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    recipient: '',
    type: 'praise',
    content: '',
    visibility: 'public',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Feedback Sent',
        message: 'Your feedback has been sent successfully.'
      });
      
      navigate('/performance/feedback');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/performance/feedback')}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          ← Back to Feedback
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Give Feedback</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                Recipient
              </label>
              <select
                id="recipient"
                name="recipient"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={formData.recipient}
                onChange={handleChange}
                required
              >
                <option value="">Select a recipient</option>
                <option value="user-1">John Doe</option>
                <option value="user-2">Jane Smith</option>
                <option value="user-4">Alice Johnson</option>
                <option value="user-5">Charlie Lee</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Feedback Type
              </label>
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="radio"
                    id="praise"
                    name="type"
                    value="praise"
                    className="sr-only"
                    checked={formData.type === 'praise'}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="praise"
                    className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md cursor-pointer focus:outline-none ${
                      formData.type === 'praise'
                        ? 'bg-green-50 text-green-700 border-2 border-green-500'
                        : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <ThumbsUp size={16} className="mr-2" />
                    Praise
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="suggestion"
                    name="type"
                    value="suggestion"
                    className="sr-only"
                    checked={formData.type === 'suggestion'}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="suggestion"
                    className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md cursor-pointer focus:outline-none ${
                      formData.type === 'suggestion'
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                        : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Suggestion
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="concern"
                    name="type"
                    value="concern"
                    className="sr-only"
                    checked={formData.type === 'concern'}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="concern"
                    className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md cursor-pointer focus:outline-none ${
                      formData.type === 'concern'
                        ? 'bg-red-50 text-red-700 border-2 border-red-500'
                        : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Clock size={16} className="mr-2" />
                    Concern
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Feedback Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Provide your feedback here..."
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={formData.visibility}
                onChange={handleChange}
              >
                <option value="public">Public (visible to everyone)</option>
                <option value="private">Private (visible only to recipient)</option>
                <option value="anonymous">Anonymous (recipient won't know who sent it)</option>
              </select>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => navigate('/performance/feedback')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Feedback'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const ReviewsList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Performance Reviews</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Reviews</h2>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
            <h3 className="text-lg font-medium text-gray-900">Q1 2024 Performance Review</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Scheduled for January 15, 2024
            </p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Self-assessment</p>
                  <p className="text-sm text-gray-500">Due by January 10, 2024</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Manager Review</p>
                  <p className="text-sm text-gray-500">To be completed by January 15, 2024</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Not Started
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Review Meeting</p>
                  <p className="text-sm text-gray-500">To be scheduled after manager review</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Not Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Past Reviews</h2>
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Q3 2023 Performance Review</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Completed on July 15, 2023
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Overall Rating</h4>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} size={20} className="text-yellow-400 fill-current" />
                    ))}
                    <Star size={20} className="text-gray-300" />
                  </div>
                  <span className="ml-2 text-sm text-gray-700">4.0 out of 5</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-sm text-gray-700">
                  Consistently meets expectations with strong technical skills and good teamwork. 
                  Areas for improvement include proactive communication and taking more initiative 
                  on complex projects.
                </p>
              </div>
              
              <div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Full Review
                </button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Q1 2023 Performance Review</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Completed on January 20, 2023
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Overall Rating</h4>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} size={20} className="text-yellow-400 fill-current" />
                    ))}
                    {[5].map((star) => (
                      <Star key={star} size={20} className="text-gray-300" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-700">4.0 out of 5</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-sm text-gray-700">
                  Strong performance in core responsibilities with excellent problem-solving skills.
                  Demonstrated good collaboration with team members. Consider developing leadership
                  skills and mentoring junior team members.
                </p>
              </div>
              
              <div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Full Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceHub;