import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Platform, PermissionsAndroid } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';

const APP_ID = '4c1c49fdaa764987ae75bf36be453456'; 
const CHANNEL_NAME = 'test';
const TOKEN = '007eJxTYBCoLhVbzl46w6ttb1K8z0eGDaF1u1tOLhWv6GeZpX3v40QFBpNkw2QTy7SUxERzMxNLC/PEVHPTpDRjs6RUE1NjE1MzzbtZaQ2BjAwhC/IZGRkgEMRnYShJLS5hYAAA+BMejA=='; // Use a token for production

const App = () => {
  const [engine, setEngine] = useState(null);
  const [joined, setJoined] = useState(false);
  const [peerIds, setPeerIds] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }

      const rtcEngine = await RtcEngine.create(APP_ID);
      setEngine(rtcEngine);

      rtcEngine.addListener('Warning', (warn) => {
        console.log('Warning', warn);
      });

      rtcEngine.addListener('Error', (err) => {
        console.log('Error', err);
      });

      rtcEngine.addListener('UserJoined', (uid) => {
        setPeerIds((prev) => [...prev, uid]);
      });

      rtcEngine.addListener('UserOffline', (uid) => {
        setPeerIds((prev) => prev.filter((id) => id !== uid));
      });

      rtcEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoined(true);
      });

      await rtcEngine.enableVideo();
      await rtcEngine.joinChannel(TOKEN, CHANNEL_NAME, null, 0);
    };

    init();

    return () => {
      if (engine) {
        engine.destroy();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {joined ? (
        <View style={styles.fullView}>
          <RtcLocalView.SurfaceView
            style={styles.fullView}
            channelId={CHANNEL_NAME}
            renderMode={VideoRenderMode.Hidden}
          />
          {peerIds.map((uid) => (
            <RtcRemoteView.SurfaceView
              key={uid}
              style={styles.remoteView}
              uid={uid}
              channelId={CHANNEL_NAME}
              renderMode={VideoRenderMode.Hidden}
            />
          ))}
        </View>
      ) : (
        <Button
          onPress={async () => {
            if (engine) {
              await engine.leaveChannel();
              setJoined(false);
              setPeerIds([]);
            }
          }}
          title="Leave Channel"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  remoteView: {
    width: 120,
    height: 120,
    margin: 10,
  },
});

export default App;
