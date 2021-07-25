import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6RykJuxA1FsI1DZUekS3lwCwCKGBTo_E",
  authDomain: "clone-8f23a.firebaseapp.com",
  projectId: "clone-8f23a",
  storageBucket: "clone-8f23a.appspot.com",
  messagingSenderId: "75755700075",
  appId: "1:75755700075:web:f5999f90e67c130808d62e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
