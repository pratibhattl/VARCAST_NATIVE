import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';

const APP_ID = 'ee6f53e15f78432fb6863f9baddd9bb3';
const CHANNEL_NAME = 'test-channel';
const TOKEN = '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T';

const LiveScreen = () => {
  const [engine, setEngine] = useState(null);
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    const init = async () => {
      console.log("Initializing Agora SDK");

      try {
        // Request permissions for Android
        if (Platform.OS === 'android') {
          await requestCameraAndAudioPermission();
        }

        const rtcEngine = await RtcEngine.create(APP_ID);
        setEngine(rtcEngine);

        await rtcEngine.enableVideo();

        rtcEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
          console.log("JoinChannelSuccess", channel, uid, elapsed);
          setJoined(true);
        });

        rtcEngine.addListener('UserJoined', (uid, elapsed) => {
          console.log("UserJoined", uid, elapsed);
        });

        rtcEngine.addListener('UserOffline', (uid, reason) => {
          console.log("UserOffline", uid, reason);
        });

      } catch (error) {
        console.log("Error initializing Agora SDK", error);
      }
    };

    init();

    return () => {
      if (engine) {
        engine.destroy();
      }
    };
  }, []);

  const joinChannel = async () => {
    console.log("Join Channel button clicked");

    if (engine) {
      console.log("Joining channel...");
      try {
        await engine.joinChannel(TOKEN, CHANNEL_NAME, null, 0);
      } catch (error) {
        console.log("Error joining channel", error);
      }
    } else {
      console.log("Engine not initialized");
    }
  };

  return (
    <View style={styles.container}>
      {joined ? (
        <View style={styles.videoContainer}>
          <RtcLocalView.SurfaceView
            style={styles.localVideo}
            channelId={CHANNEL_NAME}
            renderMode={VideoRenderMode.Hidden}
          />
          <RtcRemoteView.SurfaceView
            style={styles.remoteVideo}
            uid={123456}
            channelId={CHANNEL_NAME}
            renderMode={VideoRenderMode.Hidden}
          />
        </View>
      ) : (
        <Button title="Join Channel" onPress={joinChannel} />
      )}
    </View>
  );
};

// Request camera and audio permissions for Android
const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the camera and mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  localVideo: {
    width: 100,
    height: 150,
  },
  remoteVideo: {
    width: 300,
    height: 450,
  },
});

export default LiveScreen;