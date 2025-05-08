import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Goal, Feedback, Course, NotificationItem } from '../../types';
import { 
  Award, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Flag, 
  GraduationCap, 
  MessageSquare, 
  Target, 
  ThumbsUp, 
  Zap 
} from 'lucide-react';
import StatCard from '../../components/Dashboard/StatCard';
import ProgressRing from '../../components/Dashboard/ProgressRing';
import GoalCard from '../../components/Dashboard/GoalCard';
import FeedbackCard from '../../components/Dashboard/FeedbackCard';
import LevelProgressBar from '../../components/Gamification/LevelProgressBar';
import NotificationList from '../../components/Notifications/NotificationList';
import { mockGoals, mockFeedback, mockNotifications, mockCourses } from '../../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    // In a real app, these would be API calls
    setGoals(mockGoals.filter(goal => goal.userId === user?.id).slice(0, 3));
    setFeedback(mockFeedback.filter(f => f.toUserId === user?.id).slice(0, 3));
    setNotifications(mockNotifications.filter(n => n.userId === user?.id));
    setCourses(mockCourses.slice(0, 3));
  }, [user]);

  // Calculate stats for the dashboard
  const stats = {
    goalsCompleted: goals.filter(g => g.status === 'completed').length,
    feedbackCount: feedback.length,
    averageFeedbackRating: 4.2,
    coursesInProgress: courses.filter(c => 
      c.enrollment.progress > 0 && !c.enrollment.completed
    ).length,
    coursesCompleted: courses.filter(c => c.enrollment.completed).length,
    kudosReceived: 12,
    teamRank: 3
  };

  const renderDashboardHeader = () => (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Hello, {user?.firstName} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <LevelProgressBar 
            level={user?.level || 1} 
            currentXP={user?.xp || 0} 
            nextLevelXP={100 * (user?.level || 1)}
          />
        </div>
      </div>
    </div>
  );

  const renderStatsSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Goals Completed" 
        value={stats.goalsCompleted} 
        icon={<CheckCircle2 className="text-green-500" />} 
        trend={7} 
      />
      <StatCard 
        title="Feedback Received" 
        value={stats.feedbackCount} 
        icon={<MessageSquare className="text-blue-500" />} 
        trend={3} 
      />
      <StatCard 
        title="Courses Completed" 
        value={stats.coursesCompleted} 
        icon={<GraduationCap className="text-purple-500" />} 
        trend={2} 
      />
      <StatCard 
        title="Kudos Received" 
        value={stats.kudosReceived} 
        icon={<ThumbsUp className="text-amber-500" />} 
        trend={5} 
      />
    </div>
  );

  const renderGoalsSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Target className="mr-2 text-blue-600" size={20} /> 
          Your Goals
        </h2>
        <Link 
          to="/performance/goals" 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
        {goals.length === 0 && (
          <div className="col-span-3 py-8 text-center text-gray-500">
            No goals set yet. Start by creating your first goal.
          </div>
        )}
      </div>
    </div>
  );

  const renderFeedbackSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <MessageSquare className="mr-2 text-teal-600" size={20} /> 
          Recent Feedback
        </h2>
        <Link 
          to="/performance/feedback" 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {feedback.map(item => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {feedback.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No feedback received yet.
          </div>
        )}
      </div>
    </div>
  );

  const renderLearningSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2 text-purple-600" size={20} /> 
          Learning Progress
        </h2>
        <Link 
          to="/learning" 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All Courses
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-800 truncate w-5/6">{course.title}</h3>
              <div className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                {course.difficulty}
              </div>
            </div>
            <div className="flex items-center mb-3">
              <ProgressRing 
                progress={course.enrollment.progress} 
                size={36} 
                strokeWidth={4} 
              />
              <div className="ml-3">
                <div className="text-sm text-gray-600">
                  {course.enrollment.completed 
                    ? 'Completed' 
                    : `${course.enrollment.progress}% complete`}
                </div>
                <div className="text-xs text-gray-500">{course.duration} min</div>
              </div>
            </div>
            <Link 
              to={`/learning/course/${course.id}`}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {course.enrollment.progress > 0 ? 'Continue' : 'Start'} Course →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGamificationSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <Award className="mr-2 text-amber-500" size={20} /> 
          Leaderboard Position
        </h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">#{stats.teamRank}</div>
            <p className="text-gray-600">in your department</p>
            <Link 
              to="/leaderboard" 
              className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
            >
              View Full Leaderboard
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <Zap className="mr-2 text-yellow-500" size={20} /> 
          XP Activities
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="text-gray-700">Complete daily check-in</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">+5 XP</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="text-gray-700">Give feedback to a team member</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">+10 XP</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="text-gray-700">Complete a course module</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">+20 XP</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {renderDashboardHeader()}
      
      {renderStatsSection()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {renderGoalsSection()}
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <BarChart3 className="mr-2 text-indigo-600" size={20} /> 
              Performance Summary
            </h2>
            <div className="flex justify-center">
              <ProgressRing 
                progress={78} 
                size={120} 
                strokeWidth={8} 
                label="Perf. Score" 
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Goals</div>
                <div className="font-semibold text-gray-800">85%</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Feedback</div>
                <div className="font-semibold text-gray-800">4.2/5</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Learning</div>
                <div className="font-semibold text-gray-800">92%</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Etiquette</div>
                <div className="font-semibold text-gray-800">100%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Flag className="mr-2 text-red-500" size={20} /> 
              Notifications
            </h2>
            <NotificationList notifications={notifications} />
          </div>
        </div>
      </div>
      
      {renderFeedbackSection()}
      
      {renderLearningSection()}
      
      {renderGamificationSection()}
    </div>
  );
};

export default Dashboard;