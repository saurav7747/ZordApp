// Firebase CDN (index.html me add hona chahiye)
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDTNwG8GCZqOXKasZ5XfS5eqT2hDrzxD0Q",
  authDomain: "zordapp2.firebaseapp.com",
  projectId: "zordapp2",
  storageBucket: "zordapp2.firebasestorage.app",
  messagingSenderId: "279072692523",
  appId: "1:279072692523:web:eb6fdd5d9ad96a9e08cd6e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
