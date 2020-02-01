import { connect } from 'react-redux';
import { withFormik } from 'formik';

import LBeginForm from '../components/LBeginForm';
import { createLiveStream } from '../actions/streamActions.js';

const FormikLBeginForm = withFormik({
mapPropsToValues() {
  return {
    title: '',
    language: ''
  };
},
handleSubmit(values, { resetForm,  props }) {
  props.createLiveStream(values);
},
})(LBeginForm);

export default connect(
null,
{ createLiveStream }
)(FormikLBeginForm);
