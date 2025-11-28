import { SettingRoutes, SettingsModalRoutes } from '../../constants';
import {
  ChangePasswordModal,
  ChooseLanguageModal,
  ChooseStyleModal,
  ChooseVoiceModal,
  EditProfileModal,
  SettingScreen,
  VoiceSettingScreen,
} from '../../features';

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

export const SettingModalStacks: any[] = [
  {
    name: SettingsModalRoutes.ChangePassword,
    component: ChangePasswordModal,
  },
  {
    name: SettingsModalRoutes.EditProfile,
    component: EditProfileModal,
  },
  {
    name: SettingsModalRoutes.ChooseVoice,
    component: ChooseVoiceModal,
  },
  {
    name: SettingsModalRoutes.ChooseStyle,
    component: ChooseStyleModal,
  },
  {
    name: SettingsModalRoutes.ChooseLanguage,
    component: ChooseLanguageModal,
  },
];
