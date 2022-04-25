import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {LinearGradientBackground} from '../../screen/components';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import {spacing, color} from '../../theme';
import {image} from '../../assets/image';
import {
  DrawerContentScrollView,
  DrawerItem,
  useIsDrawerOpen,
} from '@react-navigation/drawer';

export function DrawerContent(props) {
  const buildLink = useLinkBuilder();
  const isDrawerOpen = useIsDrawerOpen();
  React.useEffect(() => {
    props?.setProgress(props?.progress);
  }, [isDrawerOpen, props]);

  return (
    <SafeAreaView style={styles.container}>
      <View flex>
        <View>
          <Image source={image.icon1} style={styles.icon} />
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: Colors.black25,
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
    color: Colors.white,
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
    color: Colors.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    marginHorizontal: spacing[4],
    borderRadius: 0,
    backgroundColor: Colors.marinerBlue,
  },
  selectLinearGradient: {
    width: spacing[7],
    height: spacing[7],
    borderRadius: spacing[7] / 2,
  },
  item: {
    width: spacing[5],
    height: spacing[5],
    borderRadius: spacing[5] / 2,
  },
});
