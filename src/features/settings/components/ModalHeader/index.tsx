import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image, Text } from '../../../../components';
import { SD } from '../../../../utils';
import { Icons } from '../../../../assets';
import { useTheme } from '../../../../theme';

export const ModalHeader = ({ title, onIconPress, subTitle,containerStyles }: any) => {
  const { AppTheme } = useTheme();
  return (
    <View style={[styles.container,containerStyles]}>
      <View style={styles.leftSideView}>
        {title && (
          <Text bold size={26}>
            {title}
          </Text>
        )}
        {subTitle && (
          <Text regular size={14} color={AppTheme.textSecondary}>
            {subTitle}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.backButton,
          { backgroundColor: AppTheme.inputBackground },
        ]}
        onPress={onIconPress}
      >
        <Image source={Icons.close} size={12} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSideView: {
    rowGap: SD.wp(3),
  },
  backButton: {
    width: SD.wp(40),
    height: SD.wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
