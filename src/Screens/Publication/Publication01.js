import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Audio,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import AllSourcePath from '../../Constants/PathConfig';
import {apiCall, postApi} from '../../Services/Service';
import HelperFunctions from '../../Constants/HelperFunctions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('screen');

const Publication01 = () => {
  const route = useRoute();
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const tokenData = useSelector(state => state.authData.token);
  const {croppedImage} = route.params;
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [cat, setCat] = useState('My Sounds');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [audioList, setAudioList] = useState([]);
  const [audioArray, setAudioArray] = useState([]);

  const [selectedata, setSelectedata] = useState({file: croppedImage});
  const [audio, setAudio] = useState();

  const openAudeoList = index => {
    if (index == 0) {
      setModalVisible(!isModalVisible);
    }
  };

  const fetchAudioList = async () => {
    setLoader(true);
    try {
      const endpoint = 'audio/list';
      const response = await apiCall(endpoint, 'GET', {}, tokenData);
      if (response?.status === true) {
        setLoader(false);
        setAudioList(response?.data.listData || []);
        setAudioArray(response?.data.listData || []);
      }
    } catch (error) {
      setLoader(false);
      HelperFunctions.showToastMsg(error?.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAudioList();
    }
  }, [isFocused]);

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  const [audioIndex, setAudioIndex] = useState(null);

  const selectAudioFunc = (data, index) => {
    console.log("data?.fileurl---", data?.fileurl);
    setAudioIndex(index);
    setSelectedata({...selectedata, audio: data?.fileurl});
  };

  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      pickedFile.type === 'audio/mpeg'
        ? setAudio(pickedFile)
        : HelperFunctions.showToastMsg('You can upload only Audio');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('err', err);
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };

  const fileSubmit = async () => {
    let formData = new FormData();
    formData.append('audio', audio);
    setLoader(true);

    try {
      const data = await axios.post(`${baseUrl}audio/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenData}`,
        },
      });
      setCat('My Sounds');
      fetchAudioList();
      setAudio({});
      HelperFunctions.showToastMsg('Uploaded sucessfully ');
      return data;
    } catch (error) {
      HelperFunctions.showToastMsg(error?.message);
      setLoader(false);
    }
  };
  const searchData = text => {
    setSearchQuery(text);
    const data = [...audioList];

    if (text.length >= 3) {
      const results = data.filter(item =>
        item?.filename.toLowerCase().includes(text.toLowerCase()),
      );
      setAudioList(results);
    } else {
      setAudioList(audioArray);
    }
  };

  const goToNext = selectedata => {
    if (!selectedata?.audio) {
      HelperFunctions.showToastMsg('Please choose audio to proceed!');
      return;
    }else{
    NavigationService.navigate('Publication02', {selectedata: selectedata});
    }
  };

  return (
    <ScreenLayout
      headerStyle={{backgroundColor: 'rgba(27, 27, 27, 0.96);'}}
      showLoading={loadingState}
      isScrollable={true}
      leftHeading={t('New Publication')}
      // viewStyle={{backgroundColor:'transparent'}}
      right
      // onRightTextPress={() => setModalVisible(true)}
      onRightTextPress={() => goToNext(selectedata)}
      // Live={cat == 'Live' ? true : false}
      leftHeadingStyle={{color: '#E1D01E'}}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}>
      <View style={styles.container}>
        <View style={{height: height / 1.5, bottom: 80}}>
          <Image
            source={{uri: croppedImage?.uri}}
            style={{
              height: height / 1.2,
              width: width,
              // borderRadius: 15,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
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
                <Pressable onPress={() => openAudeoList(index)}>
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
                </Pressable>
              </View>
            );
          }}
        />
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
              position: 'absolute',
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
            <View>
              <AppTextInput
                // value={password}
                onChangeText={text => searchData(text)}
                value={searchQuery}
                onSubmitEditing={searchData}
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
                inputContainerStyle={styles.input_container_sty}
                style={styles.text_style}
              />
              <KeyboardAwareScrollView>
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
                {audioList?.length > 0 &&
                  audioList?.map((res, ind) => {
                    return (
                      <View
                        key={ind}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // justifyContent:'space-between',
                          marginTop: 10,
                        }}>
                        {/* <Audio
                      source={imageUrl+res?.fileurl}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 45,
                      }}
                      resizeMode="contain"
                    /> */}
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
                              {res?.filename}
                            </Text>
                            <Text
                              style={{
                                color: 'rgba(255, 255, 255, 0.54)',
                                fontSize: 14,
                                fontFamily: Theme.FontFamily.light,
                                marginTop: 3,
                              }}>
                              {formatDate(res?.created_at)}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => {
                              selectAudioFunc(res, ind);
                            }}>
                            <Icon
                              name={audioIndex == ind ? 'minus' : 'plus'}
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
            </View>
          ) : (
            <>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                {/* <AppTextInput
                  value={password}
                  onChangeText={a => setPassword(a)}
                  placeholder="Search"
                  placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
                  inputStyle={{ fontSize: 14 }}
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
                 
                  inputContainerStyle={styles.input_container_sty}
                  style={styles.text_style}
                /> */}
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
                {/* <Pressable
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
                </Pressable> */}
                {/* <View style={styles.upload}>
              {audio && (
                <Text
                  style={{
                    ...styles.upload_text,
                    width: 100,
                    overflow: 'hidden',
                    marginRight: 10,
                  }}>
                  {audio.name}
                </Text>
              )}
              {!audio && (
                <Text style={styles.upload_text}> Upload Audio File</Text>
              )}
              <Pressable
                style={styles.upload_btn}
                onPress={async () => await uploadFileOnPressHandler()}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#fff',
                  }}>
                  Upload
                </Text>
              </Pressable>
            </View> */}
                <AppTextInput
                  value={audio?.name}
                  editable={false}
                  placeholder="Select an audio"
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
                  rightAction={
                    <Pressable onPress={() => uploadFileOnPressHandler()}>
                      <LinkIcon />
                    </Pressable>
                  }
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
                  fileSubmit();
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
  upload: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  upload_text: {
    fontFamily: Theme.FontFamily.normal,
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  upload_btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
