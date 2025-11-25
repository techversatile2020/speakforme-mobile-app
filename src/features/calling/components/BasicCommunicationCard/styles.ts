import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 100,
      padding: SD.hp(12),
      height: SD.wp(42),
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: SD.wp(10),
      marginTop: SD.hp(10),
      // width: SD.wp(150),
    },
  });
