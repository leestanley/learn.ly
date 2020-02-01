import React from 'react';

import { Button } from 'antd';

import './style.less';

const CustomButton = (props) => {

  const style = {
    'background': props.color,
    'font-size': props.size,
    'padding': `8px 0`,
    'width': props.width,
    'color': 'white !important'
  }

  return (
     <Button
       className="button"
       type="primary"
       onClick={props.onClick}
       style={style}
       htmlType={props.htmlType}
       >
       {props.children}
     </Button>
  );
};

export default CustomButton;
