import Config from '../config';

import { GET_TEXT } from './types';

import firebase from '../utils/firebase';
const db = firebase.firestore();

export const getText = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    db.collection("ts").doc('current').get().then(function(doc) {
        if (doc.exists) {
            const data = doc.data();
            dispatch({
              type: GET_TEXT,
              payload: data.text
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("ts").doc('current').onSnapshot((docSnapshot) => {
      const data = docSnapshot.data();
      if(data) {
        dispatch({
          type: GET_TEXT,
          payload: data.text
        });
      }
    }, (err) => console.error('Error in onSnapshot', err));
  });
}
