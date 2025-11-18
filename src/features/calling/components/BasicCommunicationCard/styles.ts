import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:100,
        padding:SD.hp(12),
        height:SD.wp(42),
        justifyContent:'center',
        alignItems:'center',
        margin:SD.wp(10)
    }
  });
