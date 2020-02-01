import Config from '../config';
import { CREATE_STREAM } from './types';
import { replace } from 'connected-react-router';

import firebase from '../utils/firebase';
const db = firebase.firestore();

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
      console.log(values);
      db.collection("streams").doc('current').set({
        id: data.id,
        streamKey: data.streamKey,
        playbackId: data.playbackId,
        title: values.title,
        language: values.language,
        status: 'idle'
      });
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

export const getCurrentStream = (values) => async dispatch => {
  db.collection("streams").doc('current').get().then(function(doc) {
      if (doc.exists) {
          const data = doc.data();
          console.log(data)
          dispatch({
            type: CREATE_STREAM,
            payload: data,
            title: data.title,
            language: data.language,
            status: data.status
          });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  db.collection("streams").doc('current').onSnapshot((docSnapshot) => {
    const data = docSnapshot.data();
    if(data && data.status === 'ready') {
      dispatch({
        type: CREATE_STREAM,
        payload: data,
        title: data.title,
        language: data.language,
        status: data.status
      });
    }
  }, (err) => console.error('Error in onSnapshot', err));
}
