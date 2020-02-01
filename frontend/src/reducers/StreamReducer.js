import { CREATE_STREAM } from '../actions/types';

const initialState = {
  playbackIds: [],
  streamKeys: [],
  currStream: {
    id: '',
    streamKey: '',
    playbackId: '',
    title: '',
    language: '',
    status: 'idle'
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
          id: action.payload.id,
          streamKey: action.payload.streamKey,
          playbackId: action.payload.playbackId,
          title: action.title,
          language: action.language,
          status: action.status
        },
        error: action.error
      };
    default:
      return state;
  }
};

export default StreamReducer;
