import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import {Icon} from 'react-native-basic-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';

const {width, height} = Dimensions.get('screen');

const WatchLater = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);

  const loadSavedVideos = useCallback(async () => {
    try {
      const savedVideosString = await AsyncStorage.getItem('savedVideos');
      if (savedVideosString) {
        const savedVideosArray = JSON.parse(savedVideosString);
        console.log('savedVideos:', savedVideosArray);
        setSavedVideos(savedVideosArray);
      }
    } catch (error) {
      console.error('Error loading saved videos:', error);
    }
  }, []);

  useFocusEffect(loadSavedVideos);

  const clearSavedVideos = async () => {
    try {
      await AsyncStorage.removeItem('savedVideos');
      setSavedVideos([]);
      Alert.alert('Success', 'Saved videos cleared successfully');
    } catch (error) {
      console.error('Error clearing saved videos:', error);
    }
  };

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={'Watch Later'}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={false}
      onLeftIconPress={() => NavigationService.back()}
      rightIconName={'trash'}
      onRightIconPress={clearSavedVideos}>
      <View style={styles.container}>
        <FlatList
          data={savedVideos}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 0}}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                marginTop: 15,
                borderBottomColor: '#1C1C1C',
                borderBottomWidth: 1.5,
                paddingBottom: 10,
              }}>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <View
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    borderWidth: item.price ? 2 : 0,
                    borderRadius: 6,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 42,
                      width: 42,
                      borderRadius: 5,
                    }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{paddingHorizontal: 15}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: Theme.FontFamily.normal,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                      marginTop: 5,
                    }}>
                    {item.created_by_name}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 16,
                  fontFamily: Theme.FontFamily.light,
                  marginTop: 10,
                }}>
                {item.overview}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 0,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    width: '25%',
                    alignItems: 'center',
                  }}>
                  <DownloadIcon />
                  <ShareIcon />
                  <Icon
                    name="dots-three-horizontal"
                    type="Entypo"
                    size={16}
                    color={'#fff'}
                  />
                </View>
                <Pressable
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <VideoPlayIcon />
                </Pressable>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Pressable
          style={{
            backgroundColor: '#ff0000',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}
          onPress={clearSavedVideos}>
          <Text style={{color: '#fff', fontSize: 16}}>Clear Saved Videos</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default WatchLater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
