import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Radio } from 'antd';
import { getQuestion } from '../../actions/quizActions';

import Button from '../Button';

import './style.less';

const AnswerInputContainer = props => {
  useEffect(() => {
    props.getQuestion();
  }, []);

  const radioStyle = {
    display: 'block',
    height: '50px',
    lineHeight: '50px',
  };

  return (
    <form onSubmit={props.handleSubmit} className="answer-form">
      <h2> Quiz </h2>
      <h3> {props.question.q} </h3>
      <Radio.Group
        className="radio"
        name="answer"
        onChange={answer=> {props.setFieldValue('answer', answer.target.value)}}
        >
          <Radio style={radioStyle} value="one">
            {props.question.one}
          </Radio>
          <Radio style={radioStyle} value="two">
            {props.question.two}
          </Radio>
          <Radio style={radioStyle} value="three">
            {props.question.three}
          </Radio>
          <Radio style={radioStyle} value="four">
            {props.question.four}
          </Radio>
      </Radio.Group>
      <Button className="button" color='#B6CBFE' size='20px' width='120px' htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  question: state.quiz.question
});

export default connect(
  mapStateToProps,
  { getQuestion }
)(AnswerInputContainer);
