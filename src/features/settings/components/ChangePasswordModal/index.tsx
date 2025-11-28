import React, { useRef, useState } from 'react';
import { useTheme } from '../../../../theme';
import {
  CustomInput,
  PrimaryButton,
  Text,
  MainContainer,
} from '../../../../components';
import { navigationServices, SD } from '../../../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { StyleSheet, TextInput, View } from 'react-native';
import { ModalHeader } from '../ModalHeader';
import { useChangePassword } from '../../../../hooks';
import { changePasswordValidationSchema } from './validation.schema';

export const ChangePasswordModal = () => {
  const { AppTheme } = useTheme();

  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setisPasswordVisible3] = useState(false);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: changePasswordMutation, isPending } = useChangePassword(() =>
    navigationServices.goBack(),
  );

  return (
    <MainContainer>
      <ModalHeader
        title="Change Password"
        onIconPress={() => navigationServices.goBack()}
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
            validationSchema={changePasswordValidationSchema}
            onSubmit={values => {
              // navigationServices.reset_0(AuthRoutes['LoginScreen']);
              const payload = {
                old_password: values.old_password,
                password: values.password,
              };

              changePasswordMutation(payload);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ flex: 1 }}>
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
                    onEyePress={() =>
                      setIsPasswordVisible1(!isPasswordVisible1)
                    }
                    placeholder="Old Password"
                    // isIcon
                    customStyle={{
                      fontSize: SD.customFontSize(14),
                    }}
                    error={
                      touched.old_password && errors.old_password
                        ? errors.old_password
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
                    onEyePress={() =>
                      setIsPasswordVisible2(!isPasswordVisible2)
                    }
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
                    onEyePress={() =>
                      setisPasswordVisible3(!isPasswordVisible3)
                    }
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
                <PrimaryButton
                  title={'Save'}
                  customStyles={{ bottom: SD.hp(30) }}
                  isLoading={isPending}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
