import { API_ENDPOINTS } from '@/config/api';
import type { 
  Grade, 
  Profile, 
  Technology, 
  Skill, 
  Subskill,
  MapSkillmap,
  MapTechnologySkill,
  MapTechnologyProfile,
  MapProfileUser
} from '@/types';
import type { User } from '@/types/user';

// Generic fetch wrapper with error handling
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  // Handle empty responses (e.g., DELETE)
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  
  return JSON.parse(text);
}

// Grade API
export const gradeApi = {
  getAll: () => fetchApi<Grade[]>(API_ENDPOINTS.grades.getAll),
  getById: (id: number) => fetchApi<Grade>(API_ENDPOINTS.grades.getById(id)),
  insertUpdate: (data: Grade) => 
    fetchApi<Grade>(API_ENDPOINTS.grades.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.grades.delete(id), { method: 'DELETE' }),
};

// Profile API
export const profileApi = {
  getAll: () => fetchApi<Profile[]>(API_ENDPOINTS.profiles.getAll),
  getById: (id: number) => fetchApi<Profile>(API_ENDPOINTS.profiles.getById(id)),
  insertUpdate: (data: Profile) => 
    fetchApi<Profile>(API_ENDPOINTS.profiles.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.profiles.delete(id), { method: 'DELETE' }),
};

// Technology API
export const technologyApi = {
  getAll: () => fetchApi<Technology[]>(API_ENDPOINTS.technologies.getAll),
  getById: (id: number) => fetchApi<Technology>(API_ENDPOINTS.technologies.getById(id)),
  insertUpdate: (data: Technology) => 
    fetchApi<Technology>(API_ENDPOINTS.technologies.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.technologies.delete(id), { method: 'DELETE' }),
};

// Skill API
export const skillApi = {
  getAll: () => fetchApi<Skill[]>(API_ENDPOINTS.skills.getAll),
  getById: (id: number) => fetchApi<Skill>(API_ENDPOINTS.skills.getById(id)),
  insertUpdate: (data: Skill) => 
    fetchApi<Skill>(API_ENDPOINTS.skills.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.skills.delete(id), { method: 'DELETE' }),
};

// Subskill API
export const subskillApi = {
  getAll: () => fetchApi<Subskill[]>(API_ENDPOINTS.subskills.getAll),
  getById: (id: number) => fetchApi<Subskill>(API_ENDPOINTS.subskills.getById(id)),
  getBySkill: (skillId: number) => fetchApi<Subskill[]>(API_ENDPOINTS.subskills.getBySkill(skillId)),
  insertUpdate: (data: Subskill) => 
    fetchApi<Subskill>(API_ENDPOINTS.subskills.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.subskills.delete(id), { method: 'DELETE' }),
};

// User API
export const userApi = {
  getAll: () => fetchApi<User[]>(API_ENDPOINTS.users.getAll),
  getById: (id: number) => fetchApi<User>(API_ENDPOINTS.users.getById(id)),
  insertUpdate: (data: User) => 
    fetchApi<User>(API_ENDPOINTS.users.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.users.delete(id), { method: 'DELETE' }),
};

// Skill Map API
export const skillMapApi = {
  getAll: () => fetchApi<MapSkillmap[]>(API_ENDPOINTS.skillMaps.getAll),
  getByUser: (userId: number) => fetchApi<MapSkillmap[]>(API_ENDPOINTS.skillMaps.getByUser(userId)),
  insertUpdate: (data: MapSkillmap) => 
    fetchApi<MapSkillmap>(API_ENDPOINTS.skillMaps.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.skillMaps.delete(id), { method: 'DELETE' }),
};

// Technology-Skill Mapping API
export const technologySkillApi = {
  getAll: () => fetchApi<MapTechnologySkill[]>(API_ENDPOINTS.technologySkills.getAll),
  insertUpdate: (data: MapTechnologySkill) => 
    fetchApi<MapTechnologySkill>(API_ENDPOINTS.technologySkills.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.technologySkills.delete(id), { method: 'DELETE' }),
};

// Technology-Profile Mapping API
export const technologyProfileApi = {
  getAll: () => fetchApi<MapTechnologyProfile[]>(API_ENDPOINTS.technologyProfiles.getAll),
  insertUpdate: (data: MapTechnologyProfile) => 
    fetchApi<MapTechnologyProfile>(API_ENDPOINTS.technologyProfiles.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.technologyProfiles.delete(id), { method: 'DELETE' }),
};

// Profile-User Mapping API
export const profileUserApi = {
  getAll: () => fetchApi<MapProfileUser[]>(API_ENDPOINTS.profileUsers.getAll),
  insertUpdate: (data: MapProfileUser) => 
    fetchApi<MapProfileUser>(API_ENDPOINTS.profileUsers.insertUpdate, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.profileUsers.delete(id), { method: 'DELETE' }),
};
