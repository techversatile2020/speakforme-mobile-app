import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
  CustomInput,
  CustomModal,
  PrimaryButton,
  Text,
} from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { useTheme } from '../../../../theme';
import { SD } from '../../../../utils';

export const EditProfileModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();
  const [fullName, setFullName] = useState('Joel Osteen');
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      type="bottomsheet"
      modalHeight="93%"
    >
      <ModalHeader title="Edit Profile" onIconPress={onClose} />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        <Text size={14} color={AppTheme.textSecondary} regular leftSpacing={8}>
          Full Name
        </Text>
        <CustomInput value={fullName} onChangeText={setFullName} />
      </View>
      <PrimaryButton title={'Save'} customStyles={{ bottom: SD.hp(30) }} />
    </CustomModal>
  );
};

const styles = StyleSheet.create({});
