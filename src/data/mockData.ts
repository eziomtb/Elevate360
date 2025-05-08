import { User, Goal, Feedback, NotificationItem, Course, Badge, LeaderboardEntry, Policy } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'johndoe',
    email: 'admin@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    department: 'Executive',
    position: 'CTO',
    level: 8,
    xp: 750,
    joinedAt: '2020-01-15T00:00:00Z',
  },
  {
    id: 'user-2',
    username: 'janesmith',
    email: 'manager@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'team-lead',
    department: 'Engineering',
    position: 'Engineering Manager',
    level: 6,
    xp: 520,
    joinedAt: '2020-03-10T00:00:00Z',
    managerId: 'user-1'
  },
  {
    id: 'user-3',
    username: 'bobwilson',
    email: 'employee@example.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    level: 4,
    xp: 320,
    joinedAt: '2021-02-05T00:00:00Z',
    managerId: 'user-2'
  },
  {
    id: 'user-4',
    username: 'alicejohnson',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'employee',
    department: 'Product',
    position: 'Product Manager',
    level: 5,
    xp: 410,
    joinedAt: '2021-01-20T00:00:00Z',
    managerId: 'user-1'
  },
  {
    id: 'user-5',
    username: 'charlielee',
    email: 'charlie@example.com',
    firstName: 'Charlie',
    lastName: 'Lee',
    role: 'intern',
    department: 'Engineering',
    position: 'Developer Intern',
    level: 2,
    xp: 150,
    joinedAt: '2022-06-01T00:00:00Z',
    managerId: 'user-2'
  }
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: 'user-3',
    title: 'Complete React Advanced Course',
    description: 'Finish the advanced React course to improve frontend development skills',
    status: 'in-progress',
    progress: 65,
    dueDate: '2023-12-15T00:00:00Z',
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z',
    type: 'personal',
    keyResults: [
      {
        id: 'kr-1',
        goalId: 'goal-1',
        title: 'Complete all course modules',
        targetValue: 12,
        currentValue: 8,
        unit: 'modules',
        createdAt: '2023-09-01T00:00:00Z',
        updatedAt: '2023-10-15T00:00:00Z'
      },
      {
        id: 'kr-2',
        goalId: 'goal-1',
        title: 'Build a sample project',
        targetValue: 1,
        currentValue: 0,
        unit: 'projects',
        createdAt: '2023-09-01T00:00:00Z',
        updatedAt: '2023-10-15T00:00:00Z'
      }
    ]
  },
  {
    id: 'goal-2',
    userId: 'user-3',
    title: 'Improve Code Review Process',
    description: 'Implement a more efficient code review process for the team',
    status: 'in-progress',
    progress: 40,
    dueDate: '2023-11-30T00:00:00Z',
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2023-10-10T00:00:00Z',
    type: 'team',
    keyResults: [
      {
        id: 'kr-3',
        goalId: 'goal-2',
        title: 'Document code review guidelines',
        targetValue: 1,
        currentValue: 1,
        unit: 'documents',
        createdAt: '2023-08-15T00:00:00Z',
        updatedAt: '2023-09-20T00:00:00Z'
      },
      {
        id: 'kr-4',
        goalId: 'goal-2',
        title: 'Reduce average review time',
        targetValue: 24,
        currentValue: 36,
        unit: 'hours',
        createdAt: '2023-08-15T00:00:00Z',
        updatedAt: '2023-10-10T00:00:00Z'
      }
    ]
  },
  {
    id: 'goal-3',
    userId: 'user-3',
    title: 'Mentor Junior Developers',
    description: 'Provide mentorship to junior team members to help them grow',
    status: 'not-started',
    progress: 0,
    dueDate: '2024-01-31T00:00:00Z',
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2023-10-01T00:00:00Z',
    type: 'personal',
    keyResults: [
      {
        id: 'kr-5',
        goalId: 'goal-3',
        title: 'Weekly 1:1 sessions',
        targetValue: 12,
        currentValue: 0,
        unit: 'sessions',
        createdAt: '2023-10-01T00:00:00Z',
        updatedAt: '2023-10-01T00:00:00Z'
      }
    ]
  },
  {
    id: 'goal-4',
    userId: 'user-3',
    title: 'Reduce Application Load Time',
    description: 'Optimize the application to improve load time performance',
    status: 'completed',
    progress: 100,
    dueDate: '2023-09-30T00:00:00Z',
    createdAt: '2023-07-15T00:00:00Z',
    updatedAt: '2023-09-25T00:00:00Z',
    type: 'team',
    keyResults: [
      {
        id: 'kr-6',
        goalId: 'goal-4',
        title: 'Reduce initial load time',
        targetValue: 2,
        currentValue: 1.5,
        unit: 'seconds',
        createdAt: '2023-07-15T00:00:00Z',
        updatedAt: '2023-09-25T00:00:00Z'
      },
      {
        id: 'kr-7',
        goalId: 'goal-4',
        title: 'Implement code splitting',
        targetValue: 1,
        currentValue: 1,
        unit: 'implementation',
        createdAt: '2023-07-15T00:00:00Z',
        updatedAt: '2023-09-10T00:00:00Z'
      }
    ]
  }
];

