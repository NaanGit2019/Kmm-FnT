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
  
  return response.json();
}

// Grade API
export const gradeApi = {
  getAll: () => fetchApi<Grade[]>(API_ENDPOINTS.grades),
  getById: (id: number) => fetchApi<Grade>(API_ENDPOINTS.gradeById(id)),
  create: (data: Omit<Grade, 'id'>) => 
    fetchApi<Grade>(API_ENDPOINTS.grades, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Grade>) => 
    fetchApi<Grade>(API_ENDPOINTS.gradeById(id), { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.gradeById(id), { method: 'DELETE' }),
};

// Profile API
export const profileApi = {
  getAll: () => fetchApi<Profile[]>(API_ENDPOINTS.profiles),
  getById: (id: number) => fetchApi<Profile>(API_ENDPOINTS.profileById(id)),
  create: (data: Omit<Profile, 'id'>) => 
    fetchApi<Profile>(API_ENDPOINTS.profiles, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Profile>) => 
    fetchApi<Profile>(API_ENDPOINTS.profileById(id), { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.profileById(id), { method: 'DELETE' }),
};

// Technology API
export const technologyApi = {
  getAll: () => fetchApi<Technology[]>(API_ENDPOINTS.technologies),
  getById: (id: number) => fetchApi<Technology>(API_ENDPOINTS.technologyById(id)),
  create: (data: Omit<Technology, 'id'>) => 
    fetchApi<Technology>(API_ENDPOINTS.technologies, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Technology>) => 
    fetchApi<Technology>(API_ENDPOINTS.technologyById(id), { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.technologyById(id), { method: 'DELETE' }),
};

// Skill API
export const skillApi = {
  getAll: () => fetchApi<Skill[]>(API_ENDPOINTS.skills),
  getById: (id: number) => fetchApi<Skill>(API_ENDPOINTS.skillById(id)),
  create: (data: Omit<Skill, 'id'>) => 
    fetchApi<Skill>(API_ENDPOINTS.skills, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Skill>) => 
    fetchApi<Skill>(API_ENDPOINTS.skillById(id), { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.skillById(id), { method: 'DELETE' }),
};

// Subskill API
export const subskillApi = {
  getAll: () => fetchApi<Subskill[]>(API_ENDPOINTS.subskills),
  getById: (id: number) => fetchApi<Subskill>(API_ENDPOINTS.subskillById(id)),
  getBySkill: (skillId: number) => fetchApi<Subskill[]>(API_ENDPOINTS.subskillsBySkill(skillId)),
  create: (data: Omit<Subskill, 'id'>) => 
    fetchApi<Subskill>(API_ENDPOINTS.subskills, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Subskill>) => 
    fetchApi<Subskill>(API_ENDPOINTS.subskillById(id), { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => 
    fetchApi<void>(API_ENDPOINTS.subskillById(id), { method: 'DELETE' }),
};

// Skill Map API
export const skillMapApi = {
  getAll: () => fetchApi<MapSkillmap[]>(API_ENDPOINTS.skillMaps),
  create: (data: Omit<MapSkillmap, 'id'>) => 
    fetchApi<MapSkillmap>(API_ENDPOINTS.skillMaps, { method: 'POST', body: JSON.stringify(data) }),
};

// Technology-Skill Mapping API
export const technologySkillApi = {
  getAll: () => fetchApi<MapTechnologySkill[]>(API_ENDPOINTS.technologySkills),
  create: (data: Omit<MapTechnologySkill, 'id'>) => 
    fetchApi<MapTechnologySkill>(API_ENDPOINTS.technologySkills, { method: 'POST', body: JSON.stringify(data) }),
};

// Technology-Profile Mapping API
export const technologyProfileApi = {
  getAll: () => fetchApi<MapTechnologyProfile[]>(API_ENDPOINTS.technologyProfiles),
  create: (data: Omit<MapTechnologyProfile, 'id'>) => 
    fetchApi<MapTechnologyProfile>(API_ENDPOINTS.technologyProfiles, { method: 'POST', body: JSON.stringify(data) }),
};

// Profile-User Mapping API
export const profileUserApi = {
  getAll: () => fetchApi<MapProfileUser[]>(API_ENDPOINTS.profileUsers),
  create: (data: Omit<MapProfileUser, 'id'>) => 
    fetchApi<MapProfileUser>(API_ENDPOINTS.profileUsers, { method: 'POST', body: JSON.stringify(data) }),
};
