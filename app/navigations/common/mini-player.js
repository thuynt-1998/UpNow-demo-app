import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {usePlayerContext} from '../../context/player-context';
import {useNavigation} from '@react-navigation/native';
import {image} from '../../assets/image';
import {spacing} from '../../theme';

export function MiniPlayer() {
  const {playerContext} = usePlayerContext();
  console.log(playerContext);
  const navigation = useNavigation();
  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity
      row
      centerV
      backgroundColor="rgba(0, 0, 0, 0.45)"
      style={styles.container}
      onPress={() =>
        navigation.navigate('detail', {track: playerContext?.currentTrack})
      }>
      <View style={styles.imageContainer}>
        <Image
          source={playerContext.currentTrack.thumb}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View flex>
        <Text color="white">{playerContext.currentTrack.title}</Text>
      </View>
      <View>
        {playerContext.isPaused && (
          <TouchableOpacity onPress={() => playerContext.play()}>
            <Image source={image.play} />
          </TouchableOpacity>
        )}
        {playerContext.isPlaying && (
          <TouchableOpacity onPress={() => playerContext.pause()} center>
            <Text color="white" style={{fontSize: 30, fontWeight: 'bold'}}>
              II
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: spacing[2],
  },
  imageContainer: {
    height: 60,
    backgroundColor: 'red',
    marginRight: 16,
    width: 60,
    borderRadius: 16,
  },
  button: {
    height: 30,
    width: 30,
    // backgroundColor: 'red',
  },
});
