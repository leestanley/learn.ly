import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ThumbCard from '../ThumbCard';
import { getVideos }  from '../../actions/videoActions';

import './style.less';

const ReplayPage = props => {
  useEffect(() => {
    let data = props.getVideos();
    // console.log(data);
    document.title = `Viewing Replays`;
  }, []);

  return (
    <div className="replay-page">
      <div className="wrapper">
        <div className="same-text">
          <h1 className="title">Cast Replays</h1>
          <NavLink to="/instructor">
            <p>Go Back</p>
          </NavLink>
        </div>
        <div className="counters">
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
          <ThumbCard
            image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
            text1="【=◈︿◈=】"
            text2="【=◈︿◈=】"
          />
        </div>
      </div>
      <div className="footer">Made with ☕ at HackSC 20</div>
    </div>
  );
};

const mapStateToProps = state => ({
  videos: state.videos.videos
});

export default connect(
  mapStateToProps,
  { getVideos }
)(ReplayPage);