// Mock Feedback
export const mockFeedback: Feedback[] = [
  {
    id: 'feedback-1',
    fromUserId: 'user-2',
    toUserId: 'user-3',
    content: 'Great job on the recent project! Your attention to detail and problem-solving skills were impressive.',
    type: 'praise',
    visibility: 'public',
    createdAt: '2023-10-12T14:30:00Z'
  },
  {
    id: 'feedback-2',
    fromUserId: 'user-4',
    toUserId: 'user-3',
    content: 'I appreciate your help with the API integration. Consider documenting your approach for future reference.',
    type: 'suggestion',
    visibility: 'public',
    createdAt: '2023-10-05T09:15:00Z'
  },
  {
    id: 'feedback-3',
    fromUserId: 'user-5',
    toUserId: 'user-3',
    content: 'Thank you for mentoring me on the database design. Your guidance was very helpful.',
    type: 'praise',
    visibility: 'public',
    createdAt: '2023-09-28T16:45:00Z'
  },
  {
    id: 'feedback-4',
    fromUserId: 'user-1',
    toUserId: 'user-3',
    content: 'I noticed some of the deadlines were missed on the last sprint. Let\'s discuss how we can improve planning.',
    type: 'concern',
    visibility: 'private',
    createdAt: '2023-09-20T11:00:00Z'
  },
  {
    id: 'feedback-5',
    fromUserId: 'user-2',
    toUserId: 'user-3',
    content: 'Your code quality has been consistently high. The refactoring you did last week made the codebase much more maintainable.',
    type: 'praise',
    visibility: 'public',
    createdAt: '2023-10-18T10:30:00Z'
  }
];

