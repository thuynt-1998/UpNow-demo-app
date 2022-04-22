import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color, spacing} from '../../theme';
import {StyleSheet, TextInput, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLayout} from '../../untils/useLayout';
import {RootSiblingPortal} from 'react-native-root-siblings';
import {useIsDrawerOpen} from '@react-navigation/drawer';

export function LeftButton() {
  const navigation = useNavigation();

  const onPress = navigation.goBack;
  return (
    <TouchableOpacity onPress={onPress} center>
      <View style={styles.container}>
        <AntDesign name="arrowleft" color={color.white} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export function MenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.button}>
      <Feather name="menu" size={16} color={color.white} />
    </TouchableOpacity>
  );
}

export function SearchButton({onPress}) {
  return (
    <TouchableOpacity center onPress={onPress} style={styles.button}>
      <View style={styles.container}>
        <FontAwesome name="search" color={color.white} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export function CircleBackButton({style, colorText}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      center
      onPress={navigation.goBack}
      style={styles.circleButton}>
      <Ionicons
        name="chevron-back"
        color={colorText || color.white}
        size={20}
      />
    </TouchableOpacity>
  );
}

export const SearchHeader = ({
  onSearchChange,
  searchText,
  onSearchClose,
  data,
  isSearchOpen,
  ...flatListProps
}) => {
  const {ref, onLayout, width, height, pageX, pageY} = useLayout();
  const navigation = useNavigation();
  const isDrawerOpen = useIsDrawerOpen();
  React.useEffect(() => {
    isDrawerOpen && onSearchClose();
  }, [isDrawerOpen, onSearchClose, ref]);

  return (
    <View>
      <View row centerV style={{marginTop: spacing[5]}}>
        <MenuButton />
        <View
          ref={ref}
          row
          centerV
          style={styles.searchBar}
          flex
          onLayout={onLayout}>
          <FontAwesome name="search" color={color.white} size={20} />
          <TextInput
            value={searchText}
            onChangeText={onSearchChange}
            style={styles.inputContainer}
            autoFocus
          />
          <TouchableOpacity
            style={styles.clearSearchIcon}
            center
            onPress={() => onSearchChange('')}>
            <Ionicons name="close" size={14} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={onSearchClose}>
          <Ionicons name="close" color={color.white} size={30} />
        </TouchableOpacity>
      </View>
      {isSearchOpen && data?.length > 0 && (
        <RootSiblingPortal>
          <View
            style={[
              styles.suggestions,
              {
                top: pageY + height + spacing[1],
                left: pageX,
                width,
              },
            ]}>
            <FlatList
              data={data}
              keyExtractor={(a, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  centerV
                  style={styles.suggestionItem}
                  onPress={() => navigation.navigate('detail')}>
                  <Text color={color.white}>{item?.label}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              {...flatListProps}
            />
          </View>
        </RootSiblingPortal>
      )}
    </View>
  );
};
export const HeaderStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: color.white,
  },
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing[3],
  },
  button: {
    paddingHorizontal: spacing[4],
  },
  circleButton: {
    height: spacing[6],
    width: spacing[6],
    backgroundColor: color.white,
    borderRadius: spacing[7] / 2,
    marginLeft: spacing[3],
    marginTop: spacing[3],
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  searchBar: {
    backgroundColor: color.black25,
    paddingVertical: spacing[2],
    borderRadius: spacing[5],
    paddingHorizontal: spacing[3],
  },
  inputContainer: {
    flex: 1,
    marginLeft: spacing[2],
    color: color.white,
  },
  clearSearchIcon: {
    backgroundColor: 'rgb(165, 188, 193)',
    width: spacing[5],
    height: spacing[5],
    borderRadius: spacing[5] / 2,
  },
  suggestions: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  list: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2000,
    backgroundColor: 'rgb(54,72,86)',
    borderRadius: spacing[4],
    paddingVertical: spacing[2],
  },
  suggestionItem: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
});
