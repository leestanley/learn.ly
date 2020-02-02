import React from 'react';

import './style.less';

import IBeginForm from '../../containers/IBeginForm';

const InstructorBegin = () => {
  return (
    <div className="ibegin">
      <h1> LEARN.LY </h1>
      <div className="form">
        <IBeginForm />
      </div>
    </div>
  );
};

export default InstructorBegin;