// Mock Notifications
export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-3',
    title: 'New Feedback Received',
    content: 'Jane Smith has given you feedback on your recent work.',
    type: 'info',
    read: false,
    createdAt: '2023-10-18T14:30:00Z',
    link: '/performance/feedback'
  },
  {
    id: 'notif-2',
    userId: 'user-3',
    title: 'Goal Deadline Approaching',
    content: 'Your goal "Complete React Advanced Course" is due in 3 days.',
    type: 'warning',
    read: false,
    createdAt: '2023-10-17T09:00:00Z',
    link: '/performance/goals'
  },
  {
    id: 'notif-3',
    userId: 'user-3',
    title: 'Course Completed',
    content: 'Congratulations! You\'ve completed "JavaScript Patterns" course.',
    type: 'success',
    read: true,
    createdAt: '2023-10-15T16:45:00Z',
    link: '/learning'
  },
  {
    id: 'notif-4',
    userId: 'user-3',
    title: 'New Badge Earned',
    content: 'You\'ve earned the "Feedback Champion" badge!',
    type: 'success',
    read: true,
    createdAt: '2023-10-10T11:20:00Z'
  },
  {
    id: 'notif-5',
    userId: 'user-3',
    title: 'Review Scheduled',
    content: 'Your quarterly performance review is scheduled for October 25th.',
    type: 'info',
    read: true,
    createdAt: '2023-10-05T08:30:00Z'
  },
  {
    id: 'notif-6',
    userId: 'user-2',
    title: 'Team Goal Updated',
    content: 'The "Improve Code Review Process" goal has been updated.',
    type: 'info',
    read: false,
    createdAt: '2023-10-16T13:15:00Z'
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'JavaScript Patterns',
    description: 'Learn advanced JavaScript patterns and best practices',
    duration: 120,
    category: 'Programming',
    tags: ['JavaScript', 'Advanced', 'Patterns'],
    difficulty: 'intermediate',
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-01-15T00:00:00Z',
    enrollment: {
      enrolled: true,
      progress: 100,
      completed: true,
      lastAccessed: '2023-10-15T14:30:00Z'
    }
  },
  {
    id: 'course-2',
    title: 'React Performance Optimization',
    description: 'Techniques to optimize React applications for better performance',
    duration: 90,
    category: 'Programming',
    tags: ['React', 'Performance', 'Optimization'],
    difficulty: 'advanced',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-02-10T00:00:00Z',
    enrollment: {
      enrolled: true,
      progress: 60,
      completed: false,
      lastAccessed: '2023-10-10T09:15:00Z'
    }
  },
  {
    id: 'course-3',
    title: 'Effective Code Reviews',
    description: 'Learn how to conduct effective code reviews that improve code quality',
    duration: 60,
    category: 'Development Practices',
    tags: ['Code Review', 'Best Practices', 'Team Collaboration'],
    difficulty: 'intermediate',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-03-05T00:00:00Z',
    enrollment: {
      enrolled: true,
      progress: 30,
      completed: false,
      lastAccessed: '2023-10-05T16:45:00Z'
    }
  },
  {
    id: 'course-4',
    title: 'TypeScript Fundamentals',
    description: 'A comprehensive introduction to TypeScript for JavaScript developers',
    duration: 150,
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Static Typing'],
    difficulty: 'beginner',
    imageUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-04-20T00:00:00Z',
    enrollment: {
      enrolled: false,
      progress: 0,
      completed: false
    }
  },
  {
    id: 'course-5',
    title: 'Agile Project Management',
    description: 'Learn the principles and practices of Agile project management',
    duration: 180,
    category: 'Project Management',
    tags: ['Agile', 'Scrum', 'Project Management'],
    difficulty: 'intermediate',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-15T00:00:00Z',
    enrollment: {
      enrolled: false,
      progress: 0,
      completed: false
    }
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'Feedback Champion',
    description: 'Awarded for providing high-quality feedback to team members',
    imageUrl: '/badges/feedback-champion.svg',
    category: 'performance',
    rarity: 'uncommon',
    xpReward: 50,
    unlockedAt: '2023-10-10T11:20:00Z'
  },
  {
    id: 'badge-2',
    name: 'Learning Enthusiast',
    description: 'Completed 5 courses in a single month',
    imageUrl: '/badges/learning-enthusiast.svg',
    category: 'learning',
    rarity: 'rare',
    xpReward: 100,
    unlockedAt: '2023-09-28T15:45:00Z'
  },
  {
    id: 'badge-3',
    name: 'Goal Crusher',
    description: 'Completed 10 goals ahead of schedule',
    imageUrl: '/badges/goal-crusher.svg',
    category: 'performance',
    rarity: 'epic',
    xpReward: 150
  },
  {
    id: 'badge-4',
    name: 'Team Player',
    description: 'Received positive feedback from 5 different team members',
    imageUrl: '/badges/team-player.svg',
    category: 'etiquette',
    rarity: 'common',
    xpReward: 30,
    unlockedAt: '2023-08-15T09:30:00Z'
  },
  {
    id: 'badge-5',
    name: 'Innovation Star',
    description: 'Recognized for implementing an innovative solution',
    imageUrl: '/badges/innovation-star.svg',
    category: 'special',
    rarity: 'legendary',
    xpReward: 200
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: 'user-1',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    level: 8,
    xp: 750,
    department: 'Executive',
    position: 'CTO',
    rank: 1,
    badgeCount: 12
  },
  {
    userId: 'user-4',
    username: 'alicejohnson',
    firstName: 'Alice',
    lastName: 'Johnson',
    level: 5,
    xp: 410,
    department: 'Product',
    position: 'Product Manager',
    rank: 2,
    badgeCount: 8
  },
  {
    userId: 'user-2',
    username: 'janesmith',
    firstName: 'Jane',
    lastName: 'Smith',
    level: 6,
    xp: 520,
    department: 'Engineering',
    position: 'Engineering Manager',
    rank: 3,
    badgeCount: 9
  },
  {
    userId: 'user-3',
    username: 'bobwilson',
    firstName: 'Bob',
    lastName: 'Wilson',
    level: 4,
    xp: 320,
    department: 'Engineering',
    position: 'Senior Developer',
    rank: 4,
    badgeCount: 6
  },
  {
    userId: 'user-5',
    username: 'charlielee',
    firstName: 'Charlie',
    lastName: 'Lee',
    level: 2,
    xp: 150,
    department: 'Engineering',
    position: 'Developer Intern',
    rank: 5,
    badgeCount: 3
  }
];

// Mock Policies
export const mockPolicies: Policy[] = [
  {
    id: 'policy-1',
    title: 'Code of Conduct',
    description: 'Guidelines for professional behavior in the workplace',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Workplace Behavior',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    version: '1.0',
    acknowledged: true,
    acknowledgedAt: '2023-01-05T10:30:00Z'
  },
  {
    id: 'policy-2',
    title: 'Remote Work Policy',
    description: 'Guidelines for working remotely',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Work Arrangements',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-06-10T00:00:00Z',
    version: '2.1',
    acknowledged: true,
    acknowledgedAt: '2023-06-15T14:45:00Z'
  },
  {
    id: 'policy-3',
    title: 'Data Privacy Policy',
    description: 'Guidelines for handling sensitive data',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Security',
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2023-03-20T00:00:00Z',
    version: '1.0',
    acknowledged: false
  }
];