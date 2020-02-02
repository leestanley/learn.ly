import React from 'react';

import './style.less';

import ProfileIcon from '../../assets/profileicon.png';
import Hamburger from '../../assets/hamburger.svg';
import Triple from '../../assets/triple_dot.svg';
import PlayCircle from '../../assets/play_circle.svg';
import PauseCircle from '../../assets/pause_circle.svg';
import QuizIcon from '../../assets/quiz_icon.svg';
import ReplayIcon from '../../assets/replay_icon.svg';


import IconButton from '../../components/IconButton';

const Sidebar = props => {
  return (
    <div className="sidebar">
      <div className="admin">
        <h1>ADMIN PANEL</h1>
        <img className="profile" src={ProfileIcon} alt="icon" height="40" />
        <img className="hamburger" src={Hamburger} alt="icon" height="40" />
      </div>
      <div className="blocker">
        <h1>Playback Controls</h1>
        <img className="triple" src={Triple} alt="icon" height="40" />
      </div>
      <div className="Buttons">
        <IconButton width="190px">
          <img src={PlayCircle} alt="icon" height="28" />
          Begin Cast
        </IconButton>
        <IconButton width="190px">
          <img src={PauseCircle} alt="icon" height="28" />
          End Cast
        </IconButton>
      </div>
      <div className="ButtonsBot">
        <IconButton width="190px">
          <img src={QuizIcon} alt="icon" height="24" />
          Create Quiz
        </IconButton>
        <IconButton width="190px">
          <img src={ReplayIcon} alt="icon" height="26" />
          View Replays
        </IconButton>
      </div>
      <div className="blocker">
        <h1>Data Analytics</h1>
        <img className="triple" src={Triple} alt="icon" height="40" />
      </div>
      {/* <p>Your streamkey is {props.streamKey}</p> */}
    </div>
  );
};

export default Sidebar;
