import Config from '../config';
import { CREATE_STREAM } from './types';
import { replace } from 'connected-react-router';

export const createLiveStream = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      const response = await fetch(Config.API_URL + '/createstream', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({
        type: CREATE_STREAM,
        payload: data,
        title: values.title,
        language: values.language
      });
      dispatch(replace('/instructor'));
    } catch (error) {
      console.error('Failed to create live stream');
      console.error(error);
    }
  })
};
