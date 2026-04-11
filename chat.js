import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let chatUser = localStorage.getItem("chatUser");
chatName.innerText = localStorage.getItem("chatName");

onAuthStateChanged(auth,(user)=>{
  let id = user.uid < chatUser ? user.uid+"_"+chatUser : chatUser+"_"+user.uid;

  let q = query(collection(db,"chats",id,"msg"),orderBy("time"));

  onSnapshot(q,(snap)=>{
    chatBox.innerHTML="";
    snap.forEach(d=>{
      let m=d.data();

      let div=document.createElement("div");
      div.innerText=m.text;

      chatBox.appendChild(div);
    });
  });
});

window.send = async function(){
  let text = msg.value;

  onAuthStateChanged(auth, async(user)=>{
    let id = user.uid < chatUser ? user.uid+"_"+chatUser : chatUser+"_"+user.uid;

    await addDoc(collection(db,"chats",id,"msg"),{
      text:text,
      time:Date.now()
    });
  });

  msg.value="";
};
