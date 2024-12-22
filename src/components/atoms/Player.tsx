'use client';
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <div className="overflow-hidden">
      <ReactPlayer
        width="auto"
        url={src}
        controls={true}
        //   height={400}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
    </div>
  );
};

export default VideoPlayer;
