import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StudentVideoTool from '../components/StudentVideoTool';
import VideoPlayer from '../components/VideoPlayer';
import { getCurrentStream } from '../actions/streamActions.js';

const StudentVideoContainer = props => {

  useEffect(() => {
    props.getCurrentStream();
  }, []);

  return (
    <StudentVideoTool
      title={props.currStream.title}
      translation={'transcription'}
      >
      <VideoPlayer
        muted={true}
        playbackId={props.currStream.playbackId}
        status={props.currStream.status}
        />
    </StudentVideoTool>
  );
};

const mapStateToProps = state => ({
  currStream: state.stream.currStream,
});

export default connect(
  mapStateToProps,
  { getCurrentStream }
)(StudentVideoContainer);
