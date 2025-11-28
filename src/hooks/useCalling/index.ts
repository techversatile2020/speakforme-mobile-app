import { useMutation } from '@tanstack/react-query';
import { endCall, makeCall, sendMessage } from '../../api';
import { navigationServices, toast } from '../../utils';
import { CallingRoutes } from '../../constants';
import { initCallSocket } from '../../services';

export const useMakeCall = (callback?: (peram?: any) => void) => {
  return useMutation({
    mutationFn: makeCall,
    onSuccess: (res: any, vars: any) => {
      callback?.();
      initCallSocket();
      navigationServices.navigate(CallingRoutes['CallStatusScreen'], {
        data: res?.data,
        phoneNumber: vars?.to_number,
      });
    },
    onError: (err: any) => {
      console.log('useMakeCall Error -> ', err);
      const msg = err?.response?.data?.error_message;
      toast.fail(msg);
    },
  });
};

export const useSendMessage = (callback?: (peram?: any) => void) => {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (res: any) => {
      console.log('useMakeCall Response -> ', res);
      callback?.();
      toast.success(res?.data?.message || 'Please wait...');
    },
    onError: (err: any) => {
      console.log('useMakeCall Error -> ', err);
      const msg = err?.response?.data?.error_message;
      toast.fail(msg);
    },
  });
};

export const useEndCall = (callback?: (peram?: any) => void) => {
  return useMutation({
    mutationFn: endCall,
    onSuccess: (res: any) => {
      console.log('useEndCall Response -> ', res);
      callback?.();
      toast.success(res?.data?.message || 'Please wait...');
      navigationServices.reset_0(CallingRoutes['HomeScreen']);
    },
    onError: (err: any) => {
      console.log('useMakeCall Error -> ', err);
      const msg = err?.response?.data?.error_message;
      toast.fail(msg);
    },
  });
};
