import { useMutation } from '@tanstack/react-query';
import { makeCall } from '../../api';

export const useMakeCall = (callback?: (param?: any) => void) => {
  return useMutation({
    mutationFn: makeCall,
    onSuccess: (res, vars) => {
      console.log('useMakeCall RESPONSE => ', res);
      callback?.();
    },
    onError: (err: any) => {
      console.log('useMakeCall ERROR => ', err);
    },
  });
};
