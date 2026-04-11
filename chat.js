let currentUser;
let chatUser = localStorage.getItem("chatUser");
let chatUsername = localStorage.getItem("chatUsername");

chatName.innerText = chatUsername;

// Auth check
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    loadMessages();
  }
});

// Unique chat id
function getChatId() {
  return currentUser.uid < chatUser
    ? currentUser.uid + "_" + chatUser
    : chatUser + "_" + currentUser.uid;
}

// SEND MESSAGE (FIXED)
function sendMessage() {
  const input = msgInput;
  const text = input.value.trim();

  if (!text) return;

  db.collection("chats")
    .doc(getChatId())
    .collection("messages")
    .add({
      text: text,
      sender: currentUser.uid,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });

  input.value = "";
}

// REALTIME LOAD (FIXED)
function loadMessages() {
  db.collection("chats")
    .doc(getChatId())
    .collection("messages")
    .orderBy("time")
    .onSnapshot(snapshot => {

      const msgBox = messages;
      msgBox.innerHTML = "";

      snapshot.forEach(doc => {
        const msg = doc.data();

        if (!msg.text) return;

        const div = document.createElement("div");
        div.className = msg.sender === currentUser.uid ? "me" : "other";
        div.innerText = msg.text;

        msgBox.appendChild(div);
      });

      msgBox.scrollTop = msgBox.scrollHeight;
    });
}

// Back
function goBack() {
  window.location.href = "home.html";
}
