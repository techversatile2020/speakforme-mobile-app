import React, { useState } from 'react';
import { Icons } from '../../../../assets';
import { Header, MainContainer, Text } from '../../../../components';
import { SettingRoutes, SettingsModalRoutes } from '../../../../constants';
import { navigationServices } from '../../../../utils';
import { DeleteAccountModal, LogoutModal, SettingCard } from '../../components';

export const SettingScreen = () => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const optionsData = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: Icons.profile,
      // onPress: () => setShowEditProfileModal(true),
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['EditProfile']),
    },
    {
      id: 2,
      title: 'Change Password',
      icon: Icons.password,
      // onPress: () => setShowChangePasswordModal(true),
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['ChangePassword']),
    },
    {
      id: 3,
      title: 'Voice Settings',
      icon: Icons.voice,
      onPress: () =>
        navigationServices.navigate(SettingRoutes['VoiceSettingScreen']),
    },
    {
      id: 3,
      title: 'Subscriptions',
      icon: Icons.voice,
      onPress: () =>
        navigationServices.navigate(SettingsModalRoutes['SubscriptionModal']),
    },
    {
      id: 4,
      title: 'Delete Account',
      icon: Icons.delete,
      onPress: () => setShowDeleteAccountModal(true),
    },
    {
      id: 5,
      title: 'Logout',
      icon: Icons.logout,
      onPress: () => setShowLogoutModal(true),
    },
  ];

  return (
    <MainContainer>
      <Header />

      <Text bold size={26} topSpacing={20} bottomSpacing={20}>
        Settings
      </Text>

      {optionsData.map(item => {
        return <SettingCard key={item?.id?.toString()} data={item} />;
      })}
      <DeleteAccountModal
        visible={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
      />
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </MainContainer>
  );
};
