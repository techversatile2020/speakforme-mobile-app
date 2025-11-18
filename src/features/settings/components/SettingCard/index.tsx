import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../../../theme';
import { createStyles } from './styles';
import { Image, Text } from '../../../../components';
import { Icons } from '../../../../assets';

export const SettingCard = ({ data }: any) => {
  const { AppTheme } = useTheme();
  const styles = createStyles(AppTheme);

  const { title, icon, onPress } = data;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.leftSideView}>
        <Image source={icon} size={23} />
        <Text bold size={16}>
          {title}
        </Text>
      </View>
      <Image source={Icons.rightArrow} size={20} />
    </TouchableOpacity>
  );
};
