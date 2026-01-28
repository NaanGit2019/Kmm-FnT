// API Configuration - Update this to match your .NET backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7214/api';

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
    insertUpdate: `${API_BASE_URL}/Technology/InsertUpdateTechnology`,
    delete: (id: number) => `${API_BASE_URL}/Technology/deleteTechnology/${id}`,
    getTypes: `${API_BASE_URL}/Technology/GetTechnologyTypes`,
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
    getAll: `${API_BASE_URL}/MapToTechnologySkill/GetAllTechnologySkills`,
    insertUpdate: `${API_BASE_URL}/MapToTechnologySkill/InsertOrUpdateTechnologySkill`,
    delete: (id: number) =>`${API_BASE_URL}/MapToTechnologySkill/DeleteTechnologySkill/${id}`,
  },


  // Technology-Profile Mappings
  technologyProfiles: {
    getAll: `${API_BASE_URL}/MapTechnologyProfile/GetAllMapTechnologyProfile`,
    insertUpdate: `${API_BASE_URL}/MapTechnologyProfile/InsertUpdateMapTechnologyProfile`,
    delete: (id: number) => `${API_BASE_URL}/MapTechnologyProfile/DeleteMapTechnologyProfile/${id}`,
  },

  // Profile-User Mappings
  profileUsers: {
    getAll: `${API_BASE_URL}/ProfileUser/GetAllProfileUser`,
    insertUpdate: `${API_BASE_URL}/ProfileUser/insertupadateProfileUser`,
    delete: (id: number) => `${API_BASE_URL}/ProfileUser/deleteProfileUser/${id}`,
  },
};
