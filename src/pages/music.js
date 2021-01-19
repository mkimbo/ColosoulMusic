import React from 'react';
import Music from '../components/musicpage';
import { AudioPlayerProvider } from 'react-use-audio-player';
export default () => (
  <AudioPlayerProvider>
    <Music />
  </AudioPlayerProvider>
);
