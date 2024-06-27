import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {AppTextInput} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import NavigationService from '../../Services/Navigation';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import {useTranslation} from 'react-i18next';
import AllSourcePath from '../../Constants/PathConfig';

const {width, height} = Dimensions.get('screen');

const SearchIndex = props => {
  const token = useSelector(state => state.authData.token);
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const staticImage = require('../../assets/images/image96.png');
  const {t} = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cat, setCat] = useState(0);
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [previousEndpoint, setPreviousEndpoint] = useState('');

  const fetchData = async page => {
    let endpoint = '';

    switch (cat) {
      case 0: // Live
        endpoint = `lives/list?take=15&page=${page}`;
        setPreviousEndpoint(0);
        break;
      case 1: // Podcast
        endpoint = `podcast/list?take=15&page=${page}`;
        setPreviousEndpoint(1);
        break;
      case 2: // Video
        endpoint = `videos/list?take=15&page=${page}`;
        setPreviousEndpoint(2);
        break;
      default:
        endpoint = '';
    }

    if (endpoint !== '') {
      setLoadingState(true);

      try {
        const response = await apiCall(endpoint, 'GET', {}, token);

        let newData = [...data, ...response.data.listData];
       

        if (endpoint === `videos/list?take=15&page=${page}`) {
          // Filter the data to include only items with '.mp4' in their image URL
          const videoData = newData
            .filter(item => item?.image?.includes('.mp4'))
            .map(item => ({
              ...item,
              isVideo: true,
            }));
          setFilteredData(videoData);
        }

        if (page === 0) {
          setFilteredData(response.data.listData);
        } else {
          setFilteredData(prev => [...prev, ...response.data.listData]);
        }

        setData(newData);
        setHasMore(response?.data?.isNext);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingState(false);
        setInitialLoading(false);
      }
    }
  };

  const fetchNextPage = useCallback(() => {
    if (!loadingState && !hasMore) return null;

    if (!loadingState && hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchData(page + 1);
    }
  }, [loadingState, hasMore]);

  const handleSearch = query => {
    setSearchQuery(query);

    if (query === '') {
      fetchData(0);
    } else {
      const uniqueSet = new Set();
      const uniqueArr = [];

      for (let ele of data) {
        if (!uniqueSet.has(JSON.stringify(ele))) {
          uniqueSet.add(JSON.stringify(ele));
          uniqueArr.push(ele);
        }
      }

      const filtered = uniqueArr.filter(item =>
        item?.title?.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (previousEndpoint !== cat) {
      setPage(0);
      fetchData(0);
    }
  }, [cat]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={{flex: 1}}>
        <AppTextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{fontSize: 14}}
          autoCapitalize="none"
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          mainContainerStyle={{}}
          rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />

        <FlatList
          data={['Live', 'Podcast', 'Video']}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          contentContainerStyle={{
            paddingVertical: 25,
            paddingLeft: 20,
            paddingBottom: 35,
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => setCat(index)}
                style={{
                  height: 50,
                  width: 105,
                  borderRadius: 30,
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  borderWidth: 1.5,
                  backgroundColor: cat == index ? '#fff' : 'transparent',
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color:
                      cat == index ? '#131313' : 'rgba(255, 255, 255, 0.54)',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.normal,
                  }}>
                  {t(item)}
                </Text>
              </Pressable>
            );
          }}
        />

        {initialLoading && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <FlatList
          data={filteredData}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 5}}
          renderItem={({item}) => {
            const isVideo = cat === 2 && item.isVideo;
            const isStaticImage = item.image && item.image.endsWith('.mp4');
            const imageSource = isVideo
              ? staticImage
              : isStaticImage
              ? staticImage
              : {uri: cat === 0 ? item.imageUrl : `${imageUrl}${item.image}`};
            return (
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.3)',
                  '#f4c5c5',
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 0.6, y: 0}}
                style={{
                  flex: 1,
                  height: 120,
                  width: width - 40,
                  borderRadius: 15,
                  marginTop: 10,
                  flexDirection: 'row',
                  padding: 10,
                  alignSelf: 'center',
                }}>
                <View
                  style={{marginLeft: 3, borderRadius: 10, overflow: 'hidden'}}>
                  <Image
                    source={imageSource}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <Pressable
                  onPress={() => {
                    if (cat === 0) {
                      NavigationService.navigate('LiveDetails', {
                        id: item?._id,
                      });
                    } else if (cat === 1) {
                      NavigationService.navigate('PodcastLive', item);
                    } else if (cat === 2) {
                      NavigationService.navigate('VideoLive', {id: item?._id});
                    }
                  }}
                  style={{
                    marginHorizontal: 10,
                    width: '60%',
                  }}>
                  {cat === 0 && (
                    <Pressable
                      style={{
                        height: 29,
                        width: 58,
                        borderRadius: 30,
                        backgroundColor: '#ED4040',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 2,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                        }}>
                        {t('Live')}
                      </Text>
                    </Pressable>
                  )}
                  <View style={{marginTop: 12}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.medium,
                        marginLeft: 5,
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
                      {item.views}
                      {/* • */}
                      {formatDate(item.created_at)}
                    </Text>
                  </View>
                </Pressable>
              </LinearGradient>
            );
          }}
        />

        {loadingState && hasMore && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!searchQuery && !loadingState && hasMore ? (
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
    </SafeAreaView>
  );
};

export default SearchIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 40,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 60,
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
});
