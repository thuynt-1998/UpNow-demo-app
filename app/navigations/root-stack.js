import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainDrawer} from './drawer';
import {usePlayerContext} from '../context/player-context';
import {LoginStack} from './login-stack';

const Stack = createStackNavigator();

export function RootStack() {
  const {login} = usePlayerContext();
  return (
    <Stack.Navigator>
      {login?.auth?.accessToken ? (
        <Stack.Screen
          name="main"
          component={MainDrawer}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="login"
          component={LoginStack}
          options={{
            headerTransparent: true,
            title: null,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
