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
import React, {useState, useEffect, useCallback} from 'react';
import AllSourcePath from '../../Constants/PathConfig';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {apiCall} from '../../Services/Service';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

const PopularEpisode = () => {
  const route = useRoute();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [popularEpisodes, setPopularEpisodes] = useState([]);
  const token = useSelector(state => state.authData.token);
  const staticImage = require('../../assets/images/image96.png');
  const fetchEpisodeData = useCallback(async () => {
    try {
      const endpoint = 'podcast/list';
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response?.status === true) {
        setPopularEpisodes(response?.data?.listData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#131313'}}
      showLoading={loadingState}
      isScrollable={true}
      viewStyle={{backgroundColor: '#131313'}}
      leftHeading={'Popular Episode'}
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
          data={popularEpisodes}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          //   horizontal
          numColumns={2}
          contentContainerStyle={{marginHorizontal: 20, paddingBottom: 20}}
          renderItem={({item, index}) => {
            const isStaticImage = item.image.endsWith('.mp4');
            const source = isStaticImage
              ? staticImage
              : {uri: `${imageUrl}${item.image}`};
            return (
              <Pressable
                key={index}
                onPress={() => {
                  NavigationService.navigate('PodcastLive', item);
                }}
                style={{
                  width: '100%',
                  height: 175,
                  borderRadius: 15,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '95%',
                    height: 165,
                    borderRadius: 15,
                    // marginRight: 20,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    overflow: 'hidden',

                    backgroundColor: 'transparent',
                    marginTop: 20,
                  }}>
                  <Image
                    source={source}
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
                      paddingLeft: 5,
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
                        // padding: 5,
                        marginLeft: 13,
                        textAlign: 'auto',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                          marginHorizontal: 5,
                          // textAlign: 'auto',
                        }}>
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginLeft: 5,
                        }}>
                        Views: {item.views}
                      </Text>
                    </View>
                  </BlurView>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default PopularEpisode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    // paddingTop:Platform.OS ==='ios' ? 20 : 60,
  },
});
