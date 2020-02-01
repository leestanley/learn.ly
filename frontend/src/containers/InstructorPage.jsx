import React from 'react';

import VideoPlayer from '../components/VideoPlayer';

const InstructorPage = () => {
  return (
    <VideoPlayer
      muted={true}
      playbackId={''}
      status={'ready'}
      />
  );
};

export default InstructorPage;
