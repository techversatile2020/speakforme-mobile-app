import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CustomModal, PrimaryButton, Text } from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { useTheme } from '../../../../theme';
import { SD } from '../../../../utils';
import { useDeleteAccount } from '../../../../hooks';

export const DeleteAccountModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();
  const { mutate: deleteAccount, isPending } = useDeleteAccount(onClose);

  const handleDelete = async () => {
    deleteAccount();
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
          Are you sure you want to delete your account?
        </Text>
        <Text
          bold
          size={14}
          centered
          color={AppTheme.textSecondary}
          topSpacing={10}
        >
          This action is permanent — all your data will be lost and cannot be
          recovered.
        </Text>

        <View style={styles.buttonsView}>
          <PrimaryButton
            title={'Cancel'}
            isSecondary
            customStyles={{ width: '48%' }}
            onPress={onClose}
            isLoading={isPending}
          />
          <PrimaryButton
            title={'Delete Account'}
            customStyles={{ backgroundColor: AppTheme.red, width: '48%' }}
            onPress={handleDelete}
            isLoading={isPending}
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
