import { GET_TEXT } from '../actions/types';

const initialState = {
  text: ''
};

const TextReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TEXT:
      console.log(action.payload)
        return {
          ...state,
          text: action.payload
        };
    default:
        return state;
    }
};

export default TextReducer;
