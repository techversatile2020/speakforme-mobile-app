import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  CustomInput,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { AuthRoutes } from '../../../../constants';
import { useTheme } from '../../../../theme';
import { navigationServices, SD } from '../../../../utils';

import { ModalHeader } from '../ModalHeader';

export const ChangePasswordModal = ({ visible, onClose }: any) => {
  const { AppTheme } = useTheme();

  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setisPasswordVisible3] = useState(false);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <MainContainer>
      <ModalHeader
        title="Change Password"
        onIconPress={() => {
          navigationServices.goBack();
        }}
      />
      <View style={{ flex: 1, marginTop: SD.hp(20) }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          bottomOffset={SD.hp(50)}
        >
          <Formik
            initialValues={{
              old_password: '',
              password: '',
              confirm_password: '',
            }}
            //   validationSchema={validationSchema}
            onSubmit={values => {
              navigationServices.reset_0(AuthRoutes['LoginScreen']);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ flex: 1 }}>
                <Text
                  color={AppTheme.textSecondary}
                  leftSpacing={5}
                  regular
                  size={14}
                >
                  Update your password for better security.
                </Text>
                <CustomInput
                  value={values.old_password}
                  onChangeText={handleChange('old_password')}
                  eye
                  secureTextEntry={!isPasswordVisible1}
                  hidepswdState={isPasswordVisible1}
                  onEyePress={() => setIsPasswordVisible1(!isPasswordVisible1)}
                  placeholder="Old Password"
                  // isIcon
                  customStyle={{
                    fontSize: SD.customFontSize(14),
                  }}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  eye
                  secureTextEntry={!isPasswordVisible2}
                  hidepswdState={isPasswordVisible2}
                  onEyePress={() => setIsPasswordVisible2(!isPasswordVisible2)}
                  placeholder="New Password"
                  // isIcon
                  customStyle={{
                    fontSize: SD.customFontSize(14),
                  }}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <CustomInput
                  inputRef={confirmPasswordRef}
                  returnKeyType="done"
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  eye
                  secureTextEntry={!isPasswordVisible3}
                  hidepswdState={isPasswordVisible3}
                  onEyePress={() => setisPasswordVisible3(!isPasswordVisible3)}
                  placeholder="Confirm Password"
                  // isIcon
                  customStyle={{
                    fontSize: SD.customFontSize(14),
                  }}
                  error={
                    touched.confirm_password && errors.confirm_password
                      ? errors.confirm_password
                      : undefined
                  }
                />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
      <PrimaryButton title={'Save'} customStyles={{ bottom: SD.hp(30) }} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
