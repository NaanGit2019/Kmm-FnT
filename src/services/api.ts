import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
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

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// Grade API
export const gradeApi = {
  getAll: () => apiClient.get<Grade[]>(API_ENDPOINTS.grades.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<Grade>(API_ENDPOINTS.grades.getById(id)).then(res => res.data),
  insertUpdate: (data: Grade) => apiClient.post<Grade>(API_ENDPOINTS.grades.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.grades.delete(id)).then(res => res.data),
};

// Profile API
export const profileApi = {
  getAll: () => apiClient.get<Profile[]>(API_ENDPOINTS.profiles.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<Profile>(API_ENDPOINTS.profiles.getById(id)).then(res => res.data),
  insertUpdate: (data: Profile) => apiClient.post<Profile>(API_ENDPOINTS.profiles.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.profiles.delete(id)).then(res => res.data),
};

// Technology API
export const technologyApi = {
  getAll: () => apiClient.get<Technology[]>(API_ENDPOINTS.technologies.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<Technology>(API_ENDPOINTS.technologies.getById(id)).then(res => res.data),
  insertUpdate: (data: Technology) => apiClient.post<Technology>(API_ENDPOINTS.technologies.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.technologies.delete(id)).then(res => res.data),
};

// Skill API
export const skillApi = {
  getAll: () => apiClient.get<Skill[]>(API_ENDPOINTS.skills.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<Skill>(API_ENDPOINTS.skills.getById(id)).then(res => res.data),
  insertUpdate: (data: Skill) => apiClient.post<Skill>(API_ENDPOINTS.skills.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.skills.delete(id)).then(res => res.data),
};

// Subskill API
export const subskillApi = {
  getAll: () => apiClient.get<Subskill[]>(API_ENDPOINTS.subskills.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<Subskill>(API_ENDPOINTS.subskills.getById(id)).then(res => res.data),
  getBySkill: (skillId: number) => apiClient.get<Subskill[]>(API_ENDPOINTS.subskills.getBySkill(skillId)).then(res => res.data),
  insertUpdate: (data: Subskill) => apiClient.post<Subskill>(API_ENDPOINTS.subskills.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.subskills.delete(id)).then(res => res.data),
};

// User API
export const userApi = {
  getAll: () => apiClient.get<User[]>(API_ENDPOINTS.users.getAll).then(res => res.data),
  getById: (id: number) => apiClient.get<User>(API_ENDPOINTS.users.getById(id)).then(res => res.data),
  insertUpdate: (data: User) => apiClient.post<User>(API_ENDPOINTS.users.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.users.delete(id)).then(res => res.data),
};

// Skill Map API
export const skillMapApi = {
  getAll: () => apiClient.get<MapSkillmap[]>(API_ENDPOINTS.skillMaps.getAll).then(res => res.data),
  getByUser: (userId: number) => apiClient.get<MapSkillmap[]>(API_ENDPOINTS.skillMaps.getByUser(userId)).then(res => res.data),
  insertUpdate: (data: MapSkillmap) => apiClient.post<MapSkillmap>(API_ENDPOINTS.skillMaps.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.skillMaps.delete(id)).then(res => res.data),
};

// Technology-Skill Mapping API
export const technologySkillApi = {
  getAll: () => apiClient.get<MapTechnologySkill[]>(API_ENDPOINTS.technologySkills.getAll).then(res => res.data),
  insertUpdate: (data: MapTechnologySkill) => apiClient.post<MapTechnologySkill>(API_ENDPOINTS.technologySkills.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.technologySkills.delete(id)).then(res => res.data),
};

// Technology-Profile Mapping API
export const technologyProfileApi = {
  getAll: () => apiClient.get<MapTechnologyProfile[]>(API_ENDPOINTS.technologyProfiles.getAll).then(res => res.data),
  insertUpdate: (data: MapTechnologyProfile) => apiClient.post<MapTechnologyProfile>(API_ENDPOINTS.technologyProfiles.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.technologyProfiles.delete(id)).then(res => res.data),
};

// Profile-User Mapping API
export const profileUserApi = {
  getAll: () => apiClient.get<MapProfileUser[]>(API_ENDPOINTS.profileUsers.getAll).then(res => res.data),
  insertUpdate: (data: MapProfileUser) => apiClient.post<MapProfileUser>(API_ENDPOINTS.profileUsers.insertUpdate, data).then(res => res.data),
  delete: (id: number) => apiClient.delete(API_ENDPOINTS.profileUsers.delete(id)).then(res => res.data),
};

// Export the axios instance for custom requests
export { apiClient };
