// API Configuration - Update this to match your .NET backend URL
export const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'https://localhost:44320/api';
export const PAYROLL_EMPLOYEE_LIST_URL = import.meta.env.VITE_APP_PAYROLL_EMPLOYEE_LIST_URL || 'https://ngo-dev-api.saldobooks.com/payroll/get/employee/list?b=9e9d998c-803c-43c1-a419-cac8bc40d456';

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
    insertUpdate: `${API_BASE_URL}/Profile/InsertUpdateProfile`,
    delete: (id: number) => `${API_BASE_URL}/Profile/deleteProfile/${id}`,
  },

  // Technologies
  technologies: {
    getAll: `${API_BASE_URL}/Technology/GetAllTechnology`,
    getById: (id: number) => `${API_BASE_URL}/Technology/GetTechnologybyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Technology/InsertUpdateTechnology`,
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
    insertUpdate: `${API_BASE_URL}/Subskill/insertupdateSubskill`,
    delete: (id: number) => `${API_BASE_URL}/Subskill/deleteSubskill/${id}`,
  },

  // Users
  users: {
    getAll: `${API_BASE_URL}/user/GetAllusers`,
    getById: (id: number) => `${API_BASE_URL}/Users/GetUserbyId/${id}`,
    insertUpdate: `${API_BASE_URL}/Users/InsertUpdateUser`,
    delete: (id: number) => `${API_BASE_URL}/User/deleteUser/${id}`,
  },

  // Employees (Payroll service)
  employees: {
    getAll: PAYROLL_EMPLOYEE_LIST_URL,
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
    insertUpdate: `${API_BASE_URL}/MapTechnologyProfile/InsertUpdateMapTechnologyProfile`,
    delete: (id: number) => `${API_BASE_URL}/MapTechnologyProfile/deleteMapTechnologyProfile/${id}`,
  },

  // Profile-User Mappings
  profileUsers: {
    getAll: `${API_BASE_URL}/MapToProfileUser/GetAllProfileUser`,
    getByUser: (userId: number) => `${API_BASE_URL}/MapToProfileUser/GetProfileUserById/${userId}`,
    insertUpdate: `${API_BASE_URL}/MapToProfileUser/InsertOrUpdateProfileUser`,
    delete: (id: number) => `${API_BASE_URL}/MapToProfileUser/DeleteProfileUser/${id}`,
  },

  // SkillMap Mappings
  skillMaps: {
    getAll: `${API_BASE_URL}/MapSkillMap/GetAllMapSkillMap`,
    getByUser: (userId: number) => `${API_BASE_URL}/MapSkillMap/GetMapSkillMapbyId/${userId}`,
    insertUpdate: `${API_BASE_URL}/MapSkillMap/insertupdateMapSkillMap`,
    delete: (id: number) => `${API_BASE_URL}/MapSkillMap/deleteMapSkillMap/${id}`,
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
