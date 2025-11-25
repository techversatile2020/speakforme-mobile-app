import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { MainContainer, PrimaryButton, Text } from '../../../../components';
import { Images } from '../../../../assets';
import { navigationServices, SD } from '../../../../utils';
import { AuthRoutes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { setOnBoardingCompleted } from '../../../../redux';

export const GetStartedScreen = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigationServices.reset_0(AuthRoutes['LoginScreen']);
    dispatch(setOnBoardingCompleted(true));
  };

  const handleRegister = () => {
    navigationServices.reset_0(AuthRoutes['SignupScreen']);
    dispatch(setOnBoardingCompleted(true));
  };

  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <Image source={Images.getStarted} style={styles.image} />
        <Text bold centered size={26} topSpacing={20}>
          Ready to Speak for You
        </Text>
        <Text
          topSpacing={15}
          centered
          regular
          size={16}
          style={styles.descriptionText}
        >
          Login or sign up to start calling and speaking through your voice
          assistant.
        </Text>
      </View>
      <PrimaryButton
        title={'Login'}
        customStyles={styles.button}
        onPress={handleLogin}
      />
      <PrimaryButton
        title={'Register'}
        isSecondary
        customStyles={styles.button}
        onPress={handleRegister}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  descriptionText: {
    lineHeight: SD.hp(22),
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
  },
});
