import { CREATE_QUIZ , CLOSE_QUIZ} from '../actions/types';

const initialState = {
  instructorVisible: true,
};

const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ:
      return {
        ...state
      };
    case CLOSE_QUIZ:
      return {
        ...state,
        instructorVisible: false
      };
    default:
      return state;
  }
};

export default QuizReducer;
