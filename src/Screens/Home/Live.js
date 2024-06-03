/* eslint-disable react-native/no-inline-styles */
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
import React, {useState, useEffect} from 'react';
import {apiCall} from '../../Services/Service';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('screen');

const LiveEpisode = () => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const token = useSelector(state => state.authData.token);
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = 'lives/list';
        const response = await apiCall(endpoint, 'GET', {}, token);
        const data = response.data; // Assuming response is already parsed as JSON
        const mappedData = data.listData.map(item => ({
          title: item.title,
          slug: item.slug,
          imageUrl: item.imageUrl,
          videoUrl: item.videoUrl,
          id: item?._id
        }));
        setLiveData(mappedData);
        console.log('Liveresponse', mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#131313'}}
      showLoading={loadingState}
      isScrollable={true}
      viewStyle={{backgroundColor: '#131313'}}
      leftHeading={'Live Page'}
      // ChatIconPress={()=>NavigationService.navigate('ChatList')}
      // Home
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent={true}
        />

        <FlatList
          data={liveData}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          //   horizontal
          numColumns={2}
          contentContainerStyle={{marginHorizontal: 20, paddingBottom: 20}}
          renderItem={({item, title}) => {
            return (
              <Pressable
              onPress={() =>
                NavigationService.navigate('LiveDetails', {id:item?.id})
              }
                key={title}
                style={{
                  width: '46%',
                  height: 165,
                  borderRadius: 15,
                  marginRight: 20,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  overflow: 'hidden',

                  backgroundColor: 'transparent',
                  marginTop: 20,
                }}>
                <Image
                  source={{uri: item.imageUrl}}
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
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
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
                      Duration: {item.views}
                    </Text>
                  </View>
                </BlurView>
              </Pressable>
            );
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default LiveEpisode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    // paddingTop:Platform.OS ==='ios' ? 20 : 60,
  },
});
