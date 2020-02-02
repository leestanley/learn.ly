import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import ModalComponent from '../components/QuizModal';
import { closeQuiz } from '../actions/quizActions';

const QuizModalContainer = props => {
  const hideMessage = () => {
    props.closeQuiz();
  }

  return (
    <ModalComponent
      visible={props.visible}
      handleOk={hideMessage}
      handleCancel={hideMessage}
    />
  );
};

const mapStateToProps = state => ({
  visible: state.quiz.instructorVisible,
});

export default connect(
  mapStateToProps,
  { closeQuiz }
)(QuizModalContainer);
