import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CustomInput,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { useTheme } from '../../../../theme';
import { navigationServices, SD } from '../../../../utils';
import { ModalHeader } from '../ModalHeader';

export const EditProfileModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();
  const [fullName, setFullName] = useState('Joel Osteen');
  return (
    <MainContainer>
      <ModalHeader
        title="Edit Profile"
        onIconPress={() => {
          navigationServices.goBack();
        }}
      />
      <View style={{ flex: 1, marginTop: SD.hp(30) }}>
        <Text size={14} color={AppTheme.textSecondary} regular leftSpacing={8}>
          Full Name
        </Text>
        <CustomInput value={fullName} onChangeText={setFullName} />
      </View>
      <PrimaryButton title={'Save'} customStyles={{ bottom: SD.hp(30) }} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
