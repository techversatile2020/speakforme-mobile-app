import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  Image as RNImage,
  StyleProp,
} from 'react-native';
import {useTheme} from '../../theme';
import {createStyles} from './styles';
import React from 'react';
import {SD} from '../../utils';

type PropsTypes = {
  source: ImageSourcePropType;
  styles?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  radius?: number;
  width?: number;
  height?: number;
  align?: 'auto' | 'baseline' | 'center' | 'flex-start' | 'flex-end';
  leftSpacing?: number;
  size?: number;
};

export const Image: React.FC<PropsTypes> = ({
  source,
  styles,
  resizeMode = 'contain',
  radius = 0,
  size,
  width = size || 100,
  height = size || 100,
  align,
  leftSpacing = 0,
}) => {
  const {AppTheme} = useTheme();
  const imageStyles = createStyles(AppTheme);
  return (
    <RNImage
      style={[
        imageStyles.imageStyles,
        {
          resizeMode,
          borderRadius: radius,
          width: SD.wp(width),
          height: SD.hp(height),
          alignSelf: align,
          marginLeft: SD.wp(leftSpacing),
        },
        styles,
      ]}
      source={source}
    />
  );
};
