import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Award, 
  BarChart3, 
  BookOpen, 
  Home, 
  MessageCircle, 
  Settings, 
  Target, 
  User, 
  Users,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const isHR = user?.role === 'hr-manager';
  const isManager = user?.role === 'team-lead';
  
  const NavItem = ({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) => {
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
    
    return (
      <Link
        to={to}
        className={`flex items-center px-4 py-3 text-sm rounded-lg mb-1 transition-colors ${
          isActive
            ? 'text-blue-700 bg-blue-50 font-medium'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={closeSidebar}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center" onClick={closeSidebar}>
            <Award className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Elevate 360</span>
          </Link>
          <button
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            onClick={closeSidebar}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="px-3 py-4 overflow-y-auto">
          <NavItem to="/" label="Dashboard" icon={<Home size={20} />} />
          <NavItem to="/performance" label="Performance" icon={<Target size={20} />} />
          <NavItem to="/learning" label="Learning" icon={<BookOpen size={20} />} />
          <NavItem to="/etiquette" label="Etiquette" icon={<MessageCircle size={20} />} />
          <NavItem to="/leaderboard" label="Leaderboard" icon={<BarChart3 size={20} />} />
          <NavItem to="/profile" label="My Profile" icon={<User size={20} />} />
          
          {/* Admin section */}
          {(isAdmin || isHR || isManager) && (
            <div className="mt-8 mb-2">
              <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </div>
              
              {isAdmin && (
                <NavItem to="/admin" label="Admin Panel" icon={<Settings size={20} />} />
              )}
              
              {(isHR || isManager) && (
                <NavItem to="/admin/team" label="Team Management" icon={<Users size={20} />} />
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;