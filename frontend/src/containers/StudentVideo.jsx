import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StudentVideoTool from '../components/StudentVideoTool';
import VideoPlayer from '../components/VideoPlayer';
import { getCurrentStream } from '../actions/streamActions.js';
import { getText } from '../actions/tsActions.js';

const StudentVideoContainer = props => {

  useEffect(() => {
    props.getCurrentStream();
    props.getText();
  }, []);

  return (
    <StudentVideoTool
      title={props.currStream.title}
      translation={props.text}
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
  text: state.text.text
});

export default connect(
  mapStateToProps,
  { getCurrentStream, getText }
)(StudentVideoContainer);
