import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './style.less';

import ProfileIcon from '../../assets/profileicon.png';
import Hamburger from '../../assets/hamburger.svg';
import Triple from '../../assets/triple_dot.svg';
import PlayCircle from '../../assets/play_circle.svg';
import PauseCircle from '../../assets/pause_circle.svg';
import QuizIcon from '../../assets/quiz_icon.svg';
import ReplayIcon from '../../assets/replay_icon.svg';
import QuizModal from '../../containers/QuizModal';

import { openQuiz, getQuestion2 } from '../../actions/quizActions';

import IconButton from '../../components/IconButton';
import StatsCard from '../../components/StatsCard';

const Sidebar = props => {

  useEffect(() => {
    // Update the document title using the browser API
    props.getQuestion2();
  });

  const showMessage = () => {
    props.openQuiz();
  };

  return (
    <>
      <QuizModal />
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
          <IconButton width="190px" onClick={showMessage}>
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
        <div className="Buttons">
          <StatsCard number={300} varname={'Viewers'} />
          <StatsCard number={203} varname={'Followers'} />
        </div>
        <div className="Buttons">
          <StatsCard number={props.right} varname={'Right'} />
          <StatsCard number={props.wrong} varname={'Wrong'} />
        </div>
        <div className="streamkey">
          <p>Reveal Your Streamkey ID: </p>
          <div className="box">
            <h1>{props.streamKey}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    right: state.quiz.right,
    wrong: state.quiz.wrong
  }
};

export default connect(mapStateToProps, { openQuiz, getQuestion2 })(Sidebar);
