// Importing firebase dependency in order to initialize the app
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTHDOMAIN",
  projectId: "YOUR_PROJECTID",
  storageBucket: "YOUR_STORAGEBUCKET",
  messagingSenderId: "YOUR_SENDERID",
  appId: "YOUR_APPID"
};

// Initializing firebase app with credentials defined above
export const app = firebase.initializeApp(firebaseConfig);
