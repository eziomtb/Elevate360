import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Badge } from '../../types';
import { mockBadges } from '../../data/mockData';
import { 
  Award, 
  Calendar, 
  Edit, 
  Mail, 
  MapPin, 
  Save, 
  User as UserIcon, 
  Zap 
} from 'lucide-react';
import LevelProgressBar from '../../components/Gamification/LevelProgressBar';

const UserProfile = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    bio: '',
    location: 'San Francisco, CA',
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setBadges(mockBadges);
    
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department,
        position: user.position,
        bio: 'Software engineer passionate about creating intuitive user experiences and solving complex problems.',
        location: 'San Francisco, CA',
        skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
      });
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully.'
      });
      
      setIsEditing(false);
      setIsSubmitting(false);
    }, 1000);
  };
  
  const earnedBadges = badges.filter(badge => badge.unlockedAt);
  const lockedBadges = badges.filter(badge => !badge.unlockedAt);
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="px-4 py-5 sm:px-6 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Edit Profile</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your personal information
                  </p>
                </div>
                
                <div className="px-4 py-5 sm:px-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="department"
                          id="department"
                          value={profileData.department}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                        Position
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="position"
                          id="position"
                          value={profileData.position}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={profileData.bio}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile.
                      </p>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={profileData.location}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="px-4 py-5 sm:px-6 border-b">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {profileData.firstName} {profileData.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {profileData.position} • {profileData.department}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-5 sm:px-6 border-b">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700">{profileData.bio}</p>
                </div>
                
                <div className="px-4 py-5 sm:px-6 border-b">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{profileData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{profileData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">
                        Joined {new Date(user.joinedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="px-4 py-5 sm:px-6 border-b">
              <h2 className="text-lg font-medium text-gray-900">Badges</h2>
              <p className="mt-1 text-sm text-gray-500">
                Achievements and recognition earned
              </p>
            </div>
            
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Earned Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award size={32} className="text-purple-600" />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.rarity}</p>
                    </div>
                  </div>
                ))}
                
                {earnedBadges.length === 0 && (
                  <div className="col-span-full py-4 text-center text-gray-500">
                    No badges earned yet.
                  </div>
                )}
              </div>
              
              {lockedBadges.length > 0 && (
                <>
                  <h3 className="text-md font-medium text-gray-900 mb-3 mt-6">Locked Badges</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {lockedBadges.map(badge => (
                      <div key={badge.id} className="text-center opacity-50">
                        <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <Award size={32} className="text-gray-400" />
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                          <p className="text-xs text-gray-500">{badge.rarity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Level & XP</h2>
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                {user.level}
              </div>
            </div>
            <LevelProgressBar 
              level={user.level} 
              currentXP={user.xp} 
              nextLevelXP={100 * user.level} 
            />
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">How to earn XP</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between items-center">
                  <span>Complete a goal</span>
                  <span className="font-medium flex items-center">
                    <Zap size={14} className="text-yellow-500 mr-1" />
                    50 XP
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Complete a course</span>
                  <span className="font-medium flex items-center">
                    <Zap size={14} className="text-yellow-500 mr-1" />
                    30 XP
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Give feedback</span>
                  <span className="font-medium flex items-center">
                    <Zap size={14} className="text-yellow-500 mr-1" />
                    10 XP
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Receive positive feedback</span>
                  <span className="font-medium flex items-center">
                    <Zap size={14} className="text-yellow-500 mr-1" />
                    15 XP
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="feedback-notifications"
                      name="feedback-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="feedback-notifications" className="ml-2 block text-sm text-gray-700">
                      Feedback received
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="goal-notifications"
                      name="goal-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="goal-notifications" className="ml-2 block text-sm text-gray-700">
                      Goal deadlines
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="review-notifications"
                      name="review-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="review-notifications" className="ml-2 block text-sm text-gray-700">
                      Performance reviews
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="learning-notifications"
                      name="learning-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="learning-notifications" className="ml-2 block text-sm text-gray-700">
                      Learning recommendations
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Privacy Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="profile-visibility"
                      name="profile-visibility"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="profile-visibility" className="ml-2 block text-sm text-gray-700">
                      Show profile to team members
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="leaderboard-visibility"
                      name="leaderboard-visibility"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="leaderboard-visibility" className="ml-2 block text-sm text-gray-700">
                      Show on leaderboards
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;