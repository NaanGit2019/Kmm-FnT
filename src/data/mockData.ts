import type { Grade, Profile, Technology, Skill, Subskill, MapTechnologySkill, MapSkillmap } from '@/types';

// Mock data for development - will be replaced with API calls
export const mockGrades: Grade[] = [
  { id: 1, title: 'Junior', gradelevel: 'L1', isactive: true, createdAt: '2024-01-15' },
  { id: 2, title: 'Mid-Level', gradelevel: 'L2', isactive: true, createdAt: '2024-01-15' },
  { id: 3, title: 'Senior', gradelevel: 'L3', isactive: true, createdAt: '2024-01-15' },
  { id: 4, title: 'Lead', gradelevel: 'L4', isactive: true, createdAt: '2024-01-15' },
  { id: 5, title: 'Principal', gradelevel: 'L5', isactive: false, createdAt: '2024-01-15' },
];

export const mockProfiles: Profile[] = [
  { id: 1, title: 'Frontend Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 2, title: 'Backend Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 3, title: 'Full Stack Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 4, title: 'DevOps Engineer', isactive: true, createdAt: '2024-01-10' },
  { id: 5, title: 'QA Engineer', isactive: true, createdAt: '2024-01-10' },
  { id: 6, title: 'Data Engineer', isactive: false, createdAt: '2024-01-10' },
];

export const mockTechnologies: Technology[] = [
  { id: 1, title: 'React', type: 'Frontend', isactive: true, createdAt: '2024-01-05' },
  { id: 2, title: 'Angular', type: 'Frontend', isactive: true, createdAt: '2024-01-05' },
  { id: 3, title: '.NET Core', type: 'Backend', isactive: true, createdAt: '2024-01-05' },
  { id: 4, title: 'Node.js', type: 'Backend', isactive: true, createdAt: '2024-01-05' },
  { id: 5, title: 'PostgreSQL', type: 'Database', isactive: true, createdAt: '2024-01-05' },
  { id: 6, title: 'AWS', type: 'Cloud', isactive: true, createdAt: '2024-01-05' },
  { id: 7, title: 'Docker', type: 'DevOps', isactive: true, createdAt: '2024-01-05' },
  { id: 8, title: 'Kubernetes', type: 'DevOps', isactive: false, createdAt: '2024-01-05' },
];

export const mockSkills: Skill[] = [
  { id: 1, title: 'Component Development', isactive: true, createdAt: '2024-01-08' },
  { id: 2, title: 'State Management', isactive: true, createdAt: '2024-01-08' },
  { id: 3, title: 'API Integration', isactive: true, createdAt: '2024-01-08' },
  { id: 4, title: 'Database Design', isactive: true, createdAt: '2024-01-08' },
  { id: 5, title: 'Testing', isactive: true, createdAt: '2024-01-08' },
  { id: 6, title: 'CI/CD', isactive: true, createdAt: '2024-01-08' },
  { id: 7, title: 'Performance Optimization', isactive: true, createdAt: '2024-01-08' },
];

export const mockSubskills: Subskill[] = [
  { id: 1, skillId: 1, title: 'Functional Components', isactive: true },
  { id: 2, skillId: 1, title: 'Custom Hooks', isactive: true },
  { id: 3, skillId: 1, title: 'Component Patterns', isactive: true },
  { id: 4, skillId: 2, title: 'Redux', isactive: true },
  { id: 5, skillId: 2, title: 'Context API', isactive: true },
  { id: 6, skillId: 2, title: 'React Query', isactive: true },
  { id: 7, skillId: 3, title: 'REST APIs', isactive: true },
  { id: 8, skillId: 3, title: 'GraphQL', isactive: true },
  { id: 9, skillId: 4, title: 'Schema Design', isactive: true },
  { id: 10, skillId: 4, title: 'Query Optimization', isactive: true },
  { id: 11, skillId: 5, title: 'Unit Testing', isactive: true },
  { id: 12, skillId: 5, title: 'Integration Testing', isactive: true },
  { id: 13, skillId: 6, title: 'GitHub Actions', isactive: true },
  { id: 14, skillId: 6, title: 'Azure DevOps', isactive: true },
];

export const mockTechnologySkills: MapTechnologySkill[] = [
  { id: 1, technologyId: 1, skillId: 1, isactive: true },
  { id: 2, technologyId: 1, skillId: 2, isactive: true },
  { id: 3, technologyId: 1, skillId: 3, isactive: true },
  { id: 4, technologyId: 3, skillId: 3, isactive: true },
  { id: 5, technologyId: 3, skillId: 4, isactive: true },
  { id: 6, technologyId: 5, skillId: 4, isactive: true },
];

export const mockSkillMaps: MapSkillmap[] = [
  { id: 1, subskillId: 1, userId: 1, gradeid: 3, isactive: true },
  { id: 2, subskillId: 2, userId: 1, gradeid: 2, isactive: true },
  { id: 3, subskillId: 4, userId: 1, gradeid: 3, isactive: true },
  { id: 4, subskillId: 7, userId: 1, gradeid: 4, isactive: true },
];

// Dashboard stats
export const dashboardStats = {
  totalTechnologies: mockTechnologies.filter(t => t.isactive).length,
  totalSkills: mockSkills.filter(s => s.isactive).length,
  totalProfiles: mockProfiles.filter(p => p.isactive).length,
  totalGrades: mockGrades.filter(g => g.isactive).length,
};
