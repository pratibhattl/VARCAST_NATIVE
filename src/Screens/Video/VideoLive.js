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
  ScrollView,
  Keyboard,
  Switch,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import ReactNativeModal from 'react-native-modal';
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
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import GitftIcon from '../../assets/icons/GiftIcon';
import SadEmojiIcon from '../../assets/icons/SadEmojiIcon';
import ShiledIcon from '../../assets/icons/ShiledIcon';
import Notification from '../../assets/icons/Notification';
import ShareIcon from '../../assets/icons/ShareIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import DislikeIcon from '../../assets/icons/DislikeIcon';
import CrossIcon from '../../assets/icons/CrossIcon';
import {PermissionsAndroid, Platform} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  ChannelMediaOptions,
  AudienceLatencyLevelType,
} from 'react-native-agora';
import LiveEditIcon from '../../assets/icons/LiveEditIcon';
import LiveIcon from '../../assets/icons/LiveIcon';
import EyeOpen from '../../assets/icons/EyeOpen';
import HelperFunctions from '../../Constants/HelperFunctions';
import MicroPhoneIcon from '../../assets/icons/MicrophoneIcon';
import PauseIcon from '../../assets/icons/PauseIcon';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {apiCall} from '../../Services/Service';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AllSourcePath from '../../Constants/PathConfig';
import CommentIcon from '../../assets/icons/CommentIcon';
const {width, height} = Dimensions.get('screen');

