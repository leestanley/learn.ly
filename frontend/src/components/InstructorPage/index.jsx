import React from 'react';

//import VideoPlayer from '../VideoPlayer';
/*<VideoPlayer
  muted={true}
  playbackId={''}
  status={'ready'}
  />*/
import InstructorVideo from '../../containers/InstructorVideo';
import QuizModal from '../../containers/QuizModal';

import './style.less';

const InstructorPage = (props) => {
  return (
    <div className="instructor-page">
      <h1> TEMP APP NAME </h1>
      <InstructorVideo currStream={props.currStream}/>
      <h1>Your stream key is {props.currStream.streamKey}</h1>
      <QuizModal />
    </div>
  );
};

export default InstructorPage;
