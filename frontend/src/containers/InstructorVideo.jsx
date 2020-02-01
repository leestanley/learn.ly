import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import VideoTool from '../components/VideoTool';
import VideoPlayer from '../components/VideoPlayer';
import { getCurrentStream } from '../actions/streamActions.js';

const InstructorVideoContainer = props => {

  useEffect(() => {
    props.getCurrentStream();
  }, []);

  return (
    <VideoTool
      title={props.currStream.title}
      translation={'transcription'}
      >
      <VideoPlayer
        muted={true}
        playbackId={props.currStream.playbackId}
        status={props.currStream.status}
        />
    </VideoTool>
  );
};

const mapStateToProps = state => ({
  currStream: state.stream.currStream,
});

export default connect(
  mapStateToProps,
  { getCurrentStream }
)(InstructorVideoContainer);
