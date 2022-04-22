import React from 'react';
import TrackPlayer, {State} from 'react-native-track-player';

export const PlayerContext = React.createContext({
  isPlaying: false,
  isPaused: false,
  isStoped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
});

export function PlayerContextProvider(props) {
  const [playerState, setPlayerState] = React.useState(null);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  React.useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-state',
      ({state}) => {
        setPlayerState(state);
        console.log(state, '----', State);
      },
    );

    return () => {
      listener.remove();
    };
  }, [stop]);

  const play = React.useCallback(
    async track => {
      if (!track) {
        if (currentTrack) {
          await TrackPlayer.play();
        }
        return;
      }
      if (currentTrack && track?.id !== currentTrack?.id) {
        await TrackPlayer.reset();
      }
      await TrackPlayer.add([track]);
      setCurrentTrack(track);
      await TrackPlayer.play();
    },
    [currentTrack],
  );

  const pause = React.useCallback(async () => {
    await TrackPlayer.pause();
  }, []);

  const stop = React.useCallback(async () => {
    await TrackPlayer.stop();
  }, []);

  const seekTo = React.useCallback(number => {
    TrackPlayer.seekTo(number);
  }, []);

  const value = React.useMemo(
    () => ({
      isPlaying:
        playerState === State.Playing || playerState === State.Buffering,
      isPaused: playerState === State.Paused,
      isStopped: playerState === State.Stopped,
      isEmpty: playerState === null,
      currentTrack,
      pause,
      play,
      seekTo,
      stop,
    }),
    [currentTrack, pause, play, playerState, seekTo, stop],
  );
  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return React.useContext(PlayerContext);
}
