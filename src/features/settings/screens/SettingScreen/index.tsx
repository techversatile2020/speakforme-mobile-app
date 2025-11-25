import React, { useState } from 'react';
import { Header, MainContainer, Text } from '../../../../components';
import {
  ChangePasswordModal,
  DeleteAccountModal,
  EditProfileModal,
  LogoutModal,
  SettingCard,
} from '../../components';
import { Icons } from '../../../../assets';
import { navigationServices } from '../../../../utils';
import { SettingRoutes } from '../../../../constants';
import { View } from 'react-native';

export const SettingScreen = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const optionsData = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: Icons.profile,
      onPress: () => setShowEditProfileModal(true),
    },
    {
      id: 2,
      title: 'Change Password',
      icon: Icons.password,
      onPress: () => setShowChangePasswordModal(true),
    },
    {
      id: 3,
      title: 'Voice Settings',
      icon: Icons.voice,
      onPress: () =>
        navigationServices.navigate(SettingRoutes['VoiceSettingScreen']),
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
    <>
      <MainContainer>
        <Header />

        <Text bold size={26} topSpacing={20} bottomSpacing={20}>
          Settings
        </Text>

        {optionsData.map(item => {
          return <SettingCard key={item?.id?.toString()} data={item} />;
        })}
        <EditProfileModal
          visible={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
        />
        <ChangePasswordModal
          visible={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
        />
        <DeleteAccountModal
          visible={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
        />
        <LogoutModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
      </MainContainer>

      {(showChangePasswordModal || showEditProfileModal) && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 999,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
    </>
  );
};
