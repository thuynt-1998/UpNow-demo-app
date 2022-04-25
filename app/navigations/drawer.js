import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStack} from './home-stack';
import {color} from '../theme';
import {image} from '../assets/image';
import {ReminderStack} from './reminder-stack';
import {Screens} from './common/screens';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Animated, {interpolateNode} from 'react-native-reanimated';
import {ContactsStack} from './contacts-stack';
import {MyTreaksStack} from './my-treaks-stack';
import {LoginStack} from './login-stack';
import {usePlayerContext} from '../context/player-context';
import {Colors} from 'react-native-ui-lib';
import {DrawerContent} from './common/drawer-content';
import {SettingsStack} from './setting-stack';

// screens

const Drawer = createDrawerNavigator();

function DrawerIcon(Component, iconName, activeColor) {
  return ({focused}) => (
    <Component
      name={iconName}
      color={focused ? activeColor[0] : color.chateauGrey}
      size={20}
    />
  );
}
export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const {
    linearGradientContext: {linearGradientColor, onChange},
  } = usePlayerContext();
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};
  React.useLayoutEffect(() => {
    // load color for app
    Colors.loadColors({
      ...color,
      linearGradient: linearGradientColor,
    });
  }, [linearGradientColor]);
  return (
    <ImageBackground
      source={image.bgDarkTheme}
      style={styles.container}
      colors={['#E94057', '#4A00E0']}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor={color.transparent}
        drawerStyle={styles.drawerStyles}
        drawerContentOptions={{
          activeTintColor: color.white,
          inactiveTintColor: color.chateauGrey,
        }}
        sceneContainerStyle={{backgroundColor: color.transparent}}
        drawerContent={props => (
          <DrawerContent
            {...props}
            setProgress={setProgress}
            linearGradientColor={linearGradientColor}
            onChange={onChange}
          />
        )}>
        <Drawer.Screen
          name="home"
          options={{
            title: 'Home',
            drawerIcon: DrawerIcon(
              MaterialCommunityIcons,
              'home-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens {...props} component={HomeStack} style={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="reminder"
          options={{
            title: 'Reminder',
            drawerIcon: DrawerIcon(
              Ionicons,
              'notifications-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens
              {...props}
              component={ReminderStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="invite"
          options={{
            title: 'Invite your friends',
            drawerIcon: DrawerIcon(
              SimpleLineIcons,
              'user',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens
              {...props}
              component={MyTreaksStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="welcome"
          options={{
            title: 'Welcome video',
            drawerIcon: DrawerIcon(Octicons, 'video', linearGradientColor),
          }}>
          {props => (
            <Screens
              {...props}
              component={ContactsStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="rewards"
          options={{
            title: 'Rewards',
            drawerIcon: DrawerIcon(
              Ionicons,
              'trophy-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens
              {...props}
              component={ReminderStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="help"
          options={{
            title: 'Help & Support',
            drawerIcon: DrawerIcon(
              MaterialCommunityIcons,
              'help-circle-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens {...props} component={LoginStack} style={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: DrawerIcon(
              Ionicons,
              'settings-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens
              {...props}
              component={SettingsStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="disclaimer"
          options={{
            title: 'Disclaimer',
            drawerIcon: DrawerIcon(
              Ionicons,
              'warning-outline',
              linearGradientColor,
            ),
          }}>
          {props => (
            <Screens
              {...props}
              component={ReminderStack}
              style={animatedStyle}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerStyles: {
    flex: 1,
    width: '65%',
    backgroundColor: 'transparent',
  },
});
