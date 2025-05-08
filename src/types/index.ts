export type UserRole = 'admin' | 'hr-manager' | 'team-lead' | 'employee' | 'intern' | 'guest';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  joinedAt: string;
  managerId?: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  type: 'personal' | 'team' | 'department' | 'company';
  parentGoalId?: string;
  keyResults: KeyResult[];
}

export interface KeyResult {
  id: string;
  goalId: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  type: 'praise' | 'suggestion' | 'concern';
  visibility: 'public' | 'private' | 'anonymous';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  createdAt: string;
  enrollment: {
    enrolled: boolean;
    progress: number; // 0-100
    completed: boolean;
    lastAccessed?: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'performance' | 'learning' | 'etiquette' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlockedAt?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  department: string;
  position: string;
  rank: number;
  badgeCount: number;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
}