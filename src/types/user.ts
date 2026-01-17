import type { CommonFields } from './index';

// User/Employee entity
export interface User extends CommonFields {
  name: string;
  email: string;
  department?: string;
  profileId?: number;
}

// Extended skill map with user info for analytics
export interface UserSkillData {
  userId: number;
  userName: string;
  subskillId: number;
  subskillTitle: string;
  skillId: number;
  skillTitle: string;
  gradeId: number;
  gradeTitle: string;
  gradeLevel: string;
}

// Analytics types
export interface SkillDistribution {
  skillTitle: string;
  count: number;
  avgGrade: number;
}

export interface GradeDistribution {
  gradeTitle: string;
  gradeLevel: string;
  count: number;
  percentage: number;
}

export interface UserSkillSummary {
  userId: number;
  userName: string;
  totalSkills: number;
  avgGradeLevel: number;
  topSkills: string[];
}
