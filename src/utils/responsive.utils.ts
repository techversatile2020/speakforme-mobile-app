import {Dimensions, PixelRatio, Platform} from 'react-native';
import {
  widthPercentageToDP as lwp,
  heightPercentageToDP as lhp,
} from 'react-native-responsive-screen';

const guidelineBaseWidth = 390;

const getWidthValue = (px: number) => ((px * 100) / 39000) * 100;
const getHeightValue = (px: number) => ((px * 100) / 87300) * 100;

const {width, height}: {width: number; height: number} =
  Dimensions.get('window');

const [shortDimension, longDimension]: [number, number] =
  width < height ? [width, height] : [height, width];

const scalef = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;

const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scalef(size) - size) * factor;

export const normalizeFont = (size: number): number => {
  const newSize: number = moderateScale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};
const wp = (px: number) => lwp(getWidthValue(px));
const hp = (px: number) => lhp(getHeightValue(px));

export const SD = {
  wp,
  hp,
  customFontSize: normalizeFont,
};
