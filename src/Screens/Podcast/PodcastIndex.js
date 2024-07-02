import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import CustomHeader from '../../Components/Header/CustomHeader';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';
import {BlurView} from '@react-native-community/blur';
import WatchLaterIcon from '../../assets/icons/Watchlater';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import AllSourcePath from '../../Constants/PathConfig';
import {apiCall} from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
const {width, height} = Dimensions.get('screen');

const PodcastIndex = () => {
  const route = useRoute();
  const {podcastData} = route.params;
  const {t} = useTranslation();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const token = useSelector(state => state.authData.token);

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [data, setData] = useState([]);

  const addToWatchLater = async podcastData => {
    try {
      // Get existing saved videos or initialize empty array
      const savedVideosString = await AsyncStorage.getItem('savedVideos');
      const savedVideos = savedVideosString
        ? JSON.parse(savedVideosString)
        : [];

      // Add selected data to saved videos
      savedVideos.push(podcastData);

      // Save updated saved videos to local storage
      await AsyncStorage.setItem('savedVideos', JSON.stringify(savedVideos));

      // Navigate to Watch Later page
      NavigationService.navigate('WatchLater', {savedVideos: savedVideos});
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall('podcast/list', 'GET', null, token);
        const podcastList = response.data.listData;
        setData(podcastList); // Adjust according to the actual data structure
      } catch (error) {
        HelperFunctions.showToastMsg(error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'light-content'}
        translucent={true}
      />
      <ImageBackground
        source={require('../../assets/images/Maskpodcast.png')}
        style={{
          width: width,
          height: height / 3,
          backgroundColor: '#131313',
          paddingTop: Platform.OS === 'ios' ? 35 : 10,
        }}
        resizeMode="cover">
        <CustomHeader
          style={{backgroundColor: 'transparent'}}
          leftHeading={'Podcast Details'}
          Watch
          onLeftIconPress={() => NavigationService.back()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <View
            style={{
              borderRadius: 15,
              height: 140,
              width: 140,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: `${imageUrl}${podcastData.image}`}}
              style={{
                height: 140,
                width: 140,
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              width: '60%',
              paddingHorizontal: 10,
              // backgroundColor:'red'
            }}>
            <View>
              <Text
                style={{
                  fontFamily: Theme.FontFamily.normal,
                  fontSize: 16,
                  color: '#fff',
                }}>
                {podcastData.id}
              </Text>
              <Text
                style={{
                  fontFamily: Theme.FontFamily.medium,
                  fontSize: 18,
                  color: '#fff',
                  marginTop: 1,
                }}>
                {podcastData.title}
              </Text>
              {/* <Text
                style={{
                  fontFamily: Theme.FontFamily.normal,
                  fontSize: 16,
                  color: 'rgba(255, 255, 255, 0.54)',
                }}>
                Hosted by: Adrian Reif
              </Text> */}
              <View
                style={{
                  height: 35,
                  width: 70,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: -10,
                }}></View>
              {/* <ClockCircleIcon Width={18} Height={18} /> */}
              {/* <Text
                style={{
                  fontFamily: Theme.FontFamily.normal,
                  color: '#fff',
                  fontSize: 15,
                  marginHorizontal: 25,
                  marginVertical: -21,
                }}>
                {podcastData?.duration}
              </Text> */}
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('SongPlayy', podcastData)}
          style={{
            position: 'absolute',
            bottom: -25,
            right: 80,
            height: 50,
            width: 50,
            borderRadius: 30,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <VideoPlayIcon Width={30} Height={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addToWatchLater(podcastData)}
          style={{
            position: 'absolute',
            bottom: -25,
            right: 10,
            height: 50,
            width: 50,
            borderRadius: 30,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => addToWatchLater(podcastData)}>
            <WatchLaterIcon Width={30} Height={30} />
          </TouchableOpacity>
        </TouchableOpacity>
      </ImageBackground>
      <View style={{padding: 15}}>
        <Text
          style={{
            fontFamily: Theme.FontFamily.semiBold,
            color: '#fff',
            fontSize: 20,
            marginTop: 40,
            //   marginHorizontal:3
          }}>
          {t('Details')}
        </Text>
        <Text
          style={{
            fontFamily: Theme.FontFamily.normal,
            color: 'rgba(255, 255, 255, 0.54)',
            fontSize: 16,
            marginTop: 20,
            //   marginHorizontal:3
          }}>
          {podcastData.overview}
        </Text>
        <View
          style={{
            // paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: Theme.FontFamily.semiBold,
            }}>
            {t('Similar Podcasts')}
          </Text>
          <Text
            onPress={() => NavigationService.navigate('PopularEpisode')}
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontSize: 14,
              fontFamily: Theme.FontFamily.normal,
              textAlign: 'right',
            }}>
            {t('View All')}
          </Text>
        </View>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingTop: 20, paddingLeft: 0}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: 200,
                  height: 185,
                  borderRadius: 15,
                  marginRight: 20,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  overflow: 'hidden',

                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={{uri: `${imageUrl}${item.image}`}}
                  style={{
                    width: 200,
                    height: 180,
                    borderRadius: 15,
                    // borderBottomLeftRadius:150
                    // marginHorizontal:10
                  }}
                  resizeMode="cover"
                />
                <BlurView
                  style={{
                    height: 71,
                    width: 200,
                    // alignItems:'center',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 0,
                    //  padding:5
                    //  borderRadius:15,
                  }}
                  blurType="light"
                  overlayColor="transparent"
                  blurAmount={20}
                  blurRadius={10}
                  reducedTransparencyFallbackColor="white">
                  <View
                    style={{
                      overflow: 'hidden',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.normal,
                        marginHorizontal: 5,
                        // textAlign:'auto'
                      }}>
                      {item.title}
                    </Text>

                    {/* <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginLeft: 5,
                      }}>
                      Duration: 23 mins
                    </Text> */}
                  </View>
                </BlurView>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PodcastIndex;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#141414',
  },
});

{
  /* <ScreenLayout
headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
showLoading={loadingState}
isScrollable={true}
leftHeading={'Podcast Details'}
// Podcast
// right
Watch
// Live={cat == 'Live' ? true : false}
leftHeadingStyle={{ color: '#E1D01E' }}
hideLeftIcon={customProp ? false : true}
onLeftIconPress={() => NavigationService.back()}> */
}
