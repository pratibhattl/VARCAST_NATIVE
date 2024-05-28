import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Video from 'react-native-video';
import {Icon} from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import Lottie from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
import {Image} from 'react-native';
import DownArrowIcon from '../../assets/icons/DownArrowIcon';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import SadEmojiIcon from '../../assets/icons/SadEmojiIcon';
import ReportIcon from '../../assets/icons/ReportIcon';
import RedHeartIcon from '../../assets/icons/RedHeartIcon';
import Slider from '@react-native-community/slider';
import ChatIcon from '../../assets/icons/ChatIcon';
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';
import PauseIcon from '../../assets/icons/PauseIcon';
import PlayNext from '../../assets/icons/PlayNext';
import PlayPrevious from '../../assets/icons/PlayPrevious';

const {width, height} = Dimensions.get('screen');

const ReelVideoIndex = props => {
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(true)
  const [Play, setPlay] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [onstartUp, setonstartUp] = useState(200);
  const [Progress, setProgress] = useState(0);
  const ref = useRef(0);
  function format(seconds = 0) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  useEffect(() => {
    //  setTimeout(()=>{
    //   setLoading(false)
    //  },2000)
  }, []);

  // if (loading) {
  //   return (
  //     <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: 0, backgroundColor: '#131313' }}>
  //       <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
  //         <View style={{
  //           justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', width: 70, height: 70, alignSelf: 'center', borderRadius: 10,
  //           shadowColor: '#000',
  //           shadowOffset: { width: 0, height: 0 },
  //           shadowOpacity: 0.2,
  //           shadowRadius: 6,
  //           elevation: 6,
  //           backgroundColor: "white",
  //           // borderRadius:70

  //         }}>
  //           {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
  //           <Lottie style={{ width: 90, aspectRatio: 1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop />
  //         </View>
  //       </View>
  //     </View>
  //   )
  // }
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          //backgroundColor: 'green',
          height: height,
          // marginTop: '10%',
        }}>
        <Video
          source={{
            uri: 'file:///data/user/0/com.varcast.app/cache/imgly_7106930821369562921.mp4',
          }} // Can be a URL or a local file.
          // source={{uri:'https://v3.cdnpk.net/videvo_files/video/free/2014-12/large_preview/Raindrops_Videvo.mp4'}} // Can be a URL or a local file.
          paused={Play}
          controls={true} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          ref={ref}
          resizeMode="cover"
          repeat={true}
          onProgress={x => {
            setProgress(x);
            if (x.atValue == 0) {
              setLoading(false);
            }
          }}
          poster="https://smallseotools.com/designstudio/images/pm_video.svg"
          posterResizeMode="contain"
          onBuffer={e => {
            console.log('adsfsfsdf', e);
            setLoading(true);
            if (e.isBuffering == false) {
              setLoading(false);
            } else {
              // setLoading(true)
            }
          }}
          onLoad={e => {
            if (e) {
              // console.log(e)
              setLoading(false);
            }
          }}
          onEnd={() => {
            NavigationService.back();
          }}
        />
        {console.log('progress', Progress)}
        <View
          style={{
            paddingTop: 5,
            alignItems: 'center',
            // flex: 1,
            // height:70,
            // backgroundColor:'rgba(0,0,0,0.05)',
            width: width,
            marginTop: 0,
            position: 'absolute',
            bottom: 120,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width,
              paddingHorizontal: 20,
            }}>
            <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
              <ChatIcon />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: Theme.FontFamily.normal,
                  // fontWeight:'400',
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                15
              </Text>
            </Pressable>
            <View style={{alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.semiBold,
                  maxWidth: '90%',
                  textAlign: 'center',
                  // marginTop: 10,
                  // fontWeight:'600',
                }}>
                How to Pitch Your Best Ideas dssds sdsd
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 16,
                  fontFamily: Theme.FontFamily.normal,
                  // fontWeight:'400',
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Hosted by: Adrian Reif
              </Text>
            </View>
            <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
              <RedHeartIcon />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 13,
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
            marginTop: 0,
            position: 'absolute',
            marginHorizontal: 10,
            bottom: 60,
          }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontFamily: Theme.FontFamily.medium,
              fontSize: 13,
            }}>
            {format(Progress.currentTime)}
          </Text>
          <Slider
            value={Progress.currentTime}
            maximumValue={Progress.seekableDuration}
            tapToSeek={true}
            onValueChange={val => {
              console.log('bvaluee', val);
              ref.current.seek(val);
            }}
            style={{
              width: width - 130,
              alignSelf: 'center',
              marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
              height: 5,
            }}
            maximumTrackTintColor={'rgba(255, 255, 255, 0.4)'}
            minimumTrackTintColor={'#fff'}
            thumbTouchSize={{width: 5, height: 5}}
            thumbTintColor="transparent"
            trackStyle={{
              height: 5,
              borderRadius: 5,
            }}
            thumbStyle={{
              height: 5,
              width: 5,
              // borderRadius: 30
            }}
          />

          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.54)',
              fontFamily: Theme.FontFamily.medium,
              fontSize: 13,
            }}>
            {format(Progress.seekableDuration)}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 40,
            justifyContent: 'space-evenly',
            marginHorizontal: 20,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}>
          <PlayPrevious />
          <Pressable
            style={{
              height: 54,
              width: 54,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(27, 27, 27, 0.4)',
              borderRadius: 10,
            }}
            onPress={() => {
              setPlay(!Play);
            }}>
            {Play ? (
              <VideoPlayIcon Width={33} Height={33} Color={'#fff'} />
            ) : (
              <PauseIcon Color={'#fff'} />
            )}
          </Pressable>
          <PlayNext />
        </View>
        <TouchableOpacity
          onPress={() => NavigationService.back()}
          style={{
            height: 40,
            width: 40,
            marginVertical: 25,
            marginHorizontal: 15,
            position: 'absolute',
            top: 55,
            right: 5,
            backgroundColor: 'rgba(28, 28, 28, 0.1)',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 2,
            borderColor: 'white',
            borderStyle: 'dashed',
            borderWidth: 1,
          }}>
          <DownArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPlay(true);
            setModalState(!ModalState);
          }}
          style={{
            height: 40,
            width: 140,
            marginVertical: 25,
            marginHorizontal: 15,
            position: 'absolute',
            top: 55,
            backgroundColor: 'rgba(28, 28, 28, 0.1)',
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
              backgroundColor: 'red',
            }}>
            <Image
              source={require('../../assets/images/image97.png')}
              style={{
                height: 38,
                width: 38,
                borderRadius: 10,
                marginRight: 5,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{marginHorizontal: 5}}>
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
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 13,
                fontFamily: Theme.FontFamily.light,
                textAlign: 'center',
                marginTop: 1,
              }}>
              32,217 views
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => NavigationService.back()}
          style={{
            height:35,
            width:35,
            marginVertical:25,
            marginHorizontal:10,
            position:'absolute',
            top:10,
            backgroundColor:'rgba(28, 28, 28, 0.54)',
            borderRadius:50,
            alignItems:'center',
            justifyContent:'center'
          }}
          >
            <Icon
              name="arrowleft"
              type="AntDesign"
              size={22}
              color={Theme.colors.white}
            />
          </TouchableOpacity> */}
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
          setPlay(false);
          setModalState(false);
        }}
        onBackdropPress={() => {
          setPlay(false);
          setModalState(false);
        }}>
        <View
          style={{
            width: '100%',
            height: height / 3.2,
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <ReportIcon Color={'#ED4040'} />
            <Text
              style={{
                color: '#ED4040',
                fontSize: 17,
                fontFamily: Theme.FontFamily.normal,
                marginLeft: 15,
                // marginTop:10,
              }}>
              Report
            </Text>
          </View>
        </View>
      </ReactNativeModal>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            bottom: 0,
            backgroundColor: '#131313',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#131313',
                width: 70,
                height: 70,
                alignSelf: 'center',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
                backgroundColor: 'white',
                // borderRadius:70
              }}>
              <ActivityIndicator size={'large'} color={'#00AD70'} />

              {/* <Lottie style={{width:90,aspectRatio:1 }} source={require('../../assets/icons/loading.json')} autoPlay loop /> */}
              {/* <Lottie style={{ width: 90, aspectRatio: 1 }} source={require('../../assets/icons/new_loading.json')} autoPlay loop /> */}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ReelVideoIndex;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
});
