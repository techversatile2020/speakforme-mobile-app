import { MainContainer, PrimaryButton, Text } from '../../../../components';
import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../../../../theme';
import { SD } from '../../../../utils';
import { Images } from '../../../../assets';
import { useDispatch } from 'react-redux';
import { setOnBoardingCompleted } from '../../../../redux';

const onboardingData = [
  {
    title: 'Speak Without Speaking',
    subtitle:
      'Type your message, and Speak for Me will convert it into a natural voice — so your thoughts are heard loud and clear.',
    image: Images.Onboarding1,
  },
  {
    title: 'Call Anyone Easily',
    subtitle:
      'Enter your number and the person you want to call. The app connects you both instantly — your words are spoken for you.',
    image: Images.Onboarding2,
  },
  {
    title: 'Powered by Smart Voice',
    subtitle:
      'Choose from natural voices and languages. Communicate in your own style with clear, human-like speech.',
    image: Images.Onboarding3,
  },
  {
    title: 'Inclusive Communication for All',
    subtitle:
      'Built for people who cannot speak — to connect, express, and be understood effortlessly.',
    image: Images.Onboarding4,
  },
];

export const OnboardingScreen = () => {
  const { AppTheme } = useTheme();
  const dispatch = useDispatch();
  const [stepIndex, setStepIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const goToNext = () => {
    if (stepIndex < onboardingData.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      dispatch(setOnBoardingCompleted(true));
    }
  };

  const goToPrevious = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 20,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx < -50 && stepIndex < onboardingData.length - 1) {
            goToNext();
          } else if (gesture.dx > 50 && stepIndex > 0) {
            goToPrevious();
          }
        },
      }),
    [stepIndex],
  );

  const current = onboardingData[stepIndex];

  return (
    <MainContainer isFlatList>
      <View style={{ flex: 1 }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={styles.animatedContainer}
        >
          <Image
            source={current.image}
            resizeMode="contain"
            style={styles.image}
          />
          <Text bold centered size={26}>
            {current.title}
          </Text>

          <Text
            topSpacing={20}
            centered
            regular
            size={16}
            style={styles.descriptionText}
          >
            {current.subtitle}
          </Text>
        </Animated.View>

        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === stepIndex ? AppTheme.primary : '#D3D3D3',
                },
              ]}
            />
          ))}
        </View>
        <Pressable onPress={() => dispatch(setOnBoardingCompleted(true))}>
          <Text style={styles.skipButton}>Skip</Text>
        </Pressable>
      </View>

      <PrimaryButton
        customStyles={styles.nextButton}
        title={'Conitune'}
        onPress={goToNext}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    alignSelf: 'center',
    marginTop: SD.hp(20),
  },
  animatedContainer: {
    marginTop: SD.hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    // letterSpacing: SD.wp(0.7),
    lineHeight: SD.hp(22),
    width: '90%',
  },
  image: {
    marginTop: SD.hp(20),
    width: '100%',
    height: '65%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: SD.wp(8),
    height: SD.hp(8),
    borderRadius: 5,
    marginHorizontal: SD.wp(5),
  },
  nextButton: {
    // marginTop: SD.hp(30),
    width: '90%',
    alignSelf: 'center',
  },
});
