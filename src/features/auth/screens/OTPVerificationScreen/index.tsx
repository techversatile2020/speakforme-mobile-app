import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import {
  Header,
  Image,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../../components';
import { Images } from '../../../../assets';
import { OtpInput } from 'react-native-otp-entry';
import { navigationServices, SD } from '../../../../utils';
import { TouchableOpacity, View } from 'react-native';
import { AuthRoutes } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useResendOtp, useVerifyAccount } from '../../../../hooks';

export const OTPVerificationScreen = ({ route }: any) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  const { from, email } = route?.params || {};
  const [timer, setTimer] = useState(60);
  const [otp, setotp] = useState('');

  const { mutate: resendOtp } = useResendOtp();
  const { mutate: verifyAccount, isPending } = useVerifyAccount(() => {
    if (from == 'signup') {
      navigationServices.reset_0(AuthRoutes.LoginScreen);
    } else {
      navigationServices.reset_0(AuthRoutes.ChangePasswordScreen, { email });
    }
  });

  const flowTypeUrl = from === 'signup' ? 'verify_otp' : 'forgot_password';

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onResendPress = () => {
    setTimer(60);
    resendOtp({ email, otp_type: flowTypeUrl });
  };

  const handleConfirm = () => {
    if (from == 'signup')
      return navigationServices.reset_0(AuthRoutes['LoginScreen']);
    navigationServices.navigate(AuthRoutes['ChangePasswordScreen']);

    // const payload = {
    //   email: email,
    //   otp: '000000',
    //   otp_type: flowTypeUrl,
    // };
    // verifyAccount(payload);
  };
  return (
    <MainContainer>
      {from !== 'signup' && <Header />}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={SD.hp(50)}
      >
        <View style={{ flex: 1 }}>
          <Image source={Images.logo} size={189} align="center" />
          <Text
            color={AppTheme.textSecondary}
            leftSpacing={5}
            regular
            size={14}
            bottomSpacing={12}
            topSpacing={20}
          >
            Please enter 6-digit code we have sent you on your email
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={text => setotp(text)}
            placeholder="******"
            type="numeric"
            focusColor={AppTheme.textPrimary}
            theme={{
              containerStyle: {
                marginTop: SD.hp(10),
              },
            }}
          />
          <TouchableOpacity
            style={styles.resendButton}
            onPress={onResendPress}
            disabled={timer !== 0}
          >
            <Text centered color={AppTheme.primary}>
              {timer === 0 ? 'Resend code?' : `Resend code in ${timer}s`}
            </Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title={'Confirm'}
          onPress={handleConfirm}
          isLoading={isPending}
        />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
