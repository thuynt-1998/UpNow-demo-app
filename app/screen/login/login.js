import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../components';
import {image} from '../../assets/image';
import {StyleSheet, Platform} from 'react-native';
import {size, spacing, color} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

export function LoginScreen() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
    });
  }, [navigation]);
  React.useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);
  const onAppleButtonPress = React.useCallback(async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
    }
  }, []);

  return (
    <Screen source={image.bg_home_dark}>
      <View style={styles.container}>
        <View center row>
          <View flex>
            <View style={styles.line} />
          </View>
          <Text style={styles.lineText}>Or Log in With</Text>
          <View flex>
            <View style={styles.line} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          centerV
          backgroundColor={color.marinerBlue}>
          <View style={styles.facebookWrapper}>
            <EvilIcons
              name="sc-facebook"
              size={spacing[6]}
              style={styles.facebookIcon}
            />
          </View>
          <Text style={styles.text}>Login with Facebook</Text>
        </TouchableOpacity>
        {((appleAuthAndroid.isSupported && Platform.OS === 'android') ||
          Platform.OS === 'ios') && (
          <TouchableOpacity
            style={styles.buttonWrapper}
            centerV
            backgroundColor={color.black}
            onPress={onAppleButtonPress}>
            <FontAwesome name="apple" style={styles.appleIcon} />
            <Text style={styles.text}>Login with Apple</Text>
          </TouchableOpacity>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: spacing[4],
    borderRadius: spacing[6],
    width: '100%',
    marginBottom: spacing[4],
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing[7],
  },
  text: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: spacing[4],
    alignSelf: 'center',
  },
  appleIcon: {
    fontSize: spacing[5],
    color: color.white,
    position: 'absolute',
    marginLeft: spacing[4],
  },
  facebookWrapper: {
    position: 'absolute',
    marginLeft: spacing[4],
    backgroundColor: color.white,
    width: spacing[5],
    height: spacing[5],
    borderRadius: spacing[5] / 2,
  },
  facebookIcon: {
    position: 'absolute',
    bottom: -spacing[1],
    left: -spacing[1],
    color: color.marinerBlue,
  },
  lineText: {
    marginHorizontal: spacing[4],
    textAlign: 'center',
    color: color.white,
    fontWeight: 'bold',
    marginVertical: spacing[6],
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: color.black25,
  },
});
