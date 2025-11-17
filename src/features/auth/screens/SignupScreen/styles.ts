import { StyleSheet } from 'react-native';
import { lightColors } from '../../../../theme/colors';
import { SD } from '../../../../utils';

export const createStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      marginTop: SD.hp(10),
      alignSelf: 'center',
    },
    phoneInputContainer:{
      backgroundColor:colors.inputBackground,
      width:'100%',
      alignSelf:'center',
      height:SD.hp(60),
      borderRadius:12,
      marginVertical:SD.hp(8),
      alignItems:'center'
    },
    dropdownArrow:{
      width:SD.wp(10),
      height:SD.wp(5),
      resizeMode:'contain'
    }
  });
