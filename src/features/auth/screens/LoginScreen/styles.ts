import { StyleSheet } from "react-native";
import { lightColors } from "../../../../theme/colors";
import { SD } from "../../../../utils";

export const createStyles = (colors: typeof lightColors) => StyleSheet.create({
    container:{
        flex:1
    },
    footer: {
    flexDirection: 'row',
    marginTop: SD.hp(10),
    alignSelf: 'center',
  },
})