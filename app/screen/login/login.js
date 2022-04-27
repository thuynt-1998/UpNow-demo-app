import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '../components';
import {image} from '../../assets/image';
import {StyleSheet} from 'react-native';
import {spacing, color} from '../../theme';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {AppleButton} from './components/AppleButton';
import {usePlayerContext} from '../../context/player-context';

export function LoginScreen() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
    });
  }, [navigation]);
  const {login} = usePlayerContext();

  const onFacebookActions = React.useCallback(() => {
    // const shareLinkContent = {
    //   contentType: 'link',
    //   contentUrl: 'https://facebook.com',
    //   contentDescription: 'Wow, check out this great site!',
    // };
    // ShareDialog.canShow(shareLinkContent)
    //   .then(function (canShow) {
    //     if (canShow) {
    //       return ShareDialog.show(shareLinkContent);
    //     }
    //   })
    //   .then(
    //     function (result) {
    //       if (result.isCancelled) {
    //         console.log('Share cancelled');
    //       } else {
    //         console.log('Share success with postId: ' + result.postId);
    //       }
    //     },
    //     function (error) {
    //       console.log('Share fail with error: ' + error);
    //     },
    //   );

    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,first_name,last_name,friends',
          },
        },
      },
      (err, res) => {
        console.log(err, res);
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }, []);

  const onLoginFacebook = React.useCallback(() => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            if (data?.accessToken) {
              login?.onAuthChange({
                accessToken: data?.accessToken,
                type: 'fb',
                ...data,
              });
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }, [login]);
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
          backgroundColor={color.marinerBlue}
          onPress={onLoginFacebook}>
          <View style={styles.facebookWrapper}>
            <EvilIcons
              name="sc-facebook"
              size={spacing[6]}
              style={styles.facebookIcon}
            />
          </View>
          <Text style={styles.text}>Login with Facebook</Text>
        </TouchableOpacity>
        <AppleButton />
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
