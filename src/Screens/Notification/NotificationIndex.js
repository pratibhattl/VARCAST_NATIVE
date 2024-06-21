import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {Icon} from 'react-native-basic-elements';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import AllSourcePath from '../../Constants/PathConfig';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import {useIsFocused} from '@react-navigation/native';

const NotificationIndex = props => {
  const token = useSelector(state => state.authData.token);
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const isFocused = useIsFocused();

  const [loadingState, setloadingState] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setloadingState(true);
    try {
      const endpoint = `notification/index?take=15&page=${page}`;
      const response = await apiCall(endpoint, 'GET', {}, token);

      if (response.status) {
        setNewData(prev => [...prev, ...response?.data?.listData]);
        setHasMore(response?.data?.isNext);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setloadingState(false);
      setInitialLoading(false)
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
      isScrollable
      showLeftIcon={true}
      onLeftIconPress={() => {
        NavigationService.back();
        // scrollToIndex(0)
      }}
      // right
      Noti
      leftHeading={'Notification'}
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      viewStyle={{backgroundColor: '#131313'}}
      // HeaderTitleValue="Support"
    >
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontFamily: Theme.FontFamily.semiBold,
            marginTop: 15,
            marginBottom: 5,
          }}>
          NEW
        </Text>

        {initialLoading && (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        
        {newData.map((notification, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent:'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 46,
                  width: 46,
                  borderRadius: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#E1D01F',
                  borderWidth: notification.live ? 1.5 : 0,
                }}>
                {/* <Image
                  source={{uri: notification.image}}
                  style={{
                    height: 43,
                    width: 43,
                    borderRadius: 43,
                  }}
                  resizeMode="contain"
                /> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginLeft: 15,
                  borderColor: 'rgba(118, 118, 128, 0.24)',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View style={{width: '89%'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: Theme.FontFamily.normal,
                    }}>
                    {notification?.message}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                      marginTop: 3,
                    }}>
                    {formatDate(notification.created_at)}
                  </Text>
                </View>
                {/* <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    NavigationService.navigate('Publication02');
                  }}
                  style={{}}>
                  {notification.live ? (
                    <Icon
                      name="dot-single"
                      type="Entypo"
                      size={25}
                      color={'#E1D01E'}
                      //   style={{marginTop:5}}
                    />
                  ) : (
                    <Image
                      source={{uri: notification.image}}
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </Pressable> */}
              </View>
            </View>
          );
        })}
        {/* <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontFamily: Theme.FontFamily.semiBold,
            marginTop: 15,
            marginBottom: 5,
          }}>
          EARLIER
        </Text>
        {oldData.map((res, ind) => {
          return (
            <View
              key={ind}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent:'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 46,
                  width: 46,
                  borderRadius: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#E1D01F',
                  borderWidth: res.live ? 1.5 : 0,
                }}>
                <Image
                  source={res?.image}
                  style={{
                    height: 43,
                    width: 43,
                    borderRadius: 43,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginLeft: 15,
                  borderColor: 'rgba(118, 118, 128, 0.24)',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View style={{width: '89%'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: Theme.FontFamily.normal,
                    }}>
                    {res.title}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                      marginTop: 3,
                    }}>
                    {res.date}
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    NavigationService.navigate('Publication02');
                  }}
                  style={{}}>
                  {res.live ? (
                    <Icon
                      name="dot-single"
                      type="Entypo"
                      size={25}
                      color={'#E1D01E'}
                      //   style={{marginTop:5}}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/Rectangle184.png')}
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              </View>
            </View>
          );
        })} */}

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

export default NotificationIndex;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    // backgroundColor:'#131313'
  },
});
