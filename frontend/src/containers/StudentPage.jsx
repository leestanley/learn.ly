import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StudentPage from '../components/StudentPage';

const StudentPageContainer = props => {
  return (
    <StudentPage currStream={props.currStream}/>
  );
};

const mapStateToProps = state => ({
  currStream: state.stream.currStream,
});

export default connect(
  mapStateToProps,
  { }
)(StudentPageContainer);
