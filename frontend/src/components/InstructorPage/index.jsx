import React from 'react';

//import VideoPlayer from '../VideoPlayer';
/*<VideoPlayer
  muted={true}
  playbackId={''}
  status={'ready'}
  />*/
import InstructorVideo from '../../containers/InstructorVideo';
import Sidebar from '../Sidebar';

import './style.less';

const InstructorPage = props => {
  const streamKey = props.currStream.streamKey;
  return (
    <div className="instructor-page">
      <div className="columned">
        <InstructorVideo currStream={props.currStream} />
      </div>
      <div className="sidebar">
        <Sidebar streamKey={streamKey} />
      </div>
      <h1 className="logo">LEARN.LY</h1>
    </div>
  );
};

export default InstructorPage;
