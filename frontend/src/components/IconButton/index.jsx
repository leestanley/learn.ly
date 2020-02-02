import React from 'react';

import { Button } from 'antd';

import './style.less';

const IconButton = props => {
  const style = {
    background: props.color,
    'font-size': props.size,
    padding: `8px 0`,
    width: props.width,
    color: 'white !important'
  };

  return (
    <Button
      className="button"
      type="primary"
      onClick={props.onClick}
      style={style}
      htmlType={props.htmlType}
    >
      <div className="children">
      {props.children}

      </div>
    </Button>
  );
};

export default IconButton;
