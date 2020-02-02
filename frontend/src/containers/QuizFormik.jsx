import { connect } from 'react-redux';
import { withFormik } from 'formik';

import QuizInput from '../components/QuizInput';
import { createQuizQuestion } from '../actions/quizActions.js';

const QuizFormik = withFormik({
mapPropsToValues() {
  return {
    question: '',
    one: '',
    two: '',
    three: '',
    four: '',
    answer: ''
  };
},
handleSubmit(values, { resetForm,  props }) {
  props.createQuizQuestion(values);
},
})(QuizInput);

export default connect(
null,
{ createQuizQuestion }
)(QuizFormik);
