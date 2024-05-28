import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {Icon} from 'react-native-basic-elements';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';

const NotificationIndex = props => {
  const [loadingState, setloadingState] = useState(false);
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([
    {
      title: 'Lexi knows best is live now!',
      date: 'Just Now',
      time: '• 19:45',
      image: require('../../assets/images/Rectangle23x.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      live: true,
    },

    {
      title: 'Lorem ipsum dolor sit a consetetur sadipscing elitr sed diam',
      date: '5 hours ago',
      time: '• 19:32',
      image: require('../../assets/images/Rectangle3x.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Lorem ipsum dolor sit a consetetur sadipscing elitr sed diam',
      date: '8 hours ago',
      time: '• 14:45',
      image: require('../../assets/images/Rectangle183.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
  ]);

  // Fetch data from the API
  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const response = await fetch(
          'https://dev2024.co.in/web/varcast/notification-list.json',
        );
        const data = await response.json();
        // Update state with fetched data
        setNewData(data.notifications);
      } catch (error) {
        console.error('Error fetching new notifications:', error);
      }
    };

    // Call the fetchNewData function when the component mounts
    fetchNewData();
  }, []);
  return (
    <ScreenLayout
      isScrollable={false}
      showLeftIcon={true}
      showLoading={loadingState}
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
                <Image
                  source={{uri: notification.image}}
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
                    {notification.title}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.light,
                      marginTop: 3,
                    }}>
                    {notification.date}
                  </Text>
                </View>
                <Pressable
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
                </Pressable>
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
