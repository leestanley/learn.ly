import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBcz83ZxET2IbHJ7SjT3juiChYpJyW21_M",
  authDomain: "acmhacksc.firebaseapp.com",
  databaseURL: "https://acmhacksc.firebaseio.com",
  projectId: "acmhacksc",
  storageBucket: "acmhacksc.appspot.com",
  messagingSenderId: "822135956634",
  appId: "1:822135956634:web:2f1729e8cb2b3d8224ab23"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.database();

export default firebase;
