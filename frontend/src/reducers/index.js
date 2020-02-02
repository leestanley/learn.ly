import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import QuizReducer from './QuizReducer';
import StreamReducer from './StreamReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    quiz: QuizReducer,
    stream: StreamReducer
  });
