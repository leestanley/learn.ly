import Config from '../config';
import { CREATE_QUIZ, CLOSE_QUIZ, OPEN_QUIZ } from './types';
import { replace } from 'connected-react-router';

import firebase from '../utils/firebase';
const db = firebase.firestore();

export const createQuizQuestion = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      console.log(values);
      db.collection("quiz").doc('current').set({
      });
      dispatch({
        type: CREATE_QUIZ,
        payload: values
      });
      dispatch({
        type: CLOSE_QUIZ
      })
    } catch (error) {
      console.error('Failed to create live stream');
      console.error(error);
    }
  })
};

export const closeQuiz = () => async dispatch => {
  return new Promise( async (resolve, reject) => {
    dispatch({
      type: CLOSE_QUIZ
    })
  });
}

export const openQuiz = () => async dispatch => {
  return new Promise( async (resolve, reject) => {
    dispatch({
      type: OPEN_QUIZ
    })
  });
}
