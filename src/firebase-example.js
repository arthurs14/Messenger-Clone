import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
  apiKey: "insert apiKey",
  authDomain: "insert authDomain",
  projectId: "insert projectId",
  storageBucket: "insert storageBucket",
  messagingSenderId: "insert messagingSenderId",
  appId: "insert appId"
}).auth();