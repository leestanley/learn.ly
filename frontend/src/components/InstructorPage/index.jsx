import React from 'react';

//import VideoPlayer from '../VideoPlayer';
/*<VideoPlayer
  muted={true}
  playbackId={''}
  status={'ready'}
  />*/
import InstructorVideo from '../../containers/InstructorVideo';
import Sidebar from '../../components/Sidebar';

import './style.less';

const InstructorPage = props => {
  const streamKey = props.currStream.streamKey;
  return (
    <div className="instructor-page">
      <div className="columned">
        <h1> TEMP APP NAME </h1>
        <InstructorVideo currStream={props.currStream} />
      </div>

      <div className="sidebar">
        <Sidebar streamKey={streamKey} />
      </div>
    </div>
  );
};

export default InstructorPage;
