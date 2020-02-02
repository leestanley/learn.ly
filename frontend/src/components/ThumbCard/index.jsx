import React from 'react';

import { Card } from 'antd';

import './style.less';

const StatsCard = props => {
  return (
    <Card
      className="thumbcard"
      hoverable
      cover={
        <img
          alt="example"
          src={props.image}
        />
      }
    >
      <h1>{props.text1}</h1>
      <p>{props.text2}</p>
    </Card>
  );
};

export default StatsCard;
