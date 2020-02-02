import { CREATE_QUIZ , CLOSE_QUIZ, OPEN_QUIZ, CLOSE_ANSWER, UPDATE_QUESTION, ANSWER_QUESTION } from '../actions/types';

const initialState = {
  instructorVisible: false,
  studentVisible: true,
  question: {
    q: '',
    one: '',
    two: '',
    three: '',
    four: '',
    right: 0,
    wrong: 0
  }
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
    case CLOSE_ANSWER:
      return {
        ...state,
        studentVisible: false
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        question: {
          q: action.q,
          one: action.one,
          two: action.two,
          three: action.three,
          four: action.four,
          right: action.right,
          wrong: action.wrong
        },
        studentVisible: true
      };
      case ANSWER_QUESTION:
        return {
          ...state,
          question: {
            q: action.q,
            one: action.one,
            two: action.two,
            three: action.three,
            four: action.four,
            right: action.right,
            wrong: action.wrong
          },
          studentVisible: false
        };
    default:
      return state;
  }
};

export default QuizReducer;
