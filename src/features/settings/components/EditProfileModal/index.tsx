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
import { useSelector } from 'react-redux';
import { useUpdateProfile } from '../../../../hooks';

export const EditProfileModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const [fullName, setFullName] = useState(user?.username || '');
  const { mutate: updateProfileMutation, isPending } =
    useUpdateProfile(onClose);

  const handleSave = () => {
    onClose();
    updateProfileMutation({ username: fullName });
  };
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      type="bottomsheet"
      modalHeight="87%"
      isOverlay={false}
    >
      <ModalHeader title="Edit Profile" onIconPress={onClose} />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        <Text size={14} color={AppTheme.textSecondary} regular leftSpacing={8}>
          Full Name
        </Text>
        <CustomInput value={fullName} onChangeText={setFullName} />
      </View>
      <PrimaryButton
        title={'Save'}
        onPress={handleSave}
        customStyles={{ bottom: SD.hp(30) }}
        isLoading={isPending}
        disabled={user?.username?.trim() === fullName?.trim()}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({});
