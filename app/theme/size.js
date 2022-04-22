import {Dimensions} from 'react-native';
import {screenPercent} from './resizing';

export const {width, height} = Dimensions.get('screen');

export const size = {
  screen: {
    width,
    height,
  },
  day: {
    height: 40 * screenPercent,
    width: 40 * screenPercent,
  },
  aimImage: {
    height: 50 * screenPercent,
    width: 50 * screenPercent,
  },
  picker: {
    width: 233 * screenPercent,
    height: 216 * screenPercent,
  },
  clock: {
    width: 130 * screenPercent,
    height: 120 * screenPercent,
  },
  icon: {
    height: 45 * screenPercent,
    width: 45 * screenPercent,
  },
  chipHeight: 52 * screenPercent
};
