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
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadUsers();
  }
});

// 📥 LOAD USERS
async function loadUsers() {
  try {
    const snapshot = await getDocs(collection(db, "users"));

    const list = document.getElementById("userList");
    list.innerHTML = "";

    snapshot.forEach(doc => {
      if (doc.id !== currentUser.uid) {
        const user = doc.data();

        const div = document.createElement("div");
        div.className = "user-card";

        div.innerHTML = `
          <span><b>${user.username}</b></span>
          <button onclick="openChat('${doc.id}', '${user.username}')">Chat</button>
        `;

        list.appendChild(div);
      }
    });

  } catch (err) {
    console.log("Error loading users:", err);
  }
}

// 💬 OPEN CHAT (username bhi pass karenge)
window.openChat = function(uid, username) {
  localStorage.setItem("chatUser", uid);
  localStorage.setItem("chatUsername", username);
  window.location.href = "chat.html";
};

// 🌙 THEME
window.toggleTheme = function () {
  document.body.classList.toggle("dark");
};

// 🚪 LOGOUT
window.logout = function () {
  signOut(auth);
};
