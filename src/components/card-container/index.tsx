import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, View, ViewStyle} from 'react-native';
// import {useTheme} from '../../hooks';
import {styles} from './CardContainerStyles';
import {CardContainerProps} from './CardContainerTypes';
import { useTheme } from '../../theme';

// Create an animated version of Pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AnimationType = 'opacity' | 'scale' | 'both'; // Define animation types

export const CardContainer: React.FC<
  CardContainerProps & {animationType?: AnimationType}
> = ({
  children,
  borderColor,
  customStyles,
  onPress,
  cardContainerRef,
  backgroundColor,
  showSimpleView = false,
  showShadow = true,
  disabled = false,
  animationType = 'both', // Default to both animations
}) => {
  const {AppTheme} = useTheme();

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current; // Default opacity is 1
  const scaleAnim = useRef(new Animated.Value(1)).current; // Default scale is 1

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {

    const animations = [];

    // Check animation type and add animations accordingly
    if (animationType === 'opacity' || animationType === 'both') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 0.8, // Reduced opacity
          duration: 150,
          useNativeDriver: true,
        }),
      );
    }

    if (animationType === 'scale' || animationType === 'both') {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 0.95, // Slightly shrink the card
          useNativeDriver: true,
          friction: 5,
        }),
      );
    }

    Animated.parallel(animations).start();
  };

  const handlePressOut = () => {
    const animations = [];

    // Check animation type and add animations accordingly
    if (animationType === 'opacity' || animationType === 'both') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1, // Restore opacity
          duration: 150,
          useNativeDriver: true,
        }),
      );
    }

    if (animationType === 'scale' || animationType === 'both') {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 1, // Restore scale
          useNativeDriver: true,
          friction: 5,
        }),
      );
    }

    Animated.parallel(animations).start();
  };

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity:
      animationType === 'opacity' || animationType === 'both'
        ? fadeAnim
        : undefined,
    transform:
      animationType === 'scale' || animationType === 'both'
        ? [{scale: scaleAnim}]
        : undefined,
    borderColor: borderColor || AppTheme.primary,
    backgroundColor: backgroundColor || AppTheme.background,
  };

  return showSimpleView ? (
    <View style={[styles.container(AppTheme), customStyles]}>{children}</View>
  ) : (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      ref={cardContainerRef}
      style={[styles.container(AppTheme), animatedStyle, customStyles]}>
      {children}
    </AnimatedPressable>
  );
};
