import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeStack} from './home-stack';
import {PlayerDetailScreen, MyTreacksScreen, ReminderScreen} from '../screen';
import {color} from '../theme';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="detail"
        component={PlayerDetailScreen}
        options={{
          headerTransparent: true,
          title: null,
        }}
      />
      <Stack.Screen
        name="myTreacks"
        component={MyTreacksScreen}
        options={{
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="reminder"
        component={ReminderScreen}
        options={{
          headerTransparent: true,
          headerTitleAlign: 'center',
          title: 'Reminder',
          headerTintColor: color.white,
        }}
      />
    </Stack.Navigator>
  );
}
