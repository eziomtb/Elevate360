import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import { mockUsers } from '../../data/mockData';
import { useToast } from '../../contexts/ToastContext';
import { 
  ChevronDown,
  ChevronUp,
  Filter,
  Plus,
  Search,
  UserPlus 
} from 'lucide-react';

const TeamManagement = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'role', 'department'
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTeamMembers(mockUsers.filter(u => u.managerId === user?.id));
  }, [user]);
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Invitation Sent',
        message: `An invitation has been sent to ${inviteEmail}`
      });
      setInviteEmail('');
      setIsInviting(false);
    }, 1000);
  };
  
  const filteredMembers = teamMembers
    .filter(member => {
      const searchLower = searchQuery.toLowerCase();
      return (
        member.firstName.toLowerCase().includes(searchLower) ||
        member.lastName.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.position.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'department':
          comparison = a.department.localeCompare(b.department);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Team Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your team members and their roles
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => document.getElementById('invite-modal')?.showModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus size={16} className="mr-2" />
            Invite Team Member
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 max-w-sm">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  
