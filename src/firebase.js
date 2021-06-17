import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBmra8BUi-40AAfzocoifxjSE4mNu_zp2U",
    authDomain: "linkedin-clone-project-88846.firebaseapp.com",
    projectId: "linkedin-clone-project-88846",
    storageBucket: "linkedin-clone-project-88846.appspot.com",
    messagingSenderId: "258396676014",
    appId: "1:258396676014:web:93f3cd0b0c04dd2a6bf23f",
    measurementId: "G-NB6YP4ZXER"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;