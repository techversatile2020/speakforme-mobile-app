import { useTheme } from '../../../../theme';
import {
  Header,
  MainContainer,
  Text,
  CustomInput,
  Image,
  PrimaryButton,
} from '../../../../components';
import { Images } from '../../../../assets';
import { navigationServices, SD } from '../../../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { View } from 'react-native';
import { validationSchema } from './validation.schema';
import { AuthRoutes } from '../../../../constants';
import { useForgotPassword } from '../../../../hooks';

export const ForgotPasswordScreen = () => {
  const { AppTheme } = useTheme();
  const { mutate: forgotPasswordMutate,isPending } = useForgotPassword();
  return (
    <MainContainer>
      <Header />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // navigationServices.navigate(AuthRoutes['OTPVerificationScreen']);
            forgotPasswordMutate({
              email: values.email,
            });
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
            <View style={{ flex: 1 }}>
              <Image source={Images.logo} size={189} align="center" />
              <View style={{ marginTop: SD.hp(50), flex: 1 }}>
                <Text
                  color={AppTheme.textSecondary}
                  leftSpacing={5}
                  regular
                  size={14}
                  bottomSpacing={12}
                >
                  To reset your password, enter your registered email
                </Text>
                <CustomInput
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter email"
                  isIcon
                  customStyle={{ fontSize: SD.customFontSize(14) }}
                  returnKeyType="done"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
              </View>
              <PrimaryButton
                title={'Continue'}
                onPress={handleSubmit}
                isLoading={isPending}
                customStyles={{ marginTop: SD.hp(20), height: SD.hp(58) }}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
