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

  const getThumbcards = (videos) => {
    let returnedVideos = [];
    if(videos && videos.videos) {
    for (let i = 0; i < 6 ; i++) {
      const currVid = videos.videos[i];
      console.log(currVid);
      const playbackId = currVid.playback_ids[0].id;
      returnedVideos.push(
        <a href={`https://stream.mux.com/${playbackId}`}>
        <ThumbCard
          key={`thumbcard ${i}`}
          image={`https://image.mux.com/${playbackId}/thumbnail.png`}
          text1={`Video ${i + 1}`}
          text2={`${currVid.duration} s`}
        />
        </a>
      )
      }
    }
    return returnedVideos;
  }

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
          {getThumbcards(props.videos)}
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
