import {useColorScheme} from 'react-native';
import {lightColors, darkColors} from './colors';

export const useTheme = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const AppTheme = isDarkMode ? darkColors : lightColors;

  return {AppTheme, isDarkMode};
};
