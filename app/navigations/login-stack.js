import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screen';
import {color} from '../theme';

const Stack = createStackNavigator();

export function LoginStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          cardStyle: {
            backgroundColor: color.transparent,
          },
        }}>
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
}
