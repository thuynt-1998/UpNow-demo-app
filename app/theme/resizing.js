import {Dimensions} from 'react-native';

const designScreen = 390;
const currentWidth = Dimensions.get('window').width;
const currentHeight = Dimensions.get('window').height;

let currentSize = currentWidth;

if (currentHeight < currentWidth) {
  currentSize = currentHeight;
}

const percent = currentSize / designScreen;

export const screenPercent = percent;
