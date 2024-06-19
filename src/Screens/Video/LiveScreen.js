import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ClientRole,
  ChannelProfile,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './Permission';
import styles from './Style';

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
const token = '007eJxTYJDTnWE2W0rEvP34VofPyjYnvafsOlvB7Tep6Oo8p+9cz64rMKSmmqWZGqcamqaZW5gYG6UlmVmYGadZJiWmpKRYJiUZ8+uxpjUEMjJo/QpkYIRCEJ+FoSS1uISBAQD59R5T';
const appId = 'ee6f53e15f78432fb6863f9baddd9bb3';
const channelName = 'test';

const renderVideos = (joinSucceed,isHost) => {
  return joinSucceed ? (
    <View style={styles.fullView}>
      {isHost ? (
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
      ) : (
        <></>
      )}
      {_renderRemoteVideos()}
    </View>
  ) : null;
};

const _renderRemoteVideos = () => {
  return (
    <ScrollView
      style={styles.remoteContainer}
      // contentContainerStyle={styles.remoteContainerContent}
      horizontal={true}
    >
      {peerIds.map((value) => {
        return (
          <RtcRemoteView.SurfaceView
            style={styles.remote}
            uid={value}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        );
      })}
    </ScrollView>
  );
};
export default function LiveScreen() {
  const _engine = RtcEngine();
  const [isHost, setIsHost] = useState(true);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);

  if (Platform.OS === 'android') {
    // Request required permissions from Android
    requestCameraAndAudioPermission().then(() => {
      console.log('requested!');
    });
  }


useEffect(() => {
  init();
},[])


/**
 * @name init
 * @description Function to initialize the Rtc Engine, attach event listeners and actions
 */
const init = async () => {
 const _engine = await RtcEngine.create(appId);
  await _engine.enableVideo();
  await _engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
  await _engine?.setClientRole(
    isHost ? ClientRole.Broadcaster : ClientRole.Audience
  );

  _engine.addListener('Warning', (warn) => {
    console.log('Warning', warn);
  });

  _engine.addListener('Error', (err) => {
    console.log('Error', err);
  });

  _engine.addListener('UserJoined', (uid, elapsed) => {
    console.log('UserJoined', uid, elapsed);
    // Get current peer IDs
    // If new user
    if (setPeerIds.indexOf(uid) === -1) {
      setPeerIds({
        // Add peer ID to state array
        peerIds: [...peerIds, uid],
      });
    }
  });

 _engine.addListener('UserOffline', (uid, reason) => {
    console.log('UserOffline', uid, reason);
    setPeerIds({
      // Remove peer ID from state array
      peerIds: peerIds.filter((id) => id !== uid),
    });
  });

  // If Local user joins RTC channel
 _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
    console.log('JoinChannelSuccess', channel, uid, elapsed);
    // Set state variable to true
    setJoinSucceed(true)
  });
};

/**
 * @name toggleRoll
 * @description Function to toggle the roll between broadcaster and audience
 */
const toggleRoll = async () => {
  // Join Channel using null token and channel name
  setIsHost(!isHost, () => {
    _engine?.setClientRole(
     isHost ? ClientRole.Broadcaster : ClientRole.Audience
    );
  })
    
};

/**
 * @name startCall
 * @description Function to start the call
 */
const startCall = () => {
  // Join Channel using null token and channel name
   _engine?.joinChannel(token, channelName, null, 0);
};

/**
 * @name endCall
 * @description Function to end the call
 */
const endCall = () => {
   _engine?.leaveChannel();
  setJoinSucceed(false);
  setPeerIds([])
};

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <Text style={styles.roleText}>
          You're {isHost ? 'a broadcaster' : 'the audience'}
        </Text>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={toggleRoll} style={styles.button}>
            <Text style={styles.buttonText}> Toggle Role </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {renderVideos(joinSucceed,isHost)}
      </View>
    </View>
  );
}

