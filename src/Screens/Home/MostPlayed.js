/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import { useRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { apiCall } from '../../Services/Service';
import { useSelector } from 'react-redux';
import AllSourcePath from '../../Constants/PathConfig';

const { width, height } = Dimensions.get('screen');

const MostPlayed = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
   const token = useSelector(state => state.authData.token);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL
  const staticImage = require('../../assets/images/image96.png');
  
  const [loadingState, setLoadingState] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [mostPlayedEpisodes, setMostPlayedEpisodes] = useState([]);
  const [page, setPage] = useState(0);

  const fetchMostPlayedData =async () => {
    setLoadingState(true)
    try {
      const endpoint = `videos/list?take=15&page=${page}`;
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response?.status === true) {

        setMostPlayedEpisodes(prev=>[...prev,...response?.data?.listData]);
        setHasMore(response?.data?.isNext);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }finally{
      setLoadingState(false)
    }
  };

  
  const fetchNextPage = useCallback(() => {
    if (!loadingState && !hasMore) return null;
    if (!loadingState && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loadingState, hasMore]);

  useEffect(() => {
    fetchMostPlayedData()
  }, [page]);
  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#131313' }}
          isScrollable={true}
      viewStyle={{ backgroundColor: '#131313' }}
      leftHeading={'Most Played Of The Week'}
      // ChatIconPress={()=>NavigationService.navigate('ChatList')}
      // Home
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent={true}
        />

        <FlatList
          data={mostPlayedEpisodes}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          //   horizontal
          numColumns={2}
          contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item, index }) => {
            const isStaticImage =
            item.image && item.image.endsWith('.mp4');
          const imageSource = isStaticImage
            ? staticImage
            : {uri: imageUrl + item?.image};
            return (
                <Pressable 
                  key={index}
                  onPress={() => {
                    if (isStaticImage) {
                      NavigationService.navigate('VideoLive', {
                        id: item?._id,
                      });
                    } else {
                      NavigationService.navigate('PodcastLive', {...item, audio:item?.audioUrl});
                    }
                  }}
                  // onPress={() => {
                  //   NavigationService.navigate('VideoLive', {id: item?._id});
                  // }}
                  style={{
                    width: '50%',
                    height: 165,
                    borderRadius: 15,
                    marginRight: 10,
                    marginBottom: 20,
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                   
                  }}
                  >
                   <View style={{position: 'relative'}}>
                          <Image
                            source={imageSource}
                            style={{
                              height: '100%',
                              width: '100%',
                              borderRadius: 15,
                            }}
                            resizeMode="cover"
                          />
                          {isStaticImage && (
                            <View 
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: [
                                  {translateX: -20},
                                  {translateY: -30},
                                ], // Adjust the position of the icon as per your preference
                              }}>
                              <Icon name="play-circle" size={30} color="rgba(0, 0, 0, 0.7)" />
                            </View>
                          )}
                    </View>
                  <View
                    style={{
                      width: '100%',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      padding: 10,
                      borderBottomRightRadius:15
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: 'Arial', // Use your desired font family
                        marginBottom: 5,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: 'Arial', // Use your desired font family
                      }}>
                      Views: {item.views}
                    </Text>
                  </View>
                </Pressable>

      
            );
          }}
        />
         {loadingState && hasMore && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loadingState && hasMore && (
          <Text
            onPress={fetchNextPage}
            style={{
              color: '#fff',
              marginVertical: 5,
              marginHorizontal: 10,
              textAlign: 'right',
              fontSize: 15,
              fontFamily: Theme.FontFamily.normal,
            }}>
            Load More
          </Text>
        )}
      </View>
    </ScreenLayout>
  );
};

export default MostPlayed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    // paddingTop:Platform.OS ==='ios' ? 20 : 60,
  },
});
