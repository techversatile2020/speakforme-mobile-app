import React, { useRef, useState } from 'react';
import { useTheme } from '../../../../theme';
import {
  CustomInput,
  Image,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { Images } from '../../../../assets';
import { navigationServices, SD } from '../../../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { TextInput, View } from 'react-native';
import { validationSchema } from './validation.schema';
import { AuthRoutes } from '../../../../constants';
import { useResetPassword } from '../../../../hooks';

export const ChangePasswordScreen = ({ route }: any) => {
  const { AppTheme } = useTheme();
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { email } = route?.params || {};

  const { mutate: resetPasswordMutate } = useResetPassword();

  return (
    <MainContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <Formik
          initialValues={{ password: '', confirm_password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // navigationServices.reset_0(AuthRoutes['LoginScreen']);
            resetPasswordMutate({
              email,
              password: values.password,
            });
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={{ flex: 1 }}>
              <Image source={Images.logo} size={189} align="center" />
              <View style={{ marginTop: SD.hp(60), flex: 1 }}>
                <Text
                  color={AppTheme.textSecondary}
                  leftSpacing={5}
                  regular
                  size={14}
                  bottomSpacing={12}
                >
                  Please set a strong new password for your account.
                </Text>
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  eye
                  secureTextEntry={!isPasswordVisible1}
                  hidepswdState={isPasswordVisible1}
                  onEyePress={() => setIsPasswordVisible1(!isPasswordVisible1)}
                  placeholder="New Password"
                  isIcon
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
                  secureTextEntry={!isPasswordVisible2}
                  hidepswdState={isPasswordVisible2}
                  onEyePress={() => setIsPasswordVisible2(!isPasswordVisible2)}
                  placeholder="Confirm Password"
                  isIcon
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
                title={'Confirm'}
                onPress={handleSubmit}
                customStyles={{ marginTop: SD.hp(20), height: SD.hp(58) }}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
