import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import VideoTool from '../components/VideoTool';
import VideoPlayer from '../components/VideoPlayer';

const InstructorVideoContainer = props => {
  return (
    <VideoTool
      title={props.currStream.title}
      translation={'transcription'}
      >
      <VideoPlayer
        muted={true}
        playbackId={''}
        status={'ready'}
        />
    </VideoTool>
  );
};

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  {}
)(InstructorVideoContainer);
