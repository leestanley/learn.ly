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
      <h1 className="logo">LEARN.LY</h1>
      <div className="columned">
        <InstructorVideo currStream={props.currStream} />
      </div>
      <div className="sidebar">
        <Sidebar streamKey={streamKey} />
      </div>
      <div className="footer">
        Made with ☕ at HackSC 20
      </div>
    </div>
  );
};

export default InstructorPage;
