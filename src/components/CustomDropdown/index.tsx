import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text } from '../text';
import { lightColors } from '../../theme/colors';
import { useTheme } from '../../theme';
import { SD } from '../../utils';
import { Fonts } from '../../assets';

export const CustomDropdown = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  style,
}: any) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);
  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text size={14} regular leftSpacing={5} bottomSpacing={5}>
          {label}
        </Text>
      ) : null}

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={placeholder}
        onChange={item => onChange(item.value)}
        disable={disabled}
        // itemContainerStyle={{backgroundColor:'red',borderRadius:19}}
        containerStyle={{ borderRadius: 12 }}
        itemTextStyle={{
          fontSize: SD.customFontSize(14),
          color: AppTheme.textSecondary,
          fontFamily: Fonts['regular'],
        }}
      />
    </View>
  );
};

const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      fontSize: 22,
      marginBottom: 12,
      fontWeight: '500',
    },
    dropdown: {
      height: SD.hp(60),
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    placeholderStyle: {
      fontSize: SD.customFontSize(14),
      color: colors.textSecondary,
      fontFamily: Fonts['regular'],
    },
    selectedTextStyle: {
      fontSize: SD.customFontSize(14),
      color: colors.textPrimary,
      fontFamily: Fonts['regular'],
    },
    iconStyle: {
      width: SD.wp(20),
      height: SD.wp(20),
    },
  });
