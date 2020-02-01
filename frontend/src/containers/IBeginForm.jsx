import { connect } from 'react-redux';
import { withFormik } from 'formik';

import IBeginForm from '../components/IBeginForm';
import { createLiveStream } from '../actions/createLiveStream.js';

const FormikIBeginForm = withFormik({
mapPropsToValues() {
  return {
    title: '',
    language: ''
  };
},
handleSubmit(values, { resetForm,  props }) {
  props.createLiveStream(values);
},
})(IBeginForm);

export default connect(
null,
{ createLiveStream }
)(FormikIBeginForm);
