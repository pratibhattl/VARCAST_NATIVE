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
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/Service';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import ReactNativeModal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import AllSourcePath from '../../Constants/PathConfig';
const {width, height} = Dimensions.get('screen');

const ReelVideoIndex = (props) => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const route = useRoute();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  let id = route.params?.id;
  const token = useSelector((state) => state.authData.token);
  const [Play, setPlay] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [Progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const ref = useRef(null);

  function format(seconds = 0) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  useEffect(() => {
    // Fetch video data from API
    const fetchVideoData = async () => {
      try {
        const endpoint = `videos/list`;
        const response = await apiCall(endpoint, 'GET', {}, token);
        const data = response.data.listData; // Extract the listData array
        const filteredData = data.find((video) => video._id === id); // Find the specific video by id
        console.log('Filtered Video Data:', filteredData);
        setVideoData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Video not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          height: height,
        }}>
        <Video
          source={{ uri: `${imageUrl}/${videoData?.image}` }} // Simplified URL for testing
          paused={Play}
          controls={true}
          style={styles.backgroundVideo}
          ref={ref}
          resizeMode="cover"
          repeat={true}
          onProgress={progress => {
            setProgress({
              currentTime: progress.currentTime,
              seekableDuration: progress.seekableDuration,
            });
          }}
          poster={`${imageUrl}/${videoData?.image}`} // Use base URL and video image path
          posterResizeMode="contain"
          onBuffer={e => {
            setLoading(e.isBuffering);
          }}
          onLoad={e => {
            setLoading(false);
          }}
          onError={error => {
            setLoading(false);
          }}
          onEnd={() => {
            NavigationService.back();
          }}
        />
        <View
          style={{
            paddingTop: 5,
            alignItems: 'center',
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
            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* Other icons */}
            </Pressable>
            <View style={{ alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: Theme.FontFamily.semiBold,
                  maxWidth: '90%',
                  textAlign: 'center',
                }}>
                {videoData?.title}
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.54)',
                  fontSize: 16,
                  fontFamily: Theme.FontFamily.normal,
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Hosted by: Adrian Reif
              </Text>
            </View>
            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* Other icons */}
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
              ref.current.seek(val);
            }}
            style={{
              width: width - 130,
              alignSelf: 'center',
              marginHorizontal: 5,
              height: 5,
            }}
            maximumTrackTintColor={'rgba(255, 255, 255, 0.4)'}
            minimumTrackTintColor={'#fff'}
            thumbTouchSize={{ width: 5, height: 5 }}
            thumbTintColor="transparent"
            trackStyle={{
              height: 5,
              borderRadius: 5,
            }}
            thumbStyle={{
              height: 5,
              width: 5,
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
          {/* Video controls */}
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
          }}>
          {/* Back button */}
        </TouchableOpacity>
        <ReactNativeModal
          isVisible={ModalState}
          onBackdropPress={() => setModalState(false)}
          style={{ margin: 0, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'rgba(28, 28, 28, 1)',
              paddingVertical: 30,
              paddingBottom: 60,
              paddingHorizontal: 10,
              borderRadius: 20,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              paddingTop: 20,
            }}>
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: Theme.FontFamily.bold,
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                Are you facing issues with this reel?
              </Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 30 }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: width - 50,
                  height: 60,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingLeft: 25,
                }}
                onPress={() => {
                  setModalState(false);
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 15,
                  }}>
                  I am not interested in this reel
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: width - 50,
                  height: 60,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingLeft: 25,
                  marginTop: 15,
                }}
                onPress={() => {
                  setModalState(false);
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 15,
                  }}>
                  Save reel
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: width - 50,
                  height: 60,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingLeft: 25,
                  marginTop: 15,
                }}
                onPress={() => {
                  setModalState(false);
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 15,
                  }}>
                  Share reel
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: width - 50,
                  height: 60,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingLeft: 25,
                  marginTop: 15,
                }}
                onPress={() => {
                  setModalState(false);
                }}>
                <Text
                  style={{
                    fontFamily: Theme.FontFamily.normal,
                    fontSize: 14,
                    color: '#fff',
                    paddingLeft: 15,
                  }}>
                  Report reel
                </Text>
              </Pressable>
            </View>
          </View>
        </ReactNativeModal>
        {loading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -25 }, { translateY: -25 }],
            }}
            size="large"
            color="#fff"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default ReelVideoIndex;
