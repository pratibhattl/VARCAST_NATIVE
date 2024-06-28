/* eslint-disable prettier/prettier */
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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
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
import ReactNativeModal from 'react-native-modal';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import SadEmojiIcon from '../../assets/icons/SadEmojiIcon';
import ReportIcon from '../../assets/icons/ReportIcon';
import ShiledIcon from '../../assets/icons/ShiledIcon';
import Notification from '../../assets/icons/Notification';
import BulbIcon from '../../assets/icons/Bulb';
import BoeIcon from '../../assets/icons/BoeIcon';
import BlastIcon from '../../assets/icons/BlastIcon';
import RoseIcon from '../../assets/icons/RoseIcon';
import BatchIcon from '../../assets/icons/BatchIcon';
import RocketIcon from '../../assets/icons/RocketIcon';
import DiamondIcon from '../../assets/icons/DiamondIcon';
import CrownIcon from '../../assets/icons/CrownIcon';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import {useIsFocused} from '@react-navigation/native';
import DislikeIcon from '../../assets/icons/DislikeIcon';
import {setUserDetails} from '../../Store/Reducers/AuthReducer';
import axios from 'axios';
import AllSourcePath from '../../Constants/PathConfig';
import CommentIcon from '../../assets/icons/CommentIcon';
// import {toast} from 'react-toastify';
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
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import {err} from 'react-native-svg/lib/typescript/xml';

const {width, height} = Dimensions.get('screen');

