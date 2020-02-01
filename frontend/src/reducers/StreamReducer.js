import { CREATE_STREAM } from '../actions/types';

const initialState = {
  playbackIds: [],
  streamKeys: [],
  error: false
};

const StreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return {
        ...state,
        playbackIds: [action.payload.playbackIds],
        streamKeys: [action.payload.streamKey],
        error: action.error
      };
    default:
      return state;
  }
};

export default StreamReducer;
