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
  const customProp = route.params?.showButton;
  const token = useSelector(state => state.authData.token);
  const staticImage = require('../../assets/images/image96.png');

  const [loadingState, setLoadingState] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [popularEpisodes, setPopularEpisodes] = useState([]);
  const [page, setPage] = useState(0);

  const fetchEpisodeData = async () => {
    setLoadingState(true);
    try {
      const endpoint = `podcast/list?take=15&page=${page}`;
      const response = await apiCall(endpoint, 'GET', {}, token);

      let newData = [...popularEpisodes, ...response.data.listData];

      if (response?.status === true) {
        const uniqueSet = new Set();
        const uniqueArr = [];

        for (let ele of newData) {
          if (!uniqueSet.has(JSON.stringify(ele))) {
            uniqueSet.add(JSON.stringify(ele));
            uniqueArr.push(ele);
          }
        }

        setPopularEpisodes(uniqueArr);
        setHasMore(response?.data?.isNext);
      }
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
    } finally {
      setLoadingState(false);
      setInitialLoading(false);
    }
  };

  const fetchNextPage = useCallback(() => {
    if (!loadingState && !hasMore) return null;
    if (!loadingState && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loadingState, hasMore]);

  useEffect(() => {
    fetchEpisodeData();
  }, [page]);

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: '#131313'}}
      isScrollable={true}
      viewStyle={{backgroundColor: '#131313'}}
      leftHeading={'Popular Episode'}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent={true}
        />

        {initialLoading && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <FlatList
          data={popularEpisodes}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator
          numColumns={2}
          columnWrapperStyle={{
            margin: 10,
          }}
          // onEndReached={fetchNextPage}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={ListEndLoader}
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
                  if (isStaticImage) {
                    NavigationService.navigate('PodcastVideo', {
                      id: item?._id,
                    });
                  } else {
                    NavigationService.navigate('PodcastLive', item);
                  }
                }}
                style={{
                  width: '49%',
                  height: 165,
                  borderRadius: 15,
                  marginHorizontal: 4,
                  overflow: 'hidden',
                  backgroundColor: 'black',
                  position: 'relative',
                }}>
                <Image
                  source={source}
                  style={{
                    width: '100%',
                    height: '100%',
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
                      fontWeight: 600,
                      fontFamily: Theme.FontFamily.normal,
                      marginTop: 2,
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>

                  {/* <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 2,
                        marginLeft: 5,
                      }}>
                      Views: {item.views}
                    </Text> */}
                </BlurView>
              </Pressable>
            );
          }}
        />

        {loadingState && hasMore && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loadingState && hasMore ? (
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
        ) : (
          ''
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