const LiveDetails = props => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const baseUrl = AllSourcePath?.API_BASE_URL_DEV;
  let id = route.params?.id;
  const user = useSelector(state => state.authData);
  const [likeStatus, setLikeStatus] = useState(false);
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [mapComment, setMapcomment] = useState([]);
  // console.log('Comment', mapComment);
  const [ModalState, setModalState] = useState(false);
  const [GiftModalState, setGiftModalState] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [isLiked, setIsLiked] = useState(false); // State to track if the podcast is liked
  const [GiftData, setGiftData] = useState([
    {gift: <BulbIcon />},
    {gift: <BoeIcon />},
    {gift: <BlastIcon />},
    {gift: <RoseIcon />},
    {gift: <BatchIcon />},
    {gift: <RocketIcon />},
    {gift: <DiamondIcon />},
    {gift: <CrownIcon />},
    // {gift:<BulbIcon/>},
  ]);

  const [newComments, setNewComments] = useState([]);
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHos] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [messagee, setMessagee] = useState(''); // Message to the user
  const [podcasts, setPodcasts] = useState([]);

  const appId = 'ee6f53e15f78432fb6863f9baddd9bb3';
  const channelName = 'test';
  // const user.token =
  //   '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T';
  const uid = 0;
  function showMessage(msg) {
    setMessage(msg);
  }
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
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
    setupAudioSDKEngine(appId, channelName);
    setTimeout(() => {
      if (props?.route?.params?.host) {
        joinHost(channelName, user.token);
      } else {
        joinAudience(channelName, user.token);
      }
    }, 300);
    return () => {
      leave();
    };
  }, []);

  const fetchCommentData = async () => {
    const formData = new FormData();
    formData.append('liveId', id);
    axios
      .post(`${baseUrl}lives/details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(response => {
        if (response?.data.status === true) {
          // Extract and map comments from each live item
          const mappedData =
            response?.data?.data && response?.data?.data?.latestComments;
          const like = response?.data?.data?.isLiked == true ? true : false;
          setSelectedData(response?.data?.data);
          setLikeStatus(like);
          setMapcomment(mappedData);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchCommentData();
    }
  }, [isFocused]);

  const setupAudioSDKEngine = async (idd, channel) => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      if (Platform.OS === 'ios') {
        await getPermissionIos();
      }

      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: (_connection, Uid) => {
          HelperFunctions.showToastMsg(
            'Successfully joined the channel ' + channelName,
          );
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          HelperFunctions.showToastMsg('Remote user joined with uid ' + Uid);

          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          HelperFunctions.showToastMsg(
            'Remote user left the channel. uid: ' + Uid,
          );
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      //  agoraEngineRef.current?.setEnableSpeakerphone(true);
      // await agoraEngineRef.current?.adjustPlaybackSignalVolume(100)
      // agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };
  const joinAudience = async (channel, tok) => {
    const agoraEngine = agoraEngineRef.current;

    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );

      // Use low level latency
      var channeloptions = new ChannelMediaOptions();
      // channeloptions.audienceLatencyLevel =
      // AudienceLatencyLevelType.AudienceLatencyLevelLowLatency;
      agoraEngine.updateChannelMediaOptions(channeloptions);
      agoraEngineRef.current?.joinChannel(user.token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleAudience,
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
      agoraEngineRef.current?.joinChannel(user.token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      HelperFunctions.showToastMsg('Joined Successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const leave = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      HelperFunctions.showToastMsg('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle the press event of the heart icon
  const handleLikePress = () => {
    // console.log('Heart icon pressed');
    const liveId = id;
    // console.log('Hart', podcastId);
    if (!liveId) {
      console.error('Podcast ID is missing');
      return;
    }

    const payload = {
      liveId: liveId,
    };

    apiCall('lives/like', 'POST', payload, user.token)
      .then(response => {
        console.log('Message', response.message);
        if (response.message === 'Liked') {
          console.log('Live liked successfully');
          setLikeStatus(true);
          HelperFunctions.showToastMsg('Live Session liked');
        } else {
          console.log('Live disliked successfully');
          setLikeStatus(false);
          HelperFunctions.showToastMsg('Live Session Disliked');
        }
      })
      .catch(error => {
        console.error('Error while liking the podcast:', error);
      });
  };

  // Function to handle the Comment

  const sendComment = async () => {
    const liveId = id;
    if (!liveId) {
      console.error('Podcast ID is missing');
      return;
    }
    const payload = {
      liveId: liveId,
      comment: comment,
    };

    const newComment = {
      comment,
      name: user.userDetails.name,
      id: user.userDetails._id,
      avatar: user.userDetails.full_path_image,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
    try {
      apiCall('lives/comment', 'POST', payload, user.token)
        .then(res => {
          if (res) {
            fetchCommentData();

            Keyboard.dismiss();
            setComment('');
          }
        })
        .catch(err => {});

      // Post comments to firebase

      await firestore()
        .collection('live')
        .doc(id)
        .collection('comments')
        .add(newComment);

      // setNewComments(prev => [...prev, newComment]);
    } catch (error) {
      console.error('Error while sending comment :', error);
    }
  };

  //-----------------------------------------------------------------------------------------------------------//

  /*** Get comments from firebase ***/

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('live')
      .doc(id)
      .collection('comments')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const allComments = snapshot.docs.map(item => {
          return {id: item.id, ...item._data};
        });

        setNewComments(allComments);
      });

    return () => unsubscribe();
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'light-content'}
        translucent={true}
      />

      <ImageBackground
        source={require('../../assets/images/MaskPodcastLive.png')}
        style={{
          width: width,
          height: height / 2,
          backgroundColor: 'rgba(0,0,0,0.999999999)',
          // paddingTop: 45,
          alignItems: 'center',
          shadowColor: '#131313',
          shadowOffset: {width: 0, height: 35},
          shadowOpacity: 0.6,
          // shadowRadius: 2,
          elevation: 20,
          zIndex: 9999,
          // position:'absolute',
          // top: 0,
        }}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(0, 0, 0, 0.35)', '#131313']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          // useAngle={true} angle={-290}
          // angleCenter={{ x: 0.5, y: 0.5 }}
          style={{
            flex: 1,
            paddingTop: 40,

            //   paddingBottom:20
          }}>
          {
            // console.log('agoraEngineRef.current?.adjustPlaybackSignalVolume(volume);',agoraEngineRef.current?.adjustPlaybackSignalVolume())
          }
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width,
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                height: 40,
                width: 140,
                marginVertical: 25,
                marginHorizontal: 15,

                // backgroundColor: 'rgba(28, 28, 28, 0.54)',
                borderRadius: 10,
                alignItems: 'center',
                // justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 2,
              }}>
              <View
                style={{
                  height: 38,
                  width: 38,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <Image
                  source={{uri: selectedData?.imageUrl}}
                  style={{
                    height: 38,
                    width: 38,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.normal,
                  }}>
                  {selectedData?.user?.name}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 13,
                    fontFamily: Theme.FontFamily.light,
                    textAlign: 'center',
                    marginTop: 1,
                  }}>
                  {selectedData.countView} views
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                leave();
                NavigationService.back();
              }}
              style={{
                height: 38,
                width: 38,
                marginVertical: 25,
                marginHorizontal: 15,

                backgroundColor: 'rgba(28, 28, 28, 0.2)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 2,
                borderColor: 'white',
                borderStyle: 'dashed',
                borderWidth: 0.8,
              }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              shadowColor: '#131313',
              // shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.7,
              // shadowRadius: 2,
              elevation: 20,
            }}>
            <View
              style={{
                borderRadius: 20,
                height: 140,
                width: 140,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: selectedData?.imageUrl}}
                style={{
                  height: 140,
                  width: 140,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
          <View
            style={{
              paddingTop: 5,
              alignItems: 'center',
              flex: 1,
              // height:70,
              // backgroundColor:'rgba(0,0,0,0.05)',
              width: width,
              marginTop: 10,
              // borderRadius:15,
              shadowColor: '#131313',
              // shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.7,
              // shadowRadius: 2,
              elevation: 20,
            }}>
            <>
              <View
                style={{
                  height: 25,
                  width: 44,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#2648D1',
                    fontSize: 13,
                    fontFamily: Theme.FontFamily.medium,
                    // fontWeight:'400',
                    //   marginLeft: 5,
                  }}>
                  LIVE
                </Text>
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: Theme.FontFamily.semiBold,
                  marginTop: 10,
                  // fontWeight:'600',
                }}>
                {selectedData.title}
              </Text>
              {/* <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.normal,
                  // fontWeight:'400',
                  marginTop: 5,
                }}>
                {selectedData.hosted_by}
              </Text> */}
            </>
          </View>
        </LinearGradient>
      </ImageBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {newComments?.map((comment, index) => (
          <Pressable
            key={index}
            onPress={() =>
              NavigationService.navigate('ChatRoom', {
                id: comment?.id,
                title: comment?.name,
                image: comment?.avatar,
              })
            }
            style={{
              flexDirection: 'row',
              marginTop: 15,
              paddingLeft: 20,
              paddingRight: 15,
            }}>
            <Pressable>
              <Image
                source={{uri: comment?.avatar}}
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
              }}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.medium,
                  }}>
                  {comment.comment}
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontSize: 14,
                    fontFamily: Theme.FontFamily.light,
                    marginTop: 3,
                  }}>
                  {comment.name}{' '}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </KeyboardAwareScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container2}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={[styles.input, {minHeight: 40, maxHeight: 100}]}
            placeholder="Message..."
            value={comment}
            onChangeText={setComment}
            placeholderTextColor={Theme.colors.grey}
          />

          <TouchableOpacity
            // disabled={message.trim().length==0}
            style={[
              styles.sendButton,
              {
                backgroundColor: 'transparent',
                // message.trim().length==0?Theme.colors.grey:Theme.colors.primary
              },
            ]}
            onPress={() => {
              sendComment();
            }}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View
        style={{
          // flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 30,
          // left:0,
          right: 20,
          // paddingHorizontal:20,
          // paddingVertical:10,
        }}>
        {mapComment?.length > 0 && (
          <Pressable
            onPress={() =>
              NavigationService.navigate('PodcastComment', {mapComment})
            }
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: 'rgba(27, 27, 27, 0.96)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
            }}>
            <CommentIcon />
            {/* <Image source={require('../../assets/images/chat-bubble.png')} style={{objectFit:'contain'}}/> */}
          </Pressable>
        )}
        <Pressable
          onPress={() => setModalState(true)}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.96)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <ShareIcon />
        </Pressable>
        <Pressable
          onPress={handleLikePress}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            // marginBottom:10
          }}>
          {likeStatus === true ? <RedHeartIcon /> : <DislikeIcon />}
        </Pressable>
      </View>
      <ReactNativeModal
        isVisible={ModalState}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.8}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => {
          //   setPlay(false)
          setModalState(false);
        }}
        onBackdropPress={() => {
          //   setPlay(false)
          setModalState(false);
        }}>
        <View
          style={{
            width: '100%',
            height: height / 2.5,
            backgroundColor: '#1C1C1C',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // alignItems: 'center',
            // padding: 20,
            paddingHorizontal: 25,
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
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <BookmarkIcon />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 15,
                // marginTop:5,
              }}>
              Save this Video for Later
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <ShareIcon />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 15,
                // marginTop:10,
              }}>
              Share with People
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <SadEmojiIcon />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 15,
                // marginTop:10,
              }}>
              Not Intrested
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1.5,
              backgroundColor: 'rgba(118, 118, 128, 0.34)',
              marginTop: 25,
            }}
          />
          {/* <View style={{flexDirection:'row',alignItems:'center',
                  marginTop:20,
            
            }}>
                <ReportIcon Color = {'#fff'}/>
                <Text
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.normal,
                  marginLeft:15,
                  // marginTop:10,
                }}>
              Report
              </Text>
              </View> */}
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
            <ShiledIcon Color={'#fff'} />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 15,
                // marginTop:10,
              }}>
              Unfollow Oseidon Draw
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Notification Color={'#fff'} />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 5,
                // marginTop:10,
              }}>
              Turn Off Live Notifications
            </Text>
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={GiftModalState}
        // backdropColor={'rgba(228, 14, 104, 1)'}
        backdropOpacity={0.8}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        // animationIn={'zoomInDown'}
        // animationOut={'zoomOut'}
        onBackButtonPress={() => {
          //   setPlay(false)
          setGiftModalState(false);
        }}
        onBackdropPress={() => {
          //   setPlay(false)
          setGiftModalState(false);
        }}>
        <View
          style={{
            width: '100%',
            height: height / 2.7,
            backgroundColor: '#1C1C1C',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // alignItems: 'center',
            // padding: 20,
            paddingHorizontal: 25,
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
              marginBottom: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: Theme.FontFamily.medium,
                // marginLeft:15,
              }}>
              Send Gifts
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent:'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../../assets/images/Coin(1).png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: Theme.FontFamily.medium,
                  marginLeft: 5,
                  // marginLeft:15,
                }}>
                10 Coins
              </Text>
            </View>
          </View>
          <FlatList
            data={GiftData}
            numColumns={4}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}
            // horizontal
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 43,
                    height: 60,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginVertical: 5,
                    marginBottom: 20,
                  }}>
                  {item.gift}
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      marginTop: 5,
                    }}>
                    12
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default LiveDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    height: height,
  },
  container2: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    paddingVertical: 10,
    height: 50,
    backgroundColor: 'rgba(27, 27, 27, 0.96)',
    width: '75%',
    padding: 10,
    // position:'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 30,
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
