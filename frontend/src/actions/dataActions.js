import Config from '../config';

export const getViews = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    const response = await fetch(Config.API_URL + '/videos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('this is the view count');
    console.log(data);
  })
}
