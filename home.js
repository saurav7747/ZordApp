// Check login
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadUsers(user);
  }
});

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Load users + click to chat
function loadUsers(currentUser) {
  db.collection("users").onSnapshot(snapshot => {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    snapshot.forEach(doc => {
      const user = doc.data();

      // Apna user skip
      if (user.uid === currentUser.uid) return;

      const div = document.createElement("div");
      div.className = "user";
      div.innerText = user.username;

      // Click → open chat
      div.onclick = () => {
        localStorage.setItem("chatUser", user.uid);
        localStorage.setItem("chatUsername", user.username);
        window.location.href = "chat.html";
      };

      userList.appendChild(div);
    });
  });
}
