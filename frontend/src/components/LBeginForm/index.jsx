import React from 'react';

import Button from '../Button';
import { Form, Input, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import temp from '../../assets/temp.jpg';

import './style.less';

const LBeginForm = (props) => {
  return (
    <div className="LBeginForm">
      <form onSubmit={props.handleSubmit} className="login-form">
        <h3> View a cast </h3>
        <Row gutter={[12]}>
          <Col span={12}>
            <img src={temp}/>
          </Col>
          <Col span={12}>
            <img src={temp}/>
          </Col>
        </Row>
        <h2></h2>
         <h3> Your Language </h3>
         <Form.Item>
           <div>
             <Radio.Group className="radio"
               onChange={language=> props.setFieldValue('language', language.target.value)}
               defaultValue="English">
               <Radio.Button className="radio-button" value="English">English</Radio.Button>
               <Radio.Button className="radio-button" value="Italian">Italian</Radio.Button>
               <Radio.Button className="radio-button" value="Chinese">Chinese</Radio.Button>
               <Radio.Button className="radio-button" value="German">German</Radio.Button>
             </Radio.Group>
           </div>
          </Form.Item>
            <Button className="button" color='#B6CBFE' size='20px' width='120px' htmlType="submit">
              Submit
            </Button>
      </form>
  </div>
);
};

export default LBeginForm;
