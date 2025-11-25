import { useMutation, useQuery } from '@tanstack/react-query';
import {
  forgotPassword,
  getMe,
  login,
  resentOTP,
  resetPassword,
  signup,
  verifyAccount,
} from '../../api';
import { store } from '../../redux';
import { setToken, setUser } from '../../redux/authSlices';
import { navigationServices, toast } from '../../utils';
import { AuthRoutes } from '../../constants';

// 🔥 GLOBAL ERROR EXTRACTOR
const extractError = (err: any) =>
  err?.response?.data?.error_message || err?.message || 'Something went wrong';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: async res => {
      console.log('useLogin onSuccess -> ', res);

      const successMessage =
        res?.data?.message || res?.message || 'Login successful';

      toast.success(successMessage);

      const token = res?.data?.access_token;
      if (token) {
        store.dispatch(setToken(token));
        try {
          const user = await getMe();
          store.dispatch(setUser(user.data));
        } catch (err) {
          console.log('getMe ERROR => ', err);
        }
      }
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
      console.log('ERROR =>', err?.response?.data);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,

    onSuccess: (res, vars) => {
      toast.success(res?.data?.message || 'Signup successful');

      navigationServices.navigate(AuthRoutes.OTPVerificationScreen, {
        email: vars.email,
        from: 'signup',
      });
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
      console.log('Signup ERROR => ', err?.response?.data);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (res, vars) => {
      toast.success(res?.data?.message || 'OTP sent successfully');

      navigationServices.navigate(AuthRoutes.OTPVerificationScreen, {
        email: vars.email,
        from: 'forgot',
      });
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
    },
  });
};

export const useVerifyAccount = (callback?: any) => {
  return useMutation({
    mutationFn: verifyAccount,

    onSuccess: res => {
      toast.success(res?.data?.message || 'Account verified');
      callback?.();
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
      console.log('VerifyAccount ERROR => ', err);
    },
  });
};

export const useVerifyPwdOtp = () => {
  return useMutation({
    mutationFn: verifyAccount,

    onSuccess: res => {
      toast.success(res?.data?.message || 'OTP verified');
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: res => {
      toast.success(res?.data?.message || 'Password reset successfully');
      navigationServices.reset_0(AuthRoutes.LoginScreen);
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryFn: getMe,
    queryKey: ['me'],
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resentOTP,

    onSuccess: (res: any) => {
      toast.success(res?.data?.message || 'OTP resent successfully');
      console.log('OTP resent:', res);
    },

    onError: (err: any) => {
      toast.fail(extractError(err));
      // console.log('Resend OTP ERROR => ', err);
    },
  });
};
