import React, {useState, useRef, useCallback} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Image,
  Text,
} from 'react-native';
import Theme from '../../Constants/Theme';
import _ from 'lodash';
// import Pagination from 'react-native-pagination'; // {Icon, Dot} also available
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomHeader from '../../Components/Header/CustomHeader';
import NavigationService from '../../Services/Navigation';
import Pagination from '@cherry-soft/react-native-basic-pagination';

let MockPersonList = _.times(35, i => {
  return {
    id: i,
    index: i,
    name: 'Shrabani',
    avatar: '../../assets/images/chat-bubble.png',
    group: _.sample(['Family', 'Friend', 'Acquaintance', 'Other']),
    email: 'shrabani.ttl@gmail.com',
  };
});

const PodcastComment = () => {
  const [items, setItems] = useState(MockPersonList);
  // const [viewableItems, setViewableItems] = useState([]);
  // const flatListRef = useRef(null);

  const [page, setPage] = useState(1);

  // const onPressItem = useCallback(item => {
  //   console.log('onPressItem:item ', item);
  // }, []);

  const renderItem = ({item, index}) => (
    <Pressable
      key={index}
      onPress={() =>
        NavigationService.navigate('ChatRoom', {
          data: {
            id: item.id,
            title: item.name,
            date: '1:00:00',
            image: item.image,
            details: 'abc',
            time: '12:00',
          },
        })
      }
      style={{
        flexDirection: 'row',
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 15,
      }}>
      <Pressable>
        <Image
          source={{uri: item.image}}
          style={{
            height: 40,
            width: 40,
            borderRadius: 45,
            borderWidth: 0.7,
            borderColor: 'white',
          }}
          resizeMode="contain"
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          marginLeft: 20,
          borderColor: 'rgba(118, 118, 128, 0.24)',
          borderBottomWidth: 0,
          paddingBottom: 10,
        }}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: Theme.FontFamily.medium,
            }}>
            xyz
          </Text>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.light,
              marginTop: 3,
            }}>
            abc
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // const _keyExtractor = item => item.id.toString();

  // const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
  //   setViewableItems(viewableItems);
  // }, []);

  return (
    <SafeAreaProvider>
      <CustomHeader
        HeaderColor="rgba(27, 27, 27, 0.96)"
        Watch={true}
        onLeftIconPress={() => NavigationService.back()}
      />
      {/* <View style={s.container}>
        <FlatList
          data={items}
          ref={flatListRef} // create reference point to enable scrolling
          keyExtractor={_keyExtractor} // map your keys to whatever unique ids they have (mine is an "id" prop)
          renderItem={renderItem} // render each item
          onViewableItemsChanged={onViewableItemsChanged} // need this
        />

        <Pagination
          dotThemeLight //<--use with backgroundColor:"grey"
          horizontal
          dotOnPress={o => console.log(' clicked: ', o)}
          hideEmptyDots={false}
          pagingEnabled
          dotEmptyHide
          dotSwapAxis
          startDotIconName="arrow-left-bold"
          endDotIconName="arrow-right-bold"
          dotIconName="ios-close"
          dotIconColorActive="white"
          dotIconColorNotActive="gray"
          dotIconSizeActive={40}
          dotFontSizeNotActive={30}
          listRef={flatListRef.current} // to allow React Native Pagination to scroll to item when clicked
          paginationVisibleItems={viewableItems} // needs to track what the user sees
          paginationItems={items} // pass the same list as data
          paginationItemPadSize={3} // num of items to pad above and below your visible items
          // Styling props
          // dotStyle={s.dotStyle}
          // dotSelectedStyle={s.dotSelectedStyle}
          // dotContainerStyle={s.dotContainerStyle}
        />
        
      </View> */}

      <View style={s.container}>
        <FlatList
          data={items}
          renderItem={renderItem} // render each item
        />
        <Pagination
          totalItems={items.length}
          pageSize={15}
          pagesToDisplay={5}
          currentPage={page}
          onPageChange={setPage}
        />
      </View>
    </SafeAreaProvider>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    padding: '1rem',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'gray', // default dot color
  },
  dotSelectedStyle: {
    backgroundColor: 'blue', // selected dot color
  },
  dotContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

// AppRegistry.registerComponent('PodcastComment', () => PodcastComment);

export default PodcastComment;
