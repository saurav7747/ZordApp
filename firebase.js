// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyABxUdNL1iHxgRGXNy9xbh6c9Db0nyS-J0",
  authDomain: "zordapp-467e9.firebaseapp.com",
  projectId: "zordapp-467e9",
  storageBucket: "zordapp-467e9.firebasestorage.app",
  messagingSenderId: "774552789251",
  appId: "1:774552789251:web:c847cb42fb2e4ce7bc4936"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
