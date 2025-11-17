import {StyleSheet} from 'react-native';
import {lightColors} from '../../theme/colors';
import {SD} from '../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    imageStyles: {
      width: SD.wp(100),
      height: SD.hp(100),
      resizeMode: 'contain',
    },
  });
