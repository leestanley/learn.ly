import firebase from "firebase";
import { message } from "antd";

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
firebase.analytics();

let db = firebase.database();

export let session = Math.random();

export let cointAmount = 50;

export function coins() {
  return cointAmount;
}

let time = 0;
let setCoin = false;

export function spendCoins(amount) {
  cointAmount -= amount;
}
export function timeNow() {
  return time;
}
export function getCoinUpdates(callback) {
  if (setCoin) {
    setInterval(() => {
      callback(cointAmount);
    }, 300);
  } else {
    setInterval(() => {
      callback(cointAmount);
      cointAmount++;
      // also for some reason, will check if a minute ends
      time += 0.3;
      if (time >= 60) {
        message.info("GAME OVER!!");
        time = 0;
      }
    }, 300);
    setCoin = true;
  }
}

export function getTimeUpdates(callback) {
  setInterval(() => {
    callback(time);
  }, 600);
}

/**
 * Sends a spawn request to firebase. Creates a unique ID
 * @param {number} x
 * @param {number} y
 * @returns {string} of the new unique id
 */
export function sendSpawn(x, y, width, height) {
  let mX = width / 40;
  let mY = height / 40;

  let moddedX = Math.floor(x / mX) - 20;
  let moddedY = Math.floor(y / mY) - 20;
  let id = randomName();
  db.ref("/spawn").set({
    id: id,
    x: moddedX,
    y: moddedY,
    session: session
  });
  return id;
}

/**
 * Sets a specified callback function to be called anytime a zombie is killed
 * @param {function: (id: string) => {}} callback - called when a new zombie is killed
 */
export function setOnZombieUpdate(callback) {
  db.ref("/killed").on("value", snapshot => {
    let data = snapshot.val();
    if (!data) { return }
    // check if data isn't temp
    callback(data);
  });
}

export function setOnZombieAdd(callback, getAll) {
    db.ref("spawn").on("value", (snapshot) => {
        let data = snapshot.val()
        if (!data) { return }
        if (data.session === session && !getAll) { return } // we already have this zombie

        callback(data)
    })
}

let funcs = []
/**
 * Tells the Unity Game to Reset (removes all objects)
 */
export function reset() {
  db.ref("/reset").set(Math.random());
  db.ref('/spawn').set({})
  cointAmount = 50;
  time = 0;
  funcs.forEach(f => {
    f()
  })

  db.ref("/reset").set(Math.random())
  // updates it with any value to trigger an event on the Unity end
}

export function setOnReset(callback) {
  funcs.push(callback)
  db.ref("/reset").on("value", snapshot => {
    callback()
  })
}

/**
 * Sets a specified callback function to be called as health is updated
 * @param {function: (health: number) => {}} callback - called when health is updated
 */
export function setOnHealthUpdate(callback) {
  db.ref("/health").on("value", snapshot => {
    let data = snapshot.val();
    // check if data isn't temp
    // console.log(data);
    callback(data);
  });
}

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default firebase;

let adjectives = ["Snarky", "Sneaky", "Swanky", "Funny", "Weird", "Panda"];
let names = ["Steve", "Johnny", "Riley", "Wiley", "Panda", "Jonathan", "Justin", "Cat"];
function randomName() {
  let aI = Math.floor(Math.random() * adjectives.length);
  let nI = Math.floor(Math.random() * names.length);

  return adjectives[aI] + " " + names[nI] + `-${Math.random()}`;
}
