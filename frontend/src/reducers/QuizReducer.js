import { CREATE_QUIZ , CLOSE_QUIZ, OPEN_QUIZ} from '../actions/types';

const initialState = {
  instructorVisible: false,
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
    case OPEN_QUIZ:
      return {
        ...state,
        instructorVisible: true
      };
    default:
      return state;
  }
};

export default QuizReducer;
