import React, { FC } from 'react';
import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { SD } from '../../utils';
import { Text } from '../text';
import { Image } from '../Image';

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
  iconSource?: ImageSourcePropType;
  iconStyles?: ImageStyle;
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
  iconSource,
  iconStyles,
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
          backgroundColor: disabled
            ? AppTheme.mutedDisable
            : AppTheme.background,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            // rowGap:100
            columnGap:SD.wp(5)
          }}
        >
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
          {iconSource && (
            <Image source={iconSource} styles={iconStyles} size={22} />
          )}
        </View>
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
