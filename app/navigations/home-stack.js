import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MiniPlayer} from './common/mini-player';
import {HomeScreen, PlayerDetailScreen} from '../screen';
import {HeaderStyle, MenuButton} from '../screen/components';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { color } from '../theme';

const Stack = createStackNavigator();

export function HomeStack(props) {
  const isShowPlayer = React.useMemo(
    () => ['detail'].indexOf(getFocusedRouteNameFromRoute(props?.route)) < 0,
    [props?.route],
  );

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <MenuButton />,
          headerTransparent: true,
          cardStyle: {
            backgroundColor: color.transparent,
          },
        }}>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={HeaderStyle}
        />
        <Stack.Screen
          name="detail"
          component={PlayerDetailScreen}
          options={HeaderStyle}
        />
      </Stack.Navigator>
      {isShowPlayer && <MiniPlayer />}
    </>
  );
}
