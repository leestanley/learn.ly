import { CREATE_STREAM } from '../actions/types';

const initialState = {
  playbackIds: [],
  streamKeys: [],
  currStream: {
    streamKey: '',
    playbackId: '',
    title: '',
    language: ''
  },
  error: false
};

const StreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return {
        ...state,
        playbackIds: [action.payload.playbackIds],
        streamKeys: [action.payload.streamKey],
        currStream: {
          streamKey: action.payload.streamKey,
          playbackId: action.payload.playbackId,
          title: action.title,
          language: action.language
        },
        error: action.error
      };
    default:
      return state;
  }
};

export default StreamReducer;
