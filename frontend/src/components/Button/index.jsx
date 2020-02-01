import React from 'react';

import { Button } from 'antd';

import './style.less';

const CustomButton = (props) => {

  const style = {
    'background': props.color,
    'font-size': props.size,
    'padding': `8px 0`,
    'width': props.width
  }

  return (
     <Button
       className="button"
       type="primary"
       onClick={props.onSubmit}
       style={style}
       >
       {props.children}
     </Button>
  );
};

export default CustomButton;
