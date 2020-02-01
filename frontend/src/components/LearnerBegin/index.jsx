import React from 'react';

import './style.less';

import LBeginForm from '../../containers/LBeginForm';

const LearnerBegin = () => {
  return (
    <div className="lbegin">
      <h1> LEARN.LY </h1>
      <div className="form">
        <LBeginForm />
      </div>
    </div>
  );
};

export default LearnerBegin;
