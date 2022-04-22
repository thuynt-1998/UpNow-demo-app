import React from 'react';
import {Image, StyleSheet, ImageBackground} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStack} from './home-stack';
import {Text, View} from 'react-native-ui-lib';
import {color, spacing} from '../theme';
import {image} from '../assets/image';
import {ReminderStack} from './reminder-stack';
import {Screens} from './common/screens';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';
import {LinearGradientBackground} from '../screen/components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {interpolateNode} from 'react-native-reanimated';
import {ContactsStack} from './contacts-stack';
import {MyTreaksStack} from './my-treaks-stack';
// screens

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const buildLink = useLinkBuilder();
  React.useEffect(() => {
    props?.setProgress(props?.progress);
  }, [props]);

  return (
    <SafeAreaView style={styles.container}>
      <View flex>
        <Image source={image.icon1} style={styles.icon} />
        <View style={styles.wrapper}>
          <View style={styles.avatar}>
            <Image source={image.avatar} style={styles.avatarImage} />
          </View>
          <Text style={styles.name}> James B.</Text>
        </View>
        <DrawerContentScrollView
          {...props}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {props.state.routes.map((route, i) => {
            const focused = i === props.state.index;
            const {title, drawerLabel, drawerIcon} =
              props.descriptors[route.key].options;
            return (
              <LinearGradientBackground
                key={route.key}
                colors={
                  focused
                    ? [color.black25, color.transparent]
                    : [color.transparent, color.transparent]
                }
                style={styles.drawerItem}>
                <DrawerItem
                  label={
                    drawerLabel !== undefined
                      ? drawerLabel
                      : title !== undefined
                      ? title
                      : route.name
                  }
                  icon={drawerIcon}
                  focused={focused}
                  activeTintColor={props.activeTintColor}
                  inactiveTintColor={props.inactiveTintColor}
                  labelStyle={styles.label}
                  style={{backgroundColor: color.transparent}}
                  to={buildLink(route.name, route.params)}
                  onPress={() => {
                    props.navigation.dispatch({
                      ...(focused
                        ? DrawerActions.closeDrawer()
                        : CommonActions.navigate(route.name)),
                      target: props.state.key,
                    });
                  }}
                />
              </LinearGradientBackground>
            );
          })}
        </DrawerContentScrollView>
        <Text center style={styles.footer}>
          Powered by UpNow
        </Text>
      </View>
    </SafeAreaView>
  );
};
function DrawerIcon(Component, iconName) {
  return ({focused}) => (
    <Component
      name={iconName}
      color={focused ? color.wildRed : color.chateauGrey}
      size={20}
    />
  );
}
export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

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
          <DrawerContent {...props} setProgress={setProgress} />
        )}>
        <Drawer.Screen
          name="home"
          options={{
            title: 'Home',
            drawerIcon: DrawerIcon(MaterialCommunityIcons, 'home-outline'),
          }}>
          {props => (
            <Screens {...props} component={HomeStack} style={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="reminder"
          options={{
            title: 'Reminder',
            drawerIcon: DrawerIcon(Ionicons, 'notifications-outline'),
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
            drawerIcon: DrawerIcon(SimpleLineIcons, 'user'),
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
            drawerIcon: DrawerIcon(Octicons, 'video'),
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
            drawerIcon: DrawerIcon(Ionicons, 'trophy-outline'),
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
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: DrawerIcon(Ionicons, 'settings-outline'),
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
          name="disclaimer"
          options={{
            title: 'Disclaimer',
            drawerIcon: DrawerIcon(Ionicons, 'warning-outline'),
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
  drawerItem: {
    borderRadius: spacing[6],
    marginLeft: spacing[3],
  },
  icon: {
    borderRadius: 60,
    marginBottom: spacing[7],
    height: spacing[7],
    width: spacing[7],
    marginTop: spacing[7],
    marginLeft: spacing[3],
  },
  avatar: {
    height: spacing[8] + spacing[2],
    width: spacing[8] + spacing[2],
    borderRadius: (spacing[8] + spacing[2]) / 2,
    backgroundColor: color.black25,
    marginBottom: spacing[4],
  },
  hiddenView: {
    position: 'absolute',
    left: -20,
    width: '100%',
    height: '90%',
    top: '5%',
  },
  name: {
    color: color.white,
    fontSize: spacing[5],
    fontWeight: 'bold',
    marginBottom: spacing[3],
  },
  wrapper: {
    marginLeft: spacing[5],
  },
  label: {
    marginRight: -spacing[4],
  },
  footer: {
    marginVertical: spacing[3],
    color: color.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
