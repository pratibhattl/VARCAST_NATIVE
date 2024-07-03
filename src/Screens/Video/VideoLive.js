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
  Platform,TouchableWithoutFeedback
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
  console.log('Route', route.params);
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

  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);


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
