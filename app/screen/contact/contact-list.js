import React from 'react';
import Contacts from 'react-native-contacts';
import {
  Text,
  TouchableOpacity,
  View,
  StateScreen,
  Modal,
} from 'react-native-ui-lib';
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CircleBackButton, Screen} from '../components';
import {color, spacing} from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useHeaderHeight} from '@react-navigation/stack';

function getGroupList(array) {
  let data = array.reduce((r, e) => {
    let group = e?.givenName[0];
    if (!r[group]) {
      r[group] = {group, children: [e]};
    } else {
      r[group].children.push(e);
    }
    return r;
  }, {});
  return Object.values(data)?.sort((a, b) => a.group > b.group);
}
export function ContactListScreen() {
  const navigation = useNavigation();
  const [contactList, setContactList] = React.useState([]);
  const [searchList, setSerachList] = React.useState([]);
  const isFocus = useIsFocused();
  const headerHeight = useHeaderHeight();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: props => (
        <CircleBackButton colorText={color.black} {...props} />
      ),
      headerStyle: {
        backgroundColor: color.clearGreen,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation]);

  const onGetContacts = React.useCallback(() => {
    Contacts.getAll()
      .then(contacts => {
        setContactList(contacts);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  }, []);

  const onFetchData = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      onGetContacts();
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view you contact',
      }).then(onGetContacts);
    }
  }, [onGetContacts]);

  React.useEffect(() => {
    if (isFocus) {
      onFetchData();
    }
  }, [isFocus, onFetchData]);
  const [searchText, setSearchText] = React.useState('');

  const dataSet = React.useMemo(
    () => getGroupList(searchText ? searchList : contactList),
    [contactList, searchList, searchText],
  );

  const onSearch = React.useCallback(text => {
    setSearchText(text);
    Contacts.getContactsMatchingString(text)
      .then(contacts => {
        setSerachList(contacts);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  }, []);

  return (
    <Screen
      noPaddingTop
      backgroundColor={color.white}
      // headerComponent={
      //   <View row centerV style={styles.searchContainer}>
      //     <FontAwesome name="search" color={color.white} size={20} />
      //     <TextInput
      //       onChangeText={onSearch}
      //       style={styles.searchInput}
      //       placeholder={'Search'}
      //       placeholderTextColor={color.chateauGrey}
      //     />
      //   </View>
      // }
    >
      <View style={[styles.headerContainer, {paddingTop: headerHeight}]}>
        <Text style={styles.headerText}>All Contacts</Text>
      </View>
      <View style={{marginHorizontal: spacing[3]}}>
        {dataSet?.map(({children, group}, i) => (
          <View style={{marginVertical: spacing[2]}} key={i}>
            <Text style={[styles.text, {fontSize: spacing[5]}]}>{group} </Text>
            {children.map((item, index) => (
              <View style={styles.itemContainer} key={index}>
                <View row centerV>
                  <Text style={styles.text}>
                    {`${item.givenName} ${item.middleName} ${item.familyName}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Contacts.viewExistingContact({recordID: item?.recordID})
                    }
                    style={styles.inviteContainer}>
                    <Text color={color.white}>Invite</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: spacing[4],
    fontWeight: 'bold',
    flex: 1,
  },
  itemContainer: {
    marginTop: spacing[3],
    paddingHorizontal: spacing[3],
    backgroundColor: color.clearGreen,
    paddingVertical: spacing[4],
    borderRadius: spacing[2],
  },
  inviteContainer: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: spacing[4],
    backgroundColor: color.celloBlue,
  },
  searchContainer: {
    borderBottomColor: color.white,
    borderBottomWidth: 1,
    marginBottom: spacing[3],
    marginHorizontal: spacing[6],
  },
  searchInput: {
    flex: 1,
    height: spacing[7],
    paddingLeft: spacing[3],
  },
  headerContainer: {
    backgroundColor: color.clearGreen,
  },
  headerText: {
    fontSize: spacing[6],
    fontWeight: 'bold',
    marginLeft: spacing[3],
    marginVertical: spacing[6],
  },
});
