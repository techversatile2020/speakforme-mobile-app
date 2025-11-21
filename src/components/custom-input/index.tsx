import React, { FC, Ref, useState } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
// import {Images} from '../../config';
// import {useTheme} from '../../hooks';
// import {Fonts} from '../../styles';
import { SD } from '../../utils';
import { useTheme } from '../../theme';
import { Text } from '../text';
import { Fonts, Icons } from '../../assets';
import { CardContainer } from '../card-container';

export const MyDropDownContent: React.FC<{ text?: string }> = ({ text }) => (
  <View
    style={{
      borderWidth: 1,
      paddingHorizontal: SD.wp(10),
      marginTop: SD.hp(10),
    }}
  >
    <Text size={14} regular>
      {text}
    </Text>
  </View>
);

export type CustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  containerStyle?: ViewProps['style'];
  onEyePress?: () => void;
  hidepswdState?: boolean;
  secondaryIcon?: boolean;
  source?: ImageProps['source'];
  eye?: boolean;
  isIcon?: boolean;
  iconImage?: ImageProps['source'];
  onBtnPress?: () => void;
  isPressableIcon?: boolean;
  iconStyle?: ImageProps['style'];
  error?: string;
  touched?: boolean;
  inputRef?: Ref<TextInput>;
  onBlur?: () => void;
  focusBorderColor?: string;
  isSecondary?: boolean;
  onSearchQueryChange?: (text: string) => void;
  searchQuery?: string;
  onSearchPress?: (text: string) => void;
  iconImageStyles?: ImageStyle;
  leftIconSource?: ImageSourcePropType;
  leftIconPress?: () => void;
  leftIconSourceStyles?: ImageStyle;
};

export const CustomInput: FC<CustomInputProps> = ({
  customStyle,
  containerStyle,
  onEyePress,
  hidepswdState,
  secondaryIcon,
  source,
  eye,
  isIcon,
  iconImage,
  onBtnPress,
  isPressableIcon,
  iconStyle = {},
  error,
  touched,
  inputRef,
  onBlur,
  focusBorderColor,
  isSecondary,
  onSearchQueryChange,
  searchQuery,
  iconImageStyles,
  leftIconSource,
  leftIconSourceStyles,
  leftIconPress,
  ...rest
}) => {
  const { AppTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <CardContainer
        animationType="opacity"
        customStyles={[
          styles.textContainer(AppTheme, isSecondary),
          isFocused && {
            borderColor: focusBorderColor || AppTheme.primary,

            // borderRadius:SD.hp(10),
          },

          containerStyle,
        ]}
      >
        {leftIconSource && (
          <Image
            source={leftIconSource}
            style={[
              {
                width: SD.wp(20),
                height: SD.hp(20),
                // borderWidth:1,
                resizeMode: 'contain',
              },
              // leftIconSourceStyles,
            ]}
            resizeMode="contain"
          />
        )}
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (onBlur) onBlur();
            setIsFocused(false);
          }}
          selectionColor={AppTheme.primary}
          style={[
            styles.textInput(AppTheme),
            (!eye || !isIcon || !leftIconSource) && {
              width: '90%',
              // borderWidth:1
            },
            customStyle,
          ]}
          placeholderTextColor={AppTheme.textPlaceholder}
          ref={inputRef}
          onChangeText={text => {
            onSearchQueryChange?.(text);
          }}
          {...rest}
        />
        {isIcon && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.eyeStyle(AppTheme),
              {
                height: '50%',
                // borderWidth:1
              },
              iconStyle,
            ]}
            onPress={() => isPressableIcon && onBtnPress && onBtnPress()}
          >
            <Image
              source={iconImage}
              style={[
                {
                  width: SD.wp(15),
                  height: SD.hp(15),
                  // borderWidth:1
                },
                iconImageStyles,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.eyeStyle(AppTheme),
              {
                // alignItems: 'flex-end',
              },
            ]}
            onPress={onEyePress}
          >
            {hidepswdState ? (
              <Image
                source={Icons.eyeShow}
                style={{
                  width: SD.wp(18),
                  height: SD.hp(18),
                  tintColor: AppTheme.lightGray,
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Icons.eyeOff}
                style={{
                  width: SD.wp(18),
                  height: SD.hp(18),
                  tintColor: AppTheme.lightGray,
                }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        )}
      </CardContainer>
      {error && (
        <Text size={10} leftSpacing={10} color={'red'} topSpacing={-5}>
          {error}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create<any>({
  textContainer: (AppTheme: any, isSecondary: boolean) => ({
    borderRadius: SD.hp(12),
    height: SD.hp(60),
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: SD.hp(8),
    backgroundColor: AppTheme.inputBackground,
    alignItems: 'center',
    paddingLeft: SD.wp(10),
    paddingRight: SD.wp(10),
    justifyContent: 'space-between',
  }),
  textInput: (AppTheme: any) => ({
    fontSize: SD.customFontSize(14),
    height: '100%',
    width: '85%',
    paddingLeft: SD.wp(5),
    fontFamily: Fonts['regular'],
    color: AppTheme.greytextColor,
  }),
  eyeStyle: (AppTheme: any) => ({
    width: '10%',
    height: '100%',
    justifyContent: 'center',
  }),
});
