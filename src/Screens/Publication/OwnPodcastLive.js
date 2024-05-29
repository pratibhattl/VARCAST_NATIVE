import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import NavigationService from '../../Services/Navigation';
import {useRoute} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import CustomHeader from '../../Components/Header/CustomHeader';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import ClockCircleIcon from '../../assets/icons/ClockCircleIcon';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import DownArrowIcon from '../../assets/icons/DownArrowIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DoubleTick from '../../assets/icons/DoubleTick';
import SendIcon from '../../assets/icons/SendIcon';
import LinkIcon from '../../assets/icons/LinkIcon';
import GitftIcon from '../../assets/icons/GiftIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import CrossIcon from '../../assets/icons/CrossIcon';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  ChannelMediaOptions,
  AudienceLatencyLevelType,
} from 'react-native-agora';
import HelperFunctions from '../../Constants/HelperFunctions';
import AgoraUIKit from 'agora-rn-uikit';
import ReactNativeModal from 'react-native-modal';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

const {width, height} = Dimensions.get('screen');

const OwnPodcastLive = props => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [loadingState, changeloadingState] = useState(false);
  const [messages, setMessages] = useState('');
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [videoCall, setVideoCall] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const connectionData = {
    appId: 'ee6f53e15f78432fb6863f9baddd9bb3',
    channel: 'test',
    token:
      '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T',
  };
  const appId = 'ee6f53e15f78432fb6863f9baddd9bb3';
  const channelName = 'test';
  const token =
    '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T';
  const uid = 0;
  function showMessage(msg) {
    setMessage(msg);
  }
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  const getPermissionIos = async () => {
    if (Platform.OS === 'ios') {
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.MICROPHONE,
      ]).then(statuses => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
      });
    }
  };
  useEffect(() => {
    // Initialize Agora engine when the app starts
    //   setupVideoSDKEngine(appId,channelName);
    //   setTimeout(()=>{
    //       if(props?.route?.params?.host){
    //           joinHost(channelName,token)
    //       }
    //       else{
    //           joinAudience(channelName,token)
    //       }
    //   },300)
    //   return ()=>{
    //       leave()
    //   }
  }, []);
  const callbacks = {
    EndCall: () => {
      setTimeout(() => {
        setVideoCall(false);

        NavigationService.back();
      }, 100);
    },
  };
  const setupVideoSDKEngine = async (idd, channel) => {
    try {
      // use the helper function to get permissions
      //   if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          console.log('user 5845');

          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          console.log('user join');
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('user left');
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
        // onLocalAudioStateChanged: (_connection,state,error) =>{
        //     console.log('mutermcicc',state)
        // }
      });
      // console.log('khgjhghjghjggjh',idd)
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };
  const joinAudience = async (channel, tok) => {
    const agoraEngine = agoraEngineRef.current;
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      //  console.log('dfdfrewtrtertetyty',agoraEngine.getHost());
      // Use low level latency
      var channeloptions = new ChannelMediaOptions();
      // channeloptions.audienceLatencyLevel =
      // AudienceLatencyLevelType.AudienceLatencyLevelLowLatency;
      agoraEngine.updateChannelMediaOptions(channeloptions);
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      HelperFunctions.showToastMsg('Joined Successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const joinHost = async (channel, tok) => {
    const agoraEngine = agoraEngineRef.current;
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );

      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      HelperFunctions.showToastMsg('Joined Successfully');
    } catch (e) {
      console.log(e);
    }
  };
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      HelperFunctions.showToastMsg('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };
  const SwitchCamera = () => {
    try {
      agoraEngineRef.current?.switchCamera();
    } catch (e) {
      console.log(e);
    }
  };
  const MuteMic = () => {
    try {
      // enableAudio
      if (isHostMic) {
        agoraEngineRef.current?.muteLocalAudioStream(true);
        setIsHosMic(false);
      } else {
        agoraEngineRef.current?.muteLocalAudioStream(false);
        setIsHosMic(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      getPermission();
    }
    if (Platform.OS === 'ios') {
      getPermissionIos();
    }
  }, []);

  const [allData, setAllData] = useState([
    {
      title: 'Allian Buttlar',
      date: 'typing...',
      time: '19:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Augustas Walter',
      date: 'Hey, I’m good what about you?',
      time: '19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'William Jhonson',
      date: 'By pioneering reusable rockets, SpaceX is pursuing the long-term goal,Is your team hiring? Cause I"d be a great fit.',
      time: ' 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'David Willy',
      date: 'By pioneering reusable rockets, SpaceX is pursuing the long-term goal',
      time: ' 19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Steve Smith',
      date: 'Is your team hiring? Cause I"d be a great fit.',
      time: ' 19:45',
      image: require('../../assets/images/image150.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Virat Kohli',
      date: 'Is your team hiring? Cause I"d be a great fit.',
      time: ' 19:32',
      image: require('../../assets/images/image151.png'),
      details: 'Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
    {
      title: 'Van der dedassun',
      date: '23 Sep ',
      time: ' 14:45',
      image: require('../../assets/images/image3.png'),
      details: 'My mission is my happiness',
      hostedby: 'Hosted by: Kevin Hart',
      price: '- $ 120',
    },
    {
      title: 'Video Watched',
      date: "Is your team hiring? Cause I'd be a great fit.",
      time: '19:45',
      image: require('../../assets/images/image153.png'),
      details: 'Pitbull by Gold Minds with Kevin Hart',
      hostedby: 'Hosted by: Kevin Hart',
    },
  ]);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'light-content'}
        translucent={true}
      />
      {/* <Image
            source={{uri:'https://podcastabundance.com/wp-content/uploads/2022/02/Untitled-design.jpg'}}
           style={{
            height:height/2,
            width:width
           }}

            />
              <Image
            source={{uri:'https://imageio.forbes.com/specials-images/imageserve/644b28a8b5e31432600d1575/5-ways-entrepreneurs-can-still-win-the-podcast-game/960x0.jpg?format=jpg&width=960'}}
           style={{
            height:height/2,
            width:width
           }}

            /> */}
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={callbacks}
          styleProps={styleprop}
        />
      ) : (
        <Text onPress={() => setVideoCall(true)}>Start Call</Text>
      )}
      {/* <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', width: width, alignItems: 'center', paddingHorizontal: 5,
                    // paddingTop: height/15,
                    position:'absolute',
                    top:20

                }}>

                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            height: 40,
                            // width: 140,
                            marginVertical: 25,
                            marginHorizontal: 15,

                            backgroundColor: 'rgba(28, 28, 28, 0.4)',
                            borderRadius: 10,
                            alignItems: 'center',
                            // justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingHorizontal: 2,
                            maxWidth:width/1.5
                        }}
                    >
                        <View style={{
                            height: 38,
                            width: 38,
                            borderRadius: 10,
                            backgroundColor: 'red',
                           
                           
                        }}>
                            <Image
                                source={require('../../assets/images/image97.png')}
                                style={{
                                    height: 38,
                                    width: 38,
                                    borderRadius: 10,
                                    marginRight: 10

                                }}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontFamily: Theme.FontFamily.normal,
                                }}>
                                An interview with Daisy
                            </Text>
                            <Text
                                style={{
                                    color: 'rgba(255, 255, 255, 0.84)',
                                    fontSize: 13,
                                    fontFamily: Theme.FontFamily.light,
                                    // textAlign: 'center',
                                    marginTop: 1

                                }}>
                                32,217 views
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => NavigationService.back()}
                        style={{
                            height: 38,
                            width: 38,
                            marginVertical: 25,
                            marginHorizontal: 15,

                            backgroundColor: 'rgba(28, 28, 28, 0.3)',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 2,
                            borderColor: 'white',
                            borderStyle: 'dashed',
                            borderWidth: 0.9,
                        }}
                    >
                        <CrossIcon />
                    </TouchableOpacity>
                </View> */}

      <View
        style={{
          // flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 48,
          // left:0,
          right: 15,
          // paddingHorizontal:20,
          // paddingVertical:10,
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.76)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <GitftIcon />
        </Pressable>
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.76)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <ShareIcon />
        </Pressable>
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.76)',
            alignItems: 'center',
            justifyContent: 'center',
            // marginBottom:10
          }}>
          <RedHeartIcon />
        </Pressable>
      </View>
      <ReactNativeModal
        isVisible={isModalVisible}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.4}
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
            height: height / 2,
            backgroundColor: 'rgba(0,0,0,0.0)',
            borderRadius: 20,

            paddingTop: 10,
            // justifyContent:'center',
            // paddingHorizontal: 10,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            // style={{position:'absolute',bottom:10,width:width,height:height/2}}
          >
            {allData.map((res, ind) => {
              console.log('resPodcast', res);
              return (
                <Pressable
                  key={ind}
                  // onPress={()=>NavigationService.navigate('ChatIndex')}
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent:'space-between',
                    marginTop: 15,
                    paddingLeft: 20,
                    paddingRight: 15,
                  }}>
                  <Pressable>
                    <Image
                      source={res?.image}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 45,
                        borderWidth: 0.7,
                        borderColor: 'white',
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
                      borderBottomWidth: 0,
                      paddingBottom: 10,
                      // marginTop:5
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.medium,
                        }}>
                        {res.title}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.84)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.normal,
                          marginTop: 3,
                        }}>
                        {res.date}{' '}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              style={[styles.input, {minHeight: 40, maxHeight: 100}]}
              placeholder="Message..."
              value={messages}
              onChangeText={setMessages}
              placeholderTextColor={Theme.colors.white}
            />

            <TouchableOpacity
              // disabled={message.trim().length==0}
              style={[
                styles.sendButton,
                {
                  backgroundColor: 'transparent',
                  // message.trim().length==0?Theme.colors.grey:Theme.colors.primary
                },
              ]}>
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default OwnPodcastLive;
const styleprop = {
  BtnTemplateStyles: {
    width: 45,
    height: 45,
    borderRadius: 17,
    // position:'absolute',
    borderColor: '#007aff',
    borderWidth: 4,
    backgroundColor: '#111',
    // bottom:height/1.25
  },
  BtnTemplateContainer: {
    marginHorizontal: -width / 8,
    //    paddingHorizontal:-10
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    // height: height
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    paddingVertical: 10,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '90%',
    padding: 10,
    position: 'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 30,
    // marginTop:30
  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    color: Theme.colors.white,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

{
  /* <ScreenLayout
headerStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.96);' }}
showLoading={loadingState}
isScrollable={true}
leftHeading={'Podcast Details'}
// Podcast
// right
Watch
// Live={cat == 'Live' ? true : false}
leftHeadingStyle={{ color: '#E1D01E' }}
hideLeftIcon={customProp ? false : true}
onLeftIconPress={() => NavigationService.back()}> 
 <Pressable style={{
                    position: 'absolute',
                    bottom: -25,
                    right: 10,
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <VideoPlayIcon Width={30} Height={30} />
                </Pressable>
*/
}
