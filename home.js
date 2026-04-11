import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let currentUser = null;

// 🔐 LOGIN CHECK
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadUsers();
  }
});

// 📥 LOAD USERS
async function loadUsers() {
  const snapshot = await getDocs(collection(db, "users"));

  const list = document.getElementById("userList");
  list.innerHTML = "";

  snapshot.forEach(doc => {
    if (doc.id !== currentUser.uid) {
      const user = doc.data();

      list.innerHTML += `
        <div style="margin:10px; padding:10px; background:#eee; border-radius:8px;">
          <b>${user.username}</b><br>
          <button onclick="openChat('${doc.id}')">Chat</button>
        </div>
      `;
    }
  });
}

// 💬 OPEN CHAT
window.openChat = function(uid) {
  window.location.href = `chat.html?uid=${uid}`;
};

// 🌙 THEME
window.toggleTheme = function () {
  document.body.classList.toggle("dark");
};

// 🚪 LOGOUT
window.logout = function () {
  signOut(auth);
};
