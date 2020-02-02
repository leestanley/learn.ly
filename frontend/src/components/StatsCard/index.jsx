import React from 'react';

import { Card } from 'antd';

import './style.less';

const StatsCard = props => {
  return (
    <Card className="statscard">
      <h1>{props.number}</h1>
      <p>{props.varname}</p>
    </Card>
  );
};

export default StatsCard;
