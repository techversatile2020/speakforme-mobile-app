import { OnBoardingRoutes } from '../../constants';
import { GetStartedScreen, OnboardingScreen } from '../../features';

export const OnboardingStacks: any[] = [
  {
    name: OnBoardingRoutes.onBoardingScreen,
    component: OnboardingScreen,
  },
  {
    name: OnBoardingRoutes.getStartedScreen,
    component: GetStartedScreen,
  },
];
