
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/native';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import {Image} from 'react-native';
import CameraIcon from '../../assets/icons/CameraIcon';
import PlayBackIcon from '../../assets/icons/PlaybackIcon';
import TemplateIcon from '../../assets/icons/TemplateIcon';
import Theme from '../../Constants/Theme';
import StickerEmoji from '../../assets/icons/StickerEmoji';
import AudioIcon from '../../assets/icons/AudioIcon';
import TextIcon from '../../assets/icons/TextIcon';
import LiveEditIcon from '../../assets/icons/LiveEditIcon';
import ReactNativeModal from 'react-native-modal';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import {AppTextInput, Icon} from 'react-native-basic-elements';
import {BlurView} from '@react-native-community/blur';
import LinkIcon from '../../assets/icons/LinkIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {t} from 'i18next';
const {width, height} = Dimensions.get('screen');

const Publication01 = ({ croppedImage}) => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [cat, setCat] = useState('My Sounds');
  const [email, setEmail] = useState('');

  const [allData, setAllData] = useState([
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '25 Sep ',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: '• 14:45',
      image: require('../../assets/images/Coin(1).png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'I Liked the Podcast',
      date: '25 Sep ',
      time: '• 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Purchased 300 coins',
      date: '23 Sep ',
      time: '• 14:45',
      image: require('../../assets/images/Coin(1).png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: '25 Sep ',
      time: '• 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
  ]);
  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={t('New Publication')}
      // viewStyle={{backgroundColor:'transparent'}}
      right
      onRightTextPress={() => setModalVisible(true)}
      // Live={cat == 'Live' ? true : false}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <View style={{height: height / 1.5, bottom: 80}}>
          <Image
            source={{uri: croppedImage}}
            style={{
              height: height / 1.2,
              width: width,
              // borderRadius: 15,
            }}
            resizeMode="contain"
          />
        </View>
        {/* <Text
          style={{
            color: 'rgba(255, 255, 255, 0.54)',
            fontSize: 16,
            fontFamily: Theme.FontFamily.normal,
            textAlign: 'center',
            // marginTop:5
          }}>
          Settings
        </Text>
        <FlatList
          data={[1, 2, 3, 4]}
          //    horizontal
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            alignItems: 'center',
            paddingTop: 15,
          }}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  height: 74,
                  width: 90,
                  borderRadius: 15,
                  backgroundColor: '#1C1C1C',
                  marginRight: index == 3 ? 0 : 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index == 0 ? (
                  <AudioIcon />
                ) : index == 1 ? (
                  <TextIcon />
                ) : index == 2 ? (
                  <StickerEmoji />
                ) : (
                  <LiveEditIcon Color={'#fff'} />
                )}
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: Theme.FontFamily.normal,
                    marginTop: 5,
                  }}>
                  {index == 0
                    ? 'Audio'
                    : index == 1
                    ? 'Text'
                    : index == 2
                    ? 'Sticker'
                    : 'Effects'}
                </Text>
              </View>
            );
          }}
        /> */}
      </View>
      <ReactNativeModal
        isVisible={isModalVisible}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.9}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            width: '100%',
            height: height / 1.2,
            backgroundColor: '#1C1C1C',
            borderRadius: 20,
            alignItems: 'center',
            padding: 0,
            // justifyContent:'center',
            // paddingHorizontal: 10,
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: 4,
              width: 32,
              backgroundColor: 'rgba(118, 118, 128, 0.24)',
              marginTop: 10,
              marginBottom: 15,
            }}
          />
          {/* <KeyboardAwareScrollView> */}
          {cat == 'My Sounds' ? (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
              <FlatList
                data={['My Sounds', 'Link']}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{paddingVertical: 20, paddingLeft: 0}}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => setCat(item)}
                      style={{
                        height: 50,
                        //   width: 100,
                        borderRadius: 30,
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        borderWidth: 1.5,
                        backgroundColor: cat == item ? '#fff' : 'transparent',
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          color:
                            cat == item
                              ? '#131313'
                              : 'rgba(255, 255, 255, 0.54)',
                          fontSize: 16,
                          fontFamily: Theme.FontFamily.normal,
                          // marginTop:5
                        }}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                }}
              />
              {allData.map((res, ind) => {
                return (
                  <View
                    key={ind}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent:'space-between',
                      marginTop: 10,
                    }}>
                    <Image
                      source={res?.image}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 45,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        marginLeft: 20,
                        borderColor: 'rgba(118, 118, 128, 0.24)',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
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
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.54)',
                              fontSize: 14,
                              fontFamily: Theme.FontFamily.light,
                            }}>
                            {res.time}
                          </Text>
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          setModalVisible(false);
                          NavigationService.navigate('Publication02');
                        }}
                        style={{}}>
                        <Icon
                          name="plus"
                          type="Entypo"
                          size={25}
                          color={'#E1D01E'}
                          //   style={{marginTop:5}}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </KeyboardAwareScrollView>
          ) : (
            <>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
                <FlatList
                  data={['My Sounds', 'Link']}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{paddingVertical: 20, paddingLeft: 0}}
                  renderItem={({item, index}) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => setCat(item)}
                        style={{
                          height: 50,
                          //   width: 100,
                          borderRadius: 30,
                          borderColor: 'rgba(255, 255, 255, 0.12)',
                          borderWidth: 1.5,
                          backgroundColor: cat == item ? '#fff' : 'transparent',
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            color:
                              cat == item
                                ? '#131313'
                                : 'rgba(255, 255, 255, 0.54)',
                            fontSize: 16,
                            fontFamily: Theme.FontFamily.normal,
                            // marginTop:5
                          }}>
                          {item}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
                <Pressable
                  style={{
                    //   height: 53,
                    width: width - 30,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 15,
                    // marginBottom: 15,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      // textAlign: 'center',
                      fontFamily: Theme.FontFamily.normal,
                      fontSize: Theme.sizes.s15,
                    }}>
                    You can insert a link to a video or audio track from
                    third-party applications.
                  </Text>
                </Pressable>

                <AppTextInput
                  value={email}
                  onChangeText={a => setEmail(a)}
                  placeholder="Insert Link"
                  placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
                  inputStyle={{fontSize: 14}}
                  titleStyle={{
                    fontFamily: Theme.FontFamily.medium,
                    fontSize: Theme.sizes.s16,
                  }}
                  mainContainerStyle={
                    {
                      //   marginHorizontal:20
                    }
                  }
                  rightAction={<LinkIcon />}
                  inputContainerStyle={{
                    paddingHorizontal: 10,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 0,
                    width: width - 30,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 0.7,
                    marginTop: 25,
                    alignSelf: 'center',
                  }}
                  style={styles.text_style}
                />
              </KeyboardAwareScrollView>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  NavigationService.navigate('Publication02');
                }}
                style={{
                  height: 50,
                  width: 350,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#E1D01E',
                  borderRadius: 15,
                  marginBottom: 30,
                  //   marginTop: 160,
                }}>
                <Text
                  style={{
                    color: '#131313',
                    textAlign: 'center',
                    fontFamily: Theme.FontFamily.medium,
                    fontSize: Theme.sizes.s16,
                  }}>
                  Done
                </Text>
              </Pressable>
            </>
          )}
          {/* </KeyboardAwareScrollView> */}
        </View>
      </ReactNativeModal>
    </ScreenLayout>
  );
};

export default Publication01;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#000'
    backgroundColor: '#131313',
    height: height,
  },
  input_container_sty: {
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 0,
    width: width - 30,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
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
