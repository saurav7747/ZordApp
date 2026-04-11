import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABxUdNL1iHxgRGXNy9xbh6c9Db0nyS-J0",
  authDomain: "zordapp-467e9.firebaseapp.com",
  projectId: "zordapp-467e9",
  storageBucket: "zordapp-467e9.appspot.com",
  messagingSenderId: "774552789251",
  appId: "1:774552789251:web:c847cb42fb2e4ce7bc4936"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
