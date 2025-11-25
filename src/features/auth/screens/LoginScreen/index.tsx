import React, { useRef, useState } from 'react';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import {
  CustomInput,
  Image,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { Images } from '../../../../assets';
import { navigationServices, SD } from '../../../../utils';
import { AuthRoutes } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { validationSchema } from './validation.schema';
import { TextInput, View } from 'react-native';
import { CardContainer } from '../../../../components/card-container';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../../redux/authSlices';
import { store } from '../../../../redux';
import { useLogin } from '../../../../hooks';

export const LoginScreen = () => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: login, isPending } = useLogin();

  return (
    <MainContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            const payload = {
              email: values.email.trim().toLowerCase(),
              password: values.password,
            };
            login(payload);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              <Image source={Images.logo} size={189} align="center" />
              <View style={{ marginTop: SD.hp(60) }}>
                <Text
                  color={AppTheme.textSecondary}
                  leftSpacing={5}
                  regular
                  size={14}
                  bottomSpacing={12}
                >
                  Login to get started
                </Text>
                <CustomInput
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter email"
                  isIcon
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
                <CustomInput
                  inputRef={passwordRef}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  eye
                  secureTextEntry={!isPasswordVisible}
                  hidepswdState={isPasswordVisible}
                  onEyePress={() => setIsPasswordVisible(!isPasswordVisible)}
                  placeholder="Enter password"
                  // isIcon
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  returnKeyType="done"
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
                <CardContainer
                  onPress={() =>
                    navigationServices.navigate(
                      AuthRoutes['ForgotPasswordScreen'],
                      {
                        type: 'forgot_password',
                      },
                    )
                  }
                >
                  <Text
                    topSpacing={2}
                    regular
                    size={12}
                    color={AppTheme.primary}
                    end
                  >
                    Forgot Password?
                  </Text>
                </CardContainer>
                <PrimaryButton
                  title={'Login'}
                  onPress={handleSubmit}
                  isLoading={isPending}
                  customStyles={{ marginTop: SD.hp(20), height: SD.hp(58) }}
                />
                <View style={styles.footer}>
                  <Text size={11} regular>
                    Don’t Have an Account?{' '}
                  </Text>
                  <CardContainer
                    onPress={() =>
                      navigationServices.navigate(AuthRoutes['SignupScreen'])
                    }
                  >
                    <Text size={11} regular color={AppTheme.primary}>
                      Register Now
                    </Text>
                  </CardContainer>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
