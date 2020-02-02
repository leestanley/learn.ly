import React from 'react';

import StudentVideo from '../../containers/StudentVideo';
import Sidebar from '../../components/Sidebar';

import './style.less';

const StudentPage = props => {
  const streamKey = props.currStream.streamKey;
  return (
    <div className="student-page">
      <div className="columned">
        <h1> TEMP APP NAME </h1>
        <StudentVideo currStream={props.currStream} />
      </div>
    </div>
  );
};

export default StudentPage;
