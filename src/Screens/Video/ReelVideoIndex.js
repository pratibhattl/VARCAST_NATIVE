import React, { useEffect, useRef, useState } from 'react';
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
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/Service';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import ReactNativeModal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import AllSourcePath from '../../Constants/PathConfig';
import Video from 'react-native-video';


const { width, height } = Dimensions.get('screen');

const ReelVideoIndex = (props) => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const route = useRoute();
  const imageUrl = AllSourcePath.IMAGE_BASE_URL;
  let id = route.params?.id;
  const token = useSelector((state) => state.authData.token);
  const [playVideo, setPlayVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  function format(seconds = 0) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const endpoint = `videos/list`;
        const response = await apiCall(endpoint, 'GET', {}, token);
        const data = response.data.listData;
        const filteredData = data.find((video) => video._id === id);
        console.log('Filtered Video Data:', filteredData);
        // Assuming the audio URL is stored in the 'audioUrl' field of the videoData object
        if (filteredData && filteredData.audioUrl) {
          setVideoData({
            ...filteredData,
            audio: filteredData.audioUrl,
          });
        } else {
          setVideoData(filteredData);
        }
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
      <View style={{ width, height: '50%' }}>
        <Video
          source={{ uri: `${imageUrl}/${videoData?.video}` }}
          paused={!playVideo}
          controls={true}
          style={styles.backgroundVideo}
          ref={videoRef}
          resizeMode="cover"
          repeat={true}
          onProgress={(progress) => {
            setProgress({
              currentTime: progress.currentTime,
              seekableDuration: progress.seekableDuration,
            });
          }}
          poster={`${imageUrl}/${videoData?.image}`}
          posterResizeMode="contain"
          onBuffer={(e) => {
            setLoading(e.isBuffering);
          }}
          onLoad={(e) => {
            setLoading(false);
          }}
          onError={(error) => {
            setLoading(false);
          }}
          onEnd={() => {
            NavigationService.back();
          }}
        />
        {videoData?.audio && (
          <Video
            source={{ uri: `${imageUrl}/${videoData?.audio}` }}
            paused={!playAudio}
            style={{ height: 0, width: 0 }}
            ref={audioRef}
          />
        )}
        {/* Rest of your UI */}
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
