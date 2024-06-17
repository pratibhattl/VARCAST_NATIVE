import { PermissionsAndroid, View, Text } from 'react-native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { v4 as uuid } from 'uuid';
import RtcEngine, {
  ChannelProfile,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
const {width, height} = Dimensions.get('screen');
  
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LiveScreen({ route }) {
  const isBroadcaster =  'create';
  const channelId = 'Streaming';
  const appId = 'ee6f53e15f78432fb6863f9baddd9bb3';

  // const [joined, setJoined] = useState(false);

  // const AgoraEngine = useRef();

  // async function requestCameraAndAudioPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //     ]);
  //     if (
  //       granted['android.permission.RECORD_AUDIO'] ===
  //         PermissionsAndroid.RESULTS.GRANTED &&
  //       granted['android.permission.CAMERA'] ===
  //         PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       console.log('You can use the cameras & mic');
  //     } else {
  //       console.log('Permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // const init = async () => {
  //   AgoraEngine.current = await RtcEngine.create(appId);
  //   AgoraEngine.current.enableVideo();
  //   AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
  //   if (isBroadcaster)
  //     AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

  //   AgoraEngine.current.addListener(
  //     'JoinChannelSuccess',
  //     (channelId, uid, elapsed) => {
  //       console.log('JoinChannelSuccess', channelId, uid, elapsed);
  //       setJoined(true);
  //     },
  //   );
  // };

  // useEffect(() => {
  //   if (Platform.OS === 'android') requestCameraAndAudioPermission();
  //   const uid = isBroadcaster ? 1 : 0;
  //   init().then(() =>
  //     AgoraEngine.current.joinChannel(null, channelId, null, uid),
  //   );
  //   return () => {
  //     AgoraEngine.current.destroy();
  //   };
  // }, []);
  
  // const onSwitchCamera = () => AgoraEngine.current.switchCamera();
  useEffect(() => {
    // Initialize Agora SDK
    const initAgora = async () => {
      const rtcEngine = await RtcEngine.create(appId);
      rtcEngine.enableAudio(); // Enable audio
      rtcEngine.enableVideo(); // Enable video
      rtcEngine.joinChannel(null, 'channel_name', null, 0); // Replace 'channel_name' with your channel name
    };

    initAgora();

    return () => {
      // Clean up Agora SDK on component unmount
      RtcEngine.destroy();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}> 
      {/* {!joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#222"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>
            {'Joining Stream, Please Wait'}
          </Text>
        </>
      ) : ( */}
        <>
          {/* {isBroadcaster ? (
            <RtcLocalView.SurfaceView
              style={styles.fullscreen}
              channelId={channelId}
            />
          ) : (
            <RtcRemoteView.SurfaceView
              uid={1}
              style={styles.fullscreen}
              channelId={channelId}
            />
          )} */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} 
            // onPress={onSwitchCamera}
            >
              <Text style={styles.buttonText}>{'Switch Camera'}</Text>
            </TouchableOpacity>
          </View>
        </>
      {/* )} */}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  fullscreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#131313',
    height: height,
  },
});