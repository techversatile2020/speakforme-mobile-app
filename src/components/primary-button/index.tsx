import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { SD } from '../../utils';
import { Text } from '../text';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: any;
  isLoading?: boolean;
  disabled?: boolean;
  width?: number | string;
  color?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  fontSize?: number;
  isSecondary?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color,
  textColor = '#ffffff',
  customStyles,
  fontSize = 14,
  isSecondary = false,
  ...rest
}) => {
  const { AppTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: disabled ? AppTheme.mutedDisable : AppTheme.primary,
        },
        isSecondary && {
          borderWidth: 1,
          borderColor: AppTheme.primary,
          backgroundColor: disabled ? AppTheme.mutedDisable : AppTheme.background,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          bold
          centered
          size={fontSize}
          capitalize
          color={isSecondary ? AppTheme.primary : textColor}
          style={{ textTransform: 'none' }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: SD.hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SD.hp(10),
    borderRadius: SD.hp(30),
  },
});
