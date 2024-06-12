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
import { playbackService } from './src/Services/MusicPlayService';

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(()=>playbackService)