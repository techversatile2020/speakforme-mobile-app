import { SettingRoutes, SettingsModalRoutes } from '../../constants';
import {
  ChangePasswordModal,
  ChooseLanguageModal,
  ChooseStyleModal,
  ChooseVoiceModal,
  EditProfileModal,
  SettingScreen,
  SubscriptionModal,
  VoiceSettingScreen,
} from '../../features';
import { ContactPicker } from '../../features/calling/components';

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
  {
    name: SettingsModalRoutes.ContactModal,
    component: ContactPicker,
  },

  {
    name: SettingsModalRoutes.SubscriptionModal,
    component: SubscriptionModal,
  },
];
