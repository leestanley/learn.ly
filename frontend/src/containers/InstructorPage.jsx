import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InstructorPage from '../components/InstructorPage';

const InstructorPageContainer = props => {
  return (
    <InstructorPage currStream={props.currStream}/>
  );
};

const mapStateToProps = state => ({
  currStream: state.stream.currStream,
});

export default connect(
  mapStateToProps,
  { }
)(InstructorPageContainer);
