/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/core';
import {AppTextInput} from 'react-native-basic-elements';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import Theme from '../../Constants/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ThreeDots from '../../assets/icons/ThreeDots';
import DoubleTick from '../../assets/icons/DoubleTick';
import pic from '../../assets/images/image3.png';
import {apiCall} from '../../Services/Service';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

const ChatList = props => {
  const route = useRoute();
  const {token} = useSelector(state => state.authData);
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [allData, setAllData] = useState();

  const searchChatUser = async () => {
    const {data} = await apiCall(
      `home/chatUserList?search=${searchText}`,
      'GET',
      null,
      token,
    );
    setAllData(data?.listData);
    console.log('search', data);
  };

  useEffect(() => {
    searchChatUser();
  }, [searchText]);

  useEffect(() => {
    const getChatUsers = async () => {
      setLoading(true);
      try {
        const {data} = await apiCall('home/chatUserList', 'GET', null, token);
        setAllData(data?.listData);
      } catch (error) {
        console.error('ERROR WHILE FETCHING CHATLIST :', error);
      } finally {
        setLoading(false);
      }
    };

    getChatUsers();
  }, []);

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96)'}}
      showLoading={loading}
      isScrollable={true}
      Chat
      // viewStyle={{backgroundColor:'#131313'}}
      // leftHeading={'Book an Appointment'}
      ChatIconPress={() => NavigationService.navigate('ChatRoom')}
      Home
      Edit
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <AppTextInput
          value={searchText}
          onChangeText={a => setSearchText(a)}
          placeholder="Search"
          placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
          inputStyle={{fontSize: 14}}
          titleStyle={{
            fontFamily: Theme.FontFamily.semiBold,
            fontSize: Theme.sizes.s16,
          }}
          mainContainerStyle={
            {
              //   marginHorizontal:20
            }
          }
          // rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <KeyboardAwareScrollView>
          {loading && (
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                marginTop: 100,
                fontSize: 24,
              }}>
              Loading...
            </Text>
          )}

          {!loading && allData?.length === 0 && (
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                marginTop: 100,
                fontSize: 24,
              }}>
              No chats to show!
            </Text>
          )}

          {allData?.map((res, ind) => {
            return (
              <Pressable
                key={ind}
                onPress={() =>
                  NavigationService.navigate('ChatRoom', {
                    id: res?._id,
                    title: res?.name,
                    image: res?.full_path_image,
                    isExisting: true,
                  })
                }
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent:'space-between',
                  marginTop: 15,
                  paddingLeft: 20,
                }}>
                <Pressable>
                  <Image
                    source={
                      res.full_path_image
                        ? {uri: res?.full_path_image}
                        : require('../../assets/images/image.png')
                    }
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 45,
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    borderColor: 'rgba(118, 118, 128, 0.24)',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    marginTop: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: Theme.FontFamily.medium,
                      }}>
                      {res.name}
                    </Text>
                    {/* <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 3,
                      }}>
                      {res.date}{' '}
                    </Text> */}
                  </View>
                  {/* <Pressable
                    onPress={() => {
                      // setModalVisible(false)
                      // NavigationService.navigate('Publication02')
                    }}
                    style={{
                      marginRight: 20,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginBottom: 3,
                      }}>
                      {res.time}{' '}
                    </Text>
                    <DoubleTick />
                  </Pressable> */}
                </View>
              </Pressable>
            );
          })}
        </KeyboardAwareScrollView>
      </View>
    </ScreenLayout>
  );
};

export default ChatList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
    //   paddingLeft:20
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
    marginTop: 20,
    marginBottom: 5,
    // borderWidth: 0.7,
    // padding:0
    // backfaceVisibility:'hidden'
    // elevation:3
  },
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 15,
    color: '#fff',
  },
});
