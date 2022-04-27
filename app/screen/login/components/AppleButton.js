import React from 'react';
import {Text, TouchableOpacity} from 'react-native-ui-lib';
import {color, spacing} from '../../../theme';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Platform, Alert} from 'react-native';
import {usePlayerContext} from '../../../context/player-context';

export function AppleButton() {
  const {login} = usePlayerContext();

  React.useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return Platform.OS === 'ios'
      ? appleAuth?.onCredentialRevoked?.(async () => {
          console.warn(
            'If this function executes, User Credentials have been Revoked',
          );
        })
      : null;
  }, []);

  const onAppleButtonIOSPress = React.useCallback(async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    console.log(credentialState, '>>>>', appleAuthRequestResponse);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log('Login is successful');
      login?.onAuthChange({
        accessToken: appleAuthRequestResponse?.identityToken,
        type: 'apple',
      });
    }
  }, [login]);

  const onAppleButtonAndroidPress = React.useCallback(async () => {
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    // appleAuthAndroid.configure({
    //   // The Service ID you registered with Apple
    //   clientId: 'com.example.client-android',

    //   // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    //   // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    //   redirectUri: 'https://example.com/auth/callback',

    //   // The type of response requested - code, id_token, or both.
    //   responseType: appleAuthAndroid.ResponseType.ALL,

    //   // The amount of user information requested from Apple.
    //   scope: appleAuthAndroid.Scope.ALL,

    //   // Random nonce value that will be SHA256 hashed before sending to Apple.
    //   nonce: rawNonce,

    //   // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    //   state,
    // });

    // // Open the browser window for user sign in
    // const response = await appleAuthAndroid.signIn();
    // console.log(response, '<<<<<');
  }, []);

  if (Platform.OS === 'android') {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      centerV
      backgroundColor={color.black}
      onPress={
        Platform.OS === 'ios'
          ? onAppleButtonIOSPress
          : onAppleButtonAndroidPress
      }>
      <FontAwesome name="apple" style={styles.appleIcon} />
      <Text style={styles.text}>Login with Apple</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: spacing[4],
    borderRadius: spacing[6],
    width: '100%',
    marginBottom: spacing[4],
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
});
