import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomInput,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { useUpdateProfile } from '../../../../hooks';
import { useTheme } from '../../../../theme';
import { navigationServices, SD } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';

export const EditProfileModal = () => {
  const { AppTheme } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const [fullName, setFullName] = useState(user?.username || '');
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile(() =>
    navigationServices.goBack(),
  );

  const handleSave = () => {
    navigationServices.goBack();
    updateProfileMutation({ username: fullName });
  };
  return (
    <MainContainer>
      <ModalHeader
        title="Edit Profile"
        onIconPress={() => navigationServices.goBack()}
      />
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
