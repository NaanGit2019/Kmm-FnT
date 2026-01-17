import type { User } from '@/types/user';
import type { MapProfileUser, MapTechnologyProfile, MapTechnologySkill, MapSkillmap } from '@/types';

// Mock Users/Employees
export const mockUsers: User[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', profileId: 3, isactive: true, createdAt: '2024-01-01' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Engineering', profileId: 1, isactive: true, createdAt: '2024-01-02' },
  { id: 3, name: 'Michael Chen', email: 'michael.chen@company.com', department: 'Engineering', profileId: 2, isactive: true, createdAt: '2024-01-03' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'QA', profileId: 5, isactive: true, createdAt: '2024-01-04' },
  { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', department: 'DevOps', profileId: 4, isactive: true, createdAt: '2024-01-05' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'Engineering', profileId: 1, isactive: true, createdAt: '2024-01-06' },
];

// Profile-User mappings
export const mockProfileUsers: MapProfileUser[] = [
  { id: 1, userId: 1, profileId: 3, isactive: true },
  { id: 2, userId: 2, profileId: 1, isactive: true },
  { id: 3, userId: 3, profileId: 2, isactive: true },
  { id: 4, userId: 4, profileId: 5, isactive: true },
  { id: 5, userId: 5, profileId: 4, isactive: true },
  { id: 6, userId: 6, profileId: 1, isactive: true },
];

// Technology-Profile mappings
export const mockTechnologyProfiles: MapTechnologyProfile[] = [
  { id: 1, profileId: 1, technologyId: 1, isactive: true }, // Frontend Dev - React
  { id: 2, profileId: 1, technologyId: 2, isactive: true }, // Frontend Dev - Angular
  { id: 3, profileId: 2, technologyId: 3, isactive: true }, // Backend Dev - .NET
  { id: 4, profileId: 2, technologyId: 4, isactive: true }, // Backend Dev - Node.js
  { id: 5, profileId: 2, technologyId: 5, isactive: true }, // Backend Dev - PostgreSQL
  { id: 6, profileId: 3, technologyId: 1, isactive: true }, // Full Stack - React
  { id: 7, profileId: 3, technologyId: 3, isactive: true }, // Full Stack - .NET
  { id: 8, profileId: 3, technologyId: 5, isactive: true }, // Full Stack - PostgreSQL
  { id: 9, profileId: 4, technologyId: 6, isactive: true }, // DevOps - AWS
  { id: 10, profileId: 4, technologyId: 7, isactive: true }, // DevOps - Docker
  { id: 11, profileId: 4, technologyId: 8, isactive: true }, // DevOps - Kubernetes
];

// Extended Technology-Skill mappings
export const mockTechnologySkillsExtended: MapTechnologySkill[] = [
  { id: 1, technologyId: 1, skillId: 1, isactive: true }, // React - Component Dev
  { id: 2, technologyId: 1, skillId: 2, isactive: true }, // React - State Management
  { id: 3, technologyId: 1, skillId: 3, isactive: true }, // React - API Integration
  { id: 4, technologyId: 1, skillId: 7, isactive: true }, // React - Performance
  { id: 5, technologyId: 2, skillId: 1, isactive: true }, // Angular - Component Dev
  { id: 6, technologyId: 2, skillId: 2, isactive: true }, // Angular - State Management
  { id: 7, technologyId: 3, skillId: 3, isactive: true }, // .NET - API Integration
  { id: 8, technologyId: 3, skillId: 4, isactive: true }, // .NET - Database Design
  { id: 9, technologyId: 4, skillId: 3, isactive: true }, // Node.js - API Integration
  { id: 10, technologyId: 5, skillId: 4, isactive: true }, // PostgreSQL - Database Design
  { id: 11, technologyId: 6, skillId: 6, isactive: true }, // AWS - CI/CD
  { id: 12, technologyId: 7, skillId: 6, isactive: true }, // Docker - CI/CD
];

// Extended Skill Maps for multiple users
export const mockSkillMapsExtended: MapSkillmap[] = [
  // John Smith (User 1) - Full Stack
  { id: 1, subskillId: 1, userId: 1, gradeid: 4, isactive: true },  // Functional Components - Lead
  { id: 2, subskillId: 2, userId: 1, gradeid: 3, isactive: true },  // Custom Hooks - Senior
  { id: 3, subskillId: 3, userId: 1, gradeid: 3, isactive: true },  // Component Patterns - Senior
  { id: 4, subskillId: 4, userId: 1, gradeid: 2, isactive: true },  // Redux - Mid
  { id: 5, subskillId: 7, userId: 1, gradeid: 4, isactive: true },  // REST APIs - Lead
  { id: 6, subskillId: 9, userId: 1, gradeid: 3, isactive: true },  // Schema Design - Senior
  
  // Sarah Johnson (User 2) - Frontend
  { id: 7, subskillId: 1, userId: 2, gradeid: 3, isactive: true },  // Functional Components - Senior
  { id: 8, subskillId: 2, userId: 2, gradeid: 4, isactive: true },  // Custom Hooks - Lead
  { id: 9, subskillId: 4, userId: 2, gradeid: 3, isactive: true },  // Redux - Senior
  { id: 10, subskillId: 5, userId: 2, gradeid: 3, isactive: true }, // Context API - Senior
  { id: 11, subskillId: 6, userId: 2, gradeid: 2, isactive: true }, // React Query - Mid
  
  // Michael Chen (User 3) - Backend
  { id: 12, subskillId: 7, userId: 3, gradeid: 4, isactive: true }, // REST APIs - Lead
  { id: 13, subskillId: 8, userId: 3, gradeid: 3, isactive: true }, // GraphQL - Senior
  { id: 14, subskillId: 9, userId: 3, gradeid: 4, isactive: true }, // Schema Design - Lead
  { id: 15, subskillId: 10, userId: 3, gradeid: 4, isactive: true }, // Query Optimization - Lead
  
  // Emily Davis (User 4) - QA
  { id: 16, subskillId: 11, userId: 4, gradeid: 4, isactive: true }, // Unit Testing - Lead
  { id: 17, subskillId: 12, userId: 4, gradeid: 3, isactive: true }, // Integration Testing - Senior
  
  // David Wilson (User 5) - DevOps
  { id: 18, subskillId: 13, userId: 5, gradeid: 4, isactive: true }, // GitHub Actions - Lead
  { id: 19, subskillId: 14, userId: 5, gradeid: 3, isactive: true }, // Azure DevOps - Senior
  
  // Lisa Anderson (User 6) - Frontend
  { id: 20, subskillId: 1, userId: 6, gradeid: 2, isactive: true }, // Functional Components - Mid
  { id: 21, subskillId: 2, userId: 6, gradeid: 1, isactive: true }, // Custom Hooks - Junior
  { id: 22, subskillId: 4, userId: 6, gradeid: 2, isactive: true }, // Redux - Mid
];
