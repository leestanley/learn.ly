import { UPDATE_VIDEOS } from '../actions/types';

const initialState = {
  videos: []
};

const QuizReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_VIDEOS:
      console.log(action.payload)
        return {
          ...state,
          videos: action.payload
        };
    default:
        return state;
    }
};

export default QuizReducer;
