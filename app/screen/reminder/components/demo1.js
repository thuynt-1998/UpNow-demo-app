import React from 'react';
import {StyleSheet, Dimensions, View, Animated, Text} from 'react-native';

const {width} = Dimensions.get('screen');
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;
const transformSeconds = {
  transform: [{rotate: '145deg'}],
};
export function Demo() {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Animated.View style={[styles.bigQuadran]} />
        <Animated.View
          style={[
            styles.mediumQuadran,
            //   {transform: [{scale: mediumQuadranScale}]},
          ]}
        />
        <Animated.View style={[styles.mover]}>
          <View style={[styles.hours]} />
        </Animated.View>
        <Animated.View style={[styles.mover]}>
          <View style={[styles.minutes]} />
        </Animated.View>
        <Animated.View style={[styles.mover]}>
          <View style={[styles.seconds, transformSeconds]} />
        </Animated.View>
        <View
          style={[
            styles.smallQuadran,
            // {transform: [{scale: smallQuadranScale}]},
          ]}
        />
      </View>
      <View styles={[styles.dispaly]}>
        <Text style={styles.dateDisplay}>time</Text>
        <Animated.Text style={styles.timeDisplay}>
          {/* {day.toLocaleDateString()} */}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '35%',
    marginTop: '15%',
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: 'rgba(0, 0,0, 0.8)',
    height: '45%',
    marginTop: '5%',
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: 'rgba(227, 71, 134, 1)',
    height: '50%',
    width: 2,
    borderRadius: 2,
  },
  bigQuadran: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    position: 'absolute',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
    position: 'absolute',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(227, 71, 134, 1)',
    position: 'absolute',
  },
  dispaly: {
    flex: 1,
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 50,
    alignSelf: 'center',
    color: 'rgba(100, 100, 100,1)',
  },
  dateDisplay: {
    fontFamily: 'sans-serif',
    fontSize: 50,
    alignSelf: 'center',
    color: 'rgba(50, 50, 50,1)',
  },
});
