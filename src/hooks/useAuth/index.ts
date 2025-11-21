import { useState } from 'react';
import {
  ChangePasswordBodyType,
  LoginBodyType,
  ResetPasswordBodyType,
  SignupBodyType,
  VerifyAccountBodyType,
  forgotPasswordBodyType,
} from './../../models';
import {
  getMe,
  login,
  signup,
  forgotPassword as forgotPasswordAPI,
  verifyAccount as verifyAccountAPI,
  resetPassword as resetPasswordAPI,
  changePassword as newPasswordAPI,
} from '../../api';
import { setToken, setUser } from '../../redux/authSlices';
import { store } from '../../redux';
import { navigationServices } from '../../utils';
import { AuthRoutes } from '../../constants';

export const authFlow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await getMe();
      store.dispatch(setUser(response.data));
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || err.message || 'Failed to fetch user';
      setError(errorMsg);
    }
  };

  const signIn = async (body: LoginBodyType, onSuccess?: () => void) => {
    try {
      setLoading(true);
      setError(null);

      const response = await login(body);
      const result = response?.data;

      if (result?.data?.token) {
        store.dispatch(setToken(result.data?.token));
        await fetchUser();
        if (typeof onSuccess === 'function') {
          await onSuccess();
        }
      }

      if (result?.message == 'user is not verified, must verify first') {
        setTimeout(() => {
          navigationServices.navigate(AuthRoutes['OTPVerificationScreen'], {
            email: body.email,
            from: 'signup',
          });
        }, 500);
      }

      return result;
    } catch (err: any) {
      const errorMsg =
        err?.message || err?.response?.message || err?.data?.message;
      setError(err?.re);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (body: SignupBodyType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await signup(body);
      const result = response?.data;
      if (result?.status) {
        navigationServices.navigate(AuthRoutes['OTPVerificationScreen'], {
          email: body.email,
          from: 'signup',
        });
      }
      return result;
    } catch (err: any) {
      const errorMsg =
        err?.response?.message ||
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (body: forgotPasswordBodyType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await forgotPasswordAPI(body);
      const result = response?.data;

      if (result) {
        navigationServices.navigate(AuthRoutes['OTPVerificationScreen'], {
          email: body.email,
          from: 'forgot',
        });
      }

      return result;
    } catch (err: any) {
      const errorMsg =
        err?.response?.message ||
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const verifyAccount = async (body: VerifyAccountBodyType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await verifyAccountAPI(body); // POST API
      const result = response?.data?.message;

      if (result) {
        setTimeout(() => {
          navigationServices.navigate(AuthRoutes['LoginScreen']);
        }, 1500);
      }
      return result;
    } catch (err: any) {
      const errorMsg =
        err?.response?.message ||
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (body: ResetPasswordBodyType) => {
    try {
      setLoading(true);
      setError(null);
      const response = await resetPasswordAPI(body); // PATCH API
      const result = response?.data;
      if (result?.status || result?.message === 'Password Reset Succesful') {
        navigationServices.navigate(AuthRoutes['LoginScreen']);
      }
      return result;
    } catch (err: any) {
      const errorMsg =
        err?.response?.message ||
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  };
  const changeNewPassword = async (body: ChangePasswordBodyType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await newPasswordAPI(body); // Make sure this is a PATCH call inside AuthApis
      const result = response?.data;
      return result;
    } catch (err: any) {
      const errorMsg =
        err?.response?.message ||
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  };
  return {
    signIn,
    signUp,
    forgotPassword,
    verifyAccount,
    resetPassword,
    loading,
    error,
    changeNewPassword,
    fetchUser,
  };
};
