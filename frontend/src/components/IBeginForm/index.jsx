import React from 'react';

import Button from '../Button';
import { Form, Input, Radio } from 'antd';
import { NavLink } from 'react-router-dom';

import './style.less';

const IBeginForm = (props) => {
  return (
    <div className="ibeginform">
      <form onSubmit={props.handleSubmit} className="login-form">
        <h2> Create a cast </h2>
        <h3> Title for Cast </h3>
        <Form.Item>
          <Input
            name="title"
            className="title"
            value={props.values.title}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            size="large"
          />
        </Form.Item>
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

export default IBeginForm;
