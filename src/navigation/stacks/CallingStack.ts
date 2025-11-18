import { CallingRoutes } from '../../constants';
import { CallScreen, HomeScreen } from '../../features';

export const CallingStack: any[] = [
  {
    name: CallingRoutes.HomeScreen,
    component: HomeScreen,
  },
  {
    name: CallingRoutes.CallScreen,
    component: CallScreen,
  },
];
