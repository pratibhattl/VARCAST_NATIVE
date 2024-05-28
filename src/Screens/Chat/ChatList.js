/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/core';
import {AppTextInput} from 'react-native-basic-elements';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import Theme from '../../Constants/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ThreeDots from '../../assets/icons/ThreeDots';
import DoubleTick from '../../assets/icons/DoubleTick';
import pic from '../../assets/images/image3.png'


const {width, height} = Dimensions.get('screen');


const ChatList = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [allData, setAllData] = useState([
    {
      id:1,
      title: 'Video Watched',
      date: 'typing...',
      time: '19:45',
      image: pic,
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      id:2,
      title: 'I Liked the Podcast',
      date: 'Hey, I’m good what about you?',
      time: '19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      id:3,
      title: 'Purchased 300 coins',
      date: '31 videos • 12 podcasts',
      time: ' 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      id:4,
      title: 'Video Watched',
      date: '15 videos • 14 podcasts',
      time: ' 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Video Watched',
      date: '7 videos • 14 podcasts',
      time: ' 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '7 videos • 14 podcasts',
      time: ' 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: ' 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '7 videos • 14 podcasts',
      time: '19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
  ]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96)'}}
      showLoading={loadingState}
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
          value={password}
          onChangeText={a => setPassword(a)}
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
          rightAction={<MicroPhoneIcon />}
          leftIcon={{
            name: 'search',
            type: 'Feather',
            color: 'rgba(255, 255, 255, 0.54)',
            size: 21,
          }}
          secureTextEntry={passwordShow ? false : true}
          onRightIconPress={() => setPasswordShow(!passwordShow)}
          inputContainerStyle={styles.input_container_sty}
          style={styles.text_style}
        />
        <KeyboardAwareScrollView>
          {allData.map((res, ind) => {
            console.log('res',res)
            return (
              <Pressable
                key={ind}
                onPress={() => NavigationService.navigate('ChatRoom',{data:res,id:res.id})}
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  // justifyContent:'space-between',
                  marginTop: 15,
                  paddingLeft: 20,
                }}>
                <Pressable>
                  <Image
                    source={res?.image}
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
                      {res.title}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.light,
                        marginTop: 3,
                      }}>
                      {res.date}{' '}
                    </Text>
                  </View>
                  <Pressable
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
                  </Pressable>
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
