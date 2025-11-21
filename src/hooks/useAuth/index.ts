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
import { navigationServices } from '../../utils';
import { AuthRoutes } from '../../constants';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: async res => {
      const token = res?.data?.access_token;
      if (token) {
        store.dispatch(setToken(token));
        // Fetch and store user
        try {
          const user = await getMe();
          store.dispatch(setUser(user.data));
        } catch (err) {
          return console.log('useLogin: ', err);
        }
      }
      // else {
      //   toast.fail('Token not found in response');
      // }
    },
    onError: (err: any) => {
      let msg = 'Login failed. Please try again.';
      if (err?.response?.data) {
        if (typeof err.response.data === 'string') {
          msg = err.response.data;
        } else {
          msg = err.response.data.error_message;
        }
      } else if (err?.message) {
        msg = err.message;
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (res, vars) => {
      navigationServices.navigate(AuthRoutes.OTPVerificationScreen, {
        email: vars.email,
        from: 'signup',
      });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error_message;
      console.log('ERROR => ', err);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res, vars) => {
      navigationServices.navigate(AuthRoutes.OTPVerificationScreen, {
        email: vars.email,
        from: 'forgot',
      });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error_message;
    },
  });
};

export const useVerifyAccount = (callback?: any) => {
  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: res => {
      console.log('useVerifyAccount onSuccess ->  ', res);
      callback?.();
    },
    onError: (err: any) => {
      console.log('useVerifyAccount onError ->  ', err);
    },
  });
};

export const useVerifyPwdOtp = () => {
  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: res => {},

    onError: (err: any) => {
      const msg = err?.response?.data?.error_message;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: res => {
      navigationServices.reset_0(AuthRoutes.LoginScreen);
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error_message;
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
      console.log('✅ OTP resent response:', res);
    },
    onError: (err: any) => {
      console.log('useResendOtp ERROR => ', err);
    },
  });
};
