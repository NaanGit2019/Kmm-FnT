// API Configuration - Update this to match your .NET backend URL
export const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'https://localhost:44320/api';

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
    getTechnologyTypes: `${API_BASE_URL}/Technology/GetTechnologyTypes`,
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
    getAll: `${API_BASE_URL}/user/GetAllusers`,
    getById: (id: number) => `${API_BASE_URL}/Users/GetUserbyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Users/insertupadateUser`,
    delete: (id: number) => `${API_BASE_URL}/User/deleteUser/${id}`,
  },



  // Technology-Skill Mappings
  technologySkills: {
    getAll: `${API_BASE_URL}/MapToTechnologySkill/GetAllTechnologySkills`,
    getByUser: (id: number) => `${API_BASE_URL}/MapToTechnologySkill/GetTechnologySkillById/${id}`,
    insertUpdate: `${API_BASE_URL}/MapToTechnologySkill/InsertUpdateTechnologySkill`,
    delete: (id: number) => `${API_BASE_URL}/MapToTechnologySkill/DeleteTechnologySkill/${id}`,
  },

  // Technology-Profile Mappings
  technologyProfiles: {
    getAll: `${API_BASE_URL}/MapTechnologyProfile/GetAllMapTechnologyProfile`,
    getById: (id: number) => `${API_BASE_URL}/MapTechnologyProfile/GetMapTechnologyProfilebyId/${id}`,
    insertUpdate: `${API_BASE_URL}/MapTechnologyProfile/insertupdateMapTechnologyProfile`,
    delete: (id: number) => `${API_BASE_URL}/MapTechnologyProfile/deleteMapTechnologyProfile/${id}`,
  },

  // Profile-User Mappings
  profileUsers: {
    getAll: `${API_BASE_URL}/MapToProfileUser/GetAllProfileUser`,
    getByUser: (userId: number) => `${API_BASE_URL}/MapToProfileUser/GetPofileUserById/${userId}`,
    insertUpdate: `${API_BASE_URL}/MapToProfileUser/InsertOrUpdateProfileUser`,
    delete: (id: number) => `${API_BASE_URL}/MapToProfileUser/DeleteProfileUser/${id}`,
  },

  // Skill Matrix
  matrix: {
    getskillbyuser: (userId: number) => `${API_BASE_URL}/Matrix/GetAllSkillforuser/${userId}`,
    getsubskillbyuser: (userId: number) => `${API_BASE_URL}/Matrix/GetAllsubSkillforuser/${userId}`,
    gettechnologybyuser: (userId: number) => `${API_BASE_URL}/Matrix/GetAllTechnologyforuser/${userId}`,
    gettechnologyskillbyuser: (userId: number) => `${API_BASE_URL}/Matrix/GetAllTechnologyskillforuser/${userId}`,
    delete: (id: number) => `${API_BASE_URL}/Matrix/DeleteProfileUser/${id}`,
  },

  // Profile-User Mappings
  mappedskillforuser: {
    getAll: (orgId?: number) => `${API_BASE_URL}/MapSkillMap/GetAllMapSkillMap${orgId ? `?orgid=${orgId}` : ''}`,
    getByUser: (userId: number) => `${API_BASE_URL}/MapSkillMap/GetMapSkillMapbyId/${userId}`,
    insertUpdate: `${API_BASE_URL}/MapSkillMap/insertupdateMapSkillMap`,
    delete: (id: number) => `${API_BASE_URL}/MapSkillMap/deleteMapSkillMap/${id}`,
  },
};
