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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/Navigation';
import Theme from '../../Constants/Theme';
import CrossIcon from '../../assets/icons/CrossIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import Slider from 'react-native-slider';

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
const {width, height} = Dimensions.get('screen');

const SongPlay = props => {
  const [isPlayerReady, setIsPlayerReady] = useState(true);
  const [truefalse, setTruefalse] = useState(false);
  const [playingLoader, setPlayingLoader] = useState(true);
  // const {SongData} = props.route.params
  const scrollX = useRef(new Animated.Value(0)).current;
  // const spinValue = new Animated.Value(0);
  const songsSlider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  //   const progress = useProgress();
  const {position, duration} = useProgress(0);
  var current = format(position);
  var max = format(duration);

  var a = max.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  //   var mindT = progress.duration % (60 * 60)

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

  // let data=AudioArr.forEach(res=>res.audio)
  // console.log('index>>>>>>>>>>>>>>',data )
  const songsfunc = async () => {
    // let ind = AudioArr.findIndex(it=>it._id == props.route.params.item._id)

    // let allSongs = [];
    // AudioArr.forEach(async (element, index) => {
    //   let data = {
    //     id: element._id,
    //     url: element.audio ,
    //     title: element.name,
    //     artist: element.director
    //   };

    //   allSongs.push(data);

    //   if (index == (AudioArr.length - 1)) {
    TrackPlayer.setupPlayer()
      .then(() => {
        TrackPlayer.add({
          id: new Date().getDate(),
          url: 'https://pagalnew.com/download128/45972',
          title: 'SongData?.title',
          artist: 'tobylane',
          // duration: 60,
        }).then(() => {
          TrackPlayer.play().then(() => {
            // songsSlider.current.scrollToOffset({
            //   offset: (ind) * width,
            // });
            setPlayingLoader(false);
          });
        });
      })
      .catch(() => {
        TrackPlayer.add([
          {
            id: '1',
            url: 'https://pagalnew.com/download128/45972',
            title: 'SongData?.title',
            artist: 'tobylane',
            // duration: 600,
          },
        ]).then(() => {
          TrackPlayer.play().then(() => {
            // songsSlider.current.scrollToOffset({
            //   offset: (ind) * width,
            // });
            setPlayingLoader(false);
          });
        });
      });
  };
  //   console.log('sobngurl>',data.url)
  //     }
  //     );
  //   };

  const togglePlayback = async playbackState => {
    let currentTrack = await TrackPlayer.getCurrentTrack();
    // console.log('object>>>>>>>>>>>', playbackState);
    if (currentTrack != null) {
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
    await TrackPlayer.play();
    console.log('track>>>>>>', trackId);
  };

  //   var mind = progress.position % (60 * 60);
  //   var minutes = Math.floor(mind / 60);
  //   var seconds = progress.position - minutes * 60;

  //   var minutesT = Math.floor(mindT/60);
  //   var secondsT = progress.duration - minutesT * 60;
  //   console.log('truer', progress);
  useEffect(() => {
    // setIsPlayerReady(false)
    setTimeout(() => {
      setIsPlayerReady(false);
      songsfunc();
    }, 1000);
    console.log('scrollx>>>>>>>>>>>>>>>>>', songsfunc());

    // scrollX.addListener(({ value }) => {
    //   console.log('scrollx', scrollX)
    //   const index = Math.round(value / width);
    //   skipTo(index);
    //   setSongIndex(index);
    // });
    return () => {
      scrollX.removeAllListeners();
      //   TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    return () => {
      TrackPlayer.pause();
      TrackPlayer.reset();
    };
  }, []);
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
                    source={require('../../assets/images/image97.png')}
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
                </View>
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
                  height: 305,
                  width: 305,
                  overflow: 'hidden',
                  marginTop: 25,
                }}>
                <Image
                  source={require('../../assets/images/image97.png')}
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
                    Hosted by: Adrian Reif
                  </Text>
                </View>
                <Pressable
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  <RedHeartIcon />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Theme.FontFamily.normal,
                      // fontWeight:'400',
                      marginTop: 5,
                      textAlign: 'center',
                    }}>
                    32
                  </Text>
                </Pressable>
              </View>
            </View>
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
                value={current
                  .split(':')
                  .reverse()
                  .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)}
                maximumValue={max
                  .split(':')
                  .reverse()
                  .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)}
                onValueChange={async value => {
                  await TrackPlayer.seekTo(value);
                }}
                style={{
                  width: width - 140,
                  alignSelf: 'center',
                  marginHorizontal: 10,
                }}
                maximumTrackTintColor={'#fff'}
                minimumTrackTintColor={'#40E0D0'}
                thumbTouchSize={{width: 0, height: 0}}
                thumbTintColor="#fff"
                trackStyle={{
                  height: 4,
                  borderRadius: 10,
                }}
                thumbStyle={{
                  height: 10,
                  width: 10,
                  borderRadius: 30,
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
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 40,
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <RepeatIcon />
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
                {playingLoader ? <VideoPlayIcon /> : <PauseIcon />}
              </Pressable>
              <PlayNext />
              <BookmarkIcon Color={'#8A8A8A'} />
            </View>
            <Pressable
              style={{
                alignSelf: 'center',
                marginTop: 40,
              }}>
              <AlarmIcon />
            </Pressable>
          </LinearGradient>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SongPlay;
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
