import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ModalComponent from '../components/AnswerModal';
import { closeAnswer } from '../actions/quizActions';

const AnswerModalContainer = props => {
  const hideMessage = () => {
    props.closeAnswer();
  }

  return (
    <ModalComponent
      visible={props.visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
      question={props.question}
    />
  );
};

const mapStateToProps = state => ({
  visible: state.quiz.studentVisible,
});

export default connect(
  mapStateToProps,
  { closeAnswer }
)(AnswerModalContainer);
