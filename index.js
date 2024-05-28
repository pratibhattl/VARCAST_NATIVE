/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/Store/AppStore';
import TrackPlayer from 'react-native-track-player';
// import { AppRegistry} from 'react-native';

// Register playback controls
const onRegisterPlayback = async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};

// Register playback service
TrackPlayer.registerPlaybackService(() => {
  onRegisterPlayback(); // Ensure playback controls are registered
  return async () => {}; // Return an empty async function
});

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
// AppRegistry.registerComponent('App', () => App);
// AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });