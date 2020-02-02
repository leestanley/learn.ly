import React from 'react';

import './style.less';

import LBeginForm from '../../containers/LBeginForm';
import logo from '../../assets/logo.png';

const LearnerBegin = () => {
  return (
    <div className="lbegin">
      <h1>LEARN.LY</h1>
      <div className="form">
        <LBeginForm />
      </div>
    </div>
  );
};

export default LearnerBegin;
