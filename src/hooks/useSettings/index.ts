import { useMutation, useQuery } from '@tanstack/react-query';
import {
  changeUserPassword,
  deleteUserAccount,
  getMe,
  getVonageVoices,
  updateProfile,
} from '../../api';
import { toast } from '../../utils';
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../../redux/authSlices';

export const useChangePassword = (callback?: (peram?: any) => void) => {
  return useMutation({
    mutationFn: changeUserPassword,
    onSuccess: (res: any) => {
      toast.success(res?.data.message);
      callback?.();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error_message;
      toast.fail(msg);
    },
  });
};

export const useUpdateProfile = (callback?: (peram?: any) => void) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async (res: any) => {
      toast.success(res?.data?.message);
      try {
        const userRes = await getMe();
        dispatch(setUser(userRes.data));
        callback?.();
      } catch {
        toast.fail('Updated, but failed to refresh user info.');
      }
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.error_message ||
        err?.response?.data?.message ||
        'Failed to update profile.';
      toast.fail(msg);
    },
  });
};

export const useDeleteAccount = (callback?: (peram?: any) => void) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: async (res: any) => {
      toast.success(res?.data?.message);
      toast.success(res?.data?.message || 'Account deleted successfully');
      callback?.();
      dispatch(logout());
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.error_message ||
        err?.response?.data?.message ||
        'Failed to update profile.';
      toast.fail(msg);
    },
  });
};

export const useGetUserData = (enabled = true) => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: getVonageVoices,
    enabled,
    select: (res: any) => res.data, // sirf data return kare
  });
};
