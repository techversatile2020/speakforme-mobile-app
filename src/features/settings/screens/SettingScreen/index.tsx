import React, { useState } from 'react';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import {
  CustomInput,
  CustomModal,
  Header,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import {
  ChangePasswordModal,
  DeleteAccountModal,
  EditProfileModal,
  LogoutModal,
  ModalHeader,
  SettingCard,
} from '../../components';
import { Icons } from '../../../../assets';

export const SettingScreen = () => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
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
      onPress: () => null,
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
  );
};
