import {
  ChangePasswordBodyType,
  forgotPasswordBodyType,
  LoginBodyType,
  resendOtpBodyType,
  ResetPasswordBodyType,
  SignupBodyType,
  VerifyAccountBodyType,
} from '../../models';
import httpService from '../https.service';

import Urls from './api.url';

export const login = async (body: LoginBodyType) => {
  const { data } = await httpService().post(Urls.login, body);
  return data;
};

export const signup = async (body: SignupBodyType) => {
  const { data } = await httpService().post(Urls.signup, body);
  return data;
};
export const resentOTP = async (body: resendOtpBodyType) => {
  const { data } = await httpService().post(Urls.resendOtp, body);
  return data;
};

export const forgotPassword = async (body: forgotPasswordBodyType) => {
  const { data } = await httpService().patch(Urls.forgotPassword, body);
  return data;
};

export const resetPassword = async (body: ResetPasswordBodyType) => {
  const { data } = await httpService().patch(Urls.resetPassword, body);
  return data;
};

export const verifyAccount = async (body: VerifyAccountBodyType) => {
  const { data } = await httpService().post(Urls.verifyAccount, body);
  return data;
};

export const getMe = async () => {
  const { data } = await httpService().get(Urls.getMe);
  return data;
};
export const changePassword = (body: ChangePasswordBodyType) => {
  return httpService().patch(Urls.changePassword, body);
};