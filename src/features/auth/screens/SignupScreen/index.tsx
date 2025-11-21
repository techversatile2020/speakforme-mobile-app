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
import { Icons, Images } from '../../../../assets';
import { navigationServices, SD } from '../../../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { TextInput, View } from 'react-native';
import { CardContainer } from '../../../../components/card-container';
import PhoneInput from '@linhnguyen96114/react-native-phone-input';
import { AuthRoutes } from '../../../../constants';
import { signupValidationSchema } from './validation.schema';
import { useSignup } from '../../../../hooks';

export const SignupScreen = () => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const { mutate: signUp, isPending } = useSignup();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <MainContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            country: {
              callingCode: '+92',
              letterCode: 'PK',
            },
          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => {
            const payload = {
              username: values.fullName,
              email: values.email,
              password: values.password,
              mobile: `${values.country.callingCode}${values.phone}`,
            };
            signUp(payload);
            console.log('VALUES => ', payload);

            // navigationServices.navigate(AuthRoutes['OTPVerificationScreen'], {
            //   from: 'signup',
            // });
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
                  Sign up to get started
                </Text>
                <CustomInput
                  inputRef={fullNameRef}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  placeholder="Enter Full Name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  containerStyle={{ width: '100%' }}
                  blurOnSubmit={false}
                  autoCorrect={false}
                  autoComplete="off"
                  autoCapitalize="none"
                />
                <CustomInput
                  autoCapitalize="none"
                  inputRef={emailRef}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  placeholder="Enter Email Address"
                  isIcon
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  blurOnSubmit={false}
                  autoCorrect={false}
                  autoComplete="off"
                />
                <PhoneInput
                  defaultValue={values.phone}
                  defaultCode="PK"
                  onChangeText={n => {
                    setFieldValue('phone', n);
                  }}
                  containerStyle={styles.phoneInputContainer}
                  renderDropdownImage={
                    <Image
                      source={Icons.arrowDown}
                      styles={styles.dropdownArrow}
                    />
                  }
                  onChangeCountry={e => {
                    let country = {
                      callingCode: e?.callingCode[0],
                      letterCode: e?.cca2,
                    };
                    setFieldValue('country', country);
                  }}
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

                <PrimaryButton
                  title={'Register Now'}
                  onPress={handleSubmit}
                  customStyles={{ marginTop: SD.hp(20), height: SD.hp(58) }}
                  isLoading={isPending}
                />
                <View style={styles.footer}>
                  <Text size={11} regular>
                    Already Have an Account?{' '}
                  </Text>
                  <CardContainer
                    onPress={() =>
                      navigationServices.navigate(AuthRoutes['LoginScreen'])
                    }
                  >
                    <Text size={11} regular color={AppTheme.primary}>
                      Login Now
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
