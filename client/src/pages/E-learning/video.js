import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// This imports the functional component from the previous sample.
import VideoJS from './video2'

export default function VideoPlayer(){
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/images%2F12.mp4?alt=media&token=863720a0-1dca-47f0-bef0-e088e9aa37e1',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}