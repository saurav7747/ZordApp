// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// SCREENS
const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");
const chatScreen = document.getElementById("chatScreen");

// USER
let currentUser = localStorage.getItem("username");
let currentChatUser = null;

// AUTO LOGIN
if(currentUser){
  loginScreen.style.display = "none";
  homeScreen.style.display = "block";
  loadUsers();
}

// LOGIN
async function login(){
  const username = document.getElementById("usernameInput").value.trim();
  if(!username) return alert("Enter username");

  currentUser = username;
  localStorage.setItem("username", username);

  loginScreen.style.display = "none";
  homeScreen.style.display = "block";

  await db.collection("users").doc(username).set({
    username,
    online: true,
    lastSeen: Date.now(),
    photo: ""
  });

  loadUsers();
}

// LOGOUT
function logout(){
  localStorage.removeItem("username");
  location.reload();
}

// 🔥 AUTO USER LIST
function loadUsers(){
  db.collection("users")
  .onSnapshot(snapshot=>{
    const list = document.getElementById("userList");
    list.innerHTML = "";

    snapshot.forEach(doc=>{
      const user = doc.data();

      if(user.username === currentUser) return;

      const div = document.createElement("div");
      div.className = "userItem";

      const img = document.createElement("img");
      img.src = user.photo || "https://via.placeholder.com/40";

      const info = document.createElement("div");
      info.className = "userInfo";

      const name = document.createElement("div");
      name.innerText = user.username;

      const status = document.createElement("div");
      status.className = "status";
      status.innerText = user.online ? "Online" : "Offline";

      info.appendChild(name);
      info.appendChild(status);

      div.appendChild(img);
      div.appendChild(info);

      div.onclick = ()=> openChat(user);

      list.appendChild(div);
    });
  });
}

// OPEN CHAT
function openChat(user){
  currentChatUser = user;

  homeScreen.style.display = "none";
  chatScreen.style.display = "block";

  document.getElementById("chatName").innerText = user.username;
  document.getElementById("chatProfile").src =
    user.photo || "https://via.placeholder.com/40";

  loadMessages();

  // LIVE STATUS
  db.collection("users").doc(user.username)
  .onSnapshot(doc=>{
    const data = doc.data();

    document.getElementById("chatName").innerText =
      data.username + (data.online ? " (Online)" : " (Offline)");
  });
}

// SEND MESSAGE
async function sendMessage(){
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if(!msg) return;

  await db.collection("messages").add({
    text: msg,
    sender: currentUser,
    receiver: currentChatUser.username,
    timestamp: Date.now(),
    seen: false
  });

  input.value = "";
}

// LOAD MESSAGES
function loadMessages(){
  db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot(snapshot=>{
    const box = document.getElementById("messages");
    box.innerHTML = "";

    snapshot.forEach(doc=>{
      const m = doc.data();

      if(
        (m.sender === currentUser && m.receiver === currentChatUser.username) ||
        (m.receiver === currentUser && m.sender === currentChatUser.username)
      ){
        const div = document.createElement("div");

        div.className = m.sender === currentUser ? "sent" : "received";

        div.innerText =
          m.text +
          (m.sender === currentUser ? (m.seen ? " ✔✔" : " ✔") : "");

        box.appendChild(div);

        // MARK SEEN
        if(m.receiver === currentUser){
          db.collection("messages").doc(doc.id).update({ seen:true });
        }
      }
    });
  });
}

// BACK
function goBack(){
  chatScreen.style.display = "none";
  homeScreen.style.display = "block";
}

// THEME
function toggleTheme(){
  const body = document.body;
  body.className = body.className === "dark" ? "light" : "dark";
  localStorage.setItem("theme", body.className);
}

// LOAD THEME
if(localStorage.getItem("theme")){
  document.body.className = localStorage.getItem("theme");
}

// PROFILE UPLOAD
async function uploadProfile(){
  const file = document.getElementById("profilePic").files[0];
  if(!file) return;

  const ref = storage.ref("profiles/" + currentUser);
  await ref.put(file);
  const url = await ref.getDownloadURL();

  await db.collection("users").doc(currentUser).update({
    photo: url
  });

  alert("Profile updated");
}

// ONLINE STATUS
window.onbeforeunload = function(){
  if(currentUser){
    db.collection("users").doc(currentUser).update({
      online:false,
      lastSeen:Date.now()
    });
  }
};

// TYPING
document.getElementById("messageInput").addEventListener("input", async ()=>{
  if(!currentChatUser) return;

  await db.collection("typing").doc(currentUser).set({
    to: currentChatUser.username,
    typing:true
  });

  setTimeout(async ()=>{
    await db.collection("typing").doc(currentUser).set({ typing:false });
  },1000);
});

// 🔥 PEERJS
let peer = new Peer();
let currentCall;
let localStream;

// SAVE PEER ID
peer.on('open', id=>{
  if(currentUser){
    db.collection("users").doc(currentUser).update({ peerId:id });
  }
});

// START CALL
async function startCall(type){
  localStream = await navigator.mediaDevices.getUserMedia({
    video: type==="video",
    audio:true
  });

  document.getElementById("callScreen").style.display="block";
  document.getElementById("myVideo").srcObject = localStream;

  const userDoc = await db.collection("users").doc(currentChatUser.username).get();
  const peerId = userDoc.data().peerId;

  currentCall = peer.call(peerId, localStream);

  currentCall.on('stream', remote=>{
    document.getElementById("remoteVideo").srcObject = remote;
  });
}

// RECEIVE CALL
peer.on('call', call=>{
  navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
    localStream = stream;

    document.getElementById("callScreen").style.display="block";
    document.getElementById("myVideo").srcObject = stream;

    call.answer(stream);

    call.on('stream', remote=>{
      document.getElementById("remoteVideo").srcObject = remote;
    });

    currentCall = call;
  });
});

// END CALL
function endCall(){
  currentCall?.close();
  document.getElementById("callScreen").style.display="none";
}

// MUTE
function toggleMute(){
  localStream.getAudioTracks()[0].enabled =
    !localStream.getAudioTracks()[0].enabled;
}

// CAMERA
function toggleCamera(){
  localStream.getVideoTracks()[0].enabled =
    !localStream.getVideoTracks()[0].enabled;
}

