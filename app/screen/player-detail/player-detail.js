import React from 'react';
import {Image, Slider, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {ImageBackground, StyleSheet} from 'react-native';
import {usePlayerContext} from '../../context/player-context';
import {useProgress} from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import {image} from '../../assets/image';
import {useNavigation} from '@react-navigation/native';
import {LeftButton, Screen} from '../components';

export const getTime = value => {
  return new Date(value * 1000).toISOString().substr(14, 5);
};

export function PlayerDetailScreen() {
  const playerContext = usePlayerContext();
  const progress = useProgress();
  const route = useRoute();
  const track = route?.params?.track;
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: props => <LeftButton {...props} />,
    });
  }, [navigation]);

  return (
    <Screen source={image.background}>
      <View style={styles.content} center>
        <View row centerV>
          <TouchableOpacity
            onPress={() => playerContext.seekTo(progress.position - 15)}>
            <Image source={image.jumpBackward} style={styles.imageColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            center
            onPress={() => {
              if (playerContext.isPlaying) {
                playerContext.pause();
              } else {
                playerContext.play(track);
              }
            }}>
            {playerContext.isPlaying ? (
              <Text color="white" style={{fontSize: 25, fontWeight: 'bold'}}>
                II
              </Text>
            ) : (
              <Image source={image.play} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            center
            onPress={() => playerContext.seekTo(progress.position + 15)}>
            <Image source={image.jumpForward} style={styles.imageColor} />
          </TouchableOpacity>
        </View>
        <View width={'90%'} marginH-20>
          <View row spread marginB-8>
            <Text color="#959EA7">{getTime(progress?.position)}</Text>
            <Text color="#959EA7"> {getTime(track?.duration)}</Text>
          </View>
          <Slider
            value={progress?.position}
            minimumValue={0}
            maximumValue={progress.duration || 0.1}
            onValueChange={value => playerContext.seekTo(value)}
            thumbStyle={styles.thumbStyle}
            thumbTintColor="white"
            minimumTrackTintColor="white"
            maximumTrackTintColor="rgba(0, 0, 0, 0.5)"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 115,
    width: '90%',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
  thumbStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 0,
  },
  imageColor: {
    tintColor: 'white',
  },
  playButton: {
    width: 30,
    height: 30,
    marginHorizontal: 42,
  },
});
