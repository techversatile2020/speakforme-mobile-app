import { StyleSheet } from "react-native";
import { lightColors } from "../../theme/colors";

export const createStyles = (colors: typeof lightColors) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
    }
})