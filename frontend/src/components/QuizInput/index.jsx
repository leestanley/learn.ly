import React from 'react';
import { Form, Input, Radio } from 'antd';

import Button from '../Button';

import './style.less';

const QuizComponent = props => {
  const radioStyle = {
    display: 'block',
    height: '50px',
    lineHeight: '50px',
  };
  return (
    <form onSubmit={props.handleSubmit} className="quiz-form">
      <h2> Create a Quiz </h2>
      <h3> Question to ask </h3>
      <Form.Item>
        <Input
          name="question"
          className="question"
          value={props.values.question}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          size="large"
        />
      </Form.Item>
      <h3 className="questions"> Questions</h3>
      <h3> Responses</h3>
      <div className="options">
        <Form.Item>
          <Input
            name="one"
            className="option"
            value={props.values.one}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="two"
            className="option"
            value={props.values.two}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="three"
            className="option"
            value={props.values.three}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="four"
            className="option"
            value={props.values.four}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            size="large"
          />
        </Form.Item>
      </div>
      <Radio.Group
        className="radio"
        name="answer"
        onChange={answer=> {props.setFieldValue('answer', answer.target.value)}}
        >
        <Radio style={radioStyle} value="one">
        </Radio>
        <Radio style={radioStyle} value="two">
        </Radio>
        <Radio style={radioStyle} value="three">
        </Radio>
        <Radio style={radioStyle} value="four">
        </Radio>
      </Radio.Group>
      <Button className="button" color='#B6CBFE' size='20px' width='120px' htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

export default QuizComponent;
