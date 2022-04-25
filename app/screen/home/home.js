import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Chip,
  MenuButton,
  Screen,
  SearchButton,
  SearchHeader,
} from '../components';
import {image} from '../../assets/image';
import {autocompleteInputData, TypeList} from './data1';
import {color, size, spacing} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsDrawerOpen} from '@react-navigation/drawer';

export const track = {
  id: '1',
  url: 'https://player.vimeo.com/external/523679650.sd.mp4?s=7a4a273f0d1e7ef5d3ba9050d5c7f5b5a26e376c&profile_id=164',
  title: 'Test Sound #1',
  artist: 'deadmau5',
  duration: 88.02,
  thumb: require('../../assets/image/demo.png'),
};

export function HomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [searchResults, setResults] = React.useState(autocompleteInputData);
  const isDrawerOpen = useIsDrawerOpen();

  const onSearchChange = React.useCallback(text => {
    setSearchText(text);
    setResults(
      text
        ? autocompleteInputData.filter(({label}) => label.includes(text))
        : autocompleteInputData,
    );
  }, []);
  React.useEffect(() => {
    isDrawerOpen && onSearchClose?.();
  }, [isDrawerOpen, onSearchClose]);

  const onSearchClose = React.useCallback(() => {
    onSearchChange('');
    setSearchOpen(false);
  }, [onSearchChange]);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: props => (
        <SearchButton {...props} onPress={() => setSearchOpen(true)} />
      ),
      ...(isSearchOpen
        ? {
            header: () => (
              <SearchHeader
                onSearchChange={onSearchChange}
                searchText={searchText}
                isShow={isSearchOpen}
                data={searchResults}
                leftComponent={<MenuButton />}
                onItemPress={() => {
                  navigation.navigate('detail', {track});
                  onSearchClose();
                }}
                rightComponent={
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onSearchClose}>
                    <Ionicons name="close" color={color.white} size={30} />
                  </TouchableOpacity>
                }
              />
            ),
          }
        : {header: undefined}),
    });
  }, [
    isSearchOpen,
    navigation,
    searchResults,
    searchText,
    onSearchChange,
    onSearchClose,
  ]);

  const [currentType, setCurrentType] = React.useState(TypeList[0].value);

  return (
    <Screen source={image.bg_home_dark}>
      <View row style={styles.songGroup}>
        {TypeList.map(({label, value}, i) => (
          <Chip
            label={label}
            key={i}
            isSelected={currentType === value}
            onValueChange={() => {
              setCurrentType(value);
            }}
            style={styles.chip}
          />
        ))}
      </View>
      <View row style={{marginHorizontal: spacing[4]}} spread marginT-24>
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => navigation.navigate('detail', {track})}>
          <ImageBackground style={{flex: 1}} source={image.thumnail}>
            <View center flex>
              <Text
                color={color.white}
                style={{fontSize: spacing[4], fontWeight: 'bold'}}>
                {track.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('detail', {track})}>
          <ImageBackground style={{flex: 1}} source={image.thumnail}>
            <View center flex>
              <Text
                color={color.white}
                style={{fontSize: spacing[4], fontWeight: 'bold'}}>
                {track.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 32,
  },
  imageContainer: {
    height: 60,
    marginRight: 16,
    width: 60,
    borderRadius: 16,
  },
  button: {
    height: 30,
    width: 30,
  },
  treacksButton: {
    borderWidth: 1,
    padding: 8,
    alignSelf: 'flex-start',
  },
  chip: {
    marginRight: spacing[2],
  },
  songGroup: {
    marginHorizontal: spacing[3],
  },
  item: {
    width: size.screen.width / 2 - spacing[3] * 2,
    height: size.screen.width / 2,
  },
  closeButton: {
    paddingHorizontal: spacing[4],
  },
});
