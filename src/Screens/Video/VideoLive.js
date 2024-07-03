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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout';
import ReactNativeModal from 'react-native-modal';
import NavigationService from '../../Services/Navigation';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import CustomHeader from '../../Components/Header/CustomHeader';
import {Image} from 'react-native';
import Theme from '../../Constants/Theme';
import Slider from '@react-native-community/slider';
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
import {useIsFocused} from '@react-navigation/native';
import Video, { useProgress } from 'react-native-video';
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


  const onLoad = (data) => {
    setDuration(data.duration);
  };

   const onProgress = (data) => {
    setSliderValue((data.currentTime / duration) * 100);
  };
  const onSliderValueChange = (value) => {
    if (videoRef.current) {
      const seekTime = (value / 100) * duration;
      videoRef.current.seek(seekTime);
      setSliderValue(value);
    }
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

      changeloadingState(false);
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
      changeloadingState(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  const handlePlaylistClick = async playlistId => {
    try {
      const endpoint = 'playlist/add_media';

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

      const response = await apiCall(endpoint, 'POST', data, token);

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
    } catch (error) {
      HelperFunctions.showToastMsg('Error making API call:', error.message);
    }
  };

  useEffect(() => {
    // Initialize Agora engine when the app starts

    return () => {
      leave();
    };
  }, []);

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
    } catch (err) {
      HelperFunctions.showToastMsg(err.message);
    }
  };

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
        HelperFunctions.showToastMsg(
          'Error fetching Live comments:',
          error.message,
        );
      });
  };
  useEffect(() => {
    if (isFocused) {
      fetchCommentData();
    }
  }, [isFocused]);
  const handleLikePress = () => {
    const videoId = id;

    if (!videoId) {
      console.error('Podcast ID is missing');
      return;
    }

    const payload = {
      videoId: videoId,
    };

    apiCall('videos/like', 'POST', payload, token)
      .then(response => {
        if (response.message === 'Liked') {
          setLikeStatus(true);

          HelperFunctions.showToastMsg('Video liked');
        } else {
          setLikeStatus(false);

          HelperFunctions.showToastMsg('Video Disliked');
        }
      })
      .catch(error => {
        HelperFunctions.showToastMsg(
          'Error fetching Live comments:',
          error.message,
        );
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
                </LinearGradient>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    );
  };
  /*** Start Video playing ***/

  return (
        <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={() => NavigationService.back()}>
        <CrossIcon style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.videoContainer}>
        <TouchableOpacity style={styles.touchable} onPress={onVideoPress}>
          <Video
            ref={(ref) => {
              videoRef = ref;
            }}
            source={{
              uri: `${imageURL}${selectedData?.image}`,
            }}
            style={styles.video}
            paused={paused}
            resizeMode="contain"
            onBuffer={() => {}}
            onError={error => console.log(error)}
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
              <Slider
                style={styles.slider}
                value={sliderValue}
                onValueChange={onSliderValueChange}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    
     
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container2}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 20}}>
              {mapComment.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    NavigationService.navigate('CommentChatRoom',{...item, id: item?._id,addEndPoint: 'videos/message-comment', getEndPoint: `videos/comment-messages/${item?._id}`} )
                  }
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 15,
                    height: 50,
                  }}>
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

                  <View
                    style={{
                      flexDirection: 'row',
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
                  </View>
                </Pressable>
              ))}
            </KeyboardAwareScrollView>

            <View style={styles.inputContainer}>
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
                </Pressable>
              )}

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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

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
  container2: {
    flex: 1,
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
  closeIconContainer: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'dotted', // Dotted border style
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    // paddingVertical: 10,
    height: 50,
    backgroundColor: 'rgba(27, 27, 27, 0.8)',
    width: '75%',
    padding: 10,
    // position: 'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 30,
    // marginTop:30
  },
  slider: {
    width: '80%',
    marginHorizontal: 10,
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
