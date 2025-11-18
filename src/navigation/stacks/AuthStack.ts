import { AuthRoutes } from '../../constants';
import {
  ChangePasswordScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OTPVerificationScreen,
  SignupScreen,
} from '../../features';

export const AuthStack: any[] = [
  {
    name: AuthRoutes.LoginScreen,
    component: LoginScreen,
  },
  {
    name: AuthRoutes.SignupScreen,
    component: SignupScreen,
  },
  {
    name: AuthRoutes.ForgotPasswordScreen,
    component: ForgotPasswordScreen,
  },
  {
    name: AuthRoutes.OTPVerificationScreen,
    component: OTPVerificationScreen,
  },
  {
    name: AuthRoutes.ChangePasswordScreen,
    component: ChangePasswordScreen,
  },
];
