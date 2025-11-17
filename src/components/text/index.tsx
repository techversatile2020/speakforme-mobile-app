import React, {ReactNode, use} from 'react';
import {Text as RNText, StyleSheet, TextProps, TextStyle} from 'react-native';
import {useTheme} from '../../theme';
import { FontSize, SD } from '../../utils';
import { Fonts } from '../../assets';

export type TextComponentProps = TextProps & {
  regular?: boolean;
  medium?: boolean;
  blackBold?: boolean;
  bold?: boolean;
  boldItalic?: boolean;
  extraBold?: boolean;
  extraLight?: boolean;
  extraLightItalic?: boolean;
  extraBoldItalic?: boolean;
  italic?: boolean;
  light?: boolean;
  lightItalic?: boolean;
  semiBoldItalic?: boolean;
  semiBold?: boolean;
  thin?: boolean;
  thinItalic?: boolean;
  urbanistSemiBold?: boolean;
  centered?: boolean;
  end?: boolean;
  right?: boolean;
  left?: boolean;
  inverse?: boolean;
  underlined?: boolean;
  color?: string;
  size?: number;
  leftSpacing?: number;
  rightSpacing?: number;
  topSpacing?: number;
  bottomSpacing?: number;
  letterSpacing?: number;
  style?: TextStyle | TextStyle[];
  width?: number | undefined;
  children?: ReactNode;
  opacity?: number;
  capitalize?: boolean;
  strikeThrough?: boolean;
  FontExtraSmall?: boolean;
  FontSmall?: boolean;
  FontRegular?: boolean;
  FontMedium?: boolean;
  FontLarge?: boolean;
  FontExtraLarge?: boolean;
  secondaryColor?: boolean;
  tertiaryColor?: boolean;
  primartColor?: boolean;
  underLineWithColor?: boolean;
  fontFamily?: string;
};

export const Text: React.FC<TextComponentProps> = ({
  medium,
  bold,
  light,
  blackBold,
  semiBold,
  centered,
  regular,
  end,
  right,
  left,
  underlined,
  color,
  opacity,
  size,
  capitalize,
  leftSpacing,
  rightSpacing,
  topSpacing,
  bottomSpacing,
  letterSpacing,
  strikeThrough,
  children,
  width = undefined,
  FontExtraSmall,
  FontSmall,
  FontRegular,
  FontMedium,
  FontLarge,
  FontExtraLarge,
  primartColor,
  secondaryColor,
  tertiaryColor,
  underLineWithColor,
  style = {},
  fontFamily,
  ...textProps
}) => {
  const { AppTheme} = useTheme();

  const FontFamily = Fonts

  return (
    <RNText
      style={[
        style,
        styles.default(AppTheme),
        {fontFamily: FontFamily.regular},
        bold && {fontFamily: FontFamily.bold},
        light && {fontFamily: FontFamily.light},
        regular && {fontFamily: FontFamily.regular},
        centered && styles.centered,
        end && styles.alignEnd,
        right && styles.right,

        left && styles.left,
        underlined && styles.underlined,
        strikeThrough && styles.strikeThrough,
        secondaryColor && {color: AppTheme.textSecondary},
        primartColor && {color: AppTheme.primary},
        underLineWithColor && {
          color: AppTheme.inputBackground,
          textDecorationLine: 'underline',
        },
        !!opacity && {opacity},
        !!size && {fontSize: SD.wp(size)},
        // !!weight && {FontWeight: weight},
        !!capitalize && styles.capitalize,
        !!leftSpacing && {marginLeft: SD.wp(leftSpacing)},
        !!rightSpacing && {marginRight: SD.wp(rightSpacing)},
        !!topSpacing && {marginTop: SD.hp(topSpacing)},
        !!bottomSpacing && {marginBottom: SD.hp(bottomSpacing)},
        !!letterSpacing && {letterSpacing: SD.wp(letterSpacing)},
        !!width && {width: SD.wp(width)},
        FontExtraSmall && {fontSize: FontSize.FontExtraSmall},
        FontSmall && {fontSize: FontSize.FontSmall},
        FontRegular && {fontSize: FontSize.FontRegular},
        FontMedium && {fontSize: FontSize.FontMedium},
        FontLarge && {fontSize: FontSize.FontLarge},
        FontExtraLarge && {fontSize: FontSize.FontExtraLarge},
        !!color && {color},
      ]}
      {...textProps}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create<any>({
  default: (AppTheme: any) => ({
    fontSize: SD.wp(16),
    color: AppTheme.PrimaryTextColor,
  }),
  centered: {
    textAlign: 'center',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
});

