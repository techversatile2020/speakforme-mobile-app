import { CallingRoutes } from '../../constants';
import { CallScreen, CallStatusScreen, HomeScreen } from '../../features';

export const CallingStack: any[] = [
  {
    name: CallingRoutes.HomeScreen,
    component: HomeScreen,
  },
  {
    name: CallingRoutes.CallScreen,
    component: CallScreen,
  },
  {
    name: CallingRoutes.CallStatusScreen,
    component: CallStatusScreen,
  },
];
