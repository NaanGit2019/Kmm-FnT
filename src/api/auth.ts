import { useMutation } from '@tanstack/react-query';
import { signal } from '@preact/signals-react';
import { UserModule, UserModuleResponseType, UserProfile } from '@/types/auth';
import { axiosAuthServices } from '@/utils/axios';
import storage from '@/utils/storage';
// import useBearStore from 'data/moduleStore';
export const useModuleSignal = signal<UserModule[]>([]);
export const useGetUserModules = (user: UserProfile) => {
  const applicationId = import.meta.env.VITE_APP_APPLICATION_ID as string;
  const userModulesQuery = `/serve/user-type/based/access/modules/`;
  const { data, isPending, mutate, mutateAsync } = useMutation({
    mutationKey: [userModulesQuery, user?.business_id, applicationId, user?.user_id],
    mutationFn: async () =>
      await axiosAuthServices.get<UserModuleResponseType>(userModulesQuery, {
        params: { b: user?.business_id, a: applicationId, u: user?.user_id }
      }),
    onSuccess(data) {
      useModuleSignal.value = data?.data?.modules ?? [];
      storage.setItem('userModules', data?.data);
    }
  });
  return {
    mutate,
    mutateAsync,
    isLoading: isPending,
    userModules: data
  };
};
