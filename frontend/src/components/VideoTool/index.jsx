import React from 'react';

import './style.less';

const VideoTool = (props) => {
  return (
    <div className="video-tool">
      <h2 className="title">{props.title}</h2>
        <div className="video">
          {props.children}
        </div>
      <h3 className="translation">{props.translation}</h3>
    </div>
  );
};

export default VideoTool;
