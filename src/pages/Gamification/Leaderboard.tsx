import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, Badge } from '../../types';
import { mockLeaderboard, mockBadges } from '../../data/mockData';
import { 
  Award, 
  BarChart3, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Medal, 
  Star, 
  Zap 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [timeFilter, setTimeFilter] = useState('all-time'); // 'all-time', 'monthly', 'weekly'
  const [departmentFilter, setDepartmentFilter] = useState('all'); // 'all', 'engineering', 'product', etc.
  const [sortBy, setSortBy] = useState('rank'); // 'rank', 'level', 'xp', 'badges'
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    // In a real app, these would be API calls
    setLeaderboard(mockLeaderboard);
    setBadges(mockBadges);
  }, []);
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  const filteredLeaderboard = leaderboard
    .filter(entry => {
      if (departmentFilter === 'all') return true;
      return entry.department.toLowerCase() === departmentFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'level':
          comparison = a.level - b.level;
          break;
        case 'xp':
          comparison = a.xp - b.xp;
          break;
        case 'badges':
          comparison = a.badgeCount - b.badgeCount;
          break;
        default:
          comparison = a.rank - b.rank;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  const userRank = leaderboard.find(entry => entry.userId === user?.id)?.rank || 0;
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
          <p className="text-gray-600 mt-1">
            See how you rank against your colleagues
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="relative inline-block">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all-time">All Time</option>
              <option value="monthly">This Month</option>
              <option value="weekly">This Week</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="relative inline-block">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="executive">Executive</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('rank')}
                    >
                      <div className="flex items-center">
                        <span>Rank</span>
                        {sortBy === 'rank' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('level')}
                    >
                      <div className="flex items-center">
                        <span>Level</span>
                        {sortBy === 'level' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('xp')}
                    >
                      <div className="flex items-center">
                        <span>XP</span>
                        {sortBy === 'xp' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('badges')}
                    >
                      <div className="flex items-center">
                        <span>Badges</span>
                        {sortBy === 'badges' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeaderboard.map((entry) => (
                    <tr 
                      key={entry.userId} 
                      className={entry.userId === user?.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {entry.rank <= 3 ? (
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                              entry.rank === 1 
                                ? 'bg-yellow-100 text-yellow-600' 
                                : entry.rank === 2 
                                  ? 'bg-gray-100 text-gray-600' 
                                  : 'bg-amber-100 text-amber-600'
                            }`}>
                              <Medal size={16} />
                            </div>
                          ) : (
                            <div className="text-center font-medium text-gray-700 w-8">
                              {entry.rank}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {entry.firstName[0]}{entry.lastName[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {entry.firstName} {entry.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {entry.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                            {entry.level}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Zap size={16} className="mr-1 text-yellow-500" />
                          {entry.xp} XP
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Award size={16} className="mr-1 text-purple-500" />
                          {entry.badgeCount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Ranking</h2>
            
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-blue-600 mb-2">#{userRank}</div>
              <p className="text-gray-600">Your current rank</p>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">Level</span>
                </div>
                <span className="font-semibold">{user?.level || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-700">XP</span>
                </div>
                <span className="font-semibold">{user?.xp || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-700">Badges</span>
                </div>
                <span className="font-semibold">{badges.filter(b => b.unlockedAt).length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Badges</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {badges
                .filter(badge => badge.unlockedAt)
                .slice(0, 3)
                .map(badge => (
                  <div key={badge.id} className="flex items-start">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <Award size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(badge.unlockedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              
              {badges.filter(badge => badge.unlockedAt).length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No badges earned yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart3 className="mr-2 text-blue-600" size={20} />
            Leaderboard Insights
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Top Performers</h3>
            <p className="text-sm text-gray-600 mb-3">
              The top performers consistently complete goals ahead of schedule and actively participate in learning activities.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">XP Earning Tips</h3>
            <p className="text-sm text-gray-600 mb-3">
              To earn more XP, focus on completing courses, providing quality feedback, and achieving your goals on time.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Badge Collection</h3>
            <p className="text-sm text-gray-600 mb-3">
              Rare badges can significantly boost your ranking. Look for special events and challenges to earn unique badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;