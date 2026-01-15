// API Configuration - Update this to match your .NET backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Grades
  grades: `${API_BASE_URL}/grades`,
  gradeById: (id: number) => `${API_BASE_URL}/grades/${id}`,
  
  // Profiles
  profiles: `${API_BASE_URL}/profiles`,
  profileById: (id: number) => `${API_BASE_URL}/profiles/${id}`,
  
  // Technologies
  technologies: `${API_BASE_URL}/technologies`,
  technologyById: (id: number) => `${API_BASE_URL}/technologies/${id}`,
  
  // Skills
  skills: `${API_BASE_URL}/skills`,
  skillById: (id: number) => `${API_BASE_URL}/skills/${id}`,
  
  // Subskills
  subskills: `${API_BASE_URL}/subskills`,
  subskillById: (id: number) => `${API_BASE_URL}/subskills/${id}`,
  subskillsBySkill: (skillId: number) => `${API_BASE_URL}/skills/${skillId}/subskills`,
  
  // Mappings
  skillMaps: `${API_BASE_URL}/skillmaps`,
  technologySkills: `${API_BASE_URL}/technologyskills`,
  technologyProfiles: `${API_BASE_URL}/technologyprofiles`,
  profileUsers: `${API_BASE_URL}/profileusers`,
};
