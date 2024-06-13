import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import CrossIcon from '../../assets/icons/CrossIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import Slider from '@react-native-community/slider';
import DislikeIcon from '../../assets/icons/DislikeIcon';
import HelperFunctions from '../../Constants/HelperFunctions';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import RepeatIcon from '../../assets/icons/RepeatIcon';
import PlayPrevious from '../../assets/icons/PlayPrevious';
import PlayNext from '../../assets/icons/PlayNext';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import PauseIcon from '../../assets/icons/PauseIcon';
import AlarmIcon from '../../assets/icons/AlarmIcon';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';
import DownArrowIcon from '../../assets/icons/DownArrowIcon';
import {useRoute} from '@react-navigation/native';
import AllSourcePath from '../../Constants/PathConfig';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import axios from 'axios';
import {
  setupPlayer,
  addTrack,
  playbackService,
} from '../../Services/MusicPlayService';


const {width, height} = Dimensions.get('screen');

const SongPlayy = props => {
  const route = useRoute();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  const baseUrl = AllSourcePath.API_BASE_URL_DEV;
  const [likeStatus, setLikeStatus] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(true);
  const [truefalse, setTruefalse] = useState(false);
  const [playingLoader, setPlayingLoader] = useState(true);
  // const {SongData} = props.route.params
  const scrollX = useRef(new Animated.Value(0)).current;
  // const spinValue = new Animated.Value(0);
  const songsSlider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  //   const progress = useProgress();
  const [selectedData, setSelectedData] = useState({});
  console.log('Selected Data', selectedData);

  const isFocused = useIsFocused();
  const {position, duration} = useProgress(0);
  const token = useSelector(state => state.authData.token);

  console.log('route123', route.params);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  const playbackState = usePlaybackState();

  const skipToNext = () => {
    songsSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    // TrackPlayer.skipToNext()
  };
  const skipToPrevious = () => {
    songsSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    // TrackPlayer.skipToPrevious()
  };
  const onRegisterPlayback = async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
  };

  // let data=AudioArr.forEach(res=>res.audio)
  // console.log('index>>>>>>>>>>>>>>',data )
  const songsfunc = async () => {
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    addTrack({
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

  //   console.log('sobngurl>',data.url)
  //     }
  //     );
  //   };
  var current = format(position);
  var max = format(duration);

  var a = max.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  //   var mindT = progress.duration % (60 * 60)
  const togglePlayback = async playbackState => {
    let currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack != null) {
      if (playbackState.state == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }

    if (playbackState.state == State.Stopped) {
      songsfunc();
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
    await TrackPlayer.play();
  };

  //   var mind = progress.position % (60 * 60);
  //   var minutes = Math.floor(mind / 60);
  //   var seconds = progress.position - minutes * 60;

  //   var minutesT = Math.floor(mindT/60);
  //   var secondsT = progress.duration - minutesT * 60;
  //   console.log('truer', progress);

  // const playPodcast = () => {
  //   try {
  //     SoundPlayer.playUrl(`${imageUrl}${route?.params?.audio}`);
  //   } catch (error) {
  //     console.error('ERROR WHILE PLAYING THRE AUDIO :', error);
  //   }
  // };

  const fetchPodcastDetails = async () => {
    const formData = new FormData();
    formData.append('podcastId', props.route.params._id);
    axios
      .post(`${baseUrl}podcast/details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response?.data?.status === true) {
          const like = response?.data?.data?.isLiked == true ? true : false;
          console.log('podcast', response?.data?.data);

          setSelectedData(response?.data?.data);
          setLikeStatus(like);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching Podcast comments:', error);
      });
  };

  const handleLikePress = () => {
    const podcastId = props.route.params._id;
    if (!podcastId) {
      console.error('Podcast ID is missing');
      return;
    }
    const payload = {
      podcastId: podcastId,
    };

    apiCall('podcast/like', 'POST', payload, token)
      .then(response => {
        fetchCommentData();
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

  useEffect(() => {
    if (isFocused) {
      fetchPodcastDetails();
    }
  }, [isFocused]);

  useEffect(() => {
    if (playbackState.state === 'ended') {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
    }
  }, [playbackState]);

  useEffect(() => {
    setTimeout(() => {
      setIsPlayerReady(false);
      playbackService();
      songsfunc();
    }, 200);

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
    };
  }, [route.params._id]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        // animated={true}
        barStyle={'light-content'}
        translucent={true}
      />
      <ImageBackground
        source={require('../../assets/images/PodcastPlay.png')}
        style={{
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.999999999)',
          // paddingTop: 45,
          alignItems: 'center',

          // zIndex: 9999,
          flex: 1,
          // position:'absolute',
          // top: 0,
        }}
        resizeMode="cover">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(0, 0, 0, 0.35)', '#131313']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            // useAngle={true} angle={-290}
            // angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              flex: 1,
              paddingTop: 50,
              //   paddingBottom:20
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
                    // backgroundColor: 'red',
                  }}>
                  <Image
                    source={{
                      uri: `${imageUrl}${route?.params?.image}`,
                    }}
                    style={{
                      height: 38,
                      width: 38,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    resizeMode="cover"
                  />
                </View>
                {/* <View style={{marginHorizontal: 10}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                    }}>
                    Adrian Reif
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 13,
                      fontFamily: Theme.FontFamily.normal,
                      textAlign: 'center',
                      marginTop: 1,
                    }}>
                    32,217 views
                  </Text>
                </View> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => NavigationService.back()}
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
                <DownArrowIcon />
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
                  height: 305,
                  width: 305,
                  overflow: 'hidden',
                  marginTop: 25,
                }}>
                <Image
                  source={{
                    uri: `${imageUrl}${route?.params?.image}`,
                  }}
                  style={{
                    height: 305,
                    width: 305,
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 5,
                alignItems: 'center',
                // flex: 1,
                // height:70,
                // backgroundColor:'rgba(0,0,0,0.05)',
                width: width,
                marginTop: 35,
                // borderRadius:15,
                shadowColor: '#131313',
                // shadowOffset: { width: 0, height: 30 },
                shadowOpacity: 0.5,
                // shadowRadius: 2,
                elevation: 10,
                // flexDirection:'row'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width,
                  paddingHorizontal: 20,
                }}>
                <ShareIcon />
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: Theme.FontFamily.semiBold,
                      // marginTop: 10,
                      // fontWeight:'600',
                    }}>
                    How to Pitch Your Best Ideas
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      fontSize: 17,
                      fontFamily: Theme.FontFamily.normal,
                      // fontWeight:'400',
                      marginTop: 5,
                      textAlign: 'center',
                    }}>
                    {/* Hosted by: Adrian Reif */}
                    {route?.params?.title}
                  </Text>
                </View>
                <Pressable
                  onPress={() => handleLikePress()}
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  {likeStatus === true ? <RedHeartIcon /> : <DislikeIcon />}
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      // fontWeight:'400',
                      marginTop: 5,
                      textAlign: 'center',
                    }}>
                    {selectedData?.countLike}
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* Slider start*/}

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 45,
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

            {/* Slider end*/}

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 40,
                justifyContent: 'space-between',
                marginHorizontal: 20,
                backgroundColor: 'black',
              }}>
              <Pressable
                onPress={() => {
                  TrackPlayer.reset();
                  setTimeout(() => {
                    songsfunc();
                  }, 600);
                }}>
                <RepeatIcon />
              </Pressable>
              <PlayPrevious />
              <Pressable
                style={{
                  height: 55,
                  width: 55,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 10,
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
              <PlayNext />
              <BookmarkIcon Color={'#8A8A8A'} />
            </View>
            <Pressable
              style={{
                alignSelf: 'center',
                marginVertical: 30,
              }}>
              <AlarmIcon />
            </Pressable>
          </LinearGradient>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SongPlayy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // width:width
    // paddingHorizontal: 20
    backgroundColor: '#131313',
    height: height,
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
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});
