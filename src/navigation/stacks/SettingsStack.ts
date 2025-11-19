import { SettingRoutes } from '../../constants';
import { SettingScreen, VoiceSettingScreen } from '../../features';

export const SettingsStack: any[] = [
  {
    name: SettingRoutes.SettingScreen,
    component: SettingScreen,
  },
  {
    name: SettingRoutes.VoiceSettingScreen,
    component: VoiceSettingScreen,
  },
];
