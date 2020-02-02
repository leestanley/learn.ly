import { connect } from 'react-redux';
import { withFormik } from 'formik';

import AnswerInput from '../components/AnswerInput';
import { sendAnswer } from '../actions/quizActions';

const AnswerFormik = withFormik({
  mapPropsToValues() {
    return {
      answer: ''
    };
  },
  handleSubmit(values, { resetForm,  props }) {
    props.sendAnswer(values);
  },
  })(AnswerInput);

export default connect(
null,
{ sendAnswer }
)(AnswerFormik);
