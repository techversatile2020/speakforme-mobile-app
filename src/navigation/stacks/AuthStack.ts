import { AuthRoutes } from '../../constants';
import {
  LoginScreen,
  SignupScreen,
  UnderDevelopmentScreen,
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
    component: UnderDevelopmentScreen,
  },
];
