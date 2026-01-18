// API Configuration - Update this to match your .NET backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Grades
  grades: {
    getAll: `${API_BASE_URL}/Grade/GetAllGrade`,
    getById: (id: number) => `${API_BASE_URL}/Grade/GetGradebyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Grade/insertupadateGrade`,
    delete: (id: number) => `${API_BASE_URL}/Grade/deleteGrade/${id}`,
  },
  
  // Profiles
  profiles: {
    getAll: `${API_BASE_URL}/Profile/GetAllProfile`,
    getById: (id: number) => `${API_BASE_URL}/Profile/GetProfilebyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Profile/insertupadateProfile`,
    delete: (id: number) => `${API_BASE_URL}/Profile/deleteProfile/${id}`,
  },
  
  // Technologies
  technologies: {
    getAll: `${API_BASE_URL}/Technology/GetAllTechnology`,
    getById: (id: number) => `${API_BASE_URL}/Technology/GetTechnologybyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Technology/insertupadateTechnology`,
    delete: (id: number) => `${API_BASE_URL}/Technology/deleteTechnology/${id}`,
  },
  
  // Skills
  skills: {
    getAll: `${API_BASE_URL}/Skill/GetAllSkill`,
    getById: (id: number) => `${API_BASE_URL}/Skill/GetSkillbyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Skill/insertupadateSkill`,
    delete: (id: number) => `${API_BASE_URL}/Skill/deleteSkill/${id}`,
  },
  
  // Subskills
  subskills: {
    getAll: `${API_BASE_URL}/Subskill/GetAllSubskill`,
    getById: (id: number) => `${API_BASE_URL}/Subskill/GetSubskillbyId/${id}`,
    getBySkill: (skillId: number) => `${API_BASE_URL}/Subskill/GetSubskillsBySkillId/${skillId}`,
    insertUpdate: `${API_BASE_URL}/Subskill/insertupadateSubskill`,
    delete: (id: number) => `${API_BASE_URL}/Subskill/deleteSubskill/${id}`,
  },
  
  // Users
  users: {
    getAll: `${API_BASE_URL}/User/GetAllUser`,
    getById: (id: number) => `${API_BASE_URL}/User/GetUserbyId/${id}`,
    insertUpdate: `${API_BASE_URL}/User/insertupadateUser`,
    delete: (id: number) => `${API_BASE_URL}/User/deleteUser/${id}`,
  },
  
  // Skill Maps
  skillMaps: {
    getAll: `${API_BASE_URL}/SkillMap/GetAllSkillMap`,
    getByUser: (userId: number) => `${API_BASE_URL}/SkillMap/GetSkillMapsByUserId/${userId}`,
    insertUpdate: `${API_BASE_URL}/SkillMap/insertupadateSkillMap`,
    delete: (id: number) => `${API_BASE_URL}/SkillMap/deleteSkillMap/${id}`,
  },
  
  // Technology-Skill Mappings
  technologySkills: {
    getAll: `${API_BASE_URL}/TechnologySkill/GetAllTechnologySkill`,
    insertUpdate: `${API_BASE_URL}/TechnologySkill/insertupadateTechnologySkill`,
    delete: (id: number) => `${API_BASE_URL}/TechnologySkill/deleteTechnologySkill/${id}`,
  },
  
  // Technology-Profile Mappings
  technologyProfiles: {
    getAll: `${API_BASE_URL}/TechnologyProfile/GetAllTechnologyProfile`,
    insertUpdate: `${API_BASE_URL}/TechnologyProfile/insertupadateTechnologyProfile`,
    delete: (id: number) => `${API_BASE_URL}/TechnologyProfile/deleteTechnologyProfile/${id}`,
  },
  
  // Profile-User Mappings
  profileUsers: {
    getAll: `${API_BASE_URL}/ProfileUser/GetAllProfileUser`,
    insertUpdate: `${API_BASE_URL}/ProfileUser/insertupadateProfileUser`,
    delete: (id: number) => `${API_BASE_URL}/ProfileUser/deleteProfileUser/${id}`,
  },
};
