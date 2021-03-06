/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {PlayerContextProvider} from './app/context/player-context';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import {RootStack} from './app/navigations/root-stack';
LogBox.ignoreLogs(['Reanimated 2']);

const App = () => {
  React.useEffect(() => {
    (() => {
      TrackPlayer.setupPlayer().then(() => {
        console.log('player is setup');
      });

      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.JumpForward,
          Capability.JumpBackward,
        ],
        backwardJumpInterval: 15,
        forwardJumpInterval: 15,
        stopWithApp: false,
      });
    })();
    return () => TrackPlayer.destroy();
  }, []);

  return (
    <PlayerContextProvider>
      <RootSiblingParent>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </RootSiblingParent>
    </PlayerContextProvider>
  );
};

export default App;
