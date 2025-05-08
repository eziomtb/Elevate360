import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { mockCourses } from '../../data/mockData';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Filter, 
  GraduationCap, 
  Search, 
  Tag, 
  Zap 
} from 'lucide-react';
import ProgressRing from '../../components/Dashboard/ProgressRing';

const LearningHub = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<LearningOverview />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/catalog" element={<CourseCatalog />} />
      </Routes>
    </div>
  );
};

const LearningOverview = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setCourses(mockCourses);
  }, []);
  
  const inProgressCourses = courses.filter(
    course => course.enrollment.progress > 0 && !course.enrollment.completed
  );
  
  const completedCourses = courses.filter(
    course => course.enrollment.completed
  );
  
  const recommendedCourses = courses.filter(
    course => !course.enrollment.enrolled
  ).slice(0, 3);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Learning Hub</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="mr-2 text-blue-600" size={20} />
            My Learning
          </h2>
          
          <div className="mt-3 md:mt-0 flex items-center">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => navigate('/learning/catalog')}
            >
              <Filter size={16} className="mr-1" />
              Browse Catalog
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-800">{inProgressCourses.length}</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-800">{completedCourses.length}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <GraduationCap size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-purple-600">Total XP Earned</p>
              <p className="text-2xl font-bold text-purple-800">250</p>
            </div>
          </div>
        </div>
        
        {inProgressCourses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Continue Learning</h3>
              <Link 
                to="/learning/my-courses" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressCourses.slice(0, 3).map(course => (
                <div 
                  key={course.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/learning/course/${course.id}`)}
                >
                  <div className="h-32 bg-gray-200 relative">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {course.difficulty}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ProgressRing 
                          progress={course.enrollment.progress} 
                          size={36} 
                          strokeWidth={4} 
                        />
                        <div className="ml-2">
                          <div className="text-sm text-gray-700">{course.enrollment.progress}% complete</div>
                          <div className="text-xs text-gray-500">{course.duration} min</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        Continue
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Recommended For You</h3>
            <Link 
              to="/learning/catalog" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map(course => (
              <div 
                key={course.id} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/learning/course/${course.id}`)}
              >
                <div className="h-32 bg-gray-200 relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {course.difficulty}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {course.duration} min
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {course.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Tag className="mr-2 text-indigo-600" size={20} />
          Popular Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Programming')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Programming</h3>
            <p className="text-sm text-gray-500">12 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Development+Practices')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Development Practices</h3>
            <p className="text-sm text-gray-500">8 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Project+Management')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Project Management</h3>
            <p className="text-sm text-gray-500">6 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Soft+Skills')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Soft Skills</h3>
            <p className="text-sm text-gray-500">10 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Leadership')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Leadership</h3>
            <p className="text-sm text-gray-500">5 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Design')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Design</h3>
            <p className="text-sm text-gray-500">7 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog?category=Data+Science')}
          >
            <h3 className="font-medium text-gray-800 mb-1">Data Science</h3>
            <p className="text-sm text-gray-500">9 courses</p>
          </div>
          
          <div 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/learning/catalog')}
          >
            <h3 className="font-medium text-gray-800 mb-1">View All</h3>
            <p className="text-sm text-gray-500">42 courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call using the ID from params
    // For demo, just use the first course
    setCourse(mockCourses[1]);
  }, []);
  
  const handleEnroll = () => {
    setIsEnrolling(true);
    
    // Simulate API call
    setTimeout(() => {
      if (course) {
        const updatedCourse = {
          ...course,
          enrollment: {
            ...course.enrollment,
            enrolled: true,
            progress: 0
          }
        };
        setCourse(updatedCourse);
        
        addToast({
          type: 'success',
          title: 'Enrolled Successfully',
          message: `You have been enrolled in "${course.title}".`
        });
      }
      setIsEnrolling(false);
    }, 1000);
  };
  
  const handleContinue = () => {
    addToast({
      type: 'info',
      message: 'Course content would load here in a real application.'
    });
  };
  
  if (!course) {
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
          onClick={() => navigate('/learning')}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          ← Back to Learning Hub
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-48 md:h-64 bg-gray-200 relative">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {course.difficulty}
                </span>
                <span className="mx-2 text-white">•</span>
                <span className="text-white text-sm flex items-center">
                  <Clock size={14} className="mr-1" />
                  {course.duration} min
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About this course</h2>
                <p className="text-gray-700">{course.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">What you'll learn</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Understand key concepts and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Apply techniques to real-world scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Implement optimizations in your projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Troubleshoot common issues effectively</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Course content</h2>
                <div className="border rounded-lg divide-y">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Module 1: Introduction</h3>
                      <span className="text-sm text-gray-500">15 min</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Module 2: Core Concepts</h3>
                      <span className="text-sm text-gray-500">25 min</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Module 3: Advanced Techniques</h3>
                      <span className="text-sm text-gray-500">30 min</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Module 4: Practical Application</h3>
                      <span className="text-sm text-gray-500">20 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-72 flex-shrink-0">
              <div className="border rounded-lg p-4 sticky top-6">
                {course.enrollment.enrolled ? (
                  <div>
                    <div className="mb-4 flex justify-center">
                      <ProgressRing 
                        progress={course.enrollment.progress} 
                        size={80} 
                        strokeWidth={8} 
                        label="Complete" 
                      />
                    </div>
                    
                    <button
                      onClick={handleContinue}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {course.enrollment.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <Zap size={20} className="text-yellow-500 mr-1" />
                        <span className="text-lg font-semibold">Earn 50 XP</span>
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        Complete this course to earn XP and level up
                      </p>
                    </div>
                    
                    <button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isEnrolling ? (
                        <>
                          <div className="animate-spin mr-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Enrolling...
                        </>
                      ) : (
                        'Enroll Now'
                      )}
                    </button>
                  </div>
                )}
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Course includes:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                      {course.duration} minutes of content
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                      4 modules
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                      Practical exercises
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                      Completion certificate
                    </li>
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'in-progress', 'completed'
  
  useEffect(() => {
    // In a real app, this would be an API call
    setCourses(mockCourses.filter(course => course.enrollment.enrolled));
  }, []);
  
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') return course.enrollment.progress > 0 && !course.enrollment.completed;
    if (filter === 'completed') return course.enrollment.completed;
    return true;
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-600 mt-1">
            Track your learning progress
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
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
                filter === 'in-progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
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
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/learning/course/${course.id}`)}
              >
                <div className="h-32 bg-gray-200 relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {course.difficulty}
                  </div>
                  {course.enrollment.completed && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        Completed
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ProgressRing 
                        progress={course.enrollment.progress} 
                        size={36} 
                        strokeWidth={4} 
                      />
                      <div className="ml-2">
                        <div className="text-sm text-gray-700">
                          {course.enrollment.completed 
                            ? 'Completed' 
                            : `${course.enrollment.progress}% complete`}
                        </div>
                        <div className="text-xs text-gray-500">{course.duration} min</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      {course.enrollment.completed ? 'Review' : 'Continue'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't enrolled in any courses yet." 
                : filter === 'in-progress' 
                  ? "You don't have any courses in progress." 
                  : "You haven't completed any courses yet."}
            </p>
            <button
              onClick={() => navigate('/learning/catalog')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setCourses(mockCourses);
  }, []);
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Catalog</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by title, description, or tags"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Development Practices">Development Practices</option>
              <option value="Project Management">Project Management</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/learning/course/${course.id}`)}
              >
                <div className="h-32 bg-gray-200 relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {course.difficulty}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {course.duration} min
                    </div>
                    
                    <div className="flex items-center">
                      {course.enrollment.enrolled ? (
                        <span className="text-sm text-blue-600 font-medium">
                          {course.enrollment.completed ? 'Completed' : 'Enrolled'}
                        </span>
                      ) : (
                        <span className="text-sm text-blue-600 font-medium">
                          Enroll
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;