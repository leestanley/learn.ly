import Config from '../config';

import { UPDATE_VIDEOS } from './types';

export const getVideos = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    const response = await fetch(Config.API_URL + '/videos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    console.log('huh')
    dispatch({
      type: UPDATE_VIDEOS,
      payload: data
    });
  })
}
