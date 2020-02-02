import Config from '../config';
import { CREATE_QUIZ, CLOSE_QUIZ, OPEN_QUIZ, CLOSE_ANSWER, UPDATE_QUESTION, ANSWER_QUESTION } from './types';
import { replace } from 'connected-react-router';

import firebase from '../utils/firebase';
const db = firebase.firestore();

export const createQuizQuestion = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    try {
      db.collection("quiz").doc('current').set({
        question: values.question,
        one: values.one,
        two: values.two,
        three: values.three,
        four: values.four,
        answer: values.answer,
        right: 0,
        wrong: 0
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

export const getQuestion = () => async dispatch => {
  return new Promise( async (resolve, reject) => {
    db.collection("quiz").doc('current').get().then(function(doc) {
        if (doc.exists) {
            const data = doc.data();
            dispatch({
              type: UPDATE_QUESTION,
              q: data.question,
              one: data.one,
              two: data.two,
              three: data.three,
              four: data.four,
              answer: data.answer,
              right: data.right,
              wrong: data.wrong
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("quiz").doc('current').onSnapshot((docSnapshot) => {
            console.log('hi matteo2');
      const data = docSnapshot.data();
      if(data.right === 0 && data.wrong === 0 ) {
        dispatch({
          type: UPDATE_QUESTION,
          q: data.question,
          one: data.one,
          two: data.two,
          three: data.three,
          four: data.four,
          answer: data.answer,
          right: data.right,
          wrong: data.wrong
        });
      }
    }, (err) => console.error('Error in onSnapshot', err));
  });
}

export const getQuestion2 = () => async dispatch => {
  return new Promise( async (resolve, reject) => {
    db.collection("quiz").doc('current').get().then(function(doc) {
        if (doc.exists) {
            const data = doc.data();
            dispatch({
              type: UPDATE_QUESTION,
              q: data.question,
              one: data.one,
              two: data.two,
              three: data.three,
              four: data.four,
              answer: data.answer,
              right: data.right,
              wrong: data.wrong
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("quiz").doc('current').onSnapshot((docSnapshot) => {
            console.log('hi matteo');
      const data = docSnapshot.data();
      dispatch({
        type: UPDATE_QUESTION,
        q: data.question,
        one: data.one,
        two: data.two,
        three: data.three,
        four: data.four,
        answer: data.answer,
        right: data.right,
        wrong: data.wrong
      });
    }, (err) => console.error('Error in onSnapshot', err));
  });
}

export const closeAnswer = () => async dispatch => {
  return new Promise( async (resolve, reject) => {
    dispatch({
      type: CLOSE_ANSWER
    })
  });
}

export const sendAnswer = (values) => async dispatch => {
  return new Promise( async (resolve, reject) => {
    db.collection("quiz").doc('current').get().then(function(doc) {
        if (doc.exists) {
            const data = doc.data();
            if(values.answer === data.answer) {
              console.log(data.right);
              db.collection("quiz").doc('current').set({
                question: data.question,
                one: data.one,
                two: data.two,
                three: data.three,
                four: data.four,
                answer: data.answer,
                right: data.right + 1,
                wrong: data.wrong
              });

              dispatch({
                type: ANSWER_QUESTION,
                q: data.question,
                one: data.one,
                two: data.two,
                three: data.three,
                four: data.four,
                answer: data.answer,
                right: data.right,
                wrong: data.wrong
              });
            } else {
              db.collection("quiz").doc('current').set({
                question: data.question,
                one: data.one,
                two: data.two,
                three: data.three,
                four: data.four,
                answer: data.answer,
                right: data.right,
                wrong: data.wrong + 1
              });

              dispatch({
                type: ANSWER_QUESTION,
                q: data.question,
                one: data.one,
                two: data.two,
                three: data.three,
                four: data.four,
                answer: data.answer,
                right: data.right,
                wrong: data.wrong
              });
            }
        }
    });
    dispatch({
      type: CLOSE_ANSWER
    });


    console.log(values);
  });
}
