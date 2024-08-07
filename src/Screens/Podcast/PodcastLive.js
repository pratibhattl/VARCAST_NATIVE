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
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
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
import DislikeIcon from '../../assets/icons/DislikeIcon';
import CrossIcon from '../../assets/icons/CrossIcon';
import ReactNativeModal from 'react-native-modal';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import SadEmojiIcon from '../../assets/icons/SadEmojiIcon';
import ReportIcon from '../../assets/icons/ReportIcon';
import ShiledIcon from '../../assets/icons/ShiledIcon';
import Notification from '../../assets/icons/Notification';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import AllSourcePath from '../../Constants/PathConfig';
import {useIsFocused} from '@react-navigation/native';
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
import axios from 'axios';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import SoundPlayer from 'react-native-sound-player';
import PauseIcon from '../../assets/icons/PauseIcon';
import Slider from '@react-native-community/slider';
import {
  setupPlayer,
  addTrack,
  playbackService,
} from '../../Services/MusicPlayService';

const {width, height} = Dimensions.get('screen');

const PodcastLive = props => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const id = route.params?._id;

  const {token, userDetails} = useSelector(state => state.authData);
  const {position, duration} = useProgress(0);

  const [likeStatus, setLikeStatus] = useState(false);
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const [loadingState, changeloadingState] = useState(false);
  const [comment, setComment] = useState('');
  const [mapComment, setMapcomment] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [ModalState, setModalState] = useState(false);
  const [GiftModalState, setGiftModalState] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State to track if the podcast is liked
  const [GiftData, setGiftData] = useState();
  const [newComment, setNewComment] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(true);
  const [playingLoader, setPlayingLoader] = useState(true);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  let current = format(position);
  let max = format(duration);

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

      const mediaUrl = selectedData.audio;
      const image = selectedData.image;
      const title = selectedData.title;
      const overview = selectedData.overview;
      const updated_at = selectedData.updated_at;
      const created_at = selectedData.created_at;

      const data = {
        playlistId,
        mediaUrl,
        image,
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
      // Handle the response as needed
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
    }
  };

  const fetchCommentData = async () => {
    const formData = new FormData();
    formData.append('podcastId', id);
    axios
      .post(`${baseUrl}podcast/details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response?.data?.status === true) {
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
        HelperFunctions.showToastMsg(error.message);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchCommentData();
    }
  }, [isFocused]);

  const agoraEngineRef = useRef(); // Agora engine instance

  const [totalCoins, setTotalCoins] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const playbackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;

  function showMessage(msg) {
    setMessagee(msg);
  }

  //-----------------------------------------------------------------------------------------------------------//

  //-----------------------------------------------------------------------------------------------------------//

  const leave = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      await TrackPlayer.stop();
      HelperFunctions.showToastMsg('You left the channel');
    } catch (err) {
      HelperFunctions.showToastMsg(err.message);
    }
  };

  //-----------------------------------------------------------------------------------------------------------//

  /*** GET GIFT DATA ***/

  const getAllGift = async () => {
    try {
      const data = await apiCall('gift/index', 'GET', null, token);

      setTotalCoins(data?.data?.total);
      setGiftData(data?.data?.listData);
      setGiftModalState(true);
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
    }
  };

  //-----------------------------------------------------------------------------------------------------------//

  /*** SEND GIFT ***/

  const sendGift = async gift => {
    
    const payload = {
      podcastId: id,
      userId: route?.params?.userId,
      giftId: gift._id,
    };

    try {
      const response = await apiCall('gift/send', 'POST', payload, token);
      setTotalCoins(response?.data?.total);
      setGiftModalState(false);
      HelperFunctions.showToastMsg(`${gift.gift_name} sent successfully`);
    } catch (error) {
      HelperFunctions.showToastMsg(error.message);
      
    }
  };

  //-----------------------------------------------------------------------------------------------------------//

  /*** Play Podcast ***/

  const songsfunc = async () => {
    // Set up the player
    await setupPlayer();

    // Add a track to the queue
    await addTrack({
      id: route?.params?._id,
      url: `${imageUrl}${route?.params?.audio}`,
      title: route?.params?.title,
      artwork: route?.params?.image,
    });

    // Start playing it
    TrackPlayer.play().then(() => {
      setPlayingLoader(false);
    });
  };

  const togglePlayback = async playbackState => {
    let currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack != null) {
      if (playbackState.state == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }

    if (
      playbackState.state == State.Stopped ||
      playbackState.state == State.None
    ) {
      songsfunc();
    }
  };

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  //-----------------------------------------------------------------------------------------------------------//

  // Function to handle the press event of the heart icon
  const handleLikePress = () => {
    const podcastId = id;
    if (!podcastId) {
      console.error('Podcast ID is missing');
      return;
    }
    const payload = {
      podcastId: podcastId,
    };

    apiCall('podcast/like', 'POST', payload, token)
      .then(response => {
        if (response.message === 'Liked') {
          setLikeStatus(true);
          HelperFunctions.showToastMsg('Podcast liked');
        } else {
          setLikeStatus(false);
          HelperFunctions.showToastMsg('Podcast Disliked');
        }
      })
      .catch(error => {
        console.error('Error while liking the podcast:', error);
      });
  };

  // Function to handle the Comment
  const sendComment = () => {
    const podcastId = id;
    if (!podcastId) {
      console.error('Podcast ID is missing');
      return;
    }
    const payload = {
      podcastId: podcastId,
      comment: comment,
    };

    apiCall('podcast/comment', 'POST', payload, token)
      .then(res => {
        if (res) {
          Keyboard.dismiss();
          setComment('');
          fetchCommentData();
        }
      })
      .catch(err => {});
  };

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
                        source={{uri: `${imageUrl}${item?.image}`}}
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

  useEffect(() => {
    playbackService();
    songsfunc();

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
    };
  }, [route.params._id]);

  useEffect(() => {
    if (playbackState.state === State.Ended) {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
      setIsPlayerVisible(true);
    }
    if (playbackState.state === State.Playing) {
      setIsPlayerVisible(false);
    }
    if (playbackState.state === State.None) {
      setIsPlayerVisible(true);
    }
  }, [playbackState.state]);

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
          alignItems: 'center',
          shadowColor: '#131313',
          shadowOffset: {width: 0, height: 35},
          shadowOpacity: 0.6,
          elevation: 20,
          zIndex: 9999,
        }}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(0, 0, 0, 0.35)', '#131313']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            flex: 1,
            paddingTop: 40,
          }}>
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
                }}>
                <Image
                  source={{uri: `${imageUrl}${selectedData?.image}`}}
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

              shadowOpacity: 0.7,

              elevation: 20,
            }}>
            <View
              style={{
                borderRadius: 20,
                height: 140,
                width: 140,
                overflow: 'hidden',
                position: 'relative',
              }}>
              <TouchableWithoutFeedback
                onPress={() => setIsPlayerVisible(prev => !prev)}>
                <Image
                  source={{uri: `${imageUrl}${selectedData?.image}`}}
                  style={{
                    height: 140,
                    width: 140,
                  }}
                  resizeMode="cover"
                />
              </TouchableWithoutFeedback>

              {isPlayerVisible && playbackState.state !== State.None && (
                <Pressable
                  style={{
                    height: 55,
                    width: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f2f890',
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.26,
                    shadowRadius: 3,
                    borderRadius: 50,
                    position: 'absolute',
                    top: 40,
                    left: 45,
                    zIndex: 50,
                  }}
                  onPress={() => {
                    if (!playingLoader) {
                      togglePlayback(playbackState);
                    }
                  }}>
                  {playbackState.state == State.Paused ||
                  playbackState.state == State.Stopped ? (
                    <VideoPlayIcon Width={32} Height={32} />
                  ) : (
                    <PauseIcon />
                  )}
                </Pressable>
              )}
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              width: width,
              paddingHorizontal: 20,
              // marginTop: 45,
            }}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.54)',
                fontFamily: Theme.FontFamily.medium,
                fontSize: 13,
              }}>
              {format(position)}
            </Text>
            <Slider
              minimumValue={0}
              value={current
                .split(':')
                .reverse()
                .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)}
              maximumValue={max
                .split(':')
                .reverse()
                .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)}
              // tapToSeek={true}
              onValueChange={val => {
                TrackPlayer.seekTo(val);
              }}
              style={{
                width: width - 130,
                alignSelf: 'center',
                marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
                height: 0,
              }}
              maximumTrackTintColor={'rgba(255, 255, 255, 0.54)'}
              minimumTrackTintColor={'#fff'}
              thumbTouchSize={{width: 0, height: 0}}
              thumbTintColor="transparent"
              trackStyle={{
                height: 0,
                borderRadius: 0,
              }}
              thumbStyle={{
                height: 0,
                width: 0,
                borderRadius: 0,
              }}
            />
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.54)',
                fontFamily: Theme.FontFamily.medium,
                fontSize: 13,
              }}>
              {format(duration)}
            </Text>
          </View>

          <View
            style={{
              paddingTop: 5,
              alignItems: 'center',
              flex: 1,
              // height:70,
              // backgroundColor:'rgba(0,0,0,0.05)',
              width: width,
              // marginTop: 10,
              // borderRadius:15,
              shadowColor: '#131313',
              // shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.7,
              // shadowRadius: 2,
              elevation: 20,
            }}>
            <>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: Theme.FontFamily.semiBold,
                  marginTop: 5,
                  // fontWeight:'600',
                }}>
                {selectedData.title}
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.normal,
                  // fontWeight:'400',
                  marginTop: 5,
                }}>
                {selectedData.hosted_by}
              </Text>
            </>
          </View>
        </LinearGradient>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container2}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 20}}>
              {mapComment?.map((comment, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    NavigationService.navigate('CommentChatRoom', {
                      ...comment,
                      id: comment?._id,
                      addEndPoint: 'podcast/message-comment',
                      getEndPoint: `podcast/comment-messages/${comment?._id}`,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 15,
                  }}>
                  <Pressable>
                    <Image
                      source={{uri: comment?.user?.full_path_image}}
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
                        {comment.user?.name}{' '}
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
                placeholderTextColor={Theme.colors.grey}
              />

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: 'transparent',
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
              {route.params.userId !== userDetails._id && (
                <Pressable
                  onPress={getAllGift}
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
      <ReactNativeModal
        isVisible={ModalState}
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
          setModalState(false);
        }}
        onBackdropPress={() => {
          setModalState(false);
        }}>
        <View
          style={{
            width: '100%',
            height: height / 2.5,
            backgroundColor: '#1C1C1C',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 25,
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
                {totalCoins}
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
                <Pressable onPress={() => sendGift(item)}>
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
                    <Image
                      source={{uri: `${imageUrl}${item.icon_image}`}}
                      style={{
                        height: 30,
                        width: 30,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: Theme.FontFamily.normal,
                        marginTop: 5,
                      }}>
                      {item.coin_value}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default PodcastLive;
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
    // backgroundColor:'red'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,

    height: 50,
    backgroundColor: 'rgba(27, 27, 27, 0.96)',
    width: '75%',
    padding: 10,
    // position:'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // marginVertical:30,
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
