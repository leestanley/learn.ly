import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import VideoTool from '../components/VideoTool';
import VideoPlayer from '../components/VideoPlayer';
import { getCurrentStream } from '../actions/streamActions.js';
import { getText } from '../actions/tsActions.js';

const InstructorVideoContainer = props => {

  useEffect(() => {
    props.getCurrentStream();
    props.getText();
  }, []);

  return (
    <VideoTool
      title={props.currStream.title}
      translation={props.text}
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
  text: state.text.text
});

export default connect(
  mapStateToProps,
  { getCurrentStream, getText }
)(InstructorVideoContainer);