const VideoLive = props => {
  const route = useRoute();
  const baseUrl = AllSourcePath?.API_BASE_URL_DEV;
  const imageURL = AllSourcePath?.IMAGE_BASE_URL;
  let id = route.params?.id;
  const isFocused = useIsFocused();
  const [playlists, setPlaylists] = useState([]);
  const token = useSelector(state => state.authData.token);
  const [likeStatus, setLikeStatus] = useState(false);
  const {width, height} = Dimensions.get('window');
  const [selectedData, setSelectedData] = useState({});
  console.log('Seleceted Video Data', selectedData);
  const [ModalState, setModalState] = useState(false);
  const [paused, setPaused] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [messages, setMessages] = useState('');
  const [mapComment, setMapcomment] = useState([]);
  const [comment, setComment] = useState('');
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHostMic, setIsHosMic] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const appId = 'ee6f53e15f78432fb6863f9baddd9bb3';
  const channelName = 'test';
  // const token =
  //   '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T';
  // const uid = 0;
  // function showMessage(msg) {
  //   setMessage(msg);
  // }
  // const getPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     ]);
  //   }
  // };
  // const getPermissionIos = async () => {
  //   if (Platform.OS === 'ios') {
  //     requestMultiple([
  //       PERMISSIONS.IOS.CAMERA,
  //       PERMISSIONS.IOS.MICROPHONE,
  //     ]).then(statuses => {
  //       console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
  //       console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
  //     });
  //   }
  // };

  const [isPlaying, setIsPlaying] = useState(false);




 const togglePlayPause = () => {
    setPaused(!paused);
  };

  const onVideoPress = () => {
    setShowControls(!showControls);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchPlaylists = async () => {
    try {
      changeloadingState(true);
      const endpoint = 'playlist/index';
      const response = await apiCall(endpoint, 'GET', {}, token);
      setPlaylists(response.data.listData);
      console.log('RawRes', response);
      changeloadingState(false);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      changeloadingState(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  const handlePlaylistClick = async playlistId => {
    try {
      const endpoint = 'playlist/add_media';
      console.log('Podcast Data', selectedData);
      const mediaUrl = selectedData.image;
      const image = selectedData.image;
      const title = selectedData.title;
      const overview = selectedData.description;
      const updated_at = selectedData.updated_at;
      const created_at = selectedData.created_at;

      const data = {
        playlistId,
        mediaUrl,
        title,
        overview,
        updated_at,
        created_at,
      }; // The data to be sent in the POST request
      console.log('Sent Podcast Data ', data);
      const response = await apiCall(endpoint, 'POST', data, token);
      console.log('API Response:', response.status);
      if (response.status === true) {
        HelperFunctions.showToastMsg('Media added to playlist successfully!');
        fetchPlaylists();
        setTimeout(() => {
          toggleModal();
        }, 2000);
      } else {
        HelperFunctions.showToastMsg(
          'This media already exists in the playlist.',
        );
      }
      // Handle the response as needed
    } catch (error) {
      // HelperFunctions.showToastMsg(
      //   'This media already exists in the playlist.',
      // );
      console.error('Error making API call:', error);
    }
  };

  useEffect(() => {
    // Initialize Agora engine when the app starts

    return () => {
      leave();
    };
  }, []);

  // const setupVideoSDKEngine = async (idd, channel) => {
  //   try {
  //     // use the helper function to get permissions
  //     if (Platform.OS === 'android') {
  //       await getPermission();
  //     }
  //     if (Platform.OS === 'ios') {
  //       await getPermissionIos();
  //     }
  //     agoraEngineRef.current = createAgoraRtcEngine();
  //     const agoraEngine = agoraEngineRef.current;
  //     agoraEngine.registerEventHandler({
  //       onJoinChannelSuccess: (_connection, Uid) => {
  //         HelperFunctions.showToastMsg(
  //           'Successfully joined the channel ' + channelName,
  //         );
  //         console.log('Host ID?dd>>>>>>>>', Uid, _connection.localUid);

  //         setIsJoined(true);
  //       },
  //       onUserJoined: (_connection, Uid) => {
  //         HelperFunctions.showToastMsg('Remote user joined with uid ' + Uid);
  //         console.log('user joined');
  //         console.log('user IDsdsd?>>>>>>>>', Uid);
  //         setRemoteUid(Uid);
  //       },
  //       onUserOffline: (_connection, Uid) => {
  //         console.log('user left');
  //         console.log('user ID offline?>>>>>>>>', Uid, _connection.localUid);
  //         HelperFunctions.showToastMsg(
  //           'Remote user left the channel. uid: ' + Uid,
  //         );
  //         setRemoteUid(0);
  //       },
  //       // onLocalAudioStateChanged: (_connection,state,error) =>{
  //       //     console.log('mutermcicc',state)
  //       // }
  //     });
  //     // console.log('khgjhghjghjggjh',idd)
  //     agoraEngine.initialize({
  //       appId: appId,
  //       channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
  //     });
  //     agoraEngine.enableVideo();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const joinAudience = async (channel, tok) => {
  //   const agoraEngine = agoraEngineRef.current;
  //   if (isJoined) {
  //     return;
  //   }
  //   try {
  //     agoraEngineRef.current?.setChannelProfile(
  //       ChannelProfileType.ChannelProfileLiveBroadcasting,
  //     );
  //     //  console.log('dfdfrewtrtertetyty',agoraEngine.getHost());
  //     // Use low level latency
  //     var channeloptions = new ChannelMediaOptions();
  //     // channeloptions.audienceLatencyLevel =
  //     // AudienceLatencyLevelType.AudienceLatencyLevelLowLatency;
  //     agoraEngine.updateChannelMediaOptions(channeloptions);
  //     agoraEngineRef.current?.joinChannel(token, channelName, uid, {
  //       clientRoleType: ClientRoleType.ClientRoleAudience,
  //     });
  //     HelperFunctions.showToastMsg('Joined Successfully');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const joinHost = async (channel, tok) => {
  //   const agoraEngine = agoraEngineRef.current;
  //   if (isJoined) {
  //     return;
  //   }
  //   try {
  //     agoraEngineRef.current?.setChannelProfile(
  //       ChannelProfileType.ChannelProfileLiveBroadcasting,
  //     );

  //     agoraEngineRef.current?.startPreview();
  //     agoraEngineRef.current?.joinChannel(token, channelName, uid, {
  //       clientRoleType: ClientRoleType.ClientRoleBroadcaster,
  //     });
  //     HelperFunctions.showToastMsg('Joined Successfully');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const leave = () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
  // const SwitchCamera = () => {
  //   try {
  //     agoraEngineRef.current?.switchCamera();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const MuteMic = () => {
  //   try {
  //     // enableAudio
  //     if (isHostMic) {
  //       agoraEngineRef.current?.muteLocalAudioStream(true);
  //       setIsHosMic(false);
  //     } else {
  //       agoraEngineRef.current?.muteLocalAudioStream(false);
  //       setIsHosMic(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const fetchCommentData = async () => {
    const formData = new FormData();
    formData.append('videoId', id);
    axios
      .post(`${baseUrl}videos/details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('RESPONSE', response?.data?.data);
        if (response?.data.status === true) {
          // Extract and map comments from each live item
          const mappedData =
            response?.data?.data &&
            response?.data?.data?.latestComments?.length > 0 &&
            response?.data?.data?.latestComments;
          const like = response?.data?.data?.isLiked == true ? true : false;
          setSelectedData(response?.data?.data);
          setLikeStatus(like);
          setMapcomment(mappedData);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching Live comments:', error);
      });
  };
  useEffect(() => {
    if (isFocused) {
      fetchCommentData();
    }
  }, [isFocused]);
  const handleLikePress = () => {
    // console.log('Heart icon pressed');
    const videoId = id;
    // console.log('Hart', podcastId);
    if (!videoId) {
      console.error('Podcast ID is missing');
      return;
    }

    const payload = {
      videoId: videoId,
    };
    console.log('PayLoad', payload);

    apiCall('videos/like', 'POST', payload, token)
      .then(response => {
        console.log('Message', response.message);
        if (response.message === 'Liked') {
          setLikeStatus(true);
          console.log('Video liked successfully');
          HelperFunctions.showToastMsg('Video liked');
        } else {
          setLikeStatus(false);
          console.log('Video disliked successfully');
          HelperFunctions.showToastMsg('Video Disliked');
        }
      })
      .catch(error => {
        console.error('Error while liking the Video:', error);
      });
  };

  // Function to handle the Comment
  const sendComment = () => {
    const videoId = id;
    if (!videoId) {
      console.error('Podcast ID is missing');
      return;
    }
    const payload = {
      videoId: videoId,
      comment: comment,
    };
    console.log('PayLoad', payload);
    apiCall('videos/comment', 'POST', payload, token)
      .then(res => {
        if (res) {
          Keyboard.dismiss();
          fetchCommentData();
          setComment('');
        }
      })
      .catch(err => {});
  };

  // ------------------------------------------------------------------------------------------------//
  const renderPlaylistModal = () => {
    return (
      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={1}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={playlists}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20, paddingTop: 0}}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              const mediaCount = item.media ? item.media.length : 0;
              return (
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.3)',
                    '#f4c5c5',
                    'rgba(255, 255, 255, 0.3)',
                    'rgba(255, 255, 255, 0.15)',
                    'rgba(255, 255, 255, 0.100)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 0.4, y: 0}}
                  style={styles.playlistItem}>
                  <Pressable
                    onPress={() => handlePlaylistClick(item._id)}
                    // onPress={() =>
                    //   // NavigationService.navigate('WatchLater', {playlist: item})
                    // }
                    style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 3}}>
                      <Image
                        source={{uri: `${imageURL}${item?.image}`}}
                        style={styles.playlistImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.playlistTextContainer}>
                      <Text style={styles.playlistName}>{item.name}</Text>
                      <Text style={styles.trackCount}>
                        {`${mediaCount} tracks`}
                      </Text>
                    </View>
                  </Pressable>
                  {/* <Icon
                  name="dots-three-horizontal"
                  type="Entypo"
                  size={16}
                  color={'#fff'}
                  style={{ marginTop: 5 }}
                /> */}
                </LinearGradient>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    );
  };
  /*** Start Video playing ***/

  console.log('route', route);
  console.log('props', props);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onVideoPress}>
        <Video
            source={{
              uri: `${imageURL}${selectedData?.image}`,
            }}
          style={styles.video}
          paused={paused}
          resizeMode="contain"
          onBuffer={() => {}}
          onError={(error) => console.log(error)}
          controls={false}
        />
        {showControls && (
          <View style={styles.controls}>
            <TouchableOpacity onPress={togglePlayPause}>
              <Icon
                name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
                size={50}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={mapComment}
        style={{
          position: 'absolute',
          bottom: 10,
          width: width,
          height: height / 2.2,
        }}
        renderItem={({item, index}) => {
          // Destructure item and index directly
          return (
            <Pressable
              key={index}
              onPress={() =>
                NavigationService.navigate('ChatRoom', {
                  data: {
                    id: item?.user?._id,
                    title: item?.user?.name,
                    date: item?.user?.created_at,
                    image: item?.user?.full_path_image,
                    details: item?.comment,
                    time: '12:00',
                  },
                })
              }
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent:'space-between',
                marginTop: 15,
                paddingLeft: 20,
                paddingRight: 15,
                height: 50,
              }}>
              <Pressable>
                <Image
                  source={{uri: item?.user?.full_path_image}}
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
                    {item?.comment}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      marginTop: 3,
                    }}>
                    {item?.user?.name}{' '}
                  </Text>
                </View>
                {/* <Pressable
                      onPress={() => {
                          // setModalVisible(false)
                          // NavigationService.navigate('Publication02')
                      }}
                      style={{
                          marginRight:20,
                          alignItems:'flex-end'
                      }}>
                    <Text style={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          fontSize: 14,
                          fontFamily: Theme.FontFamily.light,
                          marginBottom: 3
                      }}>{res.time} </Text>
                      <DoubleTick/>
                  </Pressable> */}
              </View>
            </Pressable>
          );
        }}
      />

      {/* </ImageBackground> */}
      <View style={styles.inputContainer}>
        {/* <View style={{}}> */}
        {/* <LinkIcon/> */}
        <TextInput
          multiline={true}
          style={[styles.input, {minHeight: 40, maxHeight: 100}]}
          placeholder="Message..."
          value={comment}
          onChangeText={setComment}
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
          ]}
          onPress={() => {
            sendComment();
          }}>
          <SendIcon />
        </TouchableOpacity>
      </View>
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
        {/* <Pressable
          onPress={() => setGiftModalState(true)}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.96)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <GitftIcon />
        </Pressable> */}
        {/* <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.86)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <GitftIcon />
        </Pressable>  */}
        <Pressable
          onPress={() => setModalState(true)}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'rgba(27, 27, 27, 0.86)',
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
            <TouchableOpacity onPress={toggleModal}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.normal,
                  marginLeft: 15,
                  // marginTop:10,
                }}>
                Save this Video for Later
              </Text>
            </TouchableOpacity>
            {renderPlaylistModal()}
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
    </View>
  );
};

export default VideoLive;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    height: height,
    // paddingTop:100
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: 'black',
  },
  touchable: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    paddingVertical: 10,
    height: 50,
    backgroundColor: 'rgba(27, 27, 27, 0.8)',
    width: '75%',
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

    padding: 10,
    fontSize: 16,
  },
  playlistItem: {
    flex: 1,
    height: 89,
    width: width - 40,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  playlistImage: {
    height: 68,
    width: 68,
  },
  playlistTextContainer: {
    marginHorizontal: 12,
    width: '60%',
    marginTop: 10,
  },
  playlistName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Theme.FontFamily.medium,
    marginLeft: 5,
  },
  trackCount: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: 14,
    fontFamily: Theme.FontFamily.light,
    marginLeft: 5,
    marginTop: 3,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1},
  scroll: {flex: 1, backgroundColor: '#131313', width: '100%', height: '100%'},
  scrollContainer: {alignItems: 'center', height: '100%'},
  videoView: {width: '100%', height: '90%'},
  btnContainer: {flexDirection: 'row', justifyContent: 'center', height: 50},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
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
