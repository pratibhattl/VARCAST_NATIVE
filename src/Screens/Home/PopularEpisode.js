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
  ActivityIndicator,
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
import HelperFunctions from '../../Constants/HelperFunctions';

const {width, height} = Dimensions.get('screen');

const PopularEpisode = () => {
  const route = useRoute();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const token = useSelector(state => state.authData.token);
  const staticImage = require('../../assets/images/image96.png');

  const [loadingState, setLoadingState] = useState(false);
  const [popularEpisodes, setPopularEpisodes] = useState([]);
  const [paginatedDataCount, setPaginatedDataCount] = useState();
  const [page, setPage] = useState(0);

  const fetchEpisodeData = async () => {
    setLoadingState(true);
    try {
      const endpoint = `podcast/list?take=15&page=${page}`;
      const response = await apiCall(endpoint, 'GET', {}, token);
      console.log('data', response);

      if (response?.status === true) {
        const newEpisodes = response?.data?.listData || [];
        
        setPopularEpisodes(prevEpisodes => [...prevEpisodes, ...newEpisodes]);
        setPaginatedDataCount(response?.data?.countData);
      }

      setLoadingState(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingState(false);
    }
  };

  const fetchNextPage = useCallback(() => {
    console.log('End reached, fetching next page...');
    console.log(paginatedDataCount, popularEpisodes.length);
    if (loadingState && paginatedDataCount === popularEpisodes.length) return;
    if (loadingState && paginatedDataCount > popularEpisodes.length) {
      setPage(prevPage => prevPage + 1);
    }
  }, [paginatedDataCount, popularEpisodes.length]);

  const ListEndLoader = () => {
    if (!loadingState) return null;
    
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  useEffect(() => {
    console.log('page', page);
    fetchEpisodeData();
  }, [page]);

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
        
        {!loadingState && (
          <FlatList
            data={popularEpisodes}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator
            numColumns={2}
            contentContainerStyle={{marginHorizontal: 20}}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={ListEndLoader}
            initialNumToRender={15}
            renderItem={({item}) => {
              const isStaticImage = item.image?.endsWith('.mp4');
              const source = isStaticImage
                ? staticImage
                : {uri: `${imageUrl}${item.image}`};
              return (
                <Pressable
                  key={item._id}
                  onPress={() => {
                    NavigationService.navigate('PodcastLive', item);
                  }}
                  style={{
                    width: '50%',
                    height: 165,
                    borderRadius: 15,
                    marginRight: 10,
                    marginBottom: 20,
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                  }}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={source}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 15,
                      }}
                      resizeMode="cover"
                    />
                    <BlurView
                      style={{
                        width: '100%',
                        height: '40%',
                        alignSelf: 'center',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 10,
                        //  borderRadius:15,
                      }}
                      blurType="light"
                      overlayColor="transparent"
                      blurAmount={20}
                      blurRadius={10}
                      reducedTransparencyFallbackColor="white">
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                          marginTop: 2,
                          marginLeft: 5,
                          textWrap: 'wrap',
                          // textAlign: 'auto',
                        }}>
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginTop: 2,
                          marginLeft: 5,
                        }}>
                        Views: {item.views}
                      </Text>
                    </BlurView>
                  </View>
                </Pressable>
              );
            }}
          />
        )}

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
