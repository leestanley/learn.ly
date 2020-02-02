import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import QuizReducer from './QuizReducer';
import StreamReducer from './StreamReducer';
import VideoReducer from './VideoReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    quiz: QuizReducer,
    stream: StreamReducer,
    videos: VideoReducer
  });
