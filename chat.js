let currentUser;
let chatUser = localStorage.getItem("chatUser");
let chatUsername = localStorage.getItem("chatUsername");

// Show name
document.getElementById("chatName").innerText = chatUsername;

// Auth check
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadMessages();
  }
});

// Unique chat ID
function getChatId() {
  return currentUser.uid < chatUser
    ? currentUser.uid + "_" + chatUser
    : chatUser + "_" + currentUser.uid;
}

// Send message
function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if (!text) return;

  db.collection("chats")
    .doc(getChatId())
    .collection("messages")
    .add({
      text: text,
      sender: currentUser.uid,
      time: Date.now()
    });

  input.value = "";
}

// Load messages
function loadMessages() {
  db.collection("chats")
    .doc(getChatId())
    .collection("messages")
    .orderBy("time")
    .onSnapshot(snapshot => {
      const msgBox = document.getElementById("messages");
      msgBox.innerHTML = "";

      snapshot.forEach(doc => {
        const msg = doc.data();

        const div = document.createElement("div");
        div.className = msg.sender === currentUser.uid ? "me" : "other";
        div.innerText = msg.text;

        msgBox.appendChild(div);
      });

      // Auto scroll bottom
      msgBox.scrollTop = msgBox.scrollHeight;
    });
}

// Back button
function goBack() {
  window.location.href = "home.html";
                }
