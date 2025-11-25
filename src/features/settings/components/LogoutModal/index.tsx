import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CustomModal, PrimaryButton, Text } from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { useTheme } from '../../../../theme';
import { navigationServices, SD } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { logout, setToken } from '../../../../redux/authSlices';
import { OnBoardingRoutes } from '../../../../constants';

export const LogoutModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // navigationServices.reset_0(OnBoardingRoutes['getStartedScreen']);
  };
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      //   type="bottomsheet"
      modalHeight="80%"
    >
      <View style={{ flex: 1 }}>
        <Text bold size={20} centered>
          Are you sure you want to log out?
        </Text>
        <Text
          bold
          size={14}
          centered
          color={AppTheme.textSecondary}
          topSpacing={10}
        >
          You’ll need to sign in again to access your account.
        </Text>

        <View style={styles.buttonsView}>
          <PrimaryButton
            title={'Cancel'}
            isSecondary
            customStyles={{ width: '48%' }}
            onPress={onClose}
          />
          <PrimaryButton
            title={'Logout'}
            customStyles={{ backgroundColor: AppTheme.red, width: '48%' }}
            onPress={handleLogout}
          />
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SD.hp(10),
  },
});
