import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {useRoute} from '@react-navigation/native';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Activity = props => {
  const route = useRoute();
  const isFocused = useIsFocused();

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const token = useSelector(state => state.authData.token);

  const [allData, setAllData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setLoadingState(true);
    try {
      const endpoint = `activity/index?take=15&page=${page}`;
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response.status) {
        setAllData(prev => [...prev, ...response?.data?.listData]);
        setHasMore(response?.data?.isNext);
      } else {
        console.error('Error fetching data: ', response?.message);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setInitialLoading(false);
      setLoadingState(false);
    }
  };

  const fetchNextPage = useCallback(() => {
    if (!loadingState && !hasMore) return null;

    if (!loadingState && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loadingState, hasMore]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, page]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      // showLoading={initialLoading}
      isScrollable={true}
      leftHeading={'Your Activity'}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
       
        {initialLoading && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <FlatList
          data={allData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 0}}
          renderItem={({item, index}) => {
            const formatDate = timestamp => {
              const date = new Date(timestamp);
              return date.toISOString().split('T')[0];
            };
            const formatTime = timestamp => {
              const date = new Date(timestamp);
              return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
            };
            return (
              <View
                key={index}
                style={{
                  marginTop: 10,
                  borderBottomColor: '#1C1C1C',
                  borderBottomWidth: 1.5,
                  
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Theme.FontFamily.medium,
                  }}>
                  {item?.message}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.light,
                    marginTop: 3,
                  }}>
                  {formatDate(item?.created_at)}{' '}
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                    }}>
                    {formatTime(item?.created_at)}
                  </Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <View
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      borderWidth: item.price ? 2 : 0,
                      borderRadius: 6,
                      // padding:1
                    }}>
                    <Image
                      source={item.image}
                      style={{
                        height: 42,
                        width: 42,
                        borderRadius: 5,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  {item.price ? (
                    <View
                      style={{
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#ED4040',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.medium,
                        }}>
                        {' '}
                        {item.price}
                      </Text>
                    </View>
                  ) : (
                    <View style={{paddingHorizontal: 15}}>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.normal,
                        }}>
                        {item.details}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginTop: 5,
                        }}>
                        {item.hostedby}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
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

export default Activity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});
