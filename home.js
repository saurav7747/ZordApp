import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

let currentUser = null;

// 🔐 CHECK LOGIN
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

  let users = [];
  snapshot.forEach(doc => {
    if (doc.id !== currentUser.uid) {
      users.push({
        uid: doc.id,
        username: doc.data().username
      });
    }
  });

  renderUsers(users);
}

// 🎨 RENDER USERS (WhatsApp style)
function renderUsers(users) {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(user => {
    list.innerHTML += `
      <div class="user-item" onclick="openChat('${user.uid}')">
        <div class="user-avatar"></div>
        <div class="user-info">
          <div class="user-name">${user.username}</div>
          <div class="user-last">Tap to chat</div>
        </div>
      </div>
    `;
  });
}

// 💬 OPEN CHAT PAGE
window.openChat = function(uid) {
  window.location.href = `chat.html?uid=${uid}`;
};

// 🌙 THEME TOGGLE
window.toggleTheme = function () {
  document.body.classList.toggle("dark");
};
