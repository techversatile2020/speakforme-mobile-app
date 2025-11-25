import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthStack,
  CallingStack,
  OnboardingStacks,
  SettingsStack,
} from './stacks';
import { useSelector } from 'react-redux';
import { OnBoardingRoutes } from '../constants';

const Stack: any = createNativeStackNavigator<any>();

export const AppStack = () => {
  const { onBoardingCompleted } = useSelector((state: any) => state.onboarding);
  const { token } = useSelector((state: any) => state.auth);

  const buildScreens = () => {
    if (!onBoardingCompleted && !token) {
      return [...OnboardingStacks, ...AuthStack];
    }

    if (onBoardingCompleted && !token) {
      const getStarted = OnboardingStacks.find(
        s => s.name === OnBoardingRoutes['getStartedScreen'],
      );
      return [...AuthStack];
    }

    if (onBoardingCompleted && token) {
      return [...CallingStack, ...SettingsStack];
    }

    return [];
  };

  const screens = buildScreens();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      key={onBoardingCompleted + '-' + token}
    >
      {screens.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options || {}}
        />
      ))}
    </Stack.Navigator>
  );
};
