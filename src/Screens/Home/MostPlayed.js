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
import React, {useState, useEffect,useCallback} from 'react';

import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {apiCall} from '../../Services/Service';
import {useSelector} from 'react-redux';
import AllSourcePath from '../../Constants/PathConfig';

const {width, height} = Dimensions.get('screen');

const MostPlayed = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [mostPlayedEpisodes, setMostPlayedEpisodes] = useState([]);
  const token = useSelector(state => state.authData.token);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL

  const fetchMostPlayedData = useCallback(async () => {
    try {
      const endpoint = 'videos/list';
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response?.status === true) {
        
        setMostPlayedEpisodes(response?.data?.listData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  }, [token]);

  useEffect(()=>{
    fetchMostPlayedData()
  },[]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#131313'}}
      showLoading={loadingState}
      isScrollable={true}
      viewStyle={{backgroundColor: '#131313'}}
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
          contentContainerStyle={{marginHorizontal: 20, paddingBottom: 20}}
          renderItem={({item, index}) => {
            return (
              <View>
                {mostPlayedEpisodes && ( // Check if mostPlayedData is not null or undefined
                  <FlatList
                    data={mostPlayedEpisodes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingTop: 20, paddingLeft: 20}}
                    renderItem={({item}) => (
                      <Pressable
                        onPress={() => {
                          // Navigate to Live Detail page
                          NavigationService.navigate('VideoLive', {id: item?._id});
                        }}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 15,
                          marginRight: 20,
                          overflow: 'hidden',
                          backgroundColor: 'transparent',
                        }}>
                        <Image
                          source={{uri: imageUrl+item.image}}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 15,
                          }}
                          resizeMode="cover"
                        />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: 10,
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
                    )}
                  />
                )}
              </View>
            );
          }}
        />
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
