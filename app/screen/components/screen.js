import React from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet, ScrollView, ImageBackground, StatusBar} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {image} from '../../assets/image';

export function Screen(props) {
  const headerHeight = useHeaderHeight();
  const Container = props.backgroundColor ? View : ImageBackground;
  return (
    <Container
      source={props.source || image.bgDarkTheme}
      style={[{flex: 1}, props?.style]}
      backgroundColor={props.backgroundColor}
      {...props?.containerProps}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        {...props.statusBarProps}
      />
      <View style={[styles.outer]}>
        {React.isValidElement(props?.headerComponent)
          ? props?.headerComponent
          : null}
        <ScrollView
          style={[
            styles.outer,
            {paddingTop: props.noPaddingTop ? 0 : headerHeight},
          ]}
          contentContainerStyle={[styles.inner, props?.scrollStyle]}
          showsVerticalScrollIndicator={false}
          {...props.scrollProps}>
          {props.children}
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    height: '100%',
  },
  inner: {flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch'},
});
