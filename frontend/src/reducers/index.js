import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import StreamReducer from './StreamReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    stream: StreamReducer
  });
