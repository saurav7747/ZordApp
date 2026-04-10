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

// Load users
function loadUsers() {
  db.collection("users").onSnapshot(snapshot => {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    snapshot.forEach(doc => {
      const user = doc.data();

      const div = document.createElement("div");
      div.className = "user";

      div.innerText = user.username;

      userList.appendChild(div);
    });
  });
}

loadUsers();
