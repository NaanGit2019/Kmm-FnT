import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  gradeApi, 
  profileApi, 
  technologyApi, 
  skillApi, 
  subskillApi,
  userApi,
  skillMapApi,
  technologySkillApi,
  technologyProfileApi,
  profileUserApi
} from '@/services/api';
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
import { toast } from 'sonner';

// Query Keys
export const queryKeys = {
  grades: ['grades'] as const,
  profiles: ['profiles'] as const,
  technologies: ['technologies'] as const,
  skills: ['skills'] as const,
  subskills: ['subskills'] as const,
  users: ['users'] as const,
  skillMaps: ['skillMaps'] as const,
  technologySkills: ['technologySkills'] as const,
  technologyProfiles: ['technologyProfiles'] as const,
  profileUsers: ['profileUsers'] as const,
};

// Grade Hooks
export function useGrades() {
  return useQuery({
    queryKey: queryKeys.grades,
    queryFn: gradeApi.getAll,
  });
}

export function useGradeMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: Grade) => gradeApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grades });
      toast.success('Grade saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save grade: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => gradeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grades });
      toast.success('Grade deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete grade: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Profile Hooks
export function useProfiles() {
  return useQuery({
    queryKey: queryKeys.profiles,
    queryFn: profileApi.getAll,
  });
}

export function useProfileMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: Profile) => profileApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles });
      toast.success('Profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => profileApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles });
      toast.success('Profile deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete profile: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Technology Hooks
export function useTechnologies() {
  return useQuery({
    queryKey: queryKeys.technologies,
    queryFn: technologyApi.getAll,
  });
}

export function useTechnologyMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: Technology) => technologyApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologies });
      toast.success('Technology saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save technology: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => technologyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologies });
      toast.success('Technology deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete technology: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Skill Hooks
export function useSkills() {
  return useQuery({
    queryKey: queryKeys.skills,
    queryFn: skillApi.getAll,
  });
}

export function useSkillMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: Skill) => skillApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills });
      toast.success('Skill saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save skill: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => skillApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills });
      toast.success('Skill deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete skill: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Subskill Hooks
export function useSubskills() {
  return useQuery({
    queryKey: queryKeys.subskills,
    queryFn: subskillApi.getAll,
  });
}

export function useSubskillMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: Subskill) => subskillApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subskills });
      toast.success('Subskill saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save subskill: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => subskillApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subskills });
      toast.success('Subskill deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete subskill: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// User Hooks
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: userApi.getAll,
  });
}

export function useUserMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: User) => userApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('User saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save user: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('User deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Skill Map Hooks
export function useSkillMaps() {
  return useQuery({
    queryKey: queryKeys.skillMaps,
    queryFn: skillMapApi.getAll,
  });
}

export function useSkillMapMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: MapSkillmap) => skillMapApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skillMaps });
    },
    onError: (error: Error) => {
      toast.error(`Failed to save skill map: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => skillMapApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skillMaps });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete skill map: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Technology-Skill Mapping Hooks
export function useTechnologySkills() {
  return useQuery({
    queryKey: queryKeys.technologySkills,
    queryFn: technologySkillApi.getAll,
  });
}

export function useTechnologySkillMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: MapTechnologySkill) => technologySkillApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologySkills });
      toast.success('Technology-Skill mapping saved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save mapping: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => technologySkillApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologySkills });
      toast.success('Mapping deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete mapping: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Technology-Profile Mapping Hooks
export function useTechnologyProfiles() {
  return useQuery({
    queryKey: queryKeys.technologyProfiles,
    queryFn: technologyProfileApi.getAll,
  });
}

export function useTechnologyProfileMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: MapTechnologyProfile) => technologyProfileApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologyProfiles });
      toast.success('Technology-Profile mapping saved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save mapping: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => technologyProfileApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.technologyProfiles });
      toast.success('Mapping deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete mapping: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}

// Profile-User Mapping Hooks
export function useProfileUsers() {
  return useQuery({
    queryKey: queryKeys.profileUsers,
    queryFn: profileUserApi.getAll,
  });
}

export function useProfileUserMutation() {
  const queryClient = useQueryClient();
  
  const insertUpdate = useMutation({
    mutationFn: (data: MapProfileUser) => profileUserApi.insertUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profileUsers });
      toast.success('Profile-User mapping saved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save mapping: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => profileUserApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profileUsers });
      toast.success('Mapping deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete mapping: ${error.message}`);
    },
  });

  return { insertUpdate, deleteMutation };
}
